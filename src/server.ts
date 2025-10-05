import { Server } from "socket.io";
import http from "http";
import app from "./app.js"; 
import { saveMessage } from "./controllers/message.controllers.js";

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});


io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("joinRoom", (roomId: string) => {
    socket.join(roomId);
    console.log(`${socket.id} joined room ${roomId}`);
  });

  socket.on("sendMessage", async (data: { roomId: string; message: string; sender: string }) => {
    console.log("I am working for the send message")
    const savedMessage = await saveMessage(data.roomId, data.sender, data.message);

    socket.to(data.roomId).emit("receiveMessage", savedMessage);

    socket.emit("messageSent", savedMessage);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

export default server;
