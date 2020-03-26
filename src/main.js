// vue构造函数
import Vue from 'vue'
// App组件（以.vue结尾的文件都是组件）
import App from './App.vue'
// 路由对象
import router from './router'
//引入vant-UI组件库
import Vant from 'vant';
import axios from "axios";

// 绑定到原型
Vue.prototype.$axios = axios;

axios.defaults.baseURL = "http://localhost:3000"
// 注册vant插件 (vue.use都是用来注册插件的)
Vue.use(Vant)
// 上线环境是否提示信息(忽略)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
