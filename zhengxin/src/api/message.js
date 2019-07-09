import request from '@/utils/request'
// import { dateFormat } from 'vux'
// import md5 from 'js-md5'
// const AppKey = 'c808f285fb68b7e33e997d089da2885d'
import commonQuery from '@/utils/commonQueryAll'
const getParam = (name) => {
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
async function requestApi (apiUrl, data = {}, noComm = 1) {
  return request({
    baseURL: process.env.BASE_API_MARKET, // api的base_url
    url: apiUrl,
    method: 'post',
    data: Object.assign(
      {},
      data,
      noComm ? commonQuery().marketOrderQuery : {}
    )
  })
}
const messageApi = {
  async messageChannel ({
    category = getParam('category'),
    pageNo = getParam('pageNo'),
    size = '',
    userId = ''
  }) {
    return requestApi('loan/other/news', {
      category,
      pageNo,
      size,
      userId
    })
  }
  // messageChannel ({
  //   timestamp = dateFormat(new Date(), 'YYYYMMDDHHmmss'),
  //   signSystem = md5(AppKey + timestamp),
  //   token = getParam('token'),
  //   category = getParam('category'),
  //   pageNo = getParam('pageNo'),
  //   size = '',
  //   userId = ''
  // }) {
  //   return request({
  //     url: 'http://api.market.yipurse.cn/api/market/loan/other/news',
  //     method: 'post',
  //     params: Object.assign({
  //       timestamp,
  //       signSystem,
  //       category,
  //       pageNo,
  //       size,
  //       token,
  //       userId
  //     })
  //   })
  // }
}
export default messageApi
