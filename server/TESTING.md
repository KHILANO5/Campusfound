# CampusFound Server Testing Guide

## Prerequisites
1. MySQL Server installed and running
2. Node.js installed

## Setup Steps

### 1. Configure Database Password
Edit `.env` file and update:
```
DB_PASSWORD=your_actual_mysql_password
```

### 2. Create Database and Tables
Run the SQL setup file in MySQL:
```bash
mysql -u root -p < setup.sql
```

Or manually execute in MySQL Workbench/command line:
```sql
CREATE DATABASE IF NOT EXISTS campusfound_db;
USE campusfound_db;

CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS posts (
  post_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  type ENUM('lost', 'found') NOT NULL,
  user_id INT NOT NULL,
  status ENUM('active', 'resolved') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```

### 3. Test Database Connection
```bash
node test-db.js
```

Expected output: `✅ Database connection successful!`

### 4. Start the Server
```bash
npm run dev
```

Expected output: `Server running on http://localhost:3000`

### 5. Test API Endpoints

#### Manual Testing with cURL or Postman:

**Register User:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

**Create Post:**
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Lost Wallet","description":"Black leather wallet","type":"lost","user_id":1}'
```

**Get All Posts:**
```bash
curl http://localhost:3000/api/posts
```

**Resolve Post:**
```bash
curl -X PUT http://localhost:3000/api/posts/1/resolve
```

### 6. Automated Testing
In a new terminal (while server is running):
```bash
node test-api.js
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id/resolve` - Mark post as resolved

## Troubleshooting

### MySQL Connection Issues
- Ensure MySQL server is running
- Check DB_PASSWORD in .env matches your MySQL root password
- Verify database exists: `SHOW DATABASES;`

### Port Already in Use
- Change PORT in .env to another port (e.g., 3001)
- Kill process using port: `netstat -ano | findstr :3000`

### Module Import Errors
- Ensure package.json has `"type": "module"`
- Check all imports use .js extension

## Current Status
✅ Project structure created
✅ Dependencies installed
✅ Code files created
⏳ Database setup needed
⏳ Environment variables need configuration
⏳ Server testing pending
