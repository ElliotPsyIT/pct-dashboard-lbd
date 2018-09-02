import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import App from './App.vue'

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
// plugin setup
Vue.use(VueRouter)
Vue.use(LightBootstrap)

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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  beforeCreate() {
		this.$store.commit('initialiseStore')
	}
})
