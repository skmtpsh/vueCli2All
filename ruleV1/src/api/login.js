import request from '@/utils/request'
import commonQuery from '@/utils/commonQuery'
// import { getToken } from '@/utils/token'
// const TOKEN = getToken()
const pageQuery = () => {
  // return Object.assign({}, {tokenKey: TOKEN}, commonQuery())
  return Object.assign({}, commonQuery())
}
const loginApi = {
  LOGININFO  ({
    username = 'wangshan',
    password = '123456'
  }) {
    return request({
      url: 'login/submit',
      method: 'post',
      data: Object.assign({
        username,
        password
      }, pageQuery())
    })
  },
  LOGINSTUFF  ({
    staffCode = 'wangshan'
  }) {
    return request({
      url: 'login/find/functions/staffcode',
      method: 'post',
      data: Object.assign({
        staffCode
      }, pageQuery())
    })
  }
}
export default loginApi
