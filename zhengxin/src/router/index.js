import Vue from 'vue'
import Router from 'vue-router'
import RouteConfig from './config'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import {getParam} from '@/utils/commonQuery'

Vue.use(Router)

const commonPath = 'authentication'
const componentPath = 'views/'
const routes = []
RouteConfig.routesList.forEach((item) => {
  const { path, title, compath } = item
  let oRouter = {
    name: item.name,
    path: `/${commonPath}/${path}`,
    // component: (resolve) => {
    //   require([`@/${componentPath}${compath}.vue`], resolve)
    // },
    component: () => import(`@/${componentPath}${compath}.vue`),
    meta: {
      title: title
    },
    url: `@/${componentPath}${compath}.vue`
  }
  routes.push(oRouter)
})

const router = new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
    // console.log(savedPosition)
    // if (savedPosition) {
    //   return savedPosition
    // } else {
    //   return { x: 0, y: 0 }
    // }
  },
  base: __dirname,
  routes
})

router.beforeEach((to, from, next) => {
  // 进度条
  NProgress.start()

  if (to.meta.title) {
    document.title = to.meta.title // 设置wap网页title
    // console.log(navigator.userAgent)
    // 设置app原生title
    try {
      if (getParam('platform') === 'ios') {
        window.webkit.messageHandlers.setTitle.postMessage(to.meta.title)
      } else {
        window.javaObj.setTitle(to.meta.title)
      }
    } catch (error) {
      console.log(error)
    }
  }
  next()
})
router.afterEach(route => {
  // 进度条
  NProgress.done()
  window.scrollTo(0, 0)
})

export default router
