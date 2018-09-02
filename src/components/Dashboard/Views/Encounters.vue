<template>
  <div class="content">
    <div class="container-fluid">
      
      <!-- Section Header -->
      <div class="row d-flex justify-content-center ">
        <h4 class="section-head">Encounter Summary Stats</h4>
      </div>
     
      <div class="row d-flex ">

        <div class="col-xl-3 col-md-4">
          <stats-card>
          <div slot="header" class="icon-warning">
            <i class="nc-icon nc-chart text-warning"></i>
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

        <div class="col-xl-3 col-md-4">
          <stats-card>
            <div slot="header" class="icon-success">
              <i class="nc-icon nc-light-3 text-success"></i>
            </div>
            <div slot="content">
              <p class="card-category">Unique Patients</p>
              <h4 class="card-title">{{ siteEncounterPatientTotal }}</h4>
            </div>
            <!-- <div slot="footer">
              <i class="fa fa-calendar-o"></i>No Duplicates
            </div> -->
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-4">
          <stats-card>
            <div slot="header" class="icon-danger">
              <i class="nc-icon nc-vector text-danger"></i>
            </div>
            <div slot="content">
              <p class="card-category">Appts No Show</p>
              <h4 class="card-title">{{ siteEncounterApptNoShowTotal }}</h4>
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-4">
          <stats-card>
            <div slot="header" class="icon-info">
              <i class="nc-icon nc-favourite-28 text-primary"></i>
            </div>
            <div slot="content">
              <p class="card-category">Appts Cancelled</p>
              <h4 class="card-title">{{ siteEncounterApptCancelTotal }}</h4>
            </div>
          </stats-card>
        </div>

      </div>

      <!-- Section Header -->
      <div class="row d-flex justify-content-center ">
        <h4 class="section-head">Uniques and Cancel/NoShow</h4>
      </div>

      <div class="row d-flex ">

        <div class="col-md-6">
          <!-- <span>{{ selectedSite }} {{ selectedRange }}</span> -->

          <template>
            <vue-highcharts :options="lineChartOptions"  ref="lineChart"></vue-highcharts>
          </template>
        </div>

        <div class="col-md-6">
          <template>
            <vue-highcharts :options="pieChartOptions"  ref="pieChart"></vue-highcharts>
          </template>
        </div>

      </div>

      <!-- Section Header -->
      <div class="row d-flex justify-content-center ">
        <h4 class="section-head">CPT Categories</h4>
      </div>

      <div class="d-flex flex-row justify-content-center">
        
        <div class="col-xl-3 col-md-3">

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

        <div class="col-xl-3 col-md-3">
          
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

      </div>

      <div class="d-flex flex-row">
      
        <div class="col-xl-3 col-md-3">
          
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-chart text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Telephone</p>
              <h4 class="card-title">{{ siteEncounterCPTTelephone.total }}/{{ siteEncounterCPTTelephone.percent }}%</h4>
            </div>
          </stats-card>

        </div>

        <div class="col-xl-3 col-md-3">
          
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
         
        <div class="col-xl-3 col-md-3">
          
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

        <div class="col-xl-3 col-md-3">
          
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-chart text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Prolonged Service</p>
              <h4 class="card-title">{{ siteEncounterCPTProlongedService.total }}/{{ siteEncounterCPTProlongedService.percent }}%</h4>
            </div>
            </stats-card>

        </div>

      </div>

      <div class="d-flex flex-row justify-content-center">

        <div class="col-md-8 ">
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
        </div>

      </div>

   <!-- </div> End of CPT Categories Column 1 w/ cards -->

  <!-- <div class="col-xl-3 col-md-6"> -->


  <!-- </div> End of CPT Categories Column 2 w/ table -->

<!-- </div> End of CPT Wrapping Categories Row -->

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
            </template>
              <ag-grid-vue style="font-size: 12px; height: 500px" class="ag-theme-balham grid" 
              :gridOptions="gridOptions" 
              :rowData="rowData" 
              :rowDataChanged="onRowDataChanged"
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
// import GridTable from 'src/components/UIComponents/GridTable'

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
      'siteEncounterTotal','siteEncounterPatientTotal',
      'siteEncounterLineChartSeries',
      'siteEncounterPatientLineChartSeries',
      'siteEncounterApptCancelNoShowPieChart',
      'siteEncounterApptNoShowTotal',
      'siteEncounterApptCancelTotal',
      'siteEncounterCPTTotal',
      'siteEncounterCPTCategories',
      'siteEncounterCPTIndividual',
      'siteEncounterCPTGroup',
      'siteEncounterCPTGroupEducation',
      'siteEncounterCPTAssessment',
      'siteEncounterCPTTelephone',
      'siteEncounterCPTProlongedService'
      // 'siteEncounterProviderDetails',
      // 'siteEncounterProviderDetailsCPT',
    ]),
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
            data: this.siteEncounterApptCancelNoShowPieChart
          }
        ]
      }
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
  beforeMount() { 
    this.gridOptions = {}
    this.gridOptions.columnDefs = this.createColDefs()
    this.gridOptions.rowData = this.rowData // computed prop
    this.gridOptions.onFilterChanged = function() {console.log('filter changed!!')}
  
    this.gridOptions2 = {}
    this.gridOptions2.columnDefs = this.createColDefs2()
    this.gridOptions2.rowData = this.rowData2 // computed prop
    this.gridOptions2.onFilterChanged = function() {console.log('filter changed!!')}
  
  },
  methods: { 
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
              field: "Category", 
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
  },
  data() {
    return {
      gridOptions: null,
      gridOptions2: null,
    }
  }
}
</script>
<style>
.section-head {
   font-size: 2rem;
}
</style>
