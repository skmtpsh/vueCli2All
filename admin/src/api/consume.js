import request from '@/utils/request'
import commonQuery from '@/utils/commonQuery'
import { getToken } from '@/utils/token'
const TOKEN = getToken()
const pageQuery = () => {
  return Object.assign({}, {tokenKey: TOKEN}, commonQuery())
}
const consumeApi = {
  CONSUMELIST ({
    pageNum = 0,
    pageSize = 15,
    channelId = '',
    startDate = '',
    endDate = ''
  }) {
    return request({
      url: 'busi/consume/list.cmd',
      method: 'post',
      data: Object.assign({
        pageNum,
        pageSize,
        channelId,
        startDate,
        endDate
      }, pageQuery())
    })
  },
  CONSUMEMENU () {
    return request({
      url: 'busi/product/tree.cmd',
      method: 'post',
      data: Object.assign({
      }, pageQuery())
    })
  },
  COMPANYINFO ({
    appId = ''
  }) {
    return request({
      url: 'busi/user/info.cmd',
      method: 'post',
      data: Object.assign({
        appId
      }, pageQuery())
    })
  },
  COMPANYMOD ({
    id = '',
    businessAddr = '',
    contactMan = '',
    contactManMobile = '',
    contactManMail = '',
    businessName = '',
    contactManQq
  }) {
    return request({
      url: 'busi/update.cmd',
      method: 'post',
      data: Object.assign({
        id,
        businessAddr,
        contactMan,
        contactManMobile,
        contactManMail,
        businessName,
        contactManQq
      }, pageQuery())
    })
  },
  FINANCEAMOUTEXPORT ({
    pageNum = 0,
    pageSize = 15,
    channelId = '',
    startDate = '',
    endDate = ''
  }) {
    return request({
      url: 'busi/consume/export.cmd',
      method: 'post',
      responseType: 'blob',
      data: Object.assign({
        pageNum,
        pageSize,
        channelId,
        startDate,
        endDate
      }, pageQuery())
    })
  },
  COMPANYALLOW ({
    id = '',
    isAllow = ''
  }) {
    return request({
      url: 'busi/list.cmd',
      method: 'post',
      data: Object.assign({
        id,
        isAllow
      }, pageQuery())
    })
  }
}
export default consumeApi
