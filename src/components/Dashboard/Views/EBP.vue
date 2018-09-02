<template>
  <div class="content">
    <div class="container-fluid">
      
      <!-- Section Headers -->
      <div class="row d-flex justify-content-center ">
        <h4 class="section-head">PTSD</h4>
      </div>
     
      <div class="row d-flex justify-content-around">
        <h4 class="section-head">  Clinics ({{siteEBPClinics}}/{{siteEBPClinicsPercent}}%)</h4>
        <h4 class="section-head">Providers ({{siteEBPProviders}}/{{siteEBPProvidersPercent}}%)</h4>
      </div>


      <div class="row d-flex justify-content-center">

        <div class="col-xl-3 col-md-2">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-chart text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Prolonged Exposure</p>
              <!-- <h4 class="card-title">{{ siteEncounterCPTTelephone.total }}/{{ siteEncounterCPTTelephone.percent }}%</h4> -->
              <h4 class="card-title">({{siteEBPClinicsPEI}}/{{siteEBPClinicsPEIPercent}}%)</h4>
            </div>
          </stats-card>

        </div>

        <div class="col-xl-3 col-md-2">
          
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-chart text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Cognitive Processing</p>
              <!-- <h4 class="card-title">{{ siteEncounterCPTGroupEducation.total }}/{{ siteEncounterCPTGroupEducation.percent }}%</h4> -->
              <h4 class="card-title">({{siteEBPClinicsCPT}}/{{siteEBPClinicsCPTPercent}}%)</h4>
            </div>
          </stats-card>

        </div>

        <div class="col-xl-3 col-md-2">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-chart text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Prolonged Exposure</p>
              <!-- <h4 class="card-title">{{ siteEncounterCPTTelephone.total }}/{{ siteEncounterCPTTelephone.percent }}%</h4> -->
              <h4 class="card-title">({{siteEBPClinicsPEI}}/{{siteEBPClinicsPEIPercent}}%)</h4>
            </div>
          </stats-card>

        </div>
      
        <div class="col-xl-3 col-md-2">
          
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-chart text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Cognitive Processing</p>
              <!-- <h4 class="card-title">{{ siteEncounterCPTGroupEducation.total }}/{{ siteEncounterCPTGroupEducation.percent }}%</h4> -->
              <h4 class="card-title">%</h4>
            </div>
          </stats-card>

        </div>
      </div>

      <div class="row d-flex justify-content-center ">
        <h4 class="section-head">Patients</h4>
      </div>
    
      <div class="row d-flex justify-content-center">

        <div class="col-xl-3 col-md-2">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-chart text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Prolonged Exposure</p>
              <!-- <h4 class="card-title">{{ siteEncounterCPTTelephone.total }}/{{ siteEncounterCPTTelephone.percent }}%</h4> -->
              <h4 class="card-title">%</h4>
            </div>
          </stats-card>

        </div>
      
        <div class="col-xl-3 col-md-2">
          
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-chart text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Cognitive Processing</p>
              <!-- <h4 class="card-title">{{ siteEncounterCPTGroupEducation.total }}/{{ siteEncounterCPTGroupEducation.percent }}%</h4> -->
              <h4 class="card-title">%</h4>
            </div>
          </stats-card>

        </div>
      
      </div>

<hr class="style1"/>

      <div class="row d-flex justify-content-center ">
        <h4 class="section-head">Depression EBPs</h4>
      </div>
     
      <div class="row d-flex justify-content-around">
        <h4 class="section-head">Clinics</h4>
        <h4 class="section-head">Providers</h4>
      </div>

      <div class="row d-flex justify-content-center">
      
        <div class="col-xl-3 col-md-3">
          
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-chart text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">CBT-Depression</p>
              <!-- <h4 class="card-title">{{ siteEncounterCPTAssessment.total }}/{{ siteEncounterCPTAssessment.percent }}%</h4> -->
              <h4 class="card-title">%</h4>
            </div>
            </stats-card>

        </div>

        <div class="col-xl-3 col-md-3">
          
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-chart text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">IPT-Depression</p>
              <!-- <h4 class="card-title">{{ siteEncounterCPTProlongedService.total }}/{{ siteEncounterCPTProlongedService.percent }}%</h4> -->
              <h4 class="card-title">%</h4>
            </div>
            </stats-card>

        </div>

        <div class="col-xl-3 col-md-3">
          
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-chart text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">CBT-Depression</p>
              <!-- <h4 class="card-title">{{ siteEncounterCPTAssessment.total }}/{{ siteEncounterCPTAssessment.percent }}%</h4> -->
              <h4 class="card-title">%</h4>
            </div>
            </stats-card>

        </div>

        <div class="col-xl-3 col-md-3">
          
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-chart text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">IPT-Depression</p>
              <!-- <h4 class="card-title">{{ siteEncounterCPTProlongedService.total }}/{{ siteEncounterCPTProlongedService.percent }}%</h4> -->
              <h4 class="card-title">%</h4>
            </div>
            </stats-card>

        </div>

      </div>

      <div class="row d-flex justify-content-center ">
        <h4 class="section-head">Patients</h4>
      </div>

      <div class="row d-flex justify-content-center">
      
        <div class="col-xl-3 col-md-3">
          
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-chart text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">CBT-Depression</p>
              <!-- <h4 class="card-title">{{ siteEncounterCPTAssessment.total }}/{{ siteEncounterCPTAssessment.percent }}%</h4> -->
              <h4 class="card-title">%</h4>
            </div>
            </stats-card>

        </div>

        <div class="col-xl-3 col-md-3">
          
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-chart text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">IPT-Depression</p>
              <!-- <h4 class="card-title">{{ siteEncounterCPTProlongedService.total }}/{{ siteEncounterCPTProlongedService.percent }}%</h4> -->
              <h4 class="card-title">%</h4>
            </div>
            </stats-card>

        </div>

      </div>

<hr class="style1"/>

      <div class="row d-flex justify-content-center ">
        <h4 class="section-head">Insomnia EBPs</h4>
      </div>
     
      <div class="row d-flex justify-content-around">
        <h4 class="section-head">Clinics</h4>
        <h4 class="section-head">Providers</h4>
        <h4 class="section-head">Patients</h4>
      </div>

      <div class="row d-flex justify-content-around">
      
        <div class="col-xl-3 col-md-3">
          
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-chart text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">CBT-Insomnia</p>
              <!-- <h4 class="card-title">{{ siteEncounterCPTAssessment.total }}/{{ siteEncounterCPTAssessment.percent }}%</h4> -->
              <h4 class="card-title">%</h4>
            </div>
            </stats-card>

        </div>

        <div class="col-xl-3 col-md-3">
          
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-chart text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">CBT-Insomnia</p>
              <!-- <h4 class="card-title">{{ siteEncounterCPTAssessment.total }}/{{ siteEncounterCPTAssessment.percent }}%</h4> -->
              <h4 class="card-title">%</h4>
            </div>
            </stats-card>

        </div>

        <div class="col-xl-3 col-md-3">
          
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-chart text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">CBT-Insomnia</p>
              <!-- <h4 class="card-title">{{ siteEncounterCPTAssessment.total }}/{{ siteEncounterCPTAssessment.percent }}%</h4> -->
              <h4 class="card-title">%</h4>
            </div>
            </stats-card>

        </div>
      
      </div>

<hr class="style1"/>

    </div>
  </div>
</template>
<script>

import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'surveys',
  components: {
    StatsCard,
  },
  computed: {
    ...mapGetters([
      'siteEBPClinics',
      'siteEBPClinicsAll',
      'siteEBPProviders',
      'siteEBPProvidersAll',
      'siteEBPClinicsCPT',
      'siteEBPClinicsPEI',
      
    ]),
    siteEBPClinicsPercent () {
      return Math.round((this.siteEBPClinics/this.siteEBPClinicsAll) * 100)
    },
     siteEBPClinicsCPTPercent () {
      return Math.round((this.siteEBPClinicsCPT/this.siteEBPClinicsAll) * 100)
    },
     siteEBPClinicsPEIPercent () {
      return Math.round((this.siteEBPClinicsPEI/this.siteEBPClinicsAll) * 100)
    },

    siteEBPProvidersPercent () {
      return Math.round((this.siteEBPProviders/this.siteEBPProvidersAll) * 100)
    },
   
  }
}
</script>
<style>
.section-head {
   font-size: 2rem;
}

hr.style1 {
	border-top: 3px double #8c8b8b;
}
</style>
