<template>
  <div class="content">
    <div class="container-fluid">
      <!-- <div class="row">
        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-chart text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Capacity</p>
              <h4 class="card-title">105GB</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-refresh"></i>Updated now
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-success">
              <i class="nc-icon nc-light-3 text-success"></i>
            </div>
            <div slot="content">
              <p class="card-category">Revenue</p>
              <h4 class="card-title">$1,345</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-calendar-o"></i>Last day
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-danger">
              <i class="nc-icon nc-vector text-danger"></i>
            </div>
            <div slot="content">
              <p class="card-category">Errors</p>
              <h4 class="card-title">23</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-clock-o"></i>Last day
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-info">
              <i class="nc-icon nc-favourite-28 text-primary"></i>
            </div>
            <div slot="content">
              <p class="card-category">Followers</p>
              <h4 class="card-title">+45</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-refresh"></i>Updated now
            </div>
          </stats-card>
        </div>

      </div> -->
      
      <div class="row">

        <div class="col-md-8">
          <chart-card :chart-data="lineChart.data"
                      :chart-options="lineChart.options"
                      :responsive-options="lineChart.responsiveOptions">
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

      </div>

      <div class="row">
      
      <div class="col-md-8">
        <template>
            <vue-highcharts :options="lineOptions" ref="lineChart"></vue-highcharts>
          </template>
      </div>
       
       <div class="col-md-4">
          <template>
            <vue-highcharts :options="pieOptions" ref="pieChart"></vue-highcharts>
          </template>
        </div>

      </div>


      <!-- <div class="row">

          <div class="col-md-6">
            hello there!!!!!!!!!!!!!!!!!!!!!!!
            {{ pieOptions.title.text }}
          </div>
  
      </div> -->

      <div class="row">
        <div class="col-md-6">
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
        </div>

        <div class="col-md-6">
          <card>
            <template slot="header">
              <h5 class="title">Tasks</h5>
              <p class="category">Backend development</p>
            </template>
            <l-table :data="tableData.data"
                     :columns="tableData.columns">
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
          </card>

        </div>
      </div>
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

  import { mapState } from 'vuex'

  export default {
    components: {
      Checkbox,
      Card,
      LTable,
      ChartCard,
      StatsCard,
      VueHighcharts
    },
    computed: {
      ...mapState([
        'selectedSite'
      ])
    },
    methods: {
      update () {
        let PieChart = this.$refs.pieChart
        alert(PieChart.chart.type)
        PieChart.update({
            series: {
              name: 'WHAT!!'
              // data: [
              //     ["Active", 5966],
              //     ["Pending", 1065],
              //     ["Discontinued", 87261],
              //     ["Complete", 155588],
              //     ["Partial Results", 231],
              //     ["Cancelled", 5572],
              //     ["Scheduled", 12789]
              //   ]
            }
        })
      }
    },
    watch: {
      selectedSite : function(site, oldSite){
        this.update()  
      }
    },
    data () {
      return {
        editTooltip: 'Edit Task',
        deleteTooltip: 'Remove',
        pieData: {
          'national': [
            ["Active", 5966],
            ["Pending", 1065],
            ["Discontinued", 87261],
            ["Complete", 155588],
            ["Partial Results", 231],
            ["Cancelled", 5572],
            ["Scheduled", 12789]
          ],
          '402': [
            ["Active", 39],
            ["Pending", 4],
            ["Discontinued", 694],
            ["Complete", 1638],
            ["Partial Results", 4],
            ["Cancelled", 25],
            ["Scheduled", 112]
          ]

        },
        pieOptions: {
          chart: {
              type: "pie",
              options3d: {
                enabled: true,
                alpha: 45
              }
            },
            title: {
              text: "Consult Statuses"
            },
            subtitle: {
              text: "Hover Over Section to Display Data"
            },
            credits: {
              enabled: false
            },
            plotOptions: {
              pie: {
                innerSize: 100,
                depth: 45
              }
            },
            series: [
              {
                name: "consults statuses",
                data: //Vue.nexttick(() => this.pieComputed() ) 
                [
            ["Active", 39],
            ["Pending", 4],
            ["Discontinued", 694],
            ["Complete", 1638],
            ["Partial Results", 4],
            ["Cancelled", 25],
            ["Scheduled", 112]
          ]
                // [
                //   ["Active", 5966],
                //   ["Pending", 1065],
                //   ["Discontinued", 87261],
                //   ["Complete", 155588],
                //   ["Partial Results", 231],
                //   ["Cancelled", 5572],
                //   ["Scheduled", 12789]
                // ]
              }
            ]
          },
        lineOptions: {
          chart: {
              type: "spline"
            },
            title: {
              text: "Consult Totals"
            },
            subtitle: {
              text: "Monthly Consults Over the Last Year"
            },
            xAxis: {
              categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
              ]
            },
            yAxis: {
              title: {
                text: "Monthly Consults"
              },
              labels: {
                formatter: function() {
                  return this.value;
                }
              }
            },
            tooltip: {
              crosshairs: true,
              shared: true
            },
            credits: {
              enabled: false
            },
            plotOptions: {
              spline: {
                marker: {
                  radius: 4,
                  lineColor: "#666666",
                  lineWidth: 1
                }
              }
            },
            series: [{
              name: 'One Year Consults',
              data: [
              22361,
              20777,
              23470,
              16856,
              22840,
              23383,
              21351,
              25153,
              21758,
              23523,
              21599,
              19590
            ]}]
        },
        pieChart: {
          data: {
            labels: ['40%', '20%', '40%'],
            series: [40, 20, 40]
          }
        },
        lineChart: {
          data: {
            labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
            series: [
              [287, 385, 490, 492, 554, 586, 698, 695],
              [67, 152, 143, 240, 287, 335, 435, 437],
              [23, 113, 67, 108, 190, 239, 307, 308]
            ]
          },
          options: {
            low: 0,
            high: 800,
            showArea: false,
            height: '245px',
            axisX: {
              showGrid: false
            },
            lineSmooth: true,
            showLine: true,
            showPoint: true,
            fullWidth: true,
            chartPadding: {
              right: 50
            }
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              axisX: {
                labelInterpolationFnc (value) {
                  return value[0]
                }
              }
            }]
          ]
        },
        barChart: {
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [
              [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
              [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
            ]
          },
          options: {
            seriesBarDistance: 10,
            axisX: {
              showGrid: false
            },
            height: '245px'
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc (value) {
                  return value[0]
                }
              }
            }]
          ]
        },
        tableData: {
          data: [
            {title: 'Sign contract for "What are conference organizers afraid of?"', checked: false},
            {title: 'Lines From Great Russian Literature? Or E-mails From My Boss?', checked: true},
            {
              title: 'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
              checked: true
            },
            {title: 'Create 4 Invisible User Experiences you Never Knew About', checked: false},
            {title: 'Read "Following makes Medium better"', checked: false},
            {title: 'Unfollow 5 enemies from twitter', checked: false}
          ]
        }
      }
    }
  }
</script>
<style>

</style>
