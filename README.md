<!-- @format -->

# Todo Backend API

A robust Express.js backend API for managing todo tasks, built with TypeScript, Prisma, and MySQL.

## 🚀 Features

- **RESTful API** with proper HTTP status codes
- **TypeScript** for type safety and better development experience
- **Prisma ORM** with MySQL database
- **Input validation** and error handling
- **Security middleware** (Helmet, CORS)
- **Logging** with Morgan
- **Environment-based configuration**

## 📋 API Endpoints

### Tasks

| Method   | Endpoint            | Description            | Request Body                                                     |
| -------- | ------------------- | ---------------------- | ---------------------------------------------------------------- |
| `GET`    | `/tasks`            | Get all tasks          | -                                                                |
| `POST`   | `/tasks`            | Create a new task      | `{ "title": "string", "color": "string" }`                       |
| `PUT`    | `/tasks/:id`        | Update a task          | `{ "title": "string", "color": "string", "completed": boolean }` |
| `DELETE` | `/tasks/:id`        | Delete a task          | -                                                                |
| `PATCH`  | `/tasks/:id/toggle` | Toggle task completion | -                                                                |

### Task Model

```typescript
interface Task {
	id: string; // Auto-generated unique identifier
	title: string; // Task title (max 255 characters)
	color: string; // Task color (blue, green, red, yellow, purple, orange)
	completed: boolean; // Completion status
	createdAt: Date; // Creation timestamp
	updatedAt: Date; // Last update timestamp
}
```

### Valid Colors

- `blue` (default)
- `green`
- `red`
- `yellow`
- `purple`
- `orange`

## 🛠️ Setup

### Prerequisites

- Node.js (v18 or higher)
- MySQL database
- npm or yarn

### Installation

1. **Clone and install dependencies:**

   ```bash
   cd backend
   npm install
   ```

2. **Environment setup:**

   ```bash
   cp env.example .env
   # Edit .env with your database credentials
   ```

3. **Database setup:**

   ```bash
   # Generate Prisma client
   npm run prisma:generate

   # Run database migrations
   npm run prisma:migrate

   # (Optional) Open Prisma Studio
   npm run prisma:studio
   ```

4. **Start the server:**

   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm run build
   npm start
   ```

## 🔧 Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

## 🌍 Environment Variables

| Variable       | Description             | Default               |
| -------------- | ----------------------- | --------------------- |
| `DATABASE_URL` | MySQL connection string | Required              |
| `PORT`         | Server port             | 3001                  |
| `NODE_ENV`     | Environment mode        | development           |
| `CORS_ORIGIN`  | Allowed CORS origin     | http://localhost:3000 |

## 📊 Database Schema

The database uses Prisma with the following schema:

```prisma
model Task {
  id        String   @id @default(cuid())
  title     String   @db.VarChar(255)
  color     String   @default("blue") @db.VarChar(20)
  completed Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("tasks")
}
```

## 🔒 Security Features

- **Helmet.js** for security headers
- **CORS** configuration
- **Input validation** and sanitization
- **Error handling** without information leakage
- **Rate limiting** (configurable)

## 📝 Error Handling

The API returns consistent error responses:

```json
{
	"success": false,
	"error": "Error message",
	"details": [] // Validation errors (if applicable)
}
```

## 🧪 Testing

To test the API endpoints:

```bash
# Get all tasks
curl http://localhost:3001/tasks

# Create a task
curl -X POST http://localhost:3001/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Test task", "color": "blue"}'

# Update a task
curl -X PUT http://localhost:3001/tasks/{id} \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated task", "completed": true}'

# Delete a task
curl -X DELETE http://localhost:3001/tasks/{id}

# Toggle completion
curl -X PATCH http://localhost:3001/tasks/{id}/toggle
```

## 🏗️ Architecture

```
src/
├── controllers/     # Business logic
├── database/        # Database connection
├── middleware/      # Express middleware
├── routes/          # API route definitions
├── types/           # TypeScript type definitions
└── index.ts         # Server entry point
```

## 📈 Performance

- **Connection pooling** with Prisma
- **Efficient queries** with proper indexing
- **Middleware optimization** for production
- **Graceful shutdown** handling

## 🔄 Database Migrations

When making schema changes:

1. Update `prisma/schema.prisma`
2. Run `npm run prisma:migrate`
3. Deploy the migration to production

## 🚀 Deployment

1. Set `NODE_ENV=production`
2. Configure production database URL
3. Set appropriate CORS origins
4. Use PM2 or similar process manager
5. Set up reverse proxy (nginx) if needed

## 🤝 Contributing

1. Follow TypeScript best practices
2. Add proper error handling
3. Include input validation
4. Update documentation
5. Test all endpoints

## 📄 License

MIT License - see LICENSE file for details
