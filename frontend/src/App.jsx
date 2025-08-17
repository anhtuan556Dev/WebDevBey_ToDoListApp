import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
  Checkbox,
  Box,
  Paper,
} from "@mui/material";
import {
  Delete,
  Edit,
  Done,
  Close,
  Add,
  RadioButtonUnchecked,
  CheckCircle,
} from "@mui/icons-material";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedText, setEditText] = useState("");

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    try {
      const respose = await axios.post("/api/todos", { text: newTodo });
      setTodos([...todos, respose.data]);
      setNewTodo("");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTodos = async () => {
    try {
      const respose = await axios.get("/api/todos");
      setTodos(respose.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const startEditing = (todo) => {
    setEditingTodo(todo._id);
    setEditText(todo.text);
  };

  const saveEdit = async (id) => {
    try {
      const response = await axios.patch(`/api/todos/${id}`, {
        text: editedText,
      });
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      setEditingTodo(null);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const foundTodo = todos.find((todo) => todo._id === id);
      const response = await axios.patch(`/api/todos/${id}`, {
        completed: !foundTodo.completed,
      });
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Task Manager
        </Typography>
        <Box
          component="form"
          onSubmit={addTodo}
          sx={{ display: "flex", gap: 1, mb: 2 }}
        >
          <TextField
            fullWidth
            variant="outlined"
            label="Add a todo..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<Add />}
          >
            Add
          </Button>
        </Box>
        <List>
          {todos.map((todo) => (
            <ListItem
              key={todo._id}
              divider
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 1,
              }}
            >
              {editingTodo === todo._id ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    gap: 1,
                  }}
                >
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={editedText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <IconButton
                    color="success"
                    onClick={() => saveEdit(todo._id)}
                  >
                    <Done />
                  </IconButton>
                  <IconButton
                    color="default"
                    onClick={() => setEditingTodo(null)}
                  >
                    <Close />
                  </IconButton>
                </Box>
              ) : (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      flexGrow: 1,
                      overflow: "hidden",
                    }}
                  >
                    <Checkbox
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo._id)}
                      icon={<RadioButtonUnchecked />}
                      checkedIcon={<CheckCircle />}
                    />
                    <Typography
                      sx={{
                        textDecoration: todo.completed
                          ? "line-through"
                          : "none",
                        color: todo.completed
                          ? "text.disabled"
                          : "text.primary",
                        flexGrow: 1,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {todo.text}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton
                      color="primary"
                      onClick={() => startEditing(todo)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => deleteTodo(todo._id)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </>
              )}
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default App;
