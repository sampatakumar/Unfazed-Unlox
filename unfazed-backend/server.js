import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import { initChatSocket } from "./src/sockets/chatSocket.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const server = http.createServer(app);

// Socket.io initialization
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

initChatSocket(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`[Unfazed API & Socket.io Server] Running on http://localhost:${PORT}`);
});