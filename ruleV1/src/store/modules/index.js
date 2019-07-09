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
          username: username,
          password: userInfo.password
        }).then(response => {
          const result = response.data
          if (result.code === 200) {
            // commit('SET_TOKEN', result.datas.tokenKey)
            commit('SET_INFO', Object.assign(result.datas.userInfo, userInfo.type ? {systemOs: userInfo.type} : {}))
            // console.log(Object.assign(result.datas.userInfo, userInfo.type ? {systemOs: userInfo.type} : {}))
            setToken(result.datas.tokenKey)
            setSide(result.datas.memuInfo)
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
