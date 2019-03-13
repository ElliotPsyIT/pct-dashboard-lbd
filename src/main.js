import Vue from 'vue'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import NProgress from 'nprogress'
import App from './App.vue'
import axios from 'axios'
import { apiConfig } from '@/utils'

//css
import "../node_modules/ag-grid/dist/styles/ag-grid.css"
import "../node_modules/ag-grid/dist/styles/ag-theme-balham.css"
import "../node_modules/nprogress/nprogress.css"

// ag grid enterprise
import 'ag-grid-enterprise'

// store
import store from './store/store'

// LightBootstrap plugin
import LightBootstrap from './light-bootstrap-main'

// router setup
import routes from './routes/routes'

// modal
import VModal from 'vue-js-modal'
Vue.use(VModal, {dynamic: true, dialog: true, injectModalsContainer: true}) 

// plugin setup
Vue.use(VueRouter)
Vue.use(LightBootstrap)

// tooltip mixin
import VTooltip from 'v-tooltip'
Vue.use(VTooltip)

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'nav-item active'
})

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
      // Start the route progress bar.
      NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

// allow router access within vuex
const unsync = sync(store, router)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  mounted() {   
    // who is the current user?
    const path = apiConfig.path //'pct.cgi'
    const params = 'format=who'
    // console.log('getting user, axios get: ', `${path}?${params}`)
    axios.get(`${path}?${params}`)
      .then(response => { 
        // console.log('return from who: ', response)
        const remote_user = response.data[0]
        if (remote_user != undefined) {
          this.$store.dispatch('setCurrentUser', {FirstName: remote_user.FirstName, LastName: remote_user.LastName})
        } else {
          this.$store.dispatch('setCurrentUser', {FirstName: 'No', LastName: 'User Retrieved'})
        }
      })
  }
})
