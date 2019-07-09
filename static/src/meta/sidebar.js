import { getSide } from '@/utils/token'
const staticBar = [
  {
    key: 'auths',
    ico: 'home',
    value: '认证管理',
    child: [
      {
        key: 'list',
        ico: 'log',
        value: '认证列表'
      },
      {
        key: 'manage',
        ico: 'log',
        value: '产品配置'
      }
    ]
  }
]
const async = true
const formatSide = () => {
  // console.log(getSide())
  if (getSide() === 'null' || !getSide()) {
    return []
  }
  let sideList = JSON.parse(getSide())
  let sideArr = []
  sideList.forEach(item => {
    let temp = {
      key: item.href,
      ico: item.icon,
      value: item.name,
      child: []
    }
    if (item.children && item.children.length > 0) {
      item.children.forEach(chil => {
        temp.child.push({
          key: chil.href,
          ico: chil.icon,
          value: chil.name,
          child: []
        })
      })
    }
    sideArr.push(temp)
  })
  // console.log(sideArr)
  return sideArr
}
// formatSide()
const sideBar = {
  mainbar () {
    return async ? formatSide() : staticBar
  }
}
// console.log(sideBar)
export default sideBar
