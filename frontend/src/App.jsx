// Import các thư viện và component cần thiết
import { useEffect, useState } from "react"; // React hooks để quản lý state và side effects
import axios from "axios"; // Thư viện để thực hiện các HTTP requests
import {
  Container, // Component chứa nội dung với độ rộng tối đa xác định
  Typography, // Component hiển thị văn bản với kiểu dáng nhất định
  TextField, // Component trường nhập liệu
  Button, // Component nút bấm
  List, // Component danh sách
  ListItem, // Component mục trong danh sách
  IconButton, // Component nút bấm dạng icon
  Checkbox, // Component hộp kiểm
  Box, // Component hộp chứa nội dung linh hoạt
  Paper, // Component tạo hiệu ứng giấy
} from "@mui/material";
import {
  Delete, // Icon xóa
  Edit, // Icon chỉnh sửa
  Done, // Icon hoàn thành
  Close, // Icon đóng
  Add, // Icon thêm
  RadioButtonUnchecked, // Icon nút radio chưa chọn
  CheckCircle, // Icon nút kiểm đã chọn
} from "@mui/icons-material";

// Component chính của ứng dụng
function App() {
  // State để lưu trữ nội dung công việc mới
  const [newTodo, setNewTodo] = useState("");
  // State để lưu trữ danh sách công việc
  const [todos, setTodos] = useState([]);
  // State để lưu trữ ID của công việc đang được chỉnh sửa
  const [editingTodo, setEditingTodo] = useState(null);
  // State để lưu trữ nội dung mới khi chỉnh sửa công việc
  const [editedText, setEditText] = useState("");

  // Hàm thêm công việc mới
  const addTodo = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form
    if (!newTodo.trim()) return; // Nếu nội dung trống thì không thêm
    try {
      // Gửi yêu cầu POST để thêm công việc mới
      const respose = await axios.post("/api/todos", { text: newTodo });
      // Cập nhật danh sách công việc với công việc mới
      setTodos([...todos, respose.data]);
      // Xóa nội dung trong trường nhập liệu
      setNewTodo("");
    } catch (error) {
      // Xử lý lỗi nếu có
      console.log(error);
    }
  };

  // Hàm lấy danh sách công việc từ server
  const fetchTodos = async () => {
    try {
      // Gửi yêu cầu GET để lấy danh sách công việc
      const respose = await axios.get("/api/todos");
      // Cập nhật state todos với dữ liệu nhận được
      setTodos(respose.data);
    } catch (error) {
      // Xử lý lỗi nếu có
      console.log(error);
    }
  };

  // Hook useEffect để gọi hàm fetchTodos khi component được mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Hàm bắt đầu chỉnh sửa một công việc
  const startEditing = (todo) => {
    // Lưu ID của công việc đang chỉnh sửa
    setEditingTodo(todo._id);
    // Lưu nội dung hiện tại của công việc vào state editedText
    setEditText(todo.text);
  };

  // Hàm lưu thay đổi khi chỉnh sửa công việc
  const saveEdit = async (id) => {
    try {
      // Gửi yêu cầu PATCH để cập nhật nội dung công việc
      const response = await axios.patch(`/api/todos/${id}`, {
        text: editedText,
      });
      // Cập nhật danh sách công việc với công việc đã chỉnh sửa
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      // Đặt lại trạng thái chỉnh sửa
      setEditingTodo(null);
    } catch (error) {
      // Xử lý lỗi nếu có
      console.log(error);
    }
  };

  // Hàm xóa công việc
  const deleteTodo = async (id) => {
    try {
      // Gửi yêu cầu DELETE để xóa công việc
      await axios.delete(`/api/todos/${id}`);
      // Cập nhật danh sách công việc bằng cách loại bỏ công việc đã xóa
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      // Xử lý lỗi nếu có
      console.log(error);
    }
  };

  // Hàm đánh dấu công việc đã hoàn thành/chưa hoàn thành
  const toggleTodo = async (id) => {
    try {
      // Tìm công việc cần cập nhật trong danh sách
      const foundTodo = todos.find((todo) => todo._id === id);
      // Gửi yêu cầu PATCH để cập nhật trạng thái hoàn thành
      const response = await axios.patch(`/api/todos/${id}`, {
        completed: !foundTodo.completed,
      });
      // Cập nhật danh sách công việc với công việc đã thay đổi trạng thái
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
    } catch (error) {
      // Xử lý lỗi nếu có
      console.log(error);
    }
  };

  // Giao diện người dùng
  return (
    // Container chính với độ rộng tối đa sm và căn giữa nội dung
    <Container
      maxWidth="sm"
      sx={{
        mt: 4, // Margin top 4 units
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Paper tạo hiệu ứng nổi cho toàn bộ ứng dụng */}
      <Paper
        elevation={3} // Độ nổi của Paper
        sx={{
          p: 4, // Padding 4 units
          width: "100%",
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        {/* Tiêu đề ứng dụng */}
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Task Manager
        </Typography>

        {/* Form thêm công việc mới */}
        <Box
          component="form"
          onSubmit={addTodo}
          sx={{ display: "flex", gap: 1, mb: 2 }}
        >
          {/* Trường nhập công việc mới */}
          <TextField
            fullWidth
            variant="outlined"
            label="Add a todo..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            required
          />
          {/* Nút thêm công việc */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<Add />}
          >
            Add
          </Button>
        </Box>

        {/* Danh sách các công việc */}
        <List>
          {todos.map((todo) => (
            <ListItem
              key={todo._id}
              divider // Thêm đường kẻ phân cách giữa các mục
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 1,
              }}
            >
              {editingTodo === todo._id ? (
                // Giao diện khi đang chỉnh sửa công việc
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    gap: 1,
                  }}
                >
                  {/* Trường nhập để chỉnh sửa công việc */}
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={editedText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  {/* Nút lưu thay đổi */}
                  <IconButton
                    color="success"
                    onClick={() => saveEdit(todo._id)}
                  >
                    <Done />
                  </IconButton>
                  {/* Nút hủy chỉnh sửa */}
                  <IconButton
                    color="default"
                    onClick={() => setEditingTodo(null)}
                  >
                    <Close />
                  </IconButton>
                </Box>
              ) : (
                // Giao diện hiển thị công việc bình thường
                <>
                  {/* Phần bên trái chứa checkbox và nội dung công việc */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      flexGrow: 1,
                      overflow: "hidden",
                    }}
                  >
                    {/* Checkbox đánh dấu hoàn thành */}
                    <Checkbox
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo._id)}
                      icon={<RadioButtonUnchecked />}
                      checkedIcon={<CheckCircle />}
                    />
                    {/* Nội dung công việc */}
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
                  {/* Phần bên phải chứa các nút tác vụ */}
                  <Box>
                    {/* Nút chỉnh sửa */}
                    <IconButton
                      color="primary"
                      onClick={() => startEditing(todo)}
                    >
                      <Edit />
                    </IconButton>
                    {/* Nút xóa */}
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
