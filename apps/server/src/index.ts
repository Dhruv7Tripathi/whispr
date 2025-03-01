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

// ✅ Handle HTTP GET Request
app.get("/", (req, res) => {
  res.send("🔥 WebSocket server is running!");
});

io.on("connection", (socket) => {
  console.log("✅ A user connected");

  // Listen for "chat message" from client
  socket.on("chat message", (msg) => {
    console.log("📩 Received message:", msg);
    io.emit("chat message", msg); // Broadcast message to all clients
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected");
  });
});

server.listen(4000, () => {
  console.log("🚀 Server running at http://localhost:4000");
});
