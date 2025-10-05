import { Server } from "socket.io";
import http from "http";
import app from "./app.js"; 
import { saveMessage } from "./controllers/message.controllers.js";

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
  },
  transports: ["websocket", "polling"] 
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("joinRoom", (roomId: string) => {
    socket.join(roomId);
    console.log(`${socket.id} joined room ${roomId}`);
  });

  socket.on("sendMessage", async (data: { roomId: string; message: string; sender: string }) => {
    console.log("Received message:", data);
    
    try {
      const savedMessage = await saveMessage(data.roomId, data.sender, data.message);

      io.to(data.roomId).emit("receiveMessage", savedMessage);
      
    } catch (error) {
      console.error("Error saving message:", error);
      
      socket.emit("messageError", { error: "Failed to save message" });
    }
  });

  socket.on("disconnect", (reason) => {
    console.log("Client disconnected:", socket.id, "Reason:", reason);
  });

  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});

export default server;