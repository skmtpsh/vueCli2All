import loginApi from '@/api/login'
// import { setToken } from '@/utils/token'
import { Message } from 'element-ui'
// import path from 'path'
// import sideBar from '@/meta/sidebar'
import getSyncConfigRoute from '@/meta/addRoute'
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
            commit('SET_INFO', Object.assign(result.datas.userInfo, userInfo.type ? {systemOs: userInfo.type} : {}))
            // console.log(Object.assign(result.datas.userInfo, userInfo.type ? {systemOs: userInfo.type} : {}))
            resolve(getSyncConfigRoute(result.datas.menuList, result.datas.tokenKey))
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
