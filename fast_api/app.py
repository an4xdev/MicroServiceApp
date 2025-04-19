from fastapi import FastAPI, HTTPException, Depends
from uuid import UUID
from sqlmodel import Session, desc, select
from database import get_db
import pika
import json
import time
from models import *
from datetime import datetime

app = FastAPI()

# RabbitMQ Connection setup
credentials = pika.PlainCredentials('user', 'password')
connection_params = pika.ConnectionParameters(host='rabbitmq', credentials=credentials, port=5672)

connection = None
for attempt in range(5):
    try:
        connection = pika.BlockingConnection(connection_params)
        break
    except Exception as e:
        print(f"Attempt {attempt + 1} failed: {e}")
        if attempt > 4:
            raise RuntimeError("Failed to connect to RabbitMQ after 5 attempts. Please check the connection parameters.")
        print("Retrying in 5 seconds...")
        time.sleep(5)

if connection is None:
    raise RuntimeError("Connection to RabbitMQ was not established.")
channel = connection.channel()
channel.queue_declare(queue='task_queue', durable=True)

# Starting/Pausing tasks
@app.put("/api/tasks/{task_id}/start")
def start_task(task_id: UUID, db: Session = Depends(get_db)):
    try:
        statement = select(Tasks).where(Tasks.Id == task_id)
        task = db.exec(statement).first()
        
        if task is None:
            raise HTTPException(status_code=404, detail="Task not found")
        
        task_history_sql = select(TaskHistories).where(TaskHistories.TaskId == task_id).order_by(desc(TaskHistories.ChangeDate)).limit(1)
        if task_history_sql is None:
            raise HTTPException(status_code=404, detail="Task history not found")
        
        task_history_prev = db.exec(task_history_sql).first()
        if task_history_prev is None:
            raise HTTPException(status_code=404, detail="Task history not found")
        task_history = TaskHistories(
            Id=UUID(),
            TaskId=task_id,
            ChangeDate=datetime.now(),
            NewStatus="In Progress",
            OldStatus=task_history_prev.NewStatus
        )
        
        in_progress_status = db.exec(
            select(TaskStatuses).where(TaskStatuses.Name == "In Progress")
        ).first()
        
        if in_progress_status:
            if in_progress_status.Id is not None:
                task.TaskStatusId = in_progress_status.Id
            else:
                raise HTTPException(status_code=500, detail="In Progress status ID is None")
            db.add(task_history)
            db.commit()
            
            message = {"action": "task_started", "task_id": str(task_id)}
            channel.basic_publish(
                exchange='',
                routing_key='task_queue',
                body=json.dumps(message),
                properties=pika.BasicProperties(delivery_mode=2)
            )
            
        return {"status": "Task started", "task_id": str(task_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/api/tasks/{task_id}/pause")
def pause_task(task_id: UUID, db: Session = Depends(get_db)):
    try:
        statement = select(Tasks).where(Tasks.Id == task_id)
        task = db.exec(statement).first()
        
        if task is None:
            raise HTTPException(status_code=404, detail="Task not found")
        
        task_history_sql = select(TaskHistories).where(TaskHistories.TaskId == task_id).order_by(desc(TaskHistories.ChangeDate)).limit(1)
        if task_history_sql is None:
            raise HTTPException(status_code=404, detail="Task history not found")
        
        task_history_prev = db.exec(task_history_sql).first()
        if task_history_prev is None:
            raise HTTPException(status_code=404, detail="Task history not found")
        
        task_history = TaskHistories(
            Id=UUID(),
            TaskId=task_id,
            ChangeDate=datetime.now(),
            NewStatus="Paused",
            OldStatus=task_history_prev.NewStatus
        )
        
        paused_status = db.exec(
            select(TaskStatuses).where(TaskStatuses.Name == "Paused")
        ).first()
        
        if paused_status:
            if paused_status.Id is not None:
                task.TaskStatusId = paused_status.Id
            else:
                raise HTTPException(status_code=500, detail="Paused status ID is None")
            db.add(task_history)
            db.commit()
            
            message = {"action": "task_paused", "task_id": str(task_id)}
            channel.basic_publish(
                exchange='',
                routing_key='task_queue',
                body=json.dumps(message),
                properties=pika.BasicProperties(delivery_mode=2)
            )
            
        return {"status": "Task paused", "task_id": str(task_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# Sprint management
@app.post("/api/sprints/")
def create_sprint(sprint: Sprints, db: Session = Depends(get_db)):
    try:
        db.add(sprint)
        db.commit()
        db.refresh(sprint)
        return sprint
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/api/sprints/{sprint_id}")
def get_sprint(sprint_id: UUID, db: Session = Depends(get_db)):
    statement = select(Sprints).where(Sprints.Id == sprint_id)
    sprint = db.exec(statement).first()
    if not sprint:
        raise HTTPException(status_code=404, detail="Sprint not found")
    return sprint

@app.put("/api/sprints/{sprint_id}")
def update_sprint(sprint_id: UUID, sprint_update: Sprints, db: Session = Depends(get_db)):
    try:
        statement = select(Sprints).where(Sprints.Id == sprint_id)
        db_sprint = db.exec(statement).first()
        
        if db_sprint is None:
            raise HTTPException(status_code=404, detail="Sprint not found")
        
        for field, value in sprint_update.dict(exclude_unset=True).items():
            if value is not None:
                setattr(db_sprint, field, value)
        
        db.add(db_sprint)
        db.commit()
        db.refresh(db_sprint)
        return db_sprint
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/sprints/{sprint_id}")
def delete_sprint(sprint_id: UUID, db: Session = Depends(get_db)):
    try:
        statement = select(Sprints).where(Sprints.Id == sprint_id)
        sprint = db.exec(statement).first()
        
        if sprint is None:
            raise HTTPException(status_code=404, detail="Sprint not found")
        
        db.delete(sprint)
        db.commit()
        return {"status": "Sprint deleted"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
