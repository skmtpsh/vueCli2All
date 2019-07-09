import request from '@/utils/request'
import commonQuery from '@/utils/commonQuery'
import { getToken } from '@/utils/token'
const TOKEN = getToken()
const pageQuery = () => {
  return Object.assign({}, {tokenKey: TOKEN}, commonQuery())
}
const companyApi = {
  COMPANYLIST ({
    pageNum = 0,
    pageSize = 15,
    businessName = '',
    businessId = '',
    contactMan = '',
    startDate = '',
    endDate = ''
  }) {
    return request({
      url: 'busi/list.cmd',
      method: 'post',
      data: Object.assign({
        pageNum,
        pageSize,
        businessName,
        businessId,
        contactMan,
        startDate,
        endDate
      }, pageQuery())
    })
  },
  COMPANYEXPORT ({
    pageNum = 0,
    pageSize = 15,
    businessName = '',
    businessId = '',
    contactMan = '',
    startDate = '',
    endDate = ''
  }) {
    return request({
      url: 'busi/export.cmd',
      method: 'post',
      responseType: 'blob',
      data: Object.assign({
        pageNum,
        pageSize,
        businessName,
        businessId,
        contactMan,
        startDate,
        endDate
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
  NOTICEVIEW ({
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
  NOTICEMOD ({
    id = '',
    businessName = '',
    businessTelephone = '',
    businessMobile = '',
    businessAddr = '',
    contactMan = '',
    contactManMobile = '',
    contactManMail = '',
    contactManQq = ''
  }) {
    return request({
      url: 'busi/update.cmd',
      method: 'post',
      data: Object.assign({
        id,
        businessName,
        businessTelephone,
        businessMobile,
        businessAddr,
        contactMan,
        contactManMobile,
        contactManMail,
        contactManQq
      }, pageQuery())
    })
  },
  NOTICEADD ({
    id = '',
    businessName = '',
    businessTelephone = '',
    businessMobile = '',
    businessAddr = '',
    contactMan = '',
    contactManMobile = '',
    contactManMail = '',
    contactManQq = ''
  }) {
    return request({
      url: 'busi/update.cmd',
      method: 'post',
      data: Object.assign({
        id,
        businessName,
        businessTelephone,
        businessMobile,
        businessAddr,
        contactMan,
        contactManMobile,
        contactManMail,
        contactManQq
      }, pageQuery())
    })
  },
  COMPANYSAVE ({
    applyId = '',
    businessName = '',
    businessTelephone = '',
    businessMobile = '',
    businessAddr = '',
    contactMan = '',
    contactManMobile = '',
    contactManMail = '',
    contactManQq = ''
  }) {
    return request({
      url: 'busi/save.cmd',
      method: 'post',
      data: Object.assign({
        applyId,
        businessName,
        businessTelephone,
        businessMobile,
        businessAddr,
        contactMan,
        contactManMobile,
        contactManMail,
        contactManQq
      }, pageQuery())
    })
  },
  COMPANYALLOW ({
    id = '',
    isAllow = ''
  }) {
    return request({
      url: 'busi/allow.cmd',
      method: 'post',
      data: Object.assign({
        id,
        isAllow
      }, pageQuery())
    })
  },
  COMPANYAPPLYLIST ({
    pageNum = 0,
    pageSize = 15,
    businessName = '',
    contactMan = '',
    startDate = '',
    endDate = ''
  }) {
    return request({
      url: 'busi/apply/list.cmd',
      method: 'post',
      data: Object.assign({
        pageNum,
        pageSize,
        businessName,
        contactMan,
        startDate,
        endDate
      }, pageQuery())
    })
  },
  COMPANYAPPLYEXPORT ({
    pageNum = 0,
    pageSize = 15,
    businessName = '',
    contactMan = '',
    startDate = '',
    endDate = ''
  }) {
    return request({
      url: 'busi/apply/export.cmd',
      method: 'post',
      responseType: 'blob',
      data: Object.assign({
        pageNum,
        pageSize,
        businessName,
        contactMan,
        startDate,
        endDate
      }, pageQuery())
    })
  },
  // 申请管理
  COMPANYAPPLYREFUSE ({
    id = '',
    status = ''
  }) {
    return request({
      url: 'busi/apply/handle.cmd',
      method: 'post',
      data: Object.assign({
        id,
        status
      }, pageQuery())
    })
  },
  COMPANYAPPLYCREATE ({
    id = ''
  }) {
    return request({
      url: 'busi/save.cmd',
      method: 'post',
      data: Object.assign({
        id
      }, pageQuery())
    })
  }
}
export default companyApi
