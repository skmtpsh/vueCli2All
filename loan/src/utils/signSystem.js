import moment from 'moment'
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
      id: 'qiandada12345678',
      key: '888qiandada888'
    },
    {
      id: 'yipurse123456789',
      key: '123yipurse123'
    },
    {
      id: 'bailian123456789',
      key: 'QsQ43C3HHW2JO4w5'
    }
  ]
  return AppSet.filter(item => {
    if (item.id === appId) {
      return item
    }
  })
}

// 公用CommonQuery
export const commonQuery = (AppID = getParam('appId')) => {
  let AppKey = ''
  // 根据传参获取appId
  // let AppID = getParam('appId')
  // 临时用固定appId
  // let AppID = 'qiandada12345678'
  if (getAppKey(AppID).length === 0) {
    console.log('not find key')
    return false
  }
  AppKey = getAppKey(AppID)[0].key

  let TimeStamp = moment(Date.now()).format('YYYYMMDDHHmmss')
  let SignSystem = md5(AppKey + AppID + TimeStamp)
  // let SignSystem = md5(AppKey + TimeStamp)

  return {
    timestamp: TimeStamp,
    signSystem: SignSystem
    // appId: AppID
  }
}
/**
 * 公用UrlQuery
*/
// let URL = location.search
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

const requestQuery = (appId) => {
  // return Object.assign(urlQuery(), commonQuery())
  return Object.assign({}, commonQuery(appId))
}

export default requestQuery
