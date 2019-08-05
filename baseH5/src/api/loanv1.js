import request from '@/utils/request'
import commonQuery from '@/utils/commonQuery'

async function ajx (apiUrl, data = {}, v = 'v1') {
  return request({
    baseURL: process.env.VUE_APP_BASE_API_V1,
    url: apiUrl,
    method: 'post',
    data: Object.assign(
      {},
      data,
      commonQuery(v)
    )
  })
}

const indexApi = {
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
    }, 'v1.1')
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
    }, 'v1.1')
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
   * 甲方产品详情-申请条件。非api (H5端)
   */
  async productCondition ({
    productCode = ''
  }) {
    return ajx('app/product/condition', {
      productCode
    }, 'v1.1')
  },
  // 甲方产品详情-申请条件 api。(H5端)
  async detailIndex ({
    productCode = '',
    userId = ''
  }) {
    return ajx('app/popular/info', {
      productCode,
      userId
    }, 'v1.1')
  },
  /**
   * 贷超推荐产品详情。(H5端)
   */
  async loanProductDetail ({
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
   * 申请借款
   */
  async applyLoan ({
    productCode = '',
    userId = '',
    appOs = '',
    loanType = '',
    appName = ''
  }) {
    return ajx('loan/order/examine', {
      productCode,
      userId,
      appOs,
      loanType,
      appName
    })
  },
  /**
   * 趋势图
   */
  async appProductInfo ({
    productCode = '',
    userMobile = ''
  }) {
    return ajx('app/product/trend', {
      productCode,
      userMobile
    })
  },
  /**
   * 计算费用 (H5端) 中转页面 + api产品详情
   */
  async listFee ({
    productCode = '',
    userId = '',
    appName = '',
    borrowAmount = '',
    loanType = '',
    days = '',
    terms = ''
  }) {
    return ajx('loan/order/fee', {
      productCode,
      userId,
      appName,
      borrowAmount,
      loanType,
      days,
      terms
    })
  },
  // 借款确认页面 - 确认购买订单
  async confirmBuy ({
    productCode = '',
    userId = '',
    borrowAmount = '',
    termLine = '',
    userBankId = '',
    purpose = '',
    contractNum = '',
    goodsName = '',
    days = '',
    terms = '',
    loanType = '',
    appName = ''
  }) {
    return ajx('loan/order/buy', {
      productCode,
      userId,
      borrowAmount,
      termLine,
      userBankId,
      purpose,
      contractNum,
      goodsName,
      days,
      terms,
      loanType,
      appName
    }, 'v1.1')
  }
}
export default indexApi
