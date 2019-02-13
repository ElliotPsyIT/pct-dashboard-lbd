<template>
  <transition name="fade" mode="out-in">
    <div class="content" :key="selectedSite">
      <div class="container-fluid">
        
        <!-- Section Header -->
        <!-- <div class="row d-flex justify-content-center ">
          <h4 class="section-head">No Show & Cancel Summary Stats</h4>
        </div> -->
      
      
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

        <div class="row d-flex justify-content-center">
 
        <div class="col-xl-3 col-md-3">
            <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon-outline nc-layers-3 text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Total Encounters</p>
              <h4 class="card-title">{{ siteEncounterTotal }}</h4>
            </div>
            <!-- <div slot="footer">
                <i class="fa fa-refresh"></i>With Duplicates
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
                <h4 class="card-title">{{ siteEncounterPatientTotal }}</h4>
              </div>
              <!-- <div slot="footer">
                <i class="fa fa-calendar-o"></i>No Duplicates
              </div> -->
            </stats-card>
          </div>

        </div>

        <div class="row d-flex justify-content-center">
 
          <div class="col-md-8">
            <!-- <span>{{ selectedSite }} {{ selectedRange }}</span> -->

            <template>
              <vue-highcharts :options="lineChartOptions"  ref="lineChart"></vue-highcharts>
            </template>
          </div>

        </div>

        <!-- Section Header -->
        <div class="row d-flex justify-content-center ">
          <h4 class="section-head">Psychotherapy Sessions</h4>
        </div>

        <div class="d-flex flex-row justify-content-center">
          
          <div class="col-xl-3 col-md-3">

            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon-outline nc-single-01 text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">Individual<br/>({{ siteEncounterCPTIndividual.total }}/{{formatNumber(siteEncounterApptTotal)}})</p>
                <h4 class="card-title">{{ siteEncounterCPTIndividual.percent }}%</h4>
              </div>
              </stats-card>
          
          </div>

          <div class="col-xl-3 col-md-3">
            
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon-outline nc-multiple-11 text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">Group<br/> ({{ siteEncounterCPTGroup.total }}/{{formatNumber(siteEncounterApptTotal)}})</p>
                <h4 class="card-title">{{ siteEncounterCPTGroup.percent }}%</h4>
              </div>
            </stats-card>

          </div>

        </div>

 <!-- Section Header -->
        <div class="row d-flex justify-content-center ">
          <h4 class="section-head">Patients Receiving Psychotherapy</h4>
        </div>

        <div class="d-flex flex-row justify-content-center">
          
          <div class="col-xl-3 col-md-4">

            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon-outline nc-single-01 text-success"></i>
              </div>
              <div slot="content">
                <p class="card-category">Individual Tx Only </p>
                <h4 class="card-title">{{siteEncounterCPTPatientsIndOnly}} Pts</h4>
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
              <h4 class="card-title">{{siteEncounterCPTPatientsGrpOnly}} Pts</h4>
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
                <h4 class="card-title">{{siteEncounterCPTPatientsBoth}} Pts</h4>
              </div>
              </stats-card>
          
          </div>

        </div>

        <!-- Section Header -->
        <!-- <div class="row d-flex justify-content-center ">
          <h4 class="section-head">Individual and Group Psychotherapy Patients Only</h4>
        </div> -->

        <!-- <div class="d-flex flex-row justify-content-center">
          
          <div class="col-xl-3 col-md-4">

            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon-outline nc-single-01 text-success"></i>
              </div>
              <div slot="content">
                <p class="card-category">Individual Tx Only </p>
                <h4 class="card-title">{{siteEncounterCPTPatientsIndOnly}} Pts</h4>
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
              <h4 class="card-title">{{siteEncounterCPTPatientsGrpOnly}} Pts</h4>
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
                <h4 class="card-title">{{siteEncounterCPTPatientsBoth}} Pts</h4>
              </div>
              </stats-card>
          
          </div>

        </div> -->

        <!-- <div class="d-flex flex-row"> -->
        <!-- Section Header -->
        <div class="row d-flex justify-content-center ">
          <h4 class="section-head">Other Services</h4>
        </div>

      <div class="d-flex flex-row justify-content-center">
           
          <div class="col-xl-3 col-md-3">
            
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon-outline nc-phone-2 text-info"></i>
              </div>
              <div slot="content">
                <p class="card-category">Telephone CPT ({{ siteEncounterCPTTelephone.total }}/{{formatNumber(siteEncounterApptTotal)}})</p>
                <h4 class="card-title">{{ siteEncounterCPTTelephone.percent }}%</h4>
              </div>
            </stats-card>

          </div>

          <div class="col-xl-3 col-md-3">
            
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon-outline nc-multiple-11 text-info"></i>
              </div>
              <div slot="content">
                <p class="card-category">Group Education ({{ siteEncounterCPTGroupEducation.total }}/{{formatNumber(siteEncounterApptTotal)}})</p>
                <h4 class="card-title">{{ siteEncounterCPTGroupEducation.percent }}%</h4>
              </div>
            </stats-card>

          </div>
          
          <div class="col-xl-3 col-md-3">
            
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon-outline nc-single-folded-content text-info"></i>
              </div>
              <div slot="content">
                <p class="card-category">Assessment CPT ({{ siteEncounterCPTAssessment.total }}/{{formatNumber(siteEncounterApptTotal)}})</p>
                <h4 class="card-title">{{ siteEncounterCPTAssessment.percent }}%</h4>
              </div>
              </stats-card>

          </div>

          <div class="col-xl-3 col-md-3">
            
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-refresh-02 text-info"></i>
              </div>
              <div slot="content">
                <p class="card-category">Prolonged Service ({{ siteEncounterCPTProlongedService.total }}/{{formatNumber(siteEncounterApptTotal)}})</p>
                <h4 class="card-title">{{ siteEncounterCPTProlongedService.percent }}%</h4>
              </div>
              </stats-card>

          </div>

        </div>

        <!-- Section Header -->
        <div class="row d-flex justify-content-center ">
          <h4 class="section-head">CPT Categories Summary</h4>
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
                <!-- :rowDataChanged="onRowDataChanged2" -->
              <template slot="footer">
                <div class="legend">
                  Detailed CPT Categories Listing
                </div>
              </template>
            </card>
          </div>

        </div>

            <!-- <div class="d-flex flex-row">
              <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">Individual Therapy</p>
                <h4 class="card-title">{{ siteEncounterCPTIndividual.total }}/{{ siteEncounterCPTIndividual.percent }}%</h4>
              </div>
              </stats-card>
            </div>
          
            <div class="d-flex flex-row">
              <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">Group Education</p>
                <h4 class="card-title">{{ siteEncounterCPTGroupEducation.total }}/{{ siteEncounterCPTGroupEducation.percent }}%</h4>
              </div>
              </stats-card>
            </div>

            <div class="d-flex flex-row">
              <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">Telephone</p>
                <h4 class="card-title">{{ siteEncounterCPTTelephone.total }}/{{ siteEncounterCPTTelephone.percent }}%</h4>
              </div>
              </stats-card>
            </div> -->

          <!-- </div> -->

          <!-- <div class="col-xl-3 col-md-3">
            
            <div class="d-flex flex-row ">
              <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">Group Therapy</p>
                <h4 class="card-title">{{ siteEncounterCPTGroup.total }}/{{ siteEncounterCPTGroup.percent }}%</h4>
              </div>
              </stats-card>
            </div>

            <div class="d-flex flex-row">
              <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">Assessment</p>
                <h4 class="card-title">{{ siteEncounterCPTAssessment.total }}/{{ siteEncounterCPTAssessment.percent }}%</h4>
              </div>
              </stats-card>
            </div>

            <div class="d-flex flex-row">
              <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">Prolonged Service</p>
                <h4 class="card-title">{{ siteEncounterCPTProlongedService.total }}/{{ siteEncounterCPTProlongedService.percent }}%</h4>
              </div>
              </stats-card>
            </div> -->

          <!-- </div> -->

          <!-- <div class="col-md-6">
            <card>
              <template slot="header">
                <span>Hover Over Column Header to View Menu</span>
              </template>
                <ag-grid-vue style="font-size: 12px; height: 400px" class="ag-theme-balham grid" 
                :gridOptions="gridOptions2" 
                :rowData="rowData2" 
                :rowDataChanged="onRowDataChanged2"
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
          </div> -->

        <!-- </div> -->

        <!-- Section Header -->
        <div class="row d-flex justify-content-center ">
          <h4 class="section-head">CPT Details</h4>
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
                <!-- :rowDataChanged="onRowDataChanged" -->
              <template slot="footer">
                <div class="legend">
                  Detailed Encounter CPT Codes
                </div>
              </template>
            </card>
          </div>
        </div>

        <div class="row">

          <!-- <div class="col-md-6">
            <card>
              <template slot="header">
                <span>CPT Categories Details (Hover Over a Header to Filter the Column)</span>
              </template>
                <ag-grid-vue style="font-size: 12px; height: 400px" class="ag-theme-balham grid" 
                :gridOptions="gridOptions2" 
                :rowData="rowData2" 
                :rowDataChanged="onRowDataChanged2"
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
          </div> -->

        </div>

        <!-- <div class="row">

          <div class="col-md-8">
            <chart-card :chart-data="lineChart.data" :chart-options="lineChart.options" :responsive-options="lineChart.responsiveOptions">
              <template slot="header">
                <h4 class="card-title">Users Behavior</h4>
                <p class="card-category">24 Hours performance</p>
              </template>
              <template slot="footer">
                <div class="legend">
                  <i class="fa fa-circle text-info"></i> Open
                  <i class="fa fa-circle text-danger"></i> Click
                  <i class="fa fa-circle text-warning"></i> Click Second Time
                </div>
                <hr>
                <div class="stats">
                  <i class="fa fa-history"></i> Updated 3 minutes ago
                </div>
              </template>
            </chart-card>
          </div>

          <div class="col-md-4">
            <chart-card :chart-data="pieChart.data" chart-type="Pie">
              <template slot="header">
                <h4 class="card-title">Email Statistics</h4>
                <p class="card-category">Last Campaign Performance</p>
              </template>
              <template slot="footer">
                <div class="legend">
                  <i class="fa fa-circle text-info"></i> Open
                  <i class="fa fa-circle text-danger"></i> Bounce
                  <i class="fa fa-circle text-warning"></i> Unsubscribe
                </div>
                <hr>
                <div class="stats">
                  <i class="fa fa-clock-o"></i> Campaign sent 2 days ago
                </div>
              </template>
            </chart-card>
          </div>

        </div> -->

        <!-- <div class="row">

                <div class="col-md-6">
                  hello there!!!!!!!!!!!!!!!!!!!!!!!
                  {{ pieOptions.title.text }}
                </div>
        
            </div> -->

        <!-- <div class="row">
          <div class="col-md-6">
            <chart-card :chart-data="barChart.data" :chart-options="barChart.options" :chart-responsive-options="barChart.responsiveOptions" chart-type="Bar">
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

          <!-- <div class="col-md-6">
            <card>
              <template slot="header">
                <h5 class="title">Tasks</h5>
                <p class="category">Backend development</p>
              </template>
              <l-table :data="tableData.data" :columns="tableData.columns">
                <template slot="columns"></template>

                <template slot-scope="{row}">
                  <td>
                    <Checkbox v-model="row.checked"></Checkbox>
                  </td>
                  <td>{{row.title}}</td>
                  <td class="td-actions text-right">
                    <button type="button" class="btn-simple btn btn-xs btn-info" v-tooltip.top-center="editTooltip">
                      <i class="fa fa-edit"></i>
                    </button>
                    <button type="button" class="btn-simple btn btn-xs btn-danger" v-tooltip.top-center="deleteTooltip">
                      <i class="fa fa-times"></i>
                    </button>
                  </td>
                </template>
              </l-table>
              <div class="footer">
                <hr>
                <div class="stats">
                  <i class="fa fa-history"></i> Updated 3 minutes ago
                </div>
              </div>
            </card> -->

          <!-- </div>
        </div> -->
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

import { mapState, mapGetters } from 'vuex'

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
      'siteEncounterTotal', // all distinct visitsid no CPT filtering
      'siteEncounterPatientTotal', // all distinct patientSID no CPT filtering
      'siteEncounterLineChartSeries',
      'siteEncounterPatientLineChartSeries',

      'siteEncounterApptClinicNoShowTotal',
      'siteEncounterApptCancelNoShowPieChart',
      'siteEncounterApptNoShowTotal',
      'siteEncounterApptCancelTotal',
      'siteEncounterApptTotalStr', // for display
      'siteEncounterApptTotal', // for computation
      
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
      
    ]),
    
    // siteEncounterAppNoShowPercent () {
    //   return Math.round((this.siteEncounterApptNoShowTotal/this.siteEncounterApptTotal) * 100)
    // },

    // siteEncounterAppCancelPercent () {
    //   return Math.round((this.siteEncounterApptCancelTotal/this.siteEncounterApptTotal) * 100)
    //   // return precise_round((this.siteEBPSessionsPECPT/this.siteALLSessions) * 100, 1) 
    // },

    // pieChartOptions () {
    //   return {
    //     chart:      { type: "pie", 
    //                   options3d: { enabled: true, alpha: 45 }},
    //     title:      { text: 'Cancel NoShow Totals' },
    //     subtitle:   { text: 'Hover over sections for Patient data' },
    //     credits:    { enabled: false },
    //     plotOptions: { pie: { innerSize: 100, depth: 45 },
    //                    series: { allowPointSelect: true }},
    //     series: [
    //       {
    //         name: "patient totals",
    //         events: {
    //             click: function (event) {
    //               console.log('pie slice clicked, here is event: ', event)
    //               let points = this.chart.getSelectedPoints()
    //               console.log('getSelectedPoints: ', typeof points[0])
    //             }
    //         },
    //         data: this.siteEncounterApptCancelNoShowPieChart,
    //         dataLabels: {
    //           formatter: function () {
    //             // console.log('this.point is: ', this.point)
    //             return this.point.name + ':<br/>' + '(' + this.y + ')'
    //             // return `${this.point.name}:<br/>(${this.y})`
    //           }
    //         }
    //       }
    //     ]
    //   }
    // },
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
    // rowData3 () {
    //   return this.siteEncounterApptClinicNoShowTotal // filters when site changes    
    // },

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
     
    // this.gridOptions3 = {
    //   columnDefs:  this.createColDefs3(),
    //   rowData: this.rowData, // computed prop
    //   suppressPropertyNamesCheck: true
    // }
    
  },
  methods: { 
    formatNumber(num) {
      return addCommas(num)
    },
    createColDefs() {
      return [
        {headerName: "Encounters",
          children: [
            { headerName: "Site", 
              field: "StaPa", 
              width: 40, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agTextColumnFilter"
            },
            { headerName: "CPT Code", 
              field: "CPTCode", 
              width: 60, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agTextColumnFilter"
            },
            { headerName: "CPT Name", 
              field: "CPTName", 
              width: 100, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agTextColumnFilter"
            },
            { headerName: "CPT Description", 
              field: "CPTDescription", 
              width: 150, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agTextColumnFilter"
            },
            { headerName: "Encounters", 
              field: "encountersPerCPT", 
              width: 50, 
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
              width: 25, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agTextColumnFilter"
            },
            { headerName: "Category", 
              field: "CPTCategory", 
              width: 60, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agTextColumnFilter"
            },
            { headerName: "Total", 
              field: "totalNum", 
              width: 20, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agNumberColumnFilter"
            },
            { headerName: "%", 
              field: "PercentageCPT", 
              width: 20, 
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
    // onGridReady3() {
    //   this.gridOptions3.api.sizeColumnsToFit();
    // },

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
    // onRowDataChanged3() {
    //   console.log('row data changed!!')
    //   Vue.nextTick(() => {
    //     this.gridOptions3.api.sizeColumnsToFit();
    //   });
    // },
  },
  data() {
    return {
      gridOptions: null,
      gridOptions2: null,
      // gridOptions3: null,
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
