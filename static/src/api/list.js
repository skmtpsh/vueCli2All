import request from '@/utils/request'
import commonQuery from '@/utils/commonQuery'
import { getToken } from '@/utils/token'
const TOKEN = getToken()
// console.log(JSON.parse(window.localStorage.vuex).web.info.staffCode)
// let user = JSON.parse(window.localStorage.vuex).web.info.staffCode
const pageQuery = () => {
  // return Object.assign({}, {tokenKey: TOKEN, username: window.localStorage ? user : 'uname'}, commonQuery())
  return Object.assign({}, {tokenKey: TOKEN}, commonQuery())
  // return Object.assign({}, commonQuery())
}
const staticApi = {
  /**
   * 认证列表(查询)
   * @param {} param0
   */
  STATICLIST ({
    appId = '',
    userName = '',
    mobile = '',
    idCard = '',
    startTime = '',
    endTime = '',
    twoElements = '',
    pageSize = 15,
    pageNum = 1
  }) {
    return request({
      url: 'user/querylist',
      method: 'post',
      data: Object.assign({
        appId,
        userName,
        mobile,
        idCard,
        startTime,
        endTime,
        twoElements,
        pageSize,
        pageNum
      }, pageQuery())
    })
  },
  /**
   * 产品配置(查询)
   * @param {} param0
   */
  STATICLISTVERIFY ({
    appId = '',
    type = '',
    appName = '',
    pageSize = 15,
    pageNum = 1
  }) {
    return request({
      url: 'verify/querylist',
      method: 'post',
      data: Object.assign({
        appId,
        type,
        appName,
        pageSize,
        pageNum
      }, pageQuery())
    })
  },
  /**
   * 产品配置(添加)
   * @param {} param0
   */
  STATICLISTADD ({
    appName = '',
    type = '',
    basicVerifyName = '',
    advancedVerifyName = '',
    appType = '',
    appDescription = '',
    productStatus = '',
    deleteStatus = 1, // 0 是删除
    updateType = ''
  }) {
    return request({
      url: 'verify/update',
      method: 'post',
      data: Object.assign({
        appName,
        type,
        basicVerifyName,
        advancedVerifyName,
        appType,
        appDescription,
        productStatus,
        deleteStatus,
        updateType
      }, pageQuery())
    })
  },
  /**
   * 产品名称配置(查询)
   * @param {} param0
   */
  STATICLISTOPTION () {
    return request({
      url: 'verify/appname',
      method: 'post',
      data: Object.assign({
      }, pageQuery())
    })
  },
  /**
   * 导出管理
   * @param {*} param0
   */
  STATICEXPORT ({
    appId = '',
    userName = '',
    mobile = '',
    idCard = '',
    startTime = '',
    endTime = '',
    twoElements = '',
    pageSize = 15,
    pageNum = 1
  }) {
    return request({
      url: 'user/exportuser',
      method: 'post',
      responseType: 'blob',
      data: Object.assign({
        appId,
        userName,
        mobile,
        idCard,
        startTime,
        endTime,
        twoElements,
        pageSize,
        pageNum
      }, pageQuery())
    })
  },
  // 对接来源
  APPID_LIST () {
    return request({
      url: 'verify/appname',
      method: 'post',
      data: Object.assign({
      }, pageQuery())
    })
  }
}
export default staticApi
