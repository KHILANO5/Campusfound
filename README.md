# CampusFound 📘

**A lightweight Lost & Found web application — a hackathon practice project.**

CampusFound helps students report and recover lost items using a simple workflow so your team can practice authentication, database design, API development, frontend/backend integration, and GitHub collaboration.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Database Schema](#database-schema)
- [API Reference](#api-reference)
- [Development Workflow](#development-workflow)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [License & Contact](#license--contact)

---

## Project Overview
CampusFound is a focused practice project built to simulate a real development workflow for hackathon preparation. Users can register/login, post lost or found items, view posts, and mark items as resolved.

## Features
- ✅ User registration & login (JWT)
- ✅ Create Lost / Found posts
- ✅ View all posts (public)
- ✅ Mark post as resolved

## Tech Stack
**Frontend:** React (Vite) + Tailwind CSS

**Backend:** Node.js + Express

**Database:** MySQL (local / dev)

**Dev & Deploy:** GitHub (branch-based workflow), Vercel for frontend (optional)

---

## Project Structure
```
campusfound/
├── client/      # React frontend (Vite)
├── server/      # Node.js backend (Express)
├── database/    # MySQL schema / migrations
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
2. Create DB and apply schema:
```sql
CREATE DATABASE campusfound_db;
-- run database/schema.sql (or paste schema below into your MySQL client)
```
3. Start backend:
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