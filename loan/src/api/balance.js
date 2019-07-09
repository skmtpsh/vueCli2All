import request from '@/utils/request'
import commonQuery from '@/utils/commonQuery'
import { getToken } from '@/utils/token'
const TOKEN = getToken()
const pageQuery = () => {
  return Object.assign({}, {tokenKey: TOKEN}, commonQuery())
}
const balanceApi = {
  /**
   * 结算管理(查询)
   * @param {} param0
   */
  BANLANCE_LIST ({
    pageNum = '',
    pageSize = '',
    startDate = '',
    endDate = '',
    productName = '',
    merchantName = '',
    keyWord = '',
    summaryMode = 0,
    countMode = 0
  }) {
    return request({
      url: 'compute/list',
      method: 'post',
      data: Object.assign({
        pageNum,
        pageSize,
        startDate,
        endDate,
        productName,
        merchantName,
        keyWord,
        summaryMode,
        countMode
      }, pageQuery())
    })
  },
  /**
   * 结算管理-查询条件(查询)
   * @param {} param0
   */
  BANLANCE_FILTER () {
    return request({
      url: 'compute/query',
      method: 'post',
      data: Object.assign({
      }, pageQuery())
    })
  },
  /**
   * 结算管理-查询条件(查询)
   * @param {} param0
   */
  BANLANCE_EXPORT ({
    pageNum = '',
    pageSize = '',
    startDate = '',
    endDate = '',
    productName = '',
    merchantName = '',
    keyWord = '',
    summaryMode = 0,
    countMode = 0
  }) {
    return request({
      url: 'compute/export',
      method: 'post',
      responseType: 'blob',
      data: Object.assign({
        pageNum,
        pageSize,
        startDate,
        endDate,
        productName,
        merchantName,
        keyWord,
        summaryMode,
        countMode
      }, pageQuery())
    })
  }
}
export default balanceApi
