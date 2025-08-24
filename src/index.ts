/** @format */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';
import { connectDatabase } from './database/prisma';
import taskRoutes from './routes/taskRoutes';
import { errorHandler, notFound } from './middleware/errorHandler';

// Load environment variables
config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(
	cors({
		origin:
			process.env.NODE_ENV === 'production'
				? ['https://yourdomain.com']
				: ['http://localhost:3000'],
		credentials: true,
	}),
);
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
	res.json({
		status: 'OK',
		timestamp: new Date().toISOString(),
		environment: process.env.NODE_ENV || 'development',
	});
});

// API routes
app.use('/api/tasks', taskRoutes);

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', async () => {
	console.log('SIGTERM received, shutting down gracefully');
	await connectDatabase();
	process.exit(0);
});

process.on('SIGINT', async () => {
	console.log('SIGINT received, shutting down gracefully');
	await connectDatabase();
	process.exit(0);
});

// Start server
async function startServer() {
	try {
		await connectDatabase();

		app.listen(PORT, () => {
			console.log(`🚀 Server running on port ${PORT}`);
			console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
			console.log(`🔗 Health check: http://localhost:${PORT}/health`);
			console.log(`📝 API docs: http://localhost:${PORT}/api/tasks`);
		});
	} catch (error) {
		console.error('Failed to start server:', error);
		process.exit(1);
	}
}

startServer();
