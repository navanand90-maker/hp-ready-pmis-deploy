import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: Change 'hp-ready-pmis' to your actual GitHub repo name
  base: '/hp-ready-pmis-deploy/',
})
