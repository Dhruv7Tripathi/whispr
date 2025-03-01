"use client"
import { useSocket } from "../hooks/useSocket";
import { useState } from "react";

export default function Home() {
  const { socket, messages } = useSocket();
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (socket && message.trim() !== "") {
      console.log("📤 Sending message:", message);
      socket.emit("chat message", message); // Send message to server
      setMessage("");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Socket.IO Chat</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>

      <h2>Messages:</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}
