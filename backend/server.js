import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import { app, server } from "./socket/socket.js";  // Import socket server

dotenv.config(); // Loads the environment variables

console.log("Mongo URI:", process.env.MONGO_URI);  // Check if the URI is correctly loaded

// MongoDB connection
const connectToMongoDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("Error connecting to MongoDB:", err));
};

const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// Catch-all route to serve frontend index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Start the server and MongoDB connection
server.listen(PORT, () => {
  connectToMongoDB();  // Ensure MongoDB connection is established when the server starts
  console.log(`Server Running on port ${PORT}`);
});
