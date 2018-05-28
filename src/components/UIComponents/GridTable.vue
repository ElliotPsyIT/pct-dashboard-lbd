<template>
  <div>
    <div class="text-center mb-4">
      <span>Consult Details</span>
    <div></div>
    </div>
    <div>
      <ag-grid-vue style="font-size: 12px" class="ag-theme-fresh grid" :gridOptions="gridOptions" :rowData="rowData" :rowDataChanged="onRowDataChanged">
      </ag-grid-vue>
   </div>
  </div>
</template>
<script>
import Vue from "vue";
import { AgGridVue } from "ag-grid-vue";
import 'whatwg-fetch'

export default {
  name: 'pct-grid',
  data() {
    return {
      gridOptions: null,
      rowData: null
    }
  },
  components: {
    AgGridVue
  },
  methods: {
    loadRowData() {
      fetch('/static/consults.json')
        .then((response) => {
          return response.json()
        })
        .then((json) => {
          this.rowData = json;
          console.log('this store: ', this.$store)
        });
    },
    createColDefs() {
      return [
        { headerName: "Sta3n", field: "Sta3n", width: 30, cellStyle: { 'text-align': "left" } }, // , width: 225, suppressSizeToFit: true
        { headerName: "StaPa", field: "StaPa", width: 40, cellStyle: { 'text-align': "left" } },
        { headerName: "Site Name", field: "StaPaName", width: 100, cellStyle: { 'text-align': "left" } },
        { headerName: "Request Date", field: "RequestDateTime", width: 75, cellStyle: { 'text-align': "left" } },
        { headerName: "Request To", field: "ToRequestServiceName",width: 125, cellStyle: { 'text-align': "left" } },
        { headerName: "Order Status", field: "OrderStatus",width: 70, cellStyle: { 'text-align': "left" } },
        { headerName: "D/C", field: "CONSULTFACTORTYPE",width: 25, cellStyle: { 'text-align': "left" } },
        { headerName: "D/C Comment", field: "CONSULTFACTORTEXT",width: 70, cellStyle: { 'text-align': "left" }, tooltipField: "CONSULTFACTORTEXT" },

      ];
    },
    onRowDataChanged() {
      Vue.nextTick(() => {
        this.gridOptions.api.sizeColumnsToFit();
      }
      );
    }
  },
  created() {
    this.gridOptions = {};
    this.gridOptions.columnDefs = this.createColDefs();
    this.loadRowData();
  }
}
</script>
<style scoped>
  .grid {
    height: 500px
  }
</style>