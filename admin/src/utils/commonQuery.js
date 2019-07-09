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
      id: 'PROCESS_SYSTEM',
      key: '2d817b039b891596'
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
  let AppID = 'PROCESS_SYSTEM'
  if (getAppKey(AppID).length === 0) {
    console.log('not find key')
    return false
  }
  AppKey = getAppKey(AppID)[0].key

  let TimeStamp = moment(Date.now()).format('YYYYMMDDHHmmss')
  let SystemKey = md5(AppID + TimeStamp)
  let SignSystem = md5(AppKey + TimeStamp)

  return {
    timestamp: TimeStamp,
    systemKey: SystemKey,
    signSystem: SignSystem,
    snKey: AppKey
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

const requestQuery = () => {
  // return Object.assign(urlQuery(), commonQuery())
  return Object.assign({}, commonQuery())
}

export default requestQuery
