// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import './style/index.less'
import router from './router/index'
// import Vconsole from 'vconsole'
// import './utils/vconsole' // vconsole
import './icons' // icon
import Vuelazyload from 'vue-lazyload'
import { LoadingPlugin, ToastPlugin, ConfirmPlugin, ViewBox, Countup, XInput, XHeader } from 'vux'
// let vConsole = new Vconsole()
// Vue.use(vConsole)
Vue.use(Vuelazyload)
Vue.component('view-box', ViewBox)
Vue.component('countup', Countup)
Vue.component('x-input', XInput)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin, {position: 'bottom'})
Vue.use(ConfirmPlugin)
Vue.component('x-header', XHeader)

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
