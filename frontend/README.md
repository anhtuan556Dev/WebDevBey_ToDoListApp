# Frontend - Ứng dụng React Todo

Đây là phần frontend của Ứng dụng Danh sách Công việc MERN Stack, được xây dựng bằng React, Vite và Material-UI.

## Tech Stack

- **React 19** - Thư viện JavaScript để xây dựng giao diện người dùng
- **Vite** - Công cụ xây dựng và máy chủ phát triển nhanh
- **Material-UI (MUI)** - Thư viện thành phần React cho thiết kế giao diện người dùng hiện đại
- **Axios** - Trình khách HTTP cho các yêu cầu API
- **React Icons** - Thư viện biểu tượng cho các ứng dụng React

## Tính năng

- ✅ React hiện đại với hooks (useState, useEffect)
- ✅ Các thành phần Material-UI cho thiết kế chuyên nghiệp
- ✅ Quản lý công việc thời gian thực (hoạt động CRUD)
- ✅ Chức năng chỉnh sửa nội tuyến
- ✅ Thiết kế đáp ứng
- ✅ Thay thế Mô-đun Nóng (HMR) để phát triển nhanh
- ✅ Cấu hình ESLint để đảm bảo chất lượng mã

## Cấu trúc Dự án

```
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── App.jsx          # Thành phần ứng dụng chính
│   ├── main.jsx         # Điểm vào ứng dụng
│   └── index.css        # Kiểu dáng toàn cục
├── index.html           # Mẫu HTML
├── package.json         # Các phụ thuộc và tập lệnh
├── vite.config.js       # Cấu hình Vite
└── README.md           # Tệp này
```

## Các tập lệnh có sẵn

- `npm run dev` - Khởi động máy chủ phát triển (http://localhost:5173)
- `npm run build` - Xây dựng cho môi trường sản xuất
- `npm run preview` - Xem trước bản dựng sản xuất cục bộ
- `npm run lint` - Chạy ESLint để kiểm tra chất lượng mã

## Thiết lập Phát triển

### Điều kiện tiên quyết

- Node.js (v14 trở lên)
- Trình quản lý gói npm hoặc yarn

### Cài đặt

```bash
# Điều hướng đến thư mục frontend
cd frontend

# Cài đặt các phụ thuộc
npm install

# Khởi động máy chủ phát triển
npm run dev
```

Ứng dụng sẽ có sẵn tại `http://localhost:5173`

## Tích hợp API

Frontend giao tiếp với API backend thông qua Axios. Cấu hình proxy của Vite tự động chuyển tiếp các yêu cầu API đến máy chủ backend:

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

### Các điểm cuối API được sử dụng

- `GET /api/todos` - Lấy tất cả các công việc
- `POST /api/todos` - Tạo công việc mới
- `PATCH /api/todos/:id` - Cập nhật công việc
- `DELETE /api/todos/:id` - Xóa công việc

## Kiến trúc Thành phần

### App.jsx

Thành phần ứng dụng chính xử lý:

- Quản lý trạng thái cho các công việc và chỉnh sửa
- Các hoạt động CRUD với API backend
- Kết xuất giao diện người dùng với các thành phần Material-UI

### Các biến trạng thái chính

- `newTodo` - Giá trị đầu vào cho công việc mới
- `todos` - Mảng chứa tất cả các công việc
- `editingTodo` - ID của công việc đang được chỉnh sửa
- `editedText` - Giá trị văn bản trong quá trình chỉnh sửa

### Các hàm chính

- `addTodo()` - Thêm công việc mới vào cơ sở dữ liệu
- `fetchTodos()` - Lấy tất cả các công việc từ cơ sở dữ liệu
- `startEditing()` - Chuyển sang chế độ chỉnh sửa cho một công việc
- `saveEdit()` - Lưu công việc đã chỉnh sửa vào cơ sở dữ liệu
- `cancelEdit()` - Hủy chỉnh sửa mà không lưu
- `deleteTodo()` - Xóa công việc khỏi cơ sở dữ liệu
- `toggleTodo()` - Chuyển đổi trạng thái hoàn thành

## Các thành phần Material-UI được sử dụng

- `Container` - Vùng chứa bố cục với các điểm ngắt đáp ứng
- `Paper` - Bề mặt nổi để chứa nội dung
- `Typography` - Kiểu dáng và phân cấp văn bản
- `TextField` - Trường nhập liệu cho văn bản công việc
- `Button` - Các nút hành động có biểu tượng
- `List` & `ListItem` - Hiển thị danh sách công việc
- `Checkbox` - Chuyển đổi trạng thái hoàn thành
- `IconButton` - Các nút hành động dựa trên biểu tượng
- `Box` - Tiện ích bố cục và khoảng cách

## Các biểu tượng được sử dụng

- `Add` - Thêm công việc mới
- `Edit` - Chỉnh sửa công việc hiện có
- `Delete` - Xóa công việc
- `Save` - Lưu thay đổi
- `Cancel` - Hủy chỉnh sửa
- `CheckCircle` - Chỉ báo công việc đã hoàn thành
- `RadioButtonUnchecked` - Chỉ báo công việc chưa hoàn thành

## Phương pháp tạo kiểu

Ứng dụng sử dụng prop `sx` của Material-UI để tạo kiểu, cung cấp:

- Hệ thống thiết kế nhất quán
- Các điểm ngắt đáp ứng
- Màu sắc và khoảng cách dựa trên chủ đề
- Các trạng thái khi di chuột và tập trung
- Các tính năng trợ năng

## Xây dựng và Triển khai

### Xây dựng phát triển

```bash
npm run dev
```

### Xây dựng sản xuất

```bash
npm run build
```

Đầu ra của bản dựng sẽ nằm trong thư mục `dist/`, sẵn sàng để triển khai.

### Xem trước bản dựng sản xuất

```bash
npm run preview
```

## Cấu hình ESLint

Dự án bao gồm cấu hình ESLint cho:

- Các phương pháp hay nhất của React
- Các quy tắc của React Hooks
- Chất lượng và tính nhất quán của mã
- Các tiêu chuẩn JavaScript hiện đại

## Hỗ trợ Trình duyệt

- Các trình duyệt hiện đại hỗ trợ ES6+
- Hỗ trợ Mô-đun ES gốc
- Chrome, Firefox, Safari, Edge (các phiên bản mới nhất)

## Đóng góp

1. Tuân thủ các phương pháp hay nhất của React
2. Sử dụng các thành phần Material-UI một cách nhất quán
3. Duy trì các nguyên tắc thiết kế đáp ứng
4. Viết mã sạch, dễ đọc
5. Kiểm tra tất cả các hoạt động CRUD trước khi cam kết

## Khắc phục sự cố

### Các vấn đề thường gặp

1. **Sự cố kết nối API**

   - Đảm bảo máy chủ backend đang chạy trên cổng 5000
   - Kiểm tra cấu hình proxy trong `vite.config.js`

2. **Lỗi xây dựng**

   - Xóa node_modules và cài đặt lại: `rm -rf node_modules && npm install`
   - Kiểm tra xung đột phiên bản trong package.json

3. **Tải lại nóng không hoạt động**
   - Khởi động lại máy chủ phát triển
   - Kiểm tra quyền và đường dẫn tệp

## Các cải tiến trong tương lai

- [ ] Thêm danh mục/thẻ cho công việc
- [ ] Triển khai sắp xếp lại bằng cách kéo và thả
- [ ] Thêm ngày hết hạn và lời nhắc
- [ ] Chuyển đổi chủ đề sáng/tối
- [ ] Hỗ trợ ngoại tuyến với service workers
- [ ] Kiểm thử đơn vị và tích hợp
