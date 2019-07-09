import { getSide } from '@/utils/token'
const staticBar = [
  // {
  //   key: 'home',
  //   ico: 'home',
  //   value: '主页面板'
  // },
  {
    key: 'site',
    ico: 'web',
    value: '网站管理',
    child: [
      {
        key: 'nlist',
        ico: '',
        value: '公告管理'
      },
      {
        key: 'banner',
        ico: '',
        value: 'Banner管理'
      }
    ]
  },
  {
    key: 'company',
    ico: 'show',
    value: '企业中心',
    child: [
      {
        key: 'list',
        ico: '',
        value: '企业管理'
      },
      {
        key: 'apply',
        ico: '',
        value: '申请管理'
      }
    ]
  },
  {
    key: 'finance',
    ico: 'caiwu',
    value: '财务中心',
    child: [
      {
        key: 'statistics',
        ico: '',
        value: '统计记录'
      },
      {
        key: 'charge',
        ico: '',
        value: '充值管理'
      },
      {
        key: 'amount',
        ico: '',
        value: '余额管理'
      },
      {
        key: 'consume',
        ico: '',
        value: '消费管理'
      }
    ]
  }
  // {
  //   key: 'mess',
  //   ico: 'rizhi',
  //   value: '信息管理',
  //   children: []
  // }
]
const async = true
const formatSide = () => {
  if (!getSide()) {
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
