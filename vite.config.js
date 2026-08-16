import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES ? '/GeminiImpressionOfVincentZyu/' : '/',
  server: {
    port: 40805,
    host: true,
    open: false,
    watch: {
      ignored: ['**/temp/**', '**/.git/**']
    }
  }
});
