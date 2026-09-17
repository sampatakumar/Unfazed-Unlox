export const initChatSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`[Socket.io] Client connected: ${socket.id}`);

    // Join conversation room
    socket.on("join_room", ({ roomId, userName }) => {
      socket.join(roomId);
      console.log(`[Socket.io] User ${userName || socket.id} joined room: ${roomId}`);
    });

    // Send chat message
    socket.on("send_message", (data) => {
      // data: { roomId, sender, message, timestamp }
      io.to(data.roomId).emit("receive_message", {
        ...data,
        id: `msg_${Date.now()}`,
      });
    });

    // Typing indicators
    socket.on("typing", ({ roomId, userName, isTyping }) => {
      socket.to(roomId).emit("user_typing", { userName, isTyping });
    });

    socket.on("disconnect", () => {
      console.log(`[Socket.io] Client disconnected: ${socket.id}`);
    });
  });
};

export default initChatSocket;
