import request from '@/utils/request'
import commonQuery from '@/utils/commonQuery'
const pageQuery = () => {
  return Object.assign({}, commonQuery())
}
const loginApi = {
  LOGININFO  ({
    staffCode = 'liwenjie',
    staffPwd = '123456'
  }) {
    return request({
      url: 'login/submit',
      method: 'post',
      data: Object.assign({
        staffCode,
        staffPwd
      }, pageQuery())
    })
  }
}
export default loginApi
