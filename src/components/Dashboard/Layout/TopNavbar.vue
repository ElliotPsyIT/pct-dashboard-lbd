<template>
  <!-- <transition name="fade" mode="out-in"> -->
  <div>
    <nav
      class="navbar navbar-expand-lg"
      style="position: fixed; z-index: 1000; min-width: 100vw"
    >
      <div class="container-fluid">
        <!-- placeholder for provider filter -->
        <fade-transition :duration="duration">
          <!-- <span v-if="showProvider()" class="px-2" > -->
          <!-- <span v-if="selectedProvider" class="px-2" >
          <a class="navbar-brand px-2" href="#" 
             style="color: black; background-color: lightgrey;"
          >{{selectedProvider}}</a>
        </span> -->
          <!-- <span v-if="institutionsSelected" class="px-2" > -->
          <!-- <span v-if="siteSelected" class="px-2 " >
          <a class="" href="#" @click="filterInstitutions"
             style="color: black; background-color: lightgrey; padding: 5px; border-radius: 5px;"
          >Filter Data for {{capitalizeFirstLetter(currentpage)}}s </a>
        </span> -->
        </fade-transition>

        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav py-0">
            <li class="nav-item py-0 mr-2">
              <form class="form-inline">
                <div class="form-group">
                  <!-- <label for="station"> -->
                  <!-- <div class="px-2">
                  <span class="h5 "><strong>Station</strong></span>  
                </div> -->
                  <div>
                    <select
                      v-model="siteSelected"
                      class="form-control"
                      id="station"
                    >
                      <option value="" disabled>
                        Select Medical Center...
                      </option>
                      <option
                        v-for="site in siteNames"
                        :value="site.StaPa"
                        :key="site.StaPa"
                      >
                        {{ site.InstitutionNameLong }}
                      </option>
                    </select>
                  </div>
                  <!-- </label> -->
                </div>
              </form>
            </li>
            <!-- <li class="nav-item py-0">
              <form class="form-inline" style="display: none">
                <div class="form-group">
                  <div>
                    <select
                      v-model="rangeSelected"
                      class="form-control"
                      :class="{ toggleDateRangeColor: toggleDateRange }"
                      id="dateRange"
                    >
                      <option value="" disabled>Select Dates ...</option>
                      <option
                        v-for="range in dateRanges"
                        :value="range.name"
                        :key="range.name"
                      >
                        {{ range.dateRange }}
                      </option>
                    </select>
                  </div>
                </div>
              </form>
            </li> -->
            <li v-if="selectedPage != 'TLC' && selectedPage != 'AdminInfo'" class="nav-item py-0">
              <form class="form-inline">
                <div class="form-group ml-2">
                  <div v-for="demo in demoComponents" :key="demo.title">
                    <CtkDateTimePicker
                      :id="demo.options.id"
                      v-model="rangePickerSelected"
                      :only-date="demo.options.onlyDate"
                      :only-time="demo.options.onlyTime"
                      :range="demo.options.range"
                      :format="demo.options.format"
                      :formatted="demo.options.formatted"
                      :output-format="demo.options.outputFormat"
                      :inline="demo.options.inline"
                      :color="demo.options.color"
                      :button-color="demo.options.buttonColor"
                      :no-header="demo.options.noHeader"
                      :label="demo.options.label"
                      :no-label="demo.options.noLabel"
                      :auto-close="demo.options.autoClose"
                      :error="demo.options.error"
                      :hint="demo.options.hint"
                      :open="demo.options.open"
                      :overlay="demo.options.overlay"
                      :position="demo.options.position"
                      :disabled="demo.options.disabled"
                      :disabled-dates="demo.options.disabledDates"
                      :disabled-hours="demo.options.disabledHours"
                      :enabled-dates="demo.options.enabledDates"
                      :minute-interval="demo.options.minuteInterval"
                      :first-day-of-week="demo.options.firstDayOfWeek"
                      :min-date="`${minDate}`"
                      :max-date="`${maxDate}`"
                      :no-weekends-days="demo.options.noWeekendDays"
                      :no-shortcuts="demo.options.noShortcuts"
                      :no-button="demo.options.noButton"
                      :button-now-translation="
                        demo.options.buttonNowTranslation
                      "
                      :no-button-now="demo.options.noButtonNow"
                      :locale="demo.options.locale"
                      :input-size="demo.options.inputSize"
                      :custom-shortcuts="demo.options.customShortcuts"
                      :shortcut="`${sc}`"
                      :persistent="demo.options.persistent"
                      :no-keyboard="demo.options.noKeyboard"
                      :no-value-to-custom-elem="
                        demo.options.noValueToCustomElem
                      "
                      :disabled-weekly="demo.options.disabledWeekly"
                      :right="demo.options.right"
                      :no-clear-button="demo.options.noClearButton"
                      :key="'picker-key' + pickerKeyCount"
                      @input="datePickerInput"
                    >
                      <input
                        v-if="
                          demo.options &&
                          demo.options.slot &&
                          demo.options.slot.type === 'input'
                        "
                        type="text"
                      />
                      <button
                        v-else-if="
                          demo.options &&
                          demo.options.slot &&
                          demo.options.slot.type === 'button'
                        "
                        type="button"
                        class="lm-btn"
                        style="
                          margin: 0;
                          font-family: Roboto;
                          font-size: 14px;
                          background-color: white;
                          color: black;
                          border: 1px solid lightgray;
                          padding: 7px 9px 7px 9px;
                        "
                      />
                    </CtkDateTimePicker>
                  </div>
                </div>
              </form>
            </li>
            <!-- Hide Calendar on Time Limited Care Page -->
            <li v-if="selectedPage == 'TLC'" class="nav-item py-0">
              <span 
                style="
                  margin-left: 12px;
                  color: #d3d3d3;
                  background-color: rgba(255, 255, 255, 0.96);
                  padding: 8px;
                  border-radius: 5px;
                  font-size: 1rem;
                  border: 1px solid;
                  border-color: #cbd5e0;
                "
              >
                Time Limited Care Has Fixed Dates
              </span>
            </li>
            <li v-show="selectedSiteHavingInstitutions" class="nav-item py-0">
              <!-- border-style: solid; {{capitalizeFirstLetter(currentpage)}}s -->
              <span
                v-if="siteSelected"
                class=""
                :class="{ hide: !canFilterBySite }"
              >
                <a
                  name="siteFilterClick"
                  href="#"
                  @click.prevent="filterInstitutionsShowHide"
                  style="
                    margin-left: 12px;
                    color: #696969;
                    background-color: rgba(255, 255, 255, 0.96);
                    padding: 8px;
                    border-radius: 5px;
                    font-size: 1rem;
                    border: 1px solid;
                    border-color: #cbd5e0;
                  "
                  >SITE DATA FILTER
                </a>
              </span>
            </li>
            <li v-if="!canFilterBySite" class="nav-item py-0">
              <span
                :class="{
                  hide:
                    selectedPage == 'Overview' ||
                    selectedPage === 'Definitions',
                }"
                style="
                  margin-left: 12px;
                  color: #d3d3d3;
                  background-color: rgba(255, 255, 255, 0.96);
                  padding: 8px;
                  border-radius: 5px;
                  font-size: 1rem;
                  border: 1px solid;
                  border-color: #cbd5e0;
                "
              >
                Current Page Institution Filter Disabled
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- <nav class="navbar navbar-expand-lg" style="position: fixed; margin-top: 43px; z-index: 1000; min-width: 100vw; ">
    <span v-if="siteSelected" class="px-2 "   >
      <a href="#" @click.prevent="filterInstitutions"
        style="margin-left: 17px; text-decoration: underline; color: black; background-color: lightgrey; padding: 5px; border-radius: 5px; font-size: .7rem; border-style: solid;"
      >Sites Filter for {{capitalizeFirstLetter(currentpage)}}s </a>
    </span>
  </nav> -->
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import NProgress from "nprogress";

import { FadeTransition } from "vue2-transitions";

// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

import CtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";

import moment from "moment";

function deepEqual(x, y) {
  const ok = Object.keys, tx = typeof x, ty = typeof y;
  return x && y && tx === 'object' && tx === ty ? (
    ok(x).length === ok(y).length &&
      ok(x).every(key => deepEqual(x[key], y[key]))
  ) : (x === y);
}

export default {
  components: {
    FadeTransition,
    Treeselect,
    CtkDateTimePicker,
  },

  // beforeMount  () {
  //   console.log('topnav beforeMount, selectedSite is: ', this.selectedSite)
  // },
  // watch: {
  //   selectedSite : function(site, oldSite){
  //     console.log('oldVal: ', oldSite)
  //     console.log('val: ', site)
  //     this.setSelectedSite(site)
  //   },
  //   selectedRange : function(range, oldRange){
  //     // console.log('oldVal: ', oldRange)
  //     // console.log('val: ', range)
  //     this.setSelectedRange(range)
  //   }
  // },
  // created () {
  //   console.log('topnav created siteSelected: ', this.selectedSite)
  //   if (this.selectedSite ) {

  //   }
  //   if (this.selectedRange) {

  //   }
  // },
  mounted() {
    // console.log('mounted and this.selectedRangePicker is: ', this.selectedRangePicker)
    // console.log('mounted and this.value is: ', this.value)
    // set the previous saved datePicker range
    // this.value = this.selectedRangePicker
    // console.log('mounted and this.value is set to this.selectedRangePicker, so value is: ', this.value)
    // console.log('TopNavbar page mounted!')
  },
  watch: {
    siteSelected(val) {
      // my new value in val. Perform your
      // select update methods here
      NProgress.start();
      // console.log('watcher for siteSelected triggered with new value of: ', val)
      NProgress.done();

      //  console.log('watching siteSelected: ', val)
    },
    rangePickerSelected(val) {
      // my new value in val. Perform your
      // select update methods here
      NProgress.start();
      // console.log('watcher for siteSelected triggered with new value of: ', val)
      NProgress.done();

      //  console.log('watching rangeSelected: ', val)
    },
    // selectedProvider (newVal, oldVal) {
    //   // when triggered, if there was a previous provider
    //   // and allow the showProvider method to animate in the new provider
    //   // console.log('watch on selectedProvider is triggered with: ', this.selectedProvider)
    //   // console.log('this is the newVal ', newVal)
    //   // console.log('this is the oldVal ', oldVal)

    // }
    // value: {
    //   handler: (value) => {
    //     console.log('watch value, it is: ', value)
    //     if (value == null) {
    //       console.log('value is null, mounted!')
    //       console.log('this.selectedRangePicker is: ', this.selectedRangePicker)
    //     } else {
    //       console.log('value not null, it is: ', value)
    //       console.log('this.selectedRangePicker is: ', this.selectedRangePicker)
    //     }
    //   },
    //   immediate: true
    // }
  },
  computed: {
    ...mapState([
      "siteNames",
      "dateRanges",

      "selectedSite",
      // "selectedRange",
      "selectedRangePicker",
      "selectedProvider",
      "selectedInstitutions",

      "currentpage",
    ]),
    ...mapGetters(["canFilterBySite"]),
    siteSelected: {
      get() {
        // console.log('TopNavBar this.siteSelected getter called and shows: ', this.selectedSite)
        // return this.$store.selectedSite
        return this.selectedSite;
      },
      set(site) {
        // console.log('TopNavBar siteSelected site! ', site)
        // this.$store.dispatch('setSelectedSite', site)
        this.setSelectedSite(site);
      },
    },
    // rangeSelected: {
    //   get() {
    //     return this.selectedRange;
    //   },
    //   set(range) {
    //     this.setSelectedRange(range);

    //     this.pickerKeyCount++;
    //   },
    // },
    rangePickerSelected: {
      // v-model for datePicker widget
      get() {
        // initial state - no value but default selectedRangePicker
        // console.log('in rangePickerSelected get()')
        // console.log('in rangePickerSelected get(): initializing date picker v-model=rangePickerSelected by checking value and selectedRangePicker')
        if (!this.value && this.selectedRangePicker) {
          // console.log('in rangePickerSelected, this.value is null and this.selectedRangePicker is ', this.selectedRangePicker)
          return this.selectedRangePicker;
        }
        // not initial state and return the value that's been set
        // console.log('in ine rangePickerSelected, this.value and this.selectedRangePicker have values!')
        return this.value;
      },
      set(val) {
        // when this v-model changes it triggers the @input="datePickerInput" which send to the store and refreshes data
        // console.log('in rangePickerSelected set()')
        // console.log('does rangePickerSelected computed know the shortcut key from selectedRangePicker? ', this.selectedRangePicker)
        // val.shortcut = this.selectedRangePicker.shortcut
        // console.log('rangePickerSelected set(val), check this value of selectedRangePicker: ', this.selectedRangePicker)
        // console.log('rangePickerSelected set(val) and this val gets sent to @datePickerInput: ', val)
        this.value = val;
      },
    },
    // determine current page
    selectedPage() {
      let { name } = this.$route;
      // console.log('TopNavBar name from $route is: ', name)
      // return this.capitalizeFirstLetter(name)
      return name;
    },
    institutionsSelected() {
      return this.selectedInstitutions.length > 0 || false;
    },
    // field to show or hide institution filter
    selectedSiteHavingInstitutions() {
      return !/NATIONAL|VISN/.test(this.selectedSite);
    },
    // datePicker widget has :shortcut = `${sc}`, and initializes the picker looking here
    sc() {
      // check if there is a shortcut
      // console.log('in sc() computed, looking for selectedRangePicker && a selectedRangePicker.short')
      // console.log('in sc() computed, this.selectedRangePicker is: ', this.selectedRangePicker)
      // console.log('in sc() computed. checking this.selecteedRangePicker.shortcut is:, ', this.selectedRangePicker.shortcut)
      if ( this.selectedRangePicker && this.selectedRangePicker.shortcut != null) {
        // console.log('Got a shortcut key from this.selectedRangePicker obj and now setting the datepicker widget sc to the shortcut!: ', this.selectedRangePicker.shortcut)
        // now set the shortcut to its previously select value
        return `${this.selectedRangePicker.shortcut}`;
      } else {
        // console.log("No shortcut in this.selectedRangePicker!");
        return "";
      }
      // return `${this.shortcutDefault}` //'sixmonths'
    },
    // minimum date for calendar
    minDate() {
      // need to return one year minus current date
      // use moment to calculate this
      // console.log('minDate returns: ', moment().subtract(1, 'year').format('YYYYMMDD'))
      return moment().subtract(2, "year").format("YYYYMMDD");
    },
    // maximum date for calendar
    maxDate() {
      // need to return current date

      return moment().format("YYYYMMDD");
    },
  },

  // created () {
  //   // identify the current date range
  //   const currentDateRange = this.selectedRange
  //   console.log('current date range is: ', currentDateRange)
  //   this.currentDateRange = currentDateRange
  // },
  data() {
    return {
      activeNotifications: false,
      // selectedSite: '',
      // selectedRange: ''
      shouldStick: true,
      duration: 1000,
      showName: false,
      previousProvider: false,
      newProvider: false,
      // define the default value
      value: null,
      // picker start and end object
      startendDate: {},
      // picker key for picker button updating
      pickerKeyCount: 0,
      // shortcut default
      shortcutDefault: "sixmonths",
      // toggle dateRange button color if user selecting start/end date
      toggleDateRange: false,
      // define options
      options: [
        { id: "402", label: "(V01) (402) VA MAINE HCS" },
        { id: "405", label: "(V01) (405) WHITE RIVER JCT VAMROC" },
        { id: "518", label: "(V01) (518) EDITH NOURSE ROGERS VAMC" },
        { id: "523", label: "(V01) (523) BOSTON HCS VAMC" },
        { id: "608", label: "(V01) (608) MANCHESTER VAMC" },
        { id: "631", label: "(V01) (631) VA CNTRL WSTRN MASSCHUSETS HCS" },
        { id: "650", label: "(V01) (650) PROVIDENCE VAMC" },
        { id: "689", label: "(V01) (689) CONNECTICUT HCS" },
      ],
      demoComponents: [
        {
          id: "2",
          title: "Range Date Picker",
          description:
            "Date Range selector - With custom element to trigger the component (only input or button)",
          editOption: false,
          initial: {
            start: "2018-04-05",
            end: "2018-04-20",
          },
          // value: this.rangePickerSelected,
          // value: this.value,
          options: {
            slot: {
              type: "button",
            },
            customShortcuts: [
              {
                key: "onemonth",
                label: "1 Month",
                value: () => {
                  return {
                    start: moment().subtract(1, "month"),
                    end: moment(),
                  };
                },
                callback: ({ start, end, shortcut }) => {
                  this.datePickerInput({
                    start: start.format("YYYYMMDD"),
                    end: end.format("YYYYMMDD"),
                    shortcut: shortcut.key,
                  });
                  // this.datePickerInput({ start, end }, 'shortcut')
                  // console.log('My shortcut was clicked with values: ', start.format('YYYYMMDD'), end.format('YYYYMMDD'))
                  // this.setSelectedRange('onemonth')
                },
              },
              {
                key: "threemonths",
                label: "3 Months",
                value: () => {
                  // console.log('** In threemonths shortcut, and returning the calculated start and end dates')
                  return {
                    start: moment().subtract(3, "months"),
                    end: moment(),
                  };
                },
                callback: ({ start, end, shortcut }) => {
                  this.datePickerInput({
                    start: start.format("YYYYMMDD"),
                    end: end.format("YYYYMMDD"),
                    shortcut: shortcut.key,
                  });
                  // this.datePickerInput({ start: start.format('YYYYMMDD'), end: end.format('YYYYMMDD') }, 'shortcut')
                  // console.log('My shortcut was clicked or triggered with values: ', start.format('YYYYMMDD'), end.format('YYYYMMDD'))
                  // this.setSelectedRange('threemonths')
                },
              },
              {
                key: "sixmonths",
                label: "6 Months",
                value: () => {
                  return {
                    start: moment().subtract(6, "months"),
                    end: moment(),
                  };
                },
                callback: ({ start, end, shortcut }) => {
                  this.datePickerInput({
                    start: start.format("YYYYMMDD"),
                    end: end.format("YYYYMMDD"),
                    shortcut: shortcut.key,
                  });
                  // console.log('My shortcut was clicked, and values passed in are: ', start.format('YYYYMMDD'), end.format('YYYYMMDD'), shortcut.key)
                  // console.log('My shortcut was clicked, and values passed in are: ', callbackValue)
                  // this.setSelectedRange('sixmonths')
                },
              },
              {
                key: "oneyear",
                label: "1 Year",
                value: () => {
                  return {
                    start: moment().subtract(1, "year"),
                    end: moment(),
                  };
                },
                callback: ({ start, end, shortcut }) => {
                  this.datePickerInput({
                    start: start.format("YYYYMMDD"),
                    end: end.format("YYYYMMDD"),
                    shortcut: shortcut.key,
                  });
                  // this.datePickerInput({ start, end }, 'shortcut')
                  // console.log('My shortcut was clicked with values: ', start.format('YYYYMMDD'), end.format('YYYYMMDD'))
                  // this.setSelectedRange('oneyear')
                },
              },
              {
                key: "FY23Qtr3",
                label: "Qtr3 FY23",
                value: () => {
                  return {
                    start: moment('2023-04-01'),
                    end: moment('2023-06-30'),
                  };
                },
                callback: ({ start, end, shortcut }) => {
                  this.datePickerInput({
                    start: start.format("YYYYMMDD"),
                    end: end.format("YYYYMMDD"),
                    shortcut: shortcut.key,
                  });
                  // this.datePickerInput({ start: start.format('YYYYMMDD'), end: end.format('YYYYMMDD') }, 'shortcut')
                  // console.log('My shortcut was clicked with values: ', start.format('YYYYMMDD'), end.format('YYYYMMDD'))
                  // this.setSelectedRange('threemonths')
                },
              },
              {
                key: "FY23Qtr2",
                label: "Qtr2 FY23",
                value: () => {
                  return {
                    start: moment('2023-01-01'),
                    end: moment('2023-03-31'),
                  };
                },
                callback: ({ start, end, shortcut }) => {
                  this.datePickerInput({
                    start: start.format("YYYYMMDD"),
                    end: end.format("YYYYMMDD"),
                    shortcut: shortcut.key,
                  });
                  // this.datePickerInput({ start: start.format('YYYYMMDD'), end: end.format('YYYYMMDD') }, 'shortcut')
                  // console.log('My shortcut was clicked with values: ', start.format('YYYYMMDD'), end.format('YYYYMMDD'))
                  // this.setSelectedRange('threemonths')
                },
              },
              {
                key: "FY23Qtr1",
                label: "Qtr1 FY23",
                value: () => {
                  return {
                    start: moment('2022-10-01'),
                    end: moment('2022-12-31'),
                  };
                },
                callback: ({ start, end, shortcut }) => {
                  this.datePickerInput({
                    start: start.format("YYYYMMDD"),
                    end: end.format("YYYYMMDD"),
                    shortcut: shortcut.key,
                  });
                  // this.datePickerInput({ start: start.format('YYYYMMDD'), end: end.format('YYYYMMDD') }, 'shortcut')
                  // console.log('My shortcut was clicked with values: ', start.format('YYYYMMDD'), end.format('YYYYMMDD'))
                  // this.setSelectedRange('threemonths')
                },
              },
              {
                key: "FY22Qtr4",
                label: "Qtr4 FY22",
                value: () => {
                  return {
                    start: moment('2022-07-01'),
                    end: moment('2022-09-30'),
                  };
                },
                callback: ({ start, end, shortcut }) => {
                  this.datePickerInput({
                    start: start.format("YYYYMMDD"),
                    end: end.format("YYYYMMDD"),
                    shortcut: shortcut.key,
                  });
                  // this.datePickerInput({ start: start.format('YYYYMMDD'), end: end.format('YYYYMMDD') }, 'shortcut')
                  // console.log('My shortcut was clicked with values: ', start.format('YYYYMMDD'), end.format('YYYYMMDD'))
                  // this.setSelectedRange('threemonths')
                },
              },
              {
                key: "FY22Qtr3",
                label: "Qtr3 FY22",
                value: () => {
                  return {
                    start: moment('2022-04-01'),
                    end: moment('2022-06-30'),
                  };
                },
                callback: ({ start, end, shortcut }) => {
                  this.datePickerInput({
                    start: start.format("YYYYMMDD"),
                    end: end.format("YYYYMMDD"),
                    shortcut: shortcut.key,
                  });
                  // this.datePickerInput({ start: start.format('YYYYMMDD'), end: end.format('YYYYMMDD') }, 'shortcut')
                  // console.log('My shortcut was clicked with values: ', start.format('YYYYMMDD'), end.format('YYYYMMDD'))
                  // this.setSelectedRange('threemonths')
                },
              },
              {
                key: "FY22Qtr2",
                label: "Qtr2 FY22",
                value: () => {
                  return {
                    start: moment('2022-01-01'),
                    end: moment('2022-03-31'),
                  };
                },
                callback: ({ start, end, shortcut }) => {
                  this.datePickerInput({
                    start: start.format("YYYYMMDD"),
                    end: end.format("YYYYMMDD"),
                    shortcut: shortcut.key,
                  });
                  // this.datePickerInput({ start: start.format('YYYYMMDD'), end: end.format('YYYYMMDD') }, 'shortcut')
                  // console.log('My shortcut was clicked with values: ', start.format('YYYYMMDD'), end.format('YYYYMMDD'))
                  // this.setSelectedRange('threemonths')
                },
              },
              {
                key: "FY22Qtr1",
                label: "Qtr1 FY22",
                value: () => {
                  return {
                    start: moment('2021-10-01'),
                    end: moment('2021-12-31'),
                  };
                },
                callback: ({ start, end, shortcut }) => {
                  this.datePickerInput({
                    start: start.format("YYYYMMDD"),
                    end: end.format("YYYYMMDD"),
                    shortcut: shortcut.key,
                  });
                  // this.datePickerInput({ start: start.format('YYYYMMDD'), end: end.format('YYYYMMDD') }, 'shortcut')
                  // console.log('My shortcut was clicked with values: ', start.format('YYYYMMDD'), end.format('YYYYMMDD'))
                  // this.setSelectedRange('threemonths')
                },
              },
            ],
            noShortcuts: false,
            range: true,
            formatted: "ll",
            format: "YYYYMMDD",
            color: "gray",
            label: "Select date range",
            id: "RangeDatePicker",
          },
        },
      ],
    };
  },
  methods: {

    // datePicker calendar clicked
    datePickerInput(val) {

      // console.log('@datePickerInput triggered! receives val of: ', val)
      
      // track last and new startend dates, grab saved startendDate stored in data()
      let oldStartEndDate = this.startendDate
      let newStartEndDate = { start: val.start, end: val.end }  
      
      // check if both start and end defined
      if ( (val.start != null || val.start != undefined) && (val.end != null || val.end != undefined)) {
        // update the startendDate previously saved in data()
        this.startendDate = newStartEndDate
        // has the start and end dates changed?
        let equals = deepEqual(oldStartEndDate, newStartEndDate)

        // console.log('@datePickerInput, check current selectedRangePicker', this.selectedRangePicker)
        // console.log('@datePickerInput, oldStartEndDate: ', oldStartEndDate) 
        // console.log('@datePickerInput, newStartEndDate: ', newStartEndDate) 
        // console.log('@datePickerInput, are they equal?', equals)
        
        // if start or end date changed, call the store to update
        if (!equals) {
          this.DATEPICKER_DATES({
            start: val.start,
            end: val.end,
            shortcut: val.shortcut,
          })
        } else {
          // console.log('no need to trigger DATEPICKER_DATES action and send to store, as datepicker did not change')
        }
      } else {
        // console.log('@datePickerInput, start and end are defined, did not send anything to the store')
      }
    },
    ...mapActions([
      "setSelectedSite",
      "setSelectedRange",
      "INSTITUTIONS_FILTER_SHOWHIDE",
      "DATEPICKER_DATES",
    ]),
    // trigger action to open sidebar to select/filter institutions
    filterInstitutionsShowHide() {
      // console.log('triggered filterInstitutionsShowHide in TopNavBar to call action INSTITUTIONS_FILTER')
      this.INSTITUTIONS_FILTER_SHOWHIDE();
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
  },
};
</script>
<style scoped>
/* change dateRange button color when user is selected start/end dates */
.toggleDateRangeColor {
  background-color: darkgray;
  color: white;
}
/* fade page in and out when site changes */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
  .fade-leave-to
    /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.fixed-plugin {
  position: absolute;
  top: 50px;
  left: 0;
  width: 150px;
  /* background: rgba(0, 0, 0, .3); */
  background: transparent;
  z-index: 1031;
  border-radius: 8px 0 0 8px;
  border-color: grey;
  border-width: 1px;
  border-style: solid none solid solid;
  text-align: center;
}

.fixed-plugin .dropdown-menu {
  right: 80px;
  /*left: auto; */
  width: 530px; /*290px - widen sidebar here, and need to modify left in large scale @media query; */
  border-radius: 10px;
  padding: 10px;
  overflow: scroll;
  max-height: 400px;
}

.fixed-plugin .dropdown-menu:after,
.fixed-plugin .dropdown-menu:before {
  right: 10px;
  margin-left: auto;
  left: auto;
}
</style>
