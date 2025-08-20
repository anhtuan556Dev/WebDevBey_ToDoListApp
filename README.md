# Ứng dụng Danh sách Công việc MERN Stack

Một ứng dụng danh sách công việc full-stack được xây dựng bằng MongoDB, Express.js, React và Node.js (MERN Stack) với các thành phần Material-UI.

## Tính năng

- ✅ Tạo, đọc, cập nhật và xóa công việc
- ✅ Đánh dấu công việc là đã hoàn thành/chưa hoàn thành
- ✅ Chỉnh sửa công việc nội tuyến
- ✅ Thiết kế đáp ứng với Material-UI
- ✅ Lưu trữ dữ liệu thời gian thực với MongoDB
- ✅ Sẵn sàng triển khai cho môi trường sản xuất

## Tech Stack

**Frontend:**

- React 19
- Material-UI (MUI)
- Axios cho các lệnh gọi API
- Vite cho công cụ xây dựng

**Backend:**

- Node.js
- Express.js
- MongoDB với Mongoose
- Đã bật CORS

## Cấu trúc Dự án

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

## Cài đặt & Thiết lập

### Điều kiện tiên quyết

- Node.js (v14 trở lên)
- Tài khoản MongoDB Atlas
- Git

### 1. Sao chép kho lưu trữ

```bash
git clone <repository-url>
cd ToDoListApp
```

### 2. Biến môi trường

Tạo một tệp `.env` trong thư mục gốc:

```env
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
PORT=5000
```

### 3. Cài đặt các phụ thuộc

```bash
# Cài đặt các phụ thuộc ở gốc
npm install

# Cài đặt các phụ thuộc của frontend
cd frontend
npm install
cd ..
```

### 4. Chế độ phát triển

```bash
# Khởi động máy chủ backend (chạy trên cổng 5000)
npm run dev

# Trong một terminal khác, khởi động frontend (chạy trên cổng 5173)
cd frontend
npm run dev
```

## Các điểm cuối API

| Phương thức | Điểm cuối        | Mô tả                                                       |
| ----------- | ---------------- | ----------------------------------------------------------- |
| GET         | `/api/todos`     | Lấy tất cả các công việc                                    |
| POST        | `/api/todos`     | Tạo một công việc mới                                       |
| PATCH       | `/api/todos/:id` | Cập nhật một công việc (văn bản hoặc trạng thái hoàn thành) |
| DELETE      | `/api/todos/:id` | Xóa một công việc                                           |

## Quy trình Phát triển

### Thiết lập Backend (MERN Stack)

1.  **Khởi tạo Dự án**: Tạo các thư mục backend và frontend riêng biệt bằng `npm init -y`
2.  **Thiết lập Máy chủ**:
    - Tạo `server.js` với framework Express
    - Cài đặt các phụ thuộc: express, mongoose, cors, dotenv
    - Cấu hình các mô-đun ES6 với `"type": "module"`
    - Thiết lập máy chủ trên cổng 5000
3.  **Tối ưu hóa Phát triển**: Thêm nodemon để tự động khởi động lại trong quá trình phát triển
4.  **Kết nối MongoDB**:
    - Thiết lập cụm MongoDB Atlas
    - Tạo kết nối cơ sở dữ liệu trong `config/db.js`
    - Cấu hình các biến môi trường

### Phát triển Logic Backend

1.  **Lược đồ Todo**: Định nghĩa lược đồ MongoDB với các trường văn bản (bắt buộc) và đã hoàn thành (mặc định: false)
2.  **Các tuyến đường CRUD**: Triển khai các hoạt động CRUD đầy đủ trong `routes/todo.route.js`
    - GET `/api/todos` - Lấy tất cả các công việc
    - POST `/api/todos` - Tạo công việc mới
    - PATCH `/api/todos/:id` - Cập nhật công việc
    - DELETE `/api/todos/:id` - Xóa công việc

### Phát triển Frontend

1.  **Thiết lập React**: Tạo dự án Vite React bằng JavaScript
2.  **Tích hợp Material-UI**: Thêm các thành phần MUI cho thiết kế giao diện người dùng hiện đại
3.  **Giao diện Người dùng**: Xây dựng giao diện công việc đáp ứng với:
    - Biểu mẫu thêm công việc có xác thực
    - Danh sách công việc với chỉnh sửa nội tuyến
    - Chuyển đổi hoàn thành/chưa hoàn thành
    - Chức năng xóa
4.  **Tích hợp Backend**:
    - Cấu hình proxy Vite cho các lệnh gọi API
    - Triển khai các hàm bất đồng bộ cho tất cả các hoạt động CRUD
    - Thêm cập nhật giao diện người dùng thời gian thực

### Triển khai các Tính năng Chính

- **Thêm Todo**: Gửi biểu mẫu với xác thực đầu vào
- **Hiển thị Todos**: Lấy và kết xuất thời gian thực
- **Chỉnh sửa Todo**: Chỉnh sửa nội tuyến với các tùy chọn lưu/hủy
- **Xóa Todo**: Xác nhận và cập nhật giao diện người dùng
- **Chuyển đổi Hoàn thành**: Thay đổi trạng thái trực quan với đồng bộ hóa cơ sở dữ liệu
- **Thiết kế Đáp ứng**: Giao diện thân thiện với thiết bị di động

## Triển khai

### Xây dựng Sản xuất

```bash
npm run build
```

### Khởi động Máy chủ Sản xuất

```bash
npm start
```

### Triển khai trên Render.com

1.  Đẩy mã lên kho lưu trữ GitHub
2.  Kết nối Render.com với kho lưu trữ GitHub
3.  Cấu hình các lệnh xây dựng và khởi động:
    - Lệnh Xây dựng: `npm run build`
    - Lệnh Khởi động: `npm start`
4.  Đặt các biến môi trường (MONGO_URI, NODE_ENV=production)
5.  Cấu hình quyền truy cập mạng MongoDB Atlas để triển khai

## Các tập lệnh

- `npm run dev` - Khởi động máy chủ phát triển với nodemon
- `npm run build` - Xây dựng frontend cho môi trường sản xuất
- `npm start` - Khởi động máy chủ sản xuất

## Đóng góp

1.  Fork kho lưu trữ
2.  Tạo một nhánh tính năng
3.  Cam kết các thay đổi của bạn
4.  Đẩy lên nhánh
5.  Mở một Pull Request

## Giấy phép

Dự án này được cấp phép theo Giấy phép ISC.
