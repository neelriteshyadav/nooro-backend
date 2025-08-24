/** @format */

import { Request, Response } from 'express';
import { prisma } from '../database/prisma';
import {
	CreateTaskRequest,
	UpdateTaskRequest,
	TaskResponse,
} from '../types/task';

export class TaskController {
	// Get all tasks
	static async getAllTasks(req: Request, res: Response<TaskResponse>) {
		try {
			const tasks = await prisma.task.findMany({
				orderBy: { createdAt: 'desc' },
			});

			res.json({
				success: true,
				data: tasks,
			});
		} catch (error) {
			console.error('Error fetching tasks:', error);
			res.status(500).json({
				success: false,
				error: 'Failed to fetch tasks',
			});
		}
	}

	// Create a new task
	static async createTask(
		req: Request<{}, {}, CreateTaskRequest>,
		res: Response<TaskResponse>,
	) {
		try {
			const { title, color } = req.body;

			if (!title || title.trim().length === 0) {
				return res.status(400).json({
					success: false,
					error: 'Title is required',
				});
			}

			const task = await prisma.task.create({
				data: {
					title: title.trim(),
					color: color || 'blue',
				},
			});

			res.status(201).json({
				success: true,
				data: task,
				message: 'Task created successfully',
			});
		} catch (error) {
			console.error('Error creating task:', error);
			res.status(500).json({
				success: false,
				error: 'Failed to create task',
			});
		}
	}

	// Update a task
	static async updateTask(
		req: Request<{ id: string }, {}, UpdateTaskRequest>,
		res: Response<TaskResponse>,
	) {
		try {
			const { id } = req.params;
			const updateData = req.body;

			// Validate that the task exists
			const existingTask = await prisma.task.findUnique({
				where: { id },
			});

			if (!existingTask) {
				return res.status(404).json({
					success: false,
					error: 'Task not found',
				});
			}

			// Validate title if provided
			if (
				updateData.title !== undefined &&
				updateData.title.trim().length === 0
			) {
				return res.status(400).json({
					success: false,
					error: 'Title cannot be empty',
				});
			}

			const updatedTask = await prisma.task.update({
				where: { id },
				data: updateData,
			});

			res.json({
				success: true,
				data: updatedTask,
				message: 'Task updated successfully',
			});
		} catch (error) {
			console.error('Error updating task:', error);
			res.status(500).json({
				success: false,
				error: 'Failed to update task',
			});
		}
	}

	// Delete a task
	static async deleteTask(
		req: Request<{ id: string }>,
		res: Response<TaskResponse>,
	) {
		try {
			const { id } = req.params;

			// Validate that the task exists
			const existingTask = await prisma.task.findUnique({
				where: { id },
			});

			if (!existingTask) {
				return res.status(404).json({
					success: false,
					error: 'Task not found',
				});
			}

			await prisma.task.delete({
				where: { id },
			});

			res.json({
				success: true,
				message: 'Task deleted successfully',
			});
		} catch (error) {
			console.error('Error deleting task:', error);
			res.status(500).json({
				success: false,
				error: 'Failed to delete task',
			});
		}
	}

	// Toggle task completion
	static async toggleTaskCompletion(
		req: Request<{ id: string }>,
		res: Response<TaskResponse>,
	) {
		try {
			const { id } = req.params;

			const existingTask = await prisma.task.findUnique({
				where: { id },
			});

			if (!existingTask) {
				return res.status(404).json({
					success: false,
					error: 'Task not found',
				});
			}

			const updatedTask = await prisma.task.update({
				where: { id },
				data: {
					completed: !existingTask.completed,
				},
			});

			res.json({
				success: true,
				data: updatedTask,
				message: 'Task completion toggled successfully',
			});
		} catch (error) {
			console.error('Error toggling task completion:', error);
			res.status(500).json({
				success: false,
				error: 'Failed to toggle task completion',
			});
		}
	}
}
