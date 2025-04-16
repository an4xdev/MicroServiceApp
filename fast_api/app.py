# fastapi dev main.py

from fastapi import FastAPI, HTTPException, Depends
from uuid import UUID
from sqlalchemy.orm import Session
from database import SessionLocal, get_db
import pika
import json
import time
import models

app = FastAPI()

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

# @app.post("/send/")
# def send_message(task: str):
#     message = {"task": task}
#     try:
#         channel.basic_publish(
#             exchange='',
#             routing_key='task_queue',
#             body=json.dumps(message),
#             properties=pika.BasicProperties(delivery_mode=2)
#         )
#         return {"status": "Message sent", "task": task}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# Starting/Pausing tasks
@app.put("/api/tasks/{task_id}/start")
def start_task(task_id: UUID, db: Session = Depends(get_db)):
    try:
        # TODO: add to task history and send message to RabbitMQ
        task = db.query(models.Tasks).filter_by(Id=task_id).first()
        if task is None:
            raise HTTPException(status_code=404, detail="Task not found")
        return {"status": "Task started", "task_id": task_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/api/tasks/{task_id}/pause")
def pause_task(task_id: UUID, db: Session = Depends(get_db)):
    try:
        # TODO: add to task history and send message to RabbitMQ
        task = db.query(models.Tasks).filter_by(Id=task_id).first()
        if task is None:
            raise HTTPException(status_code=404, detail="Task not found")
        return {"status": "Task started", "task_id": task_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# Sprint management
@app.post("/api/sprints/")
def create_sprint(sprint: models.Sprints, db: Session = Depends(get_db)):
    try:
        db.add(sprint)
        db.commit()
        db.refresh(sprint)
        return sprint
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/api/sprints/{sprint_id}")
def get_sprint(sprint_id: UUID, db: Session = Depends(get_db)):
    try:
        sprint = db.query(models.Sprints).filter_by(Id=sprint_id).first()
        if sprint is None:
            raise HTTPException(status_code=404, detail="Sprint not found")
        return sprint
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.put("/api/sprints/{sprint_id}")
def update_sprint(sprint_id: UUID, sprint: models.Sprints, db: Session = Depends(get_db)):
    try:
        db_sprint = db.query(models.Sprints).filter_by(Id=sprint_id).first()
        if db_sprint is None:
            raise HTTPException(status_code=404, detail="Sprint not found")
        # TODO: think about what to update and check for null values?
        db_sprint.Name = sprint.Name
        db_sprint.TeamId = sprint.TeamId
        db_sprint.ManagerId = sprint.ManagerId
        db_sprint.ProjectId = sprint.ProjectId
        db_sprint.EndDate = sprint.EndDate
        db_sprint.StartDate = sprint.StartDate
        db.commit()
        db.refresh(db_sprint)
        return db_sprint
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/sprints/{sprint_id}")
def delete_sprint(sprint_id: UUID, db: Session = Depends(get_db)):
    try:
        sprint = db.query(models.Sprints).filter_by(Id=sprint_id).first()
        if sprint is None:
            raise HTTPException(status_code=404, detail="Sprint not found")
        db.delete(sprint)
        db.commit()
        return {"status": "Sprint deleted"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))