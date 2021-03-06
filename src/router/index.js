import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    // component: Login
    component: () => import("@/views/Index")
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
  // 首页
  {
    path: '/index',
    component: () => import("@/views/Index"),
  },
  // 个人中心页
  {
    path: '/personal',
    component: () => import("@/views/Personal"),
    meta: {
      authorization: true
    }
  },
  {
    // 编辑资料页
    path: '/edit-profile',
    component: () => import("@/views/EditProfile"),
    meta: {
      authorization: true
    }
  },
  {
    // 我的关注页
    path: '/follow',
    component: () => import("@/views/Follow"),
    meta: {
      authorization: true
    }
  },
  {
    // 我的跟帖页
    path: '/comment',
    component: () => import("@/views/Comment"),
    meta: {
      authorization: true
    }
  },
  {
    // 我的收藏页
    path: '/star',
    component: () => import("@/views/Star"),
    meta: {
      authorization: true
    }
  },
  {
    // 栏目管理页
    path: '/category',
    component: () => import("@/views/Category"),
  },
  {
    // 搜索页
    path: '/search',
    component: () => import("@/views/Search"),
  },
  {
    // 文章详情页
    path: '/post/:id',
    component: () => import("@/views/Post"),
  },
  {
    // 视频文章详情页
    path: '/video/:id',
    component: () => import("@/views/Video")
  },
  {
    // 文章的跟帖列表页面
    path: '/post-comment/:id',
    component: () => import("@/views/PostComment")
  }
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
