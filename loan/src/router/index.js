import Vue from 'vue'
import Router from 'vue-router'
import {getSyncRoute} from '@/meta/addRoute'
import { getSide } from '@/utils/token'

Vue.use(Router)
// const files = require.context('.', true, /\.js$/)
// files.keys().forEach(key => {
//   // if (key === './index.js') return
// })

const LayOut = import('@/views/layout/layout')
// export const constantRouter = [
//   {
//     path: '/loan',
//     component: () => LayOut,
//     redirect: '/loan/business',
//     meta: {title: '贷超管理'},
//     children: [
//       {
//         path: '/loan/business',
//         component: () => import('@/views/business'),
//         name: '',
//         meta: {title: '商户管理'}
//       },
//       {
//         path: '/loan/product',
//         component: () => import('@/views/product/layout'),
//         redirect: '/loan/product/channel',
//         meta: {title: '产品管理'},
//         children: [
//           {
//             path: '/loan/product/channel',
//             component: () => import('@/views/product/channel'),
//             name: '',
//             meta: {title: '频道管理'}
//           },
//           {
//             path: '/loan/product/tags',
//             component: () => import('@/views/product/tags'),
//             name: '',
//             meta: {title: '标签管理'}
//           },
//           {
//             path: '/loan/product/list',
//             component: () => import('@/views/product/list'),
//             name: '',
//             meta: {title: '产品列表'}
//           }
//         ]
//       },
//       {
//         path: '/loan/balance',
//         component: () => import('@/views/balance'),
//         name: '',
//         meta: {title: '结算管理'}
//       }
//     ]
//   }
// ]
// export const constantRouterActive = [

// ]
const baseBar = [
  {
    path: '/login',
    component: () => import('@/views/login/login')
  },
  {
    path: '/loginno',
    component: () => import('@/views/login/loginnocheck')
  },
  {
    path: '/',
    component: () => LayOut,
    redirect: '/home',
    meta: {title: '主页'},
    children: [
      {
        path: 'home',
        component: () => import('@/views/home'),
        name: 'home',
        meta: {title: '主要面板'}
      }
    ]
  },
  {
    path: '*',
    component: () => LayOut,
    redirect: '/404',
    children: [
      {
        path: '404',
        component: () => import('@/views/404'),
        name: '404',
        meta: {title: '404'}
      }
    ]
  }
]
export const constantRouterMap = [...baseBar]

const router = new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  base: __dirname,
  routes: constantRouterMap
})
// 防刷新失效 404
if (getSide()) {
  router.addRoutes(getSyncRoute(JSON.parse(getSide())))
}
export default router
