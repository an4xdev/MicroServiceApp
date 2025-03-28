package main

import (
	"log"
	"net/http"

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
	// Uruchomienie konsumenta RabbitMQ w osobnej gorutinie
	go consumeRabbitMQ()

	// Endpoint WebSocket
	http.HandleFunc("/ws", handleConnections)

	// Gorutyna rozsyłająca wiadomości do klientów
	go handleMessages()

	log.Println("Serwer Go z WebSocket na porcie :8080")
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
		// Odbieranie wiadomości od klienta (opcjonalnie)
		_, msg, err := ws.ReadMessage()
		if err != nil {
			log.Println("ReadMessage error:", err)
			delete(clients, ws)
			break
		}
		log.Printf("Otrzymano od klienta: %s", msg)
	}
}

func handleMessages() {
	for {
		msg := <-broadcast
		for client := range clients {
			err := client.WriteMessage(websocket.TextMessage, []byte(msg))
			if err != nil {
				log.Printf("Błąd wysyłania: %v", err)
				client.Close()
				delete(clients, client)
			}
		}
	}
}

func consumeRabbitMQ() {
	conn, err := amqp.Dial("amqp://user:password@rabbitmq:5672/")
	if err != nil {
		log.Fatalf("Błąd połączenia z RabbitMQ: %v", err)
		panic(err)
	}
	defer conn.Close()

	ch, err := conn.Channel()
	if err != nil {
		log.Fatalf("Błąd otwarcia kanału: %v", err)
	}
	defer ch.Close()

	q, err := ch.QueueDeclare(
		"task_queue", // nazwa kolejki
		true,         // trwała
		false,        // auto-delete
		false,        // ekskluzywna
		false,        // no-wait
		nil,
	)
	if err != nil {
		log.Fatalf("Błąd deklaracji kolejki: %v", err)
	}

	msgs, err := ch.Consume(
		q.Name, // nazwa kolejki
		"",     // konsument
		true,   // auto-ack
		false,  // ekskluzywna
		false,  // no-local
		false,  // no-wait
		nil,
	)
	if err != nil {
		log.Fatalf("Błąd konsumpcji: %v", err)
	}

	for d := range msgs {
		log.Printf("Otrzymano wiadomość z kolejki: %s", d.Body)
		// Przesłanie wiadomości do wszystkich podłączonych klientów WebSocket
		broadcast <- string(d.Body)
	}
}
