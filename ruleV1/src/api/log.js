import request from '@/utils/request'
import commonQuery from '@/utils/commonQuery'
import { getToken } from '@/utils/token'
const TOKEN = getToken()
let user = window.localStorage.vuex ? JSON.parse(window.localStorage.vuex).web.info.staffCode : ''
const pageQuery = () => {
  return Object.assign({}, {tokenKey: TOKEN, username: window.localStorage ? user : 'uname'}, commonQuery())
  // return Object.assign({}, commonQuery())
}
// 临时解决方案
const pageQueryManager = () => {
  return Object.assign({}, {tokenKey: TOKEN}, commonQuery())
  // return Object.assign({}, commonQuery())
}
const logApi = {
  /**
   * 日志
   * @param {} param0
   */
  RULESLOGLIST ({
    id = '',
    formulaId = '',
    level = '',
    pageSize = 10,
    pageNum = 1
  }) {
    return request({
      url: 'rule/log',
      method: 'post',
      data: Object.assign({
        id,
        formulaId,
        level,
        pageSize,
        pageNum
      }, pageQuery())
    })
  },
  // 管理员查看日志
  RULESLOGLISTMANAGER ({
    id = '',
    formulaId = '',
    level = '',
    pageSize = 10,
    pageNum = 1
  }) {
    return request({
      url: 'rule/log',
      method: 'post',
      data: Object.assign({
        id,
        formulaId,
        level,
        pageSize,
        pageNum
      }, pageQueryManager())
    })
  }
}
export default logApi
