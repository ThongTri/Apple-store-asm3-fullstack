import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // URL của server Node.js

const ChatPage = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Fetch danh sách room chat từ server
    fetch("/chat-rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }, []);

  const joinRoom = (roomId) => {
    setSelectedRoom(roomId);
    socket.emit("joinRoom", { roomId });

    // Fetch các tin nhắn trong room
    fetch(`/chat-room/${roomId}`)
      .then((res) => res.json())
      .then((data) => setMessages(data));
  };

  const sendMessage = () => {
    const message = {
      roomId: selectedRoom,
      text: newMessage,
      senderId: "admin",
    }; // Cần chỉnh `senderId` theo người dùng thực tế
    socket.emit("sendMessage", message);

    // Gửi tin nhắn đến server và thêm vào danh sách tin nhắn hiện tại
    setMessages([...messages, { sender: "admin", text: newMessage }]);
    setNewMessage("");
  };

  useEffect(() => {
    // Lắng nghe tin nhắn mới
    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  return (
    <div className="flex border">
      <div className="w-1/4 border">
        <h3>Rooms</h3>
        <ul>
          {rooms.map((room) => (
            <li
              key={room.roomId}
              onClick={() => joinRoom(room.roomId)}
              className="border">
              Room {room.roomId}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4 border">
        <h3>Chat</h3>
        <div>
          {messages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.sender.name}</strong>: {msg.text}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
