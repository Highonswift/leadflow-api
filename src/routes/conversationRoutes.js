import express from 'express';
import {
  startConversation,
  addMessage,
  addCallLog,
  closeConversation,
  getAllConversations,
  getConversationDetails
} from '../controllers/conversationController.js';

const router = express.Router();

router.post('/start', startConversation);
router.post('/message', addMessage);
router.post('/call-log', addCallLog);
router.post('/close', closeConversation);
router.get('/', getAllConversations);
router.get('/:id', getConversationDetails);

export default router;
