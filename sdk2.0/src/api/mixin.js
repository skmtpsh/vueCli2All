import request from '@/utils/request'
import commonQuery from '@/utils/commonQuery'

const getURLApi = {
  statusTelecomOperator () { // 运营商
    return request({
      url: 'authentication/operator',
      method: 'post',
      data: Object.assign({
      }, commonQuery())
    })
  },
  statusTaobao () { // 认证列表
    return request({
      url: 'authentication/taobao',
      method: 'post',
      data: Object.assign({
      }, commonQuery())
    })
  },
  statusChsi () { // 学历
    return request({
      url: 'authentication/education',
      method: 'post',
      data: Object.assign({
      }, commonQuery())
    })
  },
  statusInsure () { // 社保
    return request({
      url: 'authentication/insure',
      method: 'post',
      data: Object.assign({
      }, commonQuery())
    })
  },
  statusZhima () { // 芝麻
    return request({
      url: 'authentication/zhima',
      method: 'post',
      data: Object.assign({
      }, commonQuery())
    })
  }
}
export default getURLApi
