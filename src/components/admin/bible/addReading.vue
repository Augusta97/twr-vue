<template>
  <div>
    <!-- Create Readings code-->
    <form @submit.prevent="addReadingPlan">
      <b-form-group
        label="Plan Name"
        label-cols-sm="5"
        label-cols-lg="4"
        label-for="lang-name"
      >
        <b-form-select
          v-model="formData.planName"
          v-validate="'required'"
          type="text"
          :class="{ input: true, 'is-danger': errors.has('planName') }"
          class="form-control"
          name="planName"
          @change="readingPlanNo()"
        >
          <option
            v-for="(pn, index) in bibleplan"
            :key="index"
            :value="pn.id"
            >{{ pn.name }}</option
          >
        </b-form-select>
        <span v-show="errors.has('planName')" class="help is-danger">{{
          errors.first("planName")
        }}</span>
        <p v-if="existMsg" class="help is-danger mt-2">Already Added</p>
        <p v-if="showMakeUpWarning == 'true'" class="help clrgreen mt-2">
          This is a makeupday. So you cannot add any readings.
        </p>
      </b-form-group>
      <b-col>
        <b-form-group
          label="Day"
          label-cols-sm="5"
          label-cols-lg="4"
          v-if="
            formData.planName != '' &&
              bibleplan[bibleplan.findIndex(x => x.id === formData.planName)]
                .byDate === 0 &&
              readingPlans.length > 0
          "
        >
          <b-form-input
            name="dayOfReading"
            v-model="formData.dayOfReading"
            v-validate="'required'"
            type="text"
            readonly
            :class="{ input: true, 'is-danger': errors.has('dayOfReading') }"
          />
          <span v-show="errors.has('dayOfReading')" class="help is-danger">{{
            errors.first("dayOfReading")
          }}</span>
        </b-form-group>
        <b-form-group
          label="Date"
          label-cols-sm="5"
          label-cols-lg="4"
          v-if="
            formData.planName != '' &&
              bibleplan[bibleplan.findIndex(x => x.id === formData.planName)]
                .byDate === 1 &&
              typeof dailyReading.readingPlan == 'undefined'
          "
        >
          <datepicker
            v-model="formData.dateOfReading"
            v-validate="'required'"
            placeholder="Select Date"
            input-class="form-control bg-white"
            data-vv-name="dateOfReading"
            name="dateOfReading"
            input-name="dateOfReading"
            :format="format"
            :class="{ input: true, 'is-danger': errors.has('dateOfReading') }"
          />
          <span v-show="errors.has('dateOfReading')" class="help is-danger">{{
            errors.first("dateOfReading")
          }}</span>
        </b-form-group>
        <b-form-group
          label="Date"
          label-cols-sm="5"
          label-cols-lg="4"
          v-if="
            formData.planName != '' &&
              bibleplan[bibleplan.findIndex(x => x.id === formData.planName)]
                .byDate === 1 &&
              typeof dailyReading.readingPlan != 'undefined'
          "
        >
          <datepicker
            v-model="formData.dateOfReading"
            v-validate="'required'"
            placeholder="Select Date"
            input-class="form-control bg-white"
            data-vv-name="fromDate"
            disabled
            name="fromDate"
            :format="format"
            :class="{ input: true, 'is-danger': errors.has('dateOfReading') }"
          />
        </b-form-group>
      </b-col>
      <div
        v-if="
          formData.planName != '' &&
            readingPlans.length > 0 &&
            alreadyAddedMakeDay != findMakeDay
        "
      >
        <div v-for="(plans, index) in readingPlans" :key="index + 1">
          <b-row class="marTop10">
            <label for class="col-sm-1">plan {{ index + 1 }}</label>
            <span class="col-sm-2">From</span>
            <b-col class="col-sm-2">
              <b-form-select
                v-model="plans.fromBook"
                v-validate="plans.indx == 0 ? 'required' : ''"
                :class="{
                  'is-danger':
                    errors.has('fromBook' + index + plans.indx) &&
                    plans.indx == 0
                }"
                :name="'fromBook' + index + plans.indx"
              >
                <option value>select</option>
                <option
                  v-for="(option, inde) in bookList"
                  :key="inde"
                  :value="option.id"
                  >{{ option.name }}</option
                >
              </b-form-select>
              <span
                v-show="
                  errors.has('fromBook' + index + plans.indx) && plans.indx == 0
                "
                class="help is-danger"
                >{{ errors.first("fromBook" + index + plans.indx) }}</span
              >
            </b-col>
            <b-col class="col-sm-2">
              <b-form-select
                v-model="plans.fromChapter"
                class="spaceBetweenTxt"
                placeholder="Chapter"
                :name="'fromChapter' + index + plans.indx"
                data-vv-as="Chapter"
                v-validate="
                  plans.fromBook
                    ? 'required|numeric|max_value: ' +
                      distinctChapter.filter(x => x.bookId == plans.fromBook)
                        .length +
                      ''
                    : ''
                "
                :class="{
                  'is-danger': errors.has('fromChapter' + index + plans.indx)
                }"
              >
                <option disabled value>select</option>
                <option
                  v-for="(option, inde) in distinctChapter.filter(
                    x => x.bookId == plans.fromBook
                  )"
                  :key="inde"
                  :value="option.chapterId"
                  >{{ option.chapterId }}</option
                >
              </b-form-select>
              <span
                v-show="errors.has('fromChapter' + index + plans.indx)"
                class="help is-danger"
                >{{ errors.first("fromChapter" + index + plans.indx) }}</span
              >
            </b-col>
            <b-col class="col-sm-2">
              <b-form-select
                v-model="plans.fromVerse"
                class="spaceBetweenTxt"
                placeholder="Verse"
                :name="'fromVerse' + index + plans.indx"
                data-vv-as="Verse"
                v-validate="
                  plans.fromBook != '' && plans.fromChapter != ''
                    ? 'required|numeric|max_value:' +
                      bible.filter(
                        x =>
                          x.bookId == plans.fromBook &&
                          x.chapterId == plans.fromChapter
                      ).length +
                      ''
                    : ''
                "
                :class="{
                  'is-danger': errors.has('fromVerse' + index + plans.indx)
                }"
              >
                <option value>select</option>
                <option
                  v-for="(option, inde) in bible.filter(
                    x =>
                      x.bookId == plans.fromBook &&
                      x.chapterId == plans.fromChapter
                  )"
                  :key="inde"
                  :value="option.verseId"
                  >{{ option.verseId }}</option
                >
              </b-form-select>
              <span
                v-show="errors.has('fromVerse' + index + plans.indx)"
                class="help is-danger"
                >{{ errors.first("fromVerse" + index + plans.indx) }}</span
              >
            </b-col>
          </b-row>
          <b-row class="marTop10">
            <b-col sm="1"></b-col>
            <span class="col-md-2">To</span>
            <b-col class="col-sm-2">
              <b-form-select
                v-model="plans.toBook"
                :name="'toBook' + index + plans.indx"
                v-validate="plans.fromBook ? 'required' : ''"
                :class="{
                  'is-danger':
                    errors.has('toBook' + index + plans.indx) && plans.indx == 0
                }"
              >
                <option value>select</option>
                <option
                  v-for="(option, inde) in bookList"
                  :key="inde"
                  :value="option.id"
                  >{{ option.name }}</option
                >
              </b-form-select>
              <span
                v-show="
                  errors.has('toBook' + index + plans.indx) && plans.indx == 0
                "
                class="help is-danger"
                >{{ errors.first("toBook" + index + plans.indx) }}</span
              >
            </b-col>
            <b-col class="col-sm-2">
              <b-form-select
                v-model="plans.toChapter"
                class="spaceBetweenTxt"
                placeholder="Chapter"
                :name="'toChapter' + index + plans.indx"
                data-vv-as="Chapter"
                v-validate="
                  plans.toBook != ''
                    ? 'required|numeric|max_value: ' +
                      distinctChapter.filter(x => x.bookId == plans.toBook)
                        .length +
                      ''
                    : ''
                "
                :class="{
                  'is-danger': errors.has('toChapter' + index + plans.indx)
                }"
                @change="toVerseCount(index, plans.indx)"
              >
                <option value>select</option>
                <option
                  v-for="(option, inde) in distinctChapter.filter(
                    x => x.bookId == plans.toBook
                  )"
                  :key="inde"
                  :value="option.chapterId"
                  >{{ option.chapterId }}</option
                >
              </b-form-select>
              <span
                v-show="errors.has('toChapter' + index + plans.indx)"
                class="help is-danger"
                >{{ errors.first("toChapter" + index + plans.indx) }}</span
              >
            </b-col>
            <b-col class="col-sm-2">
              <b-form-select
                v-model="plans.toVerse"
                class="spaceBetweenTxt"
                placeholder="Verse"
                :name="'toVerse' + index + plans.indx"
                data-vv-as="Verse"
                v-validate="
                  plans.toBook != '' && plans.toChapter != ''
                    ? 'required|numeric|max_value:' +
                      bible.filter(
                        x =>
                          x.bookId == plans.toBook &&
                          x.chapterId == plans.toChapter
                      ).length +
                      ''
                    : ''
                "
                :class="{
                  'is-danger': errors.has('toVerse' + index + plans.indx)
                }"
              >
                <option value>select</option>
                <option
                  v-for="(option, inde) in bible.filter(
                    x =>
                      x.bookId == plans.toBook && x.chapterId == plans.toChapter
                  )"
                  :key="inde"
                  :value="option.verseId"
                  >{{ option.verseId }}</option
                >
              </b-form-select>
              <span
                v-show="errors.has('toVerse' + index + plans.indx)"
                class="help is-danger"
                >{{ errors.first("toVerse" + index + plans.indx) }}</span
              >
            </b-col>
          </b-row>
        </div>
      </div>
      <div class="marginTop30" v-if="readingPlans.length > 0">
        <b-button type="submit" variant="success" class="text-right"
          >Save</b-button
        >
      </div>
    </form>
    <!--add message popup-->
    <b-modal
      id="modal-plan"
      ref="addModal"
      hide-header-close
      no-close-on-backdrop
      ok-only
      ok-title="Ok"
    >
      <div class="text-center">
        <i class="fa fa-check-circle success-tick"></i>
      </div>
      <p class="my-4 text-center">{{ addMsg }}</p>
    </b-modal>
    <b-modal
      id="modal-xml"
      ref="xmlModal"
      hide-header-close
      no-close-on-backdrop
      ok-title="Ok"
      @ok="handleXml"
    >
      <div class="text-center">
        <i class="fa fa-check-circle success-tick"></i>
      </div>
      <p class="my-4 text-center">{{ xmlMsg }}</p>
    </b-modal>
  </div>
</template>
<script>
import axios from "axios";
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";
import { Validator } from "vee-validate";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    const dictionary = {
      en: {
        messages: {
          required: function() {
            return "This field is required";
          },
          alpha_spaces: function() {
            return "Only accept alphabets and spaces";
          }
        }
      }
    };
    Validator.localize(dictionary);
    return {
      showReadings: false,
      currentPage: 1,
      perPage: 5,
      pageNumber: 1,
      totalRows: 0,
      dailyReading: [],
      paginatedItems: [],
      show: false,
      showPlan: false,
      format: "dd MMM",
      disabledDates: {
        from: new Date()
      },
      currentSlide: 0,
      noOfReadingPlanOptions: [
        { value: "1", text: "1" },
        { value: "2", text: "2" },
        { value: "3", text: "3" },
        { value: "4", text: "4" },
        { value: "5", text: "5" },
        { value: "6", text: "6" },
        { value: "7", text: "7" },
        { value: "8", text: "8" },
        { value: "9", text: "9" }
      ],
      fromToReading: [],
      plans: [],
      readingPlans: [],
      paginateDay: [],
      readDay: "",
      existMsg: false,
      xmlMsg: "",
      addMsg: "",
      alreadyAddedMakeDay: "",
      findMakeDay: "",
      showMakeUpWarning: false,
      formData: {
        planName: "",
        Date: "",
        noOfReadingPlan: 0,
        fromBook: [],
        fromChapter: [],
        fromVerse: [],
        toBook: [],
        toChapter: [],
        toVerse: [],
        chapterErr: false,
        dayOfReading: "",
        dateOfReading: ""
      }
    };
  },
  methods: {
    ...mapActions(["createReading"]),
    verseCount(index, inx) {
      const payload = {
        b: this.formData.fromBook[index],
        c: this.formData.fromChapter[index]
      };
      return this.$store.dispatch("loadVerse", payload);
    },
    toVerseCount(index, inx) {
      const payload = {
        b: this.formData.toBook[index],
        c: this.formData.toChapter[index]
      };
      return this.$store.dispatch("loadVerse", payload);
    },
    chapterCount(index, inx) {
      const payload = {
        b: this.formData.fromBook[index]
      };
      return this.$store.dispatch("loadChapterByBook", payload);
    },
    toChapterCount(index, inx) {
      const payload = {
        b: this.formData.toBook[index]
      };
      return this.$store.dispatch("loadChapterByBook", payload);
    },
    appendLeadingZeros(n) {
      if (n <= 9) {
        return "0" + n;
      }
      return n;
    },
    addReadingPlan() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.plans = [];
          for (var i = 0; i < this.readingPlans.length; i++) {
            let data = "";
            data = {
              fromBook: this.readingPlans[i].fromBook,
              fromChapter:
                this.readingPlans[i].fromBook === ""
                  ? ""
                  : this.readingPlans[i].fromChapter,
              fromVerse:
                this.readingPlans[i].fromBook === ""
                  ? ""
                  : this.readingPlans[i].fromVerse,
              toBook: this.readingPlans[i].toBook,
              toChapter:
                this.readingPlans[i].toBook === ""
                  ? ""
                  : this.readingPlans[i].toChapter,
              toVerse:
                this.readingPlans[i].toBook === ""
                  ? ""
                  : this.readingPlans[i].toVerse
            };
            if (data !== "") {
              this.plans.push(data);
            }
          }
          let day =
            this.bibleplan[
              this.bibleplan.findIndex(x => x.id === this.formData.planName)
            ].byDate === 1
              ? "readingDate"
              : "readingDay";
          // let Dat = "";
          // if (day == "readingDate") {
          //   let a = this.formData.dateOfReading;
          //   Dat =
          //     a.getFullYear() +
          //     "-" +
          //     this.appendLeadingZeros(a.getMonth() + 1) +
          //     "-" +
          //     this.appendLeadingZeros(a.getDate());
          // }
          let l = this.formData.dateOfReading;
          let dayOrDate =
            day !== "readingDate"
              ? this.formData.dayOfReading
              : this.showAutoDate
              ? this.showAutoDate
              : l.toString().substr(8, 2) + " " + l.toString().substr(4, 3);
          const payload = {
            planDetail: {
              planId: this.formData.planName,
              [day]: dayOrDate
            },
            readingPlan: this.plans
          };
          this.createReading(payload);
          if (typeof this.dailyReading.readingPlan == "undefined") {
            this.addMsg = "Added Successfully";
            this.$bvModal.show("modal-plan");
            this.formData.planName = "";
            this.readingPlans = [];
          } else if (
            this.totalRows - 1 ==
            this.dailyReading.readingPlan.length
          ) {
            this.xmlMsg =
              "You have added all readings for this plan. Do you wants to generate XML ?";
            this.$bvModal.show("modal-xml");
          } else {
            this.addMsg = "Added Successfully";
            this.$bvModal.show("modal-plan");
            this.formData.planName = "";
            this.readingPlans = [];
          }
          // this.formData.planName = ""
          this.readingPlans = [];
          this.formData.dayOfReading = "";
          this.formData.dateOfReading = "";
          this.alreadyAddedMakeDay = "";
          this.findMakeDay = "";
          this.showMakeUpWarning = false;
        }
      });
      // }
    },
    readingPlanNo() {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.showMakeUpWarning = false;
        this.existMsg = false;
        this.readingPlans = [];
        var self = this;
        const pId = self.formData.planName;
        axios
          .get(
            process.env.VUE_APP_DB_API + "bibleplan/allReading?planId=" + pId,
            {
              headers: {
                "x-access-token": localStorage.getItem("authToken")
              }
            }
          )
          .then(
            response => {
              self.dailyReading = response.data;
              var c = self.bibleplan.findIndex(
                y => y.id === self.formData.planName
              );
              self.totalRows = self.bibleplan[c].planduration;
              self.formData.noOfReadingPlan = self.bibleplan[c].readingsperday;
              if (
                typeof self.dailyReading.readingPlan == "undefined" ||
                self.totalRows > self.dailyReading.readingPlan.length
              ) {
                this.formData.dayOfReading =
                  typeof this.dailyReading.readingPlan == "undefined"
                    ? 1
                    : this.dailyReading.readingPlan.length + 1;
                let len = "";
                let newDateFormat = "";
                if (typeof this.dailyReading.readingPlan != "undefined") {
                  len = this.dailyReading.readingPlan.length;
                  let pastDate = this.dailyReading.readingPlan[len - 1]
                    .dayOrDate;
                  var monNum = pastDate.substr(3);
                  var dateHash = {
                    Jan: "01",
                    Feb: "02",
                    Mar: "03",
                    Apr: "04",
                    May: "05",
                    Jun: "06",
                    Jul: "07",
                    Aug: "08",
                    Sep: "09",
                    Oct: "10",
                    Nov: "11",
                    Dec: "12"
                  };
                  var nowDat = new Date();
                  var nowYr = nowDat.getFullYear();
                  let changeFormate =
                    nowYr +
                    "-" +
                    dateHash[monNum] +
                    "-" +
                    pastDate.substr(0, 2);
                  let correctDat = new Date(changeFormate);
                  let addOne = correctDat.getDate() + 1;
                  let mon = correctDat.getMonth() + 1;
                  newDateFormat = new Date(
                    correctDat.getFullYear() +
                      "-" +
                      this.appendLeadingZeros(mon) +
                      "-" +
                      this.appendLeadingZeros(addOne)
                  );
                  var n = newDateFormat.toUTCString();
                  // this.showAutoDate =
                  //   this.appendLeadingZeros(addOne) +
                  //   "-" +
                  //   this.appendLeadingZeros(mon) +
                  //   "-" +
                  //   correctDat.getFullYear();
                  this.showAutoDate = n.substr(5, 6);
                }
                this.formData.dateOfReading =
                  typeof this.dailyReading.readingPlan == "undefined"
                    ? ""
                    : this.showAutoDate;
                this.alreadyAddedMakeDay = self.bibleplan[c].makeupday;
                let byDayMakeLoop = (
                  self.bibleplan[c].planduration / 7
                ).toFixed();
                var arr = [];
                var inc = 0;
                if (self.bibleplan[c].makeupday) {
                  for (var m = 0; m <= byDayMakeLoop; m++) {
                    let byDayMake = parseInt(self.alreadyAddedMakeDay) + inc;
                    arr.push(byDayMake);
                    inc = inc + 7;
                  }
                  var totRead =
                    typeof this.dailyReading.readingPlan != "undefined"
                      ? this.dailyReading.readingPlan.length + 1
                      : 1;
                  this.findMakeDay =
                    self.bibleplan[c].byDate == 0
                      ? arr.includes(this.formData.dayOfReading)
                      : arr.includes(totRead);
                  this.showMakeUpWarning =
                    this.findMakeDay === true ? "true" : "false";
                }
                for (var l = 0; l < self.formData.noOfReadingPlan; l++) {
                  self.readingPlans.push({
                    fromBook: "",
                    fromChapter: "",
                    fromVerse: "",
                    toBook: "",
                    toChapter: "",
                    toVerse: "",
                    indx: l
                  });
                }
              } else {
                this.existMsg = true;
              }
            },
            error => {
              console.log(error);
            }
          );
      }
    },
    handleXml(bvModalEvt) {
      bvModalEvt.preventDefault();
      const payload = {
        planId: this.formData.planName
      };
      this.$store.dispatch("GeneratePlanXml", payload);
      this.$nextTick(() => {
        this.$refs.xmlModal.hide();
      });
    }
  },
  computed: {
    ...mapState([
      "bible",
      "chapter",
      "bookList",
      "bibleplan",
      "verse",
      "distinctChapter"
    ])
  },
  components: {
    Datepicker
  }
};
</script>