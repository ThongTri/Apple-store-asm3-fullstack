import React, { useState, useEffect } from "react";
import ChatSidebar from "../comps/ChatSideBar";
import ChatWindow from "../comps/ChatWindow";
import io from "socket.io-client";

const LiveChat = () => {
  const [roomIds, setRoomIds] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    async function getRooms() {
      try {
        const res = await fetch("http://localhost:5000/chat", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        console.log(data);
        if (!res.ok) throw new Error("cant get room");
        setRoomIds(data.data.rooms);
      } catch (error) {}
    }
    getRooms();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar hiển thị danh sách roomId */}
      <ChatSidebar roomIds={roomIds} setSelectedRoom={setSelectedRoom} />

      {/* Khu vực hiển thị tin nhắn của phòng đã chọn */}
      <div className="flex-1 p-4">
        {selectedRoom ? (
          <ChatWindow roomId={selectedRoom} />
        ) : (
          <div className="text-center text-gray-500">
            Please select a chat room
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveChat;
