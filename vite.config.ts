import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'gsap-vendor': ['gsap', 'gsap/ScrollTrigger', '@gsap/react'],
          'lenis-vendor': ['lenis'],
          'framer-motion': ['framer-motion'],
        },
      },
    },
  },
})
