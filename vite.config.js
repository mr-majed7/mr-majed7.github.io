import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// User page (mr-majed7.github.io) → base is always '/'
export default defineConfig({
  plugins: [react()],
  base: '/',
})
