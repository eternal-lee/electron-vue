import { createRouter, createWebHashHistory } from 'vue-router'
const Login = () => import('../views/login.vue')
const index = () => import('../views/index.vue')
const HomeView = () => import('../views/HomeView.vue')
const About = () => import('../views/AboutView.vue')
const Version = () => import('../views/version.vue')

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // 登录
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    // 主页
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: 'home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: HomeView
        },
        {
          path: '/about',
          name: 'about',
          component: About
        }
      ]
    },
    // 版本
    {
      path: '/version',
      name: 'version',
      component: Version
    }
  ]
})

export default router
