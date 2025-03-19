export const PCL5Administrations = [
  {
    title: 'PCL5 Administrations',
    value:
      'All PCL-5 listings include Weekly and Monthly versions of the PCL-5<br/><br/> ' +
      '<u><b>Description</b></u>: PCL-5s administered in a defined PCT clinic are displayed for the selected date range and from the selected site. <br/><br/> ' +
      'To identify PCL-5 administrations from PCT clinics we use the following stop codes in the primary position only: 562, 516, & 542.<br/><br/>' +
      '<u><b>NOTE</b></u>: Providers need to ensure the PCL is pushed into MHA (e.g., BHL upload to CPRS) to be displayed on dashboard and “count” toward MBC implementation. ',
    category: 'PCL5 Administrations Defined...'
  }
]

export const PCL5AdministrationsAndPatientEncounters = [
  {
    title: 'All Patients',
    value:
      '<u><b>ALL Patients</b></u>: The numerator includes unique patients seen in a  PTSD clinic (based on primary PTSD stop codes) who have been administered at least one PCL5 Weekly/Monthly for the selected date range and from the selected site.  The denominator includes all unique patients seen in a PTSD clinic (based on primary PTSD stop codes) for the selected date range and from the selected site.',
    category: 'Patients PCL5s Defined...'
  },
  {
    title: 'Patients Seen 2 or More Times',
    value:
      '<u><b>Patients Seen 2 or More Times</b></u>: The numerator includes unique patients seen in a PTSD clinic (based on primary PTSD stop codes) who have been administered 2 or more PCL5 Weekly/Monthly for the selected date range and from the selected site.  The denominator includes all unique patients seen <b>at least twice</b> in a PTSD clinic (based on primary PTSD stop codes) for the selected date range and from the selected site.',
    category: 'Patients PCL5s Defined...'
  }

]

export const PCL5AdministrationsAndProviders = [
  {
    title: 'Encounter Providers PCL5s',
    value:
      '<u><b>Encounter Providers PCL5s</b></u>: The numerator includes number of unique providers selected as primary providers in a PTSD clinic (based on primary PTSD Stop Codes) who have administered at least one PCL5 Weekly/Monthly for the selected date range and from the selected site.  The denominator includes number of providers selected as primary providers in a PTSD clinic (based on PTSD Stop Codes) for the selected date range and from the selected site. ',
    category: 'Providers Defined...'
  }

]

export const PCL5ProviderPatientPanels = [
  {
    title: 'PCL5 Providers PCL5 Patient Panels',
    value:
      '<u><b>Description</b></u>: These are the total number of surveys (measures) administered.  Only completed surveys are tallied and displayed here.',
    category: 'Proivder Patient Panels Defined...'
  }

]

export const SurveysSummary = [
  {
    title: 'Surveys Summary',
    value:
      '<u><b>Description</b></u>: These are the total number of surveys (measures) administered.  Only completed surveys are tallied and displayed here.',
    category: 'Surveys Summary Defined...'
  }
]

export const ClinicsProvidersPatients = [
  {
    title: 'Clinics',
    value:
      '<u><b>Description</b></u>: These are the number of PCT clinics administering surveys among all PCT clinics at this site. The intent is to show how many PCT Clinics ' +
      'are administering surveys in the course of their activities.<br/><br/>' +
      'The numerator is the number of PCT clinics (based on clinic PCT Stop Codes) administering surveys, and the denominator is the number of PCT clinics at this site.  ',
    category: 'Clinics, Providers, Patients Defined ...'
  },
  {
    title: 'Providers',
    value:
      '<u><b>Description</b></u>:These are the number of PCT providers administering surveys among all PCT providers at this site. The intent is to show how many PCT providers ' +
      'are administering surveys in the course of their activities.<br/><br/>' +
      'The numerator is the number of PCT providers (based on PCT Stop Codes) administering surveys, and the denominator is the number of PCT providers seeing patients at this site.<br/><br/>  ' +
      '<b>NOTE</b>: The numerator is sometimes larger than the denominator because trainees can select themselves when administering surveys but are not able to be providers in the encounters.  The denominator is the count of unique providers listed in the encounter and since trainees cannot be listed in the encounter they are not included in the denominator.',
    category: 'Clinics, Providers, Patients Defined ...'
  },
  {
    title: 'Patients',
    value:
      '<u><b>Description</b></u>:These are the number of PCT patients administering surveys among all PCT patients at this site. The intent is to show the relative percentage of PCT patients ' +
      'are administerered surveys in the course of their assessment/treatment.<br/><br/>' +
      'The numerator is the number of PCT patients (based on PCT Stop Codes) being administered surveys, and the denominator is the number of PCT patients with encounters at this site.  ',
    category: 'Clinics, Providers, Patients Defined ...'
  }
]

export const SurveyTypesGiven = [
  {
    title: 'SurveyTypesGiven',
    value:
      '<u><b>Description</b></u>: These are the counts of the different surveys (measures) administered within PCT clinics at this location. ',
    category: 'Survey Types Given Defined...'
  }
]

export const SurveysToPatientsByProvider = [
  {
    title: 'Surveys To Patients By Provider',
    value:
      '<u><b>Description</b></u>: The Surveys to Patients by Provider table lists all of the surveys and survey scores administered to each patient seen in the PCT clinic associated with the survey administration.  The provider associated with that clinic is displayed. ' +
      "<br/><br/><font color='red'><b>NOTE:</b></font> While most survey are listed in the table with a total score on one table row, screening measures (e.g., PHQ2-I9; CSSRS) are listed by individual item score (one item per row). As a result, at first glance it may appear that a screening measure is incorrectly duplicated, but a closer look will reveal the multiple rows are correctly listing item level scores. ",
    category: 'Surveys To Patients By Provider Defined...'
  }
]

