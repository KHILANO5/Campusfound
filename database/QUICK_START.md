# 🚀 Quick Start Guide - Database Setup

**Your Role:** Database Designer  
**MySQL Version:** 8.0.31 ✅ Installed  
**Status:** Ready to set up!

---

## ✅ What's Been Created

Your database layer is complete! Here's what has been set up:

### 📁 File Structure
```
Campusfound/
├── database/
│   ├── schema.sql              ✅ Main database schema
│   ├── seeds/
│   │   └── sample_data.sql     ✅ Test data
│   ├── README.md               ✅ Setup instructions
│   └── BACKEND_QUERIES.md      ✅ Queries for backend team
├── docs/
│   └── database.md             ✅ Complete documentation
└── README.md
```

---

## 🎯 Next Steps - Follow These in Order

### Step 1: Start MySQL Service

Open PowerShell as Administrator and run:
```powershell
net start MySQL80
```

Expected output: "The MySQL80 service was started successfully."

---

### Step 2: Create the Database

Open MySQL command line:
```powershell
mysql -u root -p
```

Enter your MySQL root password when prompted.

Then run:
```sql
CREATE DATABASE campusfound_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Verify it was created:
```sql
SHOW DATABASES;
```

You should see `campusfound_db` in the list.

Exit MySQL:
```sql
EXIT;
```

---

### Step 3: Execute the Schema

From your project root directory, run:
```powershell
mysql -u root -p campusfound_db < database/schema.sql
```

This creates the `users` and `posts` tables.

---

### Step 4: Insert Sample Data (Optional but Recommended)

```powershell
mysql -u root -p campusfound_db < database/seeds/sample_data.sql
```

This adds 5 test users and 14 test posts.

---

### Step 5: Verify Everything Works

Connect to the database:
```powershell
mysql -u root -p campusfound_db
```

Run these verification queries:

```sql
-- Show all tables
SHOW TABLES;
-- Expected: users, posts

-- View table structures
DESCRIBE users;
DESCRIBE posts;

-- Count records
SELECT COUNT(*) FROM users;
-- Expected: 5

SELECT COUNT(*) FROM posts;
-- Expected: 14

-- View sample data
SELECT p.post_id, p.title, p.type, p.status, u.name 
FROM posts p 
JOIN users u ON p.user_id = u.user_id
LIMIT 5;
```

If all queries work, you're done! 🎉

---

## 📊 What You've Accomplished

✅ **Schema Design**
- Designed `users` table with authentication support
- Designed `posts` table with lost/found functionality
- Set up foreign key relationships
- Added indexes for performance

✅ **Documentation**
- Complete setup guide (database/README.md)
- Technical documentation (docs/database.md)
- Backend integration guide (database/BACKEND_QUERIES.md)

✅ **Sample Data**
- Created test users
- Created variety of lost/found posts
- Both open and resolved statuses

---

## 🤝 Share with Your Team

### For Backend Developer (Nishit)

Share these files:
1. **database/BACKEND_QUERIES.md** - Ready-to-use SQL queries
2. **database/README.md** - Setup instructions

Connection details to provide:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=campusfound_db
```

### Sample Queries for Testing

**Register User:**
```sql
INSERT INTO users (name, email, password_hash) 
VALUES ('Test User', 'test@test.com', 'hashed_password');
```

**Get All Posts:**
```sql
SELECT p.*, u.name FROM posts p 
JOIN users u ON p.user_id = u.user_id 
ORDER BY p.created_at DESC;
```

---

## 🔍 Troubleshooting

### Issue: "MySQL service not found"
**Solution:** Check MySQL installation path or use:
```powershell
Get-Service -Name *mysql*
```

### Issue: "Access denied for user 'root'"
**Solution:** Reset your MySQL root password

### Issue: "Table already exists"
**Solution:** Drop tables first:
```sql
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;
```
Then run schema.sql again.

---

## 📚 Documentation Files

- **database/README.md** - Setup instructions and common queries
- **docs/database.md** - Complete technical documentation
- **database/BACKEND_QUERIES.md** - Code examples for backend integration

---

## ✨ Optional: Create ER Diagram

You can create a visual ER diagram using:
1. **MySQL Workbench** - Database → Reverse Engineer → Export as PNG
2. **dbdiagram.io** - Online tool for creating diagrams
3. The mermaid diagram in docs/database.md

Save it as `docs/er_diagram.png`

---

## 🎯 Success Checklist

- [ ] MySQL service is running
- [ ] `campusfound_db` database created
- [ ] `users` table exists with correct schema
- [ ] `posts` table exists with correct schema
- [ ] Foreign key relationship works
- [ ] Sample data loaded (5 users, 14 posts)
- [ ] All verification queries pass
- [ ] Shared connection details with backend team

---

## 🚀 You're Done!

Your database implementation is complete! You can now:
1. Wait for the backend team to connect
2. Help test database queries
3. Monitor database performance
4. Make schema adjustments if needed

**Estimated time to complete:** 15-20 minutes

Good luck! 🎉
