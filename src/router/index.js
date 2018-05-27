import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/index',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children: [
        {
          path: '/',
          component: resolve => require(['../components/page/Index.vue'], resolve)
        },
        {
          path: '/tongxingzheng',
          component: resolve => require(['../components/page/Tongxingzheng.vue'], resolve)
        },
        {
          path: '/bangding',
          component: resolve => require(['../components/page/Bangding.vue'], resolve)
        },
        {
          path: '/banji',
          component: resolve => require(['../components/page/Banji.vue'], resolve)
        },
        {

          path: '/xueyuan',
          component: resolve => require(['../components/page/Xueyuan.vue'], resolve)
        },
        {
          path: '/jiaoshi',
          component: resolve => require(['../components/page/Jiaoshi.vue'], resolve)
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    }
  ]
})
