import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// VITE_BASE_URL is set as a GitHub repository variable.
// • User page  (username.github.io)          → leave it unset (defaults to '/')
// • Project page (username.github.io/repo)   → set it to '/your-repo-name/'
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_URL || '/',
})
