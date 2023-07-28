<template>
    <transition name="fade" mode="out-in">
      <div class="content" >
        <div
          class="container-fluid"
        >
          Scroll Position {{ scrollPosition }}
  
          <!-- Disclaimer -->
          <div class="row d-flex justify-content-center mt-4 ">
            <p class="category" style="font-size: .8rem; font-style: italic;">
              <span class="font: red;">{{ disclaimer.asterisks}}</span>
              {{ disclaimer.mainText }}
              <span style="font-weight:bold; text-decoration:underline">{{ disclaimer.emphasis }}</span>
            </p>
            <div v-if="dataError">
              <div class="category" style="font-style: italic; text-align: center;">
               <span style="color: red; font-size: 2rem; font-weight: bold; text-align: center; text-decoration: underline;" >
                 WARNING! DATA ERROR TODAY - {{ warningCurrentDate }}
               </span>
               <span style="color: red; font-size: 2rem; font-weight: bold; text-align: center; text-decoration: underline;" >
                 WE ARE WORKING TO SOLVE THE PROBLEM
               </span>
              </div> 
            </div> 
          </div>
  
          <hr />

          <div class="row d-flex justify-content-center">
            <h4 class="section-head">ADMIN REPORTS</h4>
          </div>

      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "encounters",
  data() {
    return {

    }
  },
  computed: {
    ...mapState([
      "selectedSite",
      "selectedRange",
      "whitelisted",
      "phipii",
      "selectedInstitutions",
      "selectedInstitutionsNames",
      
      "disclaimer",
      "dataError",
    ]),
    ...mapGetters(["canFilterBySite"]),
    scrollPosition() {
      // console.log('document.body.scrollHeight: ', document.body.scrollHeight)
      console.log("window.pageYOffset: ", window.pageYOffset);
    }
  }
}

</script>