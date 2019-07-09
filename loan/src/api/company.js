import request from '@/utils/request'
import commonQuery from '@/utils/commonQuery'
import { getToken } from '@/utils/token'
const TOKEN = getToken()
const pageQuery = () => {
  return Object.assign({}, {tokenKey: TOKEN}, commonQuery())
}
const companyApi = {
  /**
   * 乙方管理(查询)
   * @param {} param0
   */
  COMPANY_LSITS ({
    pageNum = '',
    pageSize = '',
    startDate = '',
    endDate = '',
    saleName = '',
    keyWord = ''
  }) {
    return request({
      url: 'canal/list',
      method: 'post',
      data: Object.assign({
        pageNum,
        pageSize,
        startDate,
        endDate,
        saleName,
        keyWord
      }, pageQuery())
    })
  },
  /**
   * 乙方管理-渠道类型(查询)
   * @param {} param0
   */
  COMPANY_TYPE () {
    return request({
      url: 'canal/type',
      method: 'post',
      data: Object.assign({
      }, pageQuery())
    })
  },
  /**
   * 乙方管理-销售(查询)
   * @param {} param0
   */
  BUSINESS_SALES () {
    return request({
      url: 'merchant/sales',
      method: 'post',
      data: Object.assign({
      }, pageQuery())
    })
  },
  /**
   * 乙方管理-销售(查询)
   * @param {} param0
   */
  BUSINESS_CANAL_SALES () {
    return request({
      url: 'canal/sales',
      method: 'post',
      data: Object.assign({
      }, pageQuery())
    })
  },
  /**
   * 商户管理-更改启用状态(更新)
   * @param {} param0
   */
  COMPANY_STATUS ({
    canalId = '',
    isEnable = ''
  }) {
    return request({
      url: 'canal/handle',
      method: 'post',
      data: Object.assign({
        canalId,
        isEnable
      }, pageQuery())
    })
  },
  /**
   * 乙方管理-添加渠道(增)
   * @param {} param0
   */
  COMPANY_ADD ({
    canalName = '',
    canalType = '',
    contactMan = '',
    mobile = '',
    canalAccount = '',
    isEnable = 1,
    openBank = '',
    bankAccount = '',
    saleName = '',
    interCode = ''
  }) {
    return request({
      url: 'canal/save',
      method: 'post',
      data: Object.assign({
        canalName,
        canalType,
        contactMan,
        mobile,
        canalAccount,
        isEnable,
        openBank,
        bankAccount,
        saleName,
        interCode
      }, pageQuery())
    })
  },
  /**
   * 乙方管理-修改商户(改)
   * @param {} param0
   */
  COMPANY_MOD ({
    canalId = '',
    canalName = '',
    canalType = '',
    contactMan = '',
    mobile = '',
    isEnable = '',
    openBank = '',
    bankAccount = '',
    interCode = ''
  }) {
    return request({
      url: 'canal/update',
      method: 'post',
      data: Object.assign({
        canalId,
        canalName,
        canalType,
        contactMan,
        mobile,
        isEnable,
        openBank,
        bankAccount,
        interCode
      }, pageQuery())
    })
  },
  /**
   * 乙方管理(查询)
   * @param {} param0
   */
  COMPANY_DISTRI_LSITS ({
    pageNum = '',
    pageSize = '',
    canalId = ''
  }) {
    return request({
      url: 'canal/url/list',
      method: 'post',
      data: Object.assign({
        pageNum,
        pageSize,
        canalId
      }, pageQuery())
    })
  }
}
export default companyApi
