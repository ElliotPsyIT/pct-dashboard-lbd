<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <!-- <a class="navbar-brand" href="#">{{routeName}}</a> -->
      <button type="button"
              class="navbar-toggler navbar-toggler-right"
              :class="{toggled: $sidebar.showSidebar}"
              aria-controls="navigation-index"
              aria-expanded="false"
              aria-label="Toggle navigation"
              @click="toggleSidebar">
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
      </button>
      <div class="collapse navbar-collapse ">
        <ul class="nav navbar-nav mx-auto">
          <!-- <li class="nav-item">
            <a class="nav-link" href="#" data-toggle="dropdown">
              <i class="nc-icon nc-palette"></i>
            </a>
          </li> -->
          <!-- <drop-down tag="li">
            <template slot="title">
              <i class="nc-icon nc-planet"></i>
              <b class="caret"></b>
              <span class="notification">5</span>
            </template>
            <a class="dropdown-item" href="#">Notification 1</a>
            <a class="dropdown-item" href="#">Notification 2</a>
            <a class="dropdown-item" href="#">Notification 3</a>
            <a class="dropdown-item" href="#">Notification 4</a>
            <a class="dropdown-item" href="#">Another notification</a>
          </drop-down> -->
          <!-- <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nc-icon nc-zoom-split"></i>
              <span class="d-lg-block">&nbsp;Search</span>
            </a>
          </li> -->
          <!-- <drop-down title="Stations">
            <a class="dropdown-item" href="#">VISN 1 Station 1</a>
            <a class="dropdown-item" href="#">VISN 1 Station 2</a>
            <a class="dropdown-item" href="#">VISN 1 Station 3</a>
            <a class="dropdown-item" href="#">VISN 1 Station 4</a>
            <a class="dropdown-item" href="#">VISN 1 Station 5</a>
            <div class="divider">Visn 2</div>
            <a class="dropdown-item" href="#">VISN 2</a>
          </drop-down>
          <drop-down title="Date Range">
            <a class="dropdown-item" href="#">Last Month</a>
            <a class="dropdown-item" href="#">Last 3 Months</a>
            <a class="dropdown-item" href="#">Last 6 Months</a>
            <div class="divider"></div>
            <a class="dropdown-item" href="#">Last Year</a>
          </drop-down> -->
          <li class="nav-item">
          <form class="form-inline">
            <div class="form-group pt-1">
              <label for="station">
                <span class="h4 pr-3 mb-4"><strong>Station</strong></span>
                <select v-model="selectedSite" class="form-control" id="station">
                  <option value="">Select Medical Center...</option>
                  <option v-for="site in sites" :value="site.StaPa" :key="site.StaPa">
                    {{ site.InstitutionNameLong}}
                  </option>
                </select>
              </label>
            </div>
          </form>
          </li>
          <li class="nav-item">
          <form class="form-inline">
            <div class="form-group pt-1 pl-3 ml-4">
              <label for="dataRange">
                <span class="h4 pr-3 mb-4"><strong>Date Range</strong></span>
              <select v-model="selectedRange" class="form-control" id="dateRange">
                <option value="">Select Date Range ...</option>
                <option v-for="range in dates" :value="range.name" :key="range.name">
                    {{ range.dateRange }}
                  </option>
              </select>
              </label>
            </div>
          </form>
          </li>
          </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="#">
              {{ selectedSite }}
            </a>
          </li>
          <li class="nav-item">
          </li>
          <!-- <drop-down title="Dropdown">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something</a>
            <div class="divider"></div>
            <a class="dropdown-item" href="#">Separated link</a>
          </drop-down> -->
          <li class="nav-item">
            <!-- <a href="#" class="nav-link">
              Log out
            </a> -->
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
  import siteNames from '../../../../static/sites.json'
  import dateRange from '../../../../static/dateRange.json'

  export default {
    computed: {
      routeName () {
        const {name} = this.$route
        return this.capitalizeFirstLetter(name)
      },
    },
    data () {
      return {
        activeNotifications: false,
        sites: siteNames,
        dates: dateRange,
        selectedSite: '',
        selectedRange: ''
      }
    },
    methods: {
      capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      toggleNotificationDropDown () {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown () {
        this.activeNotifications = false
      },
      toggleSidebar () {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar () {
        this.$sidebar.displaySidebar(false)
      }
    },
    watch: {
      selectedSite : function(val, oldVal){
        console.log('val: ', val)
        console.log('oldVal: ', oldVal)
      },
      selectedRange : function(val, oldVal){
        console.log('val: ', val)
        console.log('oldVal: ', oldVal)
      }
    }
  }

</script>
<style>

</style>
