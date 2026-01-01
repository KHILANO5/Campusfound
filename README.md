# CampusFound 📘

A Lost & Found web application for college campuses where students can report and recover lost items.

## 🎯 Overview
CampusFound helps students report lost items and post found items. Users can register, create posts (lost/found), browse all posts, and mark items as resolved when recovered.

## ✨ Features
- 👤 User registration & authentication
- 📝 Create lost/found item posts
- 📋 Browse all posts with user details
- ✅ Mark items as resolved
- 🔍 View individual post details

## 🛠️ Tech Stack
- **Frontend:** React 18 + Vite + Tailwind CSS
- **Backend:** Node.js 16+ + Express.js
- **Database:** MySQL 8.0
- **Security:** bcrypt for password hashing

## 📁 Project Structure
```
campusfound/
├── client/              # React frontend application
│   ├── src/            # Source code
│   ├── public/         # Static assets
│   └── package.json    # Frontend dependencies
├── server/             # Express backend API
│   ├── config/        # Database configuration
│   ├── controllers/   # Business logic
│   ├── routes/        # API routes
│   ├── .env           # Environment variables (create this)
│   └── package.json   # Backend dependencies
├── database/          # Database schema & seeds
│   ├── schema.sql     # Database structure
│   └── seeds/         # Sample data
└── README.md          # This file
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v16.0.0 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify: `node --version`

2. **npm** (comes with Node.js)
   - Verify: `npm --version`

3. **MySQL Server** (v8.0 or higher)
   - Download from [mysql.com](https://dev.mysql.com/downloads/)
   - Verify: `mysql --version`

4. **Git** (for cloning repository)
   - Download from [git-scm.com](https://git-scm.com/)
   - Verify: `git --version`

## 🚀 Installation Guide

**→ For detailed step-by-step instructions, see [INSTALLATION.md](INSTALLATION.md)**

### Quick Start (Experienced Users)

#### Step 1: Clone the Repository

```bash
git clone https://github.com/KHILANO5/Campusfound.git
cd Campusfound/Campusfound
```

### Step 2: Database Setup

1. **Start MySQL Server**
   ```bash
   # Windows
   net start MySQL80
   
   # Check if MySQL is running
   mysql --version
   ```

2. **Create Database and Tables**
   ```bash
   # Execute schema file (creates database and tables)
   mysql -u root -p < database/schema.sql
   # Enter your MySQL password when prompted
   ```

3. **Load Sample Data** (Optional - for testing)
   ```bash
   mysql -u root -p campusfound_db < database/seeds/sample_data.sql
   ```

4. **Verify Database**
   ```bash
   mysql -u root -p campusfound_db
   ```
   ```sql
   SHOW TABLES;        # Should show: users, posts
   SELECT COUNT(*) FROM users;  # Should show: 5
   SELECT COUNT(*) FROM posts;  # Should show: 14
   exit;
   ```

### Step 3: Backend Setup

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   # Create .env file with these variables:
   ```
   Create a file named `.env` in the `server/` directory:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_mysql_password_here
   DB_NAME=campusfound_db
   DB_CHARSET=utf8mb4
   NODE_ENV=development
   ```
   ⚠️ **Replace `your_mysql_password_here` with your actual MySQL password**

4. **Start the server**
   ```bash
   # Development mode (auto-reload on changes)
   npm run dev
   
   # OR Production mode
   npm start
   ```

5. **Verify server is running**
   - You should see: `Server running on http://localhost:3000`
   - Test: Open browser and go to `http://localhost:3000/api/posts`

### Step 4: Frontend Setup

1. **Open new terminal** (keep server running)

2. **Navigate to client directory**
   ```bash
   cd client
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Open browser and go to `http://localhost:5173`
   - You should see the CampusFound application

## 🎮 Usage

### First Time Users:

1. **Register an Account**
   - Click "Register" on the homepage
   - Enter name, email, and password
   - Click "Create Account"

2. **Login**
   - Enter your email and password
   - Click "Login"

3. **Create a Post**
   - Click "New Post" button
   - Select type: Lost or Found
   - Enter title and description
   - Submit the post

4. **Browse Posts**
   - View all lost and found items
   - Click on any post to see details

5. **Resolve Posts**
   - When an item is recovered, mark it as resolved

## 📡 API Documentation

### Authentication Endpoints

**Register User**
```http
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login User**
```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Post Endpoints

**Get All Posts**
```http
GET http://localhost:3000/api/posts
```

**Get Single Post**
```http
GET http://localhost:3000/api/posts/:id
```

**Create Post**
```http
POST http://localhost:3000/api/posts
Content-Type: application/json

{
  "title": "Lost Blue Backpack",
  "description": "Lost near library",
  "type": "lost",
  "user_id": 1
}
```

**Resolve Post**
```http
PUT http://localhost:3000/api/posts/:id/resolve
```

## 🗄️ Database Schema

### Users Table
| Column | Type | Description |
|--------|------|-------------|
| user_id | INT (PK) | Auto-increment primary key |
| name | VARCHAR(100) | User's full name |
| email | VARCHAR(150) | Unique email address |
| password_hash | VARCHAR(255) | Bcrypt hashed password |
| created_at | TIMESTAMP | Account creation time |

### Posts Table
| Column | Type | Description |
|--------|------|-------------|
| post_id | INT (PK) | Auto-increment primary key |
| title | VARCHAR(100) | Post title |
| description | TEXT | Detailed description |
| type | ENUM('lost','found') | Item type |
| status | ENUM('open','resolved') | Post status (default: 'open') |
| user_id | INT (FK) | Creator's user ID |
| created_at | TIMESTAMP | Post creation time |
| updated_at | TIMESTAMP | Last update time |

## 🐛 Troubleshooting

### Common Issues:

**1. "MySQL connection failed"**
- Check MySQL is running: `mysql --version`
- Verify credentials in `server/.env` file
- Test connection: `mysql -u root -p`

**2. "Port 3000 already in use"**
- Kill existing process or change PORT in `.env`
- Windows: `netstat -ano | findstr :3000` then `taskkill /PID <PID> /F`

**3. "Cannot find module"**
- Run `npm install` in both server and client directories
- Delete `node_modules` and `package-lock.json`, then reinstall

**4. "Database doesn't exist"**
- Run: `mysql -u root -p < database/schema.sql`

**5. "Permission denied on MySQL"**
- Check MySQL user has proper permissions
- Grant permissions: `GRANT ALL PRIVILEGES ON campusfound_db.* TO 'root'@'localhost';`

## 📚 Project Documentation

For detailed documentation:
- [Server API Documentation](server/README.md)
- [Database Setup Guide](database/README.md)
- [Frontend Documentation](client/README.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 👥 Team

Developed by the CampusFound team

## 📄 License

MIT License - feel free to use this project for learning and development.

## 📞 Support

If you encounter any issues:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Review documentation in server/, database/, and client/ folders
3. Create an issue on GitHub

---

**Happy Coding! 🚀**
├── docs/        # Docs, ER diagrams, screenshots
└── README.md
```

## Getting Started
### Prerequisites
- Node.js (16+)
- npm or pnpm
- MySQL
- Git

### Environment variables (server/.env)
```
PORT=4000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=campusfound_db
JWT_SECRET=your_jwt_secret
```

### Local setup (Quick)
1. Clone the repo:
```bash
git clone <repo-url> campusfound
cd campusfound
```
2. Execute schema (creates database and tables):
```bash
# This single command creates the database and all tables
mysql -u root -p < database/schema.sql
```
3. (Optional) Load sample data:
```bash
mysql -u root -p < database/seeds/sample_data.sql
```
4. Start backend:
```bash
cd server
npm install
npm run dev
```
4. Start frontend:
```bash
cd ../client
npm install
npm run dev
```

Server typically runs on `http://localhost:4000` and client on `http://localhost:5173` (Vite default).

---

## Database Schema
Save to `database/schema.sql` and run against your DB:

```sql
CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(150) UNIQUE,
  password_hash VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  post_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100),
  description TEXT,
  type ENUM('lost','found'),
  status ENUM('open','resolved') DEFAULT 'open',
  user_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
```

---

## API Reference (brief)
Base path: `/api`

**Auth**
- `POST /api/auth/register` — body: `{ name, email, password }`
- `POST /api/auth/login` — body: `{ email, password }` → returns `{ token }`

**Posts**
- `POST /api/posts` — create post (auth required): `{ title, description, type }`
- `GET /api/posts` — list posts
- `PUT /api/posts/:id/resolve` — mark resolved (auth / owner)

Include `Authorization: Bearer <token>` header for protected endpoints.

---

## Development Workflow
- Branches: `feat/*`, `fix/*`, `chore/*`
- Open a PR against `main` with description and testing steps
- Add tests for new backend routes (Jest + Supertest) and frontend components (Vitest / RTL)
- Follow Conventional Commits (e.g., `feat(auth): add login endpoint`)

---

## Deployment
- Frontend: Vercel (deploy `client/`)
- Backend: Any Node host (Railway, Render, Heroku, or containerized provider)
- Use environment variables for production DB credentials and secure JWT_SECRET

---

## Roadmap
- Add image uploads to posts (S3 or Cloud Storage)
- Add search/filters and pagination
- Admin role to manage posts
- Email notifications and campus triage workflow

---

## Contributing
1. Fork the repo
2. Create branch `feat/your-feature`
3. Add tests and update docs
4. Open PR with description and screenshots

---

## License & Contact
License: MIT (choose your preferred OSS license)

Contact: Khilan (project owner) — open an issue for questions or feature requests

---