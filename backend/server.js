const mongoose = require("mongoose");
const dotenv = require("dotenv");
const WebSocket = require("ws");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASS
);

mongoose.connect(DB, {}).then(() => console.log("Connected To Database"));

const port = process.env.PORT || 3000;

// Start the Express server using app.listen
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

// Attach WebSocket server to the existing HTTP server
const wss = new WebSocket.Server({ server });

// WebSocket connection handling
wss.on("connection", (ws) => {
  console.log("New WebSocket connection");

  // Listen for incoming WebSocket messages
  ws.on("message", (message) => {
    console.log("Received message:", message);
    // Optionally send a response back to the client
    ws.send(`Server received your message: ${message}`);
  });

  // Handle WebSocket connection close
  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
