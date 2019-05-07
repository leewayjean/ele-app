import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    province:"",
    city:""
  },
  getters:{
    address(state){
      return state.province + state.city;
    }
  },
  mutations: {

  },
  actions: {

  }
})
