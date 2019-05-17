<template>
  <div class="user">
    <div class="photo"> 
      <img src="static/img/default-avatar.png" alt="avatar"/>
      <!-- <i class="nc-icon nc-circle-09"></i> -->
    </div>
    <div class="info">
      <a data-toggle="collapse" :aria-expanded="!isClosed" @click.stop="toggleMenu" href="#">
           <span>
             <!-- {{title}} -->
             {{ userFirstName }} {{userLastName}}
             <b class="caret"></b>
          </span>
      </a>
      <div class="clearfix"></div>
      <div>
        <!-- <el-collapse-transition> -->
          <ul class="nav" v-show="!isClosed">
            <slot>
              <li>
                <a class="profile-dropdown" href="#pablo">
                  <span class="sidebar-mini">PHI/PII: </span>
                  <span class="sidebar-normal">{{permissions}}</span>
                </a>
              </li>
              <li>
                <a class="profile-dropdown" href="#pablo">
                  <span class="sidebar-mini">Current Site: </span>
                  <span class="sidebar-normal">{{selectedSite}}</span>
                </a>
              </li>
              <li>
                <a class="profile-dropdown" href="#pablo">
                  <span class="sidebar-mini">User: </span>
                  <span class="sidebar-normal">{{userAccount}}</span>
                </a>
              </li>
            </slot>
          </ul>
        <!-- </el-collapse-transition> -->
      </div>
    </div>
  </div>
</template>
<script>
//   import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import { mapState, mapGetters } from 'vuex'

  export default {
    components: {
    //   [CollapseTransition.name]: CollapseTransition
    },
    props: {
      title: {
        type: String,
        default: 'Anonymous'
      }
    },
     computed: {
      ...mapState([
        'userFirstName', 'userLastName', 'selectedSite'
      ]),
      ...mapGetters([
        'userPHI', 'userAccount'
      ]),
      permissions() {
        // console.log('in UserMenu permissions, userPHI is: ', this.userPHI)
        return this.userPHI == 1 ? 'Yes' : 'No'
      }
    },
    data () {
      return {
        isClosed: true,
        hasPermissions: false
      }
    },
    methods: {  
      toggleMenu () {
        this.isClosed = !this.isClosed
      }
    }
  }
</script>
<style>
  .collapsed {
    transition: opacity 1s;
  }

  .photo {
    width: 34px;
    height: 34px;
    overflow: hidden;
    border-radius: 50%;
    float: left;
    margin-right: 11px;
    margin-left: 23px;
    z-index: 5;
    border: 2px solid hsla(0,0%,100%,.3);
  }

  .info a {
    color: #fff;
    padding: 8px 14px;
    display: block;
    white-space: nowrap;
    line-height: 18px;
  }

.sidebar .user {
    border-bottom: 1px solid hsla(0,0%,100%,.2);
    padding-bottom: 20px;
    margin-top: 20px;
}

</style>

