import { defineConfig } from 'vite';

export default defineConfig({
  root: './site',
  base: '/arduinohatesme/',
  build: {
    outDir: '../site-dist',
    emptyOutDir: true,
  }
})
