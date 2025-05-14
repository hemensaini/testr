import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['src/pages/DashboardPage.tsx'], // ✅ relative to project root
  },
});
