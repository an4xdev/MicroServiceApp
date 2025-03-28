# fastapi dev main.py

from fastapi import FastAPI, HTTPException
import pika
import json

app = FastAPI()

credentials = pika.PlainCredentials('user', 'password')
connection_params = pika.ConnectionParameters(host='rabbitmq', credentials=credentials,port=5672)
try:
    connection = pika.BlockingConnection(connection_params)
except RuntimeError as e:
    print(f"Connection failed: {e}")
    raise RuntimeError("Failed to connect to RabbitMQ. Please check the connection parameters.")
channel = connection.channel()
channel.queue_declare(queue='task_queue', durable=True)

@app.post("/send/")
def send_message(task: str):
    message = {"task": task}
    try:
        channel.basic_publish(
            exchange='',
            routing_key='task_queue',
            body=json.dumps(message),
            properties=pika.BasicProperties(delivery_mode=2)
        )
        return {"status": "Wiadomość wysłana", "task": task}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
