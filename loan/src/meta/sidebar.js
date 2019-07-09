import { getSide } from '@/utils/token'
const async = true
const staticBar = [
  {
    key: 'loan',
    ico: 'home',
    value: '贷超管理',
    child: [
      {
        key: 'business',
        ico: 'user',
        value: '商户管理'
      },
      {
        key: 'product',
        ico: 'pro',
        value: '产品管理',
        child: [
          {
            key: 'channel',
            ico: 'cha',
            value: '频道管理'
          },
          {
            key: 'tags',
            ico: 'tag',
            value: '标签管理'
          },
          {
            key: 'list',
            ico: 'cate',
            value: '产品列表'
          }
        ]
      },
      {
        key: 'balance',
        ico: 'bal',
        value: '结算管理'
      }
    ]
  }
]

const formatSide = () => {
  // console.log(getSide())
  if (getSide() === 'null' || !getSide()) {
    return []
  }
  return JSON.parse(getSide())
}

// formatSide()
const sideBar = {
  mainbar () {
    return async ? formatSide() : staticBar
  }
}
console.log(formatSide())
export default sideBar
