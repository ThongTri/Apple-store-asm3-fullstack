import React from "react";

const ChatSidebar = ({ roomIds, setSelectedRoom }) => {
  return (
    <div className="w-64 bg-white p-4 shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Chat Rooms</h2>
      <ul>
        {roomIds.length > 0 ? (
          roomIds.map((roomId) => (
            <li
              key={roomId._id}
              onClick={() => setSelectedRoom(roomId._id)}
              className="p-2 mb-2 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer">
              Room {roomId._id}
            </li>
          ))
        ) : (
          <li className="text-gray-500">No rooms available</li>
        )}
      </ul>
    </div>
  );
};

export default ChatSidebar;
