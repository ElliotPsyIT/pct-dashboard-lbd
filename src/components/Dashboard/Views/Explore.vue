<template>
  <transition name="fade" mode="out-in" >
    <div class="content" :key="selectedSite">
      <div class="container-fluid" :class="{filtering: changeBackgroundColor}">
         Scroll Position {{scrollPosition}}

        <div class="iframe-wrapper">
            <div class="iframe-loading" v-if="iframeLoading">
            iframe loading
            </div>
            <iframe-friendly 
                ref="iframeEl" 
                :src="patientLevelData" 
                @load="onLoad" 
                :style="{'display' : iframeLoading ? 'none' : 'block' }"
                frameborder="0"  >
            </iframe-friendly>
        </div>

       </div> <!-- container-fluid -->

    </div> <!-- content -->

  </transition>

</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'

import IframeFriendly from 'src/components/UIComponents/Iframe.vue' 

export default {
  components: {
    IframeFriendly,
  },
  props: {
    message: {
      type: String,
      default: "hello world",
    }
  },
  data () {
    return {
      patientLevelData: 'https://vaww.pbi.cdw.va.gov/PBIRS/ReportServer/Pages/ReportViewer.aspx?/GPE/OMHS/SSRS/PCT-PatientLookup&pStaPa=512&pPatientSID=2120209&rs:embed=true',
        // patientLevelData: 'https://spsites.cdw.va.gov/sites/OMHS/_layouts/15/ReportServer/RSViewerPage.aspx?rv:RelativeReportUrl=%2fsites%2fOMHS%2fAnalyticsReports%2fPCT-PatientLookup.rdl&rp%3apStaPa=512&rp%3apPatientSID=2120209',
        
        iframeLoading: true
    }
  },
  computed: {
      ...mapState([
      'selectedSite', 
      'selectedRange', 
      'selectedInstitutions',
      'selectedInstitutionsNames',
      'disclaimer',
    ]),
    changeBackgroundColor () {
    // console.log('in changeBackgroundColor selectedInstitutions is: ', this.selectedInstitutions)
    return this.selectedInstitutions.length > 0 || false
    },      
    // utility computed
    scrollPosition () {
      // console.log('document.body.scrollHeight: ', document.body.scrollHeight)
      console.log('window.pageYOffset: ', window.pageYOffset)    
    },


  },
  methods: {
    onLoad () {
      console.log('onLoad event triggered, iframe loaded!')
    
      this.iframeLoading = false
    },
    onIframeLoad() {
      console.log('onIframeLoad event triggered, iframe loaded!')
    }
  }

}

</script>

<style>

.iframe-wrapper {
    border: 1px solid gray;
    height: 600px;
  }
  .iframe-wrapper .vue-friendly-iframe {
    height: 100%;
    width: 100%;
  }
  .iframe-wrapper .vue-friendly-iframe iframe {
    height: 100%;
    width: 100%;
  }
  .fullsize {
    height: 100%; 
    width: 100%
  }

  table, th, td {
    border: 1px solid black;
  }

  .filtering {
    background-color: lightgrey;
  }

  .section-head {
    font-size: 2rem;
  }

/* fade page in and out when site changes */

.fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter,
  .fade-leave-to
    /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0
  }

/* slide and fade */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}


</style>
