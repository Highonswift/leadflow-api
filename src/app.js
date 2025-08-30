import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import assistantRoutes from './routes/assistantRoutes.js';
import conversationRoutes from './routes/conversationRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/assistants', assistantRoutes);
app.use('/api/conversation', conversationRoutes);

export default app;
