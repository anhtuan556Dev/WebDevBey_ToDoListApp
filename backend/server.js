// Nhập các module cần thiết
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import todoRoute from "./routes/todo.route.js";
import path from "path";

// Tải các biến môi trường từ file .env
dotenv.config();

const PORT = process.env.PORT || 5000;

// Khởi tạo ứng dụng express
const app = express();
const __dirname = path.resolve();

// Định nghĩa một route cho trang chủ
app.use(express.json());

app.use("/api/todos", todoRoute);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  // Serve static files from frontend/dist
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  // Serve index.html for all routes except /api
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Lắng nghe các request trên port 5000
app.listen(PORT, () => {
  // Kết nối đến cơ sở dữ liệu
  connectDB();
  // In ra thông báo khi server khởi động thành công
  console.log(`Server is running on port ${PORT}`);
});
