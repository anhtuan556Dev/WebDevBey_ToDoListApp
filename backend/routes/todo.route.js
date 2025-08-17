// Nhập các module cần thiết
import express from "express";
import Todo from "../models/todo.model.js";

// Tạo router từ express
const router = express.Router();

// Route GET để lấy tất cả các todo
// Khi client truy cập đến '/api/todos/', hàm này sẽ được thực thi
router.get("/", async (req, res) => {
  try {
    // Truy vấn tất cả các todo từ cơ sở dữ liệu
    const todos = await Todo.find();
    // Trả về danh sách todos với mã trạng thái 200 (OK)
    res.status(200).json(todos);
  } catch (error) {
    // Nếu có lỗi, trả về mã lỗi 500 và thông báo lỗi
    res.status(500).json({ message: error.message });
  }
});

// Route POST để thêm một todo mới
// Khi client gửi yêu cầu POST đến '/api/todos/', hàm này sẽ được thực thi
router.post("/", async (req, res) => {
  // Tạo một todo mới từ dữ liệu gửi lên trong body của request
  const todo = new Todo({
    text: req.body.text, // Lấy nội dung todo từ body của request
  });
  try {
    // Lưu todo mới vào cơ sở dữ liệu
    const newTodo = await todo.save();
    // Trả về todo vừa tạo với mã trạng thái 201 (Created)
    res.status(201).json(newTodo);
  } catch (error) {
    // Nếu có lỗi (ví dụ: dữ liệu không hợp lệ), trả về mã lỗi 400 và thông báo lỗi
    res.status(400).json({ message: error.message });
  }
});

//update todo (text, completed)
router.patch("/:id", async (req, res) => {
  try {
    // Tìm kiếm todo theo ID được cung cấp trong params của request
    const todo = await Todo.findById(req.params.id);
    // Nếu không tìm thấy todo, trả về lỗi 404 (Not Found)
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    // Kiểm tra nếu có trường 'text' trong body request và cập nhật
    if (req.body.text != undefined) {
      todo.text = req.body.text;
    }
    // Kiểm tra nếu có trường 'completed' trong body request và cập nhật
    if (req.body.completed != undefined) {
      todo.completed = req.body.completed;
    }
    // Lưu các thay đổi vào cơ sở dữ liệu
    const updatedTodo = await todo.save();
    // Trả về todo đã cập nhật với mã trạng thái 200 (OK)
    res.status(200).json(updatedTodo);
  } catch (error) {
    // Nếu có lỗi trong quá trình cập nhật, trả về lỗi 400 (Bad Request) và thông báo lỗi
    res.status(400).json({ message: error.message });
  }
});

// Route DELETE để xóa một todo
// Khi client gửi yêu cầu DELETE đến '/api/todos/:id', hàm này sẽ được thực thi
router.delete("/:id", async (req, res) => {
  try {
    // Tìm và xóa todo theo ID được cung cấp trong params của request
    await Todo.findByIdAndDelete(req.params.id);
    // Trả về thông báo thành công với mã trạng thái 200 (OK)
    res.status(200).json({ message: "Todo deleted" });
  } catch (error) {
    // Nếu có lỗi trong quá trình xóa, trả về lỗi 400 (Bad Request) và thông báo lỗi
    res.status(400).json({ message: error.message });
  }
});

// Xuất router để có thể sử dụng trong các file khác (ví dụ: server.js)
export default router;
