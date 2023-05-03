import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/common/login/index.vue')
    },
    {
      path: '/',
      name: 'Blog',
      component: () => import('@/views/blog/index.vue'),
      children:[
        {
          path: '/',
          component: () => import('@/views/blog/blogs/index.vue')
        },
        {
          path: '/blogContent',
          component: () => import('@/views/blog/blogs/blogContent.vue')
        }
      ]
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
          name: "Tag",
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
