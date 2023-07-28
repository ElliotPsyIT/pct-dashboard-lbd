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

          <!-- <div class="row d-flex justify-content-center">
            <h4 class="section-head">MBC Report: NATIONAL</h4>
          </div>

          <div class="d-flex flex-row justify-content-center">
            <div class="col-md-12">
              <card>
                <template slot="header">
                  <span>Hover Over Column Header to View Menu</span>
                  <button class="float-right" @click="exportCSVgridOptions1">
                    Export to CSV
                  </button>
                </template>
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
          </div> -->

          <!-- <div class="row d-flex justify-content-center">
            <h4 class="section-head">MBC Report: VISN</h4>
          </div>

          <div class="d-flex flex-row justify-content-center">
            <div class="col-md-12">
              <card>
                <template slot="header">
                  <span>Hover Over Column Header to View Menu</span>
                  <button class="float-right" @click="exportCSVgridOptions2">
                    Export to CSV
                  </button>
                </template>
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
          </div> -->

          <!-- <div class="row d-flex justify-content-center">
            <h4 class="section-head">MBC Report: STATION</h4>
          </div>

          <div class="d-flex flex-row justify-content-center">
            <div class="col-md-12">
              <card>
                <template slot="header">
                  <span>Hover Over Column Header to View Menu</span>
                  <button class="float-right" @click="exportCSVgridOptions3">
                    Export to CSV
                  </button>
                </template>
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
          </div> -->

          <div class="row d-flex justify-content-center">
            <h4 class="section-head">EBP Report: ALL</h4>
          </div>

          <div class="d-flex flex-row justify-content-center">
            <div class="col-md-12">
              <card>
                <template slot="header">
                  <span>Hover Over Column Header to View Menu</span>
                  <button class="float-right" @click="exportCSVgridOptions4">
                    Export to CSV
                  </button>
                </template>
                <ag-grid-vue
                  style="font-size: 12px; height: 600px"
                  class="ag-theme-balham grid"
                  :gridOptions="gridOptions4"
                  :rowData="rowData4"
                  :gridReady="onGridReady4"
                  :enableFilter="true"
                  :enableSorting="true"
                  :enableColResize="true"
                >
                </ag-grid-vue>
                <template slot="footer">
                  <div class="legend">EBP REPORT STATION</div>
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
// import ChartCard from "src/components/UIComponents/Cards/ChartCard.vue";
// import StatsCard from "src/components/UIComponents/Cards/StatsCard.vue";
import Card from "src/components/UIComponents/Cards/Card.vue";
// import LTable from "src/components/UIComponents/Table.vue";
// // import Checkbox from "src/components/UIComponents/Inputs/Checkbox.vue";

// import VueHighcharts from "vue2-highcharts";

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
    // ChartCard,
    // StatsCard,
    // VueHighcharts,
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

    //   "adminMBCnational",
    //   "adminMBCvisn",
    //   "adminMBCstation",
      "adminEBPall"

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

//    rowData1() {
//       // console.log('rowData1: ', this.adminMBCnational)
//       return this.adminMBCnational;
//     },
//     rowData2() {
//       // console.log('rowData2: ', this.adminMBCvisn)
//       return this.adminMBCvisn;
//     },
//     rowData3() {
//       // console.log('rowData3: ', this.adminMBCstation)
//       return this.adminMBCstation;
//     },
    rowData4() {
      // console.log('rowData4: ', this.adminMBCstation)
      return this.adminEBPall;
    },
  },
  beforeMount() {
    // this.gridOptions1 = {
    //   columnDefs: this.createColDefs1(),
    //   rowData: this.rowData1, // computed prop
    //   suppressPropertyNamesCheck: true,
    //   overlayLoadingTemplate:
    //     '<span class="ag-overlay-loading-center">MBC Report National Loading ...</span>',
    // };
    // this.gridOptions2 = {
    //   columnDefs: this.createColDefs2(),
    //   rowData: this.rowData2, // computed prop
    //   suppressPropertyNamesCheck: true,
    //   overlayLoadingTemplate:
    //     '<span class="ag-overlay-loading-center">MBC Report Visn Loading ...</span>',
    // };
    // this.gridOptions3 = {
    //   columnDefs: this.createColDefs3(),
    //   rowData: this.rowData3, // computed prop
    //   suppressPropertyNamesCheck: true,
    //   overlayLoadingTemplate:
    //     '<span class="ag-overlay-loading-center">MBC Report Station Loading ...</span>',
    // };
    this.gridOptions4 = {
      columnDefs: this.createColDefs4(),
      rowData: this.rowData4, // computed prop
      suppressPropertyNamesCheck: true,
      // onRowDataChanged: this.onRowDataChanged,
      overlayLoadingTemplate:
        '<span class="ag-overlay-loading-center">EBP Report Station Loading ...</span>',
    };


  },
  mounted() {

    // this.ADMIN_MBC_NATIONAL();
    // this.ADMIN_MBC_VISN();
    // this.ADMIN_MBC_STATION();
    this.ADMIN_EBP_ALL();


    // this.CURRENT_PAGE("admin");
    this.CURRENT_PAGE("adminebp");
    // this.GET_INSTITUTIONS();
  },
  methods: {
    ...mapActions([

    //   "ADMIN_MBC_NATIONAL",
    //   "ADMIN_MBC_VISN",
    //   "ADMIN_MBC_STATION",
      "ADMIN_EBP_ALL",

      "CURRENT_PAGE",
    //   "GET_INSTITUTIONS",
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
    // exportCSVgridOptions1() {
    //   this.gridOptions1.api.exportDataAsCsv({
    //     processCellCallback: (params) => {
    //       console.log("params.data is: ", params);
    //       if (params.column.colId == "CancelNoShowCount") {
    //         // need params.node.data to access the grid columns
    //         // see below in cellRenderer for similar formating of output values
    //         let cancelnoshowcount = params.data.CancelNoShowCount;
    //         let appointmentTot = params.data.ClinicAppointmentTotal;
    //         let cancelnoshowPercent = Math.round(
    //           (cancelnoshowcount / appointmentTot) * 100
    //         );
    //         return `${cancelnoshowcount}`;
    //       }
    //       return params.value;
    //     },
    //   });
    // },
    // exportCSVgridOptions2() {
    //   this.gridOptions2.api.exportDataAsCsv({
    //     processCellCallback: (params) => {
    //       return params.value;
    //     },
    //   });
    // },
    // exportCSVgridOptions3() {
    //   this.gridOptions3.api.exportDataAsCsv({
    //     processCellCallback: (params) => {
    //       return params.value;
    //     },
    //   });
    // },
    exportCSVgridOptions4() {
      this.gridOptions4.api.exportDataAsCsv({
        processCellCallback: (params) => {
          // console.log("params.data is: ", params);
          return params.value;
        },
      });
    },
    // createColDefs1() {
    //   return [
    //     {
    //       headerName: "MBC Report: National",
    //       children: [
    //         {
    //           headerName: "NATIONAL",
    //           field: "NATIONAL",
    //           width: 20,
    //           cellStyle: { "text-align": "left" },
    //           filter: "agTextColumnFilter",
    //         },
    //         {
    //           headerName: "% PCL 1x Seen",
    //           field: "Percent PCL 1x Seen",
    //           width: 25,
    //           cellStyle: { "text-align": "left" },
    //           filter: "agTextColumnFilter",
    //         },
    //         {
    //           headerName: "Pts Seen At Least 1x",
    //           field: "Patients Seen At Least 1x",
    //           width: 30,
    //           cellStyle: { "text-align": "left" },
    //           filter: "agTextColumnFilter",
    //         },
    //         {
    //           headerName: "% PCL 2x Seen",
    //           field: "Percent PCL 2x Seen",
    //           width: 25,
    //           cellStyle: { "text-align": "left" },
    //           filter: "agTextColumnFilter",
    //         },
    //         {
    //           headerName: "Pts Seen At Least 2x",
    //           field: "Patients Seen At Least 2x",
    //           width: 30,
    //           cellStyle: { "text-align": "left" },
    //           filter: "agTextColumnFilter",
    //         },
    //         {
    //           headerName: "% Providers",
    //           field: "Percent Providers",
    //           width: 22,
    //           cellStyle: { "text-align": "left" },
    //           filter: "agTextColumnFilter",
    //         },
    //         {
    //           headerName: "Providers At Least 1 Admin",
    //           field: "Providers Admin At Least 1",
    //           width: 35,
    //           cellStyle: { "text-align": "left" },
    //           filter: "agTextColumnFilter",
    //         },
    //       ],
    //     },
    //   ];
    // },
    // createColDefs2() {
    //   return [
    //     {
    //       headerName: "MBC Report: VISN",
    //       children: [
    //         {
    //           headerName: "VISN",
    //           field: "VISN",
    //           width: 15,
    //           cellStyle: { "text-align": "left" },
    //           filter: "agTextColumnFilter",
    //         },
    //         {
    //           headerName: "% PCL 1x Seen",
    //           field: "Percent PCL 1x Seen",
    //           width: 25,
    //           cellStyle: { "text-align": "left" },
    //           filter: "agTextColumnFilter",
    //         },
    //         {
    //           headerName: "Pts Seen At Least 1x",
    //           field: "Patients Seen At Least 1x",
    //           width: 30,
    //           cellStyle: { "text-align": "left" },
    //           filter: "agTextColumnFilter",
    //         },
    //         {
    //           headerName: "% PCL 2x Seen",
    //           field: "Percent PCL 2x Seen",
    //           width: 25,
    //           cellStyle: { "text-align": "left" },
    //           filter: "agTextColumnFilter",
    //         },
    //         {
    //           headerName: "Pts Seen At Least 2x",
    //           field: "Patients Seen At Least 2x",
    //           width: 30,
    //           cellStyle: { "text-align": "left" },
    //           filter: "agTextColumnFilter",
    //         },
    //         {
    //           headerName: "% Providers",
    //           field: "Percent Providers",
    //           width: 22,
    //           cellStyle: { "text-align": "left" },
    //           filter: "agTextColumnFilter",
    //         },
    //         {
    //           headerName: "Providers At Least 1 Admin",
    //           field: "Providers Admin At Least 1",
    //           width: 35,
    //           cellStyle: { "text-align": "left" },
    //           filter: "agTextColumnFilter",
    //         },
    //       ],
    //     },
    //   ];
    // },
    // createColDefs3() {
    //   return [
    //     {
    //       headerName: "MBC Report: STATION",
    //       children: [
    //         {
    //           headerName: "STATION",
    //           field: "InstitutionNameLong",
    //           width: 50,
    //           cellStyle: { "text-align": "left" },
    //           filter: "agTextColumnFilter",
    //         },
    //         {
    //           headerName: "% PCL 1x Seen",
    //           field: "Percent PCL 1x Seen",
    //           width: 25,
    //           cellStyle: { "text-align": "left" },
    //           filter: "agTextColumnFilter",
    //         },
    //         {
    //           headerName: "Pts Seen At Least 1x",
    //           field: "Patients Seen At Least 1x",
    //           width: 30,
    //           cellStyle: { "text-align": "left" },
    //           filter: "agTextColumnFilter",
    //         },
    //         {
    //           headerName: "% PCL 2x Seen",
    //           field: "Percent PCL 2x Seen",
    //           width: 25,
    //           cellStyle: { "text-align": "left" },
    //           filter: "agTextColumnFilter",
    //         },
    //         {
    //           headerName: "Pts Seen At Least 2x",
    //           field: "Patients Seen At Least 2x",
    //           width: 30,
    //           cellStyle: { "text-align": "left" },
    //           filter: "agTextColumnFilter",
    //         },
    //         {
    //           headerName: "% Providers",
    //           field: "Percent Providers",
    //           width: 22,
    //           cellStyle: { "text-align": "left" },
    //           filter: "agTextColumnFilter",
    //         },
    //         {
    //           headerName: "Providers At Least 1 Admin",
    //           field: "Providers Admin At Least 1",
    //           width: 35,
    //           cellStyle: { "text-align": "left" },
    //           filter: "agTextColumnFilter",
    //         },
    //       ],
    //     },
    //   ];
    // },
    createColDefs4() {
      return [
        {
          headerName: "EBP Report: STATION",
          children: [
            {
              headerName: "VISN",
              field: "VISN",
            //   width: 10,
              cellStyle: { "text-align": "left" },
              filter: "agTextColumnFilter",
            },
            {
              headerName: "Station #",
              field: "STAPA",
            //   width: 15,
              cellStyle: { "text-align": "left" },
              filter: "agTextColumnFilter",
            },
            {
              headerName: "Station Name",
              field: "StaPaName",
            //   width: 30,
              cellStyle: { "text-align": "left" },
              filter: "agTextColumnFilter",
            },
            {
              headerName: "Current EBP Numer",
              field: "CURRENT EBP NUMERATOR",
            //   width: 25,
              cellStyle: { "text-align": "left" },
              filter: "agTextColumnFilter",
            },
            {
              headerName: "New EBP Numer",
              field: "NEW EBP REACH NUMERATOR",
            //   width: 30,
              cellStyle: { "text-align": "left" },
              filter: "agTextColumnFilter",
            },
            {
              headerName: "New EBP Denom",
              field: "CURRENT EBP DENOMINATOR",
            //   width: 22,
              cellStyle: { "text-align": "left" },
              filter: "agTextColumnFilter",
            },
            {
              headerName: "Current Reach",
              field: "CURRENT REACH",
            //   width: 35,
              cellStyle: { "text-align": "left" },
              filter: "agTextColumnFilter",
            },
            {
              headerName: "HF WET",
              field: "HF WET",
            //   width: 35,
              cellStyle: { "text-align": "left" },
              filter: "agTextColumnFilter",
            },
             {
              headerName: "HF CBT-PTSD",
              field: "HF CBT-PTSD",
            //   width: 35,
              cellStyle: { "text-align": "left" },
              filter: "agTextColumnFilter",
            },
             {
              headerName: "HF CBCT",
              field: "HF CBCT",
            //   width: 35,
              cellStyle: { "text-align": "left" },
              filter: "agTextColumnFilter",
            },
             {
              headerName: "HF COPE",
              field: "HF COPE",
            //   width: 35,
              cellStyle: { "text-align": "left" },
              filter: "agTextColumnFilter",
            },
             {
              headerName: "HF EMDR",
              field: "HF EMDR",
            //   width: 35,
              cellStyle: { "text-align": "left" },
              filter: "agTextColumnFilter",
            },
             {
              headerName: "HF NET",
              field: "HF NET",
            //   width: 35,
              cellStyle: { "text-align": "left" },
              filter: "agTextColumnFilter",
            },
 
          ],
        },
      ];
    },

    // onGridReady1() {
    //   this.gridOptions1.api.sizeColumnsToFit();
    // },
    // onGridReady2() {
    //   this.gridOptions2.api.sizeColumnsToFit();
    // },
    // onGridReady3() {
    //   this.gridOptions3.api.sizeColumnsToFit();
    // },
     onGridReady4() {
      this.gridOptions4.api.sizeColumnsToFit();
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
    //   gridOptions1: null,
    //   gridOptions2: null,
    //   gridOptions3: null,
      gridOptions4: null
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
</style>
