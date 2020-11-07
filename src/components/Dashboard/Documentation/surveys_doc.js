export const SurveysSummary = [
  {
    title: "Surveys Summary",
    value:
      "<u><b>Description</b></u>: These are the total number of surveys (measures) administered.  Only completed surveys are tallied and displayed here.",
    category: "Surveys Summary Defined...",
  },
];

export const ClinicsProvidersPatients = [
  {
    title: "Clinics",
    value:
      "<u><b>Description</b></u>: These are the number of PCT clinics administering surveys among all PCT clinics at this site. The intent is to show how many PCT Clinics " +
      "are administering surveys in the course of their activities.<br/><br/>" +
      "The numerator is the number of PCT clinics (based on clinic PCT Stop Codes) administering surveys, and the denominator is the number of PCT clinics at this site.  ",
    category: "Clinics, Providers, Patients Defined ...",
  },
  {
    title: "Providers",
    value:
      "<u><b>Description</b></u>:These are the number of PCT providers administering surveys among all PCT providers at this site. The intent is to show how many PCT providers " +
      "are administering surveys in the course of their activities.<br/><br/>" +
      "The numerator is the number of PCT providers (based on PCT Stop Codes) administering surveys, and the denominator is the number of PCT providers seeing patients at this site.<br/><br/>  " +
      "<b>NOTE</b>: The numerator is sometimes larger than the denominator because trainees can select themselves when administering surveys but are not able to be providers in the encounters.  The denominator is the count of unique providers listed in the encounter and since trainees cannot be listed in the encounter they are not included in the denominator.",
    category: "Clinics, Providers, Patients Defined ...",
  },
  {
    title: "Patients",
    value:
      "<u><b>Description</b></u>:These are the number of PCT patients administering surveys among all PCT patients at this site. The intent is to show the relative percentage of PCT patients " +
      "are administerered surveys in the course of their assessment/treatment.<br/><br/>" +
      "The numerator is the number of PCT patients (based on PCT Stop Codes) being administered surveys, and the denominator is the number of PCT patients with encounters at this site.  ",
    category: "Clinics, Providers, Patients Defined ...",
  },
];

export const SurveyTypesGiven = [
  {
    title: "SurveyTypesGiven",
    value:
      "<u><b>Description</b></u>: Theses are counts of the number of surveys (measures) administered within PCT clinics at this site. ",
    category: "Survey Types Given Defined...",
  },
];

export const SurveysToPatientsByProvider = [
  {
    title: "Surveys To Patients By Provider",
    value:
      "<u><b>Description</b></u>: The Surveys To Patients By Provider table lists the surveys and survey scores administered to each patient by each provider in each PCT Clinic. " +
      "<br/><br/><font color='red'><b>NOTE:</b> While most PCT administered surveys are listed in the table with a total score on one table row (e.g. PCL-5, PHQ9), several of the FY19 screening measures are listed by individual item score - one row per item (e.g. PHQ2-I9, CSSRS). " +
      "As a result, at first glance it may appear that a screening measure is incorrectly duplicated, but a closer look will reveal the multiple rows are correctly listing item level scores. ",
    category: "Surveys To Patients By Provider Defined...",
  },
];
