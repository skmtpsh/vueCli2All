import request from '@/utils/request'
import commonQuery from '@/utils/commonQuery'

const indexApi = {
  getIndex ({
    productCode = 'CP00001',
    marketAppVersion = '2.3.3',
    userName = '张三',
    userMobile = '13666668554',
    userImei = 'sadsad',
    userBrand = 'oppoR9'
  }) { // 认证列表
    return request({
      url: '/app/product/info',
      method: 'post',
      data: Object.assign({
        productCode,
        marketAppVersion,
        userName,
        userMobile,
        userImei,
        userBrand
      }, commonQuery())
    })
  },
  setRequest ({
    productCode = 'CP00001',
    marketAppVersion = '2.3.3',
    userName = '张三',
    userMobile = '13666668554',
    userImei = 'sadsad',
    userBrand = 'oppoR9',
    appId = 'bailian123456789'
  }) { // 认证列表
    return request({
      url: '/app/compute/save',
      method: 'post',
      data: Object.assign({
        productCode,
        marketAppVersion,
        userName,
        userMobile,
        userImei,
        userBrand,
        appId
      }, commonQuery())
    })
  }
}
export default indexApi
