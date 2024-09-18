import React, { useState, useEffect, useContext } from "react";
import context from "../context";

import io from "socket.io-client";

const ChatWindow = ({ roomId }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const { user } = useContext(context);

  // Lấy tin nhắn của phòng từ server khi phòng thay đổi
  useEffect(() => {
    async function getMessages() {
      try {
        const res = await fetch(`http://localhost:5000/chat/${roomId}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setMessages(data.data.messages);
      } catch (error) {
        console.log(error.message);
      }
    }
    getMessages();
    const socket = io(`http://localhost:5000`, { transports: ["websocket"] });
    socket.on("sendMessage", (data) => {
      if (data.action === "send")
        setMessages((prev) => [...prev, data.message]);
      if (data.action === "delete") setMessages([]);
    });
  }, []);

  // Gửi tin nhắn mới
  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const newMessage = {
        message: inputText,
        isClient: true,
        roomId,
        email: user.email,
      };
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessage),
        credentials: "include",
      });
      if (!res.ok) throw new Error("cant send message!");
      setInputText("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Room {roomId}</h2>

      {/* Khu vực hiển thị tin nhắn */}
      <div className="flex-1 overflow-y-auto mb-4"></div>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`${
            !message.isClient ? "justify-end" : "justify-start"
          } flex mb-2`}>
          <div
            className={`${
              !message.isClient ? "bg-blue-500 text-white" : "bg-gray-200"
            } p-2 rounded-lg max-w-xs`}>
            {message.message}
          </div>
        </div>
      ))}
      {/* Input để nhập tin nhắn */}
      <div className="flex">
        <input
          type="text"
          className="flex-1 p-2 border rounded-l"
          placeholder="Enter message"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
