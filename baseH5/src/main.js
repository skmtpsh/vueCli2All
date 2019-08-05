import Vue from 'vue'
import App from './App.vue'
// 菜单和路由设置
import router from './router/index'
import store from './store/index'

import FastClick from 'fastclick'
import 'amfe-flexible'
import '@/assets/style/index.scss'
// svg 图标
import '@/assets/svg-icons'
// import '@/components'

import filters from './filters'

import {
  Skeleton,
  Swipe, SwipeItem,
  Loading,
  Toast,
  Grid, GridItem,
  Row, Col,
  List,
  Lazyload,
  Image,
  Tag,
  Icon,
  Button,
  NavBar,
  Checkbox, CheckboxGroup,
  ActionSheet,
  RadioGroup, Radio,
  Cell, CellGroup, Field, Collapse, CollapseItem
} from 'vant'

Vue.use(Skeleton).use(Swipe).use(SwipeItem).use(Loading).use(Toast).use(Grid).use(Icon).use(RadioGroup).use(Radio)
  .use(GridItem).use(Row).use(Col).use(List).use(Checkbox).use(Cell).use(CellGroup).use(ActionSheet)
  .use(Lazyload).use(Image).use(Tag).use(Button).use(NavBar).use(Field).use(Collapse).use(CollapseItem)
  .use(CheckboxGroup)

FastClick.attach(document.body)
Vue.config.productionTip = false

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
