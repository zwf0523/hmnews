// vue构造函数
import Vue from 'vue'
// App组件（以.vue结尾的文件都是组件）
import App from './App.vue'
// 路由对象
import router from './router'
//引入vant-UI组件库
import Vant, { Toast } from 'vant';
import axios from "axios";

// 绑定到原型
Vue.prototype.$axios = axios;

axios.defaults.baseURL = "http://192.168.31.218:3000"
// 注册vant插件 (vue.use都是用来注册插件的)
Vue.use(Vant)
// 上线环境是否提示信息(忽略)
Vue.config.productionTip = false

// 添加路由的守卫
// to: 代表你即将要访问的页面
// from：代表你即将要离开的页面
// next：必须要调用，next就类似于你nodejs的中间件，调用才会加载后面的内容
router.beforeEach((to, from, next) => {
  // 判断是否去的个人中心页
  if (to.meta.authorization) {
    // 判断是否是登录状态，时候有token
    // 如果本地的数据是空会返回null，null是没有token属性，会导致js报错，
    // 所以可以加个判断，如果本地的数据空的，等于空的对象
    const userJson = JSON.parse(localStorage.getItem('userInfo')) || {};

    // 有token可以正常访问
    if (userJson.token) {
      next();
    } else {
      // 跳转到登录页,next这个函数可以传递路径，并且会跳转该路径
      next("/login");
      Toast.fail('验证失败，请重新登录')
    }
  } else {
    // 非个人中心页
    next();
  }
})

// axios的响应拦截器
axios.interceptors.response.use(res => {
  return res;
}, error => {
  // 如果请求返回的数据是错误的，就会进入error的处理函数中
  // error是js原生的错误对象，我们可以通过error.response来获取到详细的信息
  // statusCode,message，获取到这两个错误的返回值信息
  const { statusCode, message } = error.response.data;
  if (statusCode === 400) {
    Toast.fail(message)
  }
  return Promise.reject(error)
}

)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
