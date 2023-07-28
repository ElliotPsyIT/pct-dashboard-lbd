<template>
  <div class="sidebar"
       :style="sidebarStyle"
       :data-color="backgroundColor"
       :data-image="backgroundImage"
       @click="clickedTab">

    <div class="sidebar-wrapper">
      <div class="logo">
        <a href="#" class="simple-text">
            <div class="logo-img">
                <img src="static/img/vue-logo.png" alt="">
            </div>
          {{title}}
        </a>
      </div>

      <slot name="content"></slot>
      <ul class="nav">
        <!--By default vue-router adds an active class to each route link. This way the links are colored when clicked-->
        <slot>
          <sidebar-link v-for="(link,index) in sidebarLinks"
                        :key="link.name + index"
                        :to="link.path"
                        @click="closeNavbar"
                        @clickedTab="childEmit"
                        :link="link">
            <i :class="link.icon"></i>
            <p>{{link.name}}</p>
          </sidebar-link>
        </slot>
      </ul>
    </div>
  </div>
</template>
<script>
  import SidebarLink from './SidebarLink.vue'

  export default {
    components: {
      SidebarLink
    },
    data() {
      return {
       
      }
    },
    props: {
      title: {
        type: String,
        default: 'Vue LBD'
      },
      backgroundColor: {
        type: String,
        default: 'black',
        validator: (value) => {
          let acceptedValues = ['', 'blue', 'azure', 'green', 'orange', 'red', 'purple', 'black']
          return acceptedValues.indexOf(value) !== -1
        }
      },
      backgroundImage: {
        type: String,
        default: 'static/img/sidebar-5.jpg'
      },
      activeColor: {
        type: String,
        default: 'success',
        validator: (value) => {
          let acceptedValues = ['primary', 'info', 'success', 'warning', 'danger']
          return acceptedValues.indexOf(value) !== -1
        }
      },
      sidebarLinks: {
        type: Array,
        default: () => []
      },
      autoClose: {
        type: Boolean,
        default: true
      }
    },
    provide () {
      return {
        autoClose: this.autoClose
      }
    },
    computed: {
      sidebarStyle () {
        return {
          backgroundImage: `url(${this.backgroundImage})`
        }
      },
      okayToRenderFlag () {
        let store = localStorage.getItem('store')
        console.log('store.selectedSite: ', store.selectedSite)
        console.log('store.selectedRangePicker: ', store.selectedRangePicker)
        if(store.selectedSite && store.selectedRangePicker) {
          console.log('RENDER!')
          okayToRenderFlag = true
        } 
      }
    },
    methods: {
      clickedTab() {
        // console.log('hey tab got clicked')
        // console.log('SideBar localstorage store is: ', localStorage.getItem('store'))
      },
      childEmit() {
        this.emit('clickedTab')
      } 
    },
  }

</script>
<style>

</style>
