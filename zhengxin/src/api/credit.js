import request from '@/utils/request'
import commonQuery from '@/utils/commonQueryAll'
// 产品编号
const PRODUCTNO = 3

async function requestApi (apiUrl, data = {}, noComm = 1) {
  return request({
    baseURL: process.env.BASE_API_MARKET, // api的base_url
    // baseURL: 'http://172.16.100.38:8080/api/market/', // api的base_url
    url: apiUrl,
    method: 'post',
    data: Object.assign(
      {},
      data,
      noComm ? commonQuery().marketCreditQuery : {}
    )
  })
}
const creditApi = {
  // 贷超支付按钮状态接口
  async getOverDue ({
    productNo = PRODUCTNO,
    loginPhone = '',
    userId = ''
  }) {
    return requestApi('credit/overdue', {
      productNo,
      loginPhone,
      userId
    })
  },
  // 贷超信用报告模块查询接口
  async getModule ({
    productNo = PRODUCTNO,
    userId = ''
  }) {
    return requestApi('credit/module', {
      productNo,
      userId
    })
  },
  // 贷超信用报告验证码接口
  async getVerify ({
    phone = '',
    userId = ''
  }) {
    return requestApi('credit/verification', {
      phone,
      userId
    })
  },
  // 贷超信用报告支付接口
  async getPay ({
    phone = '',
    pageReturnUrl = '',
    orderMoney = '',
    userId = ''
  }) {
    return requestApi('credit/pay/order', {
      phone,
      pageReturnUrl,
      orderMoney,
      userId
    })
  },
  // 贷超信用报告验证码接口
  async getReport ({
    userId = '',
    name = '董其云',
    phone = '18561720807',
    loginPhone = '18561720807',
    orderId = '',
    checkCode = '',
    productNo = PRODUCTNO,
    idCard = '130927199011032120'
  }) {
    return requestApi('credit/report', {
      userId,
      name,
      phone,
      loginPhone,
      orderId,
      checkCode,
      productNo,
      idCard
    })
  }
}
export default creditApi
