import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import assistantRoutes from './routes/assistantRoutes.js';
import conversationRoutes from './routes/conversationRoutes.js';
import workflowRoutes from './routes/workflowRoutes.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: '*', // or ['http://localhost:3000', 'https://yourdomain.com']
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/assistants', assistantRoutes);
app.use('/api/conversation', conversationRoutes);
app.use('/api/deals', conversationRoutes);
app.use('/api/workflows', workflowRoutes);

export default app;
