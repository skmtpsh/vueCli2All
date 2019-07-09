import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const LayOut = import('@/views/layout/layout')
export const constantRouterMap = [
  {
    path: '/',
    component: () => LayOut,
    redirect: '/finance/statistics'
  },
  {
    path: '/login',
    component: () => import('@/views/login/login')
  },
  {
    path: '/loginoncheck',
    component: () => import('@/views/login/loginoncheck')
  },
  {
    path: '/site',
    component: () => LayOut,
    redirect: '/site/nlist',
    meta: {title: '网站管理'},
    children: [
      {
        path: 'nlist',
        component: () => import('@/views/site/index'),
        name: '',
        meta: {title: '公告管理'}
      },
      {
        path: 'banner',
        component: () => import('@/views/site/banner'),
        name: '',
        meta: {title: 'Banner管理'}
      }
    ]
  },
  {
    path: '/company',
    component: () => LayOut,
    redirect: '/company/list',
    meta: {title: '企业中心'},
    children: [
      {
        path: 'list',
        component: () => import('@/views/company/index'),
        name: '',
        meta: {title: '企业管理'}
      },
      {
        path: 'apply',
        component: () => import('@/views/company/apply'),
        name: '',
        meta: {title: '申请管理'}
      }
    ]
  },
  {
    path: '/finance',
    component: () => LayOut,
    redirect: '/finance/statistics',
    meta: {title: '财务中心'},
    children: [
      {
        path: 'statistics',
        component: () => import('@/views/finance/statistics'),
        name: '',
        meta: {title: '统计记录'}
      },
      {
        path: 'charge',
        component: () => import('@/views/finance/charge'),
        name: '',
        meta: {title: '充值管理'}
      },
      {
        path: 'amount',
        component: () => import('@/views/finance/amount'),
        name: '',
        meta: {title: '余额管理'}
      },
      {
        path: 'consume',
        component: () => import('@/views/finance/consume'),
        name: '',
        meta: {title: '消费管理'}
      }
    ]
  },
  {
    path: '/mess',
    component: () => LayOut,
    redirect: '/mess/index',
    meta: {title: '信息管理'},
    children: [
      {
        path: 'index',
        component: () => import('@/views/mess'),
        name: '',
        meta: {title: '信息回调'}
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
export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  // base: '/fe-risk',
  base: __dirname,
  routes: constantRouterMap
})

// export const asyncRouterMap = []
