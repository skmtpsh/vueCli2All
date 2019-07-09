import { dateFormat, querystring } from 'vux'
import md5 from 'js-md5'
export const getParam = (name) => {
  var search = document.location.search
  var pattern = new RegExp('[?&]' + name + '\\=([^&]+)', 'g')
  var matcher = pattern.exec(search)
  var items = null
  if (matcher !== null) {
    try {
      items = decodeURIComponent(decodeURIComponent(matcher[1]))
    } catch (e) {
      try {
        items = decodeURIComponent(matcher[1])
      } catch (e) {
        items = matcher[1]
      }
    }
  }
  return items
}

export const getAppKey = (appId) => {
  const AppSet = [
    {
      id: 'dunapiinto123456',
      key: 'QaFR3CRTISJKFDS34'
    },
    {
      id: 'diandianhua12345',
      key: 'ba090a977fa8a94dd2b6545'
    },
    {
      id: 'yipurse123456789',
      key: '123yipurse123'
    },
    {
      id: 'bailian123456789',
      key: 'QsQ43C3HHW2JO4w5'
    },
    {
      id: 'huirongdai123456',
      key: 'fjsiqoe89sjvnoashafjh9sdlqpc'
    },
    {
      id: 'market123456',
      key: 'c808f285fb68b7e33e997d089da2885d'
    }
  ]
  return AppSet.filter(item => {
    if (item.id === appId) {
      return item
    }
  })
}

// 公用CommonQuery
export const commonQuery = () => {
  let AppKey = ''
  // let AppID = getParam('appId')
  let AppID = 'market123456'
  if (getAppKey(AppID).length === 0) {
    console.log('not find key')
    return false
  }
  AppKey = getAppKey(AppID)[0].key
  // if (AppID === 'dunapiinto123456') { // sdk2.0
  //   AppKey = 'QaFR3CRTISJKFDS34'
  // } else if (AppID === 'diandianhua12345') { // 点点花
  //   AppKey = 'ba090a977fa8a94dd2b6545'
  // } else if (AppID === 'yipurse123456789') { // 翼钱包
  //   AppKey = '123yipurse123'
  // } else if (AppID === 'bailian123456789') { // 翼钱包
  //   AppKey = 'QsQ43C3HHW2JO4w5'
  // }
  let TimeStamp = dateFormat(new Date(), 'YYYYMMDDHHmmss')
  let SignSystem = md5(AppKey + AppID + TimeStamp)

  return {
    appId: AppID,
    timestamp: TimeStamp,
    signSystem: SignSystem
  }
}
let URL = location.search
// 公用UrlQuery
const urlQuery = ({
  token = '',
  type = '',
  platform = '',
  mobile = ''
} = querystring.parse(URL.indexOf('?') !== -1 ? URL.substr(1) : '')) => {
  return {
    token,
    type,
    platform,
    mobile
  }
}
// 公用CommonQuery
export const commonQueryMarket = () => {
  let AppKey = ''
  let AppID = 'market123456'
  if (getAppKey(AppID).length === 0) {
    console.log('not find key')
    return false
  }
  AppKey = getAppKey(AppID)[0].key
  let TimeStamp = dateFormat(new Date(), 'YYYYMMDDHHmmss')
  let SignSystem = md5(AppKey + TimeStamp)

  return {
    timestamp: TimeStamp,
    signSystem: SignSystem
  }
}
const urlQueryMarket = ({
  token = '',
  userId = '',
  loginPhone = ''
} = querystring.parse(URL.indexOf('?') !== -1 ? URL.substr(1) : '')) => {
  return {
    token,
    userId,
    loginPhone
  }
}
const urlOrderMarket = ({
  token = ''
} = querystring.parse(URL.indexOf('?') !== -1 ? URL.substr(1) : '')) => {
  return {
    token
  }
}
const requestQuery = () => {
  return {
    sdkQuery: Object.assign(urlQuery(), commonQuery()),
    marketQuery: Object.assign(urlQueryMarket(), commonQueryMarket()),
    marketCreditQuery: Object.assign(urlQueryMarket(), commonQueryMarket()),
    marketOrderQuery: Object.assign(urlOrderMarket(), commonQueryMarket())
  }
}

export default requestQuery
