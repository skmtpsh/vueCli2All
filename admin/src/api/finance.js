import request from '@/utils/request'
import commonQuery from '@/utils/commonQuery'
import { getToken } from '@/utils/token'
const TOKEN = getToken()
const pageQuery = () => {
  return Object.assign({}, {tokenKey: TOKEN}, commonQuery())
}
const financeApi = {
  FINANCESUMARY () {
    return request({
      url: 'busi/statistic/manage/summary.cmd',
      method: 'post',
      data: Object.assign({
      }, pageQuery())
    })
  },
  FINANCETREND ({
    index = 1,
    startDate = '',
    endDate = ''
  }) {
    return request({
      url: 'busi/statistic/manage/trend.cmd',
      method: 'post',
      data: Object.assign({
        index,
        startDate,
        endDate
      }, pageQuery())
    })
  },
  /**
   * 充值管理
   * @param {*} param0
   */
  FINANCECHARGELIST ({
    pageNum = 0,
    pageSize = 15,
    rechargeType = '',
    rechargeStatus = '',
    orderId = '',
    startDate = '',
    endDate = ''
  }) {
    return request({
      url: 'busi/recharge/list.cmd',
      method: 'post',
      data: Object.assign({
        pageNum,
        pageSize,
        rechargeType,
        rechargeStatus,
        orderId,
        startDate,
        endDate
      }, pageQuery())
    })
  },
  FINANCECHARGEEXPORT ({
    pageNum = 0,
    pageSize = 15,
    rechargeStatus = '',
    orderId = '',
    startDate = '',
    endDate = ''
  }) {
    return request({
      url: 'busi/recharge/export.cmd',
      method: 'post',
      responseType: 'blob',
      data: Object.assign({
        pageNum,
        pageSize,
        rechargeStatus,
        orderId,
        startDate,
        endDate

      }, pageQuery())
    })
  },
  FINANCECHARGECONFIRM ({
    appId = '',
    id = '',
    rechargeStatus = ''
  }) {
    return request({
      url: 'busi/recharge/confirm.cmd',
      method: 'post',
      data: Object.assign({
        appId,
        id,
        rechargeStatus
      }, pageQuery())
    })
  },
  /**
   * 余额管理
   * @param {*} param0
   */
  FINANCEAMOUTLIST ({
    pageNum = 0,
    pageSize = 15,
    businessId = '',
    businessName = '',
    contactMan = ''
  }) {
    return request({
      url: 'busi/balance/list.cmd',
      method: 'post',
      data: Object.assign({
        pageNum,
        pageSize,
        businessId,
        businessName,
        contactMan
      }, pageQuery())
    })
  },
  /**
   * 导出管理
   * @param {*} param0
   */
  FINANCEAMOUTEXPORT ({
    pageNum = 0,
    pageSize = 15,
    businessId = '',
    businessName = '',
    contactMan = ''
  }) {
    return request({
      url: 'busi/balance/export.cmd',
      method: 'post',
      responseType: 'blob',
      data: Object.assign({
        pageNum,
        pageSize,
        businessId,
        businessName,
        contactMan
      }, pageQuery())
    })
  },
  /**
   *启用关闭
   * @param {*} param0
   */
  FINANCEALLOW ({
    appId = '',
    id = '',
    status = '',
    feeTypeId = '',
    startDate = '',
    endDate = '',
    channelId = ''
  }) {
    return request({
      url: 'busi/product/enable.cmd',
      method: 'post',
      data: Object.assign({
        appId,
        id,
        status,
        feeTypeId,
        startDate,
        endDate,
        channelId
      }, pageQuery())
    })
  }
}
export default financeApi
