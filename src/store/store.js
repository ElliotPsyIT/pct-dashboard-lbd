import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

import { addCommas, totalAndPercent } from '../utils'
import siteNames from '../../static/sites.json'
import dateRanges from '../../static/dateRanges.json'

//Consults
import consultCounts from '../../static/consult_count.json'
import consultStatusCounts from '../../static/consult_pie_chart.json'
import consultLineChart from '../../static/consult_line_chart.json'
// import consultDetails from '../../static/consult_details.json'

// Encounters
import encounterCounts from '../../static/encounter_count.json'
import encounterLineChart from '../../static/encounter_line_chart.json'
import encounterPatientLineChart from '../../static/encounter_patient_line_chart.json'
import encounterCPT from '../../static/encounter_cpt.json'
import encounterCPTCategories from '../../static/encounter_cpt_categories.json'
import encounterPatientCPTCategories from '../../static/encounter_patient_cpt_categories.json'

// Encounter Appointments
import encounterApptCounts from '../../static/encounter_appointment_count.json'
import encounterApptCancelNoShow from '../../static/encounter_appointment_cancel_noshow.json'
import encounterApptClinicCancelNoShow from '../../static/encounter_appointment_clinic_cancel_noshow.json'

// Providers
import providerCount from '../../static/provider_count.json'
import providerInfo from '../../static/provider_info.json'
import providerDetail from '../../static/provider_details.json'
import providerDetailCPT from '../../static/provider_details_cpt.json'
import providerPatientDetailCPT from '../../static/provider_patient_details_cpt.json'

// Surveys
import surveyTotals from '../../static/survey_totals.json'
import surveyDetails from '../../static/survey_details.json'
import surveyPatientDetails from '../../static/survey_patient_details.json'

// EBP
import ebpCount from '../../static/ebp_count.json'
import ebpInfo from '../../static/ebp_info.json'
import ebpDetail from '../../static/ebp_details.json'
import ebpDetailSessionsSurveys from '../../static/ebp_details_sessions_and_surveys.json'
import ebpTypeCounts from '../../static/ebp_pie_chart.json'
import ebpDetailsTypes from '../../static/ebp_details_types.json'
import ebpSummary from '../../static/ebp_summary.json'
import ebpPatientsCPTCategories from '../../static/ebp_patient_cpt_categories.json'

Vue.use(Vuex)

// Access localStorage for previously stored site and daterange
const localStorage = window.localStorage
let storeLocal = {}

// if no saved store, then  initialize certain default values
if(localStorage.getItem('store')) {
  storeLocal = JSON.parse(localStorage.getItem('store'))
}


const store = new Vuex.Store({
  state: {
    // selectedSite,
    selectedSite: storeLocal.selectedSite || '512',
    selectedRange: storeLocal.selectedRange || 'threemonths',
    userFirstName: storeLocal.userFirstName || 'No',
    userLastName: storeLocal.userLastName || 'User Name',
    siteNames,
    dateRanges,
    
    consultCounts,
    consultStatusCounts,
    consultDetails : [],
    consultLineChart,

    encounterCounts,
    encounterLineChart,
    encounterPatientLineChart,
    encounterCPT,
    encounterCPTCategories,
    encounterPatientCPTCategories,

    encounterApptCancelNoShow,
    encounterApptCounts,
    encounterApptClinicCancelNoShow,

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
    ebpDetail,
    ebpDetailSessionsSurveys,
    ebpTypeCounts,
    ebpDetailsTypes,
    ebpSummary,
    ebpPatientsCPTCategories,

  },
  getters: {
    siteConsultTotal: (state) => {
      // console.log('in store getters, state is: ', state)
      // console.log('in siteConsultTotal, stateconsultCounts is: ', state.consultCounts)
      let filteredArray = state.consultCounts
        .filter(site => {
          // console.log('site.StaPa', site.StaPa)
          // console.log('state.selectedSite', state.selectedSite)
          return site.StaPa === state.selectedSite
        })
        .filter(site => site.dataType === 'consultCount')
      //  console.log('ConsultTotal filteredArray is: ', filteredArray)
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
      // console.log('PendingTotal is: ', filteredArray)
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
      console.log('in getter siteConsultDetails')
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

    // encounters: distinct VisitSID, not CPTCode filtering
    siteEncounterTotal: (state) => {
      let filteredArray = state.encounterCounts
        .filter(site => site.Sta3n === state.selectedSite)
        .filter(site => site.dataType === 'encountersCount')
      // console.log('Encounter Total is: ', filteredArray)
      return addCommas(filteredArray[0].countTotal)
    },
    // encounters: distinct PatientSID, no CPTCode filtering
    siteEncounterPatientTotal: (state) => {
      let filteredArray = state.encounterCounts
        .filter(site => site.Sta3n === state.selectedSite)
        .filter(site => site.dataType === 'patientCount')
      // console.log('Encounter Patient Total is: ', filteredArray)
      return addCommas(filteredArray[0].countTotal)
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
    // total for each CPTs no categorizing and no filtering
    siteEncounterCPTTotal: (state) => {
      let filteredArray = state.encounterCPT
        .filter(site => site.Sta3n === state.selectedSite)
      filteredArray.forEach(function (rec) {
        rec.encountersPerCPT = Number(rec.encountersPerCPT)
      })
      return filteredArray
    },
    // total for each CPTCategory (large set of CPTs) and no category filtering
    siteEncounterCPTCategories: (state) => {
      let filteredArray = state.encounterCPTCategories
        .filter(site => site.Sta3n === state.selectedSite)
      return filteredArray
    },
    // total for Ind Therapy CPT Category (large set of CPTs)
    siteEncounterCPTIndividual: (state) => {
      let filteredArray = state.encounterCPTCategories
        .filter(site => site.Sta3n === state.selectedSite) 
        .filter(site => site.CPTCategory === 'Individual Psychotherapy')
      return totalAndPercent(filteredArray)
    },
    // total for Grp Therapy CPT Category (large set of CPTs)
    siteEncounterCPTGroup: (state) => {
      let filteredArray = state.encounterCPTCategories
        .filter(site => site.Sta3n === state.selectedSite) 
        .filter(site => site.CPTCategory === 'Group Psychotherapy')
      return totalAndPercent(filteredArray)
    },
    // total for Tele CPT Category (large set of CPTs)
    siteEncounterCPTTelephone: (state) => {
      let filteredArray = state.encounterCPTCategories
        .filter(site => site.Sta3n === state.selectedSite) 
        .filter(site => site.CPTCategory === 'Telephone')
      return totalAndPercent(filteredArray)
    },
    // total for Prolonged Service CPT Category (large set of CPTs)
    siteEncounterCPTProlongedService: (state) => {
      let filteredArray = state.encounterCPTCategories
        .filter(site => site.Sta3n === state.selectedSite) 
        .filter(site => site.CPTCategory === 'Prolonged Service')
      return totalAndPercent(filteredArray)
    },
    // total for Specific CPT Category (large set of CPTs)
    siteEncounterCPTAssessment: (state) => {
      let filteredArray = state.encounterCPTCategories
        .filter(site => site.Sta3n === state.selectedSite) 
        .filter(site => site.CPTCategory === 'Assessment')
      return totalAndPercent(filteredArray)
    },
    // total for Specific CPT Category (large set of CPTs)
    siteEncounterCPTGroupEducation: (state) => {
      let filteredArray = state.encounterCPTCategories
        .filter(site => site.Sta3n === state.selectedSite) 
        .filter(site => site.CPTCategory === 'Health and Behavior (Group) Education')
      return totalAndPercent(filteredArray)
    },

    // like siteEncounterCPTIndividual's large CPTs - but Ind Therapy Category and no Grp Therapy
    siteEncounterCPTPatientsIndOnly: (state) => {
      //encounterPatientCPTCategories
      // console.log('state.encounterPatientCPTCategories', state.encounterPatientCPTCategories)
      let filteredArray = state.encounterPatientCPTCategories
        .filter(site => site.Sta3n === state.selectedSite) 
        .filter(site => site.TherapyType === 'IndividualOnly')
      return filteredArray[0].NumPsychotherapyByType
    },
    // like siteEncounterCPTGroup's large CPTs - but Grp Therapy Category and no Ind Therapy
    siteEncounterCPTPatientsGrpOnly: (state) => {
      //encounterPatientCPTCategories
      let filteredArray = state.encounterPatientCPTCategories
        .filter(site => site.Sta3n === state.selectedSite) 
        .filter(site => site.TherapyType === 'GroupOnly')
      return filteredArray[0].NumPsychotherapyByType
    },
    // like above two but w/ both Ind and Grp Therapy
    siteEncounterCPTPatientsBoth: (state) => {
      //encounterPatientCPTCategories
      let filteredArray = state.encounterPatientCPTCategories
        .filter(site => site.Sta3n === state.selectedSite) 
        .filter(site => site.TherapyType === 'Both')
      return filteredArray[0].NumPsychotherapyByType
    },
    // like above two but w/ either Ind or Grp Therapy
    siteEncounterCPTPatientsEither: (state) => {
      //encounterPatientCPTCategories
      let filteredArray = state.encounterPatientCPTCategories
        .filter(site => site.Sta3n === state.selectedSite) 
        .filter(site => site.TherapyType === 'Either')
      return filteredArray[0].NumPsychotherapyByType
    },

    //encounter appointment
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
      let filteredArray = state.encounterApptCounts
        .filter(site => site.Sta3n === state.selectedSite)
      return addCommas(filteredArray[0].appointmentCount)
    },
    siteEncounterApptTotal: (state) => { // without commas for computation
      let filteredArray = state.encounterApptCounts
        .filter(site => site.Sta3n === state.selectedSite)
      return filteredArray[0].appointmentCount
    },
    siteEncounterApptClinicNoShowTotal: (state) => {
      // console.log('the clinic cancel noshow from json: ', state.encounterApptClinicCancelNoShow)
      let filteredArray = state.encounterApptClinicCancelNoShow
        .filter(site => {
          // console.log('in filter, site.Sta3n is: ', site.Sta3n)
          return site.Sta3n == state.selectedSite
        })
        // console.log('filteredArray is: ', filteredArray)
        return filteredArray  
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
    siteProviderList: (state) => {
      let filteredArray = state.providerInfo
        .filter(site => site.Sta3n === state.selectedSite)
        .map(site => site.STAFFNAME )
      //unique the provider names
      filteredArray = filteredArray.filter((el, i, a) => i === a.indexOf(el))
      return filteredArray // array of staffname objects?
    },
    siteProviderPatientDetailCPT: (state) => {
      // console.log('state.selectedSite: ', state.selectedSite)
      let filteredArray = state.providerPatientDetailCPT
        .filter(site => {
          // console.log('site.Sta3n: ', site.Sta3n)
          // console.log('site.StaPa: ', site.StaPa)
          return site.Sta3n === state.selectedSite
        })
        // console.log('siteProviderPatientDetailCPT filteredArray', filteredArray)
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
      return filteredArray
    },
    siteSurveyPatientDetails: (state) => {
      let filteredArray = state.surveyPatientDetails
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.StaffName != 'NULL')
      // console.log('filteredArray', filteredArray)
      return filteredArray
    },

    // revised EBPs from Matt and Erin
    siteEBPSessionsAny: (state) => {
      let filteredArray = state.ebpSummary
      .filter(site => site.StaPa === state.selectedSite)
      .filter(site => site.dataType === 'ebp_sessions')
      return filteredArray[0].sumTotal
    },
    siteALLSessions: (state) => {      
      let filteredArray = state.ebpSummary
      .filter(site => site.StaPa === state.selectedSite)
      .filter(site => site.dataType === 'all_sessions')
      return filteredArray[0].sumTotal
    },
    // no all program EBP patient totals akin to the above session totals
    siteEBPPatientsAny: (state) => {
      let filteredArray = state.ebpSummary
      .filter(site => site.StaPa === state.selectedSite)
      .filter(site => site.dataType === 'ebp_patients')
      return filteredArray[0].sumTotal
    },
    siteEBPSessionsPECPT: (state) => {      
      let filteredArray = state.ebpSummary
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.dataType === 'ebp_sessions_pe_cpt')
      return filteredArray[0].sumTotal
    },
    siteEBPPatientsPECPT: (state) => {      
      let filteredArray = state.ebpSummary
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.dataType === 'ebp_patients_pe_cpt')
      return filteredArray[0].sumTotal
    },
    siteALLPatients: (state) => {      
      let filteredArray = state.ebpSummary
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.dataType === 'all_patients')
      // console.log('siteALLPatients filteredArray[0]: ', filteredArray[0] )
      return filteredArray[0].sumTotal
    },
    siteEBPSessionsInd: (state) => {      
      let filteredArray = state.ebpSummary
    .filter(site => site.StaPa === state.selectedSite)
    .filter(site => site.dataType === 'ebp_sessions_ind')
      return filteredArray[0].sumTotal
    },
    siteALLSessionsInd: (state) => {      
      let filteredArray = state.ebpSummary
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.dataType === 'all_sessions_ind')
      return filteredArray[0].sumTotal
    },
    siteEBPPatientsInd: (state) => {      
      let filteredArray = state.ebpSummary
    .filter(site => site.StaPa === state.selectedSite)
    .filter(site => site.dataType === 'ebp_patients_ind')
      return filteredArray[0].sumTotal
    },
    siteALLPatientsInd: (state) => {      
      let filteredArray = state.ebpSummary
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.dataType === 'all_patients_ind')
      return filteredArray[0].sumTotal
    },
    siteEBPSessionsGrp: (state) => {
      let filteredArray = [];
      filteredArray = state.ebpSummary
    .filter(site => site.StaPa === state.selectedSite)
    .filter(site => site.dataType === 'ebp_sessions_grp')
    return filteredArray.length == 0 ? 0 : filteredArray[0].sumTotal
    // return arrayEmpty(filteredArray) ? 0 : filteredArray[0].sumTotal
    },
    siteALLSessionsGrp: (state) => {      
      let filteredArray = state.ebpSummary
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.dataType === 'all_sessions_grp')
        return filteredArray[0].sumTotal
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
      return filteredArray[0].sumTotal
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
      return filteredArray.length == 0 ? 0 : filteredArray[0].totalNum
      // return filteredArray[0].totalNum
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
    siteEBPProvidersPEI: (state) => {
      let filteredArray = state.ebpInfo
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.dataType === 'ebpProvidersPEI')
      return filteredArray.length == 0 ? 0 : filteredArray[0].totalNum
      // return filteredArray[0].totalNum
    },
    siteEBPProvidersCPT: (state) => {
      let filteredArray = state.ebpInfo
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.dataType === 'ebpProvidersCPT')
      return filteredArray[0].totalNum
    },
    siteEBPPatients: (state) => {
      let filteredArray = state.ebpInfo
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.dataType === 'ebpPatients')
      return filteredArray[0].totalNum
    },
    siteEBPPatientsAll: (state) => {
      let filteredArray = state.ebpInfo
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.dataType === 'ebpPatientsAll')
      return filteredArray[0].totalNum
    },
    siteEBPPatientsPEI: (state) => {
      let filteredArray = state.ebpInfo
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.dataType === 'ebpPatientsPEI')
      return filteredArray.length == 0 ? 0 : filteredArray[0].totalNum
      // return filteredArray[0].totalNum
    },
    siteEBPPatientsCPT: (state) => {
      let filteredArray = state.ebpInfo
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.dataType === 'ebpPatientsCPT')
      return filteredArray[0].totalNum
    },
    siteEBPClinicSummary: (state) => {
      let filteredArray = state.ebpDetail
        .filter(site => {
          // console.log('site.StaPa is: ', site.StaPa)
          // console.log('state.selectedSite is: ', state.selectedSite)
          // ** Note: selectedSite is cast to number for comparison
          return site.StaPa === state.selectedSite
        })
        // console.log('from siteEBPClinicSummary: ', filteredArray)
      return filteredArray
    },
    siteEBPClinicSessionsSurveys: (state) => {
      let filteredArray = state.ebpDetailSessionsSurveys
        .filter(site => {
          // console.log('site.StaPa is: ', site.StaPa)
          // console.log('state.selectedSite is: ', state.selectedSite)
          // ** Note: selectedSite is cast to number for comparison
          return site.StaPa === state.selectedSite
        })
        // console.log('from siteEBPClinicSummary: ', filteredArray)
      return filteredArray
    },
    // ebpDetailSessionSurvey
    siteEBPPieChartSeries: (state) =>{
      // build series based on selected site
      // console.log('consultStatusCounts is: ', state.consultStatusCounts)
      let mappedArray = state.ebpTypeCounts
        .filter(site => site.StaPa === state.selectedSite)
        .map((status) => { return [status.HealthFactorCategoryShort, +status.Num] })
      // console.log('pie chart series is: ', mappedArray)
      return mappedArray  
    },
    siteEBPDetailsTypes: (state) => {
      let filteredArray = state.ebpDetailsTypes
        .filter(site => site.StaPa === state.selectedSite)
      // console.log('filteredArray', filteredArray)
      return filteredArray
    },

    siteEBPPatientsCPTIndividualOnly: (state) => {
      let filteredArray = state.ebpPatientsCPTCategories
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.TherapyType === 'IndividualOnly')
      return filteredArray[0] ? filteredArray[0].NumPsychotherapyByType : 0
    },
    siteEBPPatientsCPTGroupOnly: (state) => {
      let filteredArray = state.ebpPatientsCPTCategories
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.TherapyType === 'GroupOnly')
      return filteredArray[0] ? filteredArray[0].NumPsychotherapyByType : 0
    },
    siteEBPPatientsCPTBoth: (state) => {
      let filteredArray = state.ebpPatientsCPTCategories
        .filter(site => site.StaPa === state.selectedSite)
        .filter(site => site.TherapyType === 'Both')
        // console.log('for both filteredArray is: ', filteredArray)
      return filteredArray[0] ? filteredArray[0].NumPsychotherapyByType : 0
    },

  },
  actions: {
    CONSULT_DETAILS (context) {
      console.log('in CONSULT_DETAILS Action, check context here', context)
    
      const path = 'pct.cgi'
      const params = 'format=consult_details&sta3n=' + context.state.selectedSite
      // axios.get('pct.cgi?format=who')
      axios.get(`${path}?${params}`)
      .then(response => { 
        console.log('got consult details from server')
        console.log('response.data is: ', response.data)
        console.log('check context before commit: ', context)
        context.commit('SET_CONSULT_DETAILS', response.data)
      })
    },
    setSelectedSite (context, site) {
      // console.log('action: selSelectedSite context: ', context)
      context.commit('SET_SELECTED_SITE', site)
      console.log('commited this new site:', site)
      console.log('calling Action CONSULT_DETAILS')
      context.dispatch('CONSULT_DETAILS', site)
    },
    setSelectedRange (context, range) {
      context.commit('SET_SELECTED_RANGE', range)
    },
    setCurrentUser (context, user) {
      // console.log('in setCurrentUser w this user: ', user)
      context.commit('SET_CURRENT_USER', user)
    },
    setUserPermissions (context, userPermissions) {
      // need to obtain sites for permissions
      context.commit('SET_USER_PERMISSIONS', userPermissions)
    },
    getSelectedConsultComments (context, ConsultSID) {
      // console.log('In this action to get current ConsultSIDs Comments for: ', ConsultSID)
      var comments = ''
      // API call to get comments for this ConsultSID -- 1400071306050
      return new Promise((resolve, reject) => {
        axios.get(`pct.cgi?elliot=1&format=consult_comments&consultsid=${ConsultSID}`)
        .then(response => { 
          // alert('Got Data!')
          // console.log('response.data is: ', response.data)
          // console.log('is response.data an array', Array.isArray(response.data))
          resolve(response.data)
        }, error => {
          reject(error)
        })
      })
    },
  },
  mutations: {
    SET_CONSULT_DETAILS(state, consultDetails) {
      console.log('in mutate SET_CONSULT_DETAILS and state is: ', state)
      state.consultDetails = consultDetails
    },
    SET_SELECTED_SITE (state, site) {
      console.log('in mutate SET_SELECTED_SITE')
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
      // iterate through records and pull sites and their PHIPII
      // Create an object 
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

// Init store from localStorage on load
// store.commit("initialiseStore");

// called after mutation w/ its name, and its post mutation state
store.subscribe((mutation, state) => {
  console.log('subscribe called')

  // prepare updated store
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