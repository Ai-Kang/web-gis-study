import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home/Home.vue'
import Home1View from '@/views/home/Home1.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/home1',
      name: 'home1',
      component: Home1View
    },
  ]
})

export default router
