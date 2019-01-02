<template>
  <transition name="fade" mode="out-in">
    <div class="content" :key="selectedSite">
      <div class="container-fluid">

       <!-- Section Headers -->
        <div class="row d-flex justify-content-center ">
          <h4 class="section-head">Total EBPs</h4>
        </div>

      <div class="row d-flex justify-content-center ">
        <div class="col-xl-3 col-md-2">
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
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
                <i class="nc-icon nc-chart text-warning"></i>
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
          <h4 class="section-head">Total PE or CPT</h4>
        </div>

      <div class="row d-flex justify-content-center ">
        <div class="col-xl-3 col-md-2">
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
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
                <i class="nc-icon nc-chart text-warning"></i>
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
      
             <!-- Section Headers -->
        <div class="row d-flex justify-content-around">
          <h4 class="section-head" >Individual Tx EBPs</h4>
          <h4 class="section-head" >Group Tx EBPs</h4>
        </div>

      <div class="row d-flex justify-content-center ">

        <div class="col-xl-3 col-md-2">
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
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
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category" v-tooltip.top-center="IndividualTxEBPPatients">Patients ({{siteEBPPatientsIndPercent}}/{{addCommas(siteALLPatientsInd)}})</p>
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
                <i class="nc-icon nc-chart text-warning"></i>
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
                <i class="nc-icon nc-chart text-warning"></i>
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

        <div class="row d-flex justify-content-center">

          <div class="col-xl-3 col-md-2">
            <h4 class="section-head d-flex justify-content-center"> Individual Only </h4>
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category"  v-tooltip.top-center="IndTherapyOnly">Ind Therapy Only ({{siteEBPPatientsCPTIndividualOnly}}/{{addCommas(siteALLPatients)}})</p>
                <h4 class="card-title">{{siteEBPPatientsIndOnlyPercent}}%</h4>
              </div>
            </stats-card>

          </div>

          <div class="col-xl-3 col-md-2">
            <h4 class="section-head d-flex justify-content-center"> Group Only</h4>
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category" v-tooltip.top-center="GroupTherapyOnly">Grp Therapy Only ({{siteEBPPatientsCPTGroupOnly}}/{{addCommas(siteALLPatients)}})</p>
                <h4 class="card-title">{{siteEBPPatientsGrpOnlyPercent}}%</h4>
              </div>
            </stats-card>

          </div>

          <div class="col-xl-3 col-md-2">
            <h4 class="section-head d-flex justify-content-center"> Both </h4>
            <stats-card>
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-chart text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category" v-tooltip.top-center="BothIndGroupTherapy">Both Ind & Grp Tx({{siteEBPPatientsCPTBoth}}/{{addCommas(siteALLPatients)}})</p>
                <h4 class="card-title">{{siteEBPPatientsBothPercent}}%</h4>
              </div>
            </stats-card>

          </div>
  
        </div>

  <hr class="style1"/>

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
        </div>

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

        <div class="row">

          <div class="col-md-6" >

            <br/>
            <card>
              <!-- <template slot="header">
                <button @click="getSelectedRows()"> Get Selected Rows</button>
              </template> -->
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
          <h4 class="section-head">Providers' EBPs By Clinic and Patient</h4>
        </div>

        <div class="row justify-content-center">
          <div class="col-md-12">
            <card>
              <template slot="header">
                <button @click="gridOptions1.api.collapseAll()" >Collapse All</button>
                <button @click="gridOptions1.api.expandAll()" >Expand All</button>
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

import { mapState, mapGetters } from 'vuex'

import { precise_round, addCommas } from 'src/utils'


export default {
  name: 'EBP',
  components: {
    StatsCard,
    Card,
    AgGridVue,
    VueHighcharts,
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
      IndTherapyOnly: 'Patients with EBP Ind Tx Sessions Only / All PCT Ind Tx Patients',
      GroupTherapyOnly: 'Patients with EBP Group Tx Sessions Only / All PCT Group Tx Patients',
      BothIndGroupTherapy: 'Patients with EBP Ind and Group Tx Sessions / All PCT Ind and Group Session Patients',
    }
  },
  computed: {
    ...mapGetters([
      'siteEBPSessionsAny',
      'siteALLSessions',

      'siteEBPPatientsAny',
      'siteALLPatients',

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

      'siteEBPClinics',
      'siteEBPClinicsAll',
      'siteEBPClinicsCPT',
      'siteEBPClinicsPEI',
      'siteEBPProviders',
      'siteEBPProvidersAll',
      'siteEBPProvidersCPT',
      'siteEBPProvidersPEI',
      'siteEBPPatients',
      'siteEBPPatientsAll',
      'siteEBPPatientsCPT',
      'siteEBPPatientsPEI',
      'siteEBPClinicSummary',
      'siteEBPClinicSessionsSurveys',
      'siteEBPPieChartSeries',
      'siteEBPDetailsTypes',

      'siteEBPPatientsCPTIndividualOnly',
      'siteEBPPatientsCPTGroupOnly',
      'siteEBPPatientsCPTBoth',

    ]),
    ...mapState(['selectedSite']), //siteALLSessions


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


    siteEBPClinicsPercent () {
      return Math.round((this.siteEBPClinics/this.siteEBPClinicsAll) * 100)
    },
    siteEBPClinicsCPTPercent () {
      return Math.round((this.siteEBPClinicsCPT/this.siteEBPClinicsAll) * 100)
    },
    siteEBPClinicsPEIPercent () {
      return Math.round((this.siteEBPClinicsPEI/this.siteEBPClinicsAll) * 100)
    },

    siteEBPProvidersPercent () {
      return Math.round((this.siteEBPProviders/this.siteEBPProvidersAll) * 100)
    },
    siteEBPProvidersCPTPercent () {
      return Math.round((this.siteEBPProvidersCPT/this.siteEBPProvidersAll) * 100)
    },
    siteEBPProvidersPEIPercent () {
      return Math.round((this.siteEBPProvidersPEI/this.siteEBPProvidersAll) * 100)
    },
   
    siteEBPPatientsPercent () {
      return Math.round((this.siteEBPPatients/this.siteEBPPatientsAll) * 100)
    },
    siteEBPPatientsCPTPercent () {
      return Math.round((this.siteEBPPatientsCPT/this.siteEBPPatientsAll) * 100)
    },
    siteEBPPatientsPEIPercent () {
      return Math.round((this.siteEBPPatientsPEI/this.siteEBPPatientsAll) * 100)
    },

    siteEBPPatientsIndOnlyPercent () {
      return Math.round((this.siteEBPPatientsCPTIndividualOnly/this.siteEBPPatientsAll) * 100)
    },
    siteEBPPatientsGrpOnlyPercent () {
      return Math.round((this.siteEBPPatientsCPTGroupOnly/this.siteEBPPatientsAll) * 100)
    },
    siteEBPPatientsBothPercent () {
      return Math.round((this.siteEBPPatientsCPTBoth/this.siteEBPPatientsAll) * 100)
    },

    rowData () { return this.siteEBPDetailsTypes  },
    // rowData1 () { return this.siteEBPClinicSummary },
    rowData1 () { return this.siteEBPClinicSessionsSurveys },


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
            data: this.siteEBPPieChartSeries 
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
  methods: {
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
        { headerName: "Survey", 
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
.section-head {
   font-size: 2rem;
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
