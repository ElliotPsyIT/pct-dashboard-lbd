<template>
  <transition name="fade" mode="out-in">
    <div class="content" :key="selectedRange"   >
      <div
        class="container-fluid"
        :class="{ filtering: changeBackgroundColor }"
      >
        Scroll Position {{ scrollPosition }}

        <!-- Show Filtered Sites -->
        <div v-if="changeBackgroundColor">
          <div
            class="row d-flex justify-content-center"
            style="position: fixed; right: 50px; z-index: 500"
          >
            <div style="font-size: 0.7rem; border: solid 1px grey">
              {{ selectedInstitutionsNames }}
            </div>
          </div>
        </div>

        <!-- Disclaimer -->
        <div class="row d-flex justify-content-center mt-4 ">
          <p class="category" style="font-size: .8rem; font-style: italic;">
            <span class="font: red;">{{ disclaimer.asterisks}}</span>
            {{ disclaimer.mainText }}
            <span style="font-weight:bold; text-decoration:underline">{{ disclaimer.emphasis }}</span>
          </p>
          <div v-if="dataError">
            <div class="category" style="font-style: italic; text-align: center;">
             <span style="color: red; font-size: 2rem; font-weight: bold; text-align: center; text-decoration: underline;" >
               WARNING! DATA ERROR TODAY - {{ warningCurrentDate }}
             </span>
             <span style="color: red; font-size: 2rem; font-weight: bold; text-align: center; text-decoration: underline;" >
               WE ARE WORKING TO SOLVE THE PROBLEM
             </span>
            </div> 
          </div> 
        </div>

        <hr />

        <!-- <div v-if="!phipii && !selectedSiteVISNorNATIONAL">
          <div class="row d-flex justify-content-center">
            <h4 class="section-head">MBC REPORTS</h4>
          </div>
          <div class="row d-flex justify-content-center">
            <h3 class="phipii-warning">
              Privileges Required to View Patient Level Data for Station
              <b>{{ selectedSite }}</b> - Request Link Below
            </h3>
          </div>
          <div class="row d-flex justify-content-center">
            <a
              href="https://vaww.cdw.va.gov/sites/security/request/Pages/register.aspx"
              target="_blank"
              ><u>Link to BISL PHI/PII Access Request</u></a
            >
          </div>
        </div> -->

        <!-- Show table only with PHIPII -->
        <!-- <div v-else-if="phipii"> -->
          <!-- <div class="row d-flex justify-content-center">
            <h4 class="section-head">MBC Report: NATIONAL</h4>
          </div>

        <div style="align-items: center; display: flex; justify-content: center; ">
          <div style="width: 60%; margin-bottom: 10px;">
            <b>NOTE:&nbsp;&nbsp;&nbsp;</b> If downloading data from tables on the dashboard, please consult with and follow guidance of the local Information Security Officer (ISO) and Privacy Officer.
          </div>
        </div>

          <div
            style="align-items: center; display: flex; justify-content: center"
          >
            <div style="width: 60%; margin-bottom: 10px">
              <VueFaqAccordion :items="appointmentNoShowCancelByClinicTable" />
            </div>
          </div> -->

          <!-- Section Header -->
          <div class="row d-flex justify-content-center">
            <h4 class="section-head">MBC Report: NATIONAL</h4>
          </div>

          <!-- Clinic & NoShow - Detailed CPT Categories Table -->
          <div class="d-flex flex-row justify-content-center">
            <div class="col-md-12">
              <card>
                <template slot="header">
                  <span>Hover Over Column Header to View Menu</span>
                  <button class="float-right" @click="exportCSVgridOptions1">
                    Export to CSV
                  </button>
                </template>
                <!-- {{siteEncounterApptProviderClinicNoShowTotal}} -->
                <ag-grid-vue
                  style="font-size: 12px; height: 120px"
                  class="ag-theme-balham grid"
                  :gridOptions="gridOptions1"
                  :rowData="rowData1"
                  :gridReady="onGridReady1"
                  :enableFilter="true"
                  :enableSorting="true"
                  :enableColResize="true"
                >
                </ag-grid-vue>
                <template slot="footer">
                  <div class="legend">MBC REPORT NATIONAL</div>
                </template>
              </card>
            </div>
          </div>

          <!-- Section Header -->
          <div class="row d-flex justify-content-center">
            <h4 class="section-head">MBC Report: VISN</h4>
          </div>

          <!-- Clinic & NoShow - Detailed CPT Categories Table -->
          <div class="d-flex flex-row justify-content-center">
            <div class="col-md-12">
              <card>
                <template slot="header">
                  <span>Hover Over Column Header to View Menu</span>
                  <button class="float-right" @click="exportCSVgridOptions2">
                    Export to CSV
                  </button>
                </template>
                <!-- {{siteEncounterApptProviderClinicNoShowTotal}} -->
                <ag-grid-vue
                  style="font-size: 12px; height: 400px"
                  class="ag-theme-balham grid"
                  :gridOptions="gridOptions2"
                  :rowData="rowData2"
                  :gridReady="onGridReady2"
                  :enableFilter="true"
                  :enableSorting="true"
                  :enableColResize="true"
                >
                </ag-grid-vue>
                <template slot="footer">
                  <div class="legend">MBC REPORT VISN</div>
                </template>
              </card>
            </div>
          </div>

          <!-- Section Header -->
          <div class="row d-flex justify-content-center">
            <h4 class="section-head">MBC Report: STATION</h4>
          </div>

          <!-- Clinic & NoShow - Detailed CPT Categories Table -->
          <div class="d-flex flex-row justify-content-center">
            <div class="col-md-12">
              <card>
                <template slot="header">
                  <span>Hover Over Column Header to View Menu</span>
                  <button class="float-right" @click="exportCSVgridOptions3">
                    Export to CSV
                  </button>
                </template>
                <!-- {{siteEncounterApptProviderClinicNoShowTotal}} -->
                <ag-grid-vue
                  style="font-size: 12px; height: 400px"
                  class="ag-theme-balham grid"
                  :gridOptions="gridOptions3"
                  :rowData="rowData3"
                  :gridReady="onGridReady3"
                  :enableFilter="true"
                  :enableSorting="true"
                  :enableColResize="true"
                >
                </ag-grid-vue>
                <template slot="footer">
                  <div class="legend">MBC REPORT STATION</div>
                </template>
              </card>
            </div>
          </div>


        <!-- </div> -->
        <!-- PHI -->
      </div>
    </div>
  </transition>
</template>

<script>
import ChartCard from "src/components/UIComponents/Cards/ChartCard.vue";
import StatsCard from "src/components/UIComponents/Cards/StatsCard.vue";
import Card from "src/components/UIComponents/Cards/Card.vue";
// import LTable from "src/components/UIComponents/Table.vue";
// import Checkbox from "src/components/UIComponents/Inputs/Checkbox.vue";

import VueHighcharts from "vue2-highcharts";

import Vue from "vue";
import { AgGridVue } from "ag-grid-vue";

import { addCommas, totalAndPercent } from "src/utils";

import VueFaqAccordion from "vue-faq-accordion";
// import {
//   appointmentNoShowCancelSummary,
//   appointmentNoShowCancelByClinicTable,
// } from "../Documentation/appointments_doc.js";

import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "encounters",
  components: {
    Card,
    ChartCard,
    StatsCard,
    VueHighcharts,
    AgGridVue,
    VueFaqAccordion,
  },
  computed: {
    ...mapState([
      "selectedSite",
      "selectedRange",
      "whitelisted",
      "phipii",
      "selectedInstitutions",
      "selectedInstitutionsNames",
      
      "disclaimer",
      "dataError",
    ]),
    ...mapGetters([
      'siteProviderSelected',
      "warningCurrentDate",

      "adminMBCnational",
      "adminMBCvisn",
      "adminMBCstation"

    ]),
    selectedSiteVISNorNATIONAL() {
      // console.log('in selectedSiteVISNorNATIONAL, selectedSite is: ', this.selectedSite)
      return /VISN|NATIONAL/.test(this.selectedSite);
    },
    changeBackgroundColor() {
      // console.log('in changeBackgroundColor selectedInstitutions is: ', this.selectedInstitutions)
      return this.selectedInstitutions.length > 0 || false;
    },

    scrollPosition() {
      console.log("window.pageYOffset: ", window.pageYOffset);
    },

    // siteEncounterAppNoShowPercent() {
    //   return Math.round(
    //     (this.siteEncounterApptNoShowTotal / this.siteEncounterApptTotal) * 100
    //   );
    // },

    // siteEncounterAppCancelPercent() {
    //   return Math.round(
    //     (this.siteEncounterApptCancelTotal / this.siteEncounterApptTotal) * 100
    //   );
      // return precise_round((this.siteEBPSessionsPECPT/this.siteALLSessions) * 100, 1)
    // },
    // pieChartOptions() {
    //   return {
    //     chart: {
    //       type: "pie",
    //       options3d: { enabled: true, alpha: 45 },
    //       // borderColor: '#EBBA95',
    //       // borderWidth: 2,
    //       // type: "line"
    //     },
    //     title: { text: "Cancel No Show Totals" },
    //     subtitle: { text: "Hover over sections for Patient data" },
    //     credits: { enabled: false },
    //     plotOptions: {
    //       pie: { innerSize: 100, depth: 45 },
    //       series: { allowPointSelect: true },
    //     },
    //     series: [
    //       {
    //         name: "patient totals",
    //         events: {
    //           click: function (event) {
    //             console.log("pie slice clicked, here is event: ", event);
    //             let points = this.chart.getSelectedPoints();
    //             console.log("getSelectedPoints: ", typeof points[0]);
    //           },
    //         },
    //         data: this.siteEncounterApptCancelNoShowPieChart,
    //         dataLabels: {
    //           formatter: function () {
    //             // console.log('this.point is: ', this.point)
    //             return this.point.name + ":<br/>" + "(" + this.y + ")";
    //             // return `${this.point.name}:<br/>(${this.y})`
    //           },
    //         },
    //       },
    //     ],
    //   };
    // },
    rowData1() {
      // console.log('rowData1: ', this.adminMBCnational)
      return this.adminMBCnational;
    },
    rowData2() {
      // console.log('rowData2: ', this.adminMBCvisn)
      return this.adminMBCvisn;
    },
    rowData3() {
      // console.log('rowData3: ', this.adminMBCstation)
      return this.adminMBCstation;
    },
  },
  beforeMount() {
    this.gridOptions1 = {
      columnDefs: this.createColDefs1(),
      rowData: this.rowData1, // computed prop
      suppressPropertyNamesCheck: true,
      // onRowDataChanged: this.onRowDataChanged,
      overlayLoadingTemplate:
        '<span style="padding: 10px; border: 2px solid #666; background: #55AA77;">This is a custom \'no rows\' overlay</span>',
        // '<span class="ag-overlay-loading-center">MBC Report National Loading ...</span>',
       overlayNoRowsTemplate:
        '<div class="loadingx" style="margin: 7em"></div> <span class="ag-overlay-loading-center " style="font-size: 18px; z-index: 100000"> Loading Rows ...</span>',
    };
    this.gridOptions2 = {
      columnDefs: this.createColDefs2(),
      rowData: this.rowData2, // computed prop
      suppressPropertyNamesCheck: true,
      // onRowDataChanged: this.onRowDataChanged,
      overlayLoadingTemplate:
        '<span class="ag-overlay-loading-center">MBC Report Station Loading ...</span>',
      overlayNoRowsTemplate:
       '<div class="loadingx" style="margin: 7em"></div> <span class="ag-overlay-loading-center " style="font-size: 18px; z-index: 100000"> Loading Rows ...</span>',
    };
    this.gridOptions3 = {
      columnDefs: this.createColDefs3(),
      rowData: this.rowData3, // computed prop
      suppressPropertyNamesCheck: true,
      // onRowDataChanged: this.onRowDataChanged,
      overlayLoadingTemplate:
        '<span class="ag-overlay-loading-center">MBC Report Station Loading ...</span>',
      overlayNoRowsTemplate:
       '<div class="loadingx" style="margin: 7em"></div> <span class="ag-overlay-loading-center " style="font-size: 18px; z-index: 100000"> Loading Rows ...</span>',
    };

  },
  mounted() {

    this.ADMIN_MBC_NATIONAL();
    this.ADMIN_MBC_VISN();
    this.ADMIN_MBC_STATION();


    this.CURRENT_PAGE("admin");
    // this.GET_INSTITUTIONS();
  },
  methods: {
    ...mapActions([

      "ADMIN_MBC_NATIONAL",
      "ADMIN_MBC_VISN",
      "ADMIN_MBC_STATION",

      "CURRENT_PAGE",
      "GET_INSTITUTIONS",
    ]),
    asyncValue(val) {
      return val == 0 ? "Loading..." : val;
    },
    notNumber(val) {
      // this.$nextTick(
      return isNaN(val) ? "Loading..." : val;
      // )
    },
    formatNumber(num) {
      return addCommas(num);
    },
    exportCSVgridOptions1() {
      this.gridOptions1.api.exportDataAsCsv({
        processCellCallback: (params) => {
          // console.log("params.data is: ", params);
          // if (params.column.colId == "CancelNoShowCount") {
          //   // need params.node.data to access the grid columns
          //   // see below in cellRenderer for similar formating of output values
          //   let cancelnoshowcount = params.data.CancelNoShowCount;
          //   let appointmentTot = params.data.ClinicAppointmentTotal;
          //   let cancelnoshowPercent = Math.round(
          //     (cancelnoshowcount / appointmentTot) * 100
          //   );
          //   return `${cancelnoshowcount}`;
          // }
          return params.value;
        },
      });
    },
    exportCSVgridOptions2() {
      this.gridOptions2.api.exportDataAsCsv({
        processCellCallback: (params) => {
          // console.log("params.data is: ", params);
          return params.value;
        },
      });
    },
    exportCSVgridOptions3() {
      this.gridOptions3.api.exportDataAsCsv({
        processCellCallback: (params) => {
          // console.log("params.data is: ", params);
          return params.value;
        },
      });
    },
    createColDefs1() {
      return [
        {
          headerName: "MBC Report: National",
          children: [
            {
              headerName: "NATIONAL",
              field: "NATIONAL",
              width: 20,
              cellStyle: { "text-align": "left" },
              filter: "agTextColumnFilter",
            },
            {
              headerName: "% PCL 1x Seen",
              field: "Percent PCL 1x Seen",
              width: 25,
              cellStyle: { "text-align": "left" },
              filter: "agTextColumnFilter",
            },
            {
              headerName: "Pts Seen At Least 1x",
              field: "Patients Seen At Least 1x",
              width: 30,
              cellStyle: { "text-align": "left" },
              filter: "agTextColumnFilter",
            },
            {
              headerName: "% PCL 2x Seen",
              field: "Percent PCL 2x Seen",
              width: 25,
              cellStyle: { "text-align": "left" },
              filter: "agTextColumnFilter",
            },
            {
              headerName: "Pts Seen At Least 2x",
              field: "Patients Seen At Least 2x",
              width: 30,
              cellStyle: { "text-align": "left" },
              filter: "agTextColumnFilter",
            },
            {
              headerName: "% Providers",
              field: "Percent Providers",
              width: 22,
              cellStyle: { "text-align": "left" },
              filter: "agTextColumnFilter",
            },
            {
              headerName: "Providers At Least 1 Admin",
              field: "Providers Admin At Least 1",
              width: 35,
              cellStyle: { "text-align": "left" },
              filter: "agTextColumnFilter",
            },
          ],
        },
      ];
    },
    createColDefs2() {
      return [
        {
          headerName: "MBC Report: VISN",
          children: [
            {
              headerName: "VISN",
              field: "VISN",
              width: 15,
              cellStyle: { "text-align": "left" },
              filter: "agTextColumnFilter",
            },
            {
              headerName: "% PCL 1x Seen",
              field: "Percent PCL 1x Seen",
              width: 25,
              cellStyle: { "text-align": "left" },
              filter: "agTextColumnFilter",
            },
            {
              headerName: "Pts Seen At Least 1x",
              field: "Patients Seen At Least 1x",
              width: 30,
              cellStyle: { "text-align": "left" },
              filter: "agTextColumnFilter",
            },
            {
              headerName: "% PCL 2x Seen",
              field: "Percent PCL 2x Seen",
              width: 25,
              cellStyle: { "text-align": "left" },
              filter: "agTextColumnFilter",
            },
            {
              headerName: "Pts Seen At Least 2x",
              field: "Patients Seen At Least 2x",
              width: 30,
              cellStyle: { "text-align": "left" },
              filter: "agTextColumnFilter",
            },
            {
              headerName: "% Providers",
              field: "Percent Providers",
              width: 22,
              cellStyle: { "text-align": "left" },
              filter: "agTextColumnFilter",
            },
            {
              headerName: "Providers At Least 1 Admin",
              field: "Providers Admin At Least 1",
              width: 35,
              cellStyle: { "text-align": "left" },
              filter: "agTextColumnFilter",
            },
          ],
        },
      ];
    },
    createColDefs3() {
      return [
        {
          headerName: "MBC Report: STATION",
          children: [
            {
              headerName: "STATION",
              field: "InstitutionNameLong",
              width: 50,
              cellStyle: { "text-align": "left" },
              filter: "agTextColumnFilter",
            },
            {
              headerName: "% PCL 1x Seen",
              field: "Percent PCL 1x Seen",
              width: 25,
              cellStyle: { "text-align": "left" },
              filter: "agTextColumnFilter",
            },
            {
              headerName: "Pts Seen At Least 1x",
              field: "Patients Seen At Least 1x",
              width: 30,
              cellStyle: { "text-align": "left" },
              filter: "agTextColumnFilter",
            },
            {
              headerName: "% PCL 2x Seen",
              field: "Percent PCL 2x Seen",
              width: 25,
              cellStyle: { "text-align": "left" },
              filter: "agTextColumnFilter",
            },
            {
              headerName: "Pts Seen At Least 2x",
              field: "Patients Seen At Least 2x",
              width: 30,
              cellStyle: { "text-align": "left" },
              filter: "agTextColumnFilter",
            },
            {
              headerName: "% Providers",
              field: "Percent Providers",
              width: 22,
              cellStyle: { "text-align": "left" },
              filter: "agTextColumnFilter",
            },
            {
              headerName: "Providers At Least 1 Admin",
              field: "Providers Admin At Least 1",
              width: 35,
              cellStyle: { "text-align": "left" },
              filter: "agTextColumnFilter",
            },
          ],
        },
      ];
    },

    onGridReady1() {
      this.gridOptions1.api.sizeColumnsToFit();
    },
    onGridReady2() {
      this.gridOptions2.api.sizeColumnsToFit();
    },
    onGridReady3() {
      this.gridOptions3.api.sizeColumnsToFit();
    },
    // onRowDataChanged(event) {
    //   // console.log('onRowDataChanged event triggered!!')
    //   this.gridOptions1.api.showLoadingOverlay();
    //   Vue.nextTick(() => {
    //     this.gridOptions1.api.hideOverlay();
    //     this.gridOptions1.api.sizeColumnsToFit();
    //   });
    // },
  },
  data() {
    return {
      gridOptions1: null,
      gridOptions2: null,
      gridOptions3: null,
      // appointmentNoShowCancelSummary,
      // appointmentNoShowCancelByClinicTable,
    };
  },
};
</script>

<style>
.filtering {
  background-color: lightgrey;
}

.provider-selected {
  /* border: 4px solid red; */
  background-color: lightgray;
}

.section-head {
  font-size: 2rem;
}

/* fade page in and out when site changes */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
  .fade-leave-to
    /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
        
.loadingx:before {
  position: absolute;
  content: '';
  top: 0%;
  left: 0%;
  background: rgba(255, 255, 255, 0.8);
  width: 100%;
  height: 100%;
  border-radius: 0.28571429rem;
  z-index: 100;
}

.loadingx:after {
  position: absolute;
  content: '';
  top: 50%;
  left: 50%;
  margin: -1.5em 0em 0em -1.5em;
  width: 3em;
  height: 3em;
  -webkit-animation: segment-spin 0.6s linear;
  animation: segment-spin 0.6s linear;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  border-radius: 500rem;
  border-color: #223088 rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1);
  border-style: solid;
  border-width: 0.2em;
  box-shadow: 0px 0px 0px 1px transparent;
  visibility: visible;
  z-index: 101;
}

@-webkit-keyframes segment-spin {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes segment-spin {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
