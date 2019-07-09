import request from '@/utils/request'
import { dateFormat } from 'vux'
import md5 from 'js-md5'
const getParam = (name) => {
  var search = document.location.search
  var pattern = new RegExp('[?&]' + name + '\\=([^&]+)', 'g')
  var matcher = pattern.exec(search)
  var items = null
  if (matcher !== null) {
    try {
      items = decodeURIComponent(decodeURIComponent(matcher[1]))
    } catch (e) {
      try {
        items = decodeURIComponent(matcher[1])
      } catch (e) {
        items = matcher[1]
      }
    }
  }
  return items
}
export const getAppKey = (appName) => {
  const AppSet = [
    {
      id: 'bailianqianbao88',
      key: 'c808f285fb68b7e33e997d089da2885d',
      appName: '佰联钱包'
    },
    {
      id: 'limayouqian',
      key: 'limayouqian',
      appName: '立马有钱'
    },
    {
      id: 'xiaodaiqianbao88',
      key: '1e0717e0a0da27125fd7d219d9bde6ec',
      appName: '小贷钱包'
    },
    {
      id: 'yilaibao12345678',
      key: 'a2b997d27ee5e796cbd08da69748a5b8',
      appName: '易来宝'
    }
  ]
  return AppSet.filter(item => {
    if (item.appName === appName) {
      return item
    }
  })
}

// 公用CommonQuery
export const commonQuery = () => {
  // let AppKey = ''
  let AppName = getParam('appName')
  // let AppName = '佰联钱包'
  if (getAppKey(AppName).length === 0) {
    console.log('not find key')
    return false
  }
  let AppSN = getAppKey(AppName)[0].id
  // let AppID = 'PROCESS_SYSTEM'
  let AppKey = getAppKey(AppName)[0].key

  let TimeStamp = dateFormat(new Date(), 'YYYYMMDDHHmmss')
  let SignSystem = md5(AppKey + AppSN + TimeStamp)

  return {
    timestamp: TimeStamp,
    signSystem: SignSystem,
    appSn: AppSN,
    token: getParam('token'),
    appVersion: getParam('appVersion'),
    appOs: getParam('appOs'),
    appName: AppName
  }
}
// let commonQuery = () => {
//   let AppSN = 'bailianqianbao88'
//   let AppKey = 'c808f285fb68b7e33e997d089da2885d'
//   let TimeStamp = dateFormat(new Date(), 'YYYYMMDDHHmmss')
//   let SignSystem = md5(AppKey + AppSN + TimeStamp)
//   return {
//     timestamp: TimeStamp,
//     signSystem: SignSystem,
//     appSn: AppSN,
//     token: getParam('token')
//   }
// }

const repayApi = {
  /**
   * 获取应还列表
   * @param {*} userId  用户ID
   * @param {*} token 令牌
   * @param {*} appName app名称
   * @param {*} state 订单状态：0：应还款 1：已还款
   **/
  repayList ({
    userId = '',
    state = 0
  } = {}) {
    return request({
      url: 'v3/repay/list',
      method: 'post',
      data: Object.assign({
        state,
        userId
      }, commonQuery())
    })
  },
/**
   * 去还款
   * @param {*} repayId  repayId []
   * @param {*} paymentType 1:还款 2:展期付款; (支付类型)
   * @param {*} days int 7 14 21 30
   **/
  repayNow ({
    paymentType = 1,
    days = '',
    userId = '',
    repayId = '',
    rateVersion = ''
  } = {}) {
    return request({
      url: 'pipe/repay',
      method: 'post',
      data: Object.assign({
        repayId,
        rateVersion,
        paymentType,
        userId
      }, paymentType === 2 ? {days, rateVersion} : {}, commonQuery()) // paymentType === 2 ? {days} : {}
    })
  },
  /**
   * 分期还款
   * @param {*} repayId  repayId string
   * @param {*} loanId  loanId
   **/
  repayItemComfirm ({
    repayType = '',
    repayIds = '',
    loanId = '',
    userId = ''
  } = {}) {
    return request({
      // url: 'v3/repay/termRepay',
      url: 'v3/yidun/batch/aggregate/H5',
      method: 'post',
      data: Object.assign({
        repayType,
        loanId,
        userId
      }, {repayIds}, commonQuery()) // repayType === 0 ? {repayIds} : {}
    })
  },
  /**
   * 每期还款查询
   * @param {*} userId  用户ID
   * @param {*} token 令牌
   * @param {*} appName app名称
   * @param {*} loanId 借款单ID
   **/
  repayTerm ({
    userId = '',
    loanId = ''
  } = {}) {
    return request({
      url: 'v3/repay/termRepayQuery',
      method: 'post',
      data: Object.assign({
        loanId,
        userId
      }, commonQuery())
    })
  },
  /**
   * 提前还款查询
   * @param {*} userId  用户ID
   * @param {*} token 令牌
   * @param {*} appName app名称
   * @param {*} loanId 借款单ID
   **/
  repayEarly ({
    userId = '',
    loanId = ''
  } = {}) {
    return request({
      url: 'v3/repay/earlyClearanceQuery',
      method: 'post',
      data: Object.assign({
        loanId,
        userId
      }, commonQuery())
    })
  },
  /**
   * 展期申请
   * @param {*} userId  用户ID
   * @param {*} token 令牌
   * @param {*} appName app名称
   * @param {*} repayId 还款计划id
   * @param {*} days 展期天数，7天 14天 30天
   **/
  repayExtenApply ({
    userId = '',
    repayId = '',
    days = 0
  } = {}) {
    return request({
      url: 'v3/extension/extensionApply',
      method: 'post',
      data: Object.assign({
        repayId,
        userId
      }, days === 0 ? {} : { days }, commonQuery())
    })
  }
}
export default repayApi
