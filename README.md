# TaskFlow

TaskFlow is a full-stack MERN task management application that helps users create, organize, update, and delete personal tasks from a protected dashboard. It includes user authentication, JWT-based route protection, MongoDB Atlas persistence, and a clean responsive interface built with React, Vite, and Tailwind CSS.

## Features

- User signup and login
- Password hashing with bcrypt
- JWT authentication
- Protected dashboard routes
- Create, view, edit, and delete tasks
- User-specific task access
- User profile page
- Logout functionality
- Responsive Tailwind CSS UI
- Loading, success, error, and empty states
- Production-ready deployment setup for Vercel and Render

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React, Vite, Tailwind CSS, React Router, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| ODM | Mongoose |
| Authentication | JWT, bcrypt |
| Deployment | Vercel, Render |

## Folder Structure

```text
TaskFlow/
  client/
    src/
      api/
        axios.js
      components/
        AuthForm.jsx
        Navbar.jsx
        ProtectedRoute.jsx
        TaskCard.jsx
        TaskForm.jsx
      context/
        AuthContext.jsx
      pages/
        Dashboard.jsx
        Home.jsx
        Login.jsx
        Profile.jsx
        Signup.jsx
      App.jsx
      main.jsx
      styles.css
    .env.example
    package.json
    vercel.json

  server/
    config/
      db.js
    middleware/
      authMiddleware.js
    models/
      Task.js
      User.js
    routes/
      authRoutes.js
      taskRoutes.js
    .env.example
    package.json
    render.yaml
    server.js

  README.md
```

## API Endpoints

### Auth Routes

| Method | Endpoint | Description | Protected |
| --- | --- | --- | --- |
| POST | `/api/auth/signup` | Register a new user | No |
| POST | `/api/auth/login` | Login user and return JWT | No |
| GET | `/api/auth/profile` | Get logged-in user profile | Yes |

### Task Routes

All task routes require an authorization header:

```text
Authorization: Bearer <token>
```

| Method | Endpoint | Description | Protected |
| --- | --- | --- | --- |
| POST | `/api/tasks` | Create a task | Yes |
| GET | `/api/tasks` | Get logged-in user's tasks | Yes |
| PUT | `/api/tasks/:id` | Update a task | Yes |
| DELETE | `/api/tasks/:id` | Delete a task | Yes |

## Installation

### Prerequisites

- Node.js 18 or later
- npm
- MongoDB Atlas account

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd TaskFlow
```

### 2. Backend Setup

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

The backend will run at:

```text
http://localhost:5000
```

### 3. Frontend Setup

Open a second terminal:

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

## Environment Variables

### Backend `.env`

Create `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://Anup:<db_password>@cluster0.a2yog3a.mongodb.net/taskflow?retryWrites=true&w=majority
JWT_SECRET=your_secret_key
CLIENT_URLS=http://localhost:5173
```

| Variable | Description |
| --- | --- |
| `PORT` | Backend server port |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key used to sign JWT tokens |
| `CLIENT_URLS` | Comma-separated list of allowed frontend URLs for CORS |

### Frontend `.env`

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000
```

| Variable | Description |
| --- | --- |
| `VITE_API_URL` | Backend base URL. Do not include `/api`; Axios adds it automatically. |

## Deployment

### Frontend: Vercel

Recommended Vercel settings:

```text
Root Directory: client
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

Required Vercel environment variable:

```env
VITE_API_URL=https://your-taskflow-api.onrender.com
```

### Backend: Render

Recommended Render settings:

```text
Root Directory: server
Environment: Node
Build Command: npm install
Start Command: npm start
Health Check Path: /api/health
```

Required Render environment variables:

```env
NODE_ENV=production
PORT=5000
MONGO_URI=
JWT_SECRET=your_production_secret_key
CLIENT_URLS=https://your-taskflow-app.vercel.app,http://localhost:5173
```

### MongoDB Atlas

1. Create a MongoDB Atlas cluster.
2. Create a database user.
3. Add the database password to the `MONGO_URI`.
4. Allow network access for your deployed backend.

## Deployment Links

- Frontend: `https://your-taskflow-app.vercel.app`
- Backend API: `https://your-taskflow-api.onrender.com`
- Repository: `https://github.com/your-username/taskflow`

## Screenshots

Add screenshots after deployment:

```text
screenshots/home.png
screenshots/login.png
screenshots/dashboard.png
screenshots/profile.png
```

Suggested preview:

| Home | Dashboard |
| --- | --- |
| Add home page screenshot here | Add dashboard screenshot here |

| Login | Profile |
| --- | --- |
| Add login screenshot here | Add profile screenshot here |

## Author

**Anurag**

- GitHub: `https://github.com/your-username`
- LinkedIn: `https://linkedin.com/in/your-profile`
- Email: `your-email@example.com`

## License

This project is created for learning and internship submission purposes.
