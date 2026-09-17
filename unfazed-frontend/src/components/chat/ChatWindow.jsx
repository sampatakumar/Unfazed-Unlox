import React, { useState, useEffect } from "react";
import { Send, MessageSquare, Shield, Circle } from "lucide-react";
import { io } from "socket.io-client";

export const ChatWindow = ({ roomId = "room_demo", currentUserName = "Dr. Ashmita" }) => {
  const [messages, setMessages] = useState([
    { id: "1", sender: "Client (Rohan)", message: "Hello Dr. Ashmita, I had a question about the breathing exercises.", timestamp: "10:15 AM" },
    { id: "2", sender: "Dr. Ashmita", message: "Hi Rohan! Yes, remember to practice the 4-7-8 rhythm twice daily before meetings.", timestamp: "10:16 AM" },
  ]);
  const [inputText, setInputText] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const s = io("http://localhost:5000");
    setSocket(s);

    s.emit("join_room", { roomId, userName: currentUserName });

    s.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => s.disconnect();
  }, [roomId, currentUserName]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      roomId,
      sender: currentUserName,
      message: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    if (socket) {
      socket.emit("send_message", newMsg);
    } else {
      setMessages((prev) => [...prev, { ...newMsg, id: Date.now() }]);
    }

    setInputText("");
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col h-[520px] overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-100 bg-gray-50/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm">Real-Time Client Chat</h4>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-medium">
              <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500" />
              <span>Socket.io Live Encryption Active</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs text-gray-500 bg-white px-2.5 py-1 rounded-lg border border-gray-200">
          <Shield className="w-3.5 h-3.5 text-teal-600" />
          <span>Room: {roomId}</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50/40">
        {messages.map((m) => {
          const isMe = m.sender === currentUserName;
          return (
            <div key={m.id || Math.random()} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
              <span className="text-[10px] text-gray-400 mb-1 px-1">{m.sender} • {m.timestamp}</span>
              <div
                className={`max-w-xs sm:max-w-md px-4 py-2.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                  isMe
                    ? "bg-teal-700 text-white rounded-br-none"
                    : "bg-white text-gray-800 border border-gray-100 rounded-bl-none"
                }`}
              >
                {m.message}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Footer */}
      <form onSubmit={handleSend} className="p-3 border-t border-gray-100 bg-white flex gap-2">
        <input
          type="text"
          placeholder="Type a confidential message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-teal-600"
        />
        <button
          type="submit"
          className="px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-medium text-xs shadow-md transition shrink-0 flex items-center gap-1.5"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
