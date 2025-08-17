# MERN Stack Todo List Application

A full-stack todo list application built with MongoDB, Express.js, React, and Node.js (MERN Stack) with Material-UI components.

## Features

- ✅ Create, read, update, and delete todos
- ✅ Mark todos as complete/incomplete
- ✅ Edit todos inline
- ✅ Responsive design with Material-UI
- ✅ Real-time data persistence with MongoDB
- ✅ Production-ready deployment

## Tech Stack

**Frontend:**

- React 19
- Material-UI (MUI)
- Axios for API calls
- Vite for build tooling

**Backend:**

- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled

## Project Structure

```
ToDoListApp/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── todo.model.js
│   ├── routes/
│   │   └── todo.route.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
├── .env
├── .gitignore
└── package.json
```

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### 1. Clone the repository

```bash
git clone <repository-url>
cd ToDoListApp
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
PORT=5000
```

### 3. Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 4. Development Mode

```bash
# Start backend server (runs on port 5000)
npm run dev

# In another terminal, start frontend (runs on port 5173)
cd frontend
npm run dev
```

## API Endpoints

| Method | Endpoint         | Description                              |
| ------ | ---------------- | ---------------------------------------- |
| GET    | `/api/todos`     | Get all todos                            |
| POST   | `/api/todos`     | Create a new todo                        |
| PATCH  | `/api/todos/:id` | Update a todo (text or completed status) |
| DELETE | `/api/todos/:id` | Delete a todo                            |

## Development Process

### Backend Setup (MERN Stack)

1. **Project Initialization**: Created separate backend and frontend directories with `npm init -y`
2. **Server Setup**:
   - Created `server.js` with Express framework
   - Installed dependencies: express, mongoose, cors, dotenv
   - Configured ES6 modules with `"type": "module"`
   - Set up server on port 5000
3. **Development Optimization**: Added nodemon for auto-restart during development
4. **MongoDB Connection**:
   - Set up MongoDB Atlas cluster
   - Created database connection in `config/db.js`
   - Configured environment variables

### Backend Logic Development

1. **Todo Schema**: Defined MongoDB schema with text (required) and completed (default: false) fields
2. **CRUD Routes**: Implemented full CRUD operations in `routes/todo.route.js`
   - GET `/api/todos` - Fetch all todos
   - POST `/api/todos` - Create new todo
   - PATCH `/api/todos/:id` - Update todo
   - DELETE `/api/todos/:id` - Delete todo

### Frontend Development

1. **React Setup**: Created Vite React project with JavaScript
2. **Material-UI Integration**: Added MUI components for modern UI design
3. **User Interface**: Built responsive todo interface with:
   - Add todo form with validation
   - Todo list with inline editing
   - Complete/incomplete toggle
   - Delete functionality
4. **Backend Integration**:
   - Configured Vite proxy for API calls
   - Implemented async functions for all CRUD operations
   - Added real-time UI updates

### Key Features Implementation

- **Add Todo**: Form submission with input validation
- **Display Todos**: Real-time fetching and rendering
- **Edit Todo**: Inline editing with save/cancel options
- **Delete Todo**: Confirmation and UI update
- **Toggle Complete**: Visual status changes with database sync
- **Responsive Design**: Mobile-friendly interface

## Deployment

### Production Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Deployment on Render.com

1. Push code to GitHub repository
2. Connect Render.com to GitHub repo
3. Configure build and start commands:
   - Build Command: `npm run build`
   - Start Command: `npm start`
4. Set environment variables (MONGO_URI, NODE_ENV=production)
5. Configure MongoDB Atlas network access for deployment

## Scripts

- `npm run dev` - Start development server with nodemon
- `npm run build` - Build frontend for production
- `npm start` - Start production server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the ISC License.
