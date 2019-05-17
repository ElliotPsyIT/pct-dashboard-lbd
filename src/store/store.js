import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

import { addCommas, totalAndPercent, isSelectedDateRangeWhiteListed } from '../utils'
import siteNames from '../../static/sites_orig.json'
import dateRanges from '../../static/dateRanges.json'

//Consults
// import consultCount from '../../static/consult_count.json'
// import consultPieChart from '../../static/consult_pie_chart.json'
// import consultLineChart from '../../static/consult_line_chart.json'
// import consultDetails from '../../static/consult_details.json'

// Encounters
// import encounterCount from '../../static/encounter_count.json'
// import encounterLineChart from '../../static/encounter_line_chart.json'
// import encounterPatientLineChart from '../../static/encounter_patient_line_chart.json'
// import encounterCPT from '../../static/encounter_cpt.json'
// import encounterCPTCategories from '../../static/encounter_cpt_categories.json'
// import encounterPatientCPTCategories from '../../static/encounter_patient_cpt_categories.json'

// Encounter Appointments
// import encounterApptCount from '../../static/encounter_appointment_count.json'
// import encounterApptCancelNoShow from '../../static/encounter_appointment_cancel_noshow.json'
// import encounterApptClinicCancelNoShow from '../../static/encounter_appointment_clinic_cancel_noshow.json'

// Providers
// import providerCount from '../../static/provider_count.json'
// import providerInfo from '../../static/provider_info.json'
// import providerDetails from '../../static/provider_details.json'
// import providerPatientDetailsCPT from '../../static/provider_patient_details_cpt.json'

// Surveys
// import surveyTotals from '../../static/survey_totals.json'
// import surveyDetails from '../../static/survey_details.json'
// import surveyPatientDetails from '../../static/survey_patient_details.json'

// EBP
// import ebpCount from '../../static/ebp_count.json'
// import ebpInfo from '../../static/ebp_info.json'
// import ebpDetails from '../../static/ebp_details.json'
// import ebpPieChart from '../../static/ebp_pie_chart.json'
// import ebpSummary from '../../static/ebp_summary.json'
// import ebpPatientsCPTCategories from '../../static/ebp_patient_cpt_categories.json'
// import ebpDetailsTypes from '../../static/ebp_details_types.json'
// import ebpDetailsSessionsSurveys from '../../static/ebp_details_sessions_and_surveys.json'

Vue.use(Vuex)

// Access localStorage for previously stored site and daterange
const localStorage = window.localStorage
let storeLocal = {}
if(localStorage.getItem('store')) {
  storeLocal = JSON.parse(localStorage.getItem('store'))
}

function dateRangeRestrict () { // whitelist dateRange
  let restrictedDateRange = ""
  if(!isSelectedDateRangeWhiteListed(context.state.selectedRange)) {
    restrictedDateRange = defaultDateRange //globally set here in store
    context.state.whitelisted = true //turn on whitelisted flag for components to see
    console.log('Needed to change dateRange to ', whitelisted)
  } else {
    restrictedDateRange = context.state.selectedRange // okay to use selectedRange
    context.state.whitelisted = false // turn off whitelisted flage
    console.log('No need to whitelist this dateRange')
  }
  return whitelisted
}

// set default whitelisted dateRange for limiting data request size
const defaultDateRange = 'threemonths' 

const store = new Vuex.Store({
  state: {
    // selectedSite,
    selectedSite: storeLocal.selectedSite || '512',
    selectedRange: storeLocal.selectedRange || 'threemonths',
    userFirstName: storeLocal.userFirstName || 'No',
    userLastName: storeLocal.userLastName || 'User Name',

    whitelisted: false,

    appVersion: '0.11.0',
    phipii: 0,
    adaccount: "",
    siteNames,
    dateRanges,
    
    consultDataPie: [],
    consultDataLine: [],
    consultDataCount: [],
    consultDetails: [],

    encounterCount: [],
    encounterLineChart: [],
    encounterPatientLineChart: [],
    encounterCPTCategoriesPsychotherapy: [],
    encounterCPTCategories: [],
    encounterCPT: [],
    encounterPatientCPTCategories: [],

    encounterApptCancelNoShow: [],
    encounterApptCount: [],
    encounterApptClinicCancelNoShow: [],
    

    providerCount: [],
    providerInfo: [],
    providerDetails: [],
    providerPatientDetailsCPT: [],

    surveyTotals: [],
    surveyDetails: [],
    surveyPatientDetails: [],

    // ebpCount,
    // ebpInfo,
    ebpDetails: [],
    ebpPieChart: [],
    ebpSummary: [],
    // ebpPatientsCPTCategories,
    ebpDetailsTypes: [],
    ebpDetailsSessionsSurveys: [],
  },
  getters: {
    // user permissions to see PHIPII
    userPHI: (state) => {
      return state.phipii
    },
    userAccount: (state) => {
      return state.adaccount
    },
  
    siteConsultTotal: (state) => {
      // console.log('in store getters, state is: ', state)
      // console.log('in siteConsultTotal, state.consultDataCount is: ', state.consultDataCount)
      let filteredArray = state.consultDataCount //state.consultCount //
        .filter(site => {
          // console.log('site.StaPa', site.StaPa)
          // console.log('state.selectedSite', state.selectedSite)
          return site.StaPa === state.selectedSite
        })
        .filter(site => site.dataType === 'consultCount')
      //  console.log('ConsultTotal filteredArray is: ', filteredArray)
      return filteredArray.length == 0 ? 0 : filteredArray[0].countTotal
    },
    siteConsultPatientTotal: (state) => {
      let filteredArray = state.consultDataCount //state.consultCount//
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.dataType === 'patientCount')
      // console.log('PatientTotal is: ', filteredArray)
      return filteredArray.length == 0 ? 0 : filteredArray[0].countTotal
    },
    siteConsultActiveTotal: (state) =>{
     
      let filteredArray = state.consultDataPie //state.consultPieChart //
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.ConsultStatus === 'ACTIVE')
      // console.log('ActiveTotal is: ', filteredArray)
      return filteredArray.length == 0 ? 0 : filteredArray[0].Num 
    },
    siteConsultPendingTotal: (state) =>{
      // console.log('in siteConsultPendingTotal, state.selectedSite is ', state.selectedSite)
      // console.log('in siteConsultPendingTotal, state.consultPieChart is', state.consultPieChart)
      let filteredArray = state.consultDataPie //state.consultPieChart
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.ConsultStatus === 'PENDING')
      // console.log('PendingTotal array is: ', filteredArray)
      return filteredArray.length == 0 ? 0 : filteredArray[0].Num  
    },
    siteConsultPieChartSeries: (state) =>{
      // build series based on selected site
      // console.log('consultPieChart is: ', state.consultPieChart)
      let mappedArray = state.consultDataPie //state.consultPieChart
        .filter(site => site.StaPa === state.selectedSite)
        .map((status) => { return [status.ConsultStatus, +status.Num] })
      // console.log('pie chart series is: ', mappedArray)
      return mappedArray  
    },
    siteConsultDetails: (state) => {
      // console.log('in getter siteConsultDetails')
      // console.log('selectedSite: ', selectedSite)
      // console.log('state.consultDetails is: ', state.consultDetails)
      let consultDetails = state.consultDetails
        .filter(site => site.StaPa === state.selectedSite)
      // console.log('consultDetails is: ', consultDetails)
      return consultDetails
    },
    siteConsultLineChartSeries: (state) => {
      let consultLineChartMonths = state.consultDataLine //state.consultLineChart
        .filter(site => site.StaPa === state.selectedSite)
        .map((month) => { return month.shortMonthName})
      // console.log('consult line chart months: ', consultLineChartMonths)
      // return consultLineChartMonths
      let consultLineChartData = state.consultDataLine //state.consultLineChart
        .filter(site => site.StaPa === state.selectedSite)
        .map((month) => { return +month.monthConsultsTotal })
      // console.log('consult line chart data: ', consultLineChartData)
      return { months: consultLineChartMonths, series: consultLineChartData }
    },

    // encounters: distinct VisitSID, all MH CPTCodes
    siteEncounterTotal: (state) => {
      let filteredArray = state.encounterCount
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.dataType === 'encountersCount')
      // console.log('Encounter Total is: ', filteredArray)
      return filteredArray.length == 0 ? 0 : filteredArray[0].countTotal
    },
    // encounters: distinct PatientSID, all MH CPTCode
    siteEncounterPatientTotal: (state) => {
      let filteredArray = state.encounterCount
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.dataType === 'patientCount')
      // console.log('Encounter Patient Total is: ', filteredArray)
      return filteredArray.length == 0 ? 0 : addCommas(filteredArray[0].countTotal)
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
    // total for Ind Therapy CPT Category (large set of CPTs)
    siteEncounterCPTIndividual: (state) => {
      // console.log('in siteEncounterCPTIndividual, state.encounterCPTCategoriesPsychotherapy is: ', state.encounterCPTCategoriesPsychotherapy)
      let filteredArray = state.encounterCPTCategoriesPsychotherapy
        .filter(site => site.StaPa === state.selectedSite) 
        // .filter(site => site.CPTCategory === 'Individual Psychotherapy')
        .filter(site => {
          // console.log('siteEncounterCPTIndividual Psychotherapy is: ', site.Psychotherapy)
          return site.Psychotherapy === 'Individual Therapy'
        } )
      // console.log('in siteEncounterCPTIndividual, filteredArray is: ', filteredArray)
        return filteredArray.length == 0 ? 0 : filteredArray[0].NUMSESSIONS
    },
    // total for Grp Therapy CPT Category (large set of CPTs)
    siteEncounterCPTGroup: (state) => {
      let filteredArray = state.encounterCPTCategoriesPsychotherapy
        .filter(site => site.StaPa === state.selectedSite) 
        // .filter(site => site.CPTCategory === 'Group Psychotherapy')
        .filter(site => site.Psychotherapy === 'Group Therapy') 
      return filteredArray.length == 0 ? 0 : filteredArray[0].NUMSESSIONS
    },
    // total for each CPTs no categorizing and no filtering
    siteEncounterCPTTotal: (state) => {
      let filteredArray = state.encounterCPT
        .filter(site => site.StaPa === state.selectedSite)
      filteredArray.forEach(function (rec) {
        rec.encountersPerCPT = Number(rec.encountersPerCPT)
      })
      return filteredArray
    },
    // total for each CPTCategory (large set of CPTs) and no category filtering
    siteEncounterCPTCategories: (state) => {
      let filteredArray = state.encounterCPTCategories
        .filter(site => site.StaPa === state.selectedSite)
      // console.log('in ENCOUNTER_CPT_CATEGORIES, filteredArray is: ', filteredArray)
      return filteredArray
    },
    // total for Tele CPT Category (large set of CPTs)
    siteEncounterCPTTelephone: (state) => {
      let filteredArray = state.encounterCPTCategories
        .filter(site => site.StaPa === state.selectedSite) 
        // .filter(site => site.CPTCategory === 'Telephone')
        .filter(site => site.CPTCategory.match('Telephone') ) 
      return totalAndPercent(filteredArray)
    },
    // total for Prolonged Service CPT Category (large set of CPTs)
    siteEncounterCPTProlongedService: (state) => {
      let filteredArray = state.encounterCPTCategories
        .filter(site => site.StaPa === state.selectedSite) 
        // .filter(site => site.CPTCategory === 'Prolonged Service')
        .filter(site => site.CPTCategory.match('Prolonged Service') ) 
      return totalAndPercent(filteredArray)
    },
    // total for Specific CPT Category (large set of CPTs)
    siteEncounterCPTAssessment: (state) => {
      let filteredArray = state.encounterCPTCategories
        .filter(site => site.StaPa === state.selectedSite) 
        // .filter(site => site.CPTCategory === 'Assessment')
        .filter(site => site.CPTCategory.match('Assessment') ) 
      return totalAndPercent(filteredArray)
    },
    // total for Specific CPT Category (large set of CPTs)
    siteEncounterCPTGroupEducation: (state) => {
      let filteredArray = state.encounterCPTCategories
        .filter(site => site.StaPa === state.selectedSite) 
        // .filter(site => site.CPTCategory === 'Health and Behavior (Group) Education')
        .filter(site => site.CPTCategory.match('Health and Behavior \(Group\) Education') ) 
      return totalAndPercent(filteredArray)
    },

    // like siteEncounterCPTIndividual's large CPTs - but Ind Therapy Category and no Grp Therapy
    siteEncounterCPTPatientsIndOnly: (state) => {
      //encounterPatientCPTCategories
      // console.log('state.encounterPatientCPTCategories', state.encounterPatientCPTCategories)
      let filteredArray = state.encounterPatientCPTCategories
        .filter(site => site.StaPa === state.selectedSite) 
        .filter(site => site.TherapyType === 'IndividualOnly')
      return filteredArray.length == 0 ? 0 : filteredArray[0].NumPsychotherapyByType
    },
    // like siteEncounterCPTGroup's large CPTs - but Grp Therapy Category and no Ind Therapy
    siteEncounterCPTPatientsGrpOnly: (state) => {
      //encounterPatientCPTCategories
      let filteredArray = state.encounterPatientCPTCategories
        .filter(site => site.StaPa === state.selectedSite) 
        .filter(site => site.TherapyType === 'GroupOnly')
      return filteredArray.length == 0 ? 0 : filteredArray[0].NumPsychotherapyByType
    },
    // like above two but w/ both Ind and Grp Therapy
    siteEncounterCPTPatientsBoth: (state) => {
      //encounterPatientCPTCategories
      let filteredArray = state.encounterPatientCPTCategories
        .filter(site => site.StaPa === state.selectedSite) 
        .filter(site => site.TherapyType === 'Both')
      return filteredArray.length == 0 ? 0 : filteredArray[0].NumPsychotherapyByType
    },
    // like above two but w/ either Ind or Grp Therapy
    siteEncounterCPTPatientsEither: (state) => {
      //encounterPatientCPTCategories
      let filteredArray = state.encounterPatientCPTCategories
        .filter(site => site.StaPa === state.selectedSite) 
        .filter(site => site.TherapyType === 'Either')
      return filteredArray.length == 0 ? 0 : filteredArray[0].NumPsychotherapyByType
    },

    // appointments
    siteEncounterApptCancelNoShowPieChart: (state) =>{
      // build series based on selected site
    // console.log('encounterApptCancelNoShow is: ', state.encounterApptCancelNoShow)
      let filteredArray = state.encounterApptCancelNoShow
        .filter(site => site.StaPa === state.selectedSite)
        .map((status) => { return [status.CancelNoShow, +status.cancelNoShowCount] })
      // console.log('pie chart series is: ', mappedArray)
      return filteredArray.length == 0 ? [] : filteredArray  
    },
    siteEncounterApptNoShowTotal: (state) => {
      let filteredArray = state.encounterApptCancelNoShow
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.CancelNoShow === 'NO-SHOW')
      // console.log('Encounter Patient Total is: ', filteredArray)
      return filteredArray.length == 0 ? 0 : filteredArray[0].cancelNoShowCount
    },
    siteEncounterApptCancelTotal: (state) => {
      // console.log('HERE!!!!!')
      let filteredArray = state.encounterApptCancelNoShow
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => 
          site.CancelNoShow === 'CANCELLED BY PATIENT' ||
          site.CancelNoShow === 'CANCELLED BY PATIENT & AUTO RE-BOOK' ||
          site.CancelNoShow === 'CANCELLED BY CLINIC' || 
          site.CancelNoShow === 'CANCELLED BY CLINIC & AUTO RE-BOOK'  
          )
      // console.log('filteredArray after filtering: ', filteredArray)
      let total = 0  
      let cancelCountTotalArr = filteredArray.map(obj => { 
        total += parseInt(obj.cancelNoShowCount,10)
      }) 
      return total
    },
    siteEncounterApptTotalStr: (state) => { // with commas for display
      let filteredArray = state.encounterApptCount
        .filter(site => site.StaPa === state.selectedSite)
      return filteredArray.length == 0 ? 0 : addCommas(filteredArray[0].appointmentCount)
    },
    siteEncounterApptTotal: (state) => { // without commas for computation
      let filteredArray = state.encounterApptCount
        .filter(site => site.StaPa === state.selectedSite)
      return filteredArray.length == 0 ? 0 : filteredArray[0].appointmentCount
    },
    siteEncounterApptClinicNoShowTotal: (state) => {
      // console.log('the clinic cancel noshow from json: ', state.encounterApptClinicCancelNoShow)
      let filteredArray = state.encounterApptClinicCancelNoShow
        .filter(site => {
          // console.log('in filter, site.Sta3n is: ', site.Sta3n)
          return site.StaPa == state.selectedSite
        })
        // console.log('filteredArray is: ', filteredArray)
        return filteredArray.length == 0 ? 0 : filteredArray  
    },
    

    // PROVIDERS
    siteProviderProviderCount: (state) => {
      let filteredArray = state.providerCount
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.dataType === 'providerProviderCount')
      return filteredArray.length == 0 ? 0 : filteredArray[0].countTotal
    },
    siteProviderClinicCount: (state) => {
      let filteredArray = state.providerCount
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.dataType === 'providerClinicCount')
      return filteredArray.length == 0 ? 0 : filteredArray[0].countTotal
    },
    siteProviderPatientCount: (state) => {
      let filteredArray = state.providerCount
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.dataType === 'providerPatientCount')
      return filteredArray.length == 0 ? 0 : filteredArray[0].countTotal
    },
    siteProviderList: (state) => {
      let filteredArray = state.providerInfo
        .filter(site => site.dataType === 'providerInfo')
        .filter(site => site.StaPa === state.selectedSite)
        .map(site => site.STAFFNAME )
      //unique the provider names
      console.log('siteProviderList filteredArray: ', filteredArray)
      filteredArray = filteredArray.filter((el, i, a) => i === a.indexOf(el))
      return filteredArray.length == 0 ? 0 : filteredArray // array of staffname objects?
    },
    siteProviderInfo: (state) => {
      // console.log('in the siteProviderInfo, the state.providerInfo data is: ', state.providerInfo)
      let filteredArray = state.providerInfo
        // .filter(site => {
        //   // console.log('going through site.dataType: ', site.dataType === 'providerInfo')
        //   site.dataType === 'providerInfo' 
        // })
        // .filter(site => {
        //   // console.log(' site.Sta3n is: ',  site.Sta3n)
        //   // console.log(' state.selectedSite is: ',  state.selectedSite)
        //   // console.log('in store in siteProviderInfo, state.selectedSite is', site.Sta3n === state.selectedSite)
        //   site.StaPa === state.selectedSite
        // })
      // console.log('siteProviderInfo has this filteredArray: ', filteredArray)
      return filteredArray.length == 0 ? 0 : filteredArray
    },
    siteProviderPatientDetailsCPT: (state) => {
      // console.log('state.selectedSite: ', state.selectedSite)
      let filteredArray = state.providerPatientDetailsCPT
        .filter(site => {
          // console.log('site.Sta3n: ', site.Sta3n)
          // console.log('site.StaPa: ', site.StaPa)
          return site.StaPa === state.selectedSite
        })
        // console.log('siteProviderPatientDetailCPT filteredArray', filteredArray)
      return filteredArray.length == 0 ? 0 : filteredArray
    },   
    siteProviderDetails: (state) => {
      let filteredArray = state.providerDetails
        .filter(site => {
          // ** Note: selectedSite is cast to number for comparison
          return site.StaPa === state.selectedSite
        })
      return filteredArray.length == 0 ? 0 : filteredArray
    },
   

    siteSurveyTotals: (state) => {
      let sumGivenOverall = state.surveyTotals
        .filter(site => site.StaPa === state.selectedSite && 
          site.dataType == 'surveysGivenOverall')
      // console.log('sumGivenOverall is: ', sumGivenOverall)
      let sumGivenTotal = sumGivenOverall.length == 0 ? 0 : +sumGivenOverall[0].sumTotal

      return { surveysGivenOverall: sumGivenTotal }
    },
    siteSurveyClinicTotals: (state) => {
      let surveysGivenClinics = state.surveyTotals
        .filter(site => site.StaPa === state.selectedSite && 
          site.dataType == 'surveysGivenClinics')
      let surveysGivenClinicsTot = surveysGivenClinics.length == 0 ? 0 : +surveysGivenClinics[0].sumTotal

      let surveysTotalClinics = state.surveyTotals
      .filter(site => site.StaPa === state.selectedSite && 
        site.dataType == 'surveysTotalClinics')
      let surveysTotalClinicsTot = surveysTotalClinics.length == 0 ? 0 : +surveysTotalClinics[0].sumTotal
      
      return { surveysGivenClinics: surveysGivenClinicsTot,
               surveysTotalClinics: surveysTotalClinicsTot}
    },
    siteSurveyProviderTotals: (state) => {
      let surveysGivenProviders = state.surveyTotals
        .filter(site => site.StaPa === state.selectedSite && 
          site.dataType == 'surveysGivenProviders')
      let surveysGivenProvidersTot = surveysGivenProviders.length == 0 ? 0 : +surveysGivenProviders[0].sumTotal
      
      let surveysTotalProviders = state.surveyTotals
        .filter(site => site.StaPa === state.selectedSite && 
          site.dataType == 'surveysTotalProviders')
      let surveysTotalProvidersTot = surveysTotalProviders.length == 0 ? 0 : +surveysTotalProviders[0].sumTotal

      return { surveysGivenProviders: surveysGivenProvidersTot,
               surveysTotalProviders: surveysTotalProvidersTot }
    },
    siteSurveyPatientTotals: (state) => {
      let surveysGivenPatients = state.surveyTotals
        .filter(site => site.StaPa === state.selectedSite && 
          site.dataType == 'surveysGivenPatients')
      let surveysGivenPatientsTot = surveysGivenPatients.length == 0 ? 0 : +surveysGivenPatients[0].sumTotal
      
      let surveysTotalPatients = state.surveyTotals
      .filter(site => site.StaPa === state.selectedSite && 
        site.dataType == 'surveysTotalPatients')
      let surveysTotalPatientsTot = surveysTotalPatients.length == 0 ? 0 : +surveysTotalPatients[0].sumTotal
      return { surveysGivenPatients: surveysGivenPatientsTot,
               surveysTotalPatients: surveysTotalPatientsTot }
    },
    siteSurveyDetails: (state) => {
      let filteredArray = state.surveyDetails
        .filter(site => site.StaPa === state.selectedSite)
      // console.log('filteredArray', filteredArray)
      return filteredArray.length == 0 ? 0 : filteredArray
    },
    siteSurveyPatientDetails: (state) => {
      let filteredArray = state.surveyPatientDetails
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.StaffName != 'NULL')
      // console.log('filteredArray', filteredArray)
      return filteredArray.length == 0 ? 0 : filteredArray
    },

    // revised EBPs from Matt and Erin
    siteEBPSessionsAny: (state) => {
      // console.log('in siteEBPSessionsAny and state.ebpSummary datatype is: ', typeof state.ebpSummary)
      let filteredArray = state.ebpSummary
      .filter(site => site.StaPa === state.selectedSite)
      .filter(site => site.dataType === 'ebp_sessions')
      return filteredArray.length == 0 ? 0 : filteredArray[0].sumTotal
    },
    siteALLSessions: (state) => {      
      let filteredArray = state.ebpSummary
      .filter(site => site.StaPa === state.selectedSite)
      .filter(site => site.dataType === 'all_sessions')
      return filteredArray.length == 0 ? 0 : filteredArray[0].sumTotal
    },
    //  patients totals akin to the above session totals
    siteEBPPatientsAny: (state) => {
      let filteredArray = state.ebpSummary
      .filter(site => site.StaPa === state.selectedSite)
      .filter(site => site.dataType === 'ebp_patients')
      return filteredArray.length == 0 ? 0 : filteredArray[0].sumTotal
    },
    siteEBPSessionsPECPT: (state) => {      
      let filteredArray = state.ebpSummary
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.dataType === 'ebp_sessions_pe_cpt')
      return filteredArray.length == 0 ? 0 : filteredArray[0].sumTotal
    },
    siteEBPPatientsPECPT: (state) => {      
      let filteredArray = state.ebpSummary
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.dataType === 'ebp_patients_pe_cpt')
      return filteredArray.length == 0 ? 0 : filteredArray[0].sumTotal
    },
    siteALLPatients: (state) => {      
      let filteredArray = state.ebpSummary
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.dataType === 'all_patients')
      // console.log('siteALLPatients filteredArray[0]: ', filteredArray[0] )
      return filteredArray.length == 0 ? 0 : filteredArray[0].sumTotal
    },
    siteEBPSessionsInd: (state) => {      
      let filteredArray = state.ebpSummary
    .filter(site => site.StaPa === state.selectedSite)
    .filter(site => site.dataType === 'ebp_sessions_ind')
      return filteredArray.length == 0 ? 0 : filteredArray[0].sumTotal
    },
    siteALLSessionsInd: (state) => {      
      let filteredArray = state.ebpSummary
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.dataType === 'all_sessions_ind')
      return filteredArray.length == 0 ? 0 : filteredArray[0].sumTotal
    },
    siteEBPPatientsInd: (state) => {      
      let filteredArray = state.ebpSummary
    .filter(site => site.StaPa === state.selectedSite)
    .filter(site => site.dataType === 'ebp_patients_ind')
      return filteredArray.length == 0 ? 0 : filteredArray[0].sumTotal
    },
    siteALLPatientsInd: (state) => {      
      let filteredArray = state.ebpSummary
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.dataType === 'all_patients_ind')
      return filteredArray.length == 0 ? 0 : filteredArray[0].sumTotal
    },
    siteEBPSessionsGrp: (state) => {
      let filteredArray = [];
      filteredArray = state.ebpSummary
    .filter(site => site.StaPa === state.selectedSite)
    .filter(site => site.dataType === 'ebp_sessions_grp')
    return filteredArray.length == 0 ? 0 : filteredArray.length == 0 ? 0 : filteredArray[0].sumTotal
    // return arrayEmpty(filteredArray) ? 0 : filteredArray[0].sumTotal
    },
    siteALLSessionsGrp: (state) => {      
      let filteredArray = state.ebpSummary
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.dataType === 'all_sessions_grp')
        return filteredArray.length == 0 ? 0 : filteredArray[0].sumTotal
        //  console.log('siteEBPSessionsGrp arrayEmpty(filteredArray) ', arrayEmpty(filteredArray))
      // return arrayEmpty(filteredArray) ? 0 : filteredArray[0].sumTotal
    },
    siteEBPPatientsGrp: (state) => {
      let filteredArray = [];      
      filteredArray = state.ebpSummary
    .filter(site => site.StaPa === state.selectedSite)
    .filter(site => site.dataType === 'ebp_patients_grp')
    return filteredArray.length == 0 ? 0 : filteredArray[0].sumTotal
    // return filteredArray[0].sumTotal
    },
    siteALLPatientsGrp: (state) => {      
      let filteredArray = state.ebpSummary
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.dataType === 'all_patients_grp')
      return filteredArray.length == 0 ? 0 : filteredArray[0].sumTotal
    },


    // siteEBPClinics: (state) => {
    //   let filteredArray = state.ebpInfo
    //     .filter(site => site.StaPa === state.selectedSite)
    //     .filter(site => site.dataType === 'ebpClinics')
    //   return filteredArray.length == 0 ? 0 : filteredArray[0].totalNum
    // },
    // siteEBPClinicsAll: (state) => {
    //   let filteredArray = state.ebpInfo
    //     .filter(site => site.StaPa === state.selectedSite)
    //     .filter(site => site.dataType === 'ebpClinicsAll')
    //   return filteredArray.length == 0 ? 0 : filteredArray[0].totalNum
    // },
    // siteEBPClinicsPEI: (state) => {
    //   let filteredArray = state.ebpInfo
    //     .filter(site => site.StaPa === state.selectedSite)
    //     .filter(site => site.dataType === 'ebpClinicsPEI')
    //   return filteredArray.length == 0 ? 0 : filteredArray[0].totalNum
    //   // return filteredArray[0].totalNum
    // },
    // siteEBPClinicsCPT: (state) => {
    //   let filteredArray = state.ebpInfo
    //     .filter(site => site.StaPa === state.selectedSite)
    //     .filter(site => site.dataType === 'ebpClinicsCPT')
    //   return filteredArray.length == 0 ? 0 : filteredArray[0].totalNum
    // },
    // siteEBPProviders: (state) => {
    //   let filteredArray = state.ebpInfo
    //     .filter(site => site.StaPa === state.selectedSite)
    //     .filter(site => site.dataType === 'ebpProviders')
    //   return filteredArray.length == 0 ? 0 : filteredArray[0].totalNum
    // },
    // siteEBPProvidersAll: (state) => {
    //   let filteredArray = state.ebpInfo
    //     .filter(site => site.StaPa === state.selectedSite)
    //     .filter(site => site.dataType === 'ebpProvidersAll')
    //   return filteredArray.length == 0 ? 0 : filteredArray[0].totalNum
    // },
    // siteEBPProvidersPEI: (state) => {
    //   let filteredArray = state.ebpInfo
    //     .filter(site => site.StaPa === state.selectedSite)
    //     .filter(site => site.dataType === 'ebpProvidersPEI')
    //   return filteredArray.length == 0 ? 0 : filteredArray.length == 0 ? 0 : filteredArray[0].totalNum
    //   // return filteredArray[0].totalNum
    // },
    // siteEBPProvidersCPT: (state) => {
    //   let filteredArray = state.ebpInfo
    //     .filter(site => site.StaPa === state.selectedSite)
    //     .filter(site => site.dataType === 'ebpProvidersCPT')
    //   return filteredArray.length == 0 ? 0 : filteredArray[0].totalNum
    // },
    // siteEBPPatients: (state) => {
    //   let filteredArray = state.ebpInfo
    //     .filter(site => site.StaPa === state.selectedSite)
    //     .filter(site => site.dataType === 'ebpPatients')
    //   return filteredArray.length == 0 ? 0 : filteredArray[0].totalNum
    // },
    // siteEBPPatientsAll: (state) => {
    //   let filteredArray = state.ebpInfo
    //     .filter(site => site.StaPa === state.selectedSite)
    //     .filter(site => site.dataType === 'ebpPatientsAll')
    //   return filteredArray.length == 0 ? 0 : filteredArray[0].totalNum
    // },
    // siteEBPPatientsPEI: (state) => {
    //   let filteredArray = state.ebpInfo
    //     .filter(site => site.StaPa === state.selectedSite)
    //     .filter(site => site.dataType === 'ebpPatientsPEI')
    //   return filteredArray.length == 0 ? 0 : filteredArray[0].totalNum
    //   // return filteredArray[0].totalNum
    // },
    // siteEBPPatientsCPT: (state) => {
    //   let filteredArray = state.ebpInfo
    //     .filter(site => site.StaPa === state.selectedSite)
    //     .filter(site => site.dataType === 'ebpPatientsCPT')
    //   return filteredArray.length == 0 ? 0 : filteredArray[0].totalNum
    // },
    siteEBPClinicSummary: (state) => {
      let filteredArray = state.ebpDetails
        .filter(site => {
          // console.log('site.StaPa is: ', site.StaPa)
          // console.log('state.selectedSite is: ', state.selectedSite)
          // ** Note: selectedSite is cast to number for comparison
          return site.StaPa === state.selectedSite
        })
        // console.log('from siteEBPClinicSummary: ', filteredArray)
      return filteredArray.length == 0 ? [] : filteredArray
    },
    siteEBPDetailsSessionsSurveys: (state) => {
      let filteredArray = state.ebpDetailsSessionsSurveys
        .filter(site => {
          // console.log('site.StaPa is: ', site.StaPa)
          // console.log('state.selectedSite is: ', state.selectedSite)
          // ** Note: selectedSite is cast to number for comparison
          return site.StaPa === state.selectedSite
        })
        // console.log('from siteEBPDetailsSessionsSurveys: ', filteredArray)
      return filteredArray.length == 0 ? [] : filteredArray
    },
    // ebpDetailSessionSurvey
    siteEBPPieChartSeries: (state) =>{
      // build series based on selected site
      // console.log('ebpPieChart is: ', state.ebpPieChart)
      let filteredArray = state.ebpPieChart
        .filter(site => site.StaPa === state.selectedSite)
        .map((status) => { return [status.HealthFactorCategoryShort, +status.Num] })
      // console.log('pie chart series is: ', mappedArray)
      return filteredArray.length == 0 ? [] : filteredArray  
    },
    siteEBPDetailsTypes: (state) => {
      let filteredArray = state.ebpDetailsTypes
        .filter(site => site.StaPa === state.selectedSite)
      // console.log('filteredArray', filteredArray)
      return filteredArray.length == 0 ? [] : filteredArray
    },

    // siteEBPPatientsCPTIndividualOnly: (state) => {
    //   let filteredArray = state.ebpPatientsCPTCategories
    //     .filter(site => site.StaPa === state.selectedSite)
    //     .filter(site => site.TherapyType === 'IndividualOnly')
    //   return filteredArray[0] ? filteredArray[0].NumPsychotherapyByType : 0
    // },
    // siteEBPPatientsCPTGroupOnly: (state) => {
    //   let filteredArray = state.ebpPatientsCPTCategories
    //     .filter(site => site.StaPa === state.selectedSite)
    //     .filter(site => site.TherapyType === 'GroupOnly')
    //   return filteredArray[0] ? filteredArray[0].NumPsychotherapyByType : 0
    // },
    // siteEBPPatientsCPTBoth: (state) => {
    //   let filteredArray = state.ebpPatientsCPTCategories
    //     .filter(site => site.StaPa === state.selectedSite)
    //     .filter(site => site.TherapyType === 'Both')
    //     // console.log('for both filteredArray is: ', filteredArray)
    //   return filteredArray[0] ? filteredArray[0].NumPsychotherapyByType : 0
    // },

  },

  // ACTIONS
  actions: {
    EBP_PIE_CHART (context) {
      // console.log('in EBP_PIE_CHART Action, check context here', context)
                
      const path = 'pct.cgi'
      const params = 'format=ebp_pie_chart&staPa=' + context.state.selectedSite + '&dateRange=' + context.state.selectedRange
      // axios.get('pct.cgi?format=who')
      axios.get(`${path}?${params}`)
      .then(response => { 
        // console.log('IN EBP_PIE_CHART ebp summary details from server is: ', typeof )
        // console.log('response.data is: ', response.data)
        // console.log('check context before commit: ', context)
        context.commit('SET_EBP_PIE_CHART', response.data)
      })

    },
    EBP_SUMMARY (context) {
      // console.log('in EBP_SUMMARY Action, check context here', context)
                
      const path = 'pct.cgi'
      const params = 'format=ebp_summary&staPa=' + context.state.selectedSite + '&dateRange=' + context.state.selectedRange
      // axios.get('pct.cgi?format=who')
      axios.get(`${path}?${params}`)
      .then(response => { 
        // console.log('IN EBP_SUMMARY ebp summary details from server is: ', typeof )
        // console.log('response.data is: ', response.data)
        // console.log('check context before commit: ', context)
        context.commit('SET_EBP_SUMMARY', response.data)
      })

    },
    EBP_DETAILS (context) {
      // console.log('in EBP_DETAILS Action, check context here', context)
                
      const path = 'pct.cgi'
      const params = 'format=ebp_details&staPa=' + context.state.selectedSite + '&dateRange=' + context.state.selectedRange
      // axios.get('pct.cgi?format=who')
      axios.get(`${path}?${params}`)
      .then(response => { 
        // console.log('got consult details from server')
        // console.log('response.data is: ', response.data)
        // console.log('check context before commit: ', context)
        context.commit('SET_EBP_DETAILS', response.data)
      })

    },
    EBP_DETAILS_TYPES (context) {
      // console.log('in EBP_DETAILS_TYPES Action, check context here', context)
                
      const path = 'pct.cgi'
      const params = 'format=ebp_details_types&staPa=' + context.state.selectedSite + '&dateRange=' + context.state.selectedRange
      // axios.get('pct.cgi?format=who')
      axios.get(`${path}?${params}`)
      .then(response => { 
        // console.log('response.data is: ', response.data)
        // console.log('check context before commit: ', context)
        context.commit('SET_EBP_DETAILS_TYPES', response.data)
      })

    },
    EBP_DETAILS_SESSIONS_SURVEYS (context) {
      // console.log('in EBP_DETAILS_SESSIONS_SURVEYS Action, check context here', context)
                
      const path = 'pct.cgi'
      const params = 'format=ebp_details_sessions_surveys&staPa=' + context.state.selectedSite + '&dateRange=' + context.state.selectedRange
      // axios.get('pct.cgi?format=who')
      axios.get(`${path}?${params}`)
      .then(response => { 
        // console.log('got consult details from server')
        // console.log('EBP_DETAILS_SESSIONS_SURVEYS response.data is: ', response.data)
        // console.log('check context before commit: ', context)
        context.commit('SET_EBP_DETAILS_SESSIONS_SURVEYS', response.data)
      })

    },
    SURVEY_DETAILS (context) {
      // console.log('in SURVEY_DETAILS Action, check context here', context)
                
      const path = 'pct.cgi'
      const params = 'format=survey_details&staPa=' + context.state.selectedSite + '&dateRange=' + context.state.selectedRange
      // axios.get('pct.cgi?format=who')
      axios.get(`${path}?${params}`)
      .then(response => { 
        // console.log('got consult details from server')
        // console.log('response.data is: ', response.data)
        // console.log('check context before commit: ', context)
        context.commit('SET_SURVEY_DETAILS', response.data)
      })

    },
    SURVEY_TOTALS (context) {
      // console.log('in SURVEY_TOTALS Action, check context here', context)
                
      const path = 'pct.cgi'
      const params = 'format=survey_totals&staPa=' + context.state.selectedSite + '&dateRange=' + context.state.selectedRange
      // axios.get('pct.cgi?format=who')
      axios.get(`${path}?${params}`)
      .then(response => { 
        // console.log('got SURVEY_TOTALS  from server')
        // console.log('response.data is: ', response.data)
        // console.log('check context before commit: ', context)
        context.commit('SET_SURVEY_TOTALS', response.data)
      })

    },
    SURVEY_PATIENT_DETAILS (context) {
      // console.log('in SURVEY_PATIENT_DETAILS Action, check context here', context)
                
      const path = 'pct.cgi'
      const params = 'format=survey_patient_details&staPa=' + context.state.selectedSite + '&dateRange=' + context.state.selectedRange
      // axios.get('pct.cgi?format=who')
      axios.get(`${path}?${params}`)
      .then(response => { 
        // console.log('got SURVEY_PATIENT_DETAILS  from server')
        // console.log('response.data is: ', response.data)
        // console.log('check context before commit: ', context)
        context.commit('SET_SURVEY_PATIENT_DETAILS', response.data)
      })

    },
    PROVIDER_COUNT (context) {
      // console.log('in PROVIDER_COUNT Action, check context here', context)
                
      const path = 'pct.cgi'
      const params = 'format=provider_count&staPa=' + context.state.selectedSite + '&dateRange=' + context.state.selectedRange
      // axios.get('pct.cgi?format=who')
      axios.get(`${path}?${params}`)
      .then(response => { 
        // console.log('got PROVIDER_COUNT from server')
        // console.log('response.data is: ', response.data)
        // console.log('check context before commit: ', context)
        context.commit('SET_PROVIDER_COUNT', response.data)
      })

    },
    PROVIDER_DETAILS (context) {
      // console.log('in PROVIDER_DETAILS Action, check context here', context)
                
      const path = 'pct.cgi'
      const params = 'format=provider_details&staPa=' + context.state.selectedSite + '&dateRange=' + context.state.selectedRange
      // axios.get('pct.cgi?format=who')
      axios.get(`${path}?${params}`)
      .then(response => { 
        // console.log('got consult details from server')
        // console.log('response.data is: ', response.data)
        // console.log('check context before commit: ', context)
        context.commit('SET_PROVIDER_DETAILS', response.data)
      })

    },
    PROVIDER_INFO (context) {
      // console.log('in PROVIDER_INFO Action, check context here', context)
                
      const path = 'pct.cgi'
      const params = 'format=provider_info&staPa=' + context.state.selectedSite + '&dateRange=' + context.state.selectedRange
      // axios.get('pct.cgi?format=who')
      axios.get(`${path}?${params}`)
      .then(response => { 
        // console.log('got PROVIDER_INFO from server')
        // console.log('response.data is: ', response.data)
        // console.log('check context before commit: ', context)
        context.commit('SET_PROVIDER_INFO', response.data)
      })

    },
    PROVIDER_PATIENT_DETAILS_CPT (context) {
      // console.log('in PROVIDER_PATIENT_DETAILS_CPT Action, check context here', context)
                
      const path = 'pct.cgi'
      const params = 'format=provider_patient_details_cpt&staPa=' + context.state.selectedSite + '&dateRange=' + context.state.selectedRange
      // axios.get('pct.cgi?format=who')
      axios.get(`${path}?${params}`)
      .then(response => { 
        // console.log('got provider_patient_details_cpt from server', response.data)
        // console.log('check context before commit: ', context)
        context.commit('SET_PROVIDER_PATIENT_DETAILS_CPT', response.data)
      })

    },
    ENCOUNTER_PATIENT_LINE_CHART (context) {
      // console.log('in ENCOUNTER_PATIENT_LINE_CHART Action, check context here', context)
          
      const path = 'pct.cgi'
      const params = 'format=encounter_patient_line_chart&staPa=' + context.state.selectedSite + '&dateRange=' + context.state.selectedRange
      // axios.get('pct.cgi?format=who')
      axios.get(`${path}?${params}`)
      .then(response => { 
        // console.log('got ENCOUNTER_PATIENT_LINE_CHART from server')
        // console.log('ENCOUNTER_PATIENT_LINE_CHART response.data is: ', response.data)
        // console.log('check context before commit: ', context)
        context.commit('SET_ENCOUNTER_PATIENT_LINE_CHART', response.data)
      })

    }, 
    ENCOUNTER_LINE_CHART (context) {
      // console.log('in ENCOUNTER_LINE_CHART Action, check context here', context)
          
      const path = 'pct.cgi'
      const params = 'format=encounter_line_chart&staPa=' + context.state.selectedSite + '&dateRange=' + context.state.selectedRange
      // axios.get('pct.cgi?format=who')
      axios.get(`${path}?${params}`)
      .then(response => { 
        // console.log('got ENCOUNTER_LINE_CHART from server')
        // console.log('ENCOUNTER_LINE_CHART response.data is: ', response.data)
        // console.log('check context before commit: ', context)
        context.commit('SET_ENCOUNTER_LINE_CHART', response.data)
      })

    }, 
    ENCOUNTER_COUNT (context) {
      // console.log('in ENCOUNTER_CPT Action, check context here', context)
          
      const path = 'pct.cgi'
      const params = 'format=encounter_count&staPa=' + context.state.selectedSite + '&dateRange=' + context.state.selectedRange
      // axios.get('pct.cgi?format=who')
      axios.get(`${path}?${params}`)
      .then(response => { 
        // console.log('got ENCOUNTER_COUNT from server')
        // console.log('ENCOUNTER_COUNT response.data is: ', response.data)
        // console.log('check context before commit: ', context)
        context.commit('SET_ENCOUNTER_COUNT', response.data)
      })

    }, 
    ENCOUNTER_CPT (context) {
      // console.log('in ENCOUNTER_CPT Action, check context here', context)
          
      const path = 'pct.cgi'
      const params = 'format=encounter_cpt&staPa=' + context.state.selectedSite + '&dateRange=' + context.state.selectedRange
      // axios.get('pct.cgi?format=who')
      axios.get(`${path}?${params}`)
      .then(response => { 
        // console.log('got consult details from server')
        // console.log('ENCOUNTER_CPT response.data is: ', response.data)
        // console.log('check context before commit: ', context)
        context.commit('SET_ENCOUNTER_CPT', response.data)
      })

    },     
    ENCOUNTER_CPT_CATEGORIES_PSYCHOTHERAPY (context) {
      // console.log('in ENCOUNTER_CPT Action, check context here', context)
          
      const path = 'pct.cgi'
      const params = 'format=encounter_cpt_categories_psychotherapy&staPa=' + context.state.selectedSite + '&dateRange=' + context.state.selectedRange
      // axios.get('pct.cgi?format=who')
      axios.get(`${path}?${params}`)
      .then(response => { 
        // console.log('got ENCOUNTER_CPT_CATEGORIES_PSYCHOTHERAPY details from server')
        // console.log('ENCOUNTER_CPT_CATEGORIES_PSYCHOTHERAPY response.data is: ', response.data)
        // console.log('check context before commit: ', context)
        context.commit('SET_ENCOUNTER_CPT_CATEGORIES_PSYCHOTHERAPY', response.data)
      })

    },
    ENCOUNTER_CPT_CATEGORIES (context) {
      // console.log('in ENCOUNTER_CPT_CATEGORIES Action, check context here', context)
          
      const path = 'pct.cgi'
      const params = 'format=encounter_cpt_categories&staPa=' + context.state.selectedSite + '&dateRange=' + context.state.selectedRange
      // axios.get('pct.cgi?format=who')
      axios.get(`${path}?${params}`)
      .then(response => { 
        // console.log('got ENCOUNTER_CPT_CATEGORIES details from server')
        // console.log('ENCOUNTER_CPT_CATEGORIES response.data is: ', response.data)
        // console.log('check context before commit: ', context)
        context.commit('SET_ENCOUNTER_CPT_CATEGORIES', response.data)
      })

    },
    ENCOUNTER_PATIENT_CPT_CATEGORIES (context) {
      // console.log('in ENCOUNTER_CPT Action, check context here', context)
          
      const path = 'pct.cgi'
      const params = 'format=encounter_patient_cpt_categories&staPa=' + context.state.selectedSite + '&dateRange=' + context.state.selectedRange
      // axios.get('pct.cgi?format=who')
      axios.get(`${path}?${params}`)
      .then(response => { 
        // console.log('got ENCOUNTER_PATIENT_CPT_CATEGORIES details from server')
        // console.log('ENCOUNTER_PATIENT_CPT_CATEGORIES response.data is: ', response.data)
        // console.log('check context before commit: ', context)
        context.commit('SET_ENCOUNTER_PATIENT_CPT_CATEGORIES', response.data)
      })

    },
    APPOINTMENT_COUNT (context) {
      // console.log('in APP_COUNTS Action, check context here', context)
          
      const path = 'pct.cgi'
      const params = 'format=encounter_appt_count&staPa=' + context.state.selectedSite + '&dateRange=' + context.state.selectedRange
      // axios.get('pct.cgi?format=who')
      axios.get(`${path}?${params}`)
      .then(response => { 
        // console.log('got APP_COUNTS from server')
        // console.log('response.data is: ', response.data)
        // console.log('check context before commit: ', context)
        context.commit('SET_APPOINTMENT_COUNT', response.data)
      })

    },
    APPOINTMENT_CANCEL_NOSHOW_TOTALS (context) {
      // console.log('in APPOINTMENT_CANCEL_NOSHOW_TOTALS Action, check context here', context)
    
      const path = 'pct.cgi'
      const params = 'format=encounter_appt_cancel_noshow&staPa=' + context.state.selectedSite + '&dateRange=' + context.state.selectedRange
      // axios.get('pct.cgi?format=who')
      axios.get(`${path}?${params}`)
      .then(response => { 
        // console.log('got consult details from server')
        // console.log('response.data is: ', response.data)
        // console.log('check context before commit: ', context)
        context.commit('SET_APPOINTMENT_CANCEL_NOSHOW_TOTALS', response.data)
      })
      
    },
    APPOINTMENT_CLINIC_CANCEL_NOSHOW_TOTALS (context) {
      // console.log('in APPOINTMENT_CLINIC_CANCEL_NOSHOW_TOTALS Action, check context here', context)

      const path = 'pct.cgi'
      const params = 'format=encounter_appt_clinic_cancel_noshow&staPa=' + context.state.selectedSite + 
      '&dateRange=' + context.state.selectedRange

      axios.get(`${path}?${params}`)
      .then(response => { 
        // console.log('got consult details from server')
        // console.log('response.data is: ', response.data)
        // console.log('check context before commit: ', context)
        context.commit('SET_APPOINTMENT_CLINIC_CANCEL_NOSHOW_TOTALS', response.data)
      })
      
    },
    CONSULT_DATA (context) {
      // console.log('in CONSULT_DATA Action, check context here', context)
    
      const path = 'pct.cgi'
      const params = 'format=consult_data&staPa=' + context.state.selectedSite + '&dateRange=' + context.state.selectedRange
      // axios.get('pct.cgi?format=who')
      axios.get(`${path}?${params}`)
      .then(response => { 
        
        // convert string to object
        // console.log('in action CONSULT_DATA is: ', response.data)
        // console.log('response.data.pie is: ', response.data.pie)
        // console.log('response.data.line is: ', response.data.line)
      

        // console.log('check context before commit: ', context)
        context.commit('SET_CONSULT_DATA', response.data)

      })
    },
    CONSULT_DETAILS (context) {
      // console.log('in CONSULT_DETAILS Action, check context here', context)
    
      const path = 'pct.cgi'
      const params = 'format=consult_details&staPa=' + context.state.selectedSite + '&dateRange=' + context.state.selectedRange
      // axios.get('pct.cgi?format=who')
      axios.get(`${path}?${params}`)
      .then(response => { 
        // console.log('got consult details from server')
        // console.log('CONSULT_DETAILS response.data is: ', response.data)
        // console.log('check context before commit: ', context)
        context.commit('SET_CONSULT_DETAILS', response.data)
      })
    },
    USER_PERMISSIONS (context) {
      // need to obtain sites for permissions
      // console.log('before USER_PERMISSIONS call, context.state.selectedSite is: ', context.state.selectedSite)
      const path = 'pct.cgi'
      let staPa = context.state.selectedSite
      // let sta3nRegexp = /^(\d\d\d).+$/
      // let sta3nArr = sta3nRegexp.exec(staPa)
      // let sta3n = sta3nArr[1]
      // console.log('in user_permissions action, staPa is: ', staPa)
      // console.log('in user_permissions action, sta3n is: ', sta3n[1])
      const params = 'format=user_permissions&staPa=' + staPa
      // axios.get('pct.cgi?format=who')
      axios.get(`${path}?${params}`)
      .then(response => { 
        // console.log('in USER_PERMISSIONS, got this data back: ', response.data)
        //
        context.commit('SET_USER_PERMISSIONS', response.data[0])
      })

    },
    REFRESH_ALL_DATA (context) {
      // be sure provider info is updated with new site (primarily for providerlist)
      context.dispatch('PROVIDER_INFO')

      if (context.state.route.path == '/admin/consults') {
        // console.log('calling Action CONSULT_DETAILS')
        context.dispatch('CONSULT_DATA')
        context.dispatch('CONSULT_DETAILS')
      }
      if (context.state.route.path == '/admin/appointments') {
        // console.log('calling Action CANCEL_NO_SHOW_TOTALS')
        context.dispatch('APPOINTMENT_COUNT')    
        context.dispatch('APPOINTMENT_CLINIC_CANCEL_NOSHOW_TOTALS') 
        context.dispatch('APPOINTMENT_CANCEL_NOSHOW_TOTALS') 
      }
      if (context.state.route.path == '/admin/encounters') {
        // console.log('calling Actions ENCOUNTER_CPT & ENCOUNTER_CPT_CATEGORIES_PSYCHOTHERAPY')    
        context.dispatch('ENCOUNTER_COUNT')
        context.dispatch('ENCOUNTER_LINE_CHART')
        context.dispatch('ENCOUNTER_PATIENT_LINE_CHART')
        context.dispatch('ENCOUNTER_CPT_CATEGORIES_PSYCHOTHERAPY') 
        context.dispatch('ENCOUNTER_CATEGORIES_CPT') 
        context.dispatch('ENCOUNTER_CPT') 
        context.dispatch('ENCOUNTER_PATIENT_CPT_CATEGORIES') 
      }
      if (context.state.route.path == '/admin/providers') {
        // console.log('calling Actions PROVIDER_DETAILS & PROVIDER_INFO & PROVIDER_PATIENT_DETAILS_CPT')    
        context.dispatch('PROVIDER_COUNT') 
        context.dispatch('PROVIDER_DETAILS') 
        context.dispatch('PROVIDER_INFO') 
        context.dispatch('PROVIDER_PATIENT_DETAILS_CPT') 
      }
      if (context.state.route.path == '/admin/surveys') {
        // console.log('calling Actions PROVIDER_DETAILS & PROVIDER_INFO & PROVIDER_PATIENT_DETAILS_CPT')    
        context.dispatch('SURVEY_TOTALS')
        context.dispatch('SURVEY_DETAILS') 
        context.dispatch('SURVEY_PATIENT_DETAILS') 
      }
      if (context.state.route.path == '/admin/ebp') {
        // console.log('calling Actions PROVIDER_DETAILS & PROVIDER_INFO & PROVIDER_PATIENT_DETAILS_CPT')    
        context.dispatch('EBP_SUMMARY')
        context.dispatch('EBP_DETAILS')
        context.dispatch('EBP_PIE_CHART')
        context.dispatch('EBP_DETAILS_TYPES') 
        context.dispatch('EBP_DETAILS_SESSIONS_SURVEYS') 
      }

    },
    setSelectedSite (context, site) {
      // console.log('setSelectedSite triggered')
      // console.log('route.path is: ', context.state.route.path)
      context.commit('SET_SELECTED_SITE', site)

      context.dispatch('REFRESH_ALL_DATA')

    },
    setSelectedRange (context, range) {
      // console.log('setSelectedRange triggered')
      // console.log('route.path is: ', context.state.route.path)
      context.commit('SET_SELECTED_RANGE', range)

      context.dispatch('REFRESH_ALL_DATA')

    },
    CURRENT_USER (context) {
      const path = 'pct.cgi'
      const params = 'format=who'
      // console.log('getting user, axios get: ', `${path}?${params}`)
      axios.get(`${path}?${params}`)
        .then(response => { 
          // console.log('return from who: ', response)
          const remote_user = response.data[0]
          if (remote_user != undefined) {
            context.dispatch('setCurrentUser',
            {
              FirstName: remote_user.FirstName, 
              LastName: remote_user.LastName
            }
            )
          } else {
            context.dispatch('setCurrentUser',
            {
              FirstName: 'No', 
              LastName: 'User Retrieved'
            }
            )
          }
        })
    },
    setCurrentUser (context, user) {
      // console.log('in setCurrentUser w this user: ', user)

      context.commit('SET_CURRENT_USER', user)
    },
    getSelectedConsultComments (context, ConsultSID) {
      // console.log('In this action to get current ConsultSIDs Comments for: ', ConsultSID)
      var comments = ''
      // API call to get comments for this ConsultSID -- 1400071306050
      return new Promise((resolve, reject) => {
        axios.get('pct.cgi?format=consult_comments&consultsid=' + ConsultSID)
        .then(response => { 
          // alert('Got Data!')
          // console.log('consult_comments response is: ', response)
          // console.log('is response.data an array', Array.isArray(response.data))
          resolve(response.data)
        }, error => {
          reject(error)
        })
      })
    },
  },
  mutations: {
    SET_EBP_PIE_CHART(state, ebpPieChart) {
      // console.log('in mutate SET_EBP_SUMMARY and ebpSummary data : ', ebpSummary)
      state.ebpPieChart = ebpPieChart
    },
    SET_EBP_SUMMARY(state, ebpSummary) {
      // console.log('in mutate SET_EBP_SUMMARY and ebpSummary data : ', ebpSummary)
      state.ebpSummary = ebpSummary
    },
    SET_EBP_DETAILS(state, ebpDetails) {
      // console.log('in mutate SET_EBP_DETAILS and state is: ', state)
      state.ebpDetails = ebpDetails
    },
    SET_EBP_DETAILS_TYPES(state, ebpDetailsTypes) {
      // console.log('in mutate SET_EBP_DETAILS_TYPES and state is: ', state)
      state.ebpDetailsTypes = ebpDetailsTypes
    },
    SET_EBP_DETAILS_SESSIONS_SURVEYS(state, ebpDetailsSessionsSurveys) {
      // console.log('in mutate SET_EBP_DETAILS_SESSIONS_SURVEYS and state is: ', state)
      state.ebpDetailsSessionsSurveys = ebpDetailsSessionsSurveys
    },
    SET_SURVEY_TOTALS(state, surveyTotals) {
      // console.log('in mutate SET_SURVEY_DETAILS and state is: ', state)
      state.surveyTotals = surveyTotals
    },
    SET_SURVEY_DETAILS(state, surveyDetails) {
      // console.log('in mutate SET_SURVEY_DETAILS and state is: ', state)
      state.surveyDetails = surveyDetails
    },
    SET_SURVEY_PATIENT_DETAILS(state, surveyPatientDetails) {
      // console.log('in mutate SET_SURVEY_PATIENT_DETAILS and state is: ', state)
      state.surveyPatientDetails = surveyPatientDetails
    },
    SET_PROVIDER_COUNT(state, providerCount) {
      // console.log('in mutate SET_PROVIDER_COUNT and providerCount is: ', providerCount)
      state.providerCount = providerCount
    },
    SET_PROVIDER_DETAILS(state, providerDetails) {
      // console.log('in mutate SET_PROVIDER_DETAILS and state is: ', state)
      state.providerDetails = providerDetails
    },
    SET_PROVIDER_INFO(state, providerInfo) {
      // console.log('in mutate SET_PROVIDER_INFO and providerInfo is: ', providerInfo)
      state.providerInfo = providerInfo
    },
    SET_PROVIDER_PATIENT_DETAILS_CPT(state, providerPatientDetailsCPT) {
      // console.log('in mutate SET_PROVIDER_PATIENT_DETAILS_CPT and state is: ', state)
      state.providerPatientDetailsCPT = providerPatientDetailsCPT
    },
    SET_ENCOUNTER_PATIENT_CPT_CATEGORIES(state, encounterPatientCPTCategories) {
      // console.log('in mutate SET_ENCOUNTER_PATIENT_CPT_CATEGORIES and state is: ', state)
      state.encounterPatientCPTCategories = encounterPatientCPTCategories
    },
    SET_ENCOUNTER_PATIENT_LINE_CHART(state, encounterPatientLineChart) {
      // console.log('in mutate SET_ENCOUNTER_PATIENT_LINE_CHART and state is: ', state)
      state.encounterPatientLineChart = encounterPatientLineChart    
    },
    SET_ENCOUNTER_LINE_CHART(state, encounterLineChart) {
      // console.log('in mutate SET_ENCOUNTER_LINE_CHART and state is: ', state)
      state.encounterLineChart = encounterLineChart
    },
    SET_ENCOUNTER_COUNT(state, encounterCount) {
      // console.log('in mutate SET_ENCOUNTER_CPT and state is: ', state)
      state.encounterCount = encounterCount
    },
    SET_ENCOUNTER_CPT(state, encounterCPT) {
      // console.log('in mutate SET_ENCOUNTER_CPT and state is: ', state)
      state.encounterCPT = encounterCPT
    },
    SET_ENCOUNTER_CPT_CATEGORIES_PSYCHOTHERAPY(state, encounterCPTCategoriesPsychotherapy) {
      // console.log('in mutate SET_ENCOUNTER_CPT_CATEGORIES_PSYCHOTHERAPY and state is: ', state)  
      state.encounterCPTCategoriesPsychotherapy = encounterCPTCategoriesPsychotherapy
      // console.log('in mutate SET_ENCOUNTER_CPT_CATEGORIES_PSYCHOTHERAPY and state.encounterCPTCategoriesPsychotherapy is: ', state.encounterCPTCategoriesPsychotherapy)
    },
    SET_ENCOUNTER_CPT_CATEGORIES(state, encounterCPTCategories) {
      // console.log('in mutate SET_ENCOUNTER_CPT_CATEGORIES and state is: ', state)
      state.encounterCPTCategories = encounterCPTCategories
    },
    SET_CONSULT_DETAILS(state, consultDetails) {
      // console.log('in mutate SET_CONSULT_DETAILS and state is: ', state)
      state.consultDetails = consultDetails
    },
    SET_CONSULT_DATA(state, consultData) {
      // console.log('in mutate SET_CONSULT_DATA and consultData is: ', consultData)
      state.consultDataPie = consultData.pie
      state.consultDataLine = consultData.line
      state.consultDataCount = consultData.count
    },
    SET_APPOINTMENT_COUNT(state, appointmentCount) {
     // console.log('in mutate SET_CANCEL_NOSHOW_TOTALS and state is: ', state)
     state.encounterApptCount = appointmentCount
    },
    SET_APPOINTMENT_CLINIC_CANCEL_NOSHOW_TOTALS(state, appointmentClinicCancelNoShowTotals) {
      // console.log('in mutate SET_CANCEL_NOSHOW_TOTALS and state is: ', state)
      state.encounterApptClinicCancelNoShow = appointmentClinicCancelNoShowTotals
    },
    SET_APPOINTMENT_CANCEL_NOSHOW_TOTALS(state, appointmentCancelNoShowTotals) {
      // console.log('in mutate SET_CANCEL_NOSHOW_TOTALS and state is: ', state)
      state.encounterApptCancelNoShow = appointmentCancelNoShowTotals
    },
    SET_SELECTED_SITE (state, site) {
      // console.log('in mutate SET_SELECTED_SITE')
      state.selectedSite = site
    },
    SET_SELECTED_RANGE (state, range) {
      state.selectedRange = range
    },
    SET_CURRENT_USER (state, user) {
      // take the first record to get user
      state.userFirstName = user.FirstName
      state.userLastName = user.LastName
      // console.log('in SET_CURRENT_USER and state. userFirstName is: ', userFirstName)
      // console.log('in SET_CURRENT_USER and state. userLastName is: ', userLastName)   

      //   if (user[0].FirstName != undefined && user[0].LastName != undefine) {
      //   state.userFirstName = user.FirstName
      //   state.userLastName = user.LastName
      //   console.log('in SET_CURRENT_USER and state. userFirstName is: ', userFirstName)
      //   console.log('in SET_CURRENT_USER and state. userLastName is: ', userLastName)    
      // } else {
      //   state.userFirstName = 'No'
      //   state.userLastName = 'User Identified'
      // }
    },
    SET_USER_PERMISSIONS (state, userPermissions) {
      // userPermissions is an object with this format
      // {Surname: "Fielstein0", GivenName: "Elliot", ADAccount: "VHA09\VHATVHFIELSE0", PHIPII: "1", Sta3n: "653"}
      // set PHIPIII
      // console.log('in mutate SET_USER_PERMISSIONS with userPermissions: ', userPermissions)
      state.phipii = userPermissions.PHIPII
      state.adaccount = userPermissions.ADAccount
    },

      // SET_CURRENT_CONSULT_COMMENT (state, comments) {
    //   console.log('here I commit the current consult comment, that I will have gotten')
    //   // comments should be array
    //   const commentsType = typeof comments
    //   if (Array.isArray(comments)) { // should be an array
    //     let commentsString = ''
    //     const commentsText = comments
    //       .map((c) => {
    //         let string = c.ConsultActivityComment == null ? 'Comment Has No Text' : c.ConsultActivityComment
    //         console.log('string has a value of: ', string)
    //       })
    //     commentsString = commentsText.join('')
    //     state.currentComments = commentsString
    //   }
    // },
    
    // initialiseStore(state) {
    //   // Called after new Vuex.Store is instantiated
      
		// 	if(localStorage.getItem('store')) {
		// 		// Replace the state object with the stored item
		// 		this.replaceState(
		// 			Object.assign(state, JSON.parse(localStorage.getItem('store')))
    //     )
    //   }
		// }
  }

})


// called after mutation w/ its name, and its post mutation state
store.subscribe((mutation, state) => {
  // console.log('subscribe called')

  // prepare updated store w/ select subset of state
  let storedState = {
		selectedSite: state.selectedSite,
    selectedRange: state.selectedRange,
    userFirstName: state.userFirstName,
    userLastName: state.userLastName
  }
  // update localStorage with the mutated-changed store
  localStorage.setItem('store', JSON.stringify(storedState))
  
})

export default store