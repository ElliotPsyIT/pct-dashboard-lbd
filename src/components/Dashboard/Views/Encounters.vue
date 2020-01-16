<template>
  <transition name="fade" mode="out-in" >
    <div class="content" :key="selectedSite">
      <div class="container-fluid" :class="{filtering: changeBackgroundColor}">
         Scroll Position {{scrollPosition}}

        <!-- Show Filtered Sites -->
        <div v-if="changeBackgroundColor">
          <div class="row d-flex justify-content-center " style="position: fixed; z-index: 500;">
            <div style="font-size: .7rem; border: solid 1px grey;">{{ selectedInstitutionsNames }}</div>
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
 
           <!-- <fade-transition :duration="duration"> -->
          <!-- </fade-transition> -->

        <div class="col-xl-3 col-md-3">
          
          
            <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon-outline nc-layers-3 text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Total Encounters</p>
              <h4 class="card-title">
                {{ asyncValue(formatNumber(siteEncounterTotal)) }}
              </h4>

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
                <h4 class="card-title">{{ asyncValue(formatNumber(siteEncounterPatientTotal))}}</h4>
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
                <p class="card-category">Individual<br/>({{ asyncValue(formatNumber(siteEncounterCPTIndividual)) }}/{{asyncValue(formatNumber(siteEncounterTotal)) }})</p>
                <h4 class="card-title">{{ siteEncounterCPTIndividualPercent}}%</h4>
              </div>
              </stats-card>
          
          </div>

          <div class="col-xl-3 col-md-3">
            
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon-outline nc-multiple-11 text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">Group<br/> ({{ asyncValue(formatNumber(siteEncounterCPTGroup)) }}/{{asyncValue(formatNumber(siteEncounterTotal)) }})</p>
                <h4 class="card-title">{{siteEncounterCPTGroupPercent }}%</h4>
              </div>
            </stats-card>

          </div>

        </div>

        <!-- Section Header -->
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
                <h4 class="card-title">{{ asyncValue(formatNumber(siteEncounterCPTPatientsIndOnly)) }} Pts</h4>
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
              <h4 class="card-title">{{ asyncValue(formatNumber(siteEncounterCPTPatientsGrpOnly)) }} Pts</h4>
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
                <h4 class="card-title">{{ asyncValue(formatNumber(siteEncounterCPTPatientsBoth)) }} Pts</h4>
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
                <p class="card-category">Telephone CPT ({{ asyncValue(formatNumber(siteEncounterCPTTelephone.total)) }}/{{ asyncValue(formatNumber(siteEncounterTotal)) }})</p>
                <h4 class="card-title">{{ asyncValue(siteEncounterCPTTelephone.percent) }}%</h4>
              </div>
            </stats-card>

          </div>

          <div class="col-xl-3 col-md-3">
            
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon-outline nc-multiple-11 text-info"></i>
              </div>
              <div slot="content">
                <p class="card-category">Group Education ({{ asyncValue(formatNumber(siteEncounterCPTGroupEducation.total), 'Group Ed') }}/{{asyncValue(formatNumber(siteEncounterTotal)) }})</p>
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
                <p class="card-category">Assessment CPT ({{ asyncValue(formatNumber(siteEncounterCPTAssessment.total), 'Assessment') }}/{{asyncValue(formatNumber(siteEncounterTotal))}})</p>
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
                <p class="card-category">Prolonged Service ({{ asyncValue(formatNumber(siteEncounterCPTProlongedService.total)) }}/{{asyncValue(formatNumber(siteEncounterTotal))}})</p>
                <h4 class="card-title">{{ siteEncounterCPTProlongedService.percent }}%</h4>
              </div>
              </stats-card>

          </div>

        </div>

        <!-- Section Header -->
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

import VueFaqAccordion from 'vue-faq-accordion'

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
     
    // this.gridOptions3 = {
    //   columnDefs:  this.createColDefs3(),
    //   rowData: this.rowData, // computed prop
    //   suppressPropertyNamesCheck: true
    // }
    
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
  data() {
    return {
      gridOptions: null,
      gridOptions2: null,
      // gridOptions3: null,
      // FAQ
      duration: 2000,
      encountersAll: [
        {
          title: "PCT Clinic (Stop Code) Definition",
          value: "<u><b>Description</b></u>: Encounters conducted in all defined PCT Clinics are display for the selected date range and from the selected site. " +
          " PCT Clinics at the medical center are set up within VistA configured using one or more stop codes.<br/><br/>" + 
          "<b>Stop Codes:</b> To identify encounters from PCT Clinics, we use the following PTSD stop codes:<br/><br/>" +
          "<u>516 PTSD - Group</u>:<br/>" +
          "&nbsp;&nbsp;&nbsp; Records consultation and/or treatment follow-up provided to more than one individual.  " + 
          "Treatment is provided to those patients with PTSD.  Includes provider and support services.  " + 
          "Use the assigned CHAR4 Code if this activity takes place through a designated NEPEC PTSD Clinical Team (PCT).<br/><br/>" +
          "<u>542 Telephone PTSD</u>:<br/>"	+ 
          "&nbsp;&nbsp;&nbsp;Records patient consultation or medical care management, advice, and/or referral provided by telephone contact " + 
          "between patient or patient's next-of-kin and/or the person(s) with whom the patient has a meaningful relationship, and clinical and/or professional staff assigned to the PCT.  <br/>" + 
          "Includes the administrative and clinical services.  Provisions of 38 U.S.C. Section 7332 requires that records which reveal the identity, diagnosis, prognosis, or treatment of VA patients which relate to drug abuse, <br/>" + 
          "alcoholism or alcohol abuse, infection with HIV, or sickle cell anemia, are strictly confidential, and may not be released or discussed unless there is a written consent from the individual.<br/><br/>" +
          "<u>562 PTSD - Individual</u><br/>" +
          "&nbsp;&nbsp;&nbsp;Records patient visit for consultation, evaluation, follow-up, and/or treatment provided to an individual with PTSD.  Use the assigned CHAR4 Code if this activity takes place through a NEPEC PTSD Clinical Team (PCT).  Includes provider and support services.",
          category: "Encounters and Patients Defined..."
        },
        {
          title: "PCT Encounter (CPT Codes) Definition",
          value: "<u><b>Encounter CPT Codes</b></u>: PCT Encounters are pulled from among encounters conducting assessment, treatment and education activities.  These activities are identified use the following set of specific CPT codes.<br/><br/>" +
          "<u>Assessment</u>: <br/>('90791', '90792')<br/><br/>" +
          "<u>Individual Therapy</u>: <br/>('90832', '90833', '90834', '90836', '90837', '90838')<br/><br/>" +
      "<u>Group Psychotherapy</u>: <br/>('90853')<br/><br/>" +
      "<u>Interactive Complexity</u>: <br/>('90785')<br/><br/>" + 
      "<u>Crisis Intervention</u>: <br/>('90839', '90840', 'H2011', 'S9484')<br/><br/>" +
      "<u>Prolonged Service</u>: <br/>('99354', '99355', '99356', '99357')<br/><br/>" +
      "<u>Family Services</u>: <br/>('90846', '90847', '90849', '90887')<br/><br/>" +
      "<u>Health and Behavior (Family) Education</u>: <br/>('96154', '96155')<br/><br/>" +
      "<u>Health and Behavior (Individual) Education</u>: <br/>('96150', '96151', '96152')<br/><br/>" +
      "<u>Health and Behavior (Group) Education</u>: <br/>('96153', '98961', '98962', '99078', 'S9446', 'S9449', 'S9452', 'S9453', 'S9454')<br/><br/>" +
      "<u>Team Conference</u>: <br/>('99366', '99367', '99368')<br/><br/>" +
      "<u>Case Management</u>: <br/>('T1016')<br/><br/>" +
      "<u>Telephone</u>: <br/>('98966', '98967', '98968', '99441', '99442', '99443')<br/><br/>" +
      "<u>Other</u>: <br/>('90863', '90885', '90889', 'H0038', 'H2027')<br/><br/>",
          category: "Encounters and Patients Defined..."
        },
        {
          title: "Total Encounters and Patient Uniques",
          value: "<u><b>Total Encounters</b></u>: From all PCT Clinics defined using the above listed stop codes, all encounters tagged with the above listed CPT codes were pulled and summarized. " + 
          "<br/><br/><u><b>Patient Uniques:</b></u>: The unique patients from these PCT clinic encounter are also totalled. " + 
          "<br/><br/>", 
          category: "Encounters and Patients Defined..."
        },
      ],
      encountersPsychotherapy: [
        {
          title: "Individual Psychotherapy",
          value: "<u><b>Numerator</b></u>: Total Encounters from all PCT Clinics with the following subset of Individual Tx CPT codes:<br/><br/>" + 
          "&nbsp;&nbsp;&nbsp; <u>Individual Therapy</u>: (incl. 1 Crisis Code AND 2 Family Codes): <br/>" +
          "('90832', '90834', '90837', '90839', '90847', '90849')<br/><br/>" +
          "<b>Denominator</b>: Total Encounters from all PCT Clinic regardless of type of service provided.<br/><br/>",
          category: "Psychotherapy Encounters Defined ..."

        },
        {
          title: "Group Psychotherapy",
          value: "<u><b>Numerator</b></u>: Total Encounters from all PCT Clinics with the following Group Tx CPT codes:<br/><br/>" +
          "&nbsp;&nbsp;&nbsp; <u>Group Therapy</u>: <br/>('90853')<br/><br/>" +
          "<b>Denominator</b>: Total Encounters from all PCT Clinic regardless of type of service provided.<br/><br/>",
          category: "Psychotherapy Encounters Defined ..."

        }
      ],
      otherServices: [
        {
          title: "Numerator Counts",
          value: "<u><b>Other Services</b></u>: Numerators are encounter counts from these CPT codes: <br/><br/>" +
          "<u>Telephone</u>: <br/>('98966', '98967', '98968', '99441', '99442', '99443')<br/><br/>" +
          "<u>Health and Behavior (Group) Education</u>: <br/>('96153', '98961', '98962', '99078', 'S9446', 'S9449', 'S9452', 'S9453', 'S9454')<br/><br/>" +
          "<u>Assessment</u>: <br/>('90791', '90792')<br/><br/>" +
          "<u>Prolonged Service</u>: <br/>('99354', '99355', '99356', '99357')<br/><br/>",
          category: "Other Services Defined ..."
        },
        {
          title: "Denominator Counts",
          value: "<u><b>Other Services</b></u>: Denominators are encounter counts from all MH CPT codes irrespective of the type of service provided. <br/><br/>"+
          "<u>Assessment</u>: <br/>('90791', '90792')<br/><br/>" +
          "<u>Individual Therapy</u>: <br/>('90832', '90833', '90834', '90836', '90837', '90838')<br/><br/>" +
          "<u>Group Psychotherapy</u>: <br/>('90853')<br/><br/>" +
          "<u>Interactive Complexity</u>: <br/>('90785')<br/><br/>" + 
          "<u>Crisis Intervention</u>: <br/>('90839', '90840', 'H2011', 'S9484')<br/><br/>" +
          "<u>Prolonged Service</u>: <br/>('99354', '99355', '99356', '99357')<br/><br/>" +
          "<u>Family Services</u>: <br/>('90846', '90847', '90849', '90887')<br/><br/>" +
          "<u>Health and Behavior (Family) Education</u>: <br/>('96154', '96155')<br/><br/>" +
          "<u>Health and Behavior (Individual) Education</u>: <br/>('96150', '96151', '96152')<br/><br/>" +
          "<u>Health and Behavior (Group) Education</u>: <br/>('96153', '98961', '98962', '99078', 'S9446', 'S9449', 'S9452', 'S9453', 'S9454')<br/><br/>" +
          "<u>Team Conference</u>: <br/>('99366', '99367', '99368')<br/><br/>" +
          "<u>Case Management</u>: <br/>('T1016')<br/><br/>" +
          "<u>Telephone</u>: <br/>('98966', '98967', '98968', '99441', '99442', '99443')<br/><br/>" +
          "<u>Other</u>: <br/>('90863', '90885', '90889', 'H0038', 'H2027')<br/><br/>", 
          category: "Other Services Defined ..."
        },
      ],
      encounterCategories: [
        {
          title: "Encounter Category CPT Codes",
          value: "<u><b>Description</b></u>:Encounter Counts are totals listed by encounter category taken from the National VA Mental Health <a href=\"https://vaww.cmopnational.va.gov/CR/MentalHealth/MH_Business Rules/MH_Coding/\" target=\"_blank\"> PTSD quick guides 2016 </a>.<br/><br/>" + 
          "Also note an encounter may have multiple CPT codes. The Encounters Categories Summary table below shows all unique CPT code category combinations. <br/><br/>" +
          "<u>Assessment</u>: <br/>('90791', '90792')<br/><br/>" +
          "<u>Individual Therapy</u>: <br/>('90832', '90833', '90834', '90836', '90837', '90838')<br/><br/>" +
          "<u>Group Psychotherapy</u>: <br/>('90853')<br/><br/>" +
          "<u>Interactive Complexity</u>: <br/>('90785')<br/><br/>" + 
          "<u>Crisis Intervention</u>: <br/>('90839', '90840', 'H2011', 'S9484')<br/><br/>" +
          "<u>Prolonged Service</u>: <br/>('99354', '99355', '99356', '99357')<br/><br/>" +
          "<u>Family Services</u>: <br/>('90846', '90847', '90849', '90887')<br/><br/>" +
          "<u>Health and Behavior (Family) Education</u>: <br/>('96154', '96155')<br/><br/>" +
          "<u>Health and Behavior (Individual) Education</u>: <br/>('96150', '96151', '96152')<br/><br/>" +
          "<u>Health and Behavior (Group) Education</u>: <br/>('96153', '98961', '98962', '99078', 'S9446', 'S9449', 'S9452', 'S9453', 'S9454')<br/><br/>" +
          "<u>Team Conference</u>: <br/>('99366', '99367', '99368')<br/><br/>" +
          "<u>Case Management</u>: <br/>('T1016')<br/><br/>" +
          "<u>Telephone</u>: <br/>('98966', '98967', '98968', '99441', '99442', '99443')<br/><br/>" +
          "<u>Other</u>: <br/>('90863', '90885', '90889', 'H0038', 'H2027')<br/><br/>", 
          category: "Encounter Categories Defined ..."
        }
      ],
      encounterCPTDetails: [
        {
          title: "CPT Details",
          value: "<u><b>Description</b></u>: Encounter Counts from all PCT Clinics regardless of type of service provided.<br/><br/>" + 
          "Also note an encounter may have multiple CPT codes. The CPT Details table below shows all the distinct CPT codes and code combinations using the CPT Code standard names. <br/><br/>" +
          "<u><b>NOTE</b></u>: An encounter is not infrequently tagged with multiple CPT codes.  In the table we include all CPT code combinations for each encounter. " + 
          "Noticee that the individual CPT code names are separated by a bar \'|\', indicating multiple CPTs coded for the single encounter. <br/><br/>",
          category: "CPT Details Defined ..."
        }
      ]
    }
  },
  computed: {
    ...mapState([
      'selectedSite', 'selectedRange', 'selectedInstitutions','selectedInstitutionsNames',
      'institutionSidebarShow',
    ]),
    ...mapGetters([
      'siteEncounterTotal', // all distinct visitsid w/ CPT filtering
      'siteEncounterPatientTotal', // all distinct patientSID w/ CPT filtering
      'siteEncounterLineChartSeries',
      'siteEncounterPatientLineChartSeries',

      // 'siteEncounterApptClinicNoShowTotal',
      // 'siteEncounterApptCancelNoShowPieChart',
      // 'siteEncounterApptNoShowTotal',
      // 'siteEncounterApptCancelTotal',
      'siteEncounterApptTotalStr', // for display
      // 'siteEncounterApptTotal', // for computation
      
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
        // console.log('in changeBackgroundColor siteProviderSelected is: ', this.siteProviderSelected)
        // console.log('in changeBackgroundColor selectedInstitutions is: ', this.selectedInstitutions)
        return this.siteProviderSelected || this.selectedInstitutions.length > 0 || false
    },      
    siteEncounterCPTIndividualPercent() {
      let percent = (+this.siteEncounterCPTIndividual / +this.siteEncounterTotal) * 100
      return precise_round(percent, 1)
    },
    siteEncounterCPTGroupPercent() {
      let percent = (+this.siteEncounterCPTGroup / +this.siteEncounterTotal) * 100
      return precise_round(percent, 1)
    },
    // siteEncounterAppNoShowPercent () {
    //   return Math.round((this.siteEncounterApptNoShowTotal/this.siteEncounterTotal) * 100)
    // },

    // siteEncounterAppCancelPercent () {
    //   return Math.round((this.siteEncounterApptCancelTotal/this.siteEncounterTotal) * 100)
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
      'INSTITUTIONS_FILTER',

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

</style>
