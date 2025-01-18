import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
<<<<<<< HEAD
=======
  server: {
    proxy: {
      "/api/v1": "https://paytm-backend-m8l4.onrender.com"
    }
  },
>>>>>>> 530f0353c3063683615bfe042c42b257f343b8f5
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
