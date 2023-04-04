import { createRouter, createWebHistory } from 'vue-router'
import Blog from '../views/blog/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/blogmanage/login/index.vue')
    },
    {
      path: '/',
      name: 'Blog',
      component: Blog
    },
    {
      path: '/manage',
      name: 'Manager',
      component: () => import('../views/blogmanage/index.vue')
    },
    {
      path: '/manage/tag',
      name: "Tag",
      component: () => import('../views/blogmanage/tag/index.vue')
    }
  ]
})

export default router
