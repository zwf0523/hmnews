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
    component: () => import("@/views/Register")
  },
  //返回登录页
  {
    path: '/login',
    component: () => import("@/views/Login")
  },
  // 个人中心页
  {
    path: '/personal',
    component: () => import("@/views/Personal")
  },
  {
    // 编辑资料页
    path: '/edit-profile',
    component: () => import("@/views/EditProfile")
  },
  {
    // 我的关注页
    path: '/follow',
    component: () => import("@/views/Follow")
  },
  {
    // 我的跟帖页
    path: '/comment',
    component: () => import("@/views/Comment")
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
