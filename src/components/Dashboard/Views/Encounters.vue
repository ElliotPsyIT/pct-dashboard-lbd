<template>
  <transition name="fade" mode="out-in" >
    <div class="content" :key="selectedSite">
      <div class="container-fluid" :class="{filtering: changeBackgroundColor}">
         Scroll Position {{scrollPosition}}

        <!-- Show Filtered Sites -->
        <div v-if="changeBackgroundColor">
          <div class="row d-flex justify-content-center " style="position: fixed; right: 50px; z-index: 500;">
              <div style="font-size: .7rem; border: solid 1px grey; ">
                  {{ selectedInstitutionsNames }}
              </div>
          </div>
        </div>

      
        <!-- <div class="row d-flex justify-content-center"> -->

          <!-- <div class="col-xl-3 col-md-3">
            <stats-card>
              <div slot="header" class="icon-danger">
                <i class="nc-icon nc-vector text-danger"></i>
              </div>
              <div slot="content">
                <p class="card-category">No Show Appts/All ({{ siteEncounterApptNoShowTotal }}/{{ siteEncounterApptTotalStr}})</p>
                <h4 class="card-title">{{  siteEncounterAppNoShowPercent }}%</h4>
              </div>
            </stats-card>
          </div> -->

          <!-- <div class="col-xl-3 col-md-3">
            <stats-card>
              <div slot="header" class="icon-info">
                <i class="nc-icon nc-favourite-28 text-primary"></i>
              </div>
              <div slot="content">
                <p class="card-category">Any Cancelled Appts/All ({{ formatNumber(siteEncounterApptCancelTotal) }}/{{ siteEncounterApptTotalStr }})</p>
                <h4 class="card-title">{{ siteEncounterAppCancelPercent }}%</h4>
              </div>
            </stats-card>
          </div> -->

        <!-- </div> -->

        <!-- <div class="row d-flex justify-content-center">

          <div class="col-md-8">
            <template>
              <vue-highcharts :options="pieChartOptions"  ref="pieChart"></vue-highcharts>
            </template>
          </div>

        </div> -->

        <!-- Section Header -->
        <!-- <div class="row d-flex justify-content-center ">
          <h4 class="section-head">Clinic Level Cancel & No Show Summary</h4>
        </div> -->

        <!-- <div class="d-flex flex-row justify-content-center">

          <div class="col-md-12 ">
            <card>
              <template slot="header">
                <span>Hover Over Column Header to View Menu</span>
              </template>
                <ag-grid-vue style="font-size: 12px; height: 400px" class="ag-theme-balham grid" 
                :gridOptions="gridOptions3" 
                :rowData="rowData3" 
                :gridReady="onGridReady3"
                :enableFilter="true"
                :enableSorting="true"
                :enableColResize="true"
                >
                </ag-grid-vue>
              <template slot="footer">
                <div class="legend">
                  Detailed CPT Categories Listing
                </div>
              </template>
            </card>
          </div>

        </div> -->
      
        <!-- Section Header -->
        <div class="row d-flex justify-content-center ">
          <h4 class="section-head">Encounters and Patients</h4>
        </div>

        <!-- EncountersAll FAQ -->
        <div style="align-items: center; display: flex; justify-content: center; ">
          <div style="width: 60%; margin-bottom: 10px;">
           <VueFaqAccordion :items="encountersAll"/> 
          </div>
        </div>
        
        <div class="row d-flex justify-content-center">
 
          <div class="col-xl-3 col-md-3">                    
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon-outline nc-layers-3 text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">Total Encounters</p>
                <h4 class="card-title">
                  <transition name="fade" mode="out-in">
                    <span :key="siteEncounterTotal">
                      {{ asyncValue(formatNumber(siteEncounterTotal)) }}
                    </span>
                  </transition>
                </h4>
              </div>
              <!-- <div slot="footer">
                <i class="fa fa-calendar-o"></i>No Duplicates
              </div> -->
            </stats-card>
          </div>

          <div class="col-xl-3 col-md-3">
            <stats-card>
              <div slot="header" class="icon-success">
                <i class="nc-icon nc-single-02 text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">Patient Uniques</p>
                <h4 class="card-title">
                  <transition name="fade" mode="out-in">
                    <span :key="siteEncounterPatientTotal">
                      {{ asyncValue(formatNumber(siteEncounterPatientTotal)) }}
                    </span>
                  </transition>
                </h4>
              </div>
            </stats-card>
          </div>

        </div> <!-- end of row -->

        <!-- Chart Row -->
        <div class="row d-flex justify-content-center">
 
          <div class="col-md-8">
            <template>
              <vue-highcharts :options="lineChartOptions"  ref="lineChart"></vue-highcharts>
            </template>
          </div>

        </div>

        <!-- Psychotherapy Section -->
        <div class="row d-flex justify-content-center ">
          <h4 class="section-head">Psychotherapy Sessions</h4>
        </div>

        <!-- EncountersPsychotherapy FAQ -->
        <div style="align-items: center; display: flex; justify-content: center; ">
          <div style="width: 60%; margin-bottom: 10px;">
           <VueFaqAccordion :items="encountersPsychotherapy"/> 
          </div>
        </div>
        
        <div class="d-flex flex-row justify-content-center">
          
          <div class="col-xl-3 col-md-3">
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon-outline nc-single-01 text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">Individual<br/>
                  <transition name="fade" mode="out-in"> 
                   ({{ formatNumber(siteEncounterCPTIndividual) }}/
                    {{ formatNumber(siteEncounterTotal) }})
                  </transition>
                </p>
                <h4 class="card-title">
                  <transition name="fade" mode="out-in">
                    <span :key="siteEncounterCPTIndividualPercent">
                      {{ siteEncounterCPTIndividualPercent}}%
                    </span>
                  </transition>
                </h4>
              </div>
              </stats-card>
          </div>

          <div class="col-xl-3 col-md-3">          
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon-outline nc-multiple-11 text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">Group<br/> 
                  <transition name="fade" mode="out-in"> 
                    ({{ formatNumber(siteEncounterCPTGroup) }}/
                    {{ formatNumber(siteEncounterTotal) }})
                  </transition>
                </p>
                <h4 class="card-title">
                  <transition name="fade" mode="out-in">
                    <span :key="siteEncounterCPTGroupPercent">
                      {{ siteEncounterCPTGroupPercent}}%
                    </span>
                  </transition>
                </h4>
              </div>
            </stats-card>
          </div>

        </div>

        <!-- Psychotherapy Patients Section -->
        <div class="row d-flex justify-content-center ">
          <h4 class="section-head">Psychotherapy Patients by Session Types</h4>
        </div>

        <div class="d-flex flex-row justify-content-center">
          
          <div class="col-xl-3 col-md-4">
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon-outline nc-single-01 text-success"></i>
              </div>
              <div slot="content">
                <p class="card-category">Individual Tx Only </p>
                <h4 class="card-title">
                  <transition name="fade" mode="out-in">
                    <span :key="siteEncounterCPTPatientsIndOnly">
                      {{ asyncValue(formatNumber(siteEncounterCPTPatientsIndOnly)) }} Pts
                    </span>
                  </transition>
                </h4>
              </div>
              </stats-card>        
          </div>

          <div class="col-xl-3 col-md-4">
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon-outline nc-multiple-11 text-success"></i>
              </div>
              <div slot="content">
                <p class="card-category">Group Tx Only </p>
                <h4 class="card-title">
                  <transition name="fade" mode="out-in">
                    <span :key="siteEncounterCPTPatientsGrpOnly">
                      {{ asyncValue(formatNumber(siteEncounterCPTPatientsGrpOnly)) }} Pts
                    </span>
                  </transition>
                </h4>
              </div>
            </stats-card>        
          </div>

           <div class="col-xl-3 col-md-4">
             <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-preferences-circle-rotate text-success"></i>
              </div>
              <div slot="content">
                <p class="card-category">Both Ind and Grp Tx </p>
                <h4 class="card-title">
                  <transition name="fade" mode="out-in">
                    <span :key="siteEncounterCPTPatientsBoth">
                      {{ asyncValue(formatNumber(siteEncounterCPTPatientsBoth)) }} Pts
                    </span>
                  </transition>
                </h4>
              </div>
            </stats-card>         
          </div>

        </div>
      
        <!-- Other Services Section -->
        <div class="row d-flex justify-content-center ">
          <h4 class="section-head">Other Services Sessions</h4>
        </div>

        <!-- OtherServices FAQ -->
        <div style="align-items: center; display: flex; justify-content: center; ">
          <div style="width: 60%; margin-bottom: 10px;">
           <VueFaqAccordion :items="otherServices"/> 
          </div>
        </div>
        
        <div class="d-flex flex-row justify-content-center">
           
          <div class="col-xl-3 col-md-3">   
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon-outline nc-phone-2 text-info"></i>
              </div>
              <div slot="content">
                <p class="card-category">Telephone CPT ({{ formatNumber(siteEncounterCPTTelephone.total) }}/{{ formatNumber(siteEncounterTotal) }})</p>
                <h4 class="card-title">
                  <transition name="fade" mode="out-in">
                    <span :key="siteEncounterCPTTelephone.percent">
                      {{ siteEncounterCPTTelephone.percent }}%
                    </span>
                  </transition>
                </h4>
              </div>
            </stats-card>
          </div>

          <div class="col-xl-3 col-md-3">
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon-outline nc-multiple-11 text-info"></i>
              </div>
              <div slot="content">
                <p class="card-category">Group Education ({{ formatNumber(siteEncounterCPTGroupEducation.total) }}/{{formatNumber(siteEncounterTotal) }})</p>
                <h4 class="card-title">
                  <transition name="fade" mode="out-in">
                    <span :key="siteEncounterCPTGroupEducation.percent">
                      {{ siteEncounterCPTGroupEducation.percent }}%
                    </span>
                  </transition>
                </h4>
              </div>
            </stats-card>
          </div>
          
          <div class="col-xl-3 col-md-3">
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon-outline nc-single-folded-content text-info"></i>
              </div>
              <div slot="content">
                <p class="card-category">Assessment CPT ({{ formatNumber(siteEncounterCPTAssessment.total) }}/{{formatNumber(siteEncounterTotal) }})</p>
                <h4 class="card-title">
                  <transition name="fade" mode="out-in">
                    <span :key="siteEncounterCPTAssessment.percent">
                      {{ siteEncounterCPTAssessment.percent }}%
                    </span>
                  </transition>
                </h4>
              </div>
            </stats-card>
          </div>

          <div class="col-xl-3 col-md-3">            
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-refresh-02 text-info"></i>
              </div>
              <div slot="content">
                <p class="card-category">Prolonged Service ({{ formatNumber(siteEncounterCPTProlongedService.total) }}/{{formatNumber(siteEncounterTotal) }})</p>
                <h4 class="card-title">
                  <transition name="fade" mode="out-in">
                    <span :key="siteEncounterCPTProlongedService.percent">
                      {{ siteEncounterCPTProlongedService.percent }}%
                    </span>
                  </transition>
                </h4>
              </div>
            </stats-card>
          </div>

        </div>

        <!-- Encounter Categories Section -->
        <div class="row d-flex justify-content-center ">
          <h4 class="section-head">Encounters Categories Summary</h4>
        </div>

       <!-- encounterCategories FAQ -->
        <div style="align-items: center; display: flex; justify-content: center; ">
          <div style="width: 60%; margin-bottom: 10px;">
           <VueFaqAccordion :items="encounterCategories"/> 
          </div>
        </div>
        

        <div class="d-flex flex-row justify-content-center">

          <div class="col-md-8 ">
            <card>
              <template slot="header">
                <span>Hover Over Column Header to View Menu</span>
                <button class="float-right" @click="gridOptions2.api.exportDataAsCsv()">Export to CSV</button>
              </template>
              <ag-grid-vue style="font-size: 12px; height: 400px" class="ag-theme-balham grid" 
                :gridOptions="gridOptions2" 
                :rowData="rowData2" 
                :gridReady="onGridReady2"
                :enableFilter="true"
                :enableSorting="true"
                :enableColResize="true"
                >
              </ag-grid-vue>
              <template slot="footer">
                <div class="legend">
                  Detailed CPT Categories Listing
                </div>
              </template>
            </card>
          </div>

        </div>

        <!-- CPT Details Section -->
        <div class="row d-flex justify-content-center ">
          <h4 class="section-head">CPT Details</h4>
        </div>

       <!-- encounterCPTDetails FAQ -->
        <div style="align-items: center; display: flex; justify-content: center; ">
          <div style="width: 60%; margin-bottom: 10px;">
           <VueFaqAccordion :items="encounterCPTDetails"/> 
          </div>
        </div>
        
        <div class="row">
          
          <div class="col-md-12">
            <card>
              <template slot="header">
                <span>Hover Over Column Header to View Menu</span>
                <button class="float-right" @click="gridOptions.api.exportDataAsCsv()">Export to CSV</button>
              </template>
              <ag-grid-vue style="font-size: 12px; height: 500px" class="ag-theme-balham grid" 
                :gridOptions="gridOptions" 
                :rowData="rowData" 
                :gridReady="onGridReady"
                :enableFilter="true"
                :enableSorting="true"
                :enableColResize="true"
                >
              </ag-grid-vue>
              <template slot="footer">
                <div class="legend">
                  Detailed Encounter CPT Codes
                </div>
              </template>
            </card>
          </div>
        </div>

       </div> <!-- container-fluid -->

    </div> <!-- content -->

  </transition>

</template>
<script>
import ChartCard from 'src/components/UIComponents/Cards/ChartCard.vue'
import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
import Card from 'src/components/UIComponents/Cards/Card.vue'
import LTable from 'src/components/UIComponents/Table.vue'
import Checkbox from 'src/components/UIComponents/Inputs/Checkbox.vue'

import VueHighcharts from 'vue2-highcharts'

import Vue from "vue";
import { AgGridVue } from "ag-grid-vue";

import VueFaqAccordion from 'vue-faq-accordion'
import { encountersAll, 
        encountersPsychotherapy, 
        otherServices, 
        encounterCategories,
        encounterCPTDetails} from '../Documentation/encounter_doc.js'

import { addCommas, totalAndPercent, precise_round } from 'src/utils'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'encounters',
 
  components: {
    Card,
    ChartCard,
    StatsCard,
    VueHighcharts,
    AgGridVue,
    VueFaqAccordion,
  },
  beforeMount() { 
    this.gridOptions = {
      columnDefs:  this.createColDefs(),
      rowData: this.rowData, // computed prop
      suppressPropertyNamesCheck: true
    }
    
    this.gridOptions2 = {
      columnDefs:  this.createColDefs2(),
      rowData: this.rowData, // computed prop
      suppressPropertyNamesCheck: true
    }
 
  },
  mounted() {
    this.ENCOUNTER_COUNT()
    this.ENCOUNTER_LINE_CHART()
    this.ENCOUNTER_PATIENT_LINE_CHART()
    this.ENCOUNTER_CPT_CATEGORIES_PSYCHOTHERAPY()
    this.ENCOUNTER_CPT_CATEGORIES()
    this.ENCOUNTER_CPT()
    this.ENCOUNTER_PATIENT_CPT_CATEGORIES()
    // call action to signal the active page
    this.CURRENT_PAGE('encounter')
    // might be needed to assure institutions are available
    //    when app is opened and saved station is used
    this.GET_INSTITUTIONS()
  },
  
  computed: {
    ...mapState([
      'selectedSite', 
      'selectedRange', 
      'selectedInstitutions',
      'selectedInstitutionsNames',
    ]),
    ...mapGetters([
      'siteEncounterTotal', // all distinct visitsid w/ CPT filtering
      'siteEncounterPatientTotal', // all distinct patientSID w/ CPT filtering
      'siteEncounterLineChartSeries',
      'siteEncounterPatientLineChartSeries',

      'siteEncounterApptTotalStr', // for display
      
      'siteEncounterCPTTotal',
      'siteEncounterCPTCategories',
      'siteEncounterCPTIndividual',
      'siteEncounterCPTGroup',
      'siteEncounterCPTGroupEducation',
      'siteEncounterCPTAssessment',
      'siteEncounterCPTTelephone',
      'siteEncounterCPTProlongedService',
      'siteEncounterCPTPatientsIndOnly',
      'siteEncounterCPTPatientsGrpOnly',
      'siteEncounterCPTPatientsBoth',

      'siteProviderSelected',
      
    ]),
    scrollPosition () {
      // console.log('document.body.scrollHeight: ', document.body.scrollHeight)
      console.log('window.pageYOffset: ', window.pageYOffset)    
    },
    changeBackgroundColor () {
        // console.log('in changeBackgroundColor selectedInstitutions is: ', this.selectedInstitutions)
        return this.selectedInstitutions.length > 0 || false
    },      
    siteEncounterCPTIndividualPercent() {
      let percent = (+this.siteEncounterCPTIndividual / +this.siteEncounterTotal) * 100
      return precise_round(percent, 1)
    },
    siteEncounterCPTGroupPercent() {
      let percent = (+this.siteEncounterCPTGroup / +this.siteEncounterTotal) * 100
      return precise_round(percent, 1)
    },
    lineChartOptions () {
      return {
        chart: {  type: "spline" },
        title: {  text: 'Encounters and Unique Patients' },
        subtitle: {  text: "Monthly Counts" },
        xAxis: {
          categories: this.siteEncounterLineChartSeries.months
        },
        yAxis: {
          title: { text: "Monthly Data" },
          labels: {
            formatter: function() { return this.value; }
          }
        },
        tooltip: { crosshairs: true, shared: true },
        credits: { enabled: false },
        plotOptions: {
          spline: {
            marker: { radius: 4, lineColor: "#666666", lineWidth: 1 }
          },
          series: {
            dataLabels: {
              enabled: true
            }
          }
        },
        series: [{
          name: 'Monthly Encounters',
          data: this.siteEncounterLineChartSeries.series
        },{
          name: 'Monthly Patients',
          data: this.siteEncounterPatientLineChartSeries.series
        }]
      }
    },
    rowData () {
      return this.siteEncounterCPTTotal // filters when site changes
    },
    rowData2 () {
      return this.siteEncounterCPTCategories // filters when site changes
    },
  },
  data() {
    return {
      gridOptions: null,
      gridOptions2: null,
      // gridOptions3: null,
      duration: 2000,

      // Encounters FAQ
      encountersAll: encountersAll,
      encountersPsychotherapy: encountersPsychotherapy, 
      otherServices: otherServices, 
      encounterCategories: encounterCategories,
      encounterCPTDetails: encounterCPTDetails,
    }
  },
  methods: { 
    ...mapActions([
      'ENCOUNTER_COUNT',
      'ENCOUNTER_LINE_CHART',
      'ENCOUNTER_PATIENT_LINE_CHART',
      'ENCOUNTER_CPT_CATEGORIES_PSYCHOTHERAPY',
      'ENCOUNTER_CPT_CATEGORIES',
      'ENCOUNTER_CPT',
      'ENCOUNTER_PATIENT_CPT_CATEGORIES',
      'CURRENT_PAGE',
      'GET_INSTITUTIONS',

    ]),
    formatNumber(num) {
      return addCommas(num)
    },
    asyncValue(val, v) {
      let startingValue = val == 0 ? 'Loading...' : val
      return startingValue
    },
    createColDefs() {
      return [
        {headerName: "Encounters",
          children: [
            { headerName: "Site", 
              field: "StaPa", 
              width: 30, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agTextColumnFilter"
            },
            { headerName: "CPT Code", 
              field: "CPTCode", 
              width: 50, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agTextColumnFilter"
            },
            { headerName: "CPT Name", 
              field: "CPTName", 
              width: 120, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agTextColumnFilter"
            },
            // { headerName: "CPT Description", 
            //   field: "CPTDescription", 
            //   width: 150, 
            //   cellStyle: { 'text-align': "left" } ,
            //   filter: "agTextColumnFilter"
            // },
            { headerName: "Encounters", 
              field: "encountersPerCPT", 
              width: 40, 
              cellStyle: { 'text-align': "left" },
              filter: "agNumberColumnFilter"
            },
          ]
        },
      ]
    },
    createColDefs2() {
      return [
        {headerName: "CPT Categories",
          children: [
            { headerName: "Site", 
              field: "StaPa", 
              width: 20, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agTextColumnFilter"
            },
            { headerName: "Category (hover for full description)", 
              field: "CPTCategory", 
              width: 80, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agTextColumnFilter",
              tooltip: (params) => params.value
            },
            { headerName: "Total", 
              field: "totalNum", 
              width: 20, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agNumberColumnFilter"
            },
            { headerName: "%", 
              field: "PercentageCPT", 
              width: 18, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agTextColumnFilter"
            },
          ]
        },
      ]
    },
    // createColDefs3() {
    //   return [
    //     {headerName: "Provider Clinic Cancel NoShow",
    //       children: [
    //         { headerName: "Site", 
    //           field: "StaPa", 
    //           width: 15, 
    //           cellStyle: { 'text-align': "left" } ,
    //           filter: "agTextColumnFilter"
    //         },
    //         // { headerName: "Staff", 
    //         //   field: "StaffName", 
    //         //   width: 30, 
    //         //   cellStyle: { 'text-align': "left" } ,
    //         //   filter: "agTextColumnFilter"
    //         // },
    //         { headerName: "Clinic", 
    //           field: "LocationName", 
    //           width: 30, 
    //           cellStyle: { 'text-align': "left" } ,
    //           filter: "agTextColumnFilter"
    //         },
    //         { headerName: "Appt Type", 
    //           field: "CancelNoShow", 
    //           width: 30, 
    //           cellStyle: { 'text-align': "left" } ,
    //           filter: "agTextColumnFilter"
    //         },
    //         { headerName: "Cancel/NS Count", 
    //           field: "CancelNoShowCount", 
    //           width: 25, 
    //           cellStyle: { 'text-align': "left" } ,
    //           filter: "agNumberColumnFilter"
    //         },
    //         { headerName: "Clinic Appts", 
    //           field: "ClinicAppointmentTotal", 
    //           width: 20, 
    //           cellStyle: { 'text-align': "left" } ,
    //           filter: "agNumberColumnFilter"
    //         },
    //         { headerName: "Site Appts", 
    //           field: "StaPaTotal", 
    //           width: 20, 
    //           cellStyle: { 'text-align': "left" } ,
    //           filter: "agNumberColumnFilter"
    //         },
    //       ]
    //     },
    //   ]
    // },
    onGridReady() {
      this.gridOptions.api.sizeColumnsToFit();
    },
    onGridReady2() {
      this.gridOptions2.api.sizeColumnsToFit();
    },
    onRowDataChanged() {
      console.log('row data changed!!')
      Vue.nextTick(() => {
        this.gridOptions.api.sizeColumnsToFit();
      });
    },
    onRowDataChanged2() {
      console.log('row data changed!!')
      Vue.nextTick(() => {
        this.gridOptions2.api.sizeColumnsToFit();
      });
    },
  }
}
</script>
<style>

  .filtering {
    background-color: lightgrey;
  }

  .section-head {
    font-size: 2rem;
  }

/* fade page in and out when site changes */

.fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter,
  .fade-leave-to
    /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0
  }

/* slide and fade */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}


</style>
