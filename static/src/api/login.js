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
    staffCode = 'wangshan',
    staffPwd = '123456'
  }) {
    return request({
      url: 'login/submit.cmd',
      method: 'post',
      data: Object.assign({
        staffCode,
        staffPwd
      }, pageQuery())
    })
  }
}
export default loginApi
