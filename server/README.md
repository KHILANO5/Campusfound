# CampusFound Server

Backend API server for CampusFound Lost & Found application.

## 📁 Project Structure

```
server/
├── config/
│   └── db.js              # MySQL database connection
├── controllers/
│   ├── auth.controller.js # Authentication logic
│   └── post.controller.js # Post CRUD operations
├── routes/
│   ├── auth.routes.js     # Auth endpoints
│   └── post.routes.js     # Post endpoints
├── .env                   # Environment variables
├── .gitignore            # Git ignore rules
├── index.js              # Server entry point
└── package.json          # Dependencies
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create/update `.env` file:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=campusfound_db
DB_CHARSET=utf8mb4
NODE_ENV=development
```

### 3. Setup Database
Ensure MySQL is running and execute:
```bash
# Create database and tables
mysql -u root -p campusfound_db < ../database/schema.sql

# Optional: Load sample data
mysql -u root -p campusfound_db < ../database/seeds/sample_data.sql
```

### 4. Start Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server will run on: `http://localhost:3000`

## 📡 API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Posts

#### Get All Posts
```http
GET /api/posts
```

#### Get Single Post
```http
GET /api/posts/:id
```

#### Create Post
```http
POST /api/posts
Content-Type: application/json

{
  "title": "Lost Wallet",
  "description": "Black leather wallet",
  "type": "lost",
  "user_id": 1
}
```

#### Resolve Post
```http
PUT /api/posts/:id/resolve
```

## 🗄️ Database Schema

### Users Table
- `user_id` - INT (Primary Key)
- `name` - VARCHAR(100)
- `email` - VARCHAR(150) UNIQUE
- `password_hash` - VARCHAR(255)
- `created_at` - TIMESTAMP

### Posts Table
- `post_id` - INT (Primary Key)
- `title` - VARCHAR(100)
- `description` - TEXT
- `type` - ENUM('lost', 'found')
- `status` - ENUM('open', 'resolved')
- `user_id` - INT (Foreign Key)
- `created_at` - TIMESTAMP
- `updated_at` - TIMESTAMP

## 🔧 Tech Stack

- **Runtime:** Node.js with ES6 Modules
- **Framework:** Express.js
- **Database:** MySQL 8.0
- **Authentication:** bcrypt password hashing
- **CORS:** Enabled for cross-origin requests

## 📦 Dependencies

- `express` - Web framework
- `mysql2` - MySQL client with Promise support
- `bcrypt` - Password hashing
- `dotenv` - Environment configuration
- `cors` - Cross-Origin Resource Sharing
- `nodemon` - Development auto-reload (dev)

## 🛠️ Development

### Available Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Database Connection
The server uses connection pooling for efficient database operations. Configuration is loaded from `.env` file.

## ✅ Features

- ✅ User registration with password hashing
- ✅ User authentication
- ✅ Create lost/found posts
- ✅ Retrieve all posts with user information
- ✅ Retrieve single post details
- ✅ Mark posts as resolved
- ✅ Input validation
- ✅ Error handling
- ✅ Foreign key constraints
- ✅ ENUM type validation

## 📝 Notes

- All passwords are hashed using bcrypt before storage
- Database uses UTF-8 character encoding
- Foreign key cascade delete: deleting a user removes their posts
- Timestamps are automatically managed by MySQL

## 🔒 Security

- Passwords are never stored in plain text
- SQL injection prevention via parameterized queries
- CORS configuration for API access control
- Environment variables for sensitive configuration

## 📚 Related Documentation

- Database schema: `../database/schema.sql`
- Sample data: `../database/seeds/sample_data.sql`
- Database docs: `../database/README.md`
