// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import './style/index.less'
import router from './router/index'
// import './utils/vconsole' // vconsole

import './icons' // icon
import { LoadingPlugin, ToastPlugin, ConfirmPlugin, ViewBox, XInput, XButton } from 'vux'
Vue.component('view-box', ViewBox)
Vue.component('x-input', XInput)
Vue.component('x-button', XButton)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin, {position: 'bottom'})
Vue.use(ConfirmPlugin)

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  /* 这句非常重要，否则预渲染将不会启动 */
  mounted () {
    document.dispatchEvent(new Event('render-event'))
  }
})
