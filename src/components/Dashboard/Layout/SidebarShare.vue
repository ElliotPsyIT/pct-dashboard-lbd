<template>
  <div class="fixed-plugin" style="position: fixed; width: 35px;" v-click-outside="closeDropDown" :class="{hide: !canFilterByProvider}">
    <div class="dropdown show-dropdown" :class="{show: isOpen}" >
        <!-- options to show on sidebar -->
      <div class="image-stack" style="margin-top: 10px;" @click="toggleProviders">
        <div class="image-stack__item image-stack__item--top">
          <!-- <i class="fa fa-user fa-2x" > </i> -->
          <i class="fa fa-user" > </i>

        </div>
        <div class="image-stack__item image-stack__item--bottom">
          <!-- <i class="fa fa-user fa-2x" > </i> -->
          <i class="fa fa-user" > </i>
        </div>
      </div>
      <p style="text-transform: uppercase; font-size: .6rem; font-weight: normal;">Staff</p>
      <div class="image-stack" @click="toggleSites">
        <div class="image-stack__item image-stack__item--top">
          <!-- <i class="fa fa-building fa-2x" > </i> -->
          <i class="fa fa-building" > </i>
        </div>
        <div class="image-stack__item image-stack__item--bottom">
          <!-- <i class="fa fa-building fa-2x" > </i> -->
          <i class="fa fa-building" > </i>
        </div>
      </div>
      <p style="text-transform: uppercase; font-size: .6rem; font-weight: normal;">Sites</p>

    
      <!-- How Sidebar Works -->
      <!--    when =sidebar icon clicked -- v-if to determine what data to show --> 
      <!-- How to Modify Sidebar Size and Placement  -->
      <!--    style left: -303px width: 290px is base from _sidebar-and-main-panel.scss -->
      <!--    increase negative left to widen dropdown to left, and increase positive width to widen right -->
      <ul class="dropdown-menu" style="left: -453px !important; width: 440px; margin-top: 10px;">
        <!-- {{ institutions }} -->
        <div v-if="chooseProvider">
          <li  class="header-title">Providers</li>
          <div v-for="provider in providers" :key="provider.STAFFSID" ref="listProviders">
            <input type=checkbox id="provider.STAFFNAME" @click="selectProvider(provider.STAFFNAME)"/>
            <label :for="provider.STAFFNAME">{{ provider.STAFFNAME }}</label>
          </div>
        </div>
        <!-- <div v-if="chooseSite">
          <li  class="header-title">Institutions</li>
          <div v-for="institution in institutions" :key="institution.InstitutionName" ref="listInstitutions">
            <input type=checkbox id="institution.InstitutionName" @click="selectInstitution(institution.InstitutionName)"/>
            <label :for="institution.InstitutionName">{{ institution.InstitutionName }}</label>
          </div>
        </div> -->

        <!-- Use treeselect as alternative to using text boxes -->
        <div v-if="chooseSite">
          <div style="text-align: center; margin-bottom: 10px;">
            {{ selectedSiteName.StaPa}} {{ selectedSiteName.InstitutionName }} 
          </div>
          <li style="width: 100%; height: auto;">
            <treeselect
            v-model="value"
            :multiple="true"
            :options="options"
            :load-options="loadOptions"
            placeholder="Select Sites to Filter Data on This Page ..."
            :alwaysOpen=true
            @input="selectInstitutions"
            >
            </treeselect>
          </li>
        </div>
        <!-- <li class="header-title">Additional Section Placeholder</li> -->
        <!-- <li v-for="image in images"
            :key="image.src"
            :class="{active: image.active}">
          <a class="img-holder switch-trigger dropdown-item">
            <img @click="changeSidebarImage(image)"
                 :src="image.src"
                 alt="..."></a>
        </li> -->
        <!-- <li class="button-container">
          <div class="">
            <a :href="links.download" class="btn btn-info btn-block btn-fill">Free Download</a>
          </div>
        </li> -->

        <!-- <li class="button-container">
          <div class="">
            <a :href="links.documentation" target="_blank" class="btn btn-danger btn-block btn-fill">Documentation</a>
          </div>
        </li> -->

        <!-- <li class="header-title">A Message here!</li> -->

        <!-- <li class="button-container">
          <social-sharing url="https://cristijora.github.io/vue-light-bootstrap-dashboard/" inline-template
                          title="Vue Light Bootstrap Dashboard - Free Admin Template for Vue.js"
                          hashtags="vuejs, dashboard, bootstrap" twitter-user="creativetim">
            <div>
              <network network="facebook" class="btn btn-facebook btn-icon">
                <i class="fa fa-fw fa-facebook"></i>
              </network>
              <network network="pinterest" class="btn btn-pinterest btn-icon">
                <i class="fa fa-fw fa-pinterest"></i>
              </network>
              <network network="twitter" class="btn btn-twitter btn-icon">
                <i class="fa fa-fw fa-twitter"></i>
              </network>
            </div>
          </social-sharing>
        </li> -->

        <!-- <li class="button-container">
          <gh-btns-star slug="cristijora/vue-light-bootstrap-dashboard" show-count></gh-btns-star>
          <gh-btns-fork slug="cristijora/vue-light-bootstrap-dashboard" show-count></gh-btns-fork>
        </li> -->

      </ul>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'

import Treeselect from '@riophae/vue-treeselect'
import { LOAD_ROOT_OPTIONS} from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    components: {
      Treeselect
    },
    computed: {
      ...mapGetters([
        // 'siteProviderList',
        'siteProviders','siteProviderSelected','canFilterByProvider',
        'siteInstitutions'
      ]),

      ...mapState([
        'currentpage','selectedSite','siteNames'
      ]),

     selectedSiteName () {
        return this.siteNames.find(o => o.StaPa === this.selectedSite)
     }

    },
    props: ['color', 'image'],
    data () {
      return {
        chooseProvider: false,
        chooseSite: false,
        enableProviderIcon: true,
        selectedProvider: '',
        previousProvider: '',
        isOpen: false,
        providers: [],
        institutions: [],
        links: {
          documentation: 'https://cristijora.github.io/vue-light-bootstrap-dashboard/documentation/#/getting-started',
          download: 'https://github.com/cristijora/vue-light-bootstrap-dashboard/archive/master.zip'
        },
        sidebarColors: [
          {color: '', active: false},
          {color: 'azure', active: false},
          {color: 'green', active: false},
          {color: 'blue', active: true},
          {color: 'orange', active: false},
          {color: 'red', active: false},
          {color: 'purple', active: false}
        ],
        images: [
          {src: 'static/img/sidebar-1.jpg', active: false},
          {src: 'static/img/sidebar-3.jpg', active: false},
          {src: 'static/img/sidebar-4.jpg', active: false},
          {src: 'static/img/sidebar-5.jpg', active: true}
        ],
        // for treeselect
        value: null,
        options: null, // signals delayed root level options - see optionLoader below
      }
    },
    mounted() {
      this.PROVIDER_INFO() //
      // console.log('this.currentpage is: ', this.currentpage )
      this.GET_INSTITUTIONS()
    },
    methods: {
      ...mapActions([
          'PROVIDER_INFO','PROVIDER_SELECTED','GET_INSTITUTIONS'
        ]), 
      loadOptions({ action, parentNode, callback}) {
        if (action === LOAD_ROOT_OPTIONS) {
          // this is the delayed load of the treeselect options 
          this.options = this.institutions
                   
          callback() // treeselect internal callback signalling ready
        }
      },
      // assign store sites and provider lists to local data vars
      institutionlist () {
        // console.log('in institutionlist method, this.siteInstitutions getter is: ', this.siteInstitutions)
        this.institutions = this.siteInstitutions
      },
      providerlist () {
        // console.log('providerlist method was called!')
        this.providers = [...new Set(this.siteProviders)]
      // console.log('in providersList after uniqued and providers is: ', this.providers)
        this.enableProviderIcon = this.canFilterByProvider
        // console.log('in SidebarShare enableProvider is: ', this.enableProviderIcon)
        // console.log('chooseSite is: ', this.chooseSite)
        // console.log('chooseProvider is: ', this.chooseProvider)
      },
      // set flags for sites and provider for determine which list to show in template
      toggleSites () {
        // console.log('i am toggleSites, and here this.siteInstitutions getter is:', this.siteInstitutions)
        if (this.chooseSite == true) {
          // toggle the chooseSite flag
          this.chooseSite = false
          this.isOpen = false
        } else {
          this.chooseSite = true
          this.isOpen = true
        }

        this.chooseProvider = false
        // get the institution data into local data var
        this.institutionlist()
      },
      toggleProviders () {
       if (this.chooseProvider == true) {
          // toggle the chooseSite flag
          this.chooseProvider = false
          this.isOpen = false
        } else {
          this.chooseProvider = true
          this.isOpen = true
        }
        // console.log('clicked toggleDropDown')
        // console.log('this.provider is: ', this.provider)
        // console.log('this.previousProvider is: ', this.previousProvider)
        //identify list of providers
        
         this.chooseSite = false
         // get provider data into local data var
        this.providerlist()
 
        // only close if a provider was set (previousProvider) and is now unset (null)
        // if (this.previousProvider == null) {
        //   this.isOpen = !this.isOpen
        // } else {
        //   this.isOpen = true
        // }
      },
      selectInstitutions (institutionSIDs) {
        console.log('selected site InstitutinoName: ', this.selectedSiteName.InstitutionName)
        console.log('selected site StaPa: ', this.selectedSiteName.StaPa)
        console.log('institutions being selected: ', institutionSIDs)

      },
      // support for the provider mini-application work flow - selecting and deselecting
      selectProvider (provider) {
        // clean the provider name
        provider = provider.trim()
        // color the label to show selected
        this.$refs.listProviders.map(p => {
          if (p.innerText.trim() == provider.trim() ) {// it's the clicked provider
            // console.log('looking at this label style', p.childNodes[0].nextElementSibling.style) 
            p.childNodes[0].nextElementSibling.style.background = 'lightgrey'
          }
        })
        // set the previous provider for later comparision w/ current provider
        let previous = this.previousProvider

        if (!previous) { 
          // if there's no previousProvider, set it as current provider
          this.previousProvider = provider
          this.PROVIDER_SELECTED(provider) // action to set in store
        } 
        else if (previous != provider) { 
          // uncheck previous. leaving one box checked at a time
          this.$refs.listProviders.map(p => {
            if (p.innerText.trim() == previous.trim()) {
              // console.log('p.childNodes are: ', p.childNodes)
              // console.log('p.childNodes[0].nextElementSibling.innerText is: ', p.childNodes[0].nextElementSibling.innerText )
              p.childNodes[0].checked = false
              p.childNodes[0].nextElementSibling.style.background = ''
            }
          })
          // set previous provider, and update the current provider
          this.previousProvider = provider
          this.PROVIDER_SELECTED(provider) // action to set in store
        } 
        else { 
          // there's a previous provider and is same as selected provider
          this.previousProvider = null
          this.PROVIDER_SELECTED(null) // action to set in store

          this.$refs.listProviders.map(p => {
          if (p.innerText.trim() == provider.trim() ) {// it's the clicked provider
            // make text red
            // console.log('looking at this label style', p.childNodes[0].nextElementSibling.style) 
            p.childNodes[0].nextElementSibling.style.background = ''
          }
        })
        }
      },
      uncheckAll () { // in progress, only need if button needed to go to site level
        this.PROVIDER_SELECTED(null)
        this.selectedProvider = null
      },
      closeDropDown () {
        this.isOpen = false
      },
      // from original sidebar change of colors and images
      toggleList (list, itemToActivate) {
        list.forEach((listItem) => {
          listItem.active = false
        })
        itemToActivate.active = true
      },
      changeSidebarBackground (item) {
        this.$emit('update:color', item.color)
        this.toggleList(this.sidebarColors, item)
      },
      changeSidebarImage (item) {
        this.$emit('update:image', item.src)
        this.toggleList(this.images, item)
      }
    }
  }
</script>

<style>
  .hide {
    display: none;
  }

/* OVERLAP THE FA IMAGES */
  /* clearfix */
.image-stack::after {
  content: ' ';
  display: table;
  clear: both;
}

.image-stack__item--top {
    float: left;
    width: 85%;
    margin-right: -100%;
    padding-top: 15%; /* arbitrary */
    position: relative;
    z-index: 1;
}

.image-stack__item--bottom {
    float: right;
    width: 75%;
}

</style>

<style lang="scss">
  @import "~assets/sass/lbd/variables";
  /* fixed plugin on the right */
  .fixed-plugin li > a,
  .fixed-plugin .badge {
    transition: all .34s;
    -webkit-transition: all .34s;
    -moz-transition: all .34s;
  }

  .fixed-plugin {
    position: absolute;
    top: 150px;
    right: 0;
    width: 64px;
    // background: rgba(0, 0, 0, .3);
    background: transparent;
    z-index: 1031;
    border-radius: 8px 0 0 8px;
    border-color: grey;
    border-width: 1px;  
    border-style: solid none solid solid;
    text-align: center;
  }

  .fixed-plugin .fa-cog {
    color: #FFFFFF;
    padding: 10px;
    border-radius: 0 0 6px 6px;
    width: auto;
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

  .fixed-plugin .fa-circle-thin {
    color: #FFFFFF;
  }

  .fixed-plugin .active .fa-circle-thin {
    color: #00bbff;
  }

  .fixed-plugin .dropdown-menu > .active > a,
  .fixed-plugin .dropdown-menu > .active > a:hover,
  .fixed-plugin .dropdown-menu > .active > a:focus {
    color: #777777;
    text-align: center;
  }

  .fixed-plugin img {
    border-radius: 0;
    width: 100%;
    margin: 0 auto;
  }

  .fixed-plugin .badge,
  .fixed-plugin .badge:empty{
    border: 3px solid #FFFFFF;
    border-radius: 50%;
    cursor: pointer;
    display: inline-block;
    height: 28px;
    margin-right: 5px;
    position: relative;
    width: 28px;
  }

  .fixed-plugin .badge.active,
  .fixed-plugin .badge:hover {
    border-color: #00bbff;
  }

  .fixed-plugin .badge-white {
    background-color: #FFFFFF;
  }

  .fixed-plugin .badge-blue {
    background-color: #35495E;
  }

  .fixed-plugin .badge-azure {
    background-color: $new-blue;
  }

  .fixed-plugin .badge-green {
    background-color: $new-green;
  }

  .fixed-plugin .badge-orange {
    background-color: $new-orange;
  }

  .fixed-plugin .badge-purple {
    background-color: $new-purple;
  }

  .fixed-plugin .badge-red {
    background-color: $new-red;
  }

  .fixed-plugin h5 {
    font-size: 14px;
    margin: 10px;
  }

  .fixed-plugin .dropdown-menu li {
    display: block;
    padding: 5px 5px;
    width: 25%;
    float: left;
    text-align: center;
  }

  .fixed-plugin li.adjustments-line,
  .fixed-plugin li.header-title,
  .fixed-plugin li.button-container {
    width: 100%;
    min-height: inherit;
  }

  .fixed-plugin li.button-container {
    height: auto;
  }

  .fixed-plugin #sharrreTitle {
    text-align: center;
    padding: 10px 0;
    height: 50px;
  }

  .fixed-plugin li.header-title {
    height: auto;
    padding: 0;
    line-height: 35px;
    font-size: 12px;
    font-weight: 600;
    text-align: center;
    text-transform: uppercase;
  }

  .fixed-plugin .adjustments-line p {
    // float: left;
    display: inline-block;
    margin-bottom: 0;
    font-size: 1em;
  }

  .fixed-plugin .adjustments-line .switch {
    float: right;
  }

  .fixed-plugin .dropdown-menu > li.adjustments-line > a {
    padding-right: 0;
    padding-left: 0;
    border-bottom: 1px solid #ddd;
    margin: 0;
    padding-top: 0;
  }

  .fixed-plugin .gh-button-container {
    float: none;
    margin: 0;
  }

  .fixed-plugin .dropdown-menu > li > a.switch-trigger:hover,
  .fixed-plugin .dropdown-menu > li > a.switch-trigger:focus {
    background-color: transparent;
  }

  .fixed-plugin .dropdown-menu > li > a img {
    margin-top: auto;
  }

  .fixed-plugin .btn-social {
    display: block;
    width: 48%;
    float: left;
    font-weight: 600;
  }

  .fixed-plugin .btn-social i {
    margin-right: 5px;
  }

  .fixed-plugin .btn-social:first-child {
    margin-right: 2%;
  }

  .fixed-plugin .dropdown-menu {
    background: #FFFFFF;
  }

  .btn-facebook {
    border-color: $social-facebook;
    color: $social-facebook;

    &:hover {
      background-color: $social-facebook;
      border-color: $social-facebook;
      color: $white-color;
    }
  }

  .btn-twitter {
    border-color: $social-twitter;
    color: $social-twitter;
    &:hover {
      background-color: $social-twitter;
      border-color: $social-twitter;
      color: $white-color;
    }
  }

  .btn-pinterest {
    border-color: $social-pinterest;
    color: $social-pinterest;
    &:hover {
      background-color: $social-pinterest;
      border-color: $social-pinterest;
      color: $white-color;
    }
  }

  .fixed-plugin .dropdown-menu > li > a.img-holder {
    font-size: 16px;
    text-align: center;
    border-radius: 10px;
    background-color: #FFF;
    border: 3px solid #FFF;
    opacity: 1;
    cursor: pointer;
    max-height: 86px;
    overflow: hidden;
    padding: 0;
  }

  .fixed-plugin .dropdown-menu > li > a.switch-trigger:hover,
  .fixed-plugin .dropdown-menu > li > a.switch-trigger:focus {
    background-color: transparent;
  }

  .fixed-plugin .dropdown-menu > li:hover > a.img-holder,
  .fixed-plugin .dropdown-menu > li:focus > a.img-holder {
    border-color: rgba(0, 187, 255, 0.53);;
  }

  .fixed-plugin .dropdown-menu > .active > a.img-holder,
  .fixed-plugin .dropdown-menu > .active > a.img-holder {
    border-color: #00bbff;
    background-color: #FFFFFF;
  }

  .fixed-plugin .dropdown-menu > li > a img {
    margin-top: auto;
  }

  @media (min-width: 992px) {
    .fixed-plugin .dropdown .dropdown-menu {
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);
      -o-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);
      top: 27px;
      opacity: 0;

      transform-origin: 0 0;
    }

    .fixed-plugin .dropdown-menu li.colors-line{
      width: 100%;
      border-bottom: 1px solid #ddd;
    }

    .fixed-plugin .dropdown.show .dropdown-menu {
      opacity: 1;
      /* add here for wider and longer sidebar */
      left: -540px !important; /* widen sidebar from the left */
      height: 500px;

      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);
      -o-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);

      transform-origin: 0 0;
    }

    .fixed-plugin .dropdown-menu:before,
    .fixed-plugin .dropdown-menu:after {
      content: "";
      display: inline-block;
      position: absolute;
      top: 50%;
      width: 16px;
      transform: translateY(-50%);
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);

    }
    .fixed-plugin .dropdown-menu:before {
      border-bottom: 16px solid rgba(0, 0, 0, 0);
      border-left: 16px solid #F1EAE0;
      border-top: 16px solid rgba(0, 0, 0, 0);
      right: -16px;
    }

    .fixed-plugin .dropdown-menu:after {
      border-bottom: 16px solid rgba(0, 0, 0, 0);
      border-left: 16px solid #FFFFFF;
      border-top: 16px solid rgba(0, 0, 0, 0);
      right: -15px;
    }

    .typo-line {
      padding-left: 140px;
      margin-bottom: 40px;
      position: relative;
    }

    .typo-line .category {
      transform: translateY(-50%);
      top: 50%;
      left: 0px;
      position: absolute;
    }
  }

  @media (max-width: 991px) {
    .fixed-plugin .dropdown-menu {
      right: 60px;
      width: 220px;
    }
    .fixed-plugin .dropdown.show .dropdown-menu {
      left: -240px !important;
    }
    .fixed-plugin .dropdown-menu li {
      width: 50%;
    }

    .fixed-plugin .dropdown-menu li.colors-line{
      width: 100%;
      border-bottom: 1px solid #ddd;
    }

    .fixed-plugin li.adjustments-line,
    .fixed-plugin li.header-title,
    .fixed-plugin li.button-container {
      width: 100%;
      height: 55px;
      min-height: inherit;
    }

    .fixed-plugin li.button-container {
      height: auto;
    }

    .fixed-plugin .adjustments-line .switch {
      float: right;
      margin: 0 0px;
    }

    .fixed-plugin li.header-title {
      height: 40px;
    }
    .fixed-plugin .dropdown .dropdown-menu {
      top: -170px;
    }

    .fixed-plugin .dropdown-menu:before,
    .fixed-plugin .dropdown-menu:after {
      display: none;
    }

  }
</style>