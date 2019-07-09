import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import router from './router/index'
import './style/index.less'
import { Flexbox, FlexboxItem, ViewBox, XButton, LoadingPlugin, ToastPlugin, AlertPlugin, XHeader, ConfirmPlugin } from 'vux'
import './icons' // iconvu
// import './utils/vconsole' // vconsole

Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
Vue.component('view-box', ViewBox)
Vue.component('x-button', XButton)
Vue.component('x-header', XHeader)
Vue.use(ConfirmPlugin)

Vue.use(AlertPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)

Vue.use(VueRouter)

FastClick.attach(document.body)

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  // 路由发生变化修改页面title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
router.afterEach((to) => {
  if (to.path === '/down') {
    setTimeout(() => {
      window._hmt = window._hmt || []
      var hm = document.createElement('script')
      hm.src = 'https://hm.baidu.com/hm.js?ef30f4f208e2fa76ad7bc77e5bd8014b'
      var s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(hm, s)
    }, 0)
  }
  if (to.path === '/downgo') {
    setTimeout(() => {
      window._hmt = window._hmt || []
      var hm = document.createElement('script')
      console.log(process.env.ENV_CONFIG)
      if (process.env.ENV_CONFIG === 'prod') {
        hm.src = 'https://hm.baidu.com/hm.js?cc6bb4a12aecd9b61386a0b93597e75c'
      } else {
        hm.src = 'https://hm.baidu.com/hm.js?ccc94d11d28234001f1a650c7ed03c15'
      }
      var s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(hm, s)
    }, 0)
  }
})

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
