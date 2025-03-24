import {
  defineConfig,
} from 'vite'
// for react translation and optimisation
import react from '@vitejs/plugin-react'
// for mjs to import cjs as normal
import commonjs from 'vite-plugin-commonjs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    commonjs(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setupTests.js',
  },
  server: {
    // for the development server to forward restful requests to the backend
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
