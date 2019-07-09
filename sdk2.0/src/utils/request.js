import axios from 'axios'
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 30000, // request timeout,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    // 'Content-Type': 'multipart/form-data'
    // 'X-Requested-With': 'psh'
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
  response => response,
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(new Error(error))
  })

export default service
