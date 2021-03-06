import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_V2,
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
  // config.headers['X-Token'] = 'token'
  // }
  return config
}, error => {
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 1200) {
      try {
        var u = navigator.userAgent
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
        if (isIOS) { // 判断iPhone|iPad|iPod|iOS
          window.webkit.messageHandlers.reLogin.postMessage(res.message)
        } else {
          window.loanmarket.reLogin(res.message)
        }
      } catch (error) {
        return Promise.reject(new Error(error))
      }
    }
    return response
  }, error => {
    console.log(error)
    return Promise.reject(new Error(error))
  })

// const publicService = (ver = 'v2') => {
//   let baseUrl = {
//     sdk: process.env.VUE_APP_BASE_API_SDK,
//     v1: process.env.VUE_APP_BASE_API_V1,
//     v2: process.env.VUE_APP_BASE_API_V2
//   }
//   service.baseURL = baseUrl[ver]
//   return service
// }

export default service
