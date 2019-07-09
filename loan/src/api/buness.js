import request from '@/utils/request'
import commonQuery from '@/utils/commonQuery'
import { getToken } from '@/utils/token'
const TOKEN = getToken()
const pageQuery = () => {
  return Object.assign({}, {tokenKey: TOKEN}, commonQuery())
}
const businessApi = {
  /**
   * 商户管理(查询)
   * @param {} param0
   */
  BUSINESS_LSITS ({
    pageNum = '',
    pageSize = '',
    startDate = '',
    endDate = '',
    saleName = '',
    keyWord = ''
  }) {
    return request({
      url: 'merchant/list',
      method: 'post',
      data: Object.assign({
        pageNum,
        pageSize,
        startDate,
        endDate,
        saleName,
        keyWord
      }, pageQuery())
    })
  },
  /**
   * 商户管理-销售(查询)
   * @param {} param0
   */
  BUSINESS_SALES () {
    return request({
      url: 'merchant/sales',
      method: 'post',
      data: Object.assign({
      }, pageQuery())
    })
  },
  /**
   * 商户管理-更改启用状态(更新)
   * @param {} param0
   */
  BUSINESS_STATUS ({
    merchantId = '',
    isEnable = ''
  }) {
    return request({
      url: 'merchant/handle',
      method: 'post',
      data: Object.assign({
        merchantId,
        isEnable
      }, pageQuery())
    })
  },
  /**
   * 商户管理-添加商户(增)
   * @param {} param0
   */
  BUSINESS_ADD ({
    merchantName = '',
    merchantAccount = '',
    contactMan = '',
    mobile = '',
    saleName = '',
    bankAccount = ''
  }) {
    return request({
      url: 'merchant/save',
      method: 'post',
      data: Object.assign({
        merchantName,
        merchantAccount,
        contactMan,
        mobile,
        saleName,
        bankAccount
      }, pageQuery())
    })
  },
  /**
   * 商户管理-修改商户(改)
   * @param {} param0
   */
  BUSINESS_MOD ({
    merchantId = '',
    merchantName = '',
    // merchantAccount = '',
    contactMan = '',
    mobile = '',
    // saleName = '',
    bankAccount = ''
  }) {
    return request({
      url: 'merchant/update',
      method: 'post',
      data: Object.assign({
        merchantId,
        merchantName,
        // merchantAccount,
        contactMan,
        mobile,
        // saleName,
        bankAccount
      }, pageQuery())
    })
  }
}
export default businessApi
