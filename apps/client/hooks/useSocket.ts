import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:4000";

export function useSocket(room: string) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // ✅ Connect to Socket.IO server
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);

    // ✅ Join the specified room
    if (room) {
      newSocket.emit("join room", room);
      console.log(`📌 Joined room: ${room}`);
    }

    // ✅ Listen for incoming messages
    newSocket.on("chat message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      // ✅ Leave the room when component unmounts
      if (room) {
        newSocket.emit("leave room", room);
        console.log(`🚪 Left room: ${room}`);
      }
      newSocket.disconnect();
    };
  }, [room]);

  // ✅ Function to send messages
  const sendMessage = (message: string) => {
    if (socket && room) {
      socket.emit("chat message", { room, message });
    }
  };

  return { messages, sendMessage };
}
