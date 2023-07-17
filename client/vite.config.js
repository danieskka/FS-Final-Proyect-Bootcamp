import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: 
      {"/api/favorites": "http://localhost:3000",
       "/login": "http://localhost:3000",
       "/signup": "http://localhost:3000",
       "/logout": "http://localhost:3000"}
    
  },
})