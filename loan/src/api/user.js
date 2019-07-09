import request from '@/utils/request'
import commonQuery from '@/utils/commonQuery'
import { getToken } from '@/utils/token'
const TOKEN = getToken()
const pageQuery = () => {
  return Object.assign({}, {tokenKey: TOKEN}, commonQuery())
}
const productApi = {
  /**
   * 用户管理-用户列表(查询)
   * @param {} param0
   */
  USER_LIST ({
    pageNum = '',
    pageSize = '',
    startDate = '',
    endDate = '',
    dataStartDate = '',
    dataEndDate = '',
    keyWord = '',
    index = ''
  }) {
    return request({
      url: 'user/list',
      method: 'post',
      data: Object.assign({
        pageNum,
        pageSize,
        startDate,
        endDate,
        dataStartDate,
        dataEndDate,
        keyWord,
        index
      }, pageQuery())
    })
  },
  // 导出
  USER_EXPORT ({
    startDate = '',
    endDate = '',
    dataStartDate = '',
    dataEndDate = '',
    keyWord = '',
    index = ''
  }) {
    return request({
      url: 'user/export',
      method: 'post',
      responseType: 'blob',
      data: Object.assign({
        startDate,
        endDate,
        dataStartDate,
        dataEndDate,
        keyWord,
        index
      }, pageQuery())
    })
  },
  // 详情页
  USER_DETAIL ({
    mobile = ''
  }) {
    return request({
      url: 'user/info',
      method: 'post',
      data: Object.assign({
        mobile
      }, pageQuery())
    })
  },
  // 汇总
  USER_SUMMARY ({
    mobile = '',
    pageNum = '',
    pageSize = '',
    indexInfo = ''
  }) {
    return request({
      url: 'user/summary',
      method: 'post',
      data: Object.assign({
        mobile,
        pageNum,
        pageSize,
        indexInfo
      }, pageQuery())
    })
  }
}

export default productApi
