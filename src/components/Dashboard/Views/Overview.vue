<template>
  <div class="content">
    <div class="container-fluid">

      Scroll Position {{scrollPosition}}

<div class="jumbotron d-flex flex-row" style="height: 350px;">
  <div class="mr-4">
    <img src="../../../../static/img/nat-center-ptsd.jpg">
  </div>
  <div class="mb-2 ">
    <h1> <span class="category news" style="text-decoration: none;">*</span> PTSD Clinic Dashboard</h1> 

    <p class="category "><b>Select Station AND Date Range <i class="bold nc-icon nc-stre-up text-primary"></i></b> From Drop Downs Above </p>
    <p class="category "><b>View Details <i class="bold nc-icon nc-stre-left text-primary"></i></b> Use Left Sidebar</p>
    <p class="category" style="font-size: .8rem; font-style: italic; margin: 0;"><span class="font: red;">{{ disclaimer.asterisks}}</span>{{ disclaimer.mainText }}<span style="font-weight:bold; text-decoration:underline">{{ disclaimer.emphasis }}</span></p>
    <br/>
    <p class="category news" >
      <a class="videos" target="_blank" href="https://dvagov.sharepoint.com/sites/VHAPTSDMentoring/SitePages/Data%20Sources%20&%20Metrics.aspx">
        NEW!&nbsp;&nbsp;PTSD Dashboard Videos - Click to View
      </a>
    </p>
  </div>
  
</div>

<hr/>

<div class="row d-flex justify-content-around">
  
  <div class="col-md-2 ">
    <card>
      <router-link :to="{path:'/admin/consults'}">
        <div class="page-link" >Consults</div>
      </router-link>
      <h6 class="text-muted">PCT Consults, Statuses and Details </h6>
      
    </card>
  </div>

<div class="col-md-2 ">
    <card >
      <router-link :to="{path:'/admin/appointments'}">
        <div class="page-link" >App'ts</div>
      </router-link>
      <h6 class="text-muted">No Shows, Cancels </h6>
        
      
    </card>
</div>

  <div class="col-md-2 ">
    <card>
      <router-link :to="{path:'/admin/encounters'}">
        <div class="page-link" >Encounters</div>
      </router-link>
      <h6 class="text-muted">Encounter Counts, CPT Categories</h6>
      
    </card>
  </div>

  <div class="col-md-2 ">
    <card>
      <router-link :to="{path:'/admin/providers'}">
        <div class="page-link" >Providers</div>
      </router-link>

      <h6 class="text-muted">Providers, Clinics and Patient Stats</h6>

     
    </card>
  </div>


  <div class="col-md-2 ">
    <card>
      <router-link :to="{path:'/admin/surveys'}">
        <div class="page-link" >Surveys</div>
      </router-link>
        <h6 class="text-muted">PCT Surveys by Providers and by Patients</h6>

     
    </card>
  </div>

  <div class="col-md-2 ">
    <card>
      <router-link :to="{path:'/admin/ebp'}">
        <div class="page-link" >EBPs</div>
      </router-link>
      <h6 class="text-muted">EBP Session counts and Therapy Types</h6>

  
    </card>
  </div>

</div>

      <div class="row">
        <!-- <div class="col-md-6">
          <chart-card
            :chart-data="barChart.data"
            :chart-options="barChart.options"
            :chart-responsive-options="barChart.responsiveOptions"
            chart-type="Bar">
            <template slot="header">
              <h4 class="card-title">2014 Sales</h4>
              <p class="card-category">All products including Taxes</p>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-info"></i> Tesla Model S
                <i class="fa fa-circle text-danger"></i> BMW 5 Series
              </div>
              <hr>
              <div class="stats">
                <i class="fa fa-check"></i> Data information certified
              </div>
            </template>
          </chart-card>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import Checkbox from 'src/components/UIComponents/Inputs/Checkbox.vue'

  import { mapState, mapActions } from 'vuex'

  export default {
    components: {
      Checkbox,
      Card,
    },
    computed: {
      // ...mapState(['selectedSite', 'selectedRange','disclaimer']),
      ...mapState(['selectedSite', 'disclaimer']),
        // ...mapGetters(['nationalConsultTotal','nationalConsultStatuses'])
      scrollPosition () {
        // console.log('document.body.scrollHeight: ', document.body.scrollHeight)
        console.log('window.pageYOffset: ', window.pageYOffset)    
      },
    },
     mounted() {
        this.CURRENT_PAGE('overview')
    },
    methods: {
        ...mapActions([
        'CURRENT_PAGE'
        ])
	  }, 
    created () {
      console.log('Overview store in created() hook: ', localStorage.getItem('store'))
      // if (this.selectedSite || this.selectedRange) {
      // if (this.selectedSite || this.selectedRange) {
      //   this.beenHereBefore = true
      // } else {
      //   console.log('not been here before')
      // }
    },
    data () {
      return {
        beenHereBefore: false,

        editTooltip: 'Edit Task',
        deleteTooltip: 'Remove',

        tableData: {
          data: [
            {title: 'STEP 1: Identify your PCT Site using the selection drop downs above', checked: false},
            {title: 'STEP 2: Select the Date Range for viewing data (can be changed anytime)', checked: false},
            {title: 'STEP 3: Finaly, Select one of the data type in the Navigation bar on the left to start reviewing PCT data', checked: false},
            {title: ''},
            {title: 'Come Back Soon !!', checked: true}
          ]
        },
     }
    }
  }
</script>
<style>
 .page-link {
   color: black; 
   text-decoration: underline; 
   margin-bottom: .5rem;
   border-color: transparent;
   padding: 3px;
 }

 .page-link:hover {
   color: darkolivegreen;
   text-decoration: underline; 
 }

 .news {
   color: red;
   text-decoration: underline;
 }

  a.videos {
    font-size:.9rem;
    text-decoration:none;
    color:white;
    background-color:red;
    padding:8px;
    border-radius:5px;
    transition:0.3s;
    margin-top:7px;
  }
</style>

