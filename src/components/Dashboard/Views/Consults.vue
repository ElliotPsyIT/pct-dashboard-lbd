<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row d-flex justify-content-center">
            <div class="col-xl-3 col-md-4">
              <stats-card>
                <div slot="header" class="icon-warning">
                  <i class="nc-icon nc-chart text-warning"></i>
                </div>
                <div slot="content">
                  <p class="card-category">Total Consults</p>
                  <h4 class="card-title">{{ siteConsultTotal }}</h4>
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
                  <p class="card-category">Total Patients</p>
                  <h4 class="card-title">{{ sitePatientTotal }}</h4>
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
                  <p class="card-category">Pending</p>
                  <h4 class="card-title">{{ sitePendingConsultTotal }}</h4>
                </div>
                <!-- <div slot="footer">
                  <i class="fa fa-clock-o"></i>No Duplicates
                </div> -->
              </stats-card>
            </div>

            <div class="col-xl-3 col-md-6">
              <stats-card>
                <div slot="header" class="icon-info">
                  <i class="nc-icon nc-favourite-28 text-primary"></i>
                </div>
                <div slot="content">
                  <p class="card-category">Active</p>
                  <h4 class="card-title">{{ siteActiveConsultTotal }}</h4>
                </div>
                <!-- <div slot="footer">
                  <i class="fa fa-refresh"></i>Updated now
                </div> -->
              </stats-card>
            </div>

          </div>

      <div class="row">

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

<!-- {{ siteLineChartSeries }} -->

      <div class="row">
        
        <div class="col-md-12">
          <!-- <card> -->
            <grid-table></grid-table>
          <!-- <template slot="footer">
            <div class="legend">
              Detailed Consult Listing
            </div>
          </template>
          </card> -->
        </div>
      
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

import GridTable from 'src/components/UIComponents/GridTable'

import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    Checkbox,
    Card,
    LTable,
    ChartCard,
    StatsCard,
    VueHighcharts,
    GridTable,
  },
  computed: {
    ...mapState([
      'selectedSite', 'selectedRange'
    ]),
    ...mapGetters([
      'siteConsultTotal','sitePatientTotal','siteActiveConsultTotal',
      'sitePendingConsultTotal','sitePieChartSeries','siteLineChartSeries'
    ]),
    pieChartOptions () {
      return {
        chart:      { type: "pie", 
                      options3d: { enabled: true, alpha: 45 }},
        title:      { text: 'Consult Status' },
        subtitle:   { text: 'Hover over sections for Consult Status data' },
        credits:    { enabled: false },
        plotOptions: { pie: { innerSize: 100, depth: 45 },
                       series: { allowPointSelect: true }},
        series: [
          {
            name: "consults statuses",
            events: {
                click: function (event) {
                  console.log('pie slice clicked, here is event: ', event)
                  let points = this.chart.getSelectedPoints()
                  console.log('getSelectedPoints: ', typeof points[0])
                }
            },
            data: this.sitePieChartSeries
          }
        ]
      }
    },
    lineChartOptions () {
      return {
        chart: {  type: "spline" },
        title: {  text: 'Consults Over Time' },
        subtitle: {  text: "Monthly Consults Over the Last Year" },
        xAxis: {
          categories: this.siteLineChartSeries.months
          // ["Jan","Feb","Mar","Apr","May","Jun",
          //   "Jul","Aug","Sep","Oct","Nov","Dec"
          // ]
        },
        yAxis: {
          title: { text: "Monthly Consults" },
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
          name: 'Monthly Consults',
          data: this.siteLineChartSeries.series
          // [
          //   22361,20777,23470,16856,22840,23383,21351,
          //   25153,21758,23523,21599,19590
          // ]
        }]
      }
    }
  },
  mounted() { // update the widget data is there's existing site
    if (this.selectedSite || this.selectedRange) { 
      // console.log('sitePieChartSeries is: ', this.sitePieChartSeries)
      // console.log('beforeMount shows selectedSite is: ', this.selectedSite)
      // console.log('running update to initialize consult page')
      // this.updateSeries()
    }
  },
  watch: {
    // selectedSite () {
    //   // console.log('watch detected selectedSite Change')
    //   this.updateSeries()
    // }
  },
  methods: {
    updateSeries() {
      console.log('updateSeries called')
      this.$refs.pieChart.showLoading()
      this.pieOptions.title.text = `Consult Status for ${this.selectedSite}`
      this.pieOptions.subtitle.text = `Consult Status for ${this.selectedRange}`
      this.pieOptions.series[0].data = this.sitePieChartSeries
      this.$refs.pieChart.delegateMethod('update', this.pieOptions )
      this.$refs.pieChart.hideLoading()
    }
  },
  data() {
    return {
      // editTooltip: 'Edit Task',
      // deleteTooltip: 'Remove',
      
      // lineOptions: {
      //   chart: {  type: "spline" },
      //   title: {  text: 'Consults Over Time' },
      //   subtitle: {  text: "Monthly Consults Over the Last Year" },
      //   xAxis: {
      //     categories: ["Jan","Feb","Mar","Apr","May","Jun",
      //       "Jul","Aug","Sep","Oct","Nov","Dec"
      //     ]
      //   },
      //   yAxis: {
      //     title: { text: "Monthly Consults" },
      //     labels: {
      //       formatter: function() { return this.value; }
      //     }
      //   },
      //   tooltip: { crosshairs: true, shared: true },
      //   credits: { enabled: false },
      //   plotOptions: {
      //     spline: {
      //       marker: { radius: 4, lineColor: "#666666", lineWidth: 1 }
      //     }
      //   },
      //   series: [{
      //     name: 'Monthly Consults',
      //     data: [
      //       22361,20777,23470,16856,22840,23383,21351,
      //       25153,21758,23523,21599,19590
      //     ]
      //   }]
      // },
          
      // tableData: {
      //   data: [
      //     { title: 'Sign contract for "What are conference organizers afraid of?"', checked: false },
      //     { title: 'Lines From Great Russian Literature? Or E-mails From My Boss?', checked: true },
      //     {
      //       title: 'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
      //       checked: true
      //     },
      //     { title: 'Create 4 Invisible User Experiences you Never Knew About', checked: false },
      //     { title: 'Read "Following makes Medium better"', checked: false },
      //     { title: 'Unfollow 5 enemies from twitter', checked: false }
      //   ]
      // }
    }
  }
}
</script>
<style>

</style>
