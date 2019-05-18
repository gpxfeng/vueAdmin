import Vue from 'vue'
import Vuex from 'vuex'
import app from './views/store/modules/app'
import user from './views/store/modules/user'
import permission from './views/store/modules/permission'
import getters from './views/store/getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission
  },
  getters
})

export default store

/* 新版cli 3.0
export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  }
}) */
