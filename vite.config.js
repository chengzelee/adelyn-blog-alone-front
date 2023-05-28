import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 配置前端服务地址和端口
  server: {
    host: '127.0.0.1',
    port: 8888,
    // 是否开启 https
    https: false,
    // 设置反向代理，解决跨域问题
    proxy: {
      '/blog/auth': {
        // 后台地址
        target: 'http://192.168.23.130:8002',
        // 是否跨域
        changeOrigin: true,
        // 是否https接口
        secure: false,
        // 是否代理 websocket
        //ws: true,
      },
      '/blog/blogmanager': {
        target: 'http://127.0.0.1:8041',
        changeOrigin: true,
        secure: false,
      },
      '/blog/search': {
        target: 'http://127.0.0.1:8004',
        changeOrigin: true,
        secure: false,
      },
      '/blog/oss': {
        target: 'http://127.0.0.1:8005',
        changeOrigin: true,
        secure: false,
      },
      // '/api2': {
      //   // 后台地址
      //   target: 'http://127.0.0.1:8956/',
      //   changeOrigin: true,
      //   rewrite: path => path.replace(/^\/api2/, '')
      // }
    }
  }
})
