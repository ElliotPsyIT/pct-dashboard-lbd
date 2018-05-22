import Vue from 'vue'
import Vuex from 'vuex'

import siteNames from '../../static/sites.json'
import dateRange from '../../static/dateRange.json'

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
