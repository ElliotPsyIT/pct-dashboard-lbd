<template>
  <transition name="fade" mode="out-in">
    <div class="content" :key="selectedSite">
      <div class="container-fluid">
        
              Scroll Position {{scrollPosition}}

          <!-- Section Header -->
        <div class="row d-flex justify-content-center ">
          <h4 class="section-head">Provider, Clinic, Patient Stats</h4>
        </div>

        <!--  FAQ -->
        <div style="align-items: center; display: flex; justify-content: center; ">
          <div style="width: 60%; margin-bottom: 10px;">
           <VueFaqAccordion :items="ProviderClinicPatientTotals"/> 
          </div>
        </div>

        <div class="row d-flex justify-content-center">
          
          <div class="col-xl-3 col-md-4">
            <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-badge text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Total Providers</p>
              <h4 class="card-title">{{ asyncValue(siteProviderProviderCount) }}</h4>
            </div>
            </stats-card>
          </div>

          <div class="col-xl-3 col-md-4">
            <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon-outline nc-home-52 text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Total Clinics</p>
              <h4 class="card-title">{{ asyncValue(siteProviderClinicCount) }}</h4>
            </div>
            </stats-card>
          </div>

          <div class="col-xl-3 col-md-4">
            <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon-outline nc-multiple-11 text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Total Patients</p>
              <h4 class="card-title">{{ asyncValue(siteProviderPatientCount) }}</h4>
            </div>
            </stats-card>
          </div>

        </div>

        <!-- Section Header -->
        <div class="row d-flex justify-content-center ">
          <h4 class="section-head">Provider Activity Summary</h4>
        </div>

        <!--  FAQ -->
        <div style="align-items: center; display: flex; justify-content: center; ">
          <div style="width: 60%; margin-bottom: 10px;">
           <VueFaqAccordion :items="ProviderActivitySummary"/> 
          </div>
        </div>

        <div class="row justify-content-center">
          
          <div class="col-md-12 ">
            <card>
              <template slot="header">
                <span>Hover Over Column Header to View Menu</span>
                <!-- <button class="float-right" @click="gridOptions3.api.exportDataAsCsv()">Export to CSV</button> -->
                <button class="float-right" @click="exportCSVgridOptions3">Export to CSV</button>
              </template>
                <ag-grid-vue style="font-size: 12px; height: 500px" class="ag-theme-balham grid" 
                :gridOptions="gridOptions3" 
                :columnDefs="columnDefs3"
                :rowData="rowData3" 
                :gridReady="onGridReady3"
                :enableFilter="true"
                :enableSorting="true"
                :enableColResize="true"
                :onFilterChanged="onFilterChanged"
                :animateRows="true"
                >
                </ag-grid-vue>
                <!-- :rowDataChanged="onRowDataChanged3" -->
              <template slot="footer">
                <div class="legend">
                  Detailed Encounter Listing
                </div>
              </template>
            </card>
          </div>

        </div> <!-- End Row -->

  <!-- Section Header -->
        <div class="row d-flex justify-content-center ">
          <h4 class="section-head">Provider Encounter Totals</h4>
        </div>

        <!--  FAQ -->
        <div style="align-items: center; display: flex; justify-content: center; ">
          <div style="width: 60%; margin-bottom: 10px;">
           <VueFaqAccordion :items="ProviderEncounterTotals"/> 
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-md-10">
            <card>
              <template slot="header">
                <!-- <span>Click On Arrow <span class="nc-icon">></span> Below to Drill Down</span> -->
                <button @click="gridOptions1.api.collapseAll()" >Collapse All</button>
                <button @click="gridOptions1.api.expandAll()" >Expand All</button>
                <button class="float-right" @click="gridOptions1.api.exportDataAsCsv()">Export to CSV</button>
              </template>
              <ag-grid-vue style="font-size: 12px; height: 500px" class="ag-theme-balham grid" 
              :gridOptions="gridOptions1" 
              :columnDefs="columnDefs1"
              :rowData="rowData1" 
              :gridReady="onGridReady1"
              :enableFilter="true"
              :enableSorting="true"
              :enableColResize="true"
              :animateRows="true"
              >
              </ag-grid-vue>
              <!-- :rowDataChanged="onRowDataChanged1" -->
              <template slot="footer">
                <div class="legend">
                  Provider Encounters
                </div>
              </template>
            </card>
          </div>

        </div> <!-- End Row -->
  
        <!-- Section Header -->
        <div class="row d-flex justify-content-center ">
          <h4 class="section-head">Provider Patient Sessions</h4>
        </div>

        <!--  FAQ -->
        <div style="align-items: center; display: flex; justify-content: center; ">
          <div style="width: 60%; margin-bottom: 10px;">
           <VueFaqAccordion :items="ProviderPatientSessions"/> 
          </div>
        </div>

        <div class="row d-flex justify-content-center ">
          <h5 class="section-head">(For Testing: One Week's Data Only)</h5>
        </div>

        <div class="row justify-content-center">
          <div class="col-md-10">
            <card>
              <template slot="header">
                <!-- <span>Click On Arrow <span class="nc-icon">></span> Below to Drill Down</span> -->
                <button @click="gridOptions2.api.collapseAll()" >Collapse All</button>
                <button @click="gridOptions2.api.expandAll()" >Expand All</button>
                <button class="float-right" @click="gridOptions2.api.exportDataAsCsv()">Export to CSV</button>
              </template>
                <ag-grid-vue style="font-size: 12px; height: 500px" class="ag-theme-balham grid" 
                :gridOptions="gridOptions2" 
                :columnDefs="columnDefs2"
                :rowData="rowData2" 
                :gridReady="onGridReady2"
                :enableFilter="true"
                :enableSorting="true"
                :enableColResize="true"
                :animateRows="true"
                >
                </ag-grid-vue>
                <!-- :rowDataChanged="onRowDataChanged2" -->
              <template slot="footer">
                <div class="legend">
                  Providers' Patient Sessions
                </div>
              </template>
            </card>
          </div>

        </div>

      </div> <!-- End container-fluid -->
    </div> <!-- End content -->
  </transition>
</template>
<script>
import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
import Card from 'src/components/UIComponents/Cards/Card.vue'

import Vue from "vue";
import { AgGridVue } from "ag-grid-vue";

import VueFaqAccordion from 'vue-faq-accordion'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'providers',
  components: {
    Card,
    StatsCard,
    AgGridVue,
    VueFaqAccordion
  },
  data () {
    return {
      ProviderClinicPatientTotals: [
        {
          title: "Provider, Clinic, Patient Stats",
          value: "<u><b>Description</b></u>: Provider, Clinic and Patient summary totals below are counts taken from completed encounters.  The unique " +
          "providers, clinics and patients shown in the 3 cards below are summed and reported.  See Encounter page for PCT encounters defined. ",
          category: "Providers Clinics Patients Stats Defined..."
        }
      ],
      ProviderActivitySummary: [
        {
          title: "Provider Activity Summary",
          value: "<u><b>Description</b></u>: The Provider Activity Summary table lists the counts of unique patients and visits from PCT encounters (see Encounter page for encounter definitions). " +
          "<br/><br/>In addition, the table displays the number of visits (encounters) and percent of visits that are documented as EBP visits.",
          category: "Provider Activity Summary Defined..."
        }
      ],
      ProviderEncounterTotals: [
        {
          title: "Provider Encounter Totals",
          value: "<u><b>Description</b></u>: The Provider Encounter multi-level table lists each provider's number of encounter sessions along with the unique number of patients seen for " +
          "each PCT clinic at each site where the provider practices. ",
          category: "Provider Encounter Totals Defined..."
        }
      ],
      ProviderPatientSessions: [
        {
          title: "Provider Patient Sessions (Experimental)",
          value: "<u><b>Description</b></u>: The Provider Patient Sessions multi-level table is similar to the Provider Encounter table above, except that here patients sessions and session CPT codes (session types) are displayed. " +
          "Here, each provider's number of encounter sessions and session types are shown for each PCT clinic at each site where the provider practices. " +
          "<br/><br/><font color='red'><b>NOTE:</b> This is an experimental table that may change as we hear about it usefulness from PCT Administrators.  Data from only a restricted date range are shown.  Our concern is that " +
          "a wider date range may result in presenting too much patient level data to be useful.</font>",
          category: "Provider Patient Sessions Defined..."
        }
      ]
    }
  },
  computed: {
    ...mapState([
      'selectedSite', 'selectedRange'
    ]),
    ...mapGetters([
      'siteProviderDetailsCPT',

      'siteProviderInfo',
      'siteProviderInfoEBP', // EBP info for Provider Activity Summary table
      'siteProviderDetails',
      'siteProviderPatientDetailsCPT',
      
      'siteProviderProviderCount',
      'siteProviderClinicCount',
      'siteProviderPatientCount'
    ]),
    scrollPosition () {
      console.log('window.pageYOffset: ', window.pageYOffset)    
    },
    rowData1 () { 
      // console.log('in computed, this.siteProviderDetails is: ', this.siteProviderDetails)
      return this.siteProviderDetails }, // siteProviderDetails/Provider Encounters Details
    rowData2 () { 
      // console.log('in computed, this.siteProviderPatientDetailsCPT is: ', this.siteProviderPatientDetailsCPT)      
      return this.siteProviderPatientDetailsCPT }, // siteProviderPatientDetailsCPT/Provider Sessions Details
    rowData3 () { 
      // console.log('in computed, this.siteProviderInfo is: ', this.siteProviderInfo)
      return this.siteProviderInfo }, // siteProviderInfo/Provider Activity Details
  },
  beforeMount() {
    this.columnDefs1 = this.createColDefs1(), 
    this.columnDefs2 = this.createColDefs2(), 
    this.columnDefs3 = this.createColDefs3(), // siteProviderInfo/Provider Activity Details

    this.onFilterChanged = function() {console.log('filter changed!!')}

    this.gridOptions1 = {  
      // groupHideOpenParents: true, 
      autoGroupColumnDef: {
        headerName: 'Staff / Site',
        field: 'LocationName',
        // field: 'InstitutionName'
        suppressPropertyNamesCheck: true
      },
      // groupMultiAutoColumn:true,
    },
    this.gridOptions2 = {
      // groupHideOpenParents: true, 
      autoGroupColumnDef: {
        headerName: 'Staff / Patient',
        field: 'InitialsAndL4',
        // field: 'LocationName'
        suppressPropertyNamesCheck: true
      },
      // groupMultiAutoColumn:true,
      // groupSuppressAutoColumn: true
    },
    this.gridOptions3 = {
      suppressPropertyNamesCheck: true
     }
  },
  mounted() {
    this.PROVIDER_COUNT()
    this.PROVIDER_DETAILS()
    this.PROVIDER_PATIENT_DETAILS_CPT()
    this.PROVIDER_INFO()

    this.CURRENT_PAGE('provider')
  },
  methods: {
    ...mapActions([
      'PROVIDER_COUNT',
      'PROVIDER_DETAILS',
      'PROVIDER_PATIENT_DETAILS_CPT',
      'PROVIDER_INFO',

      'CURRENT_PAGE'
    ]),
    asyncValue(val) {
      return val == 0 ? 'Loading...' : val
    },
    exportCSVgridOptions3() {
      this.gridOptions3.api.exportDataAsCsv( {
        processCellCallback: (params) => {
          if (params.column.colId == "visitEBPpercent") {
            // need params.node.data to access the grid columns
            // see below in cellRenderer for similar formating of output values
            let encounters = params.node.data.numEncounters
            let encountersEBP = params.node.data.numEncountersEBP === null ? 0 : params.node.data.numEncountersEBP
            let encountersEBPpercent= params.node.data.PercentageEncountersCPT === null ? 0 : params.node.data.PercentageEncountersCPT
          
            return `${encountersEBP} (${encountersEBPpercent}%)`
          }
          return params.value
        }
       
      })
    },
    createColDefs1() { //experimental
    return [
        { headerName: "Provider (# Sessions Total)", 
          field: "STAFFNAME", 
          width: 150, 
          cellStyle: { 'text-align': "left" } ,
          filter: "agTextColumnFilter",
          rowGroup: true,
          // hide:true
        },
        { headerName: "Institution (# Sessions)", 
          field: "InstitutionName", 
          width: 200, 
          cellStyle: { 'text-align': "left" } ,
          filter: "agTextColumnFilter",
          rowGroup: true,
          hide:true,
        },
        // { headerName: "Clinic Name", 
        //   field: "LocationName", 
        //   width: 150, 
        //   cellStyle: { 'text-align': "left" } ,
        //   filter: "agTextColumnFilter",
        // },
        { headerName: "Sessions", 
          field: "EncountersByProvider", 
          width: 80, 
          cellStyle: { 'text-align': "left" } ,
          filter: "agNumberColumnFilter"
        },
        { headerName: "Patients", 
          field: "numPatients", 
          width: 80, 
          cellStyle: { 'text-align': "left" } ,
          filter: "agNumberColumnFilter"
        },
      ]
    },
    createColDefs2() {
      return [ 
        {
          headerName: "Staff Name",  
          field: "StaffName", 
          cellStyle: { 'text-align': "left" } ,
          filter: "agTextColumnFilter",
          rowGroup: true,
          // hide:true,
        },
        { headerName: "Institution", 
          field: "InstitutionName", 
          width: 200, 
          cellStyle: { 'text-align': "left" } ,
          filter: "agTextColumnFilter",
          rowGroup: true,
          hide:true,
        },
        { headerName: "Clinic (# Sessions)", 
          field: "LocationName", 
          width: 100, 
          cellStyle: { 'text-align': "left" } ,
          filter: "agTextColumnFilter",
          rowGroup: true,
          hide:true,
        },
        // { headerName: "Patient", 
        //   field: "InitialsAndL4", 
        //   width: 100, 
        //   cellStyle: { 'text-align': "left" } ,
        //   filter: "agTextColumnFilter",
        // },
        { headerName: "CPT Name", 
          field: "CPTName", 
          width: 150, 
          cellStyle: { 'text-align': "left" } ,
          filter: "agTextColumnFilter"
        },
        { headerName: "Sessions", 
          field: "EncountersByProvider", 
          width: 100, 
          cellStyle: { 'text-align': "left" } ,
          filter: "agNumberColumnFilter"
        },
        // { headerName: "Date", 
        //   field: "VisitDateTime", 
        //   width: 150, 
        //   cellStyle: { 'text-align': "left" } ,
        //   filter: "agDateColumnFilter"
        // },
      ]
    },
    createColDefs3() {
      return [
        {headerName: "Provider Information",
          children: [
            { headerName: "Site", 
              field: "StaPa", 
              width: 15, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agTextColumnFilter"
            },
            { headerName: "Staff Name", 
              field: "STAFFNAME", 
              width: 40, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agTextColumnFilter"
            },
            { headerName: "Institution", 
              field: "InstitutionName", 
              width: 40, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agTextColumnFilter"
            },
            // { headerName: "Clinics", 
            //   field: "numLocations", 
            //   width: 20, 
            //   cellStyle: { 'text-align': "left" } ,
            //   filter: "agTextColumnFilter"
            // },
            { headerName: "Patients", 
              field: "numPatients", 
              width: 23, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agNumberColumnFilter"//,
              // cellRenderer: (params) => {
              //   let patients = params.data.numPatients
              //   let patientsEBP = params.data.numPatientsEBP === null ? 0 : params.data.numPatientsEBP
              //   let patientsEBPpercent= params.data.PercentagePatientsCPT === null ? 0 : params.data.PercentagePatientsCPT
              //   return `${patients} / ${patientsEBP} (${patientsEBPpercent}%)`
              // }
            },
            { headerName: "Visits", 
              field: "numEncounters", 
              width: 18, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agNumberColumnFilter"//,
              // cellRenderer: (params) => {
              //   let encounters = params.data.numEncounters
              //   let encountersEBP = params.data.numEncountersEBP === null ? 0 : params.data.numEncountersEBP
              //   let encountersEBPpercent= params.data.PercentageEncountersCPT === null ? 0 : params.data.PercentageEncountersCPT
              //   return `${encounters} / ${encountersEBP} (${encountersEBPpercent}%)`
            },
            { headerName: "Visit EBPs (%)", 
              field: "visitEBPpercent", 
              width: 30, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agNumberColumnFilter",
              cellRenderer: (params) => {
                // console.log('params.data is: ', params.data)
                let encounters = params.data.numEncounters
                let encountersEBP = params.data.numEncountersEBP === null ? 0 : params.data.numEncountersEBP
                let encountersEBPpercent= params.data.PercentageEncountersCPT === null ? 0 : params.data.PercentageEncountersCPT
                
                return `${encountersEBP} (${encountersEBPpercent}%)`
              }
            },
            
          ]
        }
      ]
    },
    onGridReady1() {
      // console.log('onGridReady1 fires sizeColumnsToFit!')
      this.gridOptions1.api.sizeColumnsToFit()
    },
    onGridReady2() {
      // console.log('onGridReady2 fires sizeColumnsToFit!')
      this.gridOptions2.api.sizeColumnsToFit()
    },
    onGridReady3() {
      // console.log('onGridReady3 fires sizeColumnsToFit!')
      this.gridOptions3.api.sizeColumnsToFit()
    },
    // onRowDataChanged1() {
    //   console.log('row1 data change calledd!!')
      
    //   // Vue.nextTick(() => {
    //   //   this.gridOptions1.api.sizeColumnsToFit();
    //   //   // this.gridOptions1.api.expandAll();
    //   // });
    // },
    // onRowDataChanged2() {
    //   console.log('row2 data change called!!')
    //   // Vue.nextTick(() => {
    //   //   this.gridOptions2.api.sizeColumnsToFit()
    //   //   // this.gridOptions2.api.expandAll();
    //   // });
    // },
    // onRowDataChanged3() {
    //   console.log('row3 data change called!!')
    //   Vue.nextTick(() => {
    //     this.gridOptions3.api.sizeColumnsToFit();
    //   });
    // }
  },
}

</script>
<style>
  .section-head {
    font-size: 2rem;
  }

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

</style>
