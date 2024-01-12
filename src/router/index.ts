import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import VueRouter from 'vue-router'
import Login from '@/views/LoginView.vue'
import Register from '@/views/RegisterView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
