import request from '@/utils/request'
import commonQuery from '@/utils/commonQuery'

async function ajx (apiUrl, data = {}) {
  return request({
    baseURL: process.env.VUE_APP_BASE_API_V1,
    url: apiUrl,
    method: 'post',
    data: Object.assign(
      {},
      data,
      commonQuery('v1')
    )
  })
}

const indexApi = {
  async productIndex ({
    appName = '',
    productCode = '',
    version = '3',
    userId = '',
    appOs = '',
    loanType = '1'
  }) {
    return ajx('loan/product/detail', {
      appName,
      productCode,
      version,
      userId,
      appOs,
      loanType
    })
  },
  /**
   * 最火口子(H5端)
   */
  async mostPopular () {
    return ajx('app/most/popular')
  },
  /**
   * 请求产品详情数据(H5端)
   */
  async productInfo ({
    productCode = '',
    marketAppVersion = '',
    userName = '',
    userMobile = '',
    userImei = '',
    userBrand = ''
  }) {
    return ajx('app/product/info', {
      productCode,
      marketAppVersion,
      userName,
      userMobile,
      userImei,
      userBrand
    })
  },
  /**
   * 请求产品详情数据(H5端)
   */
  async computeSave ({
    productCode = '',
    marketAppVersion = '',
    appId = '',
    userName = '',
    userMobile = '',
    userImei = '',
    userBrand = '',
    interCode = ''
  }) {
    return ajx('app/compute/save', {
      appId,
      productCode,
      marketAppVersion,
      userName,
      userMobile,
      userImei,
      userBrand,
      interCode
    })
  },
  /**
   * 下单详情页的趋势图(H5端)
   */
  async productTrend ({
    productCode = '',
    userMobile = ''
  }) {
    return ajx('app/product/trend', {
      productCode,
      userMobile
    })
  },
  /**
   * 甲方产品详情-申请条件。(H5端)
   */
  async productCondition ({
    productCode = ''
  }) {
    return ajx('app/product/condition', {
      productCode
    })
  }
}
export default indexApi
