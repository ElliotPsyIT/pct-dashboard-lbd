<template>
  <transition name="fade" mode="out-in">
    <div class="content" :key="selectedSite">
      <div class="container-fluid">
        
          <!-- Section Header -->
        <div class="row d-flex justify-content-center ">
          <h4 class="section-head">Provider, Clinic, Patient Stats</h4>
        </div>

        <div class="row d-flex justify-content-center">
          
          <div class="col-xl-3 col-md-4">
            <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-chart text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Total Providers</p>
              <h4 class="card-title">{{ siteProviderProviderCount }}</h4>
            </div>
            </stats-card>
          </div>

          <div class="col-xl-3 col-md-4">
            <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-chart text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Total Clinics</p>
              <h4 class="card-title">{{ siteProviderClinicCount }}</h4>
            </div>
            </stats-card>
          </div>

          <div class="col-xl-3 col-md-4">
            <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-chart text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Total Patients</p>
              <h4 class="card-title">{{ siteProviderPatientCount }}</h4>
            </div>
            </stats-card>
          </div>

        </div>

        <!-- Section Header -->
        <div class="row d-flex justify-content-center ">
          <h4 class="section-head">Provider Summary</h4>
        </div>

        <div class="row justify-content-center">
          
          <div class="col-md-10 ">
            <card>
              <template slot="header">
                <span>Hover Over Column Header to View Menu</span>
              </template>
                <ag-grid-vue style="font-size: 12px; height: 500px" class="ag-theme-balham grid" 
                :gridOptions="gridOptions3" 
                :columnDefs="columnDefs3"
                :rowData="rowData3" 
                :rowDataChanged="onRowDataChanged3"
                :enableFilter="true"
                :enableSorting="true"
                :enableColResize="true"
                :onFilterChanged="onFilterChanged"
                :animateRows="true"
                >
                </ag-grid-vue>
              <template slot="footer">
                <div class="legend">
                  Detailed Encounter Listing
                </div>
              </template>
            </card>
          </div>

        </div> <!-- End Row -->

  <!-- Section Header -->
        <div class="row d-flex justify-content-center ">
          <h4 class="section-head">Provider Encounters By Clinic</h4>
        </div>

        <div class="row justify-content-center">
          <div class="col-md-10">
            <card>
              <template slot="header">
                <!-- <span>Click On Arrow <span class="nc-icon">></span> Below to Drill Down</span> -->
                <button @click="gridOptions1.api.collapseAll()" >Collapse All</button>
                <button @click="gridOptions1.api.expandAll()" >Expand All</button>
              </template>
              <ag-grid-vue style="font-size: 12px; height: 500px" class="ag-theme-balham grid" 
              :gridOptions="gridOptions1" 
              :columnDefs="columnDefs1"
              :rowData="rowData1" 
              :rowDataChanged="onRowDataChanged1"
              :enableFilter="true"
              :enableSorting="true"
              :enableColResize="true"
              :animateRows="true"
              >
              </ag-grid-vue>
              <template slot="footer">
                <div class="legend">
                  Provider Encounters
                </div>
              </template>
            </card>
          </div>

        </div> <!-- End Row -->
  
        <!-- Section Header -->
        <div class="row d-flex justify-content-center ">
          <h4 class="section-head">Providers' Patients and Sessions</h4>
        </div>

        <div class="row justify-content-center">
          <div class="col-md-10">
            <card>
              <template slot="header">
                <!-- <span>Click On Arrow <span class="nc-icon">></span> Below to Drill Down</span> -->
                <button @click="gridOptions2.api.collapseAll()" >Collapse All</button>
                <button @click="gridOptions2.api.expandAll()" >Expand All</button>
              </template>
                <ag-grid-vue style="font-size: 12px; height: 500px" class="ag-theme-balham grid" 
                :gridOptions="gridOptions2" 
                :columnDefs="columnDefs2"
                :rowData="rowData2" 
                :rowDataChanged="onRowDataChanged2"
                :enableFilter="true"
                :enableSorting="true"
                :enableColResize="true"
                :animateRows="true"
                >
                </ag-grid-vue>
              <template slot="footer">
                <div class="legend">
                  Providers' Patient Sessions
                </div>
              </template>
            </card>
          </div>

        </div>

      </div> <!-- End container-fluid -->
    </div> <!-- End content -->
  </transition>
</template>
<script>
import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
import Card from 'src/components/UIComponents/Cards/Card.vue'

import Vue from "vue";
import { AgGridVue } from "ag-grid-vue";

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'providers',
  components: {
    Card,
    StatsCard,
    AgGridVue
  },
  computed: {
    ...mapState([
      'selectedSite', 'selectedRange'
    ]),
    ...mapGetters([
      'siteEncounterProviderDetails',
      'siteProviderDetailsCPT',
      'siteProviderInfo',
      'siteProviderClinicSummary',
      'siteProviderPatientDetailCPT',
      'siteProviderProviderCount',
      'siteProviderClinicCount',
      'siteProviderPatientCount'
    ]),
    rowData1 () { return this.siteProviderClinicSummary },
    rowData2 () { return this.siteProviderPatientDetailCPT },
    rowData3 () { return this.siteProviderInfo },
  },
  beforeMount() {
    this.columnDefs1 = this.createColDefs1(),
    this.columnDefs2 = this.createColDefs2(),
    this.columnDefs3 = this.createColDefs3(),

    this.onFilterChanged = function() {console.log('filter changed!!')}

    this.gridOptions1 = {  
      // groupHideOpenParents: true, 
      autoGroupColumnDef: {
        headerName: 'Staff / Site',
        field: 'LocationName',
        // field: 'InstitutionName'
      },
      // groupMultiAutoColumn:true,
    },
    this.gridOptions2 = {
      // groupHideOpenParents: true, 
      autoGroupColumnDef: {
        field: 'InitialsAndL4',
        // field: 'LocationName'
        
      },
      // groupMultiAutoColumn:true,
      // groupSuppressAutoColumn: true
    },
    this.gridOptions3 = { }
  },
  methods: {
    
    createColDefs1() { //experimental
    return [
        { headerName: "Provider (# Sessions Total)", 
          field: "STAFFNAME", 
          width: 150, 
          cellStyle: { 'text-align': "left" } ,
          filter: "agTextColumnFilter",
          rowGroup: true,
          // hide:true
        },
        { headerName: "Institution (# Sessions)", 
          field: "InstitutionName", 
          width: 200, 
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
        { headerName: "Sessions", 
          field: "EncountersByProvider", 
          width: 80, 
          cellStyle: { 'text-align': "left" } ,
          filter: "agNumberColumnFilter"
        },
        { headerName: "Patients", 
          field: "numPatients", 
          width: 80, 
          cellStyle: { 'text-align': "left" } ,
          filter: "agNumberColumnFilter"
        },
      ]
    },
    createColDefs2() {
      return [ 
        {
          headerName: "Staff Name (# Sessions)",  
          field: "StaffName", 
          cellStyle: { 'text-align': "left" } ,
          filter: "agTextColumnFilter",
          rowGroup: true,
          // hide:true,
        },
        { headerName: "Institution", 
          field: "InstitutionName", 
          width: 200, 
          cellStyle: { 'text-align': "left" } ,
          filter: "agTextColumnFilter",
          rowGroup: true,
          hide:true,
        },
        { headerName: "Clinic (# Sessions)", 
          field: "LocationName", 
          width: 100, 
          cellStyle: { 'text-align': "left" } ,
          filter: "agTextColumnFilter",
          rowGroup: true,
          hide:true,
        },
        // { headerName: "Patient", 
        //   field: "InitialsAndL4", 
        //   width: 100, 
        //   cellStyle: { 'text-align': "left" } ,
        //   filter: "agTextColumnFilter",
        // },
        { headerName: "CPT Name", 
          field: "CPTName", 
          width: 150, 
          cellStyle: { 'text-align': "left" } ,
          filter: "agTextColumnFilter"
        },
        // { headerName: "Clinic Sessions", 
        //   field: "EncountersByProvider", 
        //   width: 100, 
        //   cellStyle: { 'text-align': "left" } ,
        //   filter: "agNumberColumnFilter"
        // },
        { headerName: "Date", 
          field: "VisitDateTime", 
          width: 150, 
          cellStyle: { 'text-align': "left" } ,
          filter: "agDateColumnFilter"
        },
      ]
    },
    createColDefs3() {
      return [
        {headerName: "Provider Information",
          children: [
            { headerName: "Site", 
              field: "StaPa", 
              width: 20, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agTextColumnFilter"
            },
            { headerName: "Staff Name", 
              field: "STAFFNAME", 
              width: 50, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agTextColumnFilter"
            },
            { headerName: "Institution", 
              field: "InstitutionName", 
              width: 50, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agTextColumnFilter"
            },
            { headerName: "Clinics", 
              field: "numLocations", 
              width: 20, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agTextColumnFilter"
            },
            { headerName: "Visits", 
              field: "numEncounters", 
              width: 20, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agNumberColumnFilter"
            },
            { headerName: "Patients", 
              field: "numPatients", 
              width: 20, 
              cellStyle: { 'text-align': "left" } ,
              filter: "agNumberColumnFilter"
            },
          ]
        }
      ]
    },
    onRowDataChanged1() {
      console.log('row1 data changed!!')
      
      Vue.nextTick(() => {
        this.gridOptions1.api.sizeColumnsToFit();
        this.gridOptions1.api.expandAll();
      });
    },
    onRowDataChanged2() {
      console.log('row2 data changed!!')
      Vue.nextTick(() => {
        this.gridOptions2.api.sizeColumnsToFit()
        this.gridOptions2.api.expandAll();
      });
    },
    onRowDataChanged3() {
      console.log('row3 data changed!!')
      Vue.nextTick(() => {
        this.gridOptions3.api.sizeColumnsToFit();
      });
    }
  },
}

</script>
<style>
  .section-head {
    font-size: 2rem;
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
