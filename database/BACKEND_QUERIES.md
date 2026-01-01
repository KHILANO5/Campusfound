# Backend Integration Guide - Database Queries Reference

This file contains ready-to-use SQL queries for the backend API implementation.

## Connection Configuration

### Node.js with mysql2 (Recommended)

```javascript
// config/database.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'campusfound_db',
  charset: 'utf8mb4',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
```

---

## Authentication Queries

### 1. User Registration

```javascript
// POST /api/auth/register
const registerUser = async (name, email, passwordHash) => {
  const query = 'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)';
  const [result] = await pool.execute(query, [name, email, passwordHash]);
  return result.insertId; // Returns new user_id
};
```

**SQL:**
```sql
INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?);
```

**Response:** `insertId` = new user_id

---

### 2. User Login - Find by Email

```javascript
// POST /api/auth/login
const findUserByEmail = async (email) => {
  const query = 'SELECT user_id, name, email, password_hash FROM users WHERE email = ?';
  const [rows] = await pool.execute(query, [email]);
  return rows[0]; // Returns user object or undefined
};
```

**SQL:**
```sql
SELECT user_id, name, email, password_hash FROM users WHERE email = ?;
```

**Response:**
```json
{
  "user_id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "password_hash": "$2a$10$..."
}
```

---

## Post Queries

### 3. Create Post

```javascript
// POST /api/posts
const createPost = async (title, description, type, userId) => {
  const query = 'INSERT INTO posts (title, description, type, user_id) VALUES (?, ?, ?, ?)';
  const [result] = await pool.execute(query, [title, description, type, userId]);
  return result.insertId; // Returns new post_id
};
```

**SQL:**
```sql
INSERT INTO posts (title, description, type, user_id) VALUES (?, ?, ?, ?);
```

**Parameters:**
- `title`: String (max 100 chars)
- `description`: String (TEXT)
- `type`: 'lost' or 'found'
- `userId`: Integer (from JWT token)

---

### 4. Get All Posts (with User Info)

```javascript
// GET /api/posts
const getAllPosts = async () => {
  const query = `
    SELECT 
      p.post_id,
      p.title,
      p.description,
      p.type,
      p.status,
      p.created_at,
      p.updated_at,
      u.user_id,
      u.name AS author_name,
      u.email AS author_email
    FROM posts p
    INNER JOIN users u ON p.user_id = u.user_id
    ORDER BY p.created_at DESC
  `;
  const [rows] = await pool.execute(query);
  return rows;
};
```

**SQL:**
```sql
SELECT 
  p.post_id,
  p.title,
  p.description,
  p.type,
  p.status,
  p.created_at,
  p.updated_at,
  u.user_id,
  u.name AS author_name,
  u.email AS author_email
FROM posts p
INNER JOIN users u ON p.user_id = u.user_id
ORDER BY p.created_at DESC;
```

**Response:**
```json
[
  {
    "post_id": 1,
    "title": "Lost Black Wallet",
    "description": "Black leather wallet...",
    "type": "lost",
    "status": "open",
    "created_at": "2026-01-01T10:30:00.000Z",
    "updated_at": "2026-01-01T10:30:00.000Z",
    "user_id": 1,
    "author_name": "John Doe",
    "author_email": "john@example.com"
  }
]
```

---

### 5. Get Posts with Filters

```javascript
// GET /api/posts?type=lost&status=open
const getPostsFiltered = async (type = null, status = null) => {
  let query = `
    SELECT 
      p.post_id,
      p.title,
      p.description,
      p.type,
      p.status,
      p.created_at,
      u.name AS author_name
    FROM posts p
    INNER JOIN users u ON p.user_id = u.user_id
    WHERE 1=1
  `;
  const params = [];

  if (type) {
    query += ' AND p.type = ?';
    params.push(type);
  }

  if (status) {
    query += ' AND p.status = ?';
    params.push(status);
  }

  query += ' ORDER BY p.created_at DESC';

  const [rows] = await pool.execute(query, params);
  return rows;
};
```

---

### 6. Get Single Post by ID

```javascript
// GET /api/posts/:id
const getPostById = async (postId) => {
  const query = `
    SELECT 
      p.*,
      u.name AS author_name,
      u.email AS author_email
    FROM posts p
    INNER JOIN users u ON p.user_id = u.user_id
    WHERE p.post_id = ?
  `;
  const [rows] = await pool.execute(query, [postId]);
  return rows[0];
};
```

**SQL:**
```sql
SELECT 
  p.*,
  u.name AS author_name,
  u.email AS author_email
FROM posts p
INNER JOIN users u ON p.user_id = u.user_id
WHERE p.post_id = ?;
```

---

### 7. Mark Post as Resolved (Owner Only)

```javascript
// PUT /api/posts/:id/resolve
const resolvePost = async (postId, userId) => {
  const query = 'UPDATE posts SET status = ? WHERE post_id = ? AND user_id = ?';
  const [result] = await pool.execute(query, ['resolved', postId, userId]);
  return result.affectedRows; // Returns 1 if updated, 0 if not found/not owner
};
```

**SQL:**
```sql
UPDATE posts 
SET status = 'resolved' 
WHERE post_id = ? AND user_id = ?;
```

**Important:** The `user_id` check ensures only the post owner can resolve it.

**Response:**
- `affectedRows = 1`: Post updated successfully
- `affectedRows = 0`: Post not found or user is not the owner

---

### 8. Get User's Posts

```javascript
// GET /api/posts/my-posts (authenticated)
const getUserPosts = async (userId) => {
  const query = `
    SELECT * FROM posts 
    WHERE user_id = ? 
    ORDER BY created_at DESC
  `;
  const [rows] = await pool.execute(query, [userId]);
  return rows;
};
```

**SQL:**
```sql
SELECT * FROM posts 
WHERE user_id = ? 
ORDER BY created_at DESC;
```

---

### 9. Delete Post (Owner Only)

```javascript
// DELETE /api/posts/:id
const deletePost = async (postId, userId) => {
  const query = 'DELETE FROM posts WHERE post_id = ? AND user_id = ?';
  const [result] = await pool.execute(query, [postId, userId]);
  return result.affectedRows;
};
```

**SQL:**
```sql
DELETE FROM posts 
WHERE post_id = ? AND user_id = ?;
```

---

## Validation Checks

### Check if Email Exists

```javascript
const emailExists = async (email) => {
  const query = 'SELECT COUNT(*) as count FROM users WHERE email = ?';
  const [rows] = await pool.execute(query, [email]);
  return rows[0].count > 0;
};
```

**SQL:**
```sql
SELECT COUNT(*) as count FROM users WHERE email = ?;
```

---

### Check if Post Belongs to User

```javascript
const isPostOwner = async (postId, userId) => {
  const query = 'SELECT COUNT(*) as count FROM posts WHERE post_id = ? AND user_id = ?';
  const [rows] = await pool.execute(query, [postId, userId]);
  return rows[0].count > 0;
};
```

**SQL:**
```sql
SELECT COUNT(*) as count FROM posts 
WHERE post_id = ? AND user_id = ?;
```

---

## Error Handling

### Duplicate Email Error

```javascript
try {
  await registerUser(name, email, passwordHash);
} catch (error) {
  if (error.code === 'ER_DUP_ENTRY') {
    throw new Error('Email already registered');
  }
  throw error;
}
```

### Foreign Key Constraint Error

```javascript
try {
  await createPost(title, description, type, userId);
} catch (error) {
  if (error.code === 'ER_NO_REFERENCED_ROW_2') {
    throw new Error('Invalid user ID');
  }
  throw error;
}
```

---

## Testing Queries

### Test Database Connection

```javascript
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
};
```

---

## Environment Variables (.env)

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=campusfound_db

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=4000
NODE_ENV=development
```

---

## Complete Example: Auth Controller

```javascript
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email exists
    const [existing] = await pool.execute(
      'SELECT user_id FROM users WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert user
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name, email, passwordHash]
    );

    // Generate JWT
    const token = jwt.sign(
      { userId: result.insertId },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      userId: result.insertId,
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const [users] = await pool.execute(
      'SELECT user_id, name, email, password_hash FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];

    // Verify password
    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.user_id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        userId: user.user_id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};
```

---

## Quick Reference

| Operation | SQL | Returns |
|-----------|-----|---------|
| Register user | `INSERT INTO users ...` | insertId |
| Find user by email | `SELECT * FROM users WHERE email = ?` | user object |
| Create post | `INSERT INTO posts ...` | insertId |
| Get all posts | `SELECT p.*, u.* FROM posts p JOIN users u ...` | array of posts |
| Resolve post | `UPDATE posts SET status = 'resolved' WHERE ...` | affectedRows |
| Delete post | `DELETE FROM posts WHERE ...` | affectedRows |

---

**Created by:** Database Team (Yash)  
**For:** Backend Team (Nishit)  
**Last Updated:** January 1, 2026
