<template>

<div class=WordSection1 style='padding: 3rem;'>

<p class=MsoNormal align=center style='text-align:center;padding-top:10px;'>PTSD Manager’s
Dashboard Data Definitions</p>

<div style="margin-bottom: -30px;">
    <img src="../../../../static/data_definitions_heading.png">
</div>

<p class=MsoNormal align=center style='text-align:center'>&nbsp;</p>

<p class=MsoNormal>&nbsp;</p>

<p class=MsoListParagraphCxSpFirst style='margin-left:.25in;text-indent:-.25in'><b>1.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></b><b><u>Consults
Tab</u></b></p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'>a.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Total
Consults = all consults made to stop codes 516, 562 (from here on out called <span
style='color:#1F4E79'>PCT stop codes</span>)</p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'>b.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Total
Patients = all patients seen in <span style='color:#1F4E79'>PCT stop codes </span></p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'>c.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Pending
– all pending <span style='color:#1F4E79'>PCT consults </span></p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'>d.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Active
– all active <span style='color:#1F4E79'>PCT consults </span></p>

<p class=MsoListParagraphCxSpMiddle style='margin-left:.25in'>&nbsp;</p>

<p class=MsoListParagraphCxSpMiddle style='margin-left:.25in;text-indent:-.25in'><b>2.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></b><b><u>No
Shows &amp; Cancellations Tab</u></b></p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'>a.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>No
Show Appts/All = appointments marked as “no show”/all appointments in <span
style='color:#2E74B5'>PCT stop codes</span></p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'><span
>b.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span>Any Cancelled Appts/All = appointments marked as “cancelled”/all
appointments in <span style='color:#2E74B5'>PCT stop codes</span></p>

<p class=MsoListParagraphCxSpMiddle>&nbsp;</p>

<p class=MsoListParagraphCxSpMiddle style='margin-left:.25in;text-indent:-.25in'><b>3.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></b><b><u>Encounters
Tab</u></b></p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'>a.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Total
Encounters = total number of encounters in <span style='color:#2E74B5'>PCT stop
codes</span>.  Includes all CPT codes.</p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'>b.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Patient
Uniques = unique patients to the clinic seen in <span style='color:#2E74B5'>PCT
stop codes</span>.  Includes all CPT codes.</p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'><span
>c.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span>Individual = <span style='color:#00B050'>Individual psychotherapy
CPT codes </span>in <span style='color:#2E74B5'>PCT stop codes</span>/all CPT
codes in <span style='color:#2E74B5'>PCT stop codes</span></p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'>d.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Group
= <span style='color:#C45911'>Group psychotherapy CPT codes </span>in PCT stop
codes/all CPT codes in PCT stop codes</p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'>e.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Individual
Tx Only = Unique patients receiving <span style='color:#00B050'>individual
psychotherapy CPT codes </span>only within PCT stop codes</p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'>f.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span>Group Tx Only = Unique patients receiving <span style='color:#C45911'>group
psychotherapy CPT codes </span>only within PCT stop codes</p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'><span
>g.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span>Both Ind and Grp Tx = unique patients receiving both <span
style='color:#00B050'>individual</span> and <span style='color:#C45911'>group
psychotherapy CPT codes</span></p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'>h.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Telephone
CPT = number of telephone CPT codes in PCT stop codes/all CPT codes in PCT</p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'>i.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span>Group Education = number of group educ CPT codes in PCT stop codes/all
CPT codes in PCT</p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'>j.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span>Assessment CPT = number of assessment CPT codes in PCT stop codes/all
CPT codes in PCT</p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'>k.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Prolonged
Service = number of prolonged service CPT codes in PCT stop codes/all CPT codes
in PCT</p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'>l.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span>Family Services = number of family services CPT codes in PCT stop
codes/all CPT codes in PCT</p>

<p class=MsoListParagraphCxSpMiddle>&nbsp;</p>

<p class=MsoListParagraphCxSpMiddle style='margin-left:.25in;text-indent:-.25in'><b>4.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></b><b><u>Providers
Tab</u></b></p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'>a.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Total
Providers = number of providers using PCT stop codes</p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'>b.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Total
Clinics = number of clinics using PCT stop codes</p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'>c.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Total
Patients = number of unique patients in PCT stop codes (all CPT codes)</p>

<p class=MsoListParagraphCxSpMiddle style='margin-left:.25in'>&nbsp;</p>

<p class=MsoListParagraphCxSpMiddle style='margin-left:.25in;text-indent:-.25in'><b>5.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></b><b><u>Surveys
Tab</u></b></p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'>a.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Total
Surveys Given = total number of survey measures given in PCT stop codes (all
CPT codes)</p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'>b.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Surveys
administered in PCT Clinics/Total number of PCT clinics</p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'>c.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Providers
administering surveys/Total number of PCT providers</p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'>d.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Patients
receiving surveys/Total unique PCT patients </p>

<p class=MsoListParagraphCxSpMiddle>&nbsp;</p>

<p class=MsoListParagraphCxSpMiddle style='margin-left:.25in;text-indent:-.25in'><b>6.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></b><b><u>EBPs
Tab</u></b></p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'>a.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>EBPs
Sessions = number of psychotherapy sessions in PCT stop codes <a
name="_Hlk3804024">(all <u>Psychotherapy CPT Codes</u>)</a> with an EBP
template/ all <u>Psychotherapy CPT Codes</u> sessions within PCT stop codes</p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'>b.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>EBPs
Patients = number of unique patients with an EBP template within PCT stop
codes/total unique patients with a psychotherapy encounter in PCT stop codes</p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'>c.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>PE
or CPT Sessions = number of psychotherapy sessions (all <u>Psychotherapy CPT
Codes</u>) in PCT stop codes with a PE or CPT template/ all <u>Psychotherapy
CPT Codes</u> sessions within PCT stop codes</p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'>d.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>PE
or CPT Patients = number of unique patients with at least one PE or CPT
template within PCT stop codes/total unique patients with a psychotherapy
encounter in PCT stop codes </p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'>e.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Individual
Tx EBPs Sessions = number of <span style='color:#00B050'>individual CPT
psychotherapy </span>codes with an EBP template with the PCT/ total <span
style='color:#00B050'>individual psychotherapy CPT code </span>sessions within
PCT stop codes</p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'>f.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span>Individual TX EBPs Patients = number of unique patients with at least
one individual EBP template within PCT stop codes/total unique patients with an
<span style='color:#00B050'>individual psychotherapy CPT code</span> encounter
in PCT stop codes</p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'>g.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Group
Tx EBPs Sessions = number of <span style='color:#C45911'>group CPT
psychotherapy codes </span>with an EBP template with the PCT/ total group
psychotherapy CPT code sessions within PCT stop codes</p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'>h.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Group
Tx EBPs Patients = number of unique patients with a <span style='color:#C45911'>group
psychotherapy CPT codes </span>with a group EBP template within PCT stop codes/total
unique patients with a <span style='color:#C45911'>group psychotherapy CPT code
</span>in PCT stop codes</p>

<p class=MsoListParagraphCxSpLast> </p>

</div>


</template>

<style>
<!--
 /* Font Definitions */
 /* @font-face
	{font-family:"Cambria Math";
	panose-1:2 4 5 3 5 4 6 3 2 4;}
@font-face
	{font-family:Calibri;
	panose-1:2 15 5 2 2 2 4 3 2 4;}
@font-face
	{font-family:"Segoe UI";
    panose-1:2 11 5 2 4 2 4 2 2 3;} */
    
 /* Style Definitions */
 p.MsoNormal, li.MsoNormal, div.MsoNormal
	{margin-top:0in;
	margin-right:0in;
	margin-bottom:8.0pt;
	margin-left:0in;
	line-height:107%;
	font-size:11.0pt;
	font-family:"Calibri",sans-serif;}
p.MsoCommentText, li.MsoCommentText, div.MsoCommentText
	{mso-style-link:"Comment Text Char";
	margin-top:0in;
	margin-right:0in;
	margin-bottom:8.0pt;
	margin-left:0in;
	font-size:10.0pt;
	font-family:"Calibri",sans-serif;}
p.MsoCommentSubject, li.MsoCommentSubject, div.MsoCommentSubject
	{mso-style-link:"Comment Subject Char";
	margin-top:0in;
	margin-right:0in;
	margin-bottom:8.0pt;
	margin-left:0in;
	font-size:10.0pt;
	font-family:"Calibri",sans-serif;
	font-weight:bold;}
p.MsoAcetate, li.MsoAcetate, div.MsoAcetate
	{mso-style-link:"Balloon Text Char";
	margin:0in;
	margin-bottom:.0001pt;
	font-size:9.0pt;
	font-family:"Segoe UI",sans-serif;}
p.MsoListParagraph, li.MsoListParagraph, div.MsoListParagraph
	{margin-top:0in;
	margin-right:0in;
	margin-bottom:8.0pt;
	margin-left:.5in;
	line-height:107%;
	font-size:11.0pt;
	font-family:"Calibri",sans-serif;}
p.MsoListParagraphCxSpFirst, li.MsoListParagraphCxSpFirst, div.MsoListParagraphCxSpFirst
	{margin-top:0in;
	margin-right:0in;
	margin-bottom:0in;
	margin-left:.5in;
	margin-bottom:.0001pt;
	line-height:107%;
	font-size:11.0pt;
	font-family:"Calibri",sans-serif;}
p.MsoListParagraphCxSpMiddle, li.MsoListParagraphCxSpMiddle, div.MsoListParagraphCxSpMiddle
	{margin-top:10px;
	margin-right:0in;
	margin-bottom:10px;
	margin-left:.5in;
	margin-bottom:.0001pt;
	line-height:107%;
	font-size:11.0pt;
	font-family:"Calibri",sans-serif;}
p.MsoListParagraphCxSpLast, li.MsoListParagraphCxSpLast, div.MsoListParagraphCxSpLast
	{margin-top:0in;
	margin-right:0in;
	margin-bottom:8.0pt;
	margin-left:.5in;
	line-height:107%;
	font-size:11.0pt;
	font-family:"Calibri",sans-serif;}
span.CommentTextChar
	{mso-style-name:"Comment Text Char";
	mso-style-link:"Comment Text";}
span.CommentSubjectChar
	{mso-style-name:"Comment Subject Char";
	mso-style-link:"Comment Subject";
	font-weight:bold;}
span.BalloonTextChar
	{mso-style-name:"Balloon Text Char";
	mso-style-link:"Balloon Text";
	font-family:"Segoe UI",sans-serif;}
.MsoChpDefault
	{font-family:"Calibri",sans-serif;}
.MsoPapDefault
	{margin-bottom:8.0pt;
	line-height:107%;}
@page WordSection1
	{size:8.5in 11.0in;
	margin:1.0in 1.0in 1.0in 1.0in;}
div.WordSection1
	{page:WordSection1;}
 /* List Definitions */
 ol
	{margin-bottom:0in;}
ul
	{margin-bottom:0in;}

</style>