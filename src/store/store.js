import Vue from 'vue'
import Vuex from 'vuex'

import siteNames from '../../static/sites.json'
import dateRanges from '../../static/dateRanges.json'

import consultCounts from '../../static/consult_count.json'
import consultStatusCounts from '../../static/consult_pie_chart.json'
import consultLineChart from '../../static/consult_line_chart.json'
import consultDetails from '../../static/consult_details.json'

import encounterCounts from '../../static/encounter_count.json'
import encounterLineChart from '../../static/encounter_line_chart.json'
import encounterPatientLineChart from '../../static/encounter_patient_line_chart.json'
import encounterApptCancelNoShow from '../../static/encounter_appointment_cancel_no_show.json'
import encounterCPT from '../../static/encounter_cpt.json'
import encounterCPTCategories from '../../static/encounter_cpt_categories.json'

// Provider
// import encounterProviderDetails from '../../static/encounter_provider_details.json'
// import encounterProviderDetailsCPT from '../../static/encounter_provider_details_cpt.json'

import providerCount from '../../static/provider_count.json'
import providerInfo from '../../static/provider_info.json'
import providerDetail from '../../static/provider_detail.json'
import providerDetailCPT from '../../static/provider_detail_cpt.json'
import providerPatientDetailCPT from '../../static/provider_patient_detail_cpt.json'

// Surveys
import surveyTotals from '../../static/survey_totals.json'
import surveyDetails from '../../static/survey_details.json'
import surveyPatientDetails from '../../static/survey_patient_details.json'

// EBP
import ebpCount from '../../static/ebp_count.json'
import ebpInfo from '../../static/ebp_info.json'

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

function totalAndPercent(arr) {
  let group = arr.length != 0 ? addCommas(+arr[0].totalNum) : 0
  let percent = arr.length != 0 ? arr[0].PercentageCPT : 0
  return { 'total' : group, 'percent' : percent}
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
    consultLineChart,

    encounterCounts,
    encounterLineChart,
    encounterPatientLineChart,
    encounterApptCancelNoShow,
    encounterCPT,
    encounterCPTCategories,

    providerCount,
    providerInfo,
    providerDetail,
    providerDetailCPT,
    providerPatientDetailCPT,

    surveyTotals,
    surveyDetails,
    surveyPatientDetails,

    ebpCount,
    ebpInfo,

  },
  getters: {
    siteConsultTotal: (state) => {
      let filteredArray = state.consultCounts
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.dataType === 'consultCount')
      // console.log('ConsultTotal is: ', filteredArray)
      return filteredArray[0].countTotal
    },
    siteConsultPatientTotal: (state) => {
      let filteredArray = state.consultCounts
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.dataType === 'patientCount')
      // console.log('PatientTotal is: ', filteredArray)
      return filteredArray[0].countTotal
    },
    siteConsultActiveTotal: (state) =>{
      let filteredArray = state.consultStatusCounts
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.ConsultStatus === 'ACTIVE')
      // console.log('ActiveTotal is: ', filteredArray)
      return filteredArray.length == 0 ? 0 : filteredArray[0].Num 
    },
    siteConsultPendingTotal: (state) =>{
      // console.log('in siteConsultPendingTotal, state.selectedSite is ', state.selectedSite)
      // console.log('in siteConsultPendingTotal, state.consultStatusCounts is', state.consultStatusCounts)
      let filteredArray = state.consultStatusCounts
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.ConsultStatus === 'PENDING')
      console.log('PendingTotal is: ', filteredArray)
      return filteredArray.length == 0 ? 0 : filteredArray[0].Num  
    },
    siteConsultPieChartSeries: (state) =>{
      // build series based on selected site
      // console.log('consultStatusCounts is: ', state.consultStatusCounts)
      let mappedArray = state.consultStatusCounts
        .filter(site => site.StaPa === state.selectedSite)
        .map((status) => { return [status.ConsultStatus, +status.Num] })
      // console.log('pie chart series is: ', mappedArray)
      return mappedArray  
    },
    siteConsultDetails: (state) => {
      let consultDetails = state.consultDetails
        .filter(site => site.StaPa === state.selectedSite)
      // console.log('consultDetails is: ', consultDetails)
      return consultDetails
    },
    siteConsultLineChartSeries: (state) => {
      let consultLineChartMonths = state.consultLineChart
        .filter(site => site.StaPa === state.selectedSite)
        .map((month) => { return month.shortMonthName})
      // console.log('consult line chart months: ', consultLineChartMonths)
      // return consultLineChartMonths
      let consultLineChartData = state.consultLineChart
        .filter(site => site.StaPa === state.selectedSite)
        .map((month) => { return +month.monthConsultsTotal })
      // console.log('consult line chart data: ', consultLineChartData)
      return { months: consultLineChartMonths, series: consultLineChartData }
    },


    siteEncounterTotal: (state) => {
      let filteredArray = state.encounterCounts
        .filter(site => site.Sta3n === state.selectedSite)
        .filter(site => site.dataType === 'encountersCount')
      // console.log('Encounter Total is: ', filteredArray)
      return filteredArray[0].countTotal
    },
    siteEncounterPatientTotal: (state) => {
      let filteredArray = state.encounterCounts
        .filter(site => site.Sta3n === state.selectedSite)
        .filter(site => site.dataType === 'patientCount')
      // console.log('Encounter Patient Total is: ', filteredArray)
      return filteredArray[0].countTotal
    },
    siteEncounterLineChartSeries: (state) => {
      let encounterLineChartMonths = state.encounterLineChart
        .filter(site => site.StaPa === state.selectedSite)
        .map((month) => { return month.shortMonthName})
      // console.log('encounter line chart months: ', encounterLineChartMonths)
      // return consultLineChartMonths
      let encounterLineChartData = state.encounterLineChart
        .filter(site => site.StaPa === state.selectedSite)
        .map((month) => { return +month.monthEncountersTotal })
      // console.log('encounter line chart data: ', encounterLineChartData)
      return { months: encounterLineChartMonths, series: encounterLineChartData }
    },
    siteEncounterPatientLineChartSeries: (state) => {
      let encounterPatientLineChartMonths = state.encounterPatientLineChart
        .filter(site => site.StaPa === state.selectedSite)
        .map((month) => { return month.shortMonthName})
      // console.log('encounter line chart months: ', encounterPatientLineChartMonths)
      // return consultLineChartMonths
      let encounterPatientLineChartData = state.encounterPatientLineChart
        .filter(site => site.StaPa === state.selectedSite)
        .map((month) => { return +month.monthPatientTotal })
      // console.log('encounter patient line chart data: ', encounterPatientLineChartData)
      return { months: encounterPatientLineChartMonths, series: encounterPatientLineChartData }
    },
    siteEncounterApptCancelNoShowPieChart: (state) =>{
      // build series based on selected site
    // console.log('encounterApptCancelNoShow is: ', state.encounterApptCancelNoShow)
      let mappedArray = state.encounterApptCancelNoShow
        .filter(site => site.Sta3n === state.selectedSite)
        .map((status) => { return [status.CancelNoShow, +status.cancelNoShowCount] })
      // console.log('pie chart series is: ', mappedArray)
      return mappedArray  
    },
    siteEncounterApptNoShowTotal: (state) => {
      let filteredArray = state.encounterApptCancelNoShow
        .filter(site => site.Sta3n === state.selectedSite)
        .filter(site => site.CancelNoShow === 'NO-SHOW')
      // console.log('Encounter Patient Total is: ', filteredArray)
      return filteredArray[0].cancelNoShowCount
    },
    siteEncounterApptCancelTotal: (state) => {
      // console.log('HERE!!!!!')
      let filteredArray = state.encounterApptCancelNoShow
        .filter(site => site.Sta3n === state.selectedSite)
        .filter(site => site.CancelNoShow === 'CANCELLED BY CLINIC' || site.CancelNoShow === 'CANCELLED BY PATIENT')
      let cancelCount = +filteredArray[0].cancelNoShowCount + +filteredArray[1].cancelNoShowCount
      // console.log('Encounter Cancelled Total is: ', cancelCount)
      return cancelCount
    },
    siteEncounterCPTTotal: (state) => {
      let filteredArray = state.encounterCPT
        .filter(site => site.Sta3n === state.selectedSite)
      filteredArray.forEach(function (rec) {
        rec.encountersPerCPT = Number(rec.encountersPerCPT)
      })
      return filteredArray
    },
    siteEncounterCPTCategories: (state) => {
      let filteredArray = state.encounterCPTCategories
        .filter(site => site.Sta3n === state.selectedSite)
      return filteredArray
    },
    siteEncounterCPTIndividual: (state) => {
      let filteredArray = state.encounterCPTCategories
        .filter(site => site.Sta3n === state.selectedSite) 
        .filter(site => site.Category === 'Individual Psychotherapy')
      return totalAndPercent(filteredArray)
    },
    siteEncounterCPTGroup: (state) => {
      let filteredArray = state.encounterCPTCategories
        .filter(site => site.Sta3n === state.selectedSite) 
        .filter(site => site.Category === 'Group Psychotherapy')
      return totalAndPercent(filteredArray)
    },
    siteEncounterCPTTelephone: (state) => {
      let filteredArray = state.encounterCPTCategories
        .filter(site => site.Sta3n === state.selectedSite) 
        .filter(site => site.Category === 'Telephone')
      return totalAndPercent(filteredArray)
    },
    siteEncounterCPTProlongedService: (state) => {
      let filteredArray = state.encounterCPTCategories
        .filter(site => site.Sta3n === state.selectedSite) 
        .filter(site => site.Category === 'Prolonged Service')
      return totalAndPercent(filteredArray)
    },
    siteEncounterCPTAssessment: (state) => {
      let filteredArray = state.encounterCPTCategories
        .filter(site => site.Sta3n === state.selectedSite) 
        .filter(site => site.Category === 'Assessment')
      return totalAndPercent(filteredArray)
    },
    siteEncounterCPTGroupEducation: (state) => {
      let filteredArray = state.encounterCPTCategories
        .filter(site => site.Sta3n === state.selectedSite) 
        .filter(site => site.Category === 'Health and Behavior (Group) Education')
      return totalAndPercent(filteredArray)
    },
    
    //providerCount
    siteProviderProviderCount: (state) => {
      let filteredArray = state.providerCount
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.dataType === 'providerProviderCount')
      return filteredArray[0].countTotal
    },
    siteProviderClinicCount: (state) => {
      let filteredArray = state.providerCount
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.dataType === 'providerClinicCount')
      return filteredArray[0].countTotal
    },
    siteProviderPatientCount: (state) => {
      let filteredArray = state.providerCount
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.dataType === 'providerPatientCount')
      return filteredArray[0].countTotal
    },
    siteProviderInfo: (state) => {
      let filteredArray = state.providerInfo
        .filter(site => site.Sta3n === state.selectedSite)
      return filteredArray
    },
    siteProviderPatientDetailCPT: (state) => {
      console.log('here in siteProviderPatientDetailCPT')
      let filteredArray = state.providerPatientDetailCPT
        .filter(site => site.Sta3n === state.selectedSite)
        console.log('siteProviderPatientDetailCPT filteredArray', filteredArray)
      return filteredArray
    },   
    siteProviderClinicSummary: (state) => {
      let filteredArray = state.providerDetail
        .filter(site => {
          // ** Note: selectedSite is cast to number for comparison
          return site.Sta3n === state.selectedSite
        })
      return filteredArray
    },
   

    siteSurveyTotals: (state) => {
      let sumGivenOverall = state.surveyTotals
        .filter(site => site.StaPa === state.selectedSite && 
          site.dataType == 'surveysGivenOverall')

      return { surveysGivenOverall: +sumGivenOverall[0].sumTotal }
    },
    siteSurveyClinicTotals: (state) => {
      let surveysGivenClinics = state.surveyTotals
        .filter(site => site.StaPa === state.selectedSite && 
          site.dataType == 'surveysGivenClinics')

      let surveysTotalClinics = state.surveyTotals
      .filter(site => site.StaPa === state.selectedSite && 
        site.dataType == 'surveysTotalClinics')

      return { surveysGivenClinics: +surveysGivenClinics[0].sumTotal,
               surveysTotalClinics: +surveysTotalClinics[0].sumTotal }
    },
    siteSurveyProviderTotals: (state) => {
      let surveysGivenProviders = state.surveyTotals
        .filter(site => site.StaPa === state.selectedSite && 
          site.dataType == 'surveysGivenProviders')
          // surveysTotalClinics
      let surveysTotalProviders = state.surveyTotals
        .filter(site => site.StaPa === state.selectedSite && 
          site.dataType == 'surveysTotalProviders')

      return { surveysGivenProviders: +surveysGivenProviders[0].sumTotal,
               surveysTotalProviders: +surveysTotalProviders[0].sumTotal }
    },
    siteSurveyPatientTotals: (state) => {
      let surveysGivenPatients = state.surveyTotals
        .filter(site => site.StaPa === state.selectedSite && 
          site.dataType == 'surveysGivenPatients')
          // surveysTotalClinics
      let surveysTotalPatients = state.surveyTotals
      .filter(site => site.StaPa === state.selectedSite && 
        site.dataType == 'surveysTotalPatients')

      return { surveysGivenPatients: +surveysGivenPatients[0].sumTotal,
               surveysTotalPatients: +surveysTotalPatients[0].sumTotal }
    },
    siteSurveyDetails: (state) => {
      let filteredArray = state.surveyDetails
        .filter(site => site.StaPa === state.selectedSite)
      // console.log('filteredArray', filteredArray)
      return filteredArray
    },
    siteSurveyPatientDetails: (state) => {
      let filteredArray = state.surveyPatientDetails
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.StaffName != 'NULL')
      // console.log('filteredArray', filteredArray)
      return filteredArray
    },

    siteEBPClinics: (state) => {
      let filteredArray = state.ebpInfo
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.dataType === 'ebpClinics')
      return filteredArray[0].totalNum
    },
    siteEBPClinicsAll: (state) => {
      let filteredArray = state.ebpInfo
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.dataType === 'ebpClinicsAll')
      return filteredArray[0].totalNum
    },
    siteEBPClinicsPEI: (state) => {
      let filteredArray = state.ebpInfo
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.dataType === 'ebpClinicsPEI')
      return filteredArray[0].totalNum
    },
    siteEBPClinicsCPT: (state) => {
      let filteredArray = state.ebpInfo
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.dataType === 'ebpClinicsCPT')
      return filteredArray[0].totalNum
    },
    siteEBPProviders: (state) => {
      let filteredArray = state.ebpInfo
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.dataType === 'ebpProviders')
      return filteredArray[0].totalNum
    },
    siteEBPProvidersAll: (state) => {
      let filteredArray = state.ebpInfo
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.dataType === 'ebpProvidersAll')
      return filteredArray[0].totalNum
    },
  } ,
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