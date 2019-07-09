import request from '@/utils/request'
import commonQuery from '@/utils/commonQuery'
import { getToken } from '@/utils/token'
const TOKEN = getToken()
const pageQuery = () => {
  return Object.assign({}, {tokenKey: TOKEN}, commonQuery())
}
const cardsApi = {
  /**
   * 合作银行管理(查询)
   * @param {} param0
   */
  BANKMERCHANT_LIST ({
    pageNum = '',
    pageSize = '',
    bankName = '',
    keyWord = ''
  }) {
    return request({
      url: 'bankMerchant/list',
      method: 'post',
      data: Object.assign({
        pageNum,
        pageSize,
        bankName,
        keyWord
      }, pageQuery())
    })
  },
  /**
   * 结算管理(查询)
   * @param {} param0
   */
  BANKMERCHANT_BANKS () {
    return request({
      url: 'bankMerchant/banks',
      method: 'post',
      data: Object.assign({
      }, pageQuery())
    })
  },
  /**
   * 结算管理(查询)
   * @param {} param0
   */
  BANKMERCHANT_SAVE ({
    bankCode = '',
    bankLogo = '',
    bankName = '',
    contactMan = '',
    mobile = ''
  }) {
    return request({
      url: 'bankMerchant/save',
      method: 'post',
      data: Object.assign({
        bankCode,
        bankName,
        bankLogo,
        contactMan,
        mobile
      }, pageQuery())
    })
  },
  /**
   * 结算管理(查询)
   * @param {} param0
   */
  BANKMERCHANT_UPDATE ({
    id = '',
    bankCode = '',
    bankLogo = '',
    bankName = ''
  }) {
    return request({
      url: 'bankMerchant/update',
      method: 'post',
      data: Object.assign({
        id,
        bankCode,
        bankLogo,
        bankName
      }, pageQuery())
    })
  },
  /**
   * 结算管理(查询)
   * @param {} param0
   */
  BANKMERCHANT_HANDLE ({
    id = '',
    isEnable = ''
  }) {
    return request({
      url: 'bankMerchant/handle',
      method: 'post',
      data: Object.assign({
        id,
        isEnable
      }, pageQuery())
    })
  }
}
export default cardsApi
