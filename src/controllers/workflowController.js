import prisma from '../config/db.js'; // your Prisma client instance

export const createWorkflow = async (req, res) => {
  try {
    const { name, nodes = [], edges = [] } = req.body;
    const workflow = await prisma.workflow.create({
      data: { name, nodes, edges },
    });
    res.json(workflow);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getWorkflows = async (req, res) => {
  try {
    const workflows = await prisma.workflow.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(workflows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateWorkflow = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, nodes, edges } = req.body;
    const workflow = await prisma.workflow.update({
      where: { id },
      data: { name, nodes, edges },
    });
    res.json(workflow);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteWorkflow = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.workflow.delete({ where: { id } });
    res.json({ message: "Workflow deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};