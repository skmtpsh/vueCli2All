import request from '@/utils/request'
import commonQuery from '@/utils/commonQuery'

const indexApi = {
  getIndex () { // 认证列表
    return request({
      baseURL: process.env.VUE_APP_BASE_API_SDK,
      url: 'authentication/index/status',
      method: 'post',
      data: commonQuery('sdk')
    })
  }
}
export default indexApi
