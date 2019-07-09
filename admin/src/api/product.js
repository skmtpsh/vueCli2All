import request from '@/utils/request'
import commonQuery from '@/utils/commonQuery'
import { getToken } from '@/utils/token'
const TOKEN = getToken()
const pageQuery = () => {
  return Object.assign({}, {tokenKey: TOKEN}, commonQuery())
}
/**
 * 产品列表
 */
const productApi = {
  PRODUCTLIST ({
    pageNum = 0,
    pageSize = 15,
    appId = ''
  }) {
    return request({
      url: 'busi/product/busi/info.cmd',
      method: 'post',
      data: Object.assign({
        pageNum,
        pageSize,
        appId
      }, pageQuery())
    })
  },
  /**
   * 请求一级/二级产品列表
   * @param {*} param0
   */
  PRODUCTLEVEL ({
    parentId = ''
  }) {
    return request({
      url: 'busi/product/level.cmd',
      method: 'post',
      data: Object.assign({
        parentId
      }, pageQuery())
    })
  },
  /**
   * 根据分类id查询所属产品
   * @param {*} param0
   */
  PRODUCTTYPE ({
    channelTypeId = ''
  }) {
    return request({
      url: 'busi/product/list/type.cmd',
      method: 'post',
      data: Object.assign({
        channelTypeId
      }, pageQuery())
    })
  },
  /**
   * 开通产品
   * @param {*} param0
   */
  PRODUCTADD ({
    appId = '',
    product = ''
  }) {
    return request({
      url: 'busi/product/liberate.cmd',
      method: 'post',
      data: Object.assign({
        appId,
        product
      }, pageQuery())
    })
  },
  /**
   * 查询计费类型列表
   * @param {*} param0
   */
  PRODUCTFEE () {
    return request({
      url: 'busi/product/list/fee.cmd',
      method: 'post',
      data: Object.assign({
      }, pageQuery())
    })
  },
  /**
   *启用关闭
   * @param {*} param0
   */
  PRODUCTALLOW ({
    appId = '',
    id = '',
    status = '',
    feeTypeId = '',
    startDate = '',
    endDate = '',
    channelId = ''
  }) {
    return request({
      url: 'busi/product/enable.cmd',
      method: 'post',
      data: Object.assign({
        appId,
        id,
        status,
        feeTypeId,
        startDate,
        endDate,
        channelId
      }, pageQuery())
    })
  }
}
export default productApi
