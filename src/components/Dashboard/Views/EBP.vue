<template>
  <transition name="fade" mode="out-in">
    <div class="content" :key="selectedSite">
      <div class="container-fluid" :class="{filtering: changeBackgroundColor}">

              Scroll Position {{scrollPosition}}


        <!-- Show Filtered Sites -->
        <div v-if="changeBackgroundColor">
          <div class="row d-flex justify-content-center " style="position: fixed; z-index: 500;">
            <div style="font-size: .7rem; border: solid 1px grey; ">
                {{ selectedInstitutionsNames }}
            </div>
          </div>
        </div>
     
       <!-- Section Headers -->
        <div class="row d-flex justify-content-center ">
          <h4 class="section-head">EBPs</h4>
        </div>

        <!-- EBPs FAQ -->
        <div style="align-items: center; display: flex; justify-content: center; ">
          <div style="width: 60%; margin-bottom: 10px;">
           <VueFaqAccordion :items="ebps"/> 
          </div>
        </div>
        
      <div class="row d-flex justify-content-center ">
        <div class="col-xl-3 col-md-2">
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon-outline nc-layers-3 text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category" v-tooltip.top-center="TotalEBPsSessions">Sessions ({{siteEBPSessionsAny}}/{{addCommas(siteALLSessions)}})</p>
                <h4 class="card-title">{{siteEBPSessionsAnyPercent}}%</h4>
              </div>
            </stats-card>

          </div>

          <div class="col-xl-3 col-md-2">
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-single-02 text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category" v-tooltip.top-center="TotalEBPsPatients">Patients ({{siteEBPPatientsAny}}/{{addCommas(siteALLPatients)}}) </p>
                <h4 class="card-title">{{siteEBPPatientsAnyPercent}}%</h4>
              </div>
            </stats-card>

          </div>

      </div>

       <!-- Section Headers -->
        <div class="row d-flex justify-content-center ">
          <h4 class="section-head">PE or CPT</h4>
        </div>

        <!-- PE or CPT FAQ -->
        <div style="align-items: center; display: flex; justify-content: center; ">
          <div style="width: 60%; margin-bottom: 10px;">
           <VueFaqAccordion :items="PEorCPT"/> 
          </div>
        </div>

      <div class="row d-flex justify-content-center ">
        <div class="col-xl-3 col-md-2">
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon-outline nc-layers-3 text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category" v-tooltip.top-center="TotalPECPTSessions">Sessions ({{siteEBPSessionsPECPT}}/{{addCommas(siteALLSessions)}})</p>
                <h4 class="card-title">{{siteEBPSessionsPECPTPercent}}%</h4>
              </div>
            </stats-card>

          </div>

          <div class="col-xl-3 col-md-2">
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-single-02 text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category" v-tooltip.top-center="TotalPECPTPatients">Patients ({{siteEBPPatientsPECPT}}/{{addCommas(siteALLPatients)}})</p>
                <h4 class="card-title">{{siteEBPPatientsPECPTPercent}}%</h4>
              </div>
            </stats-card>

          </div>

      </div>
<hr class="style1"/>

        <!-- Section Headers -->
        <div class="row d-flex justify-content-center ">
          <h4 class="section-head" ></h4>
        </div>

        <!-- EBPs Individual Tx FAQ -->
        <div style="align-items: center; display: flex; justify-content: center; ">
          <div style="width: 60%; margin-bottom: 10px;">
           <VueFaqAccordion :items="IndividualAndGroupTxEBPs"/> 
          </div>
        </div>
      
        <!-- Section Headers -->
        <div class="row d-flex justify-content-around">
          <h4 class="section-head" >Individual Tx EBPs</h4>
          <h4 class="section-head" >Group Tx EBPs</h4>
        </div>

      <div class="row d-flex justify-content-center ">

        <div class="col-xl-3 col-md-2">
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon-outline nc-layers-3 text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category" v-tooltip.top-center="IndividualTxEBPSessions">Sessions ({{siteEBPSessionsInd}}/{{addCommas(siteALLSessionsInd)}})</p>
                <h4 class="card-title">{{siteEBPSessionsIndPercent}}%</h4>
              </div>
            </stats-card>

          </div>


          <div class="col-xl-3 col-md-2">
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-single-02 text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category" v-tooltip.top-center="IndividualTxEBPPatients">Patients ({{siteEBPPatientsInd}}/{{addCommas(siteALLPatientsInd)}})</p>
                <h4 class="card-title">{{siteEBPPatientsIndPercent}}%</h4>
              </div>
            </stats-card>

          </div>

      <!-- </div> -->

             <!-- Section Headers -->
        <!-- <div class="row d-flex justify-content-center ">
 
        </div> -->

      <!-- <div class="row d-flex justify-content-center "> -->
        <div class="col-xl-3 col-md-2">
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon-outline nc-layers-3 text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category" v-tooltip.top-center="GroupTxEBPSessions">Sessions ({{siteEBPSessionsGrp}}/{{addCommas(siteALLSessionsGrp)}})</p>
                <h4 class="card-title">{{siteEBPSessionsGrpPercent}}%</h4>
              </div>
            </stats-card>

          </div>

          <div class="col-xl-3 col-md-2">
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-single-02 text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category" v-tooltip.top-center="GroupTxEBPPatients">Patients ({{siteEBPPatientsGrp}}/{{addCommas(siteALLPatientsGrp)}})</p>
                <h4 class="card-title">{{siteEBPPatientsGrpPercent}}%</h4>
              </div>
            </stats-card>

          </div>

      </div>
  <hr class="style1"/>
        <!-- Section Headers -->
        <div class="row d-flex justify-content-center ">
          <h4 class="section-head"></h4>
        </div>

         <!-- <div class="row d-flex justify-content-center">
          <h4 class="section-head"> Ind Therapy Only </h4>
     
          <h4 class="section-head"> Group Therapy Only</h4>

          <h4 class="section-head"> Both Therapies </h4>
        </div> -->

        <!-- <div class="row d-flex justify-content-center">

          <div class="col-xl-3 col-md-2">
            <h4 class="section-head d-flex justify-content-center"> Ind Tx Only </h4>
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon-outline nc-single-01 text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category"  v-tooltip.top-center="IndTherapyOnly">Ind Tx Only ({{siteEBPPatientsCPTIndividualOnly}}/{{addCommas(siteEncounterCPTPatientsEither)}})</p>
                <h4 class="card-title">{{siteEBPPatientsIndOnlyPercent}}%</h4>
              </div>
            </stats-card>

          </div>

          <div class="col-xl-3 col-md-2">
            <h4 class="section-head d-flex justify-content-center"> Grp Tx Only</h4>
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon-outline nc-multiple-11 text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category" v-tooltip.top-center="GroupTherapyOnly">Grp Tx Only ({{siteEBPPatientsCPTGroupOnly}}/{{addCommas(siteEncounterCPTPatientsEither)}})</p>
                <h4 class="card-title">{{siteEBPPatientsGrpOnlyPercent}}%</h4>
              </div>
            </stats-card>

          </div>

          <div class="col-xl-3 col-md-2">
            <h4 class="section-head d-flex justify-content-center"> Both </h4>
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-preferences-circle-rotate text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category" v-tooltip.top-center="BothIndGroupTherapy">Both Ind & Grp Tx({{siteEBPPatientsCPTBoth}}/{{addCommas(siteEncounterCPTPatientsEither)}})</p>
                <h4 class="card-title">{{siteEBPPatientsBothPercent}}%</h4>
              </div>
            </stats-card>

          </div>
  
        </div> -->

  <!-- <hr class="style1"/> -->

        <!-- Section Headers -->
        <!-- <div class="row d-flex justify-content-center ">
          <h4 class="section-head"></h4>
        </div>
      
        <div class="row d-flex justify-content-around">
          <h4 class="section-head"> Clinics With EBPs </h4>
          <h4 class="section-head"> Providers With EBPs</h4>
        </div>

        <div class="row d-flex justify-content-center">

          <div class="col-xl-3 col-md-2">
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">PEI ({{siteEBPClinicsPEI}}/{{addCommas(siteEBPClinicsAll)}})</p>
                <h4 class="card-title">{{siteEBPClinicsPEIPercent}}%</h4>
              </div>
            </stats-card>

          </div>

          <div class="col-xl-3 col-md-2">
            
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">CPT ({{siteEBPClinicsCPT}}/{{addCommas(siteEBPClinicsAll)}})</p>
                <h4 class="card-title">{{siteEBPClinicsCPTPercent}}%</h4>
              </div>
            </stats-card>

          </div>

          <div class="col-xl-3 col-md-2">
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">PEI ({{siteEBPProvidersPEI}}/{{addCommas(siteEBPProvidersAll)}})</p>
                <h4 class="card-title">{{siteEBPProvidersPEIPercent}}%</h4>
              </div>
            </stats-card>

          </div>
        
          <div class="col-xl-3 col-md-2">
            
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">CPT ({{siteEBPProvidersCPT}}/{{addCommas(siteEBPProvidersAll)}})</p>
                <h4 class="card-title">{{siteEBPProvidersCPTPercent}}%</h4>
              </div>
            </stats-card>

          </div> -->
        </div> <!-- End Container -->

        <!-- <div class="row d-flex justify-content-center ">
          <h4 class="section-head">EBPs for Patients (Individual Tx) {{siteEBPPatients}}/{{siteEBPPatientsAll}}</h4>
        </div>
      
        <div class="row d-flex justify-content-center">

          <div class="col-xl-3 col-md-2">
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">PEI for Patients ({{siteEBPPatientsPEI}})</p>
                <h4 class="card-title">{{siteEBPPatientsPEIPercent}}%</h4>
              </div>
            </stats-card>

          </div>
        
          <div class="col-xl-3 col-md-2">
            
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">CPT for Patients ({{siteEBPPatientsCPT}})</p>
                <h4 class="card-title">{{siteEBPPatientsCPTPercent}}%</h4>
              </div>
            </stats-card>

          </div>
        
        </div> -->

  <!-- <hr class="style1"/> -->

        <!-- <div class="row d-flex justify-content-center ">
          <h4 class="section-head">Depression EBPs</h4>
        </div>
      
        <div class="row d-flex justify-content-around">
          <h4 class="section-head">Clinics</h4>
          <h4 class="section-head">Providers</h4>
        </div> -->

        <!-- <div class="row d-flex justify-content-center">
        
          <div class="col-xl-3 col-md-3">
            
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">CBT-Depression</p>
                <h4 class="card-title">{{ siteEncounterCPTAssessment.total }}/{{ siteEncounterCPTAssessment.percent }}%</h4>
                <h4 class="card-title">%</h4>
              </div>
              </stats-card>

          </div>

          <div class="col-xl-3 col-md-3">
            
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">IPT-Depression</p>
                <h4 class="card-title">%</h4>
              </div>
              </stats-card>

          </div>

          <div class="col-xl-3 col-md-3">
            
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">CBT-Depression</p>
                <h4 class="card-title">%</h4>
              </div>
              </stats-card>

          </div>

          <div class="col-xl-3 col-md-3">
            
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">IPT-Depression</p>              
                <h4 class="card-title">%</h4>
              </div>
              </stats-card>

          </div>

        </div> -->

        <!-- <div class="row d-flex justify-content-center ">
          <h4 class="section-head">Patients</h4>
        </div> -->

        <!-- <div class="row d-flex justify-content-center">
        
          <div class="col-xl-3 col-md-3">
            
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">CBT-Depression</p>
                <h4 class="card-title">%</h4>
              </div>
              </stats-card>

          </div>

          <div class="col-xl-3 col-md-3">
            
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">IPT-Depression</p>             
                <h4 class="card-title">%</h4>
              </div>
              </stats-card>

          </div>

        </div> -->

  <!-- <hr class="style1"/> -->

        <!-- <div class="row d-flex justify-content-center ">
          <h4 class="section-head">Insomnia EBPs</h4>
        </div> -->
      
        <!-- <div class="row d-flex justify-content-around">
          <h4 class="section-head">Clinics</h4>
          <h4 class="section-head">Providers</h4>
          <h4 class="section-head">Patients</h4>
        </div> -->

        <!-- <div class="row d-flex justify-content-around">
        
          <div class="col-xl-3 col-md-3">
            
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">CBT-Insomnia</p>
                <h4 class="card-title">%</h4>
              </div>
              </stats-card>

          </div>

          <div class="col-xl-3 col-md-3">
            
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">CBT-Insomnia</p>
                <h4 class="card-title">%</h4>
              </div>
              </stats-card>

          </div>

          <div class="col-xl-3 col-md-3">
            
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">CBT-Insomnia</p>
                <h4 class="card-title">%</h4>
              </div>
              </stats-card>

          </div>
        
        </div> -->

  <!-- <hr class="style1"/> -->

  <!-- Section Header -->
        <div class="row d-flex justify-content-center ">
          <h4 class="section-head">EBP Activity Summary</h4>
        </div>

        <!-- EBP Activity Summary FAQ -->
        <div style="align-items: center; display: flex; justify-content: center; ">
          <div style="width: 60%; margin-bottom: 10px;">
           <VueFaqAccordion :items="ebpActivitySummary"/> 
          </div>
        </div>

        <div class="row">

          <div class="col-md-6" >

            <br/>
            <card>
              <template slot="header">
                <!-- <button @click="getSelectedRows()"> Get Selected Rows</button> -->
                <button class="float-right" @click="gridOptions.api.exportDataAsCsv()">Export to CSV</button>
              </template>
                <ag-grid-vue style="font-size: 12px; height: 425px" class="ag-theme-balham grid" 
                :gridOptions="gridOptions" 
                :columnDefs="columnDefs"
                :rowData="rowData" 
                :gridReady="onGridReady"
                :enableFilter="true"
                :enableSorting="true"
                :enableColResize="true"
                :cellClicked="onCellClicked"
                >
                </ag-grid-vue>
                <!-- :rowDataChanged="onRowDataChanged" -->
              <!-- <template slot="footer">
                <div class="legend">
                  EBP Patient Totals
                </div>
              </template> -->
            </card>
          </div>


          <div class="col-md-6">
            <template>
              <vue-highcharts :options="pieChartOptions"  ref="pieChart"></vue-highcharts>
            </template>
          </div>

        </div>

  <!-- Section Header -->
        <div class="row d-flex justify-content-center ">
          <h4 class="section-head">Providers' EBPs and Surveys By Clinic and Patient</h4>
        </div>

        <div v-if="!phipii">
          <div class="row d-flex justify-content-center">
            <h3 class="phipii-warning">Privileges Required to View Patient Level Data for Station <b>{{ selectedSite }}</b> - Request Link Below</h3>
          </div>
          <div class="row d-flex justify-content-center ">
            <a href="https://vaww.cdw.va.gov/sites/security/request/Pages/register.aspx" target="_blank"><u>Link to BISL PHI/PII Access Request</u></a>
          </div>
        </div>

  <!-- Show table only with PHIPII -->
      <div v-else-if="phipii">

        <!-- Providers EBPs And Surveys By Clinic And Patient Summary FAQ -->
        <div style="align-items: center; display: flex; justify-content: center; ">
          <div style="width: 60%; margin-bottom: 10px;">
           <VueFaqAccordion :items="ProvidersEBPsAndSurveysByClinicAndPatient"/> 
          </div>
        </div>

        <!-- need to hide this table if no PHIPII permissions -->
        <div class="row justify-content-center">
          <div class="col-md-12">
            <card>
              <template slot="header">
                <button @click="gridOptions1.api.collapseAll()" >Collapse All</button>
                <button @click="gridOptions1.api.expandAll()" >Expand All</button>
                <button class="float-right" @click="gridOptions1.api.exportDataAsCsv()">Export to CSV</button>
              </template>
              <ag-grid-vue style="font-size: 12px; height: 500px" class="ag-theme-balham grid" 
              :gridOptions="gridOptions1" 
              :columnDefs="columnDefs1"
              :rowData="rowData1" 
              :gridReady="onGridReady1"
              :enableFilter="true"
              :enableSorting="true"
              :enableColResize="true"
              :animateRows="true"
              :cellClicked="onCellClicked"
              >
              </ag-grid-vue>
               <!-- :rowDataChanged="onRowDataChanged1" -->
            </card>
          </div>

        </div> 
      <!-- Display if PHIPII -->
      </div> 

      </div>
    <!-- </div> -->
  </transition>
</template>
<script>

import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
import Card from 'src/components/UIComponents/Cards/Card.vue'

import Vue from "vue"
import { AgGridVue } from "ag-grid-vue"

import VueHighcharts from 'vue2-highcharts'

import VueFaqAccordion from 'vue-faq-accordion'

import { mapState, mapGetters, mapActions } from 'vuex'

import { precise_round, addCommas } from 'src/utils'


export default {
  name: 'EBP',
  components: {
    StatsCard,
    Card,
    AgGridVue,
    VueHighcharts,
    VueFaqAccordion
  },
  data () {
    return {
      TotalEBPsSessions: 'All EBP Sessions / All PCT Sessions',
      TotalEBPsPatients: 'All EBP Patients / All PCT Patients',
      TotalPECPTSessions: 'PE and CPT Sessions / All PCT Sessions',
      TotalPECPTPatients: 'PE and CPT Patients / All PCT Patients',
      IndividualTxEBPSessions: 'EBP Ind Tx Sessions / All PCT Ind Tx Sessions',
      IndividualTxEBPPatients: 'EBP Ind Tx Patients / All PCT Ind Tx Patients',
      GroupTxEBPSessions: 'EBP Group Tx Sessions / All PCT Group Tx Sessions',
      GroupTxEBPPatients: 'EBP Group Tx Patients / All PCT Group Tx Patients',
      IndTherapyOnly: 'Patients with EBP Ind Tx Sessions Only / All Therapy Patients',
      GroupTherapyOnly: 'Patients with EBP Group Tx Sessions Only / All Therapy Patients',
      BothIndGroupTherapy: 'Patients with EBP Ind and Group Tx Sessions / All Therapy Patients',
      
      ebps: [
        {
          title: "Sessions Numerator",
          value: "EBPs Session Counts<br/><br/>" + 
          "Numerator: The EBPs Session numerator reflects a count of PCT encounters documented as EBP sessions. <br/>" +
          "A documented EBP session is identified if an EBP template was used in its documentation." +
          "Only encounters of the following encounter types are used in counting EBP sessions:<br/><br/>" +
          "INDIVIDUAL SESSIONS: CPTCodes 90832 OR 90834 OR 90837<br/>" +
          "CRISIS SESSIONS: CPTCodes 90839<br/>" +
          "GROUP SESSIONS: CPTCodes 90853<br/>" +
          "FAMILY SESSIONS: CPTCodes 90847 OR 90849",
          category: "EBPs Defined ..."
        },
                {
          title: "Sessions Denominator",
          value: "EBPs Sessions Total Counts<br/><br/>" + 
          "Numerator: The EBPs Session denominator reflects a count of total PCT encounters whether documented as EBP sessions or not. <br/>" +
          "Only encounters of the following encounter types are used in counting total denominator sessions (same CPT Codes are numerator):<br/><br/>" +
          "INDIVIDUAL SESSIONS: CPTCodes 90832 OR 90834 OR 90837<br/>" +
          "CRISIS SESSIONS: CPTCodes 90839<br/>" +
          "GROUP SESSIONS: CPTCodes 90853<br/>" +
          "FAMILY SESSIONS: CPTCodes 90847 OR 90849",
          category: "EBPs Defined ..."
        },
        {
          title: "Patients Numerator",
          value: "EBPs Patient Counts<br/><br/>" + 
          "<u>Numerator</u>: The EBPs Patients numerator reflects a count of unique PCT patients with encounters documented as EBP sessions. <br/>" +
          "A documented EBP session is identified if an EBP template was used in its documentation." +
          "Patients are counted only if their encounter was from any of the following encounter types are included in counting EBP patients:<br/><br/>" +
          "INDIVIDUAL SESSIONS: CPTCodes 90832 OR 90834 OR 90837<br/>" +
          "CRISIS SESSIONS: CPTCodes 90839<br/>" +
          "GROUP SESSIONS: CPTCodes 90853<br/>" +
          "FAMILY SESSIONS: CPTCodes 90847 OR 90849",
          category: "EBPs Defined ..."
        },
        {
          title: "Patients Denominator",
          value: "EBPs Patients Total Counts<br/><br/>" + 
          "<u>Denominator</u>: The EBPs Patients denominator reflects a count of total unique PCT patients whether their sessions were documented as EBP sessions or not. <br/>" +
          "Patients are counted only if their encounter was from any the following encounter types are used in counting total denominator sessions (same CPT Codes are numerator):<br/><br/>" +
          "INDIVIDUAL SESSIONS: CPTCodes 90832 OR 90834 OR 90837<br/>" +
          "CRISIS SESSIONS: CPTCodes 90839<br/>" +
          "GROUP SESSIONS: CPTCodes 90853<br/>" +
          "FAMILY SESSIONS: CPTCodes 90847 OR 90849",
          category: "EBPs Defined ..."
        }
      ],
      PEorCPT: [
        {
          title: "Session Counts: Numerator",
          value: "PE or CPT Session Counts<br/><br/>" + 
          "<u>Numerator</u>: The PE or CPT Session numerator reflects a count of PCT encounters documented as EBP sessions, and" +
          "those EBP sessions must ALSO be designated as either PE (Prolonged Exposure) or CPT (Cogntive Processing Therapy)<br/>" +
          "A documented EBP session is identified if an EBP template was used in its documentation, and a PE or CPT Health Factor denoting the treatment type was detected." +
          "Only encounters of the following encounter types are used in counting EBP PE/CPT sessions:<br/><br/>" +
          "INDIVIDUAL SESSIONS: CPTCodes 90832 OR 90834 OR 90837<br/>" +
          "CRISIS SESSIONS: CPTCodes 90839<br/>" +
          "GROUP SESSIONS: CPTCodes 90853<br/>" +
          "FAMILY SESSIONS: CPTCodes 90847 OR 90849",
          category: "PEorCPT"
        },
        {
          title: "Session Counts: Denominator",
          value: "PE or CPT Session Counts<br/><br/>" + 
          "<u>Denominator</u>: The PE or CPT Session denominator reflects a count of all PCT encounters documented as EBP sessions." +
          "A documented EBP session is identified if an EBP template was used in its documentation.<br/>" +
          "<b>NOTE</b>: This denominator of all PCT encounters documented as EBP sessions (no matter the EBP treatment type) is the same denominator as above for total EBPs Sessions denominator.<br/>" +
          "Only encounters of the following encounter types are used in counting the total EBP sessions denominator:<br/><br/>" +
          "INDIVIDUAL SESSIONS: CPTCodes 90832 OR 90834 OR 90837<br/>" +
          "CRISIS SESSIONS: CPTCodes 90839<br/>" +
          "GROUP SESSIONS: CPTCodes 90853<br/>" +
          "FAMILY SESSIONS: CPTCodes 90847 OR 90849",
          category: "PEorCPT"
        },
        {
          title: "Patient Counts: Numerator",
          value: "PE or CPT Patient Counts<br/><br/>" + 
          "<u>Numerator</u>: The PE or CPT Patients numerator reflects a count of unique PCT patients with encounters documented as EBP sessions. <br/>" +
          ", and those EBP sessions must ALSO be designated as either PE (Prolonged Exposure) or CPT (Cogntive Processing Therapy)<br/>" +
          "A documented EBP session is identified if an EBP template was used in its documentation, and a PE or CPT Health Factor denoting the treatment type was detected." +
          "Only encounters of the following encounter types are used in counting EBP PE/CPT patients:<br/><br/>" +
          "INDIVIDUAL SESSIONS: CPTCodes 90832 OR 90834 OR 90837<br/>" +
          "CRISIS SESSIONS: CPTCodes 90839<br/>" +
          "GROUP SESSIONS: CPTCodes 90853<br/>" +
          "FAMILY SESSIONS: CPTCodes 90847 OR 90849",
          category: "PEorCPT"
        },
        {
          title: "Patients Denominator",
          value: "EBPs Patients Total Counts<br/><br/>" + 
          "<u>Denominator</u>: The PE or CPT Patients denominator reflects a count of all PCT patient with EBP documented sessions." +
          "A documented EBP session is identified if an EBP template was used in its documentation.<br/>" +
          "<b>NOTE</b>: This denominator of all PCT patients with documented EBP sessions (no matter the EBP treatment type - PE, CPT or other) is the same denominator as above for total PE CPT Sessions denominator.<br/>" +
          "Only encounters of the following encounter types are used in counting the total EBP sessions denominator:<br/><br/>" +
          "INDIVIDUAL SESSIONS: CPTCodes 90832 OR 90834 OR 90837<br/>" +
          "CRISIS SESSIONS: CPTCodes 90839<br/>" +
          "GROUP SESSIONS: CPTCodes 90853<br/>" +
          "FAMILY SESSIONS: CPTCodes 90847 OR 90849",
          category: "PEorCPT"
        }

      ],
      IndividualAndGroupTxEBPs: [
        {
          title: "Individual Sessions",
          value: "Individual Tx Session Counts<br/><br/>" + 
          "<u><b>Numerator</b></u>: The Individual Tx Session numerator reflects a count of PCT encounters documented as EBP sessions. <br/>" +
          "A documented EBP session is identified if an EBP template was used in its documentation." +
          "Only encounters of the following encounter types are used in counting EBP Individual Tx sessions:<br/><br/>" +
          "INDIVIDUAL SESSIONS: CPTCodes 90832 OR 90834 OR 90837<br/>" +
          "CRISIS SESSIONS: CPTCodes 90839<br/><br/>" +
          "<u><b>Denominator</b></u>: The EBPs Session denominator reflects a count of total PCT encounters whether documented as EBP sessions or not. <br/>" +
          "Only encounters of the following encounter types are used in counting total denominator sessions (same CPT Codes are numerator):<br/><br/>" +
          "INDIVIDUAL SESSIONS: CPTCodes 90832 OR 90834 OR 90837<br/>" +
          "CRISIS SESSIONS: CPTCodes 90839<br/>",
          category: "Individual & Group Tx EBPs Defined ..."
        },
         {
          title: "Individual Patients",
          value: "Individual Tx EBPs Patient Counts<br/><br/>" + 
          "<u><b>Numerator</b></u>: The EBPs Individual Tx Patients numerator reflects a count of unique PCT patients with encounters documented as EBP sessions. <br/>" +
          "A documented EBP session is identified if an EBP template was used in its documentation." +
          "Patients are counted only if their encounter was from any of the following encounter types are included in counting EBP patients:<br/><br/>" +
          "INDIVIDUAL SESSIONS: CPTCodes 90832 OR 90834 OR 90837<br/>" +
          "CRISIS SESSIONS: CPTCodes 90839<br/><br/>" +
          "<u><b>Denominator</b></u>: The EBPs Patients denominator reflects a count of total unique PCT patients whether their sessions were documented as EBP sessions or not. <br/>" +
          "Patients are counted only if their encounter was from any the following encounter types are used in counting total denominator sessions (same CPT Codes are numerator):<br/><br/>" +
          "INDIVIDUAL SESSIONS: CPTCodes 90832 OR 90834 OR 90837<br/>" +
          "CRISIS SESSIONS: CPTCodes 90839<br/>",
          category: "Individual & Group Tx EBPs Defined ..."
        },
        {
          title: "Group Sessions",
          value: "Group Tx Session Counts<br/><br/>" + 
          "<u><b>Numerator</b></u>: The Individual Tx Session numerator reflects a count of PCT encounters documented as EBP sessions. <br/>" +
          "A documented EBP session is identified if an EBP template was used in its documentation." +
          "Only encounters of the following encounter types are used in counting EBP Individual Tx sessions:<br/><br/>" +
          "GROUP SESSIONS: CPTCodes 90853<br/><br/>" +
          "<u><b>Denominator</b></u>: The EBPs Session denominator reflects a count of total PCT encounters whether documented as EBP sessions or not. <br/>" +
          "Only encounters of the following encounter types are used in counting total denominator sessions (same CPT Codes are numerator):<br/><br/>" +
          "GROUP SESSIONS: CPTCodes 90853<br/>",
          category: "Individual & Group Tx EBPs Defined ..."
        },
         {
          title: "Group Patients",
          value: "Group Tx EBPs Patient Counts<br/><br/>" + 
          "<u><b>Numerator</b></u>: The EBPs Individual Tx Patients numerator reflects a count of unique PCT patients with encounters documented as EBP sessions. <br/>" +
          "A documented EBP session is identified if an EBP template was used in its documentation." +
          "Patients are counted only if their encounter was from any of the following encounter types are included in counting EBP patients:<br/><br/>" +
          "GROUP SESSIONS: CPTCodes 90853<br/><br/>" +
          "<u><b>Denominator</b></u>: The EBPs Patients denominator reflects a count of total unique PCT patients whether their sessions were documented as EBP sessions or not. <br/>" +
          "Patients are counted only if their encounter was from any the following encounter types are used in counting total denominator sessions (same CPT Codes are numerator):<br/><br/>" +
          "GROUP SESSIONS: CPTCodes 90853<br/>",
          category: "Individual & Group Tx EBPs Defined ..."
        },
      ],
      ebpActivitySummary: [
        {
          title: "EBP Patient Counts Table (left)",
          value: "These are a list of the number of unique patients administered EBPs by EBP Types at each institution of a medical center site.<br/><br/>" +
          "",
          category: "EBP Activity Summary Defined ..."
        },
        {
          title: "EBP Types Pie Chart (right)",
          value: "The EBP Types Pie Chart displays the relative proportions, with counts, of the EBP types administerd at the selected medical center site.<br/>",
          category: "EBP Activity Summary Defined ..."
        }
      ],
      ProvidersEBPsAndSurveysByClinicAndPatient: [
        {
          title: "Provider's EBPs and Surveys By Clinic and Patient Table",
          value: "The Provider's EBPs and Surveys By Clinic and Patient Table displays patient level EBP sessions and any administered surveys for each patient by provider at each institution of the selected medical center site. <br/><br/>" + 
          "The association of EBP sesions and same day survey administration represents a Measurement Based Care proxy measure, showing the use of data in the context of EBPs. <br/><br/>" +
          "<u><b>EBP Sessions</b></u>: Each provider's EBP sessions are shown including the patient initials and last 4, EBP type, and session date<br/><br/>" +
          "<u><b>Surveys Administered</b></u>: Any surveys administered on the same day as the EBP session are listed next to the patient/session information.  Survey name, score, and date of administration are listed.",
          category: "Provider's EBPs By Clinic and Patient Defined ..."
        }
      ]
    }
  },
  
  computed: {
    ...mapState(['selectedSite', 'phipii',
      'selectedInstitutions', 'selectedInstitutionsNames'
    ]), //siteALLSessions

    ...mapGetters([
      'siteEBPSessionsAny',
      'siteALLSessions',

      'siteEBPPatientsAny',
      'siteALLPatients', // inconsistent with Encounter therapy sum
      'siteEncounterPatientTotal', // pull from Encounters

      'siteEncounterCPTPatientsEither', // from Encounter to sync #s

      'siteEBPSessionsPECPT',
      // 'siteALLSessions',

      'siteEBPPatientsPECPT',
      // 'siteALLPatients',

      'siteEBPSessionsInd',
      'siteALLSessionsInd',

      'siteEBPPatientsInd',
      'siteALLPatientsInd',

      'siteEBPSessionsGrp',
      'siteALLSessionsGrp',

      'siteEBPPatientsGrp',
      'siteALLPatientsGrp',

      // 'siteEBPClinics',
      // 'siteEBPClinicsAll',
      // 'siteEBPClinicsCPT',
      // 'siteEBPClinicsPEI',
      // 'siteEBPProviders',
      // 'siteEBPProvidersAll',
      // 'siteEBPProvidersCPT',
      // 'siteEBPProvidersPEI',
      // 'siteEBPPatients',
      // 'siteEBPPatientsAll',
      // 'siteEBPPatientsCPT',
      // 'siteEBPPatientsPEI',
      // 'siteEBPClinicSummary',
      'siteEBPPieChartSeries',
      'siteEBPDetailsTypes',
      'siteEBPDetailsSessionsSurveys',

      // 'siteEBPPatientsCPTIndividualOnly',
      // 'siteEBPPatientsCPTGroupOnly',
      // 'siteEBPPatientsCPTBoth',

    ]),
    
    changeBackgroundColor () {
        // console.log('in changeBackgroundColor siteProviderSelected is: ', this.siteProviderSelected)
        // console.log('in changeBackgroundColor selectedInstitutions is: ', this.selectedInstitutions)
        // return this.siteProviderSelected || this.selectedInstitutions.length > 0 || false
        return this.selectedInstitutions.length > 0 || false
    },      
    scrollPosition () {
      console.log('window.pageYOffset: ', window.pageYOffset)    
    },

    siteEBPSessionsAnyPercent () {
      return Math.round((this.siteEBPSessionsAny/this.siteALLSessions) * 100)
      // return precise_round((this.siteEBPSessionsAny/this.siteALLSessions) * 100, 1) 
    },
    siteEBPPatientsAnyPercent () {
      return Math.round((this.siteEBPPatientsAny/this.siteALLPatients) * 100)
    },

    siteEBPSessionsPECPTPercent () {
      return Math.round((this.siteEBPSessionsPECPT/this.siteALLSessions) * 100)
      // return precise_round((this.siteEBPSessionsPECPT/this.siteALLSessions) * 100, 1) 
    },
    siteEBPPatientsPECPTPercent () {
      return Math.round((this.siteEBPPatientsPECPT/this.siteALLPatients) * 100)
    },

    siteEBPSessionsIndPercent () {
      return Math.round((this.siteEBPSessionsInd/this.siteALLSessionsInd) * 100)
    },
    siteEBPPatientsIndPercent () {
      return Math.round((this.siteEBPPatientsInd/this.siteALLPatientsInd) * 100)
    },

    siteEBPSessionsGrpPercent () {
      return Math.round((this.siteEBPSessionsGrp/this.siteALLSessionsGrp) * 100)
    },
    siteEBPPatientsGrpPercent () {
      return Math.round((this.siteEBPPatientsGrp/this.siteALLPatientsGrp) * 100)
    },


    // siteEBPClinicsPercent () {
    //   return Math.round((this.siteEBPClinics/this.siteEBPClinicsAll) * 100)
    // },
    // siteEBPClinicsCPTPercent () {
    //   return Math.round((this.siteEBPClinicsCPT/this.siteEBPClinicsAll) * 100)
    // },
    // siteEBPClinicsPEIPercent () {
    //   return Math.round((this.siteEBPClinicsPEI/this.siteEBPClinicsAll) * 100)
    // },

    siteEBPProvidersPercent () {
      return Math.round((this.siteEBPProviders/this.siteEBPProvidersAll) * 100)
    },
    siteEBPProvidersCPTPercent () {
      return Math.round((this.siteEBPProvidersCPT/this.siteEBPProvidersAll) * 100)
    },
    siteEBPProvidersPEIPercent () {
      return Math.round((this.siteEBPProvidersPEI/this.siteEBPProvidersAll) * 100)
    },
   
    // siteEBPPatientsPercent () {
    //   return Math.round((this.siteEBPPatients/this.siteEBPPatientsAll) * 100)
    // },
    // siteEBPPatientsCPTPercent () {
    //   return Math.round((this.siteEBPPatientsCPT/this.siteEBPPatientsAll) * 100)
    // },
    // siteEBPPatientsPEIPercent () {
    //   return Math.round((this.siteEBPPatientsPEI/this.siteEBPPatientsAll) * 100)
    // },

    // siteEBPPatientsIndOnlyPercent () {
    //   return Math.round((this.siteEBPPatientsCPTIndividualOnly/this.siteEncounterCPTPatientsEither) * 100)
    // },
    // siteEBPPatientsGrpOnlyPercent () {
    //   return Math.round((this.siteEBPPatientsCPTGroupOnly/this.siteEncounterCPTPatientsEither) * 100)
    // },
    // siteEBPPatientsBothPercent () {
    //   return Math.round((this.siteEBPPatientsCPTBoth/this.siteEncounterCPTPatientsEither) * 100)
    // },

    rowData () { return this.siteEBPDetailsTypes  },
    // rowData1 () { return this.siteEBPClinicSummary },
    rowData1 () { return this.siteEBPDetailsSessionsSurveys },


    pieChartOptions (vm) {
      return {
        chart:      { type: "pie", 
                      options3d: { enabled: true, alpha: 45 }},
        title:      { text: 'EBP Types' },
        subtitle:   { text: 'Hover over sections for EBP Type data' },
        credits:    { enabled: false },
        plotOptions: { pie: { innerSize: 100, depth: 45 },
                       series: { allowPointSelect: true }},
        series: [
          {
            name: "ebp types",
            point:{
              events:{
                  click: function (event) {
                    // pull status name of pie slice clicked
                    let pieSliceClicked = this.name
                    // send pie slice status name to handler
                    vm.pieClickHandler(pieSliceClicked)

                  }
              }
            },
            data: this.siteEBPPieChartSeries,
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
  },
  beforeMount() {
    this.columnDefs = this.createColDefs(),
    this.columnDefs1 = this.createColDefs1(),

    this.onFilterChanged = function() {console.log('filter changed!!')}

    this.gridOptions = {
      suppressPropertyNamesCheck: true
    },

    this.gridOptions1 = {  
      // groupHideOpenParents: true, 
      autoGroupColumnDef: {
        headerName: 'Site / Staff / Clinic / Patient',
        field: 'LocationName',
        // field: 'InstitutionName'
      },
      suppressPropertyNamesCheck: true
      // floatingFilter: true
      // groupMultiAutoColumn:true,
    }
  },
   mounted() {
    this.EBP_SUMMARY()
    this.EBP_DETAILS()
    this.EBP_PIE_CHART()
    this.EBP_DETAILS_TYPES()
    this.EBP_DETAILS_SESSIONS_SURVEYS()

    // this.CURRRENT_PAGE('ebp')

    this.GET_INSTITUTIONS()
  },
  methods: {
   ...mapActions([
      'EBP_SUMMARY',
      'EBP_DETAILS',
      'EBP_PIE_CHART',
      'EBP_DETAILS_TYPES',
      'EBP_DETAILS_SESSIONS_SURVEYS',

      'CURRENT_PAGE',
      'GET_INSTITUTIONS',

    ]),
    addCommas,
    onGridReady() {
      this.gridOptions.api.sizeColumnsToFit();
    },
    onGridReady1() {
      this.gridOptions1.api.sizeColumnsToFit();
    },
    createColDefs() {
      return [
        {headerName: "EBPs",
          children: [
            { headerName: "Site", 
              field: "StaPa", 
              width: 30, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agTextColumnFilter",
              // checkboxSelection: true,
            },
            { headerName: "Institution", 
              field: "InstitutionName", 
              width: 70, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agTextColumnFilter",
            },
            { headerName: "EBP Name", 
              field: "HealthFactorCategoryShort", 
              width: 50, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agTextColumnFilter"
            },
            { headerName: "Patients", 
              field: "numPatients", 
              width: 50, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agNumberColumnFilter"
            },
          ]
        }
      ]
    },
    createColDefs1() { //experimental
      return [
        { headerName: "Patients", 
          // field: "InitialsAndL4", 
          field: "InitialsAndL4", 
          width: 80, 
          cellStyle: { 'text-align': "left" } ,
          filter: "agTextColumnFilter"
        },
        { headerName: "Institution", 
          field: "InstitutionName", 
          width: 120, 
          cellStyle: { 'text-align': "left" } ,
          filter: "agTextColumnFilter",
          rowGroup: true,
          hide:true,
        },
        // { headerName: "Clinic Name", 
        //   field: "LocationName", 
        //   width: 150, 
        //   cellStyle: { 'text-align': "left" } ,
        //   filter: "agTextColumnFilter",
        // },
        { headerName: "EBP", 
          field: "HealthFactorCategoryShort", 
          width: 80, 
          cellStyle: { 'text-align': "left" } ,
          filter: "agTextColumnFilter"
        },
        { headerName: "Session#", 
          field: "SessionNumberValue", 
          width: 80, 
          cellStyle: { 'text-align': "left" } ,
          filter: "agTextColumnFilter"
        },
        { headerName: "Visit DateTime", 
          field: "VisitDateTime", 
          width: 120, 
          cellStyle: { 'text-align': "left" } ,
          filter: "agDateColumnFilter"
          // suppressFilter: true,
        },
        { headerName: "PCL-5", 
          field: "SurveyName", 
          width: 70, 
          cellStyle: { 'text-align': "left" } ,
          filter: "agTextColumnFilter"
        },
        { headerName: "Score", 
          field: "RawScore", 
          width: 70, 
          cellStyle: { 'text-align': "left" } ,
          filter: "agTextColumnFilter"
        },
        { headerName: "Survey DateTime", 
          field: "SurveyGivenDateTime", 
          width: 120, 
          cellStyle: { 'text-align': "left" } ,
          filter: "agDateColumnFilter"
          // suppressFilter: true,
        },
        { headerName: "Provider", 
          field: "STAFFNAME", 
          width: 150, 
          cellStyle: { 'text-align': "left" } ,
          filter: "agTextColumnFilter",
          rowGroup: true,
          hide:true
        },
      ]
    },
    onCellClicked(event) {
      let clickedCellFieldName = event.colDef.field
      let clickedCellDataSimple =  event.value
      let clickedCellDataWithFieldReference =  event.node.data[clickedCellFieldName]
      let clickedCellRowIndex = event.rowIndex
      let clickedCellNode = event.node

      console.log('onCellClicked node.data is ****: ', event.node.data)
    },
    // onRowDataChanged() {
    //   console.log('row data changed!!')
    //   Vue.nextTick(() => {
    //     this.gridOptions.api.sizeColumnsToFit();
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

  .phipii-warning {
    font-size: 1rem;
  }


  hr.style1 {
    border-top: 3px double #8c8b8b;
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
