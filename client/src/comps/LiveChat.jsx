import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";

import { FaFacebookMessenger } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";

const LiveChat = () => {
  const roomId = localStorage.getItem("roomId");
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isChat, setIsChat] = useState(false);
  const user = useSelector((store) => store.curUser);
  let email;
  if (!user) email = undefined;
  else email = user.email;
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
      if (data.action === "delete") {
        setMessages([]);
        localStorage.removeItem("roomId");
      }
    });
  }, []);
  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    try {
      const newMessage = {
        message: inputText,
        isClient: true,
        roomId,
        email,
      };
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessage),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      localStorage.setItem("roomId", data.data.message.chatRoom);
      setInputText("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 m-4">
      {isChat && (
        <div className="flex flex-col h-[500px] w-[500px] border rounded-lg overflow-hidden bg-white right-[80px] bottom-[80px] absolute animated-comp">
          <h2 className="font-bold px-8 py-4 border-b">Customer Support</h2>
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${
                  message.isClient ? "justify-end" : "justify-start"
                } flex mb-2`}>
                {" "}
                {!message.isClient && (
                  <MdOutlineSupportAgent className="text-[24px] mr-1" />
                )}
                <div
                  className={`${
                    message.isClient ? "bg-blue-500 text-white" : "bg-gray-200"
                  } p-2 rounded-lg max-w-xs`}>
                  {message.message}
                </div>
              </div>
            ))}
          </div>
          <form className="flex p-4 border-t">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-2 rounded-full bg-gray-200 focus:outline-none"
              placeholder="Type a message..."
            />
            <button
              type="submit"
              onClick={handleMessageSubmit}
              className="ml-2 px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none">
              Send
            </button>
          </form>
        </div>
      )}
      <button
        type="button"
        onClick={() => setIsChat((prev) => !prev)}
        className="right-[50px] bottom-[50px] text-[32px] absolute bg-white rounded-full p-2">
        <FaFacebookMessenger />
      </button>
    </div>
  );
};

export default LiveChat;
