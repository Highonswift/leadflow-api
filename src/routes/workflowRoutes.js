import express from "express";
import {createWorkflow, getWorkflows, updateWorkflow, deleteWorkflow} from "../controllers/workflowController.js";

const router = express.Router();

router.post("/", createWorkflow);
router.get("/", getWorkflows);
router.get("/:id", getWorkflows);
router.put("/:id", updateWorkflow);
router.delete("/:id", deleteWorkflow);

export default router;