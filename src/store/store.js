import Vue from 'vue'
import Vuex from 'vuex'

import siteNames from '../../static/sites.json'
import dateRanges from '../../static/dateRanges.json'

import consultCounts from '../../static/consult_count.json'
import consultStatusCounts from '../../static/consult_pie_chart.json'

import consultDetails from '../../static/consult_details.json'
import consultLineChart from '../../static/consult_line_chart.json'

// import consultPieChart from '../../static/consult_pie_chart.json'
// import consultDetails from '../../static/consult_details.json'
// import consultDetailsDiscontinued from '../../static/consult_details_discontinued.json'

// import consults from '../../static/consult_details.json'
// import consultsStatuses from '../../static/consult_statuses_national.json'

Vue.use(Vuex)

const localStorage = window.localStorage

function addCommas(intNum) {
  return (intNum + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
}

function delimitNumbers(str) {
  return (str + "").replace(/\b(\d+)((\.\d+)*)\b/g, function(a, b, c) {
    return (b.charAt(0) > 0 && !(c || ".").lastIndexOf(".") ? b.replace(/(\d)(?=(\d{3})+$)/g, "$1,") : b) + c;
  });
}

const store = new Vuex.Store({
  state: {
    selectedSite: null,
    selectedRange: null,
    siteNames,
    dateRanges,
    consultCounts,
    consultStatusCounts,
    consultDetails,
    consultLineChart
  },
  getters: {
    siteConsultTotal: (state) => {
      let filteredArray = state.consultCounts
        .filter(site => site.Sta3n === state.selectedSite)
        .filter(site => site.dataType === 'consultCount')
      console.log('ConsultTotal is: ', filteredArray)
      return filteredArray[0].countTotal
    },
    sitePatientTotal: (state) => {
      let filteredArray = state.consultCounts
        .filter(site => site.Sta3n === state.selectedSite)
        .filter(site => site.dataType === 'patientCount')
      console.log('PatientTotal is: ', filteredArray)
      return filteredArray[0].countTotal
    },
    siteActiveConsultTotal: (state) =>{
      let filteredArray = state.consultStatusCounts
        .filter(site => site.Sta3n === state.selectedSite)
        .filter(site => site.ConsultStatus === 'ACTIVE')
      console.log('ActiveTotal is: ', filteredArray)
      return filteredArray[0].Num
    },
    sitePendingConsultTotal: (state) =>{
      let filteredArray = state.consultStatusCounts
        .filter(site => site.Sta3n === state.selectedSite)
        .filter(site => site.ConsultStatus === 'PENDING')
      console.log('PendingTotal is: ', filteredArray)
      return filteredArray[0].Num
    },
    sitePieChartSeries: (state) =>{
      // build series based on selected site
      console.log('consultStatusCounts is: ', state.consultStatusCounts)
      let mappedArray = state.consultStatusCounts
        .filter(site => site.Sta3n === state.selectedSite)
        .map((status) => { return [status.ConsultStatus, +status.Num] })
      console.log('pie chart series is: ', mappedArray)
      return mappedArray  
    },
    siteConsultDetails: (state) => {
      let consultDetails = state.consultDetails
        .filter(site => site.Sta3n === state.selectedSite)
      console.log('consultDetails is: ', consultDetails)
      return consultDetails
    },
    siteLineChartSeries: (state) => {
      let consultLineChartMonths = state.consultLineChart
        .filter(site => site.Sta3n === state.selectedSite)
        .map((month) => { return month.shortMonthName})
      console.log('consult line chart months: ', consultLineChartMonths)
      // return consultLineChartMonths
      let consultLineChartData = state.consultLineChart
        .filter(site => site.Sta3n === state.selectedSite)
        .map((month) => { return +month.monthConsultsTotal })
      console.log('consult line chart data: ', consultLineChartData)
      return { months: consultLineChartMonths, series: consultLineChartData }
    }
  },
  actions: {
    setSelectedSite (context, site) {
      context.commit('SET_SELECTED_SITE', site)
    },
    setSelectedRange (context, range) {
      context.commit('SET_SELECTED_RANGE', range)
    }
  },
  mutations: {
    SET_SELECTED_SITE (state, site) {
      state.selectedSite = site
    },
    SET_SELECTED_RANGE (state, range) {
      state.selectedRange = range
    },
    initialiseStore(state) {
      // Check if the ID exists
      console.log('checking for localStorage state')
			if(localStorage.getItem('store')) {
				// Replace the state object with the stored item
				this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem('store')))
        )
        // hard code 'onemonth' as initialized date range for v.1.0
        state.selectedRange = state.selectedRange || 'threemonths'
        state.selectedSite = state.selectedSite || '512'
        console.log('initialiseStore getting localStorage state:', state )
			}
		}
  }

})

store.subscribe((mutation, state) => {
  let storedState = {
		selectedSite: state.selectedSite,
		selectedRange: state.selectedRange 
  }
  
  console.log('subscribe called')
	localStorage.setItem('store', JSON.stringify(storedState))
})

export default store