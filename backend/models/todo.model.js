import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    // Định nghĩa trường text cho nội dung của todo
    text: {
      type: String, // Kiểu dữ liệu là chuỗi
      required: true, // Bắt buộc phải có
    },
    // Định nghĩa trường completed để đánh dấu trạng thái hoàn thành
    completed: {
      type: Boolean, // Kiểu dữ liệu boolean
      default: false, // Giá trị mặc định là false (chưa hoàn thành)
    },
  },
  { timestamps: true } // Tự động thêm createdAt và updatedAt
);
// Tạo model Todo từ schema đã định nghĩa
const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
