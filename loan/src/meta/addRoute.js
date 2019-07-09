import path from 'path'
import { setToken, setSide, clearAll } from '@/utils/token'
const LayOut = import('@/views/layout/layout')

// 无限获取目录树
export const getAllJson = (json) => {
  let arrs = []
  if (!Array.isArray(json)) {
    clearAll()
    return []
  }
  for (let item of json) {
    if (item.href === '') {
      continue
    }
    if (item.children && item.children.length > 0) {
      arrs.push({
        path: item.href,
        key: item.href,
        ico: item.icon,
        value: item.name,
        child: getAllJson(item.children)
      })
    } else {
      arrs.push({
        path: item.href,
        key: item.href,
        ico: item.icon,
        value: item.name,
        child: []
      })
    }
  }
  return arrs
}
// 获取父目录Path
export const getParentPath = (data, key, indexArray) => {
  let arr = Array.from(indexArray)
  for (let i = 0, len = data.length; i < len; i++) {
    arr.push(data[i].key)
    if (data[i].key === key) {
      return arr
    }
    let children = data[i].child
    if (children && children.length) {
      let result = getParentPath(children, key, arr)
      if (result) return result
    }
    arr.pop()
  }
  return false
}
// console.log(getNode(RouterConfig.mainbar()))
// 设置Route
export const getConfigRoute = (json, mainBar) => {
  let routes = []
  for (let item of json) {
    if (!item.key) {
      clearAll()
      return []
    }
    let keyPath = getParentPath(mainBar, item.key, [])
    let sitePath = path.resolve(process.cwd(), ...keyPath)
    let siteRoute = path.resolve(...keyPath.slice(1))
    // console.log(siteRoute)
    // console.log(keyPath, sitePath, siteRoute, keyPath.length, item.child)
    if (item.child && item.child.length > 0) {
      routes.push({
        path: `${sitePath}`,
        component: () => {
          if (keyPath.length === 1) {
            return LayOut
          } else {
            return import(`@/views${siteRoute}/layout`)
          }
        },
        redirect: `${sitePath}/${item.child[0].key}`,
        meta: {title: `${item.value}`},
        children: getConfigRoute(item.child, mainBar)
      })
    } else {
      routes.push({
        path: `${sitePath}`,
        component: () => import(`@/views${sitePath}`),
        name: '',
        meta: {title: `${item.value}`}
      })
    }
  }
  return routes
}
// 自定义路路由
export const setSelfRoute = (mainBar) => {
  let iRoute = getConfigRoute(mainBar, mainBar)
  iRoute.forEach(ele => {
    if (ele.path === '/mobile') {
      ele.children.push({
        path: '/mobile/url',
        component: () => import('@/views/mobile/url'),
        name: '',
        meta: {title: 'URL管理'}
      }, {
        path: '/mobile/link',
        component: () => import('@/views/mobile/link'),
        name: '',
        meta: {title: '分发管理'}
      }, {
        path: '/loanshop/canalurl',
        component: () => import('@/views/loanshop/canalurl'),
        name: '',
        meta: {title: '业务管理'}
      })
    }
  })
  return iRoute
}
// 返回路由配置
export const getSyncConfigRoute = (source, token = '') => {
  var mainBar = getAllJson(source)
  console.log(mainBar)
  // let iRoute = getConfigRoute(mainBar, mainBar)
  // console.log(iRoute)
  let iRoute = setSelfRoute(mainBar)
  console.log(iRoute)
  if (token !== '') {
    setToken(token)
  }
  setSide(mainBar)
  // setRoute(iRoute)
  // console.log(1, iRoute)
  console.log(iRoute)
  return iRoute
}
// 防刷新404失效
export const getSyncRoute = (mainBar) => {
  // return getConfigRoute(mainBar, mainBar)
  return setSelfRoute(mainBar)
}
// const getSyncConfigRoute = getConfigRoute
export default getSyncConfigRoute
