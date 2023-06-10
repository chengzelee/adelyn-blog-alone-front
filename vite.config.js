import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://cn.vitejs.dev/config/server-options.html
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 配置前端服务地址和端口 只有本地运行的时候才需要
  server: {
    host: '127.0.0.1',
    port: 8888,
    // 是否开启 https
    https: false,
    // 设置反向代理，解决跨域问题
    proxy: {
      '/blog': {
        target: 'https://192.168.23.130:1919',
        changeOrigin: true,
        secure: false,
      },
    }
  },
  build: {
    outDir: "./docker/dist",
  }
})
