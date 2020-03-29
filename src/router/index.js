import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    // component: Login
    component: () => import("@/views/Login")
  },
  // 注册页
  {
    path: '/register',
    component: () => import("@/views/register")
  },
  //返回登录页
  {
    path: '/login',
    name: 'login',
    component: () => import("@/views/Login")
  },
  // 个人中心页
  {
    path: '/personal',
    component: () => import("@/views/Personal")
  },

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
