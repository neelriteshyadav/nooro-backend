/** @format */

import { Router } from 'express';
import { TaskController } from '../controllers/taskController';

const router = Router();

// Get all tasks
router.get('/', TaskController.getAllTasks);

// Create a new task
router.post('/', TaskController.createTask);

// Update a task
router.put('/:id', TaskController.updateTask);

// Delete a task
router.delete('/:id', TaskController.deleteTask);

// Toggle task completion
router.patch('/:id/toggle', TaskController.toggleTaskCompletion);

export default router;
