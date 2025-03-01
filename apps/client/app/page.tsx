"use client"
import { useState } from "react";
import { useSocket } from "../hooks/useSocket";

export default function Home() {
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const { messages, sendMessage } = useSocket(joined ? room : "");

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>🔥 Chat with Rooms</h1>

      {!joined ? (
        <div>
          <input
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="Enter room name"
          />
          <button onClick={() => setJoined(true)}>Join Room</button>
        </div>
      ) : (
        <div>
          <h2>Room: {room}</h2>
          <button onClick={() => setJoined(false)}>Leave Room</button>

          <input
            type="text"
            placeholder="Type a message..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage(e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }}
          />

          <h2>Messages:</h2>
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
