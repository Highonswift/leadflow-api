import prisma from '../config/db.js'; // your Prisma client instance
import { v4 as uuidv4 } from 'uuid';

// Start a new conversation
export const startConversation = async (req, res) => {
  try {
    const { userId, customerName, customerEmail, source, type } = req.body;

    const conversation = await prisma.conversation.create({
      data: {
        userId,
        customerName,
        customerEmail,
        source,
        type,
        sessionId: uuidv4(),
        status: 'open'
      }
    });

    res.status(201).json({ success: true, conversation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add a message to a conversation
export const addMessage = async (req, res) => {
  try {
    const { conversationId, sender, content, messageType } = req.body;

    const message = await prisma.message.create({
      data: {
        conversationId,
        sender,
        content,
        messageType
      }
    });

    res.status(201).json({ success: true, message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add a call log entry
export const addCallLog = async (req, res) => {
  try {
    const { conversationId, duration, cost, success } = req.body;

    const callLog = await prisma.callLog.create({
      data: {
        conversationId,
        duration,
        cost,
        success
      }
    });

    res.status(201).json({ success: true, callLog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Close a conversation and optionally create a lead
export const closeConversation = async (req, res) => {
  try {
    const { conversationId, summary, endReason, convertToLead, leadData } = req.body;

    const updatedConversation = await prisma.conversation.update({
      where: { id: conversationId },
      data: {
        status: convertToLead ? 'converted' : 'closed',
        summary,
        endReason
      }
    });

    let lead = null;
    if (convertToLead && leadData) {
      lead = await prisma.lead.create({
        data: {
          conversationId,
          name: leadData.name,
          email: leadData.email,
          phone: leadData.phone
        }
      });
    }

    res.status(200).json({ success: true, conversation: updatedConversation, lead });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all conversations with summary info
export const getAllConversations = async (req, res) => {
  try {
    const conversations = await prisma.conversation.findMany({
      include: {
        user: true,
        lead: true
      },
      orderBy: { updatedAt: 'desc' }
    });

    res.status(200).json({ success: true, conversations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single conversation with messages and call logs
export const getConversationDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const conversation = await prisma.conversation.findUnique({
      where: { id: parseInt(id) },
      include: {
        messages: true,
        callLogs: true,
        lead: true,
        user: true
      }
    });

    if (!conversation) {
      return res.status(404).json({ success: false, message: 'Conversation not found' });
    }

    res.status(200).json({ success: true, conversation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
