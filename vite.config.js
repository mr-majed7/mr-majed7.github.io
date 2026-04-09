import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base must match the GitHub repository name for project pages
// e.g. https://mr-majed7.github.io/portfolio-site/ → base: '/portfolio-site/'
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_URL || '/portfolio-site/',
})
