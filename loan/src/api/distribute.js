import request from '@/utils/request'
import commonQuery from '@/utils/commonQuery'
import { getToken } from '@/utils/token'
const TOKEN = getToken()
const pageQuery = () => {
  return Object.assign({}, {tokenKey: TOKEN}, commonQuery())
}
const distributeApi = {
  /**
   * 乙方管理(查询)
   * @param {} param0
   */
  DISTRIBUTE_LSITS ({
    pageNum = '',
    pageSize = '',
    keyWord = ''
  }) {
    return request({
      url: 'product/link/list',
      method: 'post',
      data: Object.assign({
        pageNum,
        pageSize,
        keyWord
      }, pageQuery())
    })
  },
  /**
   * 乙方管理(查询)
   * @param {} param0
   */
  DISTRIBUTE_URL_LSITS ({
    pageNum = '',
    pageSize = '',
    productCode = ''
  }) {
    return request({
      url: 'product/link/url/list',
      method: 'post',
      data: Object.assign({
        pageNum,
        pageSize,
        productCode
      }, pageQuery())
    })
  },
  /**
   * 乙方管理(查询)
   * @param {} param0
   */
  DISTRIBUTE_URL_SAVE ({
    productCode = '',
    productLink = '',
    computeWay = '',
    linkType
  }) {
    return request({
      url: 'product/link/save',
      method: 'post',
      data: Object.assign({
        productCode,
        productLink,
        computeWay,
        linkType
      }, pageQuery())
    })
  },
  /**
   * 乙方管理(查询)
   * @param {} param0
   */
  DISTRIBUTE_URL_MOD ({
    productLinkId = '',
    productLink = '',
    computeWay = '',
    linkType
  }) {
    return request({
      url: 'product/link/update',
      method: 'post',
      data: Object.assign({
        productLinkId,
        productLink,
        computeWay,
        linkType
      }, pageQuery())
    })
  },
  /**
   * 乙方管理(查询)
   * @param {} param0
   */
  DISTRIBUTE_URL_DEL ({
    productLinkId = ''
  }) {
    return request({
      url: 'product/link/delete',
      method: 'post',
      data: Object.assign({
        productLinkId
      }, pageQuery())
    })
  },
  /**
   * 乙方管理(查询)
   * @param {} param0
   */
  DISTRIBUTE_URL_STATUS ({
    productLinkId = '',
    isEnable = ''
  }) {
    return request({
      url: 'product/link/handle',
      method: 'post',
      data: Object.assign({
        productLinkId,
        isEnable
      }, pageQuery())
    })
  },
  /**
   * 乙方管理(查询)
   * @param {} param0
   */
  DISTRIBUTE_URL_SEL () {
    return request({
      url: 'product/link/select',
      method: 'post',
      data: Object.assign({
      }, pageQuery())
    })
  },
  /**
   * 乙方管理(查询)
   * @param {} param0
   */
  DISTRIBUTE_LINK_LSITS ({
    pageNum = '',
    pageSize = '',
    productLinkId = '',
    canalName = '',
    saleName = ''
  }) {
    return request({
      url: 'distri/link/list',
      method: 'post',
      data: Object.assign({
        pageNum,
        pageSize,
        productLinkId,
        canalName,
        saleName
      }, pageQuery())
    })
  },
  /**
   * 乙方管理(查询)
   * @param {} param0
   */
  DISTRIBUTE_LINK_ADD ({
    distributeId = '',
    productLinkId = '',
    canalId = '',
    saleName = ''
  }) {
    return request({
      url: 'distri/link/save',
      method: 'post',
      data: Object.assign({
        canalId,
        productLinkId,
        distributeId,
        saleName
      }, pageQuery())
    })
  },
  /**
   * 乙方管理(查询)
   * @param {} param0
   */
  DISTRIBUTE_LINK_MOD ({
    distributeLinkCode = '',
    distributeId = ''
  }) {
    return request({
      url: 'distri/link/update',
      method: 'post',
      data: Object.assign({
        distributeId,
        distributeLinkCode
      }, pageQuery())
    })
  },
  /**
   * 乙方管理(查询)
   * @param {} param0
   */
  DISTRIBUTE_LINK_DEL ({
    distributeLinkCode = ''
  }) {
    return request({
      url: 'distri/link/delete',
      method: 'post',
      data: Object.assign({
        distributeLinkCode
      }, pageQuery())
    })
  },
  /**
   * 乙方管理(查询)
   * @param {} param0
   */
  DISTRIBUTE_LINK_STATUS ({
    distributeLinkCode = '',
    isEnable = ''
  }) {
    return request({
      url: 'distri/link/handle',
      method: 'post',
      data: Object.assign({
        distributeLinkCode,
        isEnable
      }, pageQuery())
    })
  },
  /**
   * 乙方管理(查询)
   * @param {} param0
   */
  DISTRIBUTE_LINK_MODE () {
    return request({
      url: 'distri/link/mode',
      method: 'post',
      data: Object.assign({
      }, pageQuery())
    })
  },
  /**
   * 乙方管理(查询)
   * @param {} param0
   */
  DISTRIBUTE_LINK_CANALSEL ({
    canalType = ''
  }) {
    return request({
      url: 'canal/select',
      method: 'post',
      data: Object.assign({
        canalType
      }, pageQuery())
    })
  },
  /**
   * 乙方管理(查询)
   * @param {} param0
   */
  DISTRIBUTE_STATIS_LIST ({
    pageNum = '',
    pageSize = '',
    startDate = '',
    endDate = '',
    canalName = '',
    merchantName = '',
    summaryMode = 0,
    countMode = 0
  }) {
    return request({
      url: 'statis/list',
      method: 'post',
      data: Object.assign({
        pageNum,
        pageSize,
        startDate,
        endDate,
        canalName,
        merchantName,
        summaryMode,
        countMode
      }, pageQuery())
    })
  },
  /**
   * 到处
   * @param {} param0
   */
  DISTRIBUTE_STATIS_EXPORT ({
    pageNum = '',
    pageSize = '',
    startDate = '',
    endDate = '',
    canalName = '',
    merchantName = '',
    summaryMode = 0,
    countMode = 0
  }) {
    return request({
      url: 'statis/export',
      method: 'post',
      responseType: 'blob',
      data: Object.assign({
        pageNum,
        pageSize,
        startDate,
        endDate,
        canalName,
        merchantName,
        summaryMode,
        countMode
      }, pageQuery())
    })
  },
  /**
   * 到处
   * @param {} param0
   */
  DISTRIBUTE_LINK_EXPORT ({
    pageNum = '',
    pageSize = '',
    productLinkId = '',
    canalName = '',
    saleName = ''
  }) {
    return request({
      url: 'distri/link/export',
      method: 'post',
      responseType: 'blob',
      data: Object.assign({
        pageNum,
        pageSize,
        productLinkId,
        canalName,
        saleName
      }, pageQuery())
    })
  }
}
export default distributeApi
