import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("🔥 WebSocket server with rooms is running!");
});

io.on("connection", (socket) => {
  console.log("✅ A user connected:", socket.id);

  // ✅ Join Room
  socket.on("join room", (room) => {
    socket.join(room);
    console.log(`📌 User ${socket.id} joined room: ${room}`);
    socket.emit("room joined", room); // Notify client
  });

  // ✅ Listen for messages in a room
  socket.on("chat message", ({ room, message }) => {
    console.log(`📩 Message in Room ${room}:`, message);
    io.to(room).emit("chat message", message); // Send message only to users in the same room
  });

  // ✅ Leave Room
  socket.on("leave room", (room) => {
    socket.leave(room);
    console.log(`🚪 User ${socket.id} left room: ${room}`);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

server.listen(4000, () => {
  console.log("🚀 Server running at http://localhost:4000");
});
