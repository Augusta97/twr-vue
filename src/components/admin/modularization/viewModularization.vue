<template>
  <b-container fluid>
    <b-row class="form-height">
      <app-sidebar />
      <b-col md="10" class="mb-2 form-bg">
        <admin-header></admin-header>
        <!-- {{courseList}} -->
        <div aria-label="breadcrumb" class="breadcrumpCss">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Add New Course
            </li>
          </ol>
        </div>
        <div>
          <b-form class="grpbg" enctype="multipart/form-data">
            <b-row>
              <b-form-group class="col-sm-12">
                <h5>Edit Course</h5>
              </b-form-group>
            </b-row>
            <b-row>
              <b-col sm="8" class="marginTop">
                <b-row>
                  <b-form-group class="col-sm-12">
                    <label for="title">Title</label>
                    <b-form-input
                      v-model="formData.title"
                      type="text"
                      name="title"
                      id="title"
                      class="form-control"
                      v-validate="'required'"
                      :class="{ 'is-danger': errors.has('title') }"
                    />
                    <span v-show="errors.has('title')" class="help is-danger">
                      {{ errors.first("title") }}
                    </span>
                  </b-form-group>
                </b-row>
                <b-row>
                  <b-form-group class="col-sm-12">
                    <label for="textarea-rows">Description</label>
                    <b-form-textarea
                      v-model="formData.description"
                      type="text"
                      name="description"
                      v-validate="'required'"
                      rows="6"
                      id="textarea-rows"
                      :class="{ 'is-danger': errors.has('description') }"
                    />
                    <span
                      v-show="errors.has('description')"
                      class="help is-danger"
                      >{{ errors.first("description") }}</span
                    >
                  </b-form-group>
                </b-row>
                <b-row>
                  <b-form-group label="Start Date" class="col">
                    <datepicker
                      v-model="formData.startDate"
                      v-validate="'required'"
                      placeholder="Select Date"
                      input-class="form-control bg-white"
                      data-vv-name="startDate"
                      input-name="startDate"
                      :format="format"
                      :class="{ 'is-danger': errors.has('startDate') }"
                      :disabled-dates="disabledDates"
                    />
                    <span
                      v-show="errors.has('startDate')"
                      class="help is-danger"
                      >{{ errors.first("startDate") }}</span
                    >
                  </b-form-group>
                </b-row>
              </b-col>
            </b-row>
            <b-row class="border-padd">
              <b-col sm="6">Add Sections</b-col>
              <b-col sm="6 text-right">
                <i class="fa fa-minus collapse-icon"></i>
              </b-col>
            </b-row>
            <!-- {{courseList.course}} -->
            <div
              role="tablist"
              class="removeBg"
              v-if="typeof courseList.course != 'undefined'"
            >
              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-row>
                    <b-col
                      sm="10"
                      v-for="(sec, index) in courseList.course.section"
                      :key="index"
                    >
                      <div v-if="sec.type !== 'deleteSection'">
                        <b-input-group class="mb-2">
                          <b-input-group-prepend is-text>
                            <span class="collapse-icon"
                              >{{ " " }}{{ index + 1 }}</span
                            >
                          </b-input-group-prepend>
                          <b-form-input
                            type="text"
                            placeholder="Write section name"
                            v-model="sec.sectionName"
                            :name="`section[${index}][name]`"
                            v-validate="'required'"
                            :class="{
                              'is-danger': errors.has('sectionName' + [index])
                            }"
                          ></b-form-input>
                          <b-input-group-append>
                            <b-button
                              variant="info"
                              block
                              v-b-toggle="'accordion-' + index"
                            >
                              <i
                                class="fa fa-caret-down collapse-icon mt-2"
                              ></i>
                            </b-button>
                          </b-input-group-append>
                          <span
                            v-show="errors.has('sectionName' + [index])"
                            class="help is-danger"
                            >{{ errors.first("sectionName" + [index]) }}</span
                          >
                        </b-input-group>
                        <b-collapse
                          :id="'accordion-' + index"
                          visible
                          accordion="my-accordion"
                          role="tabpanel"
                          v-if="sec.sectionName !== 'delete'"
                        >
                          <h5 class="mx-3 my-3" v-if="sec.lessons.length > 0">
                            Selected Lessons & Tests
                          </h5>
                          <div class="mb-1 col">
                            <div class="drag">
                              <draggable
                                :list="sec.lessons"
                                :name="index"
                                v-model="formData.listedItems"
                                class="dragArea"
                              >
                                <div
                                  v-for="(list, inx) in sec.lessons"
                                  v-bind:key="inx"
                                >
                                  <b-card v-if="list.updateType != 'delete'">
                                    <div class="px-2 py-2">
                                      <span class="badge">{{ inx + 1 }}</span>
                                      {{
                                        list.mediaTitle
                                          ? list.mediaTitle
                                          : list.questionnaireName
                                      }}
                                    </div>
                                    <b-form-checkbox
                                      :id="'checkbox-1' + index + inx"
                                      v-model="list.dripStatus"
                                      :name="'checkbox-1' + index + inx"
                                      value="1"
                                      unchecked-value="0"
                                      @change="checkDrip($event)"
                                      class="mt-3"
                                      >Dripped</b-form-checkbox
                                    >
                                    <b-row v-if="list.dripStatus == 1">
                                      <b-form-group
                                        label="Select Drip Type"
                                        class="col-6 mt-3"
                                      >
                                        <b-form-select
                                          v-model="list.dripType"
                                          v-validate="'required'"
                                          class="txtbox-design"
                                          :class="{
                                            'is-danger': errors.has(
                                              'dripType' + index + inx
                                            )
                                          }"
                                          :name="'dripType' + index + inx"
                                        >
                                          <option class="disable" disabled value
                                            >Select</option
                                          >
                                          <option value="1"
                                            >After completing previous</option
                                          >
                                          <option value="2"
                                            >After n no of days</option
                                          >
                                          <option value="3"
                                            >After n date</option
                                          >
                                        </b-form-select>
                                        <span
                                          v-show="
                                            errors.has('dripType' + index + inx)
                                          "
                                          class="help is-danger"
                                          >{{
                                            errors.first(
                                              "dripType" + index + inx
                                            )
                                          }}</span
                                        >
                                      </b-form-group>
                                      <b-form-group
                                        label="Date"
                                        class="col-6 mt-3"
                                        v-if="list.dripType == 3"
                                      >
                                        <datepicker
                                          v-model="list.dripDate"
                                          v-validate="'required'"
                                          placeholder="Select Date"
                                          input-class="form-control bg-white"
                                          :data-vv-name="
                                            'dripDate' + index + inx
                                          "
                                          :input-name="'dripDate' + index + inx"
                                          :format="format"
                                          :class="{
                                            'is-danger': errors.has(
                                              'dripDate' + index + inx
                                            )
                                          }"
                                          :disabled-dates="disabledDates"
                                        />
                                        <span
                                          v-show="
                                            errors.has('dripDate' + index + inx)
                                          "
                                          class="help is-danger"
                                          >{{
                                            errors.first(
                                              "dripDate" + index + inx
                                            )
                                          }}</span
                                        >
                                      </b-form-group>
                                      <b-form-group
                                        label="Day"
                                        class="col-6 mt-3"
                                        v-if="list.dripType == 2"
                                      >
                                        <b-form-input
                                          type="number"
                                          placeholder="Day"
                                          v-model="list.dripDay"
                                          :name="'dripDay' + index + inx"
                                          v-validate="'required|numeric'"
                                          :class="{
                                            'is-danger': errors.has(
                                              'dripDay' + index + inx
                                            )
                                          }"
                                        ></b-form-input>
                                        <span
                                          v-show="
                                            errors.has('dripDay' + index + inx)
                                          "
                                          class="help is-danger"
                                          >{{
                                            errors.first(
                                              "dripDay" + index + inx
                                            )
                                          }}</span
                                        >
                                      </b-form-group>
                                    </b-row>
                                  </b-card>
                                </div>
                              </draggable>
                            </div>
                          </div>
                          <b-row class="height100">
                            <b-col sm="6">
                              <b-collapse
                                :id="'accordion-' + index"
                                visible
                                accordion="my-accordion"
                                role="tabpanel"
                              >
                                <b-card-body>
                                  <b-button block variant="info"
                                    >Lessons</b-button
                                  >
                                  <b-form-select
                                    v-model="formData.lesson"
                                    :name="`section[${index}]`"
                                    class="txtbox-design"
                                    :class="{
                                      input: true,
                                      'is-danger': errors.has('status')
                                    }"
                                    @change="
                                      onSelectLesson(0, index, sec.sectionId)
                                    "
                                  >
                                    <option class="disable" disabled value
                                      >Select</option
                                    >
                                    <option
                                      v-for="(s, index) in searchLes"
                                      :key="index"
                                      :value="s.value"
                                      >{{ s.text }}</option
                                    >
                                  </b-form-select>
                                </b-card-body>
                              </b-collapse>
                            </b-col>
                            <b-col sm="6">
                              <b-collapse
                                :id="'accordion-' + index"
                                visible
                                accordion="my-accordion"
                                role="tabpanel"
                              >
                                <b-card-body>
                                  <b-button block variant="info"
                                    >Questions</b-button
                                  >
                                  <b-form-select
                                    v-model="formData.question"
                                    name="question"
                                    class="txtbox-design"
                                    :class="{
                                      input: true,
                                      'is-danger': errors.has('question')
                                    }"
                                    @change="
                                      onSelectLesson(1, index, sec.sectionId)
                                    "
                                  >
                                    <option class="disable" disabled value
                                      >Select</option
                                    >
                                    <option
                                      v-for="(s, index) in searchQues"
                                      :key="index"
                                      :value="s.value"
                                      >{{ s.text }}</option
                                    >
                                  </b-form-select>
                                </b-card-body>
                              </b-collapse>
                            </b-col>
                          </b-row>
                        </b-collapse>
                      </div>
                    </b-col>
                  </b-row>
                </b-card-header>
              </b-card>
            </div>
            <b-form-group class="col-sm-12 text-right">
              <!-- <router-link to="/ViewEvent">
                <button class="btn btn-warning">Cancel</button>
              </router-link>-->
              <b-button type="button" class="btn btn-warning" @click="backbtn()"
                >Cancel</b-button
              >
            </b-form-group>
          </b-form>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import sidebar from "../../admin/sidebar.vue";
import adminHeader from "../../admin/adminHeader.vue";
import { Validator } from "vee-validate";
import { mapState, mapActions } from "vuex";
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";
import draggable from "vuedraggable";
import axios from "axios";
export default {
  data() {
    const dictionary = {
      en: {
        messages: {
          required: function() {
            return "This field is required";
          },
          numeric: function() {
            return "Only accept digits";
          }
        }
      }
    };
    Validator.localize(dictionary);
    return {
      format: "d MMMM yyyy",
      disabledDates: {
        to: new Date()
      },
      showDripType: false,
      sectionIndex: "",
      sectionData: "",
      delMsg: "",
      secindex: "",
      section: [
        {
          name: "",
          parts: []
        }
      ],
      formData: {
        title: "",
        description: "",
        sectionName: "",
        lesson: "",
        question: "",
        listedItems: [],
        startDate: ""
      },
      type: "",
      sectionList: [
        {
          delete: [],
          add: [],
          update: []
        }
      ],
      selectedLessTestList: [],
      searchLes: [],
      courseList: "",
      item: {
        value: "",
        text: ""
      },
      searchQues: [],
      itemQues: {
        value: "",
        text: ""
      },
      changeMsg: ""
    };
  },
  components: {
    "app-sidebar": sidebar,
    "admin-header": adminHeader,
    draggable,
    Datepicker
  },
  computed: {
    ...mapState(["courseMedia", "mediaTest", "messages"])
  },
  created() {
    axios
      .get(
        process.env.VUE_APP_DB_API +
          "course/course?courseId=" +
          this.$route.params.id,
        {
          headers: {
            "x-access-token": localStorage.getItem("authToken")
          }
        }
      )
      .then(
        response => {
          this.allCourse = response.data;
          this.courseList = response.data;
          this.courseList.course.section.forEach(function(element) {
            element.type = "updateSection";
            element.lessons.forEach(function(element1) {
              element1.updateType = "update";
            });
          });
          this.formData.title = this.courseList.course.courseName;
          this.formData.description = this.courseList.course.description;
          this.formData.startDate = this.courseList.course.startDate;
          var SearchList = this.courseMedia;
          SearchList = SearchList.map(function(x) {
            return {
              value: x.ID,
              text: x.title
            };
          });
          this.searchLes = SearchList;
          if (this.courseList != null && this.courseList.course) {
            for (var i = 0; i < this.courseList.course.section.length; i++) {
              for (
                var j = 0;
                j < this.courseList.course.section[i].lessons.length;
                j++
              ) {
                this.searchLes = this.searchLes.filter(
                  x =>
                    x.value !==
                    this.courseList.course.section[i].lessons[j].mediaId
                );
              }
            }
          }
          var SearchQuest = this.mediaTest;
          SearchQuest = SearchQuest.map(function(x) {
            return {
              value: x.qnre_id,
              text: x.qnre_name
            };
          });
          this.searchQues = SearchQuest;
          if (this.courseList != null && this.courseList.course) {
            for (var k = 0; k < this.courseList.course.section.length; k++) {
              for (
                var l = 0;
                l < this.courseList.course.section[k].lessons.length;
                l++
              ) {
                this.searchQues = this.searchQues.filter(
                  x =>
                    x.value !==
                    this.courseList.course.section[k].lessons[l].questionnaireId
                );
              }
            }
          }
        },
        error => {
          console.log(error);
        }
      );
  },
  mounted() {},
  methods: {
    ...mapActions(["createCourses"]),
    backbtn() {
      this.$router.push({ path: "/listModularization/" });
    },
    onSelectLesson(val, Index, id) {
      if (val === 0) {
        var titlename = this.courseMedia.filter(
          x => x.ID === this.formData.lesson
        )[0].title;
        this.type = 2;
        this.courseList.course.section[Index].lessons.push({
          sectionId: id,
          type: this.type,
          mediaId: this.formData.lesson,
          mediaTitle: titlename
        });
        this.searchLes = this.searchLes.filter(
          x => x.value !== this.formData.lesson
        );
      } else {
        var testname = this.mediaTest.filter(
          x => x.qnre_id === this.formData.question
        )[0].qnre_name;
        this.type = 1;
        this.courseList.course.section[Index].lessons.push({
          sectionId: id,
          type: this.type,
          questionnaireName: testname,
          questionnaireId: this.formData.question,
          updateType: "update"
        });
        this.searchQues = this.searchQues.filter(
          x => x.value !== this.formData.question
        );
      }
    }
  }
};
</script>
<style>
.icon {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 0.8rem;
  height: 0.8rem;
  margin: 0 0.3rem;
  top: -0.05rem;
}
.ProseMirror-focused {
  outline: none;
}
</style>
