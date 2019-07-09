import axios from 'axios'
import { removeToken } from '@/utils/token'
import { Message } from 'element-ui'
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 30000, // request timeout,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [function (data) {
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  }]
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  // if () {
  // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  // config.headers['X-Token'] = getToken()
  // }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  // response => response,
  response => {
    const res = response.data
    if (res.code !== '0') {
      if (res.code === 1200) {
        // token 失效处理
        Message.warning({
          message: res.message
        })
        removeToken()
        if (sessionStorage.getItem('type') === 'sso') {
          window.location.href = 'http://sso.dun.yipurse.com/start/index.html#/user/login'
        } else {
          window.location.reload()
        }
        // this.$router.push({ path: '/login' })
      }
    }
    return response
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  })

export default service
