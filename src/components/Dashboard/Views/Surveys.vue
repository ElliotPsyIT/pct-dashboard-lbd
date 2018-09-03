<template>
  <div class="content">
    <div class="container-fluid">
      
    <!-- Section Header -->
    <div class="row d-flex justify-content-center ">
      <h4 class="section-head">Overall Surveys Summary</h4>
    </div>

    <div class="row d-flex justify-content-center">
<!-- siteSurveyTotals -->
      <div class="col-xl-3 col-md-3">
      
        <stats-card>
          <div slot="header" class="icon-warning">
            <i class="nc-icon nc-chart text-warning"></i>
          </div>
          <div slot="content">
            <p class="card-category">Total Surveys Given</p>
            <!-- <h4 class="card-title">{{ siteEncounterCPTAssessment.total }}/{{ siteEncounterCPTAssessment.percent }}%</h4> -->
            <h4 class="card-title">{{ siteSurveyTotals.surveysGivenOverall }}</h4>
          </div>
        </stats-card>

      </div>

    </div>

<!-- Section Header -->
    <div class="row d-flex justify-content-center ">
      <h4 class="section-head">Clinics, Providers, Patients Survey Summary</h4>
    </div>
<!-- siteSurveyClinicTotals -->
    <div class="row d-flex justify-content-center">
      <div class="col-xl-3 col-md-4">
      
        <stats-card>
          <div slot="header" class="icon-warning">
            <i class="nc-icon nc-chart text-warning"></i>
          </div>
          <div slot="content" >
            <p class="card-category">Clinics with Surveys/<br/>All Clinics</p>
            <!-- <h4 class="card-title">{{ siteEncounterCPTAssessment.total }}/{{ siteEncounterCPTAssessment.percent }}%</h4> -->
            <h4 class="card-title">{{ siteSurveyClinicTotals.surveysGivenClinics }}/{{ siteSurveyClinicTotals.surveysTotalClinics }}</h4>
          </div>
          </stats-card>

        </div>

<!-- siteSurveyProviderTotals -->
      <div class="col-xl-3 col-md-4">
      
        <stats-card>
          <div slot="header" class="icon-warning">
            <i class="nc-icon nc-chart text-warning"></i>
          </div>
          <div slot="content">
            <p class="card-category">Providers with Surveys/<br/>All Providers</p>
            <!-- <h4 class="card-title">{{ siteEncounterCPTAssessment.total }}/{{ siteEncounterCPTAssessment.percent }}%</h4> -->
            <h4 class="card-title">{{ siteSurveyProviderTotals.surveysGivenProviders }}/{{ siteSurveyProviderTotals.surveysTotalProviders }}</h4>
          </div>
          </stats-card>

        </div>

<!-- siteSurveyPatientTotals -->
      <div class="col-xl-3 col-md-4">
      
        <stats-card>
          <div slot="header" class="icon-warning">
            <i class="nc-icon nc-chart text-warning"></i>
          </div>
          <div slot="content">
            <p class="card-category">Patients with Surveys/<br/>All Patients</p>
            <!-- <h4 class="card-title">{{ siteEncounterCPTAssessment.total }}/{{ siteEncounterCPTAssessment.percent }}%</h4> -->
            <h4 class="card-title">{{ siteSurveyPatientTotals.surveysGivenPatients }}/{{ siteSurveyPatientTotals.surveysTotalPatients }}</h4>
          </div>
          </stats-card>

        </div>

    </div>

      <!-- Section Header -->
      <div class="row d-flex justify-content-center ">
        <h4 class="section-head">Survey Activity Summary</h4>
      </div>

      <div class="row justify-content-center">
        <div class="col-md-6">
          <card>
            <template slot="header">
              <span>Hover Over Column Header to View Menu</span>
            </template>
              <ag-grid-vue style="font-size: 12px; height: 500px" class="ag-theme-balham grid" 
              :gridOptions="gridOptions" 
              :columnDefs="columnDefs"
              :rowData="rowData" 
              :rowDataChanged="onRowDataChanged"
              :enableFilter="true"
              :enableSorting="true"
              :enableColResize="true"
              >
              </ag-grid-vue>
            <template slot="footer">
              <div class="legend">
                Detailed Survey Listing
              </div>
            </template>
          </card>
        </div>
      </div>

       <!-- Section Header -->
      <div class="row d-flex justify-content-center ">
        <h4 class="section-head">Patient Survey Activity Summary</h4>
      </div>

      <div class="row justify-content-center">
        <div class="col-md-12">
          <card>
            <template slot="header">
              <!-- <span>Hover Over Column Header to View Menu</span> -->
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
              >
              </ag-grid-vue>
            <template slot="footer">
              <div class="legend">
                Patient Survey Listing
              </div>
            </template>
          </card>
        </div>
      </div>

    </div>      
  </div>
</template>

<script>
import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
import Card from 'src/components/UIComponents/Cards/Card.vue'

import Vue from "vue";
import { AgGridVue } from "ag-grid-vue"

import { mapState, mapGetters } from 'vuex'
// surveysGivenOverall
export default {
  name: 'surveys',
  components: {
    Card,
    StatsCard,
    AgGridVue
  },
  // data () {
  //   return {
  //     gridOptions: null,
  //     gridOptions1: null,
  //   }
  // },
  computed: {
    ...mapGetters([
      'siteSurveyTotals',
      'siteSurveyClinicTotals',
      'siteSurveyProviderTotals',
      'siteSurveyPatientTotals',
      'siteSurveyDetails',
      'siteSurveyPatientDetails'
    ]),
    rowData () {
      // return this.siteEncounterProviderDetails // filters when site changes
      // console.log('here is siteSurveyDetails from store ', this.siteSurveyDetails)
      return this.siteSurveyDetails // filters when site changes
    },
    rowData1 () {
      // return this.siteEncounterProviderDetails // filters when site changes
      // console.log('here is siteSurveyPatientDetails from store ', this.siteSurveyPatientDetails)
      return this.siteSurveyPatientDetails // filters when site changes
    },
  },
  beforeMount() {

    this.gridOptions = {},
    this.gridOptions1 = { 
      // groupHideOpenParents: true, 
      autoGroupColumnDef: {
        field: 'StaffName',
        // field: 'LocationName'
      } 
    },

    this.columnDefs = this.createColDefs(),
    this.columnDefs1 = this.createColDefs1(),

    this.onFilterChanged = function() {console.log('filter changed!!')}
   
  },
   methods: {
    createColDefs() {
      return [
        {headerName: "Surveys",
          children: [
            { headerName: "Site", 
              field: "StaPa", 
              width: 25, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agTextColumnFilter",
              cellRenderer:'agGroupCellRenderer'
            },
            { headerName: "Survey Name", 
              field: "SurveyName", 
              width: 50, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agTextColumnFilter"
            },
            { headerName: "Total", 
              field: "numSurveys", 
              width: 25, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agNumberColumnFilter"
            },
          ]
        }
      ]
    },
    createColDefs1() {
      return [
        // {
          // headerName: "Surveys By Patient",
          // children: [
            // { headerName: "Site", 
            //   field: "StaPa", 
            //   width: 10, 
            //   cellStyle: { 'text-align': "left" } ,
            //   filter: "agTextColumnFilter",
            //   cellRenderer:'agGroupCellRenderer',
            //   rowGroup: true,
            //   hide:true,
            // },
            // { headerName: "Institution", 
            //   field: "InstitutionName", 
            //   width: 200, 
            //   cellStyle: { 'text-align': "left" } ,
            //   filter: "agTextColumnFilter",
            //   rowGroup: true,
            //   hide:true,
            // },
            { headerName: "Provider", 
              field: "StaffName", 
              width: 200, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agTextColumnFilter",
              rowGroup: true,
              hide:true,
            },
            // { headerName: "Clinic Name", 
            //   field: "LocationName", 
            //   width: 50, 
            //   cellStyle: { 'text-align': "left" } ,
            //   filter: "agTextColumnFilter",
            //   rowGroup: true,
            //   hide:true,
            // },
            { headerName: "Patient", 
              field: "InitialsAndL4", 
              width: 100, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agTextColumnFilter",
              rowGroup: true,
              hide:true,
            },
            { headerName: "Survey", 
              field: "SurveyName", 
              width: 100, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agTextColumnFilter",
              // rowGroup: true,
              // hide:true,
            },
            { headerName: "Date", 
              field: "SurveyGivenDateTime", 
              width: 100, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agDateColumnFilter"
            },
            { headerName: "Score", 
              field: "RawScore", 
              width: 100, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agNumberColumnFilter"
            },
          // ]
        // }
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
        this.gridOptions1.api.sizeColumnsToFit()
        this.gridOptions1.api.expandAll();
      });
    },
  }
}
</script>
