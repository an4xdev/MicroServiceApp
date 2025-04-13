package main

import (
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
	"github.com/streadway/amqp"
)

var (
	clients   = make(map[*websocket.Conn]bool)
	broadcast = make(chan string)
	upgrader  = websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool { return true },
	}
)

func main() {
	go consumeRabbitMQ()

	http.HandleFunc("/ws", handleConnections)

	go handleMessages()

	log.Println("Go server with WebSocket on port :8080")
	if err := http.ListenAndServe("localhost:8080", nil); err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

func handleConnections(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Upgrade error:", err)
		return
	}
	defer ws.Close()

	clients[ws] = true

	for {
		_, msg, err := ws.ReadMessage()
		if err != nil {
			log.Println("ReadMessage error:", err)
			delete(clients, ws)
			break
		}
		log.Printf("Received from client: %s", msg)
	}
}

func handleMessages() {
	for {
		msg := <-broadcast
		for client := range clients {
			err := client.WriteMessage(websocket.TextMessage, []byte(msg))
			if err != nil {
				log.Printf("Error sending message: %v", err)
				client.Close()
				delete(clients, client)
			}
		}
	}
}

func consumeRabbitMQ() {
	var conn *amqp.Connection
	var err error

	for i := range 5 {
		conn, err = amqp.Dial("amqp://user:password@rabbitmq:5672/")
		if err == nil {
			break
		}
		log.Printf("Connection to RabbitMQ failed, attempt %d: %v", i+1, err)
		log.Printf("Retrying in 5 seconds...")
		time.Sleep(5 * time.Second)
	}

	if err != nil {
		log.Fatalf("Failed to connect to RabbitMQ after 5 attempts: %v", err)
		panic(err)
	}
	defer conn.Close()

	ch, err := conn.Channel()
	if err != nil {
		log.Fatalf("Error opening channel: %v", err)
	}
	defer ch.Close()

	q, err := ch.QueueDeclare(
		"task_queue",
		true,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		log.Fatalf("Error declaring queue: %v", err)
	}

	msgs, err := ch.Consume(
		q.Name,
		"",
		true,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		log.Fatalf("Error consuming messages: %v", err)
	}

	for d := range msgs {
		log.Printf("Received message from queue: %s", d.Body)
		broadcast <- string(d.Body)
	}
}
