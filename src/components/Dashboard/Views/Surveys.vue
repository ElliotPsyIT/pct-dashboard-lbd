<template>
  <transition name="fade" mode="out-in">
    <div class="content" :key="selectedSite">
      <div class="container-fluid">
        
      <!-- Section Header -->
      <div class="row d-flex justify-content-center ">
        <h4 class="section-head">Surveys Summary</h4>
      </div>

        <!--  FAQ -->
        <div style="align-items: center; display: flex; justify-content: center; ">
          <div style="width: 60%; margin-bottom: 10px;">
           <VueFaqAccordion :items="SurveysSummary"/> 
          </div>
        </div>

      <div class="row d-flex justify-content-center">
      <!-- siteSurveyTotals -->
        <div class="col-xl-3 col-md-3">
        
          <stats-card :key="siteSurveyTotals.surveysGivenOverall">
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-paper-2 text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Total Surveys Given</p>
              <!-- <h4 class="card-title">{{ siteEncounterCPTAssessment.total }}/{{ siteEncounterCPTAssessment.percent }}%</h4> -->
              <h4 class="card-title">{{ siteSurveyTotals.surveysGivenOverall }}</h4>
            </div>
          </stats-card>
        
        </div>

      </div>

        <!--  FAQ -->
        <div style="align-items: center; display: flex; justify-content: center; ">
          <div style="width: 60%; margin-bottom: 10px;">
           <VueFaqAccordion :items="ClinicsProvidersPatients"/> 
          </div>
        </div>

      <!-- Section Header -->
      <div class="row d-flex justify-content-center ">
        <!-- <h4 class="section-head">Clinics, Providers, Patients</h4> -->
      </div>
        <!-- siteSurveyClinicTotals -->
      <div class="row d-flex justify-content-center">
        <div class="col-xl-3 col-md-4">
          <h4 class="section-head d-flex justify-content-center"> Clinics </h4>
          <stats-card :key="siteSurveyClinicTotals.surveysGivenClinics">
            <div slot="header" class="icon-warning">
              <i class="nc-icon-outline nc-home-52 text-warning"></i>
            </div>
            <div slot="content" >
              <p class="card-category">Surveys in Clinics / <br/>All Clinics</p>
              <!-- <h4 class="card-title">{{ siteEncounterCPTAssessment.total }}/{{ siteEncounterCPTAssessment.percent }}%</h4> -->
              <h4 class="card-title">{{ siteSurveyClinicTotals.surveysGivenClinics }}/{{ siteSurveyClinicTotals.surveysTotalClinics }}</h4>
            </div>
          </stats-card>
        
        </div>

        <!-- siteSurveyProviderTotals -->
        <div class="col-xl-3 col-md-4">
          <h4 class="section-head d-flex justify-content-center"> Providers </h4>
          <stats-card :key="siteSurveyProviderTotals.surveysGivenProviders">
           <div slot="header" class="icon-warning">
              <i class="nc-icon nc-badge text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Surveys by Providers / <br/>All Providers</p>
              <!-- <h4 class="card-title">{{ siteEncounterCPTAssessment.total }}/{{ siteEncounterCPTAssessment.percent }}%</h4> -->
              <h4 class="card-title">{{ siteSurveyProviderTotals.surveysGivenProviders }}/{{ siteSurveyProviderTotals.surveysTotalProviders }}</h4>
            </div>
          </stats-card>
        
        </div>

        <!-- siteSurveyPatientTotals -->
        <div class="col-xl-3 col-md-4">
          <h4 class="section-head d-flex justify-content-center"> Patients </h4>
          <stats-card :key="siteSurveyPatientTotals.surveysGivenPatients">
            <div slot="header" class="icon-warning">
              <i class="nc-icon-outline nc-multiple-11 text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Surveys by Patients / <br/>All Patients</p>
              <!-- <h4 class="card-title">{{ siteEncounterCPTAssessment.total }}/{{ siteEncounterCPTAssessment.percent }}%</h4> -->
              <h4 class="card-title">{{ siteSurveyPatientTotals.surveysGivenPatients }}/{{ siteSurveyPatientTotals.surveysTotalPatients }}</h4>
            </div>
          </stats-card>

        </div>

      </div>

        <!-- Section Header -->
        <div class="row d-flex justify-content-center ">
          <h4 class="section-head">Survey Types Given</h4>
        </div>

        <!--  FAQ -->
        <div style="align-items: center; display: flex; justify-content: center; ">
          <div style="width: 60%; margin-bottom: 10px;">
           <VueFaqAccordion :items="SurveyTypesGiven"/> 
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-md-6">
            <card>
              <template slot="header">
                <span>Hover Over Column Header to View Menu</span>
                <button class="float-right" @click="gridOptions.api.exportDataAsCsv()">Export to CSV</button>
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
          <h4 class="section-head">Surveys to Patients - By Provider</h4>
        </div>

        <!--  FAQ -->
        <div style="align-items: center; display: flex; justify-content: center; ">
          <div style="width: 60%; margin-bottom: 10px;">
           <VueFaqAccordion :items="SurveysToPatientsByProvider"/> 
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-md-12">
            <card>
              <template slot="header">
                <!-- <span>Hover Over Column Header to View Menu</span> -->
                <button @click="gridOptions1.api.collapseAll()" >Collapse All</button>
                <button @click="gridOptions1.api.expandAll()" >Expand All</button>
                <button class="float-right" @click="gridOptions1.api.exportDataAsCsv()">Export to CSV</button>
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

  </transition>
</template>

<script>
import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
import Card from 'src/components/UIComponents/Cards/Card.vue'

import Vue from "vue";
import { AgGridVue } from "ag-grid-vue"

import VueFaqAccordion from 'vue-faq-accordion'

import { mapState, mapGetters, mapActions } from 'vuex'
// surveysGivenOverall
export default {
  name: 'surveys',
  components: {
    Card,
    StatsCard,
    AgGridVue,
    VueFaqAccordion
  },
  data () {
    return {
  //     gridOptions: null,
  //     gridOptions1: null,
      SurveysSummary: [
        {
          title: "Surveys Summary",
          value: "<u><b>Description</b></u>: These are the total number of surveys (measures) administered.  Only completed surveys are tallied and displayed here.",
          category: "Surveys Summary Defined..."
        }
      ],
      ClinicsProvidersPatients: [
        {
          title: "Clinics",
          value: "<u><b>Description</b></u>: These are the number of PCT clinics administering surveys among all PCT clinics at this site. The intent is to show how many PCT Clinics " +
          "are administering surveys in the course of their activities.<br/><br/>" +
          "The numerator is the number of PCT clinics (based on clinic PCT Stop Codes) administering surveys, and the denominator is the number of PCT clinics at this site.  ",
          category: "Clinics, Providers, Patients Defined ..."
        },
        {
          title: "Providers",
          value: "<u><b>Description</b></u>:These are the number of PCT providers administering surveys among all PCT providers at this site. The intent is to show how many PCT providers " +
          "are administering surveys in the course of their activities.<br/><br/>" +
          "The numerator is the number of PCT providers (based on PCT Stop Codes) administering surveys, and the denominator is the number of PCT providers seeing patients at this site.  ",
          category: "Clinics, Providers, Patients Defined ..."
        },
        {
          title: "Patients",
          value: "<u><b>Description</b></u>:These are the number of PCT patients administering surveys among all PCT patients at this site. The intent is to show the relative percentage of PCT patients " +
          "are administerered surveys in the course of their assessment/treatment.<br/><br/>" +
          "The numerator is the number of PCT patients (based on PCT Stop Codes) being administered surveys, and the denominator is the number of PCT patients with encounters at this site.  ",
          category: "Clinics, Providers, Patients Defined ..."
        }
      ],
      SurveyTypesGiven: [
        {
          title: "SurveyTypesGiven",
          value: "<u><b>Description</b></u>: Theses are counts of the number of surveys (measures) administered within PCT clinics at this site. ",
          category: "Survey Types Given Defined..."
        }
      ],
      SurveysToPatientsByProvider: [
        {
          title: "Surveys To Patients By Provider",
          value: "<u><b>Description</b></u>: The Surveys To Patients By Provider table lists the surveys and survey scores administered to each patient by each provider in each PCT Clinic. " +
          "<br/><br/><font color='red'><b>NOTE:</b> While most PCT administered surveys are listed in the table with a total score on one table row (e.g. PCL-5, PHQ9), several of the FY19 screening measures are listed by individual item score - one row per item (e.g. PHQ2-I9, CSSRS). " +
          "As a result, at first glance it may appear that a screening measure is incorrectly duplicated, but a closer look will reveal the multiple rows are correctly listing item level scores. ",
          category: "Surveys To Patients By Provider Defined..."
        }
      ]

    }
  },
  computed: {
    ...mapGetters([
      'siteSurveyTotals',
      'siteSurveyClinicTotals',
      'siteSurveyProviderTotals',
      'siteSurveyPatientTotals',
      'siteSurveyDetails',
      'siteSurveyPatientDetails'
    ]),
    ...mapState(['selectedSite']),

    rowData () {
      // console.log('here is siteSurveyDetails from store ', this.siteSurveyDetails)
      return this.siteSurveyDetails // filters when site changes
    },
    rowData1 () {
      // console.log('here is siteSurveyPatientDetails from store ', this.siteSurveyPatientDetails)
      return this.siteSurveyPatientDetails // filters when site changes
    },
  },
  beforeMount() {

    this.gridOptions = {
      suppressPropertyNamesCheck: true
    },
    this.gridOptions1 = { 
      // groupHideOpenParents: true, 
      
      autoGroupColumnDef: {
        headerName: 'Staff / Patient / Clinic',
        field: 'StaffName',
        field: 'LocationName'
      },
      suppressPropertyNamesCheck: true
    },

    this.columnDefs = this.createColDefs(),
    this.columnDefs1 = this.createColDefs1(),

    this.onFilterChanged = function() {console.log('filter changed!!')}
   
  },
  mounted() {
    this.SURVEY_TOTALS()
    this.SURVEY_DETAILS()
    this.SURVEY_PATIENT_DETAILS()

    this.CURRENT_PAGE('survey')
  },
   methods: {
    ...mapActions([
      'SURVEY_TOTALS',
      'SURVEY_DETAILS',
      'SURVEY_PATIENT_DETAILS',

      'CURRENT_PAGE',
    ]),     
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
            { headerName: "Provider", 
              field: "OrderedBy", 
              width: 200, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agTextColumnFilter",
              rowGroup: true,
              hide:true,
            },
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
      // console.log('row data changed!!')
      Vue.nextTick(() => {
        this.gridOptions.api.sizeColumnsToFit();
      });
    },
    onRowDataChanged1() {
      // console.log('row1 data changed!!')
      Vue.nextTick(() => {
        this.gridOptions1.api.sizeColumnsToFit()
        // this.gridOptions1.api.expandAll();
      });
    },
  }
}
</script>
<style>
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
