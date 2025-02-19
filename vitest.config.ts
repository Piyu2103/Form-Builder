import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // For React component testing
    setupFiles: ['./src/setupTests.ts'], // Load jest-dom matchers
    globals: true, // Allow using 'describe', 'it', etc. without importing them
    css: true, // Ensure CSS classes (e.g., Tailwind) are processed
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
