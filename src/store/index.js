import { startsWith } from 'core-js/core/string'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name:"",
    paper:[]
  },
  mutations: {
    changename(state,name){state.name = name},
    setpaper(state,paper){state.paper = paper}
  },
  actions: {
  },
  modules: {
  }
})
