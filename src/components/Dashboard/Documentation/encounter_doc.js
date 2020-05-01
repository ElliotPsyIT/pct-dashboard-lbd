export const encountersAll = [
    {
      title: "PCT Clinic (Stop Code) Definition",
      value: "<u><b>Description</b></u>: Encounters conducted in all defined PCT Clinics are display for the selected date range and from the selected site. " +
      " PCT Clinics at the medical center are set up within VistA configured using one or more stop codes.<br/><br/>" + 
      "<b>Stop Codes:</b> To identify encounters from PCT Clinics, we use the following PTSD stop codes:<br/><br/>" +
      "<u>516 PTSD - Group</u>:<br/>" +
      "&nbsp;&nbsp;&nbsp; Records consultation and/or treatment follow-up provided to more than one individual.  " + 
      "Treatment is provided to those patients with PTSD.  Includes provider and support services.  " + 
      "Use the assigned CHAR4 Code if this activity takes place through a designated NEPEC PTSD Clinical Team (PCT).<br/><br/>" +
      "<u>542 Telephone PTSD</u>:<br/>"	+ 
      "&nbsp;&nbsp;&nbsp;Records patient consultation or medical care management, advice, and/or referral provided by telephone contact " + 
      "between patient or patient's next-of-kin and/or the person(s) with whom the patient has a meaningful relationship, and clinical and/or professional staff assigned to the PCT.  <br/>" + 
      "<u>562 PTSD - Individual</u><br/>" +
      "&nbsp;&nbsp;&nbsp;Records patient visit for consultation, evaluation, follow-up, and/or treatment provided to an individual with PTSD.  Use the assigned CHAR4 Code if this activity takes place through a NEPEC PTSD Clinical Team (PCT).  Includes provider and support services.",
      category: "Encounters and Patients Defined..."
    },
    {
      title: "PCT Encounter (CPT Procedure Codes) Definition",
      value: "<u><b>Procedure Codes</b></u>: PCT Encounters are pulled from among encounters conducting assessment, treatment and education activities.  These activities are identified use the following set of specific CPT procedure codes.<br/><br/>" +
      "<u>Assessment</u>: <br/>('90791', '90792')<br/><br/>" +
      "<b>NOTE: Encounters may have multiple CPT procedure codes attached to an encounter.  When we count encounters by their procedure code, e.g. Individual Psychotherapy, we count the encounter regardless of any other procedure code may be attached to the encounter. " + 
      "As a result, encounters may be counted multiple times, once for each procedure code attached to an encounter.<br/><br/>" +
      "<u>Individual Therapy</u>: <br/>('90832', '90833', '90834', '90836', '90837', '90838')<br/><br/>" +
  "<u>Group Psychotherapy</u>: <br/>('90853')<br/><br/>" +
  "<u>Interactive Complexity</u>: <br/>('90785')<br/><br/>" + 
  "<u>Crisis Intervention</u>: <br/>('90839', '90840', 'H2011', 'S9484')<br/><br/>" +
  "<u>Prolonged Service</u>: <br/>('99354', '99355', '99356', '99357')<br/><br/>" +
  "<u>Family Services</u>: <br/>('90846', '90847', '90849', '90887')<br/><br/>" +
  "<u>Health and Behavior (Family) Education</u>: <br/>('96154', '96155')<br/><br/>" +
  "<u>Health and Behavior (Individual) Education</u>: <br/>('96150', '96151', '96152')<br/><br/>" +
  "<u>Health and Behavior (Group) Education</u>: <br/>('96153', '98961', '98962', '99078', 'S9446', 'S9449', 'S9452', 'S9453', 'S9454')<br/><br/>" +
  "<u>Team Conference</u>: <br/>('99366', '99367', '99368')<br/><br/>" +
  "<u>Case Management</u>: <br/>('T1016')<br/><br/>" +
  "<u>Telephone</u>: <br/>('98966', '98967', '98968', '99441', '99442', '99443')<br/><br/>" +
  "<u>Other</u>: <br/>('90863', '90885', '90889', 'H0038', 'H2027')<br/><br/>",
      category: "Encounters and Patients Defined..."
    },
    {
      title: "Total Encounters and Patient Uniques",
      value: "<u><b>Total Encounters</b></u>: From all PCT Clinics defined using the above listed stop codes, all encounters tagged with the above listed CPT codes were pulled and summarized. " + 
      "<br/><br/><u><b>Patient Uniques:</b></u>: The unique patients from these PCT clinic encounter are also totalled. " + 
      "<br/><br/>", 
      category: "Encounters and Patients Defined..."
    },
  ]
  
  export const encountersPsychotherapy = [
    {
      title: "Individual Psychotherapy",
      value: "<u><b>Numerator</b></u>: Total Encounters from all PCT Clinics with the following subset of Individual Tx CPT codes:<br/><br/>" + 
      "<u><b>SPECIAL NOTE</u></b>: Individual Psychotherapy encounters frequently have multiple primay procedure codes associated with them.  " + 
      "We count an encounter as individual psychotherapy session if it has an Individual Therapy procedure code (below) whether it has other CPT codes along with it or not. " + 
      "That means one Individual Therapy encounter also may be counted in another category (e.g. Prolonged Service) if the encounter has both types of CPT codes lised for it </b></u>:" +
      "&nbsp;&nbsp;&nbsp; <u>Individual Therapy</u>: (incl. 1 Crisis Code AND 2 Family Codes): <br/>" +
      "('90832', '90834', '90837', '90839', '90847', '90849')<br/><br/>" +
      "<b>Denominator</b>: Total Encounters from all PCT Clinic regardless of type of service provided.<br/><br/>",
      category: "Psychotherapy Encounters Defined ..."

    },
    {
      title: "Group Psychotherapy",
      value: "<u><b>Numerator</b></u>: Total Encounters from all PCT Clinics with the following Group Tx CPT codes:<br/><br/>" +
      "&nbsp;&nbsp;&nbsp; <u>Group Therapy</u>: <br/>('90853')<br/><br/>" +
      "<b>Denominator</b>: Total Encounters from all PCT Clinic regardless of type of service provided.<br/><br/>",
      category: "Psychotherapy Encounters Defined ..."

    }
  ]

  export const encounterTelehealthInd = [
    {
      title: "Face To Face - Individual Therapy",
      value: "<u><b>Face To Face</u></b> counts represent the sum total of individual therapy encounters that DO NOT have a Telehealth Secondary Stop Code.  " +
      "Therefore, these non-telehealth Individual Therapy encounters occurred face-to-face.<br/><br/>" +
      "The non-Telehealth Individual Therapy codes are the same as used elsewhere on this Encounters page.  " + 
      "The sessions are from all PCT Clinics with the following subset of Individual Tx CPT codes:<br/><br/>" + 
      "&nbsp;&nbsp;&nbsp; <u>Individual Therapy</u>: (incl. 1 Crisis Code AND 2 Family Codes): <br/>" +
      "('90832', '90834', '90837', '90839', '90847', '90849')<br/><br/>",
      category: "Individual Telehealth Encounters Defined ..."

    },
    {
      title: "Telehealth to Home - Individual Therapy",
      value: "<u><b>Telehealth to Home</b></u> counts represent the sum total of individual therapy encounters that have a Telehealth Secondary Stop Code corresponding to video to home.  " +
      "<br/><br/>" +
      "The Telehealth Secondary Stop Code to Home is '179'.  If this Telehealth to Home code is used along with an Individual Therapy Primary Stop Code " + 
      "then the encounter counts toward the sum. " + 
      "<br/><br/>" +
      "The Individual Therapy stop codes are the same as used elsewhere on this Encounters page.  " + 
      "The sessions are from all PCT Clinics with the following subset of Individual Tx CPT codes:<br/><br/>" + 
      "&nbsp;&nbsp;&nbsp; <u>Individual Therapy</u>: (incl. 1 Crisis Code AND 2 Family Codes): <br/>" +
      "('90832', '90834', '90837', '90839', '90847', '90849')<br/><br/>",
      category: "Individual Telehealth Encounters Defined ..."
    },
    {
      title: "Telehealth to Associate Facility - Individual Therapy",
      value: "<u><b>Telehealth to Associate Facility</b></u> counts represent the sum total of individual therapy encounters that have a Telehealth Secondary Stop Code.  " +
      "<br/><br/>" +
      "<u><b>The Telehealth Secondary Stop Code to an Associate Facility is '692'.  If this Telehealth to Home secondary stop code is used along with an Individual Therapy Primary Stop Code " + 
      "then it signifies a telehealth encounter to an Associate Facility and the encounter counts toward the sum. " +
      "The Individual Therapy stop code are the same as used elsewhere on this Encounters page.  " + 
      "<br/><br/>" +
      "The sessions are from all PCT Clinics with the following subset of Individual Tx CPT codes:<br/><br/>" + 
      "&nbsp;&nbsp;&nbsp; <u>Individual Therapy</u>: (incl. 1 Crisis Code AND 2 Family Codes): <br/>" +
      "('90832', '90834', '90837', '90839', '90847', '90849')<br/><br/>",
      category: "Individual Telehealth Encounters Defined ..."
    },
    {
      title: "Telehealth to Different Parent Station - Individual Therapy",
      value: "<u><b>Telehealth to Different Parent Station</u></b> counts represent the sum total of individual therapy encounters that have a Telehealth Secondary Stop Code.  " +
      "<br/><br/>" +
      "<u><b>The Telehealth Secondary Stop Code to a Different Parent Station</u></b> is '693'.  If this Different Parent Station secondary stop code is used along with an Individual Therapy Primary Stop Code " + 
      "then it signifies a telehealth encounter to a Different Parent Station and the encounter counts toward the sum.  The Individual Therapy stop code are the same as used elsewhere on this Encounters page.  " + 
      "<br/><br/>" +
      "The sessions are from all PCT Clinics with the following subset of Individual Tx CPT codes:<br/><br/>" + 
      "&nbsp;&nbsp;&nbsp; <u>Individual Therapy</u>: (incl. 1 Crisis Code AND 2 Family Codes): <br/>" +
      "('90832', '90834', '90837', '90839', '90847', '90849')<br/><br/>",
      category: "Individual Telehealth Encounters Defined ..."
    },
  ]
  export const encounterTelehealthGrp = [    
    {
      title: "Face To Face - Group Therapy",
      value: "<u><b>Face To Face</u></b> counts represent the sum total of group therapy encounters that DO NOT have a Telehealth Secondary Stop Code.  " +
      "Therefore, these non-telehealth group therapy encounters occurred face-to-face.<br/><br/>" +
      "The Group Therapy codes for face-to-face encounter are the same as used elsewhere on this Encounters page.  " +      
      "The sessions are from all PCT Clinics with the following Group Tx CPT procedure code:<br/><br/>" + 
      "&nbsp;&nbsp;&nbsp; <u>Group Therapy</u>: <br/>('90853')<br/><br/>" +
      "<u><b>Numerator</b></u>: Total Face-To-Face Group Therapy encounters from all PCT Clinics with the following Group Tx CPT codes:<br/><br/>" +
      "<u><b>Denominator</b></u: Total Group Therapy encounters from all PCT Clinics.<br/><br/>",
      category: "Group Telehealth Encounters Defined ..."

    },
    {
      title: "Telehealth to Home - Group Therapy",
      value: "<u><b>Telehealth to Home</u></b> counts represent the sum total of group therapy encounters that have a Telehealth Secondary Stop Code corresponding to video to home.  " +
      "<br/><br/>" + 
      "The Telehealth Secondary Stop Code to Home is '179'.  If this Telehealth to Home code is used along with a Group Therapy Primary Stop Code " + 
      "then the encounter counts toward the sum.  The Group Therapy stop codes are the same as used elsewhere on this Encounters page.  " + 
      "<br/><br/>" +
       "The sessions are from all PCT Clinics with the following Group Tx CPT procedure code:<br/><br/>" + 
       "&nbsp;&nbsp;&nbsp; <u>Group Therapy</u>: <br/>('90853')<br/><br/>" +
       "<u><b>Numerator</b></u>: Total Telehealth To Home encounters from all PCT Clinics:<br/><br/>" +
      "<u><b>Denominator</b></u>: Total Group Therapy encounters from all PCT Clinics.<br/><br/>",
      category: "Group Telehealth Encounters Defined ..."
    },
    {
      title: "Telehealth to Associate Facility - Group Therapy",
      value: "<u><b>Telehealth to Associate Facility</b></U counts represent the sum total of group therapy encounters that have a Telehealth Secondary Stop Code.  " +
      "<br/><br/>" +
      "The Telehealth Secondary Stop Code to an Associate Facility is '692'.  If this Telehealth to an Associate Facility secondary stop code is used along with an Group Therapy Primary Stop Code " + 
      "then it signifies a telehealth encounter to an Associate Facility and the encounter counts toward the sum.  The Group Therapy stop codes are the same as used elsewhere on this Encounters page.  " + 
      "<br/><br/>" +
      "The sessions are from all PCT Clinics with the following Group Tx CPT procedurecode:<br/><br/>" + 
      "&nbsp;&nbsp;&nbsp; <u>Group Therapy</u>: <br/>('90853')<br/><br/>" +
      "<u><b>Numerator</b></u>: Total Telehealth Associate Facility encounters from all PCT Clinics with the following Group Tx CPT codes:<br/><br/>" +
      "<u><b>Denominator</b></u>: Total Group Therapy encounters from all PCT Clinics.<br/><br/>",
      category: "Group Telehealth Encounters Defined ..."
    },
    {
      title: "Telehealth to Different Parent Station - Group Therapy",
      value: "<u><b>Telehealth to Different Parent Station</u></b> counts represent the sum total of individual therapy encounters that have a Telehealth Secondary Stop Code.  " +
      "<br/><br/>" +
      "The Telehealth Secondary Stop Code to a Different Parent Station is '693'.  If this Different Parent Station secondary stop code is used along with a Group Therapy Primary Stop Code " + 
      "then it signifies a telehealth encounter to a Different Parent Station and the encounter counts toward the sum.  The Group Therapy stop codes are the same as used elsewhere on this Encounters page.  " + 
      "<br/><br/>" +
      "The sessions are from all PCT Clinics with the following Group Tx CPT procedure code:<br/><br/>" + 
      "&nbsp;&nbsp;&nbsp; <u>Group Therapy</u>: <br/>('90853')<br/><br/>" +
      "<u><b>Numerator</b></u>: Total Encounters from all PCT Clinics with the following Group Tx CPT codes:<br/><br/>" +
      "<u><b>Denominator</b></u>: Total Encounters from all PCT Clinics.<br/><br/>",
      category: "Group Telehealth Encounters Defined ..."
    },
  ]

  export const otherServices = [
    {
      title: "Numerator Counts",
      value: "<u><b>Other Services</b></u>: Numerators are encounter counts from these CPT codes: <br/><br/>" +
      "<u>Telephone</u>: <br/>('98966', '98967', '98968', '99441', '99442', '99443')<br/><br/>" +
      "<u>Health and Behavior (Group) Education</u>: <br/>('96153', '98961', '98962', '99078', 'S9446', 'S9449', 'S9452', 'S9453', 'S9454')<br/><br/>" +
      "<u>Assessment</u>: <br/>('90791', '90792')<br/><br/>" +
      "<u>Prolonged Service</u>: <br/>('99354', '99355', '99356', '99357')<br/><br/>",
      category: "Other Services Defined ..."
    },
    {
      title: "Denominator Counts",
      value: "<u><b>Other Services</b></u>: Denominators are encounter counts from all MH CPT codes irrespective of the type of service provided. <br/><br/>"+
      "<u>Assessment</u>: <br/>('90791', '90792')<br/><br/>" +
      "<u>Individual Therapy</u>: <br/>('90832', '90833', '90834', '90836', '90837', '90838')<br/><br/>" +
      "<u>Group Psychotherapy</u>: <br/>('90853')<br/><br/>" +
      "<u>Interactive Complexity</u>: <br/>('90785')<br/><br/>" + 
      "<u>Crisis Intervention</u>: <br/>('90839', '90840', 'H2011', 'S9484')<br/><br/>" +
      "<u>Prolonged Service</u>: <br/>('99354', '99355', '99356', '99357')<br/><br/>" +
      "<u>Family Services</u>: <br/>('90846', '90847', '90849', '90887')<br/><br/>" +
      "<u>Health and Behavior (Family) Education</u>: <br/>('96154', '96155')<br/><br/>" +
      "<u>Health and Behavior (Individual) Education</u>: <br/>('96150', '96151', '96152')<br/><br/>" +
      "<u>Health and Behavior (Group) Education</u>: <br/>('96153', '98961', '98962', '99078', 'S9446', 'S9449', 'S9452', 'S9453', 'S9454')<br/><br/>" +
      "<u>Team Conference</u>: <br/>('99366', '99367', '99368')<br/><br/>" +
      "<u>Case Management</u>: <br/>('T1016')<br/><br/>" +
      "<u>Telephone</u>: <br/>('98966', '98967', '98968', '99441', '99442', '99443')<br/><br/>" +
      "<u>Other</u>: <br/>('90863', '90885', '90889', 'H0038', 'H2027')<br/><br/>", 
      category: "Other Services Defined ..."
    },
  ]

  export const encounterCategories = [
    {
      title: "Encounter Category CPT Codes",
      value: "<u><b>Description</b></u>:Encounter Counts are totals listed by encounter category taken from the National VA Mental Health <a href=\"https://vaww.cmopnational.va.gov/CR/MentalHealth/MH_Business Rules/MH_Coding/\" target=\"_blank\"> PTSD quick guides 2016 </a>.<br/><br/>" + 
      "Also note an encounter may have multiple CPT codes. The Encounters Categories Summary table below shows all unique CPT code category combinations. <br/><br/>" +
      "<u>Assessment</u>: <br/>('90791', '90792')<br/><br/>" +
      "<u>Individual Therapy</u>: <br/>('90832', '90833', '90834', '90836', '90837', '90838')<br/><br/>" +
      "<u>Group Psychotherapy</u>: <br/>('90853')<br/><br/>" +
      "<u>Interactive Complexity</u>: <br/>('90785')<br/><br/>" + 
      "<u>Crisis Intervention</u>: <br/>('90839', '90840', 'H2011', 'S9484')<br/><br/>" +
      "<u>Prolonged Service</u>: <br/>('99354', '99355', '99356', '99357')<br/><br/>" +
      "<u>Family Services</u>: <br/>('90846', '90847', '90849', '90887')<br/><br/>" +
      "<u>Health and Behavior (Family) Education</u>: <br/>('96154', '96155')<br/><br/>" +
      "<u>Health and Behavior (Individual) Education</u>: <br/>('96150', '96151', '96152')<br/><br/>" +
      "<u>Health and Behavior (Group) Education</u>: <br/>('96153', '98961', '98962', '99078', 'S9446', 'S9449', 'S9452', 'S9453', 'S9454')<br/><br/>" +
      "<u>Team Conference</u>: <br/>('99366', '99367', '99368')<br/><br/>" +
      "<u>Case Management</u>: <br/>('T1016')<br/><br/>" +
      "<u>Telephone</u>: <br/>('98966', '98967', '98968', '99441', '99442', '99443')<br/><br/>" +
      "<u>Other</u>: <br/>('90863', '90885', '90889', 'H0038', 'H2027')<br/><br/>", 
      category: "Encounter Categories Defined ..."
    }
  ]

  export const encounterCPTDetails = [
    {
      title: "CPT Details",
      value: "<u><b>Description</b></u>: Encounter Counts from all PCT Clinics regardless of type of service provided.<br/><br/>" + 
      "Also note an encounter may have multiple CPT codes. The CPT Details table below shows all the distinct CPT codes and code combinations using the CPT Code standard names. <br/><br/>" +
      "<u><b>NOTE</b></u>: An encounter is not infrequently tagged with multiple CPT codes.  In the table we include all CPT code combinations for each encounter. " + 
      "Noticee that the individual procedure code names are separated by a bar \'|\', indicating multiple CPTs coded for the single encounter. <br/><br/>",
      category: "Procedure Code Details Defined ..."
    }
  ]
