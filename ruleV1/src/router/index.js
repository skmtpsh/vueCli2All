import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const LayOut = import('@/views/layout/layout')
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/login')
  },
  {
    path: '/loginno',
    component: () => import('@/views/login/loginnocheck')
  },
  {
    path: '/logs',
    component: () => LayOut,
    redirect: '/logs/list',
    meta: {title: '策略中心'},
    children: [
      {
        path: 'list',
        component: () => import('@/views/log/index'),
        name: '',
        meta: {title: '日志列表'}
      }
    ]
  },
  {
    path: '/',
    component: () => LayOut,
    redirect: 'rules'
  },
  // {
  //   path: '/',
  //   component: () => LayOut,
  //   redirect: 'home',
  //   meta: {title: '主页'},
  //   children: [
  //     {
  //       path: 'home',
  //       component: () => import('@/views/home'),
  //       name: 'home',
  //       meta: {title: '主页面板'}
  //     }
  //   ]
  // },
  {
    path: '/rules',
    component: () => LayOut,
    redirect: '/rules/list',
    meta: {title: '策略中心'},
    children: [
      {
        path: 'list',
        component: () => import('@/views/rule/index'),
        name: '',
        meta: {title: '策略集列表'}
      },
      {
        path: 'listlevel2',
        component: () => import('@/views/rule/indexLevel'),
        name: '',
        meta: {title: '策略列表'}
      },
      {
        path: 'rulechild',
        component: () => import('@/views/rule/rulechild'),
        name: '',
        meta: {title: '规则管理'}
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
