import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import vueDevTools from 'vite-plugin-vue-devtools'
// import path from 'path'
import { fileURLToPath, URL } from 'url'

export default defineConfig({
  plugins: [
    tailwindcss(),
    vue(),
    vueDevTools(),
    createHtmlPlugin({})
    ],
    resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
