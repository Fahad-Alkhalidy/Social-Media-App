const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    method: ["GET", "POST"],
  },
});
const userSocketMap = {};
io.on("connection", (socket) => {
  console.log(`User is connected to ${socket.id}`);

  const userId = socket.handshake.query.userId;
  //io.emit will send events to all connected clients to the socket
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  if (userId) userSocketMap[userId] = socket.id;
  socket.on("disconnect", () => {
    console.log("user disconnected from server");
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});
module.exports = { app, io, server };

exports.getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};
