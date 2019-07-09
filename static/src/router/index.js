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
    path: '/',
    component: () => LayOut,
    redirect: '/auths/list'
  },
  {
    path: '/home',
    component: () => LayOut,
    redirect: '/auths/list'
  },
  {
    path: '/auths',
    component: () => LayOut,
    redirect: '/auths/list',
    meta: {title: '认证管理'},
    children: [
      {
        path: 'list',
        component: () => import('@/views/auths/index'),
        name: 'list',
        meta: {title: '认证列表'}
      },
      {
        path: 'manage',
        component: () => import('@/views/auths/manage'),
        redirect: 'manage',
        meta: {title: '产品配置'},
        children: [
          {
            path: '',
            component: () => import('@/views/auths/list'),
            name: 'manage',
            meta: {title: '产品列表'}
          },
          {
            path: 'add',
            component: () => import('@/views/auths/add'),
            name: 'add',
            meta: {title: ''}
          }
        ]
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
// // 获取父目录Path
// const getParentPath = (data, key, indexArray) => {
//   let arr = Array.from(indexArray)
//   for (let i = 0, len = data.length; i < len; i++) {
//     arr.push(data[i].key)
//     if (data[i].key === key) {
//       return arr
//     }
//     let children = data[i].child
//     if (children && children.length) {
//       let result = getParentPath(children, key, arr)
//       if (result) return result
//     }
//     arr.pop()
//   }
//   return false
// }
// // console.log(getNode(RouterConfig.mainbar()))
// // 设置Route
// const getConfigRoute = (json) => {
//   let routes = []
//   for (let item of json) {
//     let keyPath = getParentPath(mainBar, item.key, [])
//     let sitePath = path.resolve(process.cwd(), ...keyPath)
//     let siteRoute = path.resolve(...keyPath.slice(1))
//     console.log(keyPath, sitePath, siteRoute, keyPath.length, item.child)
//     if (item.child && item.child.length > 0) {
//       routes.push({
//         path: `${sitePath}`,
//         component: () => {
//           if (keyPath.length === 1) {
//             return LayOut
//           } else {
//             return import(`@/views${siteRoute}/layout`)
//           }
//         },
//         redirect: `${sitePath}/${item.child[0].key}`,
//         meta: {title: `${item.value}`},
//         children: getConfigRoute(item.child)
//       })
//     } else {
//       routes.push({
//         path: `${sitePath}`,
//         component: () => import(`@/views${siteRoute}`),
//         name: '',
//         meta: {title: `${item.value}`}
//       })
//     }
//   }
//   return routes
// }

// const getSyncConfigRoute = getConfigRoute(mainBar)
// // console.log(selfRoute)
// // export const constantRouterMap = [...RouterConfig.baseBar, ...constantRouter]
// export const constantRouterMap = [...RouterConfig.baseBar, ...getSyncConfigRoute, ...selfConfigRouter]
export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  // base: '/fe-risk',
  base: __dirname,
  routes: constantRouterMap
})

// export const asyncRouterMap = []
