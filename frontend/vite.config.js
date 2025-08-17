import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Cấu hình proxy để chuyển tiếp các request có đường dẫn /api đến server backend
      "/api": {
        // Địa chỉ server backend đang chạy trên localhost port 5000
        target: "http://localhost:5000",
      },
    },
  },
});
