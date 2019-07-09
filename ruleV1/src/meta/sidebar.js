import { getSide } from '@/utils/token'
const staticBar = [
  // {
  //   key: 'home',
  //   ico: 'home',
  //   value: '主页',
  //   children: []
  // },
  {
    key: 'rules',
    ico: 'home',
    value: '策略中心',
    child: [
      {
        key: 'list',
        ico: 'log',
        value: '策略集列表'
      }
      // {
      //   key: 'list',
      //   ico: 'log',
      //   value: '规则匹配列表'
      // }
    ]
  },
  {
    key: 'logs',
    ico: 'log',
    value: '日志列表',
    children: []
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
