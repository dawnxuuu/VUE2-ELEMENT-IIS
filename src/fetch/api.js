import axios from 'axios'
import Vue from 'vue'
import qs from 'qs'
import { Loading, Message } from 'element-ui'
Vue.prototype.$http = axios

/* import * as _ from '../util/tool' */

// axios 配置
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.withCredentials = true

axios.defaults.baseURL = 'http://localhost/IIS/'          // 本地服务
// axios.defaults.baseURL = 'http://10.202.65.25/IIS/';       //测试环境
// axios.defaults.baseURL = 'http://172.17.96.205:8080/IIS/';    //线上环境

var loadinginstace

// POST传参序列化
axios.interceptors.request.use((config) => {
  loadinginstace = Loading.service({ fullscreen: true })
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
  loadinginstace.close()
     // _.toast("错误的传参", 'fail');
  return Promise.reject(error)
})

// 返回状态判断
axios.interceptors.response.use((res) => {
  loadinginstace.close()
  if (!res.data.Result) {
        // _.toast(res.data.msg);
    return Promise.reject(res)
  }
  return res
}, (error) => {
  loadinginstace.close()
    // _.toast("网络异常", 'fail');
  return Promise.reject(error)
})

export function fetch_get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, params)
            .then(response => {
              resolve(response.data)
            }, err => {
              reject(err)
            })
            .catch((error) => {
              reject(error)
            })
  })
}

export function fetch_post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
            .then(response => {
              resolve(response.data)
            }, err => {
              reject(err)
            })
            .catch((error) => {
              reject(error)
            })
  })
}

export default {

    // 用户登录
  Login (params) {
    return fetch_post('/userInfo/login', params)
  },

    // 教师查询
  getTeacherMsg (tname) {
    return fetch_post('/classInfo/getTeacherMsg', {'keyWord': tname})
  },

    // 班级查询
  getClassMsg (cname) {
    return fetch_post('/classInfo/getClassMsg', {'keyWord': cname})
  },

    // 通行证查询
  getuserInfo (params) {
    return fetch_post('/userInfo/getUserInfo', params)
  }

}
