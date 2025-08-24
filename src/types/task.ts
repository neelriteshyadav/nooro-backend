/** @format */

export interface Task {
	id: string;
	title: string;
	color: string;
	completed: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface CreateTaskRequest {
	title: string;
	color: string;
}

export interface UpdateTaskRequest {
	title?: string;
	color?: string;
	completed?: boolean;
}

export interface TaskResponse {
	success: boolean;
	data?: Task | Task[];
	message?: string;
	error?: string;
}
