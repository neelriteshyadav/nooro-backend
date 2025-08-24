<!-- @format -->

# Todo Backend API

Express.js backend for the Todo List application with Prisma ORM and MySQL database.

## Features

- ✅ RESTful API endpoints for task management
- 🔐 Input validation and error handling
- 🗄️ MySQL database with Prisma ORM
- 📝 Comprehensive logging and monitoring
- 🚀 TypeScript for type safety

## Prerequisites

- Node.js 18+
- MySQL 8.0+
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy the environment example file and configure your database:

```bash
cp env.example .env
```

Edit `.env` with your MySQL credentials:

```env
DATABASE_URL="mysql://username:password@localhost:3306/todo_db"
PORT=3001
NODE_ENV=development
```

### 3. Database Setup

Create a MySQL database:

```sql
CREATE DATABASE todo_db;
```

Run Prisma migrations:

```bash
npx prisma migrate dev
npx prisma generate
```

### 4. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3001`

## API Endpoints

### Tasks

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `PATCH /api/tasks/:id/toggle` - Toggle task completion

### Health Check

- `GET /health` - Server health status

## Request/Response Examples

### Create Task

**Request:**

```json
POST /api/tasks
{
  "title": "Complete project",
  "color": "blue"
}
```

**Response:**

```json
{
	"success": true,
	"data": {
		"id": "clx123...",
		"title": "Complete project",
		"color": "blue",
		"completed": false,
		"createdAt": "2024-01-15T10:00:00.000Z",
		"updatedAt": "2024-01-15T10:00:00.000Z"
	},
	"message": "Task created successfully"
}
```

### Get All Tasks

**Request:**

```bash
GET /api/tasks
```

**Response:**

```json
{
	"success": true,
	"data": [
		{
			"id": "clx123...",
			"title": "Complete project",
			"color": "blue",
			"completed": false,
			"createdAt": "2024-01-15T10:00:00.000Z",
			"updatedAt": "2024-01-15T10:00:00.000Z"
		}
	]
}
```

## Database Schema

The application uses a single `Task` table with the following structure:

```sql
CREATE TABLE tasks (
  id VARCHAR(191) NOT NULL,
  title VARCHAR(255) NOT NULL,
  color VARCHAR(191) NOT NULL DEFAULT 'blue',
  completed BOOLEAN NOT NULL DEFAULT false,
  createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updatedAt DATETIME(3) NOT NULL,
  PRIMARY KEY (id)
);
```

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

### Project Structure

```
src/
├── controllers/     # Request handlers
├── database/       # Database configuration
├── middleware/     # Express middleware
├── routes/         # API route definitions
├── types/          # TypeScript type definitions
└── index.ts        # Server entry point
```

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request** - Invalid input data
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server-side errors

All errors return a consistent format:

```json
{
	"success": false,
	"error": "Error message description"
}
```

## Security Features

- CORS configuration for frontend access
- Helmet.js for security headers
- Input validation and sanitization
- Rate limiting (can be added)

## Production Deployment

1. Set `NODE_ENV=production` in environment
2. Configure production database URL
3. Run `npm run build`
4. Start with `npm run start`
5. Use PM2 or similar process manager

## Troubleshooting

### Common Issues

1. **Database Connection Failed**

   - Check MySQL service is running
   - Verify database credentials in `.env`
   - Ensure database exists

2. **Prisma Migration Issues**

   - Reset database: `npx prisma migrate reset`
   - Regenerate client: `npx prisma generate`

3. **Port Already in Use**
   - Change PORT in `.env` file
   - Kill process using the port

### Logs

Check console output for detailed error messages and API request logs.
