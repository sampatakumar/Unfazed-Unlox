import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import therapistRoutes from "./routes/therapistRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import schedulingRoutes from "./routes/schedulingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Mount API Routes
app.use("/api/auth", authRoutes);
app.use("/api/therapists", therapistRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/scheduling", schedulingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/analytics", analyticsRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    platform: "Unfazed MERN SaaS API",
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use(errorHandler);

export default app;