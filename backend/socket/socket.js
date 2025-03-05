const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
exports.getReceiverSocketId;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    method: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log(`User is connected to ${socket.id}`);
  socket.on("disconnect", () => {
    console.log("user disconnected from server");
  });
});
module.exports = { app, io, server };
