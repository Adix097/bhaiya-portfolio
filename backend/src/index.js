import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import collectionsRouter from "./routes/collections.js";
import projectsRouter from "./routes/projects.js";
import adminRouter from "./routes/admin.js";
import contactRouter from "./routes/contact.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 5000;

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());

// Routes
app.use("/api/collections", collectionsRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/admin", adminRouter);
app.use("/api/contact", contactRouter);

// Health check
app.get("/api/health", (_, res) => res.json({ status: "ok" }));
app.use((_, res) => res.status(404).json({ message: "Route not found" }));

// Error handler
app.use((err, _req, res, _next) => {
  res.status(500).json({ message: "Internal server error" });
});

// listen
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, "0.0.0.0", () =>
      console.log(`Server running on port ${PORT}`),
    );
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
