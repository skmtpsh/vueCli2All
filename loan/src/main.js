import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import '@/styles/index.scss' // global css
import './icons' // icon
import './permission' // permission control
import filters from './filters'
import Clipboard from 'clipboard'
import VueECharts from '@/components/charts/index'

Vue.component('chart', VueECharts)

// process.env.MOCK && require('./api/mock/mock_yd')
// 注册一个全局自定义指令 `v-focus`
Vue.directive('copy', {
  inserted: function (el) {
    // console.log(el)
    var clipboard = new Clipboard('.btn')
    clipboard.on('success', function (e) {
      // console.info('Action:', e.action)
      // console.info('Text:', e.text)
      // console.info('Trigger:', e.trigger)
      Vue.prototype.$message.warning({
        message: `复制成功!`
      })
      e.clearSelection()
    })

    clipboard.on('error', function (e) {
      Vue.prototype.$message.warning({
        message: `不支持此属性!`
      })
    })
  }
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
