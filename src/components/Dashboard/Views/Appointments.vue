<template>
    <transition name="fade" mode="out-in">
    <div class="content" :key="selectedSite">
      <div class="container-fluid">
        
        <!-- Section Header -->
        <div class="row d-flex justify-content-center ">
          <h4 class="section-head">No Show & Cancel Summary Stats</h4>
        </div>
      
      
        <div class="row d-flex justify-content-center">

          <div class="col-xl-3 col-md-3">
            <stats-card>
              <div slot="header" class="icon-danger">
                <i class="nc-icon nc-chart-pie-36 text-danger"></i>
              </div>
              <div slot="content">
                <p class="card-category">No Show Appts/All ({{ siteEncounterApptNoShowTotal }}/{{ siteEncounterApptTotalStr}})</p>
                <h4 class="card-title">{{  siteEncounterAppNoShowPercent }}%</h4>
              </div>
            </stats-card>
          </div>

          <div class="col-xl-3 col-md-3">
            <stats-card>
              <div slot="header" class="icon-info">
                <i class="nc-icon nc-simple-remove text-danger"></i>
              </div>
              <div slot="content">
                <p class="card-category">Any Cancelled Appts/All ({{ formatNumber(siteEncounterApptCancelTotal) }}/{{ siteEncounterApptTotalStr }})</p>
                <h4 class="card-title">{{ siteEncounterAppCancelPercent }}%</h4>
              </div>
            </stats-card>
          </div>

        </div>

        <div class="row d-flex justify-content-center">

          <div class="col-md-8">
            <template>
              <vue-highcharts :options="pieChartOptions"  ref="pieChart"></vue-highcharts>
            </template>
          </div>

        </div>

        <!-- Section Header -->
        <div class="row d-flex justify-content-center ">
          <h4 class="section-head">Clinic Level Cancel & No Show Summary</h4>
        </div>

        <div class="d-flex flex-row justify-content-center">

          <div class="col-md-12 ">
            <card>
              <template slot="header">
                <span>Hover Over Column Header to View Menu</span>
                <button class="float-right" @click="gridOptions3.api.exportDataAsCsv()">Export to CSV</button>
              </template>
              <!-- {{siteEncounterApptProviderClinicNoShowTotal}} -->
                <ag-grid-vue style="font-size: 12px; height: 400px" class="ag-theme-balham grid" 
                :gridOptions="gridOptions3" 
                :rowData="rowData3" 
                :gridReady="onGridReady3"
                :enableFilter="true"
                :enableSorting="true"
                :enableColResize="true"
                >
                </ag-grid-vue>
                <!-- :rowDataChanged="onRowDataChanged3" -->
              <template slot="footer">
                <div class="legend">
                  Detailed CPT Categories Listing
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
import ChartCard from 'src/components/UIComponents/Cards/ChartCard.vue'
import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
import Card from 'src/components/UIComponents/Cards/Card.vue'
import LTable from 'src/components/UIComponents/Table.vue'
import Checkbox from 'src/components/UIComponents/Inputs/Checkbox.vue'

import VueHighcharts from 'vue2-highcharts'

import Vue from "vue";
import { AgGridVue } from "ag-grid-vue";

import { addCommas, totalAndPercent } from 'src/utils'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'encounters',
  components: {
    Card,
    ChartCard,
    StatsCard,
    VueHighcharts,
    AgGridVue
  },
  computed: {
    ...mapState([
      'selectedSite', 'selectedRange'
    ]),
    ...mapGetters([
      'siteEncounterApptClinicNoShowTotal',
      'siteEncounterApptCancelNoShowPieChart',
      'siteEncounterApptNoShowTotal',
      'siteEncounterApptCancelTotal',
      'siteEncounterApptTotalStr', // for display
      'siteEncounterApptTotal', // for computation

    ]),
    
    siteEncounterAppNoShowPercent () {
      return Math.round((this.siteEncounterApptNoShowTotal/this.siteEncounterApptTotal) * 100)
    },

    siteEncounterAppCancelPercent () {
      return Math.round((this.siteEncounterApptCancelTotal/this.siteEncounterApptTotal) * 100)
      // return precise_round((this.siteEBPSessionsPECPT/this.siteALLSessions) * 100, 1) 
    },
    pieChartOptions () {
      return {
        chart:      { type: "pie", 
                        options3d: { enabled: true, alpha: 45 }},
        title:      { text: 'Cancel NoShow Totals' },
        subtitle:   { text: 'Hover over sections for Patient data' },
        credits:    { enabled: false },
        plotOptions: { pie: { innerSize: 100, depth: 45 },
                        series: { allowPointSelect: true }},
        series: [
          {
            name: "patient totals",
            events: {
              click: function (event) {
                console.log('pie slice clicked, here is event: ', event)
                let points = this.chart.getSelectedPoints()
                console.log('getSelectedPoints: ', typeof points[0])
              }
            },
            data: this.siteEncounterApptCancelNoShowPieChart,
            dataLabels: {
              formatter: function () {
                // console.log('this.point is: ', this.point)
                return this.point.name + ':<br/>' + '(' + this.y + ')'
                // return `${this.point.name}:<br/>(${this.y})`
              }
            }
          } 
        ]
      } 
    },
    rowData3 () {
      return this.siteEncounterApptClinicNoShowTotal // filters when site changes    
    },
  },
  beforeMount() { 
    this.gridOptions3 = {
      columnDefs:  this.createColDefs3(),
      rowData: this.rowData, // computed prop
      suppressPropertyNamesCheck: true
    }    
  },
  mounted() {
    this.APPOINTMENT_CLINIC_CANCEL_NOSHOW_TOTALS()
    this.APPOINTMENT_CANCEL_NOSHOW_TOTALS()
    this.APPOINTMENT_COUNT()
  },
  methods: {
    ...mapActions([
      'APPOINTMENT_CLINIC_CANCEL_NOSHOW_TOTALS','APPOINTMENT_CANCEL_NOSHOW_TOTALS',
      'APPOINTMENT_COUNT'
    ]),
    formatNumber(num) {
      return addCommas(num)
    },
    createColDefs3() {
      return [
        {headerName: "Provider Clinic Cancel NoShow",
          children: [
            { headerName: "Site", 
              field: "StaPa", 
              width: 15, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agTextColumnFilter"
            },
            // { headerName: "Staff", 
            //   field: "StaffName", 
            //   width: 30, 
            //   cellStyle: { 'text-align': "left" } ,
            //   filter: "agTextColumnFilter"
            // },
            { headerName: "Clinic", 
              field: "LocationName", 
              width: 30, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agTextColumnFilter"
            },
            { headerName: "Appt Type", 
              field: "CancelNoShow", 
              width: 30, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agTextColumnFilter"
            },
            { headerName: "Cancel/NS & Visits", 
              field: "CancelNoShowCount", 
              width: 25, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agNumberColumnFilter"
            },
            { headerName: "Clinic Appts", 
              field: "ClinicAppointmentTotal", 
              width: 20, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agNumberColumnFilter"
            },
            { headerName: "Site Appts", 
              field: "StaPaTotal", 
              width: 20, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agNumberColumnFilter"
            },
          ]
        },
      ]
    },
    onGridReady3() {
      this.gridOptions3.api.sizeColumnsToFit();
    },
    onRowDataChanged3() {
      console.log('row data changed!!')
      Vue.nextTick(() => {
        this.gridOptions3.api.sizeColumnsToFit();
      });
    },
  },
  data() {
    return {
      gridOptions3: null,
    }
  }
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




