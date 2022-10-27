export const TimeLimitedCare6and20 = [
  {
    title: 'TLC >= 20 Sessions in >= 6 Months',
    value: '<u><b>Numerator</b></u>: Veteran seen by a provider in group or individual therapy for greater than or equal to 6 months AND greater than or equal to 20 sessions. Veteran’s most recent visit occurred within the last 3 months.<br/><br/>' +
    '&nbsp;&nbsp;&nbsp; <u><b>Individual Therapy CPT Codes</b></u>: (incl. 1 Crisis Code AND 2 Family Codes): <br/>' +
    "('90832', '90834', '90837', '90839', '90847', '90849')<br/><br/>" +
    '<u><b>Denominator</b></u>: Total Patients from all PCT Clinics seen for Individual or Group Therapy in the last 3 months.<br/><br/>' +
    '<u><b>NOTE</b></u>: Some Veterans may make sense to be on this list. For example, if your PCT provides full DBT care, then DBT patients will likely appear on this list. If a veteran has been seen for multiple courses of an EBP in your clinic (e.g. PE and CBT-I or CBT-D) they will likely appear on this list. Veterans on this list should represent complex cases and are cases that would benefit from team-based care. ',
    category: 'Long-term, high frequency psychotherapy Cohort Defined...'
  }
]

export const TimeLimitedCare6and20Table = [
  {
    title: 'TLC >= 20 Sessions in >= 6 Months Activity Summary',
    value: '<u><b>Description</b></u>: Lists veterans who have been seen by a provider for for greater than or equal to 20 sessions AND for greater than or equal to 6 months. The provider is listed as the primary provider in the encounter. The most recent session with the provider must be within 3 months of the current date.<br/><br/> ' +
    '<u><b>NOTE</b></u>: Some Veterans may make sense to be on this list. For example, if your PCT provides full DBT care, then DBT patients will likely appear on this list. If a veteran has been seen for multiple courses of an EBP in your clinic (e.g. PE and CBT-I or CBT-D) they will likely appear on this list. Veterans on this list should represent complex cases and are cases that would benefit from team-based care.<br/><br/> ' +
    'If a Veteran meets the above definition for more than one provider than a Veteran would be listed under each provider and be listed twice.',
    category: 'Long-term, high frequency psychotherapy Cohort Defined...'
  }
]

export const TimeLimitedCare12and12 = [
  {
    title: 'TLC <= 12 Sessions in >= 12 Months',
    value: '<u><b>Numerator</b></u>: Veteran seen by a provider in group or individual therapy for greater than or equal to 12 months AND less than or equal to 12 sessions. Veteran’s most recent visit occurred within the last 3 months.<br/><br/>' +
    '&nbsp;&nbsp;&nbsp; <u><b>Individual Therapy</b></u>: (incl. 1 Crisis Code AND 2 Family Codes): <br/>' +
    "('90832', '90834', '90837', '90839', '90847', '90849')<br/><br/>" +
    '<u><b>Denominator</b></u>: Total Patients from all PCT Clinics seen for Individual or Group Therapy in the last 3 months.<br/><br/>' +
    '<u><b>NOTE</b></u>: Some Veterans may make sense to be on this list. ' +
    'For example, If a veteran stops care and then re-engages in care they may appear on this list.',
    category: 'Long-term, low frequency psychotherapy Cohort Defined...'
  }
]

export const TimeLimitedCare12and12Table = [
  {
    title: 'TLC <= 12 Sessions and >= 12 Months Activity Summary',
    value: '<u><b>Description</b></u>: Lists Veterans who have been seen by a provider for less than or equal to 12 sessions AND greater than or equal to 12 months. The provider is listed as the primary provider in the encounter. The most recent session with the provider must be within 3 months of the current date.<br/><br/>' +
    'If a Veteran meets the above definition for more than one provider than a Veteran would be listed under each provider and be listed twice.<br/><br/>' +
    '<u><b>NOTE</b></u>: Some Veterans may make sense to be on this list. ' +
    'For example, If a veteran stops care and then re-engages in care they may appear on this list.',
    category: 'Lengthy Treatment Activity Summary Defined...'
  }
]
