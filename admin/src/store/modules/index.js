import loginApi from '@/api/login'
import { setToken, setSide } from '@/utils/token'
import { Message } from 'element-ui'
// import sideBar from '@/meta/sidebar'
const user = {
  state: {
    info: {}
    // token: getToken(),
    // sidebar: {
    //   lists: []
    // }
  },
  mutations: {
    // SET_TOKEN: (state, token) => {
    //   state.token = token
    // },
    SET_INFO: (state, obj) => {
      state.info = obj
    }
    // SET_SIDEBAR_LIST: (state, lists) => {
    //   state.sidebar.lists = sideBar[lists]
    // }
  },
  actions: {
    // 用户名登录
    LoginByUsername ({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginApi['LOGININFO']({
          staffCode: username,
          staffPwd: userInfo.password
        }).then(response => {
          const result = response.data
          if (result.code === 200) {
            // commit('SET_TOKEN', result.datas.tokenKey)
            commit('SET_INFO', result.datas.userInfo)
            setToken(result.datas.tokenKey)
            setSide(result.datas.menuList)
            resolve()
          } else {
            Message.warning({
              message: result.message
            })
            reject(new Error('system error'))
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
