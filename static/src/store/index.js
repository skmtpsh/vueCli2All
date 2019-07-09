// import Vue from 'vue'
import Vuex from 'vuex'
import web from './modules/index'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'
// Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    web
  },
  getters,
  plugins: [createPersistedState()]
})

export default store
