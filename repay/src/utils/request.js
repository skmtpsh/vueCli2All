import axios from 'axios'
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 30000, // request timeout,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
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
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  // response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    const res = response.data
    if (res.code !== '0') {
      if (res.code === '9') {
        var u = navigator.userAgent
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)  // ios终端
        if (isIOS) {  // 判断iPhone|iPad|iPod|iOS
          window.webkit.messageHandlers.relogin.postMessage(res.msg)
        } else {
          window.bailianqianbao.relogin(res.msg)
        }
      }
      // return Promise.reject(new Error('1'))
    }
    return response
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(new Error(error))
  })

export default service
