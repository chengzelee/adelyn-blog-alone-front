import { createRouter, createWebHashHistory } from 'vue-router'

// 使用 WebHashHistory ，避免刷新页面因url不正确而报错
// https://router.vuejs.org/zh/guide/essentials/history-mode.html
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Blog',
      component: () => import('@/views/blog/index.vue'),
      children:[
        {
          path: '/',
          component: () => import('@/views/blog/blogs/index.vue'),
        },
        {
          path: '/blogContent',
          component: () => import('@/views/blog/blogs/blogContent.vue')
        },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/common/login/index.vue')
    },
    {
      path: '/manage',
      name: 'Manager',
      component: () => import('@/views/blogmanage/index.vue'),
      children: [
        {
          path: '/manage',
          component: () => import('@/views/blogmanage/blogs/index.vue')
        },
        {
          path: '/manage/tag',
          component: () => import('@/views/blogmanage/tag/index.vue')
        },
        {
          path: '/manage/addblog',
          component: () => import('@/views/blogmanage/editblog/index.vue')
        }
      ]
    }
  ]
})

export default router
