<template>
  <!-- <transition name="fade" mode="out-in"> -->
  <div>
  <nav class="navbar navbar-expand-lg" style="position: fixed; z-index: 1000; min-width: 100vw; ">
    <div class="container-fluid">

      <!-- placeholder for provider filter -->
      <fade-transition :duration="duration">
        <!-- <span v-if="showProvider()" class="px-2" > -->
        <!-- <span v-if="selectedProvider" class="px-2" >
          <a class="navbar-brand px-2" href="#" 
             style="color: black; background-color: lightgrey;"
          >{{selectedProvider}}</a>
        </span> -->
        <!-- <span v-if="institutionsSelected" class="px-2" > -->
        <!-- <span v-if="siteSelected" class="px-2 " >
          <a class="" href="#" @click="filterInstitutions"
             style="color: black; background-color: lightgrey; padding: 5px; border-radius: 5px;"
          >Filter Data for {{capitalizeFirstLetter(currentpage)}}s </a>
        </span> -->
      </fade-transition>

      <!-- <button type="button"
              class="navbar-toggler navbar-toggler-right"
              :class="{toggled: $sidebar.showSidebar}"
              aria-controls="navigation-index"
              aria-expanded="false"
              aria-label="Toggle navigation"
              @click="toggleSidebar">
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
      </button> -->
      
      <!-- <div class="collapse navbar-collapse " > -->
      <div class="collapse navbar-collapse " >

        <!-- <ul class="nav navbar-nav py-0"> -->
        <ul class="nav navbar-nav py-0" >

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
          <!-- <li class="nav-item py-0 px-4">
            <form class="form-horizontal">
              <div class="form-group "> 
              
                  <div style="max-width: 450px">
                    <treeselect v-model="value"  :options="options" placeholder="Select Station"/>
                  </div>

              </div>
            </form>
          </li> -->
          <!-- <li class="nav-item py-0 mr-2">
          <form class="form-horizontal"> 
            <div class="form-group">  
              <label for="station">  
                <div class="px-2">
                  <span class="h5 px-2"><strong>Station</strong></span> 
                </div> 
                <div style="max-width: 450px">
                  <treeselect v-model="value" :multiple="true" :options="options" />
                </div>
              </label>
             </div>
           </form>
          </li> -->
          <!-- <li class="nav-item py-0 mr-2 " :class="{hide: !canFilterByProvider}">
            <span v-if="siteSelected" class="px-2 "   >
              <a class="fixed-plugin"  href="#" @click.prevent="filterInstitutions"
                style="margin-left: 17px; text-decoration: underline; color: black; background-color: lightgrey; padding: 5px; border-radius: 5px; font-size: .7rem; border-style: solid;"
              >Sites Filter for {{capitalizeFirstLetter(currentpage)}}s </a>
            </span>
          </li> -->
          <li class="nav-item py-0 mr-2">
          <form class="form-inline">
            <div class="form-group">  
              <!-- <label for="station"> -->
                <!-- <div class="px-2">
                  <span class="h5 "><strong>Station</strong></span>  
                </div> -->
                <div>
                <select v-model="siteSelected" class="form-control" id="station">
                  <option value="" disabled>Select Medical Center...</option>
                  <option v-for="site in siteNames" :value="site.StaPa" :key="site.StaPa">
                    {{ site.InstitutionNameLong}}
                  </option>
                </select>
                </div>
              <!-- </label> -->
            </div>
          </form>
          </li>
          <li class="nav-item py-0">
          <form class="form-inline">
            <div class="form-group "> <!-- pt-1 pl-3 ml-4 -->
              <!-- <label for="dataRange"> -->
                <!-- <div class="px-2">
                  <span class="h5 "><strong>Date Range</strong></span>
                </div> -->
                <div>
                  <select v-model="rangeSelected" class="form-control" id="dateRange">
                    <option value="" disabled>Select Dates ...</option>
                    <option v-for="range in dateRanges" :value="range.name" :key="range.name">
                        {{ range.dateRange }}
                      </option>
                  </select>
                </div>
              <!-- </label> -->
            </div>
          </form>
          </li>
          <li v-show="selectedSiteHavingInstitutions" class="nav-item py-0">  <!-- border-style: solid; {{capitalizeFirstLetter(currentpage)}}s -->
             <span v-if="siteSelected" class="" :class="{hide: !canFilterByProvider }"  >
              <a name="siteFilterClick" href="#" @click.prevent="filterInstitutionsShowHide"
                style="margin-left: 12px; color: #696969; background-color: rgba(255, 255, 255, 0.96); padding: 8px; border-radius: 5px; font-size: 1rem; border: 1px solid; border-color: #cbd5e0;" 
              >SITE DATA FILTER </a>
             </span>
          </li>
          <li v-if="!canFilterByProvider" class="nav-item py-0">
            <span :class="{hide: selectedPage == 'Overview' || selectedPage === 'Definitions'}" style="margin-left: 12px; color: #D3D3D3; background-color: rgba(255, 255, 255, 0.96); padding: 8px; border-radius: 5px; font-size: 1rem; border: 1px solid; border-color: #cbd5e0;" >
              Current Page Institution Filter Disabled
            </span>
          </li>
        </ul>
        <!-- <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="#">
              {{ selectedSite }}   {{ selectedRange }}
            </a>
          </li>
          <li class="nav-item">
          </li>
          <drop-down title="Dropdown">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something</a>
            <div class="divider"></div>
            <a class="dropdown-item" href="#">Separated link</a>
          </drop-down>
          <li class="nav-item">
            <a href="#" class="nav-link">
              Log out
            </a>
          </li>
        </ul> -->
      </div>
    </div>
  </nav>
  <!-- <nav class="navbar navbar-expand-lg" style="position: fixed; margin-top: 43px; z-index: 1000; min-width: 100vw; ">
    <span v-if="siteSelected" class="px-2 "   >
      <a href="#" @click.prevent="filterInstitutions"
        style="margin-left: 17px; text-decoration: underline; color: black; background-color: lightgrey; padding: 5px; border-radius: 5px; font-size: .7rem; border-style: solid;"
      >Sites Filter for {{capitalizeFirstLetter(currentpage)}}s </a>
    </span>
  </nav> -->
  </div>
</template>
<script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  import NProgress from 'nprogress'

  import {FadeTransition} from 'vue2-transitions'

   // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  export default {
    components: {
      FadeTransition,
      Treeselect,
    },
    
    // beforeMount  () {
    //   console.log('topnav beforeMount, selectedSite is: ', this.selectedSite)
    // },
    // watch: {
    //   selectedSite : function(site, oldSite){
    //     console.log('oldVal: ', oldSite)
    //     console.log('val: ', site)
    //     this.setSelectedSite(site)
    //   },
    //   selectedRange : function(range, oldRange){
    //     // console.log('oldVal: ', oldRange)
    //     // console.log('val: ', range)
    //     this.setSelectedRange(range)
    //   }
    // },
    // created () {
    //   console.log('topnav created siteSelected: ', this.selectedSite)
    //   if (this.selectedSite ) { 

    //   }
    //   if (this.selectedRange) {

    //   }
    // },
    watch:{
      siteSelected (val) {
        // my new value in val. Perform your
        // select update methods here
         NProgress.start()
        // console.log('watcher for siteSelected triggered with new value of: ', val)
         NProgress.done()
      },
      rangeSelected (val) {
        // my new value in val. Perform your
        // select update methods here
         NProgress.start()
        // console.log('watcher for siteSelected triggered with new value of: ', val)
         NProgress.done()
      },
      // selectedProvider (newVal, oldVal) {
      //   // when triggered, if there was a previous provider
      //   // and allow the showProvider method to animate in the new provider
      //   // console.log('watch on selectedProvider is triggered with: ', this.selectedProvider)
      //   // console.log('this is the newVal ', newVal)
      //   // console.log('this is the oldVal ', oldVal)
        
      // }
      
    },
    computed: {

      ...mapState([
        'siteNames',
        'dateRanges',
        'selectedSite',
        'selectedRange',
        'selectedProvider',
        'selectedInstitutions',
        'currentpage',
      ]),
      ...mapGetters([
        'canFilterByProvider',
      ]),
      siteSelected: {
        get () {
          // console.log('siteSelected get! ', this.selectedSite)
          // return this.$store.selectedSite
          return this.selectedSite
        },
        set (site) {
          // console.log('siteSelected site! ', site)
          // this.$store.dispatch('setSelectedSite', site)
          this.setSelectedSite(site)
        }   
      },
      rangeSelected: {
        get () {
          // return this.$store.selectedRange
          return this.selectedRange
        },
        set (range) {
          // this.$store.dispatch('setSelectedRange', range)
          this.setSelectedRange(range)
        }   
      },
      // determine current page
      selectedPage () {
        let { name } = this.$route
        console.log('name from $route is: ', name)
        // return this.capitalizeFirstLetter(name)
        return name
      },
      institutionsSelected () {
        return this.selectedInstitutions.length > 0 || false
      },
      // field to show or hide institution filter
      selectedSiteHavingInstitutions () {
        return ! /NATIONAL|VISN/.test(this.selectedSite)
      }
    },
    data () {
      return {
        activeNotifications: false,
        // selectedSite: '',
        // selectedRange: ''
        shouldStick: true,
        duration: 1000,
        showName: false,
        previousProvider: false,
        newProvider: false,
        // define the default value
        value: null,
        // define options
        options:[
        {id:"402",label:"(V01) (402) VA MAINE HCS"},
        {id:"405",label:"(V01) (405) WHITE RIVER JCT VAMROC"},
        {id:"518",label:"(V01) (518) EDITH NOURSE ROGERS VAMC"},
        {id:"523",label:"(V01) (523) BOSTON HCS VAMC"},
        {id:"608",label:"(V01) (608) MANCHESTER VAMC"},
        {id:"631",label:"(V01) (631) VA CNTRL WSTRN MASSCHUSETS HCS"},
        {id:"650",label:"(V01) (650) PROVIDENCE VAMC"},
        {id:"689",label:"(V01) (689) CONNECTICUT HCS"}
        ],
        // normalizer(node) {
        //   console.log('node is: ', node)
        //   return {
        //     id: node.StaPa,
        //     label: node.InstitutionNameLong
        //   }
        // }
      }
    },
    methods: {
      // showProvider(val) {
      //   // console.log('showProvider is triggered with this selectedProvider: ', this.selectedProvider)

      //   let previousProviderSelected = this.previousProvider 
      //   // console.log('previousProviderSelected: ', previousProviderSelected)
      //   let newProviderSelected = this.newProvider
      //   // console.log('newProviderSelected: ', previousProviderSelected)
      //   let pageLoad = !previousProviderSelected  && !newProviderSelected
      //   console.log('pageload: ', pageLoad)        
      //   no previous provider selected - either page load, or new provider selected
      //   return this.selectedProvider
      // },
      
      ...mapActions([
          'setSelectedSite',
          'setSelectedRange',
          'INSTITUTIONS_FILTER_SHOWHIDE'
      ]),
      // trigger action to open sidebar to select/filter institutions
      filterInstitutionsShowHide () {
        // console.log('triggered filterInstitutionsShowHide in TopNavBar to call action INSTITUTIONS_FILTER')
        this.INSTITUTIONS_FILTER_SHOWHIDE()
      },
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
    }
  }

</script>
<style scoped>

 /* fade page in and out when site changes */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .1s
  }

  .fade-enter,
  .fade-leave-to
    /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0
  }

   .fixed-plugin {
    position: absolute;
    top: 50px;
    left: 0;
    width: 150px;
    /* background: rgba(0, 0, 0, .3); */
    background: transparent;
    z-index: 1031;
    border-radius: 8px 0 0 8px;
    border-color: grey;
    border-width: 1px;  
    border-style: solid none solid solid;
    text-align: center;
  }

   .fixed-plugin .dropdown-menu {
    right: 80px;
    /*left: auto; */
    width: 530px; /*290px - widen sidebar here, and need to modify left in large scale @media query; */
    border-radius: 10px;
    padding: 10px;
    overflow: scroll;
    max-height: 400px;
  }

  .fixed-plugin .dropdown-menu:after, .fixed-plugin .dropdown-menu:before {
    right: 10px;
    margin-left: auto;
    left: auto;
  }
  
</style>
