import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // Kết nối đến MongoDB sử dụng URI từ biến môi trường
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // In ra thông báo kết nối thành công cùng với hostname
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    // Xử lý lỗi nếu kết nối thất bại
    console.log(error);
    // Thoát ứng dụng với mã lỗi 1
    process.exit(1);
  }
};
