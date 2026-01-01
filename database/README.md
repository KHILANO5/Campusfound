# Database Setup Guide

This directory contains the MySQL database schema and setup files for CampusFound.

## Files Structure

```
database/
├── schema.sql           # Main database schema (tables, indexes, constraints)
├── seeds/
│   └── sample_data.sql  # Sample data for development/testing
└── README.md           # This file
```

## Prerequisites

- **MySQL Server** 5.7+ or 8.0+ installed and running
- **MySQL Client** (mysql command-line tool or MySQL Workbench)
- Access to create databases

## Quick Setup

### Step 1: Install MySQL (if not already installed)

**Windows:**
1. Download MySQL Installer from [mysql.com](https://dev.mysql.com/downloads/installer/)
2. Run installer and choose "Developer Default"
3. Set root password during installation
4. Start MySQL service: `net start MySQL80`

**Check if MySQL is running:**
```powershell
mysql --version
```

### Step 2: Create Database

Open MySQL client:
```bash
mysql -u root -p
```

Create the database:
```sql
CREATE DATABASE campusfound_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Verify database creation:
```sql
SHOW DATABASES;
-- You should see 'campusfound_db' in the list
```

Exit MySQL:
```sql
EXIT;
```

### Step 3: Execute Schema

Run the schema file to create tables:

```bash
# From the project root directory
mysql -u root -p campusfound_db < database/schema.sql
```

### Step 4: Insert Sample Data (Optional)

Load test data for development:

```bash
mysql -u root -p campusfound_db < database/seeds/sample_data.sql
```

### Step 5: Verify Installation

Connect to database and verify tables:

```bash
mysql -u root -p campusfound_db
```

Inside MySQL:
```sql
-- Show all tables
SHOW TABLES;
-- Expected output: posts, users

-- View users table structure
DESCRIBE users;

-- View posts table structure
DESCRIBE posts;

-- Count sample users
SELECT COUNT(*) FROM users;
-- Expected: 5 users

-- Count sample posts
SELECT COUNT(*) FROM posts;
-- Expected: 14 posts

-- View all posts with creators
SELECT p.post_id, p.title, p.type, p.status, u.name 
FROM posts p 
JOIN users u ON p.user_id = u.user_id;
```

## Database Schema

### Users Table

| Column        | Type         | Description                   |
|---------------|--------------|-------------------------------|
| user_id       | INT          | Primary key, auto-increment   |
| name          | VARCHAR(100) | User's full name              |
| email         | VARCHAR(150) | Unique email (for login)      |
| password_hash | VARCHAR(255) | Bcrypt hashed password        |
| created_at    | TIMESTAMP    | Account creation time         |

**Indexes:**
- Primary key on `user_id`
- Unique index on `email`
- Index on `email` for login queries

### Posts Table

| Column      | Type                      | Description                      |
|-------------|---------------------------|----------------------------------|
| post_id     | INT                       | Primary key, auto-increment      |
| title       | VARCHAR(100)              | Item title                       |
| description | TEXT                      | Detailed description             |
| type        | ENUM('lost','found')      | Post type                        |
| status      | ENUM('open','resolved')   | Current status                   |
| user_id     | INT                       | Foreign key to users             |
| created_at  | TIMESTAMP                 | Post creation time               |
| updated_at  | TIMESTAMP                 | Last update time                 |

**Indexes:**
- Primary key on `post_id`
- Foreign key on `user_id` (CASCADE on delete)
- Index on `type` for filtering
- Index on `status` for filtering
- Index on `user_id` for user's posts
- Index on `created_at` for sorting

### Relationships

- **One-to-Many**: One user can create many posts
- **Foreign Key**: `posts.user_id` → `users.user_id`
- **CASCADE DELETE**: When user is deleted, all their posts are automatically deleted

## Common Queries

### Authentication Queries

```sql
-- Register new user
INSERT INTO users (name, email, password_hash) 
VALUES ('John Doe', 'john@example.com', '$2a$10$...');

-- Find user by email (for login)
SELECT user_id, name, email, password_hash 
FROM users 
WHERE email = 'john@example.com';
```

### Post Queries

```sql
-- Create new post
INSERT INTO posts (title, description, type, user_id) 
VALUES ('Lost Wallet', 'Black leather wallet', 'lost', 1);

-- Get all posts with user info
SELECT 
  p.post_id,
  p.title,
  p.description,
  p.type,
  p.status,
  u.name,
  u.email,
  p.created_at
FROM posts p
JOIN users u ON p.user_id = u.user_id
ORDER BY p.created_at DESC;

-- Get posts by type
SELECT * FROM posts WHERE type = 'lost' AND status = 'open';

-- Mark post as resolved
UPDATE posts 
SET status = 'resolved' 
WHERE post_id = 1 AND user_id = 1;

-- Get user's posts
SELECT * FROM posts WHERE user_id = 1;
```

## Testing the Schema

Run these queries to test constraints:

```sql
-- Test 1: Unique email constraint
INSERT INTO users (name, email, password_hash) 
VALUES ('Test', 'pruthvi@campusfound.com', 'hash');
-- Should fail: Duplicate entry

-- Test 2: Foreign key constraint
INSERT INTO posts (title, description, type, user_id) 
VALUES ('Test', 'Description', 'lost', 9999);
-- Should fail: Foreign key constraint

-- Test 3: ENUM validation
INSERT INTO posts (title, description, type, user_id) 
VALUES ('Test', 'Description', 'missing', 1);
-- Should fail: Invalid ENUM value

-- Test 4: CASCADE delete
DELETE FROM users WHERE user_id = 5;
SELECT * FROM posts WHERE user_id = 5;
-- Posts should be automatically deleted
```

## Environment Variables for Backend

Provide these details to the backend team:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=campusfound_db
DB_CHARSET=utf8mb4
```

## Troubleshooting

### Can't connect to MySQL server
```bash
# Check if MySQL service is running
net start MySQL80
```

### Access denied for user 'root'
- Verify password is correct
- Reset root password if needed

### Table already exists error
```sql
-- Drop and recreate
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;
-- Then run schema.sql again
```

### Foreign key constraint fails
- Ensure parent table (users) exists before child table (posts)
- Verify user_id exists when inserting posts

## Next Steps

1. ✅ Database schema created
2. ✅ Sample data loaded
3. 🔄 Provide connection details to backend team (Nishit)
4. 🔄 Test backend API with database
5. 🔄 Create production database setup

## Contact

**Database Team:** Yash  
For database-related questions or schema changes, contact the database team lead.
