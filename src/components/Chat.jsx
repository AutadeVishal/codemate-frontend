import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSocketConnection } from "../utils/socket";

const Chat = () => {
  const { toUserId } = useParams();
  const user = useSelector((store) => store.user);

  const socketRef = useRef(null); // 🔑 keep socket stable across renders

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const userId = user._id;
  const firstName = user.firstName;

  const sendMessage = () => {
    if (!newMessage.trim()) return; // don’t send empty messages
    socketRef.current.emit("sendMessage", {
      firstName,
      userId,
      toUserId,
      text: newMessage,
    });
    setMessages((prev) => [...prev, { firstName, text: newMessage }]); // 👈 show own msg instantly
    setNewMessage(""); // reset input
  };

  useEffect(() => {
    socketRef.current = createSocketConnection();

    socketRef.current.emit("joinChat", { firstName, userId, toUserId });

    socketRef.current.on("messageReceived", ({ firstName, text }) => {
      console.log(`Message Received from ${firstName}: ${text}`);
      setMessages((prev) => [...prev, { firstName, text }]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [toUserId, userId, firstName]);

  return (
    <div className="relative flex flex-col gap-5 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-white px-6 py-4 rounded-2xl max-w-2xl mx-auto w-full">
      <h1 className="text-3xl font-bold text-center">Chat</h1>

      {/* Messages */}
      <div className="flex-1 w-full max-h-[400px] overflow-y-auto space-y-2 p-2 bg-black/20 rounded-xl">
        {messages.length === 0 && (
          <p className="text-gray-300 text-center">No messages yet</p>
        )}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-xl max-w-[70%] ${
              msg.firstName === firstName
                ? "ml-auto bg-blue-500/60 text-white"
                : "mr-auto bg-gray-700/60 text-gray-100"
            }`}
          >
            <span className="block text-xs opacity-70">{msg.firstName}</span>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>

      {/* Input + Button */}
      <div className="flex items-center gap-3 w-full">
        <input
          type="text"
          value={newMessage} // 🔑 controlled input
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 px-4 py-2 rounded-full bg-black/30 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="px-5 py-2 rounded-full bg-blue-500/70 hover:bg-blue-600/80 transition shadow-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
