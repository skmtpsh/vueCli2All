import request from '@/utils/request'
import commonQuery from '@/utils/commonQuery'
const ajx = (apiUrl, data = {}, ver = 'V2') => {
  return request({
    baseURL: process.env.VUE_APP_BASE_API_V2,
    url: apiUrl,
    method: 'post',
    data: Object.assign(
      {},
      data,
      commonQuery(ver)
    )
  })
}
const indexApi = {
  /**
  * 发现页-栏目下文章、热门话题、热门资讯列表查询(APP端)
  */
  async appArticleList ({
    listType = 'column',
    columnCode = '',
    pageNum = 0,
    pageSize = 10
  }) {
    return ajx('app/article/list', {
      listType,
      columnCode,
      pageNum,
      pageSize
    })
  },
  /**
  * APP发现页-栏目列表接口
  */
  async appArticleDetail ({
    id = ''
  }) {
    return ajx('app/article/detail', {
      id
    })
  }
}

export default indexApi
