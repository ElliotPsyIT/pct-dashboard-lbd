import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedSite: '',
    selectedRange: ''
  },
  getters: {
    selectedSite (state) {
      return state.selectedSite
    }
  },
  actions: {
    SET_SELECTED_SITE (context, site) {
      context.commit('SET_SELECTED_SITE', site)
    }
  },
  mutations: {
    SET_SELECTED_SITE (state, site) {
      state.selectedSite = site
    }
  }

})
