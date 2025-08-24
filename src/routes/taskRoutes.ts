/** @format */

import { Router } from 'express';
import { TaskController } from '../controllers/taskController';
import { validateTaskInput, validateTaskId } from '../middleware/validation';

const router = Router();

// Get all tasks
router.get('/', TaskController.getAllTasks);

// Create a new task
router.post('/', validateTaskInput, TaskController.createTask);

// Update a task
router.put(
	'/:id',
	validateTaskId,
	validateTaskInput,
	TaskController.updateTask,
);

// Delete a task
router.delete('/:id', validateTaskId, TaskController.deleteTask);

// Toggle task completion
router.patch(
	'/:id/toggle',
	validateTaskId,
	TaskController.toggleTaskCompletion,
);

export default router;
