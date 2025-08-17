import "./index.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { MdModeEditOutline, MdOutlineDone } from "react-icons/md";
import { IoClose } from "react-icons/io5";

function App() {
  // Khai báo các state để quản lý dữ liệu
  const [newTodo, setNewTodo] = useState(""); // State lưu giá trị todo mới
  const [todos, setTodos] = useState([]); // State lưu danh sách todos
  const [editingTodo, setEditingTodo] = useState(null); // State lưu id của todo đang được chỉnh sửa
  const [editedText, setEditText] = useState(""); // State lưu nội dung đang chỉnh sửa

  // Hàm thêm todo mới
  const addTodo = async (e) => {
    e.preventDefault(); // Ngăn chặn form submit mặc định
    if (!newTodo.trim()) return; // Kiểm tra nếu input rỗng thì return
    try {
      // Gọi API để thêm todo mới
      const respose = await axios.post("/api/todos", { text: newTodo });
      setTodos([...todos, respose.data]); // Cập nhật state todos
      setNewTodo(""); // Reset input
    } catch (error) {
      console.log(error);
    }
  };

  // Hàm lấy danh sách todos từ server
  const fetchTodos = async () => {
    try {
      const respose = await axios.get("/api/todos");
      setTodos(respose.data); // Cập nhật state todos với dữ liệu từ server
    } catch (error) {
      console.log(error);
    }
  };
  // Gọi fetchTodos khi component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Hàm bắt đầu chỉnh sửa todo
  const startEditing = (todo) => {
    setEditingTodo(todo._id); // Lưu id của todo đang chỉnh sửa
    setEditText(todo.text); // Lưu text hiện tại vào state
  };

  // Hàm lưu chỉnh sửa todo
  const saveEdit = async (id) => {
    try {
      // Gửi yêu cầu cập nhật todo
      const response = await axios.patch(`/api/todos/${id}`, {
        text: editedText,
      });
      // Cập nhật UI với todo đã được chỉnh sửa
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      // Reset trạng thái chỉnh sửa
      setEditingTodo(null);
    } catch (error) {
      console.log(error);
    }
  };
  // Hàm xóa todo
  const deleteTodo = async (id) => {
    try {
      // Gửi yêu cầu xóa todo
      await axios.delete(`/api/todos/${id}`);
      // Cập nhật UI bằng cách loại bỏ todo đã xóa
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  // Hàm toggle trạng thái completed của todo
  const toggleTodo = async (id) => {
    try {
      // Tìm todo trong mảng todos
      const foundTodo = todos.find((todo) => todo._id === id);
      // Gửi yêu cầu cập nhật trạng thái completed
      const response = await axios.patch(`/api/todos/${id}`, {
        completed: !foundTodo.completed,
      });
      // Cập nhật UI với todo đã được cập nhật
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Task Manager
        </h1>
        <form
          onSubmit={addTodo}
          className="flex items-center gap-2 shadow-sm border border-gray-200 p-2 rounded-lg"
        >
          <input
            className="flex-1 outline-none px-3 py-2 placeholder-gray-400"
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a todo..."
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font font-medium cursor-pointer"
          >
            Add Task
          </button>
        </form>
        <div className="mt-4">
          {todos.length === 0 ? (
            <div></div>
          ) : (
            <div className="flex flex-col gap-4">
              {todos.map((todo) => (
                <div key={todo._id}>
                  {editingTodo === todo._id ? (
                    <div className="flex items-center gap-x-3">
                      <input
                        className="flex-1 p-3 border rounded-lg outline-none focus:ring-blue-300 text-gray-700 shadow-inner border-gray-200"
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                      <div className="flex gap-x-2">
                        <button
                          onClick={() => saveEdit(todo._id)}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer"
                        >
                          <MdOutlineDone />
                        </button>
                        <button
                          onClick={() => setEditingTodo(null)}
                          className="px-4 py-2 bg-gray-200 text-white rounded-lg hover:bg-gray-300 cursor-pointer"
                        >
                          <IoClose />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <div className="flex gap-x-4 items-center overflow-hidden">
                        <button
                          onClick={() => toggleTodo(todo._id)}
                          className={`flex-shrink-0 h-6 w-6 border rounded-full flex items-center justify-center ${
                            todo.completed
                              ? "bg-green-500 border-green-500"
                              : "border-gray-300 hover:border-blue-400"
                          }`}
                        >
                          {todo.completed && <MdOutlineDone />}
                        </button>
                        <span className="text-gray-800 font-medium truncate">
                          {todo.text}
                        </span>
                      </div>
                      <div className="flex gap-x-2">
                        <button
                          className="p-2 text-blue-500 hover:text-blue-700 rounded-lg hover:bg-blue-50 duration-200"
                          onClick={() => startEditing(todo)}
                        >
                          <MdModeEditOutline />
                        </button>
                        <button
                          onClick={() => deleteTodo(todo._id)}
                          className="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 duration-200"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
