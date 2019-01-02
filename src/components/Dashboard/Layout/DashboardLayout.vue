<template>
  <div class="wrapper">
    <side-bar title="PCT Admin">
      <user-menu></user-menu>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/admin/overview">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/admin/consults">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Consults</p>
      </sidebar-link>
      <sidebar-link to="/admin/encounters">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Encounters</p>
      </sidebar-link>
      <sidebar-link to="/admin/providers">
        <i class="nc-icon nc-circle-09"></i>
        <p>Providers</p>
      </sidebar-link>
      <sidebar-link to="/admin/surveys">
        <i class="nc-icon nc-circle-09"></i>
        <p>Surveys</p>
      </sidebar-link>
      <sidebar-link to="/admin/ebp">
        <i class="nc-icon nc-circle-09"></i>
        <p>EBPs</p>
      </sidebar-link>
      <!-- <sidebar-link to="/admin/providers">
        <i class="nc-icon nc-circle-09"></i>
        <p>Providers</p>
      </sidebar-link>
      <sidebar-link to="/admin/table-list">
        <i class="nc-icon nc-notes"></i>
        <p>Table list</p>
      </sidebar-link>
      <sidebar-link to="/admin/typography">
        <i class="nc-icon nc-paper-2"></i>
        <p>Typography</p>
      </sidebar-link>
      <sidebar-link to="/admin/icons">
        <i class="nc-icon nc-atom"></i>
        <p>Icons</p>
      </sidebar-link>
      <sidebar-link to="/admin/maps">
        <i class="nc-icon nc-pin-3"></i>
        <p>Maps</p>
      </sidebar-link>
      <sidebar-link to="/admin/notifications">
        <i class="nc-icon nc-bell-55"></i>
        <p>Notifications</p>
      </sidebar-link> -->
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
  import UserMenu from './UserMenu.vue'

  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu,
      UserMenu
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }

</script>
