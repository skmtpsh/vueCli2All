// import { dateFormat, querystring } from 'vux'
import { dateFormat } from 'vux'
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
      id: 'ydstatic',
      key: 'dc090a977fa8a94dd2b65453abcbwevc'
    },
    {
      id: 'ydloan',
      key: 'c808f285fb68b7e33e997d089da2885d'
    },
    {
      id: 'qiandada87654321',
      // key: '12d3f103ba163557f49174c367c0fa20'
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
  // 根据传参获取appId
  // let AppID = getParam('appId')
  // 临时用固定appId
  let AppID = 'qiandada87654321'
  if (getAppKey(AppID).length === 0) {
    console.log('not find key')
    return false
  }
  AppKey = getAppKey(AppID)[0].key

  let TimeStamp = dateFormat(new Date(), 'YYYYMMDDHHmmss')
  // let SignSystem = md5(AppKey + AppID + TimeStamp)
  let SignSystem = md5(AppKey + TimeStamp)

  return {
    // appKey: AppKey,
    timestamp: TimeStamp,
    signSystem: SignSystem
    // appId: AppID
  }
}
// let URL = location.search
// 公用UrlQuery
// const urlQuery = ({
//   token = '',
//   type = '',
//   platform = '',
//   mobile = ''
// } = querystring.parse(URL.indexOf('?') !== -1 ? URL.substr(1) : '')) => {
//   return {
//     token,
//     type,
//     platform,
//     mobile
//   }
// }

const requestQuery = () => {
  // return Object.assign(urlQuery(), commonQuery())
  // return Object.assign({tokenKey: getParam('token')}, commonQuery())
  return Object.assign({}, commonQuery())
}

export default requestQuery
