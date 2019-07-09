import request from '@/utils/request'
import commonQuery from '@/utils/commonQuery'
import { getToken } from '@/utils/token'
const TOKEN = getToken()
const pageQuery = () => {
  return Object.assign({}, {tokenKey: TOKEN}, commonQuery())
}
const countApi = {
  /**
   * 汇总计数
   * @param {} param0
   */
  STAS_COUNT () {
    return request({
      url: 'stas/count',
      method: 'post',
      data: Object.assign({
      }, pageQuery())
    })
  },
  /**
   * UV转换量统计
   * @param {} param0
   */
  TREND_UV ({
    indexUV = ''
  }) {
    return request({
      url: 'stas/trend/uv',
      method: 'post',
      data: Object.assign({
        indexUV
      }, pageQuery())
    })
  },
  /**
   * 甲方注册量统计
   * @param {} param0
   */
  TRNED_PROD ({
    indexProd = ''
  }) {
    return request({
      url: 'stas/trend/prod',
      method: 'post',
      data: Object.assign({
        indexProd
      }, pageQuery())
    })
  },
  /**
   * 贷超总活跃量统计
   *
   * @param {} param0
   */
  STAS_LIST ({
    indexList = '1',
    orderWay = '1',
    pageNum = '1',
    pageSize = '10'
  }) {
    return request({
      url: 'stas/list',
      method: 'post',
      data: Object.assign({
        indexList,
        orderWay,
        pageNum,
        pageSize
      }, pageQuery())
    })
  }
}
export default countApi
