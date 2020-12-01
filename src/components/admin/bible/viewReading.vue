<template>
  <div class="marginTop30">
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
        @change="getReadingsByPlanId()"
      >
        <option class="disable" disabled value>Select</option>
        <option v-for="(pn, index) in bibleplan" :key="index" :value="pn.id">{{
          pn.name
        }}</option>
      </b-form-select>
      <span v-show="errors.has('planName')" class="help is-danger">{{
        errors.first("planName")
      }}</span>
    </b-form-group>
    <b-col md="8" class="mb-2">
      <b-row class="text-center">
        <b-col md="6" class="my-1">
          <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
            <b-input-group>
              <b-form-input
                v-model="filter"
                placeholder="Type to Search"
              ></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''"
                  >Clear</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col md="4" class="my-1">
          <b-form-group label-cols-sm="7" label="Per page" class="mb-0">
            <b-form-select
              v-model="perPage"
              :options="pageOptions"
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>

      <!-- <div v-if="dailyReading.length>0"> -->
      <b-table
        v-if="dailyReading != undefined && formData.planName"
        class="table-bordered viewtable-width marginTop30"
        :items="dailyReading.readingPlan"
        :fields="columns"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filterIncludedFields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
      >
        <template v-slot:cell(action)="data">
          <i
            @click="
              viewPlanClk(data.item.dayOrDate, data.item.plan, data.index)
            "
            v-b-tooltip.hover
            title="view"
            style="color: rgb(11, 79, 148);"
            class="fa fa-eye action-icons edit-active"
          ></i>
          <i
            @click="
              editPlanClk(data.item.dayOrDate, data.item.plan, data.index)
            "
            v-b-tooltip.hover
            title="edit"
            class="far fa-edit action-icons edit-active"
          ></i>
        </template>
      </b-table>

      <b-col md="6" class="my-1" v-if="dailyReading != undefined">
        <b-pagination
          v-model="currentPage"
          :total-rows="dailyReading.readingPlan.length"
          :per-page="perPage"
          class="my-0"
        ></b-pagination>
      </b-col>
      <!-- </div> -->
    </b-col>
    <b-modal
      ref="viewBibleReading"
      size="lg"
      title="View Readings"
      no-close-on-backdrop
      centered
      ok-only
      ok-title="Close"
    >
      <p>Day {{ readingDay }}</p>
      <form>
        <div v-for="(item, index) in readingItem" :key="index">
          <b-row class="marTop10">
            <label for class="col-sm-3">Reading {{ index + 1 }}</label>
            <span class="col-sm-2">From</span>

            <b-col class="col-sm-3">
              <b-form-select
                v-model="item.Module.fromBook"
                v-validate="'required'"
                :class="{ 'is-danger': errors.has('fromBook' + index) }"
                :name="'fromBook' + index"
                readonly
              >
                <option disabled value>select</option>
                <option
                  v-for="(option, inde) in bookList"
                  :key="inde"
                  :value="option.id"
                  >{{ option.name }}</option
                >
              </b-form-select>
              <span
                v-show="errors.has('fromBook' + index)"
                class="help is-danger"
                >{{ errors.first("fromBook" + index) }}</span
              >
            </b-col>
            <b-col class="col-sm-2">
              <b-form-input
                v-model="item.Module.fromChapter"
                class="spaceBetweenTxt"
                placeholder="Chapter"
                :name="'fromChapter' + index"
                data-vv-as="Chapter"
                v-validate="'required|numeric'"
                :class="{ 'is-danger': errors.has('fromChapter' + index) }"
              />
            </b-col>
            <b-col class="col-sm-2">
              <b-form-input
                v-model="item.Module.fromVerse"
                class="spaceBetweenTxt"
                placeholder="Verse"
                :name="'fromVerse' + index"
                data-vv-as="Verse"
              />
            </b-col>
          </b-row>
          <b-row class="marTop10">
            <b-col sm="3"></b-col>
            <span class="col-md-2">To</span>
            <b-col class="col-sm-3">
              <b-form-select
                v-model="item.Module.toBook"
                :name="'toBook' + index"
                v-validate="'required'"
                :class="{ 'is-danger': errors.has('toBook' + index) }"
              >
                <option disabled value>select</option>
                <option
                  v-for="(option, inde) in bookList"
                  :key="inde"
                  :value="option.id"
                  >{{ option.name }}</option
                >
              </b-form-select>
              <span
                v-show="errors.has('toBook' + index)"
                class="help is-danger"
                >{{ errors.first("toBook" + index) }}</span
              >
            </b-col>
            <b-col class="col-sm-2">
              <b-form-input
                v-model="item.Module.toChapter"
                class="spaceBetweenTxt"
                placeholder="Chapter"
                :name="'toChapter' + index"
                data-vv-as="Chapter"
              />
            </b-col>
            <b-col class="col-sm-2">
              <b-form-input
                v-model="item.Module.toVerse"
                class="spaceBetweenTxt"
                placeholder="Verse"
                :name="'toVerse' + index"
                data-vv-as="Verse"
              />
            </b-col>
          </b-row>
        </div>
      </form>
    </b-modal>
    <b-modal
      ref="editBibleReading"
      size="lg"
      title="Update Readings"
      no-close-on-backdrop
      centered
      ok-title="Update"
    >
      <p v-if="msg" class="invalid-cls">{{ msg }}</p>
      <p>Day {{ readingDay }}</p>
      <form>
        <div v-for="(item, index) in readingItem" :key="index">
          <!-- {{item}} -->
          <b-row class="marTop10">
            <label for class="col-sm-3">Reading {{ index + 1 }}</label>
            <span class="col-sm-2">From</span>

            <b-col class="col-sm-3">
              <b-form-select
                v-model="item.Module.fromBook"
                v-validate="'required'"
                :class="{ 'is-danger': errors.has('fromBook' + index) }"
                :name="'fromBook' + index"
              >
                <option disabled value>select</option>
                <option
                  v-for="(option, inde) in bookList"
                  :key="inde"
                  :value="option.id"
                  >{{ option.name }}</option
                >
              </b-form-select>
              <span
                v-show="errors.has('fromBook' + index)"
                class="help is-danger"
                >{{ errors.first("fromBook" + index) }}</span
              >
            </b-col>
            <b-col class="col-sm-2" v-if="item.Module.fromBook">
              <b-form-select
                v-model="item.Module.fromChapter"
                class="spaceBetweenTxt"
                placeholder="Chapter"
                :name="'fromChapter' + index"
                data-vv-as="Chapter"
                v-validate="
                  'required|numeric|max_value: ' +
                    distinctChapter.filter(
                      x => x.bookId == item.Module.fromBook
                    ).length +
                    ''
                "
                :class="{ 'is-danger': errors.has('fromChapter' + index) }"
              >
                <option disabled value>select</option>
                <option
                  v-for="(option, inde) in distinctChapter.filter(
                    x => x.bookId == item.Module.fromBook
                  )"
                  :key="inde"
                  :value="option.chapterId"
                  >{{ option.chapterId }}</option
                >
              </b-form-select>
              <span
                v-show="errors.has('fromChapter' + index)"
                class="help is-danger"
                >{{ errors.first("fromChapter" + index) }}</span
              >
            </b-col>
            <b-col class="col-sm-2" v-if="item.Module.fromChapter">
              <b-form-select
                v-model="item.Module.fromVerse"
                class="spaceBetweenTxt"
                placeholder="Verse"
                :name="'fromVerse' + index"
                data-vv-as="Verse"
                v-validate="
                  'required|numeric|max_value:' +
                    bible.filter(
                      x =>
                        x.bookId == item.Module.fromBook &&
                        x.chapterId == item.Module.fromChapter
                    ).length +
                    ''
                "
                :class="{ 'is-danger': errors.has('fromVerse' + index) }"
              >
                <option disabled value>select</option>
                <option
                  v-for="(option, inde) in bible.filter(
                    x =>
                      x.bookId == item.Module.fromBook &&
                      x.chapterId == item.Module.fromChapter
                  )"
                  :key="inde"
                  :value="option.verseId"
                  >{{ option.verseId }}</option
                >
              </b-form-select>
              <span
                v-show="errors.has('fromVerse' + index)"
                class="help is-danger"
                >{{ errors.first("fromVerse" + index) }}</span
              >
            </b-col>
          </b-row>
          <b-row class="marTop10">
            <b-col sm="3"></b-col>
            <span class="col-md-2">To</span>
            <b-col class="col-sm-3">
              <b-form-select
                v-model="item.Module.toBook"
                :name="'toBook' + index"
                v-validate="'required'"
                :class="{ 'is-danger': errors.has('toBook' + index) }"
              >
                <option disabled value>select</option>
                <option
                  v-for="(option, inde) in bookList"
                  :key="inde"
                  :value="option.id"
                  >{{ option.name }}</option
                >
              </b-form-select>
              <span
                v-show="errors.has('toBook' + index)"
                class="help is-danger"
                >{{ errors.first("toBook" + index) }}</span
              >
            </b-col>
            <b-col class="col-sm-2" v-if="item.Module.toBook">
              <b-form-select
                v-model="item.Module.toChapter"
                class="spaceBetweenTxt"
                placeholder="Chapter"
                :name="'fromChapter' + index"
                data-vv-as="Chapter"
                v-validate="
                  'required|numeric|max_value: ' +
                    distinctChapter.filter(x => x.bookId == item.Module.toBook)
                      .length +
                    ''
                "
                :class="{ 'is-danger': errors.has('fromChapter' + index) }"
              >
                <option disabled value>select</option>
                <option
                  v-for="(option, inde) in distinctChapter.filter(
                    x => x.bookId == item.Module.toBook
                  )"
                  :key="inde"
                  :value="option.chapterId"
                  >{{ option.chapterId }}</option
                >
              </b-form-select>
              <span
                v-show="errors.has('toChapter' + index)"
                class="help is-danger"
                >{{ errors.first("toChapter" + index) }}</span
              >
            </b-col>
            <b-col class="col-sm-2" v-if="item.Module.toChapter">
              <b-form-select
                v-model="item.Module.toVerse"
                class="spaceBetweenTxt"
                placeholder="Verse"
                :name="'toVerse' + index"
                data-vv-as="Verse"
                v-validate="
                  'required|numeric|max_value:' +
                    bible.filter(
                      x =>
                        x.bookId == item.Module.toBook &&
                        x.chapterId == item.Module.toChapter
                    ).length +
                    ''
                "
                :class="{ 'is-danger': errors.has('fromVerse' + index) }"
              >
                <option disabled value>select</option>
                <option
                  v-for="(option, inde) in bible.filter(
                    x =>
                      x.bookId == item.Module.toBook &&
                      x.chapterId == item.Module.toChapter
                  )"
                  :key="inde"
                  :value="option.verseId"
                  >{{ option.verseId }}</option
                >
              </b-form-select>
              <span
                v-show="errors.has('toVerse' + index)"
                class="help is-danger"
                >{{ errors.first("toVerse" + index) }}</span
              >
            </b-col>
          </b-row>
        </div>
      </form>
      <template v-slot:modal-footer="{ ok, cancel }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button size="sm" variant="success" @click="handleUpdate()"
          >Update</b-button
        >
        <b-button size="sm" variant="danger" @click="cancel()">Cancel</b-button>
        <!-- Button with custom close trigger value -->
        <b-button size="sm" variant="primary" @click="generateXml()"
          >Generate Xml</b-button
        >
      </template>
    </b-modal>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      columns: [
        {
          key: "dayOrDate",
          label: "Day",
          class: "row2",
          sortable: true,
          sortDirection: "desc"
        },
        { key: "action", class: "row6 text-center", label: "Actions" }
      ],
      readingItem: "",
      readingDay: "",
      msg: false,
      plans: [],
      fromToReadingEdit: [],
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 50, 100],
      sortBy: null,
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      formData: {
        planName: "",
        fromBook: [],
        fromChapter: [],
        fromVerse: [],
        toBook: [],
        toChapter: [],
        toVerse: []
      },
      chooseLang: "",
      versionId: "",
      verId: "",
      showVersionName: "",
      editchooseLang: "",
      editversionId: "",
      bId: "",
      itm: ""
    };
  },
  computed: {
    ...mapState(["bibleplan", "bookList", "distinctChapter", "bible"]),
    dailyReading: {
      get() {
        return this.$store.state.dailyReading;
      },
      set(value) {
        this.$store.commit("loadReadingByPlan", value);
      }
    }
  },
  methods: {
    ...mapActions(["editReadingPlan"]),
    generateXml() {
      if (this.formData.planName !== "") {
        const payload = {
          planId: this.formData.planName
        };
        return this.$store.dispatch("GeneratePlanXml", payload);
      }
    },
    getReadingsByPlanId() {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.dailyReading = null;
        if (this.formData.planName !== "") {
          const payload = {
            planId: this.formData.planName
          };
          return this.$store.dispatch("loadExistingReading", payload);
        }
      }
    },
    handleSubmit() {
      if (this.bId) {
        this.editExistingBible(this.bId, this.itm);
      }
    },
    editExistingBible(id, itm) {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          const payload = {
            userId: localStorage.getItem("userId"),
            data: {
              bibleId: this.bId,
              langId: this.editchooseLang,
              langType: this.existinglang[this.editchooseLang - 1].langType,
              versionId: this.editversionId,
              versionName: this.allVersion[this.editversionId - 1].versionName
            }
          };
          this.editBible(payload);
        }
      });
    },
    editPlanClk(id, item, index) {
      this.readingItem = "";
      this.readingDay = id;
      this.readingItem = item;
      this.$refs.editBibleReading.show();
    },
    handleUpdate() {
      for (var i = 0; i < this.readingItem.length; i++) {
        let data = "";
        data = {
          id: this.readingItem[i].Module.readingId,
          planModuleId: this.readingItem[i].Module.planModuleId,
          fromBook: this.readingItem[i].Module.fromBook,
          fromChapter: this.readingItem[i].Module.fromChapter,
          fromVerse: this.readingItem[i].Module.fromVerse,
          toBook: this.readingItem[i].Module.toBook,
          toChapter: this.readingItem[i].Module.toChapter,
          toVerse: this.readingItem[i].Module.toVerse
        };
        if (data !== "") {
          this.plans.push(data);
        }
      }
      const payload = {
        planDetail: {
          id: this.readingItem[0].Module.planModuleId,
          planId: this.formData.planName
        },
        update: this.plans
      };
      this.editReadingPlan(payload);
      this.msg = "Readings Updated Successfully";
      var self = this;
      setTimeout(function() {
        self.msg = false;
        self.$refs.editBibleReading.hide();
      }, 3000);
    },
    viewPlanClk(id, item, index) {
      this.readingItem = "";
      this.readingDay = id;
      this.readingItem = item;
      this.$refs.viewBibleReading.show();
    }
  }
};
</script>
