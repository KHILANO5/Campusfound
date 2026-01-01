# CampusFound Frontend

React-based frontend for the CampusFound Lost & Found application.

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client (if used)
- **React Router** - Client-side routing (if used)

## 📁 Project Structure

```
client/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── services/      # API calls
│   ├── utils/         # Helper functions
│   ├── App.jsx        # Main app component
│   └── main.jsx       # Entry point
├── public/            # Static assets
├── index.html         # HTML template
├── package.json       # Dependencies
├── vite.config.js     # Vite configuration
└── tailwind.config.js # Tailwind configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager
- Backend server running (see [../server/README.md](../server/README.md))

### Installation

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Access application**
   - Open browser: `http://localhost:5173`
   - Vite dev server runs on port 5173 by default

### Available Scripts

```bash
npm run dev      # Start development server with HMR
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint (if configured)
```

## 🔧 Configuration

### Backend API Connection

Update the API base URL in your service files:

```javascript
// src/services/api.js or similar
const API_BASE_URL = 'http://localhost:3000/api';
```

### Environment Variables

Create `.env` file in client directory (optional):

```env
VITE_API_URL=http://localhost:3000/api
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## 🎨 Styling

This project uses **Tailwind CSS** for styling:

- Configuration: `tailwind.config.js`
- Global styles: `src/index.css`
- Utility classes: Use directly in JSX

```jsx
<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Click Me
</button>
```

## 📱 Features to Implement

### Pages:
- Home/Landing page
- User registration
- User login
- Dashboard (all posts)
- Create post form
- Post detail view
- User profile

### Components:
- Navbar
- Post card
- Form inputs
- Loading spinner
- Error messages
- Auth context/provider

## 🐛 Troubleshooting

**1. "Failed to fetch" or CORS errors**
- Ensure backend server is running on port 3000
- Check CORS is enabled in backend (server/index.js)
- Verify API URL is correct

**2. "npm ERR! code ELIFECYCLE"**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

**3. Port 5173 already in use**
- Change port in `vite.config.js`:
  ```javascript
  export default defineConfig({
    server: { port: 5174 }
  })
  ```

**4. Styles not applying**
- Check Tailwind is configured correctly
- Ensure `index.css` imports Tailwind directives
- Run `npm run dev` to rebuild

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

When adding new features:
1. Create components in `src/components/`
2. Create pages in `src/pages/`
3. Add API calls in `src/services/`
4. Follow existing code structure
5. Test before committing

---

For backend setup, see [../server/README.md](../server/README.md)
