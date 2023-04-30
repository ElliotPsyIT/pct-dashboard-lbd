<template>
  <transition name="fade" mode="out-in">
    <div class="content" :key="selectedSite">
      <div
        class="container-fluid"
        :class="{ filtering: changeBackgroundColor }"
      >
        Scroll Position {{ scrollPosition }}

        <!-- <div>
          {{ mcodPatientLevelLookupData }}
        </div> -->

      <!-- <div>
        {{ CurrentProviderName }}
      </div>
 -->

         <!-- Headers -->
         <div class="row d-flex justify-content-center">
          <h4 class="section-head">Click a Patient in the Table Below to </h4>
          <h4 class="section-head">Lookup Patient 2 Year Treatment History</h4>
        </div>

        <div class="row justify-content-center">
            <div class="col-md-12">
              <card>
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
                  :animateRows="true"
                  :cellClicked="onCellClicked"
                >
                </ag-grid-vue>
                <template slot="footer">
                  <div class="legend">Providers' Patient Cases</div>
                </template>
              </card>
            </div>
          </div>

        <!-- <nav class="navbar navbar-light bg-light">
          <form class="form-inline">
            <input
              class="form-control mr-sm-2"
              type="text"
              placeholder="StaPa"
              v-model="StaPa"
            />
            <input
              class="form-control mr-sm-2"
              type="text"
              placeholder="PatientSID"
              v-model="PatientSID"
            />
            <button
              class="btn btn-outline-success my-2 my-sm-0"
              @click.prevent="submitPatient"
            >
              Go
            </button>
          </form>
        </nav> -->

        <!-- <modal 
        name="example"
        width="90%"
        height="85%"
        scrollable=true

        > -->

        <div class="row d-flex justify-content-center">
          <h4 class="section-head">Patient 2 Year Treatment History<br/></h4>
          <h4 class="section-head">After Clicking a Patient Row in Table Above</h4>
        </div>

        <div class="iframe-wrapper">

          <!-- <div class="iframe-loading" v-if="iframeLoading">
            iframe loading...
          </div> -->
          
          <vue-friendly-iframe v-if="loadIframe"
            ref="iframeEl"
            :style="{ display: iframeLoading ? 'none' : 'block' }"
            :src="patientLevelData"
            @load="onLoad"
            @iframe-load="onIframeLoad"
            frameborder="0"
            gesture="media"
            allow="encrypted-media"
          >
          </vue-friendly-iframe>
        </div>
      <!-- </modal> -->

      </div>
      <!-- container-fluid -->
  
      <modal name="example"
        width="70%"
        height="40%"
      >

        <div class="row d-flex justify-content-center">
          <h1 class="section-head">Retrieving Data ... When Complete See Results Below Table<br/>May Take 30 Seconds or More</h1>
        </div>
        <div class="row d-flex justify-content-center">
            <button @click="$modal.hide('example')">Close</button>
        </div> 
      </modal>

    </div>
    <!-- content -->

  </transition>

</template>

<script>

import Card from "src/components/UIComponents/Cards/Card.vue";

import { mapState, mapGetters, mapActions } from "vuex";

// Import Vue from "vue";
import { AgGridVue } from "ag-grid-vue";

import VueFriendlyIframe from "src/components/UIComponents/Iframe.vue";
import auto from "es6-promise/auto";

function url(stapa, ptsid) {
  let parent = stapa || null;
  let patient = ptsid || null;
  console.log('stapa: ', stapa)
  console.log('patient: ', patient)

  if (parent == null || patient == null) return;

  let base =
    "https://vaww.pbi.cdw.va.gov/PBIRS/ReportServer/Pages/ReportViewer.aspx?";
  let rest =
    // `/GPE/OMHS/SSRS/PCT-PatientLookup&pStaPa=512&pPatientSID=2120209&rs:embed=true`;
    `/GPE/OMHS/SSRS/PCT-PatientLookup&pStaPa=${stapa}&pPatientSID=${ptsid}&rs:embed=true`;
  // original idea of using our Patient Level 2 year treatment report
  let url = `${base}${rest}`;
  return url;
}
  function cristal_url () {
    // Kelly desire for CRISTAL patient detail
    // example patient ICN
    const icn = '1005729518';

    let base_consult_detail =
      `https://vaww.pbi.cdw.va.gov/PBIRS/Pages/ReportViewer.aspx?`
    let base_consult_detail_cristal = 
      `/RVS/OMHSP_PERC/SSRS/Production/CDS/CRISTAL/CRISTAL_PatientDetails&ICN=${icn}&rs:embed=true`
    let url_consult = `${base_consult_detail}${base_consult_detail_cristal}`
    return url_consult;
}

export default {
  components: {
    VueFriendlyIframe,
    AgGridVue,
    Card,
  },
  props: {
    message: {
      type: String,
      default: "hello world",
    },
  },
  data() {
    return {
      // showIframeBox: false,
      // triggerIframeLoad: true,

      StaPa: null,
      PatientSID: null,

      loadIframe: false,

      iframeLoading: false,
      //null,
      patientLevelData:
        // "https://vaww.pbi.cdw.va.gov/PBIRS/ReportServer/Pages/ReportViewer.aspx?/GPE/OMHS/SSRS/PCT-PatientLookup&pStaPa=512&pPatientSID=2120209&rs:embed=true",
        "https://vaww.pbi.cdw.va.gov/PBIRS/ReportServer/Pages/ReportViewer.aspx?/GPE/OMHS/SSRS/PCT-PatientLookup&pStaPa=402&pPatientSID=29179&rs:embed=true",
      // patientLevelData: 'https://spsites.cdw.va.gov/sites/OMHS/_layouts/15/ReportServer/RSViewerPage.aspx?rv:RelativeReportUrl=%2fsites%2fOMHS%2fAnalyticsReports%2fPCT-PatientLookup.rdl&rp%3apStaPa=512&rp%3apPatientSID=2120209',
      // iframeLoading: false,
    };
  },
  computed: {
    ...mapState([
      "selectedSite",
      "selectedRange",
      "selectedInstitutions",
      "selectedInstitutionsNames",
      "disclaimer",
    ]),
    ...mapGetters([
      "mcodPatientLevelLookupData",
    ]),
    CurrentProviderName() {
      console.log('StaffName: ', this.mcodPatientLevelLookupData[0],StaffName);
      return this.mcodPatientLevelLookupData[0],StaffName;
    },
    changeBackgroundColor() {
      // console.log('in changeBackgroundColor selectedInstitutions is: ', this.selectedInstitutions)
      return this.selectedInstitutions.length > 0 || false;
    },
    // utility computed
    scrollPosition() {
      // console.log('document.body.scrollHeight: ', document.body.scrollHeight)
      console.log("window.pageYOffset: ", window.pageYOffset);
    },
    rowData4() {
      // console.log('in computed, this.mcodPatientLevelLookupData is: ', this.mcodPatientLevelLookupData)
      return this.mcodPatientLevelLookupData;
    }, // providerCaseData/MCOD
  },
  beforeMount() {
      (this.gridOptions4 = {
        suppressPropertyNamesCheck: true,
      });
      (this.columnDefs4 = this.createColDefs4()); // siteProviderInfo/Provider Activity Details
  },
  mounted() {
    this.MCOD_PATIENT_LEVEL_LOOKUP();
  },
  methods: {
    ...mapActions([
      "MCOD_PATIENT_LEVEL_LOOKUP",
    ]),
    submitPatient(StaPa, PatientSID) {
      // set the StaPa and PatientSID
      
      // get the url
      // let pt = url(StaPa, PatientSID);
      // console.log("pt url: ", pt);

      // alternate URL for CRISTAL example
      let pt = cristal_url()

      // return error if no StaPa or PatientSID
      this.patientLevelData = pt;

      // logic for running a new Patient
      // flags - loadIframe, tells iframe to go get data
      //       - iframeLoading, show the suspense loading message
      // steps - set iframeLoading to true to show suspense
      //       - then, change the patientLevelData to the new url
      // problem - why won't changing the :src re-run the iframe!!

      // trigger iframe to load
      this.loadIframe = true;

      // show the iframe
      // this.showIframeBox = true;
    },
    onLoad() {
      console.log("onLoad event triggered, iframe loaded!");
    },
    onIframeLoad() {
      console.log("onIframeLoad event triggered, iframe loaded!");
    },
    onGridReady4() {
      // console.log('onGridReady3 fires sizeColumnsToFit!')
      this.gridOptions4.api.sizeColumnsToFit();
    },
    onCellClicked(event) {
      let clickedCellFieldName = event.colDef.field;
      let clickedCellDataSimple = event.value;
      let clickedCellDataWithFieldReference = event.node.data[clickedCellFieldName];
      let clickedCellRowIndex = event.rowIndex;
      let clickedCellNode = event.node;

      // console.log("onCellClicked node.data is ****: ", event.node.data);
      // pull StaPa and PatientSID from event.node.data to populate form
      let StaPa = event.node.data.StaPa
      // console.log('in onCellClicked StaPa is: ', StaPa)
      let PatientSID = event.node.data.PatientSID

      // submit patient for Patient Level Data Report
      this.submitPatient(StaPa, PatientSID)

      // test the modal
      this.show(PatientSID)

    },
    show (comments) { //simple dialog box for now
      // console.log('in show getting these comments: ', comments)
      this.comments = comments
      // console.log('calling dialog now!') 
      this.$modal.show('example')
      // this.$modal.show('dialog', {
      //   title: 'PatientSID',
      //   text: comments
      // })
    },
    createColDefs4() {
      return [
        {
          headerName: "Caseload",
          children: [
            {
              headerName: "Patient Name",
              field: "PatientName",
              width: 175,
              cellStyle: { "text-align": "left" },
              filter: "agTextColumnFilter",
            },
            {
              headerName: "Months Seen",
              field: "MONTHS_BETWEEN_FIRST_AND_MOST_RECENT_SESSIONS",
              width: 110,
              cellStyle: { "text-align": "left" },
              filter: "agNumberColumnFilter",
            },
            {
              headerName: "First Session",
              field: "MOST_RECENT_SESSION",
              width: 110,
              cellStyle: { "text-align": "left" },
              filter: "agDateColumnFilter",
            },
            {
              headerName: "# Sessions",
              field: "NUM_SESSIONS",
              width: 140,
              cellStyle: { "text-align": "left" },
              filter: "agNumberColumnFilter",
            },
            {
              headerName: "# Ind Sessions",
              field: "NUM_IND_TX_SESSIONS",
              width: 140,
              cellStyle: { "text-align": "left" },
              filter: "agNumberColumnFilter",
            },
            {
              headerName: "# Grp Sessions",
              field: "NUM_GRP_TX_SESSIONS",
              width: 140,
              cellStyle: { "text-align": "left" },
              filter: "agNumberColumnFilter",
            },
            {
              headerName: "# PCL5",
              field: "NUM_PCL5",
              width: 140,
              cellStyle: { "text-align": "left" },
              filter: "agNumberColumnFilter",
            }
          ]
        },
      ]
    }
  },
};
</script>

<style>
.iframe-wrapper {
  border: 1px solid gray;
  height: 600px;
  overflow: none;
}
.iframe-wrapper .vue-friendly-iframe {
  height: 100%;
  width: 100%;
}
.iframe-wrapper .vue-friendly-iframe iframe {
  height: 100%;
  width: 100%;
}
.fullsize {
  height: 100%;
  width: 100%;
}

table,
th,
td {
  border: 1px solid black;
}

.filtering {
  background-color: lightgrey;
}

.section-head {
  font-size: 2rem;
}

/* fade page in and out when site changes */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
  .fade-leave-to
    /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

/* slide and fade */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
