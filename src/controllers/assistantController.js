import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

// Generate unique API Key
const generateApiKey = () => crypto.randomBytes(32).toString("hex");

// ✅ Create Assistant
export const createAssistant = async (req, res) => {
  try {
    const { name, description, type, voice, language, status, settings } = req.body;
    const userId = req.user.id; // from auth middleware

    const apiKey = generateApiKey();
    const embedCode = `<script src="https://yourdomain.com/embed/${apiKey}"></script>`;

    const assistant = await prisma.assistant.create({
      data: {
        userId,
        name,
        description,
        type: type || "voice",
        voice,
        language: language || "en-US",
        status: status || "active",
        embedCode,
        apiKey,
        settings
      }
    });

    res.status(201).json({
      success: true,
      message: "Assistant created successfully",
      data: assistant
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error creating assistant", error: error.message });
  }
};

// ✅ Get All Assistants for User
export const getAssistants = async (req, res) => {
  try {
    const userId = req.user.id;

    const assistants = await prisma.assistant.findMany({
      where: { userId }
    });

    res.status(200).json({
      success: true,
      data: assistants
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching assistants", error: error.message });
  }
};

// ✅ Get Single Assistant
export const getAssistantById = async (req, res) => {
  try {
    const { id } = req.params;
    const assistant = await prisma.assistant.findUnique({ where: { id: parseInt(id) } });

    if (!assistant) {
      return res.status(404).json({ success: false, message: "Assistant not found" });
    }

    res.status(200).json({ success: true, data: assistant });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching assistant", error: error.message });
  }
};

// ✅ Update Assistant
export const updateAssistant = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, type, voice, language, status, settings } = req.body;

    const assistant = await prisma.assistant.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        type,
        voice,
        language,
        status,
        settings
      }
    });

    res.status(200).json({ success: true, message: "Assistant updated successfully", data: assistant });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating assistant", error: error.message });
  }
};

// ✅ Delete Assistant
export const deleteAssistant = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.assistant.delete({ where: { id: parseInt(id) } });

    res.status(200).json({ success: true, message: "Assistant deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting assistant", error: error.message });
  }
};
