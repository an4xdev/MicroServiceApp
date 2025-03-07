// index.js
import express from "express";
const app = express();
const port = process.env.PORT || 6713;

// Przykładowy endpoint, który zwraca obiekt JSON
app.get("/test", (req, res) => {
  res.json({
    message: "Hello from Express!",
    timestamp: new Date().toISOString(),
  });
});

// Uruchomienie serwera
app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});
