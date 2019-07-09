import request from '@/utils/request'
import commonQuery from '@/utils/commonQuery'
import { getToken } from '@/utils/token'
const TOKEN = getToken()
const pageQuery = () => {
  return Object.assign({}, {tokenKey: TOKEN}, commonQuery())
}
const productApi = {
  /**
   * 产品管理-频道管理(查询)
   * @param {} param0
   */
  CHANNEL_LIST ({
    pageNum = '',
    pageSize = '',
    startDate = '',
    endDate = '',
    channelName = ''
  }) {
    return request({
      url: 'channel/list',
      method: 'post',
      data: Object.assign({
        pageNum,
        pageSize,
        startDate,
        endDate,
        channelName
      }, pageQuery())
    })
  },
  /**
   * 产品管理-频道管理(添加)
   * @param {} param0
   */
  CHANNEL_ADD ({
    channelName = '',
    channelPriority = '',
    remark = ''
  }) {
    return request({
      url: 'channel/add',
      method: 'post',
      data: Object.assign({
        channelName,
        channelPriority,
        remark
      }, pageQuery())
    })
  },
  /**
   * 产品管理-频道管理(修改)
   * @param {} param0
  */
  CHANNEL_MOD ({
    channelName = '',
    channelPriority = '',
    remark = '',
    channelId = ''
  }) {
    return request({
      url: 'channel/update',
      method: 'post',
      data: Object.assign({
        channelName,
        channelPriority,
        remark,
        channelId
      }, pageQuery())
    })
  },
  /**
   * 产品管理-频道管理(修改状态)
   * @param {} param0
  */
  CHANNEL_STATUS ({
    isEnable = '',
    channelId = ''
  }) {
    return request({
      url: 'channel/status',
      method: 'post',
      data: Object.assign({
        isEnable,
        channelId
      }, pageQuery())
    })
  },
  /**
   * 产品管理-标签管理(查询)
   * @param {} param0
   */
  TAGS_LIST ({
    pageNum = '',
    pageSize = '',
    startDate = '',
    endDate = '',
    labelName = ''
  }) {
    return request({
      url: 'label/list',
      method: 'post',
      data: Object.assign({
        pageNum,
        pageSize,
        startDate,
        endDate,
        labelName
      }, pageQuery())
    })
  },
  /**
   * 产品管理-标签管理(添加)
   * @param {} param0
   */
  TAGS_ADD ({
    labelName = '',
    remark = ''
  }) {
    return request({
      url: 'label/add',
      method: 'post',
      data: Object.assign({
        labelName,
        remark
      }, pageQuery())
    })
  },
  /**
   * 产品管理-标签管理(修改)
   * @param {} param0
  */
  TAGS_MOD ({
    labelName = '',
    remark = '',
    labelId = ''
  }) {
    return request({
      url: 'label/update',
      method: 'post',
      data: Object.assign({
        labelName,
        remark,
        labelId
      }, pageQuery())
    })
  },
  /**
   * 产品管理-标签管理(修改状态)
   * @param {} param0
  */
  TAGS_STATUS ({
    isEnable = '',
    labelId = ''
  }) {
    return request({
      url: 'label/status',
      method: 'post',
      data: Object.assign({
        isEnable,
        labelId
      }, pageQuery())
    })
  },
  /**
   * 产品管理-标签管理(修改状态)
   * @param {} param0
  */
  PRODUCT_STATUS ({
    isEnable = '',
    productId = '',
    productCode = ''
  }) {
    return request({
      url: 'product/status',
      method: 'post',
      data: Object.assign({
        isEnable,
        productId,
        productCode
      }, pageQuery())
    })
  },
  /**
   * 产品管理-产品列表(查)
   * @param {} param0
   */
  PRODUCT_LIST ({
    pageNum = '',
    pageSize = '',
    startDate = '',
    endDate = '',
    productName = '',
    merchantId = '',
    channelCode = ''
  }) {
    return request({
      url: 'product/list',
      method: 'post',
      data: Object.assign({
        pageNum,
        pageSize,
        startDate,
        endDate,
        productName,
        merchantId,
        channelCode
      }, pageQuery())
    })
  },
  /**
   * 产品管理-产品添加(查)
   * @param {} param0
   */
  PRODUCT_ADD ({
    productName = '',
    merchantId = '',
    remark = '',
    productLogo = '',
    productSubHead = '',
    borrowType = '',
    loanType = '',
    minBorrowLimit = null,
    maxBorrowLimit = null,
    minLoanPeriod = null,
    maxLoanPeriod = null,
    loanRate = '',
    computeWay = '',
    applyCondition = '',
    productLink = '',
    distributeLink = '',
    applyMaterial = '',
    productLabelList = '',
    productChannelList = ''
  }) {
    return request({
      url: 'product/add',
      method: 'post',
      data: Object.assign({
        productName,
        merchantId,
        remark,
        productLogo,
        productSubHead,
        borrowType,
        loanType,
        loanRate,
        computeWay,
        applyCondition,
        productLink,
        distributeLink,
        applyMaterial,
        productLabelList,
        productChannelList
      },
      borrowType === '1' ? { maxBorrowLimit } : { minBorrowLimit, maxBorrowLimit },
      loanType === '1' ? { maxLoanPeriod } : { minLoanPeriod, maxLoanPeriod },
      pageQuery())
    })
  },
  /**
   * 产品管理-产品修改(查)
   * @param {} param0
   */
  PRODUCT_MOD ({
    productId = '',
    productCode = '',
    productName = '',
    merchantId = '',
    remark = '',
    productLogo = '',
    productSubHead = '',
    borrowType = '',
    loanType = '',
    minBorrowLimit = '',
    maxBorrowLimit = '',
    minLoanPeriod = '',
    maxLoanPeriod = '',
    loanRate = '',
    computeWay = '',
    applyCondition = '',
    productLink = '',
    distributeLink = '',
    applyMaterial = '',
    productLabelList = '',
    productChannelList = ''
  }) {
    return request({
      url: 'product/update',
      method: 'post',
      data: Object.assign({
        productId,
        productCode,
        productName,
        merchantId,
        remark,
        productLogo,
        productSubHead,
        borrowType,
        loanType,
        loanRate,
        computeWay,
        applyCondition,
        productLink,
        distributeLink,
        applyMaterial,
        productLabelList,
        productChannelList
      },
      borrowType === '1' ? { maxBorrowLimit } : { minBorrowLimit, maxBorrowLimit },
      loanType === '1' ? { maxLoanPeriod } : { minLoanPeriod, maxLoanPeriod },
      pageQuery())
    })
  },
  /**
     * 产品管理-商户列表()
     * @param {} param0
    */
  SELECT_MERCHANT () {
    return request({
      url: 'merchant/selectlist',
      method: 'post',
      data: Object.assign({
      }, pageQuery())
    })
  },
  /**
     * 产品管理-频道列表()
     * @param {} param0
    */
  SELECT_CHANNEL () {
    return request({
      url: 'channel/selectlist',
      method: 'post',
      data: Object.assign({
      }, pageQuery())
    })
  },
  /**
     * 产品管理-计算方式()
     * @param {} param0
    */
  SELECT_COMPUTE () {
    return request({
      url: 'compute/selectlist',
      method: 'post',
      data: Object.assign({
      }, pageQuery())
    })
  },
  /**
     * 产品管理-标签列表()
     * @param {} param0
    */
  SELECT_LABEL () {
    return request({
      url: 'label/selectlist',
      method: 'post',
      data: Object.assign({
      }, pageQuery())
    })
  },
  /**
     * 产品管理-标签列表()
     * @param {} param0
    */
  SELECT_COMBINE () {
    return request({
      url: 'product/combine/selectlist',
      method: 'post',
      data: Object.assign({
      }, pageQuery())
    })
  },
  /**
     * 商户管理-热门推荐()
     * @param {} param0
    */
  RECOMMEND_LIST ({
    pageNum = '',
    pageSize = '',
    startDate = '',
    endDate = '',
    merchantId = ''
  }) {
    return request({
      url: 'aproduct/list',
      method: 'post',
      data: Object.assign({
        pageNum,
        pageSize,
        startDate,
        endDate,
        merchantId
      }, pageQuery())
    })
  },
  /**
   * 推荐产品管理-产品添加(查)
   * @param {} param0
   */
  RECOMMEND_ADD ({
    productName = '',
    merchantId = '',
    remark = '',
    productLogo = '',
    productSubHead = '',
    borrowType = '',
    loanType = '',
    minBorrowLimit = null,
    maxBorrowLimit = null,
    minLoanPeriod = null,
    maxLoanPeriod = null,
    loanRate = '',
    computeWay = '',
    applyCondition = '',
    applyMaterial = '',
    productLabelList = '',
    productChannelList = '',
    productSort = '',
    costDescription = '',
    repayDescription = ''
  }) {
    return request({
      url: 'aproduct/add',
      method: 'post',
      data: Object.assign({
        productName,
        merchantId,
        remark,
        productLogo,
        productSubHead,
        borrowType,
        loanType,
        loanRate,
        computeWay,
        applyCondition,
        applyMaterial,
        productLabelList,
        productChannelList,
        productSort,
        costDescription,
        repayDescription
      },
      borrowType === '1' ? { maxBorrowLimit } : { minBorrowLimit, maxBorrowLimit },
      loanType === '1' ? { maxLoanPeriod } : { minLoanPeriod, maxLoanPeriod },
      pageQuery())
    })
  },
  /**
   * 推荐产品管理-产品修改(查)
   * @param {} param0
   */
  RECOMMEND_MOD ({
    productId = '',
    productCode = '',
    productName = '',
    merchantId = '',
    remark = '',
    productLogo = '',
    productSubHead = '',
    borrowType = '',
    loanType = '',
    productSort = '',
    minBorrowLimit = '',
    costDescription = '',
    repayDescription = '',
    maxBorrowLimit = '',
    minLoanPeriod = '',
    maxLoanPeriod = '',
    loanRate = '',
    computeWay = '',
    applyCondition = '',
    productLink = '',
    applyMaterial = '',
    productLabelList = '',
    productChannelList = ''
  }) {
    return request({
      url: 'aproduct/update',
      method: 'post',
      data: Object.assign({
        productId,
        productCode,
        productName,
        merchantId,
        remark,
        productLogo,
        productSubHead,
        borrowType,
        costDescription,
        repayDescription,
        loanType,
        productSort,
        loanRate,
        computeWay,
        applyCondition,
        productLink,
        applyMaterial,
        productLabelList,
        productChannelList
      },
      borrowType === '1' ? { maxBorrowLimit } : { minBorrowLimit, maxBorrowLimit },
      loanType === '1' ? { maxLoanPeriod } : { minLoanPeriod, maxLoanPeriod },
      pageQuery())
    })
  },
  /**
   * 产品管理-标签管理(修改状态)
   * @param {} param0
  */
  RECOMMEND_STATUS ({
    isEnable = '',
    productId = '',
    productCode = ''
  }) {
    return request({
      url: 'aproduct/status',
      method: 'post',
      data: Object.assign({
        isEnable,
        productId,
        productCode
      }, pageQuery())
    })
  }
}

export default productApi
