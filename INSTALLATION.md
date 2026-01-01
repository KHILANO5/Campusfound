# 🚀 Complete Installation Guide for CampusFound

This guide will help you set up the CampusFound project from scratch, even if you're new to web development.

## 📋 Table of Contents
1. [System Requirements](#system-requirements)
2. [Installing Prerequisites](#installing-prerequisites)
3. [Project Setup](#project-setup)
4. [Running the Application](#running-the-application)
5. [Verification Steps](#verification-steps)
6. [Common Problems & Solutions](#common-problems--solutions)

---

## System Requirements

### Minimum Requirements:
- **Operating System:** Windows 10/11, macOS, or Linux
- **RAM:** 4GB (8GB recommended)
- **Disk Space:** 2GB free space
- **Internet Connection:** Required for downloading dependencies

---

## Installing Prerequisites

### 1. Install Node.js and npm

**What is it?** Node.js runs JavaScript on your computer. npm is the package manager for JavaScript.

**Steps:**

1. Go to [https://nodejs.org/](https://nodejs.org/)
2. Download the **LTS version** (recommended for most users)
3. Run the installer
   - Windows: Double-click the `.msi` file
   - Mac: Double-click the `.pkg` file
   - Accept all default settings during installation
4. Verify installation:
   ```bash
   node --version
   # Should show: v16.x.x or higher
   
   npm --version
   # Should show: 8.x.x or higher
   ```

**Troubleshooting:**
- If commands not found, restart your terminal/command prompt
- Windows: Add Node.js to PATH during installation (checkbox option)

### 2. Install MySQL

**What is it?** MySQL is the database that stores all user and post data.

**Steps:**

**For Windows:**
1. Download MySQL Installer from [https://dev.mysql.com/downloads/installer/](https://dev.mysql.com/downloads/installer/)
2. Choose "Developer Default" during installation
3. Set a **root password** (remember this - you'll need it!)
4. Complete the installation wizard
5. Start MySQL service:
   ```bash
   net start MySQL80
   ```

**For Mac:**
1. Download MySQL DMG from [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)
2. Install the package
3. Remember the temporary root password shown during installation
4. Open System Preferences → MySQL
5. Start MySQL Server

**For Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
sudo mysql_secure_installation
```

**Verify MySQL Installation:**
```bash
mysql --version
# Should show: mysql Ver 8.0.x or higher

# Test connection
mysql -u root -p
# Enter your password when prompted
# You should see: mysql>
# Type: exit
```

### 3. Install Git

**What is it?** Git helps you download and manage code from GitHub.

**Steps:**

1. Download Git from [https://git-scm.com/downloads](https://git-scm.com/downloads)
2. Install with default settings
3. Verify:
   ```bash
   git --version
   # Should show: git version 2.x.x
   ```

---

## Project Setup

Now that you have all prerequisites installed, let's set up the project:

### Step 1: Clone the Repository

Open your terminal/command prompt and run:

```bash
# Navigate to where you want to store the project
cd Desktop  # or any folder you prefer

# Clone the repository
git clone https://github.com/KHILANO5/Campusfound.git

# Navigate into the project
cd Campusfound/Campusfound
```

**What did this do?** 
- Downloaded the entire project code to your computer
- You should now see folders: `client/`, `server/`, `database/`

### Step 2: Setup the Database

1. **Start MySQL** (if not already running):
   ```bash
   # Windows
   net start MySQL80
   
   # Mac
   mysql.server start
   
   # Linux
   sudo systemctl start mysql
   ```

2. **Create the database and tables:**
   ```bash
   # Make sure you're in the Campusfound/Campusfound directory
   mysql -u root -p < database/schema.sql
   ```
   - Enter your MySQL root password when prompted
   - This creates the database `campusfound_db` and all tables

3. **Load sample data** (optional but recommended for testing):
   ```bash
   mysql -u root -p campusfound_db < database/seeds/sample_data.sql
   ```
   - This adds 5 test users and 14 test posts

4. **Verify database creation:**
   ```bash
   mysql -u root -p campusfound_db
   ```
   Inside MySQL, type:
   ```sql
   SHOW TABLES;
   -- Should show: posts, users
   
   SELECT COUNT(*) FROM users;
   -- Should show: 5
   
   SELECT COUNT(*) FROM posts;
   -- Should show: 14
   
   exit;
   ```

### Step 3: Setup the Backend Server

1. **Navigate to server folder:**
   ```bash
   cd server
   ```

2. **Install backend dependencies:**
   ```bash
   npm install
   ```
   - This downloads all required packages (~50MB)
   - Takes 1-3 minutes depending on internet speed
   - You'll see a `node_modules/` folder created

3. **Create environment file:**
   
   Create a new file named `.env` in the `server/` folder:
   
   **Windows (PowerShell):**
   ```powershell
   New-Item -Path .env -ItemType File
   notepad .env
   ```
   
   **Mac/Linux:**
   ```bash
   touch .env
   nano .env
   ```
   
   Add this content (replace `your_password` with your MySQL password):
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
   
   **Save and close the file**
   - Notepad: File → Save
   - Nano: Ctrl+X, then Y, then Enter

4. **Test the server:**
   ```bash
   npm run dev
   ```
   
   **Expected output:**
   ```
   Server running on http://localhost:3000
   Database connected successfully
   ```
   
   ✅ **Success!** Your backend is running.
   
   **Keep this terminal open** - the server needs to keep running.

### Step 4: Setup the Frontend

1. **Open a NEW terminal** (don't close the server terminal)

2. **Navigate to client folder:**
   ```bash
   cd Campusfound/Campusfound/client
   # Adjust path if you're starting from a different location
   ```

3. **Install frontend dependencies:**
   ```bash
   npm install
   ```
   - Downloads React, Vite, Tailwind, and other packages
   - Takes 2-4 minutes
   - Creates `node_modules/` folder (~200MB)

4. **Start the frontend:**
   ```bash
   npm run dev
   ```
   
   **Expected output:**
   ```
   VITE v5.x.x  ready in XXX ms
   
   ➜  Local:   http://localhost:5173/
   ➜  Network: use --host to expose
   ```
   
   ✅ **Success!** Your frontend is running.

---

## Running the Application

### You should now have TWO terminals running:

**Terminal 1 (Backend):**
```bash
Location: Campusfound/Campusfound/server
Command: npm run dev
Status: Server running on http://localhost:3000
```

**Terminal 2 (Frontend):**
```bash
Location: Campusfound/Campusfound/client
Command: npm run dev
Status: Vite server running on http://localhost:5173
```

### Access the Application:

1. **Open your web browser**
2. **Go to:** `http://localhost:5173`
3. **You should see the CampusFound homepage!**

---

## Verification Steps

### Test 1: Check Backend API

Open browser and go to: `http://localhost:3000/api/posts`

**Expected:** JSON data showing all posts

```json
[
  {
    "post_id": 1,
    "title": "Lost Blue Backpack",
    "description": "...",
    "type": "lost",
    ...
  }
]
```

### Test 2: Check Frontend

On `http://localhost:5173`:
- ✅ Page loads without errors
- ✅ Can see navigation bar
- ✅ Can view posts (if sample data loaded)

### Test 3: Test Registration

1. Click "Register" or "Sign Up"
2. Fill in:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
3. Click "Register"
4. ✅ Should redirect to login or dashboard

### Test 4: Test Login

1. Login with the account you just created
2. ✅ Should see your dashboard

---

## Common Problems & Solutions

### ❌ "mysql: command not found"

**Problem:** MySQL not in system PATH

**Solution:**
- **Windows:** Add MySQL to PATH:
  1. Search "Environment Variables" in Start menu
  2. Edit "Path" variable
  3. Add: `C:\Program Files\MySQL\MySQL Server 8.0\bin`
  4. Restart terminal

- **Mac:** Add to .zshrc or .bash_profile:
  ```bash
  export PATH="/usr/local/mysql/bin:$PATH"
  ```

### ❌ "Access denied for user 'root'@'localhost'"

**Problem:** Wrong MySQL password in `.env` file

**Solution:**
1. Open `server/.env`
2. Check `DB_PASSWORD=` matches your MySQL root password
3. Save file
4. Restart server: `npm run dev`

### ❌ "Port 3000 already in use"

**Problem:** Another application using port 3000

**Solution 1 - Kill the process:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

**Solution 2 - Change port:**
1. Open `server/.env`
2. Change: `PORT=3001`
3. Restart server

### ❌ "Cannot find module" errors

**Problem:** Dependencies not installed

**Solution:**
```bash
# In server/ folder
rm -rf node_modules package-lock.json
npm install

# In client/ folder
rm -rf node_modules package-lock.json
npm install
```

### ❌ "Database 'campusfound_db' doesn't exist"

**Problem:** Schema not executed

**Solution:**
```bash
mysql -u root -p < database/schema.sql
# Enter password when prompted
```

### ❌ Frontend shows blank page

**Problem:** Backend not running or wrong API URL

**Solution:**
1. Ensure backend is running on http://localhost:3000
2. Check browser console (F12) for errors
3. Verify API calls point to correct URL

### ❌ "CORS error" in browser console

**Problem:** CORS not enabled in backend

**Solution:**
1. Check `server/index.js` has:
   ```javascript
   import cors from 'cors';
   app.use(cors());
   ```
2. Restart backend server

---

## 🎉 Success!

You should now have CampusFound running on your machine!

### What's Next?

1. **Explore the app:**
   - Register a new account
   - Create lost/found posts
   - Browse other posts
   - Mark items as resolved

2. **Learn the code:**
   - Backend: `server/controllers/` - business logic
   - Frontend: `client/src/` - React components
   - Database: `database/schema.sql` - table structure

3. **Make changes:**
   - Edit React components → Frontend updates automatically
   - Edit Express routes → Server restarts automatically (nodemon)
   - Edit database → Re-run schema.sql

### Need More Help?

- Check main [README.md](README.md)
- Check [server/README.md](server/README.md) for API details
- Check [database/README.md](database/README.md) for database info
- Check [client/README.md](client/README.md) for frontend details

---

**Happy Coding! 🚀**
