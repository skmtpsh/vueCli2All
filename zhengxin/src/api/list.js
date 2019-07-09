import request from '@/utils/request'
// import md5 from 'js-md5'
// import { dateFormat } from 'vux'
import commonQuery from '@/utils/commonQueryAll'

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
const listApi = {
  // 列表信息
  async productIndex ({
    appName = '',
    productCode = '',
    version = '3',
    userId = '',
    appOs = '',
    loanType = '1'
  }) {
    return requestApi('loan/product/detail', {
      appName,
      productCode,
      version,
      userId,
      appOs,
      loanType
    })
  },
  async detailIndex ({
    productCode = '',
    userId = ''
  }) {
    return requestApi('app/popular/info', {
      productCode,
      userId
    })
  },
  // 申请借款提交按钮
  async listSubmit ({
    borrowAmount = '',
    termLine = '',
    userBankId = '',
    purpose = '',
    contractNum = '',
    days = '',
    terms = '',
    goodsName = ''
  }) {
    return requestApi('loan/order/buy', {
      borrowAmount,
      termLine,
      userBankId,
      purpose,
      contractNum,
      days,
      terms,
      goodsName
    })
  },
  // 总和费用接口
  async listFee ({
    productCode = '',
    userId = '',
    appName = '',
    borrowAmount = '',
    loanType = '',
    days = '',
    terms = ''
  }) {
    return requestApi('loan/order/fee', {
      productCode,
      userId,
      appName,
      borrowAmount,
      loanType,
      days,
      terms
    })
  },
  // 确定购买
  async confirmbuy ({
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
    return requestApi('loan/order/buy', {
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
    })
  },
  async applyBuy ({
    productCode = '',
    userId = '',
    appOs = '',
    loanType = '',
    appName = ''
  }) {
    return requestApi('loan/order/examine', {
      productCode,
      userId,
      appOs,
      loanType,
      appName
    })
  }
}
export default listApi
