import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // URL của server Node.js

const LiveChat = () => {
  const [roomId, setRoomId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    // Khi client vào, tạo một room mới và tham gia
    fetch("/create-room", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientId: "clientId_placeholder" }), // Đổi clientId theo người dùng thực tế
    })
      .then((res) => res.json())
      .then((data) => {
        setRoomId(data.roomId);
        socket.emit("joinRoom", { roomId: data.roomId });
      });
  }, []);

  const sendMessage = () => {
    const message = { roomId, text: inputText, senderId: "client" }; // Cần chỉnh `senderId` theo người dùng thực tế
    socket.emit("sendMessage", message);

    // Gửi tin nhắn đến server và thêm vào danh sách tin nhắn hiện tại
    setMessages([...messages, { sender: "client", text: inputText }]);
    setInputText("");
  };

  useEffect(() => {
    // Lắng nghe tin nhắn mới từ admin
    socket.on("inputText", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  return (
    <div>
      <h3>Live Chat</h3>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender.name}</strong>: {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default LiveChat;
