# CampusFound Database Documentation

## Overview

The CampusFound database is built on MySQL and consists of two primary tables designed to support a Lost & Found application for college campuses.

## Entity-Relationship Diagram

```
┌─────────────────────┐         ┌─────────────────────┐
│       USERS         │         │       POSTS         │
├─────────────────────┤         ├─────────────────────┤
│ PK user_id          │◄───┐    │ PK post_id          │
│    name             │    │    │    title            │
│ UK email            │    │    │    description      │
│    password_hash    │    │    │    type             │
│    created_at       │    │    │    status           │
└─────────────────────┘    │    │ FK user_id          │
                           └────│    created_at       │
      1                    N    │    updated_at       │
                                └─────────────────────┘

  One user can create many posts
```

## Database Details

- **Name:** `campusfound_db`
- **Engine:** InnoDB
- **Character Set:** utf8mb4
- **Collation:** utf8mb4_unicode_ci
- **MySQL Version:** 5.7+ or 8.0+

## Table Specifications

### 1. Users Table

**Purpose:** Store user account information for authentication and post ownership.

**Schema:**
```sql
CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email)
);
```

**Column Details:**

| Column        | Type         | Constraints       | Description                              |
|---------------|--------------|-------------------|------------------------------------------|
| user_id       | INT          | PRIMARY KEY, AUTO | Unique identifier for each user          |
| name          | VARCHAR(100) | NOT NULL          | User's full name                         |
| email         | VARCHAR(150) | NOT NULL, UNIQUE  | Email address (used for login)           |
| password_hash | VARCHAR(255) | NOT NULL          | Bcrypt hashed password (60 chars)        |
| created_at    | TIMESTAMP    | DEFAULT NOW       | Account creation timestamp               |

**Indexes:**
- `PRIMARY`: user_id (clustered index)
- `UNIQUE`: email (ensures no duplicate emails)
- `INDEX`: idx_email (speeds up login queries)

**Sample Data:**
```sql
+----------+----------------+---------------------------+
| user_id  | name           | email                     |
+----------+----------------+---------------------------+
| 1        | Pruthvi Patel  | pruthvi@campusfound.com   |
| 2        | Nishit Shah    | nishit@campusfound.com    |
| 3        | Yash Kumar     | yash@campusfound.com      |
+----------+----------------+---------------------------+
```

---

### 2. Posts Table

**Purpose:** Store lost and found item reports created by users.

**Schema:**
```sql
CREATE TABLE posts (
  post_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  type ENUM('lost', 'found') NOT NULL,
  status ENUM('open', 'resolved') NOT NULL DEFAULT 'open',
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_type (type),
  INDEX idx_status (status),
  INDEX idx_user_id (user_id),
  INDEX idx_created_at (created_at)
);
```

**Column Details:**

| Column      | Type                    | Constraints       | Description                              |
|-------------|-------------------------|-------------------|------------------------------------------|
| post_id     | INT                     | PRIMARY KEY, AUTO | Unique identifier for each post          |
| title       | VARCHAR(100)            | NOT NULL          | Brief title/name of the item             |
| description | TEXT                    | NOT NULL          | Detailed description of the item         |
| type        | ENUM('lost','found')    | NOT NULL          | Type of post: lost or found              |
| status      | ENUM('open','resolved') | NOT NULL, DEFAULT | Current status of the post               |
| user_id     | INT                     | NOT NULL, FK      | Reference to user who created the post   |
| created_at  | TIMESTAMP               | DEFAULT NOW       | Post creation timestamp                  |
| updated_at  | TIMESTAMP               | AUTO UPDATE       | Last modification timestamp              |

**Indexes:**
- `PRIMARY`: post_id (clustered index)
- `FOREIGN KEY`: user_id → users(user_id) with CASCADE DELETE
- `INDEX`: idx_type (filter by lost/found)
- `INDEX`: idx_status (filter by open/resolved)
- `INDEX`: idx_user_id (get user's posts)
- `INDEX`: idx_created_at (sort by date)

**Sample Data:**
```sql
+---------+----------------------+------+----------+---------+
| post_id | title                | type | status   | user_id |
+---------+----------------------+------+----------+---------+
| 1       | Lost Black Wallet    | lost | open     | 1       |
| 2       | Found Water Bottle   | found| open     | 2       |
| 3       | Lost Blue Backpack   | lost | resolved | 3       |
+---------+----------------------+------+----------+---------+
```

---

## Relationships

### One-to-Many: Users → Posts

- **Relationship Type:** One user can create many posts
- **Cardinality:** 1:N
- **Foreign Key:** posts.user_id → users.user_id
- **On Delete:** CASCADE (when user is deleted, all their posts are deleted)
- **On Update:** RESTRICT (prevents accidental user_id changes)

**SQL Definition:**
```sql
FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
```

**Business Logic:**
- Each post must belong to exactly one user
- A user can have zero, one, or multiple posts
- Deleting a user automatically removes all their posts

---

## Index Strategy

### Why Indexes?

Indexes improve query performance by creating a sorted data structure for fast lookups.

### Index Decisions:

1. **users.email** - Most common query is login by email
2. **posts.type** - Filter posts by lost/found frequently
3. **posts.status** - Filter by open/resolved status
4. **posts.user_id** - Retrieve all posts by a user
5. **posts.created_at** - Sort posts chronologically (newest first)

### Performance Impact:

- **Without indexes:** O(n) - Full table scan
- **With indexes:** O(log n) - Binary search on B-tree

**Example:** Finding a user by email
- Without index: Scan 10,000 rows = ~10,000 comparisons
- With index: B-tree lookup = ~13 comparisons (log₂10000)

---

## Common Queries

### User Authentication

```sql
-- Register new user
INSERT INTO users (name, email, password_hash) 
VALUES (?, ?, ?);

-- Login (find user by email)
SELECT user_id, name, email, password_hash 
FROM users 
WHERE email = ?;
```

### Post Management

```sql
-- Create post
INSERT INTO posts (title, description, type, user_id) 
VALUES (?, ?, ?, ?);

-- Get all posts with user info
SELECT 
  p.post_id,
  p.title,
  p.description,
  p.type,
  p.status,
  u.name AS author_name,
  u.email AS author_email,
  p.created_at,
  p.updated_at
FROM posts p
INNER JOIN users u ON p.user_id = u.user_id
ORDER BY p.created_at DESC;

-- Filter posts by type and status
SELECT * FROM posts 
WHERE type = 'lost' AND status = 'open'
ORDER BY created_at DESC;

-- Resolve post (owner only)
UPDATE posts 
SET status = 'resolved'
WHERE post_id = ? AND user_id = ?;

-- Get user's posts
SELECT * FROM posts 
WHERE user_id = ?
ORDER BY created_at DESC;
```

### Analytics

```sql
-- Count posts by type
SELECT type, COUNT(*) as total 
FROM posts 
GROUP BY type;

-- Count posts by status
SELECT status, COUNT(*) as total 
FROM posts 
GROUP BY status;

-- Most active users
SELECT u.name, COUNT(p.post_id) as post_count
FROM users u
LEFT JOIN posts p ON u.user_id = p.user_id
GROUP BY u.user_id
ORDER BY post_count DESC
LIMIT 10;
```

---

## Data Integrity Constraints

### 1. Primary Keys
- Ensures each row is uniquely identifiable
- Auto-increment for automatic ID generation

### 2. Foreign Keys
- Maintains referential integrity
- Prevents orphaned records
- CASCADE DELETE: Keeps data consistent

### 3. Unique Constraints
- email must be unique (no duplicate accounts)

### 4. NOT NULL Constraints
- Required fields cannot be empty
- Ensures data completeness

### 5. ENUM Constraints
- type: Only 'lost' or 'found'
- status: Only 'open' or 'resolved'
- Prevents invalid data entry

### 6. Default Values
- status defaults to 'open' for new posts
- Timestamps automatically set on creation

---

## Security Considerations

### Password Storage
- Passwords are **never** stored in plain text
- Use bcrypt with salt rounds = 10
- password_hash column stores 60-character bcrypt output

**Example (Node.js):**
```javascript
const bcrypt = require('bcryptjs');
const hash = await bcrypt.hash(password, 10);
```

### SQL Injection Prevention
- Use parameterized queries (prepared statements)
- Never concatenate user input into SQL

**Bad:**
```javascript
const query = `SELECT * FROM users WHERE email = '${email}'`; // UNSAFE!
```

**Good:**
```javascript
const query = 'SELECT * FROM users WHERE email = ?';
db.execute(query, [email]); // SAFE
```

---

## Backup & Recovery

### Backup Database
```bash
# Full database backup
mysqldump -u root -p campusfound_db > campusfound_backup.sql

# Backup with timestamp
mysqldump -u root -p campusfound_db > campusfound_$(date +%Y%m%d).sql
```

### Restore Database
```bash
mysql -u root -p campusfound_db < campusfound_backup.sql
```

---

## Future Enhancements

Potential schema additions for future features:

### 1. Categories Table
```sql
CREATE TABLE categories (
  category_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT
);

-- Add to posts table:
ALTER TABLE posts ADD COLUMN category_id INT;
ALTER TABLE posts ADD FOREIGN KEY (category_id) REFERENCES categories(category_id);
```

### 2. Images Table
```sql
CREATE TABLE images (
  image_id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE
);
```

### 3. Comments Table
```sql
CREATE TABLE comments (
  comment_id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
```

---

## Performance Optimization

### Current Optimizations
- ✅ Indexes on frequently queried columns
- ✅ InnoDB engine for ACID compliance
- ✅ utf8mb4 for emoji support
- ✅ Proper foreign key constraints

### Future Optimizations
- Add database connection pooling (backend)
- Implement query caching
- Consider read replicas for scaling
- Add composite indexes for complex queries

---

## Contact & Support

**Database Designer:** Yash  
**Project:** CampusFound - Lost & Found Application  
**Last Updated:** January 1, 2026

For schema modifications or database questions, contact the database team.
