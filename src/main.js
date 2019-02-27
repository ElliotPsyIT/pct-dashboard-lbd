import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import App from './App.vue'
import axios from 'axios'

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

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  // beforeCreate() {
  //   console.log('initializing store ...')
  //   this.$store.commit('initialiseStore')
    
  // },
  created() {
    console.log('initializing store ...')
    this.$store.commit('initialiseStore')
    
  },
  mounted() {
    // in prod -- get user info as global
    // var currentUser = ''
    
    // var window_remote_user = (typeof window.remote_user !== 'undefined' || window.remote_user !== null) ?
    //   window.remote_user : null

    // if (window_remote_user) {
    //   console.log('got window.remote_user from sspi: ', window_remote_user)
    //   var currentUser = window.remote_user
    // }

    // if (currentUser) {    
    //   console.log('remote_user is: ', currentUser)
    //   var [domain, username] = currentUser.split("\\")
    //   this.$store.dispatch('setCurrentUser', {FirstName: domain, LastName: username})
    // } 
    // else {
    //   this.$store.dispatch('setCurrentUser', {FirstName: 'No', LastName: 'User Retrieved'})
    // }
    
    // get current user and set in store
    // axios.get('pct.cgi?format=t1&dtrng=20180101,20180201&sta3n=575,365')
    axios.get('pct.cgi?format=who')
      .then(response => { 
        // console.log('response.data is: ', response.data)
        const remote_user = response.data[0]
        if (remote_user != undefined) {
          this.$store.dispatch('setCurrentUser', {FirstName: remote_user.FirstName, LastName: remote_user.LastName})
        } else {
          this.$store.dispatch('setCurrentUser', {FirstName: 'No', LastName: 'User Retrieved'})
        }
      
      })
  }
})
