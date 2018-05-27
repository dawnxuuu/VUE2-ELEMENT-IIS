import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import Cookies from 'js-cookie'
import 'element-ui/lib/theme-default/index.css'    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import 'babel-polyfill'
import './mock/index.js'

Vue.use(ElementUI)
Vue.prototype.$axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#Root')

const whiteList = ['/login']// 不重定向白名单
router.beforeEach((to, from, next) => {
  if (Cookies.get('webToken')) { // 判断是否有token
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
    }
  }
})
