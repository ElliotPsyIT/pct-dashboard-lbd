<template>
  <ag-grid-vue class="ag-theme-fresh grid" :gridOptions="gridOptions" :rowData="rowData" :rowDataChanged="onRowDataChanged">
  </ag-grid-vue>
</template>
<script>
import Vue from "vue";
import { AgGridVue } from "ag-grid-vue";

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
      fetch('/static/munros.json')
        .then((response) => {
          return response.json()
        })
        .then((json) => {
          this.rowData = json;
        });
    },
    createColDefs() {
      return [
        { headerName: "Hill Name", field: "hillname", width: 225, suppressSizeToFit: true },
        { headerName: "Grid Reference", field: "gr6" },
        { headerName: "Height (m)", field: "height" },
        { headerName: "Latitude", field: "latitude" },
        { headerName: "Longitude", field: "longitude" },
        { headerName: "Climbed?", field: "climbed" }
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
  height: 255px;
}
</style>