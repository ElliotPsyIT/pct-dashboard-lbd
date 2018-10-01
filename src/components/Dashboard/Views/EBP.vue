<template>
  <transition name="fade" mode="out-in">
    <div class="content" :key="selectedSite">
      <div class="container-fluid">
        
        <!-- Section Headers -->
        <div class="row d-flex justify-content-center ">
          <h4 class="section-head">EBPs</h4>
        </div>
      
        <div class="row d-flex justify-content-around">
          <h4 class="section-head">  EBPs in Clinics {{siteEBPClinics}}/{{siteEBPClinicsAll}}</h4>
          <h4 class="section-head"> EBPs by Providers {{siteEBPProviders}}/{{siteEBPProvidersAll}}</h4>
        </div>


        <div class="row d-flex justify-content-center">

          <div class="col-xl-3 col-md-2">
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">PEI in Clinics ({{siteEBPClinicsPEI}})</p>
                <!-- <h4 class="card-title">{{ siteEncounterCPTTelephone.total }}/{{ siteEncounterCPTTelephone.percent }}%</h4> -->
                <h4 class="card-title">{{siteEBPClinicsPEIPercent}}%</h4>
              </div>
            </stats-card>

          </div>

          <div class="col-xl-3 col-md-2">
            
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">CPT in Clinics ({{siteEBPClinicsCPT}})</p>
                <!-- <h4 class="card-title">{{ siteEncounterCPTGroupEducation.total }}/{{ siteEncounterCPTGroupEducation.percent }}%</h4> -->
                <h4 class="card-title">{{siteEBPClinicsCPTPercent}}%</h4>
              </div>
            </stats-card>

          </div>

          <div class="col-xl-3 col-md-2">
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">PEI by Providers ({{siteEBPProvidersPEI}})</p>
                <!-- <h4 class="card-title">{{ siteEncounterCPTTelephone.total }}/{{ siteEncounterCPTTelephone.percent }}%</h4> -->
                <h4 class="card-title">{{siteEBPProvidersPEIPercent}}%</h4>
              </div>
            </stats-card>

          </div>
        
          <div class="col-xl-3 col-md-2">
            
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">CPT by Providers ({{siteEBPProvidersCPT}})</p>
                <!-- <h4 class="card-title">{{ siteEncounterCPTGroupEducation.total }}/{{ siteEncounterCPTGroupEducation.percent }}%</h4> -->
                <h4 class="card-title">{{siteEBPProvidersCPTPercent}}%</h4>
              </div>
            </stats-card>

          </div>
        </div>

        <div class="row d-flex justify-content-center ">
          <h4 class="section-head">EBPs for Patients (Individual Tx) {{siteEBPPatients}}/{{siteEBPPatientsAll}}</h4>
        </div>
      
        <div class="row d-flex justify-content-center">

          <div class="col-xl-3 col-md-2">
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">PEI for Patients ({{siteEBPPatientsPEI}})</p>
                <h4 class="card-title">{{siteEBPPatientsPEIPercent}}%</h4>
              </div>
            </stats-card>

          </div>
        
          <div class="col-xl-3 col-md-2">
            
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">CPT for Patients ({{siteEBPPatientsCPT}})</p>
                <h4 class="card-title">{{siteEBPPatientsCPTPercent}}%</h4>
              </div>
            </stats-card>

          </div>
        
        </div>

  <hr class="style1"/>

        <!-- <div class="row d-flex justify-content-center ">
          <h4 class="section-head">Depression EBPs</h4>
        </div>
      
        <div class="row d-flex justify-content-around">
          <h4 class="section-head">Clinics</h4>
          <h4 class="section-head">Providers</h4>
        </div> -->

        <!-- <div class="row d-flex justify-content-center">
        
          <div class="col-xl-3 col-md-3">
            
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">CBT-Depression</p>
                <h4 class="card-title">{{ siteEncounterCPTAssessment.total }}/{{ siteEncounterCPTAssessment.percent }}%</h4>
                <h4 class="card-title">%</h4>
              </div>
              </stats-card>

          </div>

          <div class="col-xl-3 col-md-3">
            
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">IPT-Depression</p>
                <h4 class="card-title">%</h4>
              </div>
              </stats-card>

          </div>

          <div class="col-xl-3 col-md-3">
            
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">CBT-Depression</p>
                <h4 class="card-title">%</h4>
              </div>
              </stats-card>

          </div>

          <div class="col-xl-3 col-md-3">
            
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">IPT-Depression</p>              
                <h4 class="card-title">%</h4>
              </div>
              </stats-card>

          </div>

        </div> -->

        <!-- <div class="row d-flex justify-content-center ">
          <h4 class="section-head">Patients</h4>
        </div> -->

        <!-- <div class="row d-flex justify-content-center">
        
          <div class="col-xl-3 col-md-3">
            
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">CBT-Depression</p>
                <h4 class="card-title">%</h4>
              </div>
              </stats-card>

          </div>

          <div class="col-xl-3 col-md-3">
            
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">IPT-Depression</p>             
                <h4 class="card-title">%</h4>
              </div>
              </stats-card>

          </div>

        </div> -->

  <!-- <hr class="style1"/> -->

        <!-- <div class="row d-flex justify-content-center ">
          <h4 class="section-head">Insomnia EBPs</h4>
        </div> -->
      
        <!-- <div class="row d-flex justify-content-around">
          <h4 class="section-head">Clinics</h4>
          <h4 class="section-head">Providers</h4>
          <h4 class="section-head">Patients</h4>
        </div> -->

        <!-- <div class="row d-flex justify-content-around">
        
          <div class="col-xl-3 col-md-3">
            
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">CBT-Insomnia</p>
                <h4 class="card-title">%</h4>
              </div>
              </stats-card>

          </div>

          <div class="col-xl-3 col-md-3">
            
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">CBT-Insomnia</p>
                <h4 class="card-title">%</h4>
              </div>
              </stats-card>

          </div>

          <div class="col-xl-3 col-md-3">
            
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">CBT-Insomnia</p>
                <h4 class="card-title">%</h4>
              </div>
              </stats-card>

          </div>
        
        </div> -->

  <!-- <hr class="style1"/> -->

  <!-- Section Header -->
        <div class="row d-flex justify-content-center ">
          <h4 class="section-head">EBP Activity Summary</h4>
        </div>

        <div class="row">

          <div class="col-md-6" >

            <br/>
            <card>
              <!-- <template slot="header">
                <button @click="getSelectedRows()"> Get Selected Rows</button>
              </template> -->
                <ag-grid-vue style="font-size: 12px; height: 425px" class="ag-theme-balham grid" 
                :gridOptions="gridOptions" 
                :columnDefs="columnDefs"
                :rowData="rowData" 
                :rowDataChanged="onRowDataChanged"
                :enableFilter="true"
                :enableSorting="true"
                :enableColResize="true"
                :cellClicked="onCellClicked"
                >
                </ag-grid-vue>
              <!-- <template slot="footer">
                <div class="legend">
                  EBP Patient Totals
                </div>
              </template> -->
            </card>
          </div>


          <div class="col-md-6">
            <template>
              <vue-highcharts :options="pieChartOptions"  ref="pieChart"></vue-highcharts>
            </template>
          </div>

        </div>

  <!-- Section Header -->
        <div class="row d-flex justify-content-center ">
          <h4 class="section-head">Providers' EBPs By Clinic and Patient</h4>
        </div>

        <div class="row justify-content-center">
          <div class="col-md-12">
            <card>
              <template slot="header">
                <button @click="gridOptions1.api.collapseAll()" >Collapse All</button>
                <button @click="gridOptions1.api.expandAll()" >Expand All</button>
              </template>
              <ag-grid-vue style="font-size: 12px; height: 500px" class="ag-theme-balham grid" 
              :gridOptions="gridOptions1" 
              :columnDefs="columnDefs1"
              :rowData="rowData1" 
              :rowDataChanged="onRowDataChanged1"
              :enableFilter="true"
              :enableSorting="true"
              :enableColResize="true"
              :animateRows="true"
              :cellClicked="onCellClicked"
              >
              </ag-grid-vue>
              
            </card>
          </div>

        </div> 

      </div>
    </div>
  </transition>
</template>
<script>

import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
import Card from 'src/components/UIComponents/Cards/Card.vue'

import Vue from "vue"
import { AgGridVue } from "ag-grid-vue"

import VueHighcharts from 'vue2-highcharts'

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'surveys',
  components: {
    StatsCard,
    Card,
    AgGridVue,
    VueHighcharts,
  },
  computed: {
    ...mapGetters([
      'siteEBPClinics',
      'siteEBPClinicsAll',
      'siteEBPClinicsCPT',
      'siteEBPClinicsPEI',
      'siteEBPProviders',
      'siteEBPProvidersAll',
      'siteEBPProvidersCPT',
      'siteEBPProvidersPEI',
      'siteEBPPatients',
      'siteEBPPatientsAll',
      'siteEBPPatientsCPT',
      'siteEBPPatientsPEI',
      'siteEBPClinicSummary',
      'siteEBPPieChartSeries',
      'siteEBPDetailsTypes',
    ]),
    ...mapState(['selectedSite']),

    siteEBPClinicsPercent () {
      return Math.round((this.siteEBPClinics/this.siteEBPClinicsAll) * 100)
    },
    siteEBPClinicsCPTPercent () {
      return Math.round((this.siteEBPClinicsCPT/this.siteEBPClinicsAll) * 100)
    },
    siteEBPClinicsPEIPercent () {
      return Math.round((this.siteEBPClinicsPEI/this.siteEBPClinicsAll) * 100)
    },

    siteEBPProvidersPercent () {
      return Math.round((this.siteEBPProviders/this.siteEBPProvidersAll) * 100)
    },
    siteEBPProvidersCPTPercent () {
      return Math.round((this.siteEBPProvidersCPT/this.siteEBPProvidersAll) * 100)
    },
    siteEBPProvidersPEIPercent () {
      return Math.round((this.siteEBPProvidersPEI/this.siteEBPProvidersAll) * 100)
    },
   
    siteEBPPatientsPercent () {
      return Math.round((this.siteEBPPatients/this.siteEBPPatientsAll) * 100)
    },
    siteEBPPatientsCPTPercent () {
      return Math.round((this.siteEBPPatientsCPT/this.siteEBPPatientsAll) * 100)
    },
    siteEBPPatientsPEIPercent () {
      return Math.round((this.siteEBPPatientsPEI/this.siteEBPPatientsAll) * 100)
    },

    rowData () { return this.siteEBPDetailsTypes  },
    rowData1 () { return this.siteEBPClinicSummary },

    pieChartOptions (vm) {
      return {
        chart:      { type: "pie", 
                      options3d: { enabled: true, alpha: 45 }},
        title:      { text: 'EBP Types' },
        subtitle:   { text: 'Hover over sections for EBP Type data' },
        credits:    { enabled: false },
        plotOptions: { pie: { innerSize: 100, depth: 45 },
                       series: { allowPointSelect: true }},
        series: [
          {
            name: "ebp types",
            point:{
              events:{
                  click: function (event) {
                    // pull status name of pie slice clicked
                    let pieSliceClicked = this.name
                    // send pie slice status name to handler
                    vm.pieClickHandler(pieSliceClicked)

                  }
              }
            },
            data: this.siteEBPPieChartSeries 
          }
        ]
      }
    },
  },
  beforeMount() {
    this.columnDefs = this.createColDefs(),
    this.columnDefs1 = this.createColDefs1(),

    this.onFilterChanged = function() {console.log('filter changed!!')}

    this.gridOptions = {},

    this.gridOptions1 = {  
      // groupHideOpenParents: true, 
      autoGroupColumnDef: {
        headerName: 'Site / Staff / Clinic',
        field: 'LocationName',
        // field: 'InstitutionName'
      },
      // floatingFilter: true
      // groupMultiAutoColumn:true,
    }
  },
  methods: {
    // onGridReady(params) {
    //   this.gridApi = params.api;
    //   this.columnApi = params.columnApi;
    // },
    onCellClicked(event) {
      let clickedCellFieldName = event.colDef.field
      let clickedCellDataSimple =  event.value
      let clickedCellDataWithFieldReference =  event.node.data[clickedCellFieldName]
      let clickedCellRowIndex = event.rowIndex
      let clickedCellNode = event.node

      console.log('onCellClicked node.data is ****: ', event.node.data)
    },
    createColDefs() {
      return [
        {headerName: "EBPs",
          children: [
            { headerName: "Site", 
              field: "StaPa", 
              width: 30, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agTextColumnFilter",
              // checkboxSelection: true,
            },
            { headerName: "Institution", 
              field: "InstitutionName", 
              width: 70, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agTextColumnFilter",
            },
            { headerName: "EBP Name", 
              field: "HealthFactorCategoryShort", 
              width: 70, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agTextColumnFilter"
            },
            { headerName: "Tot", 
              field: "numPatients", 
              width: 30, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agNumberColumnFilter"
            },
          ]
        }
      ]
    },
    createColDefs1() { //experimental
      return [
        { headerName: "Patients", 
          field: "InitialsAndL4", 
          width: 100, 
          cellStyle: { 'text-align': "left" } ,
          filter: "agTextColumnFilter"
        },
        { headerName: "Institution", 
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
        { headerName: "EBP Type", 
          field: "HealthFactorCategoryShort", 
          width: 100, 
          cellStyle: { 'text-align': "left" } ,
          filter: "agTextColumnFilter"
        },
        { headerName: "Latest", 
          field: "LatestSession", 
          width: 90, 
          cellStyle: { 'text-align': "left" } ,
          filter: "agTextColumnFilter"
        },
        { headerName: "Latest Date", 
          field: "LatestDate", 
          width: 120, 
          cellStyle: { 'text-align': "left" } ,
          filter: "agDateColumnFilter"
          // suppressFilter: true,
        },
        { headerName: "Provider", 
          field: "STAFFNAME", 
          width: 150, 
          cellStyle: { 'text-align': "left" } ,
          filter: "agTextColumnFilter",
          rowGroup: true,
          hide:true
        },
      ]
    },
    onRowDataChanged() {
      console.log('row data changed!!')
      Vue.nextTick(() => {
        this.gridOptions.api.sizeColumnsToFit();
      });
    },
    onRowDataChanged1() {
      console.log('row1 data changed!!')
      
      Vue.nextTick(() => {
        this.gridOptions1.api.sizeColumnsToFit();
        this.gridOptions1.api.expandAll();
      });
    },
  }
}
</script>
<style>
.section-head {
   font-size: 2rem;
}

hr.style1 {
	border-top: 3px double #8c8b8b;
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
