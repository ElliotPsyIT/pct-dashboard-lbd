<template>
  <transition name="fade" mode="out-in">
    <div class="content" :key="selectedSite">
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
        <div class="row d-flex justify-content-center mt-4">
          <p class="category" style="font-size: 0.8rem; font-style: italic">
            <span class="font: red;">{{ disclaimer.asterisks }}</span
            >{{ disclaimer.mainText
            }}<span style="font-weight: bold; text-decoration: underline">{{
              disclaimer.emphasis
            }}</span>
          </p>
          <div v-if="dataError">
            <div class="category" style="font-style: italic; text-align: center;">
             <span style="color: red; font-size: 2rem; font-weight: bold; text-align: center; text-decoration: underline;" >
               WARNING! DATA ERROR TODAY - {{ warningCurrentDate}}
             </span>
             <span style="color: red; font-size: 2rem; font-weight: bold; text-align: center; text-decoration: underline;" >
               WE ARE WORKING TO SOLVE THE PROBLEM
             </span>
            </div> 
          </div> 
        </div>

        <hr />

        <!-- Section Header -->
        <div class="row d-flex justify-content-center">
          <h4 class="section-head">Time Limited Care</h4>
        </div>

        <!--  FAQ -->
        <div
          style="align-items: center; display: flex; justify-content: center"
        >
          <div style="width: 60%; margin-bottom: 10px">
            <VueFaqAccordion :items="TimeLimitedCare6and20" />
          </div>
        </div>

        <div class="d-flex flex-row justify-content-center">
          <div class="col-xl-6 col-md-6">
            <div class="row d-flex flex-row justify-content-center mt-2 mb-2">
              Patients With Numerous Sessions
            </div>
            <div class="row d-flex flex-row justify-content-center">
            <stats-card class="col-md-6">
              <div slot="header" class="icon-warning">
                <i class="nc-icon-outline nc-single-01 text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">
                  20 Sessions<br /> in 6 months<br />
                  ({{ formatNumber(tlcNumerator6_20) }}/
                  {{ formatNumber(tlcDenominator) }})
                </p>
                <h4 class="card-title">
                  <transition name="fade" mode="out-in">
                    <span :key="tlc_6_20_Percent">
                      {{ tlc_6_20_Percent }}%
                    </span>
                  </transition>
                </h4>
              </div>
            </stats-card>
          </div>
        </div>
        </div>

        <div v-if="!phipii && !selectedSiteVISNorNATIONAL">
          <!-- Section Header -->
          <div class="row d-flex justify-content-center">
            <h4 class="section-head">Patients with Numerous Sessions Activity Summary</h4>
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
        </div>

        <!-- Show table only with PHIPII -->
        <div v-else-if="phipii">
          <!-- Section Header -->
          <div class="row d-flex justify-content-center">
            <h4 class="section-head">Numerous Sessions Activity Summary</h4>
          </div>

        <!-- Download Table Data Note -->
        <div style="align-items: center; display: flex; justify-content: center; ">
          <div style="width: 60%; margin-bottom: 10px;">
            <b>NOTE:&nbsp;&nbsp;&nbsp;</b> If downloading data from tables on the dashboard, please consult with and follow guidance of the local Information Security Officer (ISO) and Privacy Officer.
          </div>
        </div>

          <!--  FAQ -->
          <div
            style="align-items: center; display: flex; justify-content: center"
          >
            <div style="width: 60%; margin-bottom: 10px">
              <VueFaqAccordion :items="TimeLimitedCare6and20Table" />
            </div>
          </div>

          <div class="row justify-content-center">
            <div class="col-md-12">
              <card>
                <template slot="header">
                  <span>Hover Over Column Header to View Menu</span>
                  <button class="float-right" @click="exportCSVgridOptions4">
                    Export to CSV
                  </button>
                </template>
                <ag-grid-vue
                  style="font-size: 12px; height: 500px"
                  class="ag-theme-balham grid"
                  :gridOptions="gridOptions4"
                  :columnDefs="columnDefs4"
                  :rowData="rowData4"
                  :gridReady="onGridReady4"
                  :enableFilter="true"
                  :enableSorting="true"
                  :enableColResize="true"
                  :onFilterChanged="onFilterChanged"
                  :animateRows="true"
                >
                </ag-grid-vue>
                <template slot="footer">
                  <div class="legend">Numerous Sessions Activity Summary</div>
                </template>
              </card>
            </div>
          </div>
        </div>

        <hr />

        <!-- Section Header -->
        <div class="row d-flex justify-content-center">
          <h4 class="section-head">Time Limited Care</h4>
        </div>

        <!--  FAQ -->
        <div
          style="align-items: center; display: flex; justify-content: center"
        >
          <div style="width: 60%; margin-bottom: 10px">
            <VueFaqAccordion :items="TimeLimitedCare12and12" />
          </div>
        </div>

        <div class="d-flex flex-row justify-content-center">
          <div class="col-xl-6 col-md-6">
            <div class="row d-flex flex-row justify-content-center mt-2 mb-2">
              Patients With Lengthy Treatment Period
            </div>
            <div class="row d-flex flex-row justify-content-center">
            <stats-card class="col-md-6">
              <div slot="header" class="icon-warning">
                <i class="nc-icon-outline nc-single-01 text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">
                  12 Sessions<br /> in 12 months<br />
                  ({{ formatNumber(tlcNumerator12_12) }}/
                  {{ formatNumber(tlcDenominator) }})
                </p>
                <h4 class="card-title">
                  <transition name="fade" mode="out-in">
                    <span :key="tlc_12_12_Percent">
                      {{ tlc_12_12_Percent }}%
                    </span>
                  </transition>
                </h4>
              </div>
            </stats-card>
          </div>
        </div>
        </div>

        <div v-if="!phipii && !selectedSiteVISNorNATIONAL">
          <!-- Section Header -->
          <div class="row d-flex justify-content-center">
            <h4 class="section-head">Patients With Lengthy Treatment Period</h4>
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
        </div>

        <!-- Show table only with PHIPII -->
        <div v-else-if="phipii">
          <!-- Section Header -->
          <div class="row d-flex justify-content-center">
            <h4 class="section-head">Patients With Lengthy Treatment Period</h4>
          </div>

        <!-- Download Table Data Note -->
        <div style="align-items: center; display: flex; justify-content: center; ">
          <div style="width: 60%; margin-bottom: 10px;">
            <b>NOTE:&nbsp;&nbsp;&nbsp;</b> If downloading data from tables on the dashboard, please consult with and follow guidance of the local Information Security Officer (ISO) and Privacy Officer.
          </div>
        </div>

          <!--  FAQ -->
          <div
            style="align-items: center; display: flex; justify-content: center"
          >
            <div style="width: 60%; margin-bottom: 10px">
              <VueFaqAccordion :items="TimeLimitedCare12and12Table" />
            </div>
          </div>

          <div class="row justify-content-center">
            <div class="col-md-12">
              <card>
                <template slot="header">
                  <span>Hover Over Column Header to View Menu</span>
                  <!-- <button class="float-right" @click="exportCSVgridOptions4">
                    Export to CSV
                  </button> -->
                </template>
                <ag-grid-vue
                  style="font-size: 12px; height: 500px"
                  class="ag-theme-balham grid"
                  :gridOptions="gridOptions5"
                  :columnDefs="columnDefs5"
                  :rowData="rowData5"
                  :gridReady="onGridReady5"
                  :enableFilter="true"
                  :enableSorting="true"
                  :enableColResize="true"
                  :onFilterChanged="onFilterChanged"
                  :animateRows="true"
                >
                </ag-grid-vue>
                <template slot="footer">
                  <div class="legend">Lengthy Time Period Activity</div>
                </template>
              </card>
            </div>
          </div>
        </div>


      </div>
      <!-- End container-fluid -->
    </div>
    <!-- End content -->
  </transition>
</template>
<script>
import StatsCard from "src/components/UIComponents/Cards/StatsCard.vue";
import Card from "src/components/UIComponents/Cards/Card.vue";

import Vue from "vue";
import { AgGridVue } from "ag-grid-vue";

import VueFaqAccordion from "vue-faq-accordion";
import {
  ProviderClinicPatientTotals,
  ProviderActivitySummary,
  ProviderEncounterTotals,
  ProviderPatientSessions,
} from "../Documentation/providers_doc.js";

import {
  TimeLimitedCare6and20,
  TimeLimitedCare12and12,
  TimeLimitedCare6and20Table,
  TimeLimitedCare12and12Table,
} from "../Documentation/time_limited_care.js";


import { mapState, mapGetters, mapActions } from "vuex";

import { addCommas, precise_round, formatNumber } from "src/utils";

export default {
  name: "tlc",
  components: {
    Card,
    StatsCard,
    AgGridVue,
    VueFaqAccordion,
  },
  data() {
    return {
      ProviderClinicPatientTotals: ProviderClinicPatientTotals,
      ProviderActivitySummary: ProviderActivitySummary,
      ProviderEncounterTotals: ProviderEncounterTotals,
      ProviderPatientSessions: ProviderPatientSessions,
      TimeLimitedCare6and20: TimeLimitedCare6and20,
      TimeLimitedCare12and12: TimeLimitedCare12and12,  
      TimeLimitedCare6and20Table: TimeLimitedCare6and20Table,
      TimeLimitedCare12and12Table: TimeLimitedCare12and12Table
    };
  },
  computed: {
    ...mapState([
      "selectedSite",
      "selectedRange",
      "phipii",
      "selectedInstitutions",
      "selectedInstitutionsNames",
      "disclaimer",
      "dataError",
    ]),
    ...mapGetters([
      "warningCurrentDate",
      // TLC Widgets
      "tlcNumerator6_20",
      "tlcNumerator12_12",
      "tlcDenominator",
      // TLC Tables
      "tlc6_20_Table",
      "tlc12_12_Table"

    ]),
    selectedSiteVISNorNATIONAL() {
      return /VISN|NATIONAL/.test(this.selectedSite);
    },
    changeBackgroundColor() {
      // console.log('in changeBackgroundColor siteProviderSelected is: ', this.siteProviderSelected)
      // console.log('in changeBackgroundColor selectedInstitutions is: ', this.selectedInstitutions)
      // return this.siteProviderSelected || this.selectedInstitutions.length > 0 || false
      return this.selectedInstitutions.length > 0 || false;
    },
    scrollPosition() {
      console.log("window.pageYOffset: ", window.pageYOffset);
    },
    rowData4() {
      // console.log('in computed, this.tlc6_20_Table is: ', this.tlc6_20_Table)
      return this.tlc6_20_Table;
    },
    rowData5() {
      // console.log('in computed, this.tlc6_20_Table is: ', this.tlc6_20_Table)
      return this.tlc12_12_Table;
    },
    tlc_6_20_Percent() {
      let percent =
        (+this.tlcNumerator6_20 / +this.tlcDenominator) * 100;
      return precise_round(percent, 1);
    },
    tlc_12_12_Percent() {
      let percent =
        (+this.tlcNumerator12_12 / +this.tlcDenominator) * 100;
      return precise_round(percent, 1);
    },
  },
  beforeMount() {
    (this.columnDefs4 = this.createColDefs4()),
    (this.columnDefs5 = this.createColDefs5()),
    (this.onFilterChanged = function () {
      console.log("filter changed!!");
    });

    (this.gridOptions4 = {
      // groupHideOpenParents: true,
      autoGroupColumnDef: {
        headerName: "Site / Staff / Patient",
        // field: 'InitialsAndL4',
        field: "InitialsAndL4",
        // field: 'LocationName'
        suppressPropertyNamesCheck: true,
      },
      // groupMultiAutoColumn:true,
      // groupSuppressAutoColumn: true
    }),
    // (this.gridOptions4 = {
    //   suppressPropertyNamesCheck: true,
    // })
    (this.gridOptions5 = {
      // groupHideOpenParents: true,
      autoGroupColumnDef: {
        headerName: "Site / Staff / Patient",
        // field: 'InitialsAndL4',
        field: "InitialsAndL4",
        // field: 'LocationName'
        suppressPropertyNamesCheck: true,
      },
      // groupMultiAutoColumn:true,
      // groupSuppressAutoColumn: true
    })


  },
  mounted() {
    this.CURRENT_PAGE("providers");

    this.GET_INSTITUTIONS();

    this.TLC_WIDGETS();
    this.TLC_TABLES();
  },
  methods: {
    ...mapActions([

      "CURRENT_PAGE",
      "GET_INSTITUTIONS",
      
      "TLC_WIDGETS",
      "TLC_TABLES"

    ]),
    addCommas,
    formatNumber(num) {
      return addCommas(num);
    },
    asyncValue(val) {
      return val == 0 ? "Loading..." : val;
    },
    // exportCSVgridOptions1() {
    //   let params = {
    //     // define the fields for export
    //     columnKeys: [
    //       "STAFFNAME",
    //       "InstitutionName",
    //       "LocationName",
    //       "EncountersByProvider",
    //       "numPatients",
    //     ],
    //     fileName: "provider_encounter_totals",
    //     allColumns: true,
    //     columnGroups: false,
    //     processCellCallback: (params) => {
    //       // console.log('processCellCallback params.value: ', params.value)
    //       return params.value;
    //     },
    //     shouldRowBeSkipped: (params) => {
    //       // don't export if it's a grouped row
    //       if (params.node.group == true) {
    //         return true;
    //       }
    //     },
    //   };

    //   this.gridOptions1.api.exportDataAsCsv(params);
    // },
    // exportCSVgridOptions3() {
    //   this.gridOptions3.api.exportDataAsCsv({
    //     processCellCallback: (params) => {
    //       if (params.column.colId == "visitEBPpercent") {
    //         // need params.node.data to access the grid columns
    //         // see below in cellRenderer for similar formating of output values
    //         let encounters = params.node.data.numEncounters;
    //         let encountersEBP =
    //           params.node.data.numEncountersEBP === null
    //             ? 0
    //             : params.node.data.numEncountersEBP;
    //         let encountersEBPpercent =
    //           params.node.data.PercentageEncountersCPT === null
    //             ? 0
    //             : params.node.data.PercentageEncountersCPT;

    //         // return `${encountersEBP} (${encountersEBPpercent}%)`
    //         return `${encountersEBP}`; // just return value not percent
    //       }
    //       if (params.column.colId == "patientEBPpercent") {
    //         // need params.node.data to access the grid columns
    //         // see below in cellRenderer for similar formating of output values
    //         let patients = params.node.data.numPatients;
    //         let patientsEBP =
    //           params.node.data.numPatientsEBP === null
    //             ? 0
    //             : params.node.data.numPatientsEBP;
    //         let patientsEBPpercent =
    //           params.node.data.PercentagePatientsCPT === null
    //             ? 0
    //             : params.node.data.PercentagePatientsCPT;

    //         // return `${patientsEBP} (${patientsEBPpercent}%)`
    //         return `${patientsEBP}`; // just return value not percent
    //       }
    //       return params.value;
    //     },
    //     processHeaderCallback: (params) => {
    //       // return custom header name
    //       if (params.column.getColDef().headerName == "Visit EBPs (%)") {
    //         return "Visit EBPs";
    //       }
    //       if (params.column.getColDef().headerName == "Patient EBPs (%)") {
    //         return "Patient EBPs";
    //       }

    //       // return grid header name
    //       return params.column.colDef.headerName;
    //     },
    //   });
    // },
    exportCSVgridOptions4() {
      let params = {
        // define the fields for export
        columnKeys: [
          "StaffName",
          "InitialsAndL4",
          "EARLIEST_AND_LATEST_SESSIONS",
          "MONTHS_BETWEEN",
          "SESSIONS_TYPES",
          "PCL5"
        ],
        fileName: "tlc6_20_details",
        columnGroups: false,
        allColumns: true,
        processCellCallback: (params) => {
          // console.log('processCellCallback params.value: ', params.value)
          return params.value;
        },
        shouldRowBeSkipped: (params) => {
          // don't export if it's a grouped row
          if (params.node.group == true) {
            return true;
          }
        },
      };

      this.gridOptions4.api.exportDataAsCsv(params);
    },
    createColDefs4() {
      return [       
        {
          headerName: "Staff Name",
          field: "StaffName",
          width: 110,
          cellStyle: { "text-align": "left" },
          filter: "agTextColumnFilter",
          rowGroup: true,
          // hide: true
        },
        {
          headerName: "Patients",
          field: "InitialsAndL4",
          width: 67,
          cellStyle: { "text-align": "left" },
          filter: "agTextColumnFilter",
          hide: true
        },
        {
          headerName: "Sessions Start / End",
          field: "EARLIEST_AND_LATEST_SESSIONS",
          width: 110,
          cellStyle: { "text-align": "left" },
          filter: "agNumberColumnFilter",
        },
        {
          headerName: "Mos.",
          field: "MONTHS_BETWEEN",
          width: 50,
          cellStyle: { "text-align": "left" },
          filter: "agNumberColumnFilter",
        },
        {
          headerName: "Sessions & Types",
          field: "SESSIONS_TYPES",
          width: 120,
          cellStyle: { "text-align": "left" },
          filter: "agNumberColumnFilter",
        },
        {
          headerName: "PCL5s",
          field: "PCL5",
          width: 50,
          cellStyle: { "text-align": "left" },
          filter: "agNumberColumnFilter",
        },

      ]
    },
    exportCSVgridOptions5() {
      let params = {
        // define the fields for export
        columnKeys: [
          "StaffName",
          "InitialsAndL4",
          "EARLIEST_AND_LATEST_SESSIONS",
          "MONTHS_BETWEEN",
          "SESSIONS_TYPES",
          "PCL5"
        ],
        fileName: "tlc6_20_details",
        columnGroups: false,
        allColumns: true,
        processCellCallback: (params) => {
          // console.log('processCellCallback params.value: ', params.value)
          return params.value;
        },
        shouldRowBeSkipped: (params) => {
          // don't export if it's a grouped row
          if (params.node.group == true) {
            return true;
          }
        },
      };

      this.gridOptions5.api.exportDataAsCsv(params);
    },
    createColDefs5() {
      return [
        {
          headerName: "Staff Name",
          field: "StaffName",
          width: 110,
          cellStyle: { "text-align": "left" },
          filter: "agTextColumnFilter",
          rowGroup: true,
          // hide: true
        },
        {
          headerName: "Patients",
          field: "InitialsAndL4",
          width: 67,
          cellStyle: { "text-align": "left" },
          filter: "agTextColumnFilter",
          hide: true
        },
        {
          headerName: "Sessions Start / End",
          field: "EARLIEST_AND_LATEST_SESSIONS",
          width: 110,
          cellStyle: { "text-align": "left" },
          filter: "agNumberColumnFilter",
        },
        {
          headerName: "Mos.",
          field: "MONTHS_BETWEEN",
          width: 50,
          cellStyle: { "text-align": "left" },
          filter: "agNumberColumnFilter",
        },
        {
          headerName: "Sessions & Types",
          field: "SESSIONS_TYPES",
          width: 120,
          cellStyle: { "text-align": "left" },
          filter: "agNumberColumnFilter",
        },
        {
          headerName: "PCL5s",
          field: "PCL5",
          width: 50,
          cellStyle: { "text-align": "left" },
          filter: "agNumberColumnFilter",
        },
      ]
    },
    onCellClicked(event) {
      let clickedCellFieldName = event.colDef.field;
      let clickedCellDataSimple = event.value;
      let clickedCellDataWithFieldReference =
        event.node.data[clickedCellFieldName];
      let clickedCellRowIndex = event.rowIndex;
      let clickedCellNode = event.node;

      console.log("onCellClicked node.data is ****: ", event.node.data);
    },

    onGridReady4() {
      // console.log('onGridReady3 fires sizeColumnsToFit!')
      this.gridOptions4.api.sizeColumnsToFit();
    },
    onGridReady5() {
      // console.log('onGridReady3 fires sizeColumnsToFit!')
      this.gridOptions5.api.sizeColumnsToFit();
    },
  },
};
</script>
<style>
/* institutions being filtered */
.filtering {
  background-color: lightgrey;
}

.section-head {
  font-size: 2rem;
}

.phipii-warning {
  font-size: 1rem;
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
