import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import '@/styles/index.scss' // global css
import './icons' // icon
import './permission' // permission control
import filters from './filters'
// import VueECharts from '@/components/charts/index'

// Vue.component('chart', VueECharts)

// process.env.MOCK && require('./api/mock/mock_yd')

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
