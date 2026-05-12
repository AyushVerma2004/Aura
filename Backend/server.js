import "dotenv/config";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import captionRoute from "./routes/caption.js";
import hashtagRoute from "./routes/hashtags.js";
import ideasRoute from "./routes/ideas.js";
import trendingRoute from "./routes/trending.js";

const app = express();
const PORT = process.env.PORT || 5000;

// ─────────────────────────────────────────────
// Middlewares
// ─────────────────────────────────────────────

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Body parser middleware MUST come before routes
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// ─────────────────────────────────────────────
// Routes
// ─────────────────────────────────────────────

app.use("/api/auth", authRoutes);
app.use("/api/caption", captionRoute);
app.use("/api/hashtags", hashtagRoute);
app.use("/api/ideas", ideasRoute);
app.use("/api/trending", trendingRoute);

// ─────────────────────────────────────────────
// Health Route
// ─────────────────────────────────────────────

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    env: process.env.NODE_ENV,
    time: new Date().toISOString(),
    db:
      mongoose.connection.readyState === 1
        ? "connected"
        : "disconnected",
  });
});

// ─────────────────────────────────────────────
// 404 Handler
// ─────────────────────────────────────────────

app.use((req, res) => {
  res.status(404).json({
    message: `Route ${req.originalUrl} not found.`,
  });
});

// ─────────────────────────────────────────────
// Global Error Handler
// ─────────────────────────────────────────────

app.use((err, _req, res, _next) => {
  console.error("❌", err);

  // Mongoose validation
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map(
      (e) => e.message
    );

    return res.status(400).json({
      message: messages.join(". "),
    });
  }

  // Duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];

    return res.status(409).json({
      message: `${field} is already in use.`,
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      message: "Invalid token.",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      message: "Token has expired.",
    });
  }

  res.status(err.status || 500).json({
    message:
      err.message ||
      "Something went wrong. Please try again.",
  });
});

// ─────────────────────────────────────────────
// MongoDB Connection
// ─────────────────────────────────────────────

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(
        `🚀 AURA API running on http://localhost:${PORT}`
      );
    });
  })
  .catch((err) => {
    console.error(
      "❌ MongoDB connection failed:",
      err.message
    );

    process.exit(1);
  });