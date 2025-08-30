import express from 'express';
import {
  createAssistant,
  getAssistants,
  getAssistantById,
  updateAssistant,
  deleteAssistant
} from '../controllers/assistantController.js';
import { authenticate } from '../middlewares/authMiddlewares.js';

const router = express.Router();

router.post('/', authenticate, createAssistant);
router.get('/', authenticate, getAssistants);
router.get('/:id', authenticate, getAssistantById);
router.put('/:id', authenticate, updateAssistant);
router.delete('/:id', authenticate, deleteAssistant);

export default router;
