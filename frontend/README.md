# Frontend - React Todo Application

This is the frontend part of the MERN Stack Todo List Application, built with React, Vite, and Material-UI.

## Tech Stack

- **React 19** - JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **Material-UI (MUI)** - React component library for modern UI design
- **Axios** - HTTP client for API requests
- **React Icons** - Icon library for React applications

## Features

- ✅ Modern React with hooks (useState, useEffect)
- ✅ Material-UI components for professional design
- ✅ Real-time todo management (CRUD operations)
- ✅ Inline editing functionality
- ✅ Responsive design
- ✅ Hot Module Replacement (HMR) for fast development
- ✅ ESLint configuration for code quality

## Project Structure

```
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md           # This file
```

## Available Scripts

- `npm run dev` - Start development server (http://localhost:5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## Development Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## API Integration

The frontend communicates with the backend API through Axios. The Vite proxy configuration automatically forwards API requests to the backend server:

```javascript
// vite.config.js
server: {
  proxy: {
    "/api": {
      target: "http://localhost:5000",
    },
  },
}
```

### API Endpoints Used

- `GET /api/todos` - Fetch all todos
- `POST /api/todos` - Create new todo
- `PATCH /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

## Component Architecture

### App.jsx

Main application component that handles:

- State management for todos and editing
- CRUD operations with backend API
- User interface rendering with Material-UI components

### Key State Variables

- `newTodo` - Input value for new todo
- `todos` - Array of all todos
- `editingTodo` - ID of currently editing todo
- `editedText` - Text value during editing

### Key Functions

- `addTodo()` - Add new todo to database
- `fetchTodos()` - Retrieve all todos from database
- `startEditing()` - Enter edit mode for a todo
- `saveEdit()` - Save edited todo to database
- `cancelEdit()` - Cancel editing without saving
- `deleteTodo()` - Remove todo from database
- `toggleTodo()` - Toggle completion status

## Material-UI Components Used

- `Container` - Layout container with responsive breakpoints
- `Paper` - Elevated surface for content
- `Typography` - Text styling and hierarchy
- `TextField` - Input field for todo text
- `Button` - Action buttons with icons
- `List` & `ListItem` - Todo list display
- `Checkbox` - Toggle completion status
- `IconButton` - Icon-based action buttons
- `Box` - Layout and spacing utility

## Icons Used

- `Add` - Add new todo
- `Edit` - Edit existing todo
- `Delete` - Delete todo
- `Save` - Save changes
- `Cancel` - Cancel editing
- `CheckCircle` - Completed todo indicator
- `RadioButtonUnchecked` - Incomplete todo indicator

## Styling Approach

The application uses Material-UI's `sx` prop for styling, providing:

- Consistent design system
- Responsive breakpoints
- Theme-based colors and spacing
- Hover and focus states
- Accessibility features

## Build and Deployment

### Development Build

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

The build output will be in the `dist/` directory, ready for deployment.

### Preview Production Build

```bash
npm run preview
```

## ESLint Configuration

The project includes ESLint configuration for:

- React best practices
- React Hooks rules
- Code quality and consistency
- Modern JavaScript standards

## Browser Support

- Modern browsers with ES6+ support
- Native ES Modules support
- Chrome, Firefox, Safari, Edge (latest versions)

## Contributing

1. Follow React best practices
2. Use Material-UI components consistently
3. Maintain responsive design principles
4. Write clean, readable code
5. Test all CRUD operations before committing

## Troubleshooting

### Common Issues

1. **API Connection Issues**

   - Ensure backend server is running on port 5000
   - Check proxy configuration in `vite.config.js`

2. **Build Errors**

   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check for version conflicts in package.json

3. **Hot Reload Not Working**
   - Restart development server
   - Check file permissions and paths

## Future Enhancements

- [ ] Add todo categories/tags
- [ ] Implement drag-and-drop reordering
- [ ] Add due dates and reminders
- [ ] Dark/light theme toggle
- [ ] Offline support with service workers
- [ ] Unit and integration tests
