/** @format */

import { Request, Response, NextFunction } from 'express';

export interface ValidationError {
	field: string;
	message: string;
}

export const validateTaskInput = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const errors: ValidationError[] = [];
	const { title, color } = req.body;

	// Validate title
	if (!title || typeof title !== 'string' || title.trim().length === 0) {
		errors.push({
			field: 'title',
			message: 'Title is required and must be a non-empty string',
		});
	}

	// Validate title length
	if (title && title.trim().length > 255) {
		errors.push({
			field: 'title',
			message: 'Title must be 255 characters or less',
		});
	}

	// Validate color if provided
	if (color !== undefined) {
		if (typeof color !== 'string') {
			errors.push({
				field: 'color',
				message: 'Color must be a string',
			});
		} else {
			const validColors = [
				'blue',
				'green',
				'red',
				'yellow',
				'purple',
				'orange',
			];
			if (!validColors.includes(color)) {
				errors.push({
					field: 'color',
					message: `Color must be one of: ${validColors.join(', ')}`,
				});
			}
		}
	}

	if (errors.length > 0) {
		return res.status(400).json({
			success: false,
			error: 'Validation failed',
			details: errors,
		});
	}

	next();
};

export const validateTaskId = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { id } = req.params;

	if (!id || typeof id !== 'string' || id.trim().length === 0) {
		return res.status(400).json({
			success: false,
			error: 'Valid task ID is required',
		});
	}

	next();
};
