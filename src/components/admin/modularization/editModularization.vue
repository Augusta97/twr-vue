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
            <li class="breadcrumb-item active" aria-current="page">Add New Course</li>
          </ol>
        </div>
        <div>
          <b-form class="grpbg" enctype="multipart/form-data" @submit.prevent="editCourse">
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
                      {{
                      errors.first("title")
                      }}
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
                    >{{ errors.first('description') }}</span>
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
                      :class="{'is-danger': errors.has('startDate') }"
                      :disabled-dates="disabledDates"
                    />
                    <span
                      v-show="errors.has('startDate')"
                      class="help is-danger"
                    >{{ errors.first('startDate') }}</span>
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
            <div role="tablist" class="removeBg" v-if="typeof courseList.course!='undefined'">
              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-row>
                    <b-col sm="10" v-for="(sec, index) in courseList.course.section" :key="index">
                      <div v-if="sec.type!=='deleteSection'">
                        <b-input-group class="mb-2">
                          <b-input-group-prepend is-text>
                            <span class="collapse-icon">{{' '}}{{index+1}}</span>
                          </b-input-group-prepend>
                          <b-form-input
                            type="text"
                            placeholder="Write section name"
                            v-model="sec.sectionName"
                            :name="`section[${index}][name]`"
                            v-validate="'required'"
                            :class="{ 'is-danger': errors.has('sectionName'+[index]) }"
                          ></b-form-input>
                          <b-input-group-append>
                            <b-button variant="info" block v-b-toggle="'accordion-'+index">
                              <i class="fa fa-caret-down collapse-icon mt-2"></i>
                            </b-button>
                          </b-input-group-append>
                          <i
                            class="fa fa-times collapse-icon mt-3 ml-3"
                            @click="deleSection(index, sec)"
                          ></i>
                          <span
                            v-show="errors.has('sectionName'+[index])"
                            class="help is-danger"
                          >{{ errors.first('sectionName'+[index]) }}</span>
                        </b-input-group>
                        <b-collapse
                          :id="'accordion-'+index"
                          visible
                          accordion="my-accordion"
                          role="tabpanel"
                          v-if="sec.sectionName!=='delete'"
                        >
                          <h5 class="mx-3 my-3" v-if="sec.lessons.length>0">Selected Lessons & Tests</h5>
                          <div class="mb-1 col">
                            <div class="drag">
                              <draggable
                                :list="sec.lessons"
                                :name="index"
                                v-model="formData.listedItems"
                                class="dragArea"
                              >
                                <div v-for="(list,inx) in sec.lessons" v-bind:key="inx">
                                  <b-card v-if="list.updateType!='delete'">
                                    <div class="px-2 py-2">
                                      <span class="badge">{{inx+1}}</span>
                                      {{list.mediaTitle?list.mediaTitle:list.questionnaireName}}
                                      <i
                                        class="fa fa-times flrit"
                                        @click="deleteEvent(index, inx, list)"
                                      ></i>
                                    </div>
                                    <b-form-checkbox
                                      :id="'checkbox-1'+index+inx"
                                      v-model="list.dripStatus"
                                      :name="'checkbox-1'+index+inx"
                                      value="1"
                                      unchecked-value="0"
                                      @change="checkDrip($event)"
                                      class="mt-3"
                                    >Dripped</b-form-checkbox>
                                    <b-row v-if="list.dripStatus==1">
                                      <b-form-group label="Select Drip Type" class="col-6 mt-3">
                                        <b-form-select
                                          v-model="list.dripType"
                                          v-validate="'required'"
                                          class="txtbox-design"
                                          :class="{'is-danger': errors.has('dripType'+index+inx)}"
                                          :name="'dripType'+index+inx"
                                        >
                                          <option class="disable" disabled value>Select</option>
                                          <option value="1">After completing previous</option>
                                          <option value="2">After n no of days</option>
                                          <option value="3">After n date</option>
                                        </b-form-select>
                                        <span
                                          v-show="errors.has('dripType'+index+inx)"
                                          class="help is-danger"
                                        >{{ errors.first('dripType'+index+inx) }}</span>
                                      </b-form-group>
                                      <b-form-group
                                        label="Date"
                                        class="col-6 mt-3"
                                        v-if="list.dripType==3"
                                      >
                                        <datepicker
                                          v-model="list.dripDate"
                                          v-validate="'required'"
                                          placeholder="Select Date"
                                          input-class="form-control bg-white"
                                          :data-vv-name="'dripDate'+index+inx"
                                          :input-name="'dripDate'+index+inx"
                                          :format="format"
                                          :class="{'is-danger': errors.has('dripDate'+index+inx) }"
                                          :disabled-dates="disabledDates"
                                        />
                                        <span
                                          v-show="errors.has('dripDate'+index+inx)"
                                          class="help is-danger"
                                        >{{ errors.first('dripDate'+index+inx) }}</span>
                                      </b-form-group>
                                      <b-form-group
                                        label="Day"
                                        class="col-6 mt-3"
                                        v-if="list.dripType==2"
                                      >
                                        <b-form-input
                                          type="number"
                                          placeholder="Day"
                                          v-model="list.dripDay"
                                          :name="'dripDay'+index+inx"
                                          v-validate="'required|numeric'"
                                          :class="{ 'is-danger': errors.has('dripDay'+index+inx)}"
                                        ></b-form-input>
                                        <span
                                          v-show="errors.has('dripDay'+index+inx)"
                                          class="help is-danger"
                                        >{{ errors.first('dripDay'+index+inx) }}</span>
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
                                :id="'accordion-'+index"
                                visible
                                accordion="my-accordion"
                                role="tabpanel"
                              >
                                <b-card-body>
                                  <b-button block variant="info">Lessons</b-button>
                                  <b-form-select
                                    v-model="formData.lesson"
                                    :name="`section[${index}]`"
                                    class="txtbox-design"
                                    :class="{'input': true, 'is-danger': errors.has('status') }"
                                    @change="onSelectLesson(0, index, sec.sectionId)"
                                  >
                                    <option class="disable" disabled value>Select</option>
                                    <option
                                      v-for="(s, index) in searchLes"
                                      :key="index"
                                      :value="s.value"
                                    >{{ s.text }}</option>
                                  </b-form-select>
                                </b-card-body>
                              </b-collapse>
                            </b-col>
                            <b-col sm="6">
                              <b-collapse
                                :id="'accordion-'+index"
                                visible
                                accordion="my-accordion"
                                role="tabpanel"
                              >
                                <b-card-body>
                                  <b-button block variant="info">Questions</b-button>
                                  <b-form-select
                                    v-model="formData.question"
                                    name="question"
                                    class="txtbox-design"
                                    :class="{'input': true, 'is-danger': errors.has('question') }"
                                    @change="onSelectLesson(1, index, sec.sectionId)"
                                  >
                                    <option class="disable" disabled value>Select</option>
                                    <option
                                      v-for="(s, index) in searchQues"
                                      :key="index"
                                      :value="s.value"
                                    >{{ s.text }}</option>
                                  </b-form-select>
                                </b-card-body>
                              </b-collapse>
                            </b-col>
                          </b-row>
                        </b-collapse>
                      </div>
                    </b-col>
                    <b-col sm="2">
                      <i class="fa fa-plus collapse-icon mt-3" @click="addSection"></i>
                    </b-col>
                  </b-row>
                </b-card-header>
              </b-card>
            </div>
            <b-form-group class="col-sm-12 text-right">
              <!-- <router-link to="/ViewEvent">
                <button class="btn btn-warning">Cancel</button>
              </router-link>-->
              <b-button type="submit" class="btn btn-warning">Submit</b-button>
            </b-form-group>
          </b-form>
        </div>
      </b-col>
    </b-row>
    <b-modal
      id="modal-delete"
      ref="deleteModal"
      no-close-on-backdrop
      ok-title="Yes"
      cancel-title="No"
      @ok="handleDelete"
    >
      <div class="text-center">
        <i class="fa fa-question-circle danger-tick"></i>
      </div>
      <p class="my-4 text-center">{{ delMsg }}</p>
    </b-modal>
    <b-modal id="modal-add" ref="addModal" no-close-on-backdrop>
      <div class="text-center">
        <i class="fa fa-question-circle danger-tick"></i>
      </div>
      <p class="my-4 text-center">{{ delMsg }}</p>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button variant="success" @click="handleAdd">Ok</b-button>
          <b-button variant="primary" @click="handleDeleDb">Cancel</b-button>
        </div>
      </template>
    </b-modal>
    <b-modal
      id="modal-change"
      ref="changeModal"
      hide-header-close
      no-close-on-backdrop
      ok-only
      ok-title="Ok"
      @ok="handleOk"
    >
      <div class="text-center">
        <i class="fa fa-check-circle success-tick"></i>
      </div>
      <p class="my-4 text-center">{{ changeMsg }}</p>
    </b-modal>
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
    editCourse() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          for (var t = 0; t < this.courseList.course.section.length; t++) {
            // alert(t + 1 + "kkk" + this.allCourse.course.section.length);
            alert(this.courseList.course.section[t].sectionId);
            if (
              this.courseList.course.section[t].sectionId === undefined ||
              t.sectionId === ""
            ) {
              this.sectionList[0].add.push({
                name: this.courseList.course.section[t].sectionName,
                lesson: [],
                question: []
              });
              for (
                var p = 0;
                p < this.courseList.course.section[t].lessons.length;
                p++
              ) {
                alert(this.courseList.course.section[t].lessons[p].type);
                alert(this.courseList.course.section[t].lessons[p].type === 2);
                var oBeforeLen =
                  typeof this.courseList.course.section[t - 1] !== "undefined"
                    ? this.courseList.course.section[t - 1].lessons.length + p
                    : p;
                if (this.courseList.course.section[t].lessons[p].type === 2) {
                  this.sectionList[0].add[0].lesson.push({
                    mediaId: this.courseList.course.section[t].lessons[p]
                      .mediaId,
                    order: oBeforeLen + 1
                  });
                } else if (
                  this.courseList.course.section[t].lessons[p].type === 1
                ) {
                  this.sectionList[0].add[0].question.push({
                    questionId: this.courseList.course.section[t].lessons[p]
                      .questionnaireId,
                    order: oBeforeLen + 1
                  });
                }
              }
            } else if (
              this.courseList.course.section[t].type === "deleteSection"
            ) {
              this.sectionList[0].delete.push(
                this.courseList.course.section[t].sectionId
              );
              alert("delete" + this.courseList.course.section[t].sectionId);
            } else {
              this.sectionList[0].update.push({
                id: this.courseList.course.section[t].sectionId,
                name: this.courseList.course.section[t].sectionName,
                lesson: { add: [], delete: [], update: [] },
                question: { add: [], delete: [], update: [] }
              });
              for (
                var u = 0;
                u < this.courseList.course.section[t].lessons.length;
                u++
              ) {
                var oBeforeLenu =
                  typeof this.courseList.course.section[t - 1] !== "undefined"
                    ? this.courseList.course.section[t - 1].lessons.length + u
                    : u;
                if (
                  this.courseList.course.section[t].lessons[u].updateType ===
                  "delete"
                ) {
                  this.sectionList[0].update[0].lesson.delete.push(
                    this.courseList.course.section[t].lessons[u].mediaId
                  );
                } else if (
                  this.courseList.course.section[t].lessons[u]
                    .questionnaireName === "delete"
                ) {
                  this.sectionList[0].update[0].lesson.delete.push(
                    this.courseList.course.section[t].lessons[u].questionnaireId
                  );
                } else if (
                  this.courseList.course.section[t].lessons[u].type === 2
                ) {
                  this.sectionList[0].update[0].lesson.add.push({
                    mediaId: this.courseList.course.section[t].lessons[u]
                      .mediaId,
                    order: oBeforeLenu + 1
                  });
                } else if (
                  this.courseList.course.section[t].lessons[u].type === 1
                ) {
                  this.sectionList[0].update[0].question.add.push({
                    questionId: this.courseList.course.section[t].lessons[u]
                      .questionnaireId,
                    order: oBeforeLenu + 1
                  });
                } else {
                  this.courseList.course.section[t].lessons[u].questionnaireId
                    ? this.sectionList[0].update[0].question.update.push({
                        questionId: this.courseList.course.section[t].lessons[u]
                          .questionnaireId,
                        order: oBeforeLenu + 1
                      })
                    : this.sectionList[0].update[0].lesson.update.push({
                        mediaId: this.courseList.course.section[t].lessons[u]
                          .mediaId,
                        order: oBeforeLenu + 1
                      });
                }
              }
            }
          }
          const payload = {
            course: {
              id: this.$route.params.id,
              name: this.formData.title,
              description: this.formData.description
            },
            section: this.sectionList,
            addedby: localStorage.getItem("userId")
          };
          // this.createCourses(payload);
          console.log(this.allCourse.course.section.length);
          console.log(payload);
          this.changeMsg = "Added successfully";
          this.$bvModal.show("modal-change");
        } else {
          alert("check the section name");
        }
      });
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.$router.push({ path: "/ViewEvent/" });
    },
    addSection() {
      if (
        typeof this.courseList.course.section.find(
          x => x.sectionName === ""
        ) === "undefined"
      ) {
        this.courseList.course.section.push({
          sectionName: "",
          lessons: [],
          updateType: "update"
        });
      }
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
    },
    deleteEvent: function(secIndex, index, lists) {
      alert(this.courseList.course.section[secIndex].lessons[0]);
      console.log(this.courseList.course.section[secIndex].lessons[0]);
      // this.courseList.course.section[secIndex].lessons[0].push();
      this.courseList.course.section[secIndex].lessons[index].updateType =
        "delete";
      // this.courseList.course.section[secIndex].lessons.splice(index, 1);
      if (lists.type === 2) {
        this.searchLes.push({ value: lists.mediaId, text: lists.mediaTitle });
      } else {
        this.searchQues.push({
          value: lists.questionnaireId,
          text: lists.questionnaireName
        });
      }
    },
    deleSection: function(secIndex, seclists) {
      this.delMsg = this.messages.commondelete;
      this.sectionIndex = secIndex;
      this.sectionData = seclists;
      this.$refs.deleteModal.show();
    },
    handleDelete() {
      this.delMsg = "Are you wants to add section instead of this ?";
      this.$refs.addModal.show();
    },
    handleAdd() {
      for (
        var t = 0;
        t < this.courseList.course.section[this.sectionIndex].lessons;
        t++
      ) {
        var s = this.courseList.course.section[this.sectionIndex].lessons[t];
        if (s.mediaId) {
          this.searchLes.push({ value: s.mediaId, text: s.mediaTitle });
        } else {
          this.searchQues.push({
            value: s.questionnaireId,
            text: s.questionnaireName
          });
        }
      }
      this.courseList.course.section[this.sectionIndex].sectionName = "";
      this.courseList.course.section[this.sectionIndex].lessons = [];
    },
    handleDeleDb() {
      alert(this.sectionIndex);
      for (
        var t = 0;
        t < this.courseList.course.section[this.sectionIndex].lessons.length;
        t++
      ) {
        var s = this.courseList.course.section[this.sectionIndex].lessons[t];
        if (s.mediaId) {
          this.searchLes.push({ value: s.mediaId, text: s.mediaTitle });
        } else {
          this.searchQues.push({
            value: s.questionnaireId,
            text: s.questionnaireName
          });
        }
      }
      // this.sectionList[0].delete.push(this.sectionData.sectionId);
      // this.sectionList[0].delete.push(this.sectionData.sectionId);
      // this.courseList.course.section.splice(this.sectionIndex, 1);
      // var self = this;
      this.courseList.course.section[this.sectionIndex].type = "deleteSection";

      // this.sectionIndex = "";
      // var s = this.courseList;
      // this.courseList = s;
      // this.courseList = this.courseList;
      // if (this.courseList.course.section[this.sectionIndex]) {
      //   alert(this.courseList.course.section[this.sectionIndex].type);
      //   this.courseList.course.section[this.sectionIndex].type = "deleteSection";
      // }
      // console.log(this.sectionList);
      // this.courseList.course.section[this.sectionIndex].push({
      //   type: "delete section"
      // });
    },
    checkDrip(e) {
      if (e == 1) {
        this.showDripType = true;
      } else {
        this.showDripType = false;
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
