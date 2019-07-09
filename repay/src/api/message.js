import request from '@/utils/request'
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
const messageApi = {
  messageChannel ({
    category = getParam('category'),
    pageNo = getParam('pageNo'),
    size = '',
    token = getParam('token'),
    userId = '',
    appName = '佰联钱包'
  }) {
    return request({
      url: '/v3/message/list',
      method: 'post',
      params: Object.assign({
        category,
        pageNo,
        size,
        token,
        userId,
        appName
      })
    })
  }
}
export default messageApi
