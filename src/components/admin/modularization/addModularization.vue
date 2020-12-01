<template>
  <b-container fluid>
    <b-row class="form-height">
      <app-sidebar />
      <b-col md="10" class="mb-2 form-bg">
        <admin-header></admin-header>
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
          <b-form
            class="grpbg"
            enctype="multipart/form-data"
            @submit.prevent="createCourse"
          >
            <b-row>
              <b-form-group class="col-sm-12">
                <h5>Add New Course</h5>
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
                <b-row>
                  <b-form-group class="col-sm-12">
                    <label for="courseImg">Course Banner Image</label>
                    <div class="dashborder mt-3">
                      <progressBar
                        v-if="progress.imageUpload"
                        :max="progress.maxval"
                        :colours="progress.imagecolours.variant"
                        :percent="progress.imagePercent"
                      ></progressBar>
                      <input
                        type="file"
                        name="courseImg"
                        id="courseImg"
                        class="form-control"
                        accept="image/jpeg, image/png, image/gif, image/jpg"
                        v-validate="'required'"
                        :class="{ 'is-danger': errors.has('courseImg') }"
                        v-on:change="handleFileUpload(eve, 0)"
                        ref="courseImg"
                      />
                      <span v-show="imgErr" class="help is-danger ml-2">{{
                        imgErr
                      }}</span>
                    </div>
                  </b-form-group>
                </b-row>
                <b-row>
                  <b-form-group label="Select Language" class="col">
                    <b-form-select
                      v-model="formData.langId"
                      v-validate="'required'"
                      name="langId"
                      :class="{
                        input: true,
                        'is-danger': errors.has('langId')
                      }"
                    >
                      <option class="disable" disabled value>Select</option>
                      <option
                        v-for="(lang, index) in existinglang.rows"
                        :key="index"
                        :value="lang.langId"
                        >{{ lang.OriginalLangtext }}</option
                      >
                    </b-form-select>
                    <span
                      v-show="errors.has('langId')"
                      class="help is-danger"
                      >{{ errors.first("langId") }}</span
                    >
                  </b-form-group>
                </b-row>
                <b-row>
                  <b-form-group
                    label="Status"
                    label-for="status"
                    class="col-sm-12"
                  >
                    <b-form-select
                      v-model="formData.status"
                      v-validate="'required'"
                      name="status"
                      class="txtbox-design"
                      :class="{
                        input: true,
                        'is-danger': errors.has('status')
                      }"
                    >
                      <option class="disable" disabled value>Select</option>
                      <option value="Published">Published</option>
                      <option value="Private">Private</option>
                      <option value="Draft">Draft</option>
                    </b-form-select>
                    <span
                      v-show="errors.has('status')"
                      class="help is-danger"
                      >{{ errors.first("status") }}</span
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
            <div role="tablist" class="removeBg">
              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-row>
                    <b-col sm="10" v-for="(sec, index) in section" :key="index">
                      <b-input-group class="mb-2">
                        <b-input-group-prepend is-text>
                          <span class="collapse-icon"
                            >{{ " " }}{{ index + 1 }}</span
                          >
                        </b-input-group-prepend>
                        <b-form-input
                          type="text"
                          placeholder="Write section name"
                          v-model="sec.name"
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
                            <i class="fa fa-caret-down collapse-icon mt-2"></i>
                          </b-button>
                        </b-input-group-append>
                        <span
                          v-show="errors.has('sectionName' + [index])"
                          class="help is-danger"
                          >{{ errors.first("sectionName" + [index]) }}</span
                        >
                      </b-input-group>
                      <b-form-group class="col-sm-12">
                        <label for="sectionImg">Section Banner Image</label>
                        <div class="dashborder mt-2">
                          <progressBar
                            v-if="sec.progress.imageUpload"
                            :max="sec.progress.maxval"
                            :colours="sec.progress.imagecolours.variant"
                            :percent="sec.progress.imagePercent"
                          ></progressBar>
                          <input
                            type="file"
                            :name="`section[${index}][sectionImage]`"
                            :id="`section[${index}][sectionImage]`"
                            class="form-control"
                            accept="image/jpeg, image/png, image/gif, image/jpg"
                            v-validate="'required'"
                            :class="{
                              'is-danger': errors.has('sectionImg' + [index])
                            }"
                            v-on:change="handleFileUpload($event, index + 1)"
                            ref="fileSection"
                          />
                          <span
                            v-show="secImgErr"
                            class="help is-danger ml-2"
                            >{{ secImgErr }}</span
                          >
                        </div>
                      </b-form-group>
                      <b-collapse
                        :id="'accordion-' + index"
                        visible
                        accordion="my-accordion"
                        role="tabpanel"
                      >
                        <h5 class="mx-3 my-3" v-if="sec.parts.length > 0">
                          Selected Lessons & Tests
                        </h5>
                        <div class="mb-1 col">
                          <div class="drag">
                            <draggable
                              :list="sec.parts"
                              :name="index"
                              v-model="formData.listedItems"
                              class="dragArea"
                            >
                              <b-card
                                v-for="(list, inx) in sec.parts"
                                v-bind:key="inx"
                              >
                                <div>
                                  <span class="badge">{{ inx + 1 }}</span>
                                  {{ list.text }}
                                  <i
                                    class="fa fa-times flrit"
                                    @click="deleteEvent(index, inx, list)"
                                  ></i>
                                </div>
                                <b-form-checkbox
                                  v-if="index + inx != 0"
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
                                      <option value="3">After n date</option>
                                    </b-form-select>
                                    <span
                                      v-show="
                                        errors.has('dripType' + index + inx)
                                      "
                                      class="help is-danger"
                                      >{{
                                        errors.first("dripType" + index + inx)
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
                                      :data-vv-name="'dripDate' + index + inx"
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
                                        errors.first("dripDate" + index + inx)
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
                                        errors.first("dripDay" + index + inx)
                                      }}</span
                                    >
                                  </b-form-group>
                                </b-row>
                              </b-card>
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
                                  v-validate="'required'"
                                  :name="`section[${index}]`"
                                  class="txtbox-design"
                                  :class="{
                                    input: true,
                                    'is-danger': errors.has('status')
                                  }"
                                  @change="onSelectLesson(0, index)"
                                >
                                  <option class="disable" disabled value
                                    >Select</option
                                  >
                                  <option
                                    v-for="(s, index) in searchLes"
                                    :key="index"
                                    :value="s.value"
                                    type="lesson"
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
                                  v-validate="'required'"
                                  name="question"
                                  class="txtbox-design"
                                  :class="{
                                    input: true,
                                    'is-danger': errors.has('question')
                                  }"
                                  @change="onSelectLesson(1, index)"
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
                    </b-col>
                    <b-col sm="2">
                      <i
                        class="fa fa-plus collapse-icon mt-2"
                        @click="addSection"
                      ></i>
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
    <b-modal
      id="modal-exist"
      ref="existModal"
      hide-header-close
      no-close-on-backdrop
      ok-only
      ok-title="Ok"
    >
      <div class="text-center">
        <i class="fa fa-exclamation-circle warnclr" variant="warning"></i>
      </div>
      <p class="my-4 text-center">{{ existMsg }}</p>
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
import progressBar from "../../admin/progressBar.vue";
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
      showDripType: false,
      secindex: "",
      imgErr: "",
      secImgErr: "",
      section: [
        {
          name: "",
          parts: [],
          sectionImage: "",
          progress: {
            imagePercent: 0,
            imageUpload: false,
            imagecolours: {
              variant: "warning"
            }
          }
        }
      ],
      secImage: "",
      file: "",
      formData: {
        title: "",
        status: "",
        description: "",
        sectionName: "",
        courseImage: "",
        lesson: "",
        question: "",
        listedItems: [],
        startDate: "",
        langId: ""
      },
      format: "d MMMM yyyy",
      disabledDates: {
        to: new Date()
      },
      type: "",
      sectionList: [],
      selectedLessTestList: [],
      searchLes: [],
      item: {
        value: "",
        text: ""
      },
      searchQues: [],
      itemQues: {
        value: "",
        text: ""
      },
      changeMsg: "",
      existMsg: "",
      progress: {
        imagePercent: 0,
        imageUpload: false,
        imagecolours: {
          variant: "warning"
        }
      }
    };
  },
  components: {
    "app-sidebar": sidebar,
    "admin-header": adminHeader,
    draggable,
    Datepicker,
    progressBar
  },
  computed: {
    ...mapState(["courseMedia", "mediaTest", "existinglang"])
  },
  mounted() {
    var SearchList = this.courseMedia;
    SearchList = SearchList.map(function(x) {
      return {
        value: x.ID,
        text: x.title
      };
    });
    this.searchLes = SearchList;
    var SearchQuest = this.mediaTest;
    SearchQuest = SearchQuest.map(function(x) {
      return {
        value: x.qnre_id,
        text: x.qnre_name
      };
    });
    this.searchQues = SearchQuest;
  },
  methods: {
    ...mapActions(["createCourses"]),
    appendLeadingZeros(n) {
      if (n <= 9) {
        return "0" + n;
      }
      return n;
    },
    createCourse() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          for (var t = 0; t < this.section.length; t++) {
            this.sectionList.push({
              name: this.section[t].name,
              sectionImage: this.section[t].sectionImage,
              sectionOrder: t + 1,
              lesson: [],
              question: []
            });
            var crtLen = 0;
            let ln;
            for (var k = 0; k < t; k++) {
              ln = crtLen + this.section[k].parts.length;
              crtLen = ln;
            }
            for (var p = 0; p < this.section[t].parts.length; p++) {
              var oBeforeLen =
                typeof this.section[t - 1] !== "undefined" ? crtLen + p : p;
              if (this.section[t].parts[p].type === "Lesson") {
                let lesDat;
                if (this.section[t].parts[p].dripDate != null) {
                  let ld = this.section[t].parts[p].dripDate;
                  lesDat =
                    ld.getFullYear() +
                    "-" +
                    this.appendLeadingZeros(ld.getMonth() + 1) +
                    "-" +
                    this.appendLeadingZeros(ld.getDate());
                }
                this.sectionList[t].lesson.push({
                  mediaId: this.section[t].parts[p].id,
                  order: oBeforeLen + 1,
                  dripStatus:
                    typeof this.section[t].parts[p].dripStatus == "undefined"
                      ? 0
                      : this.section[t].parts[p].dripStatus,
                  dripType:
                    this.section[t].parts[p].dripStatus == 1
                      ? this.section[t].parts[p].dripType
                      : 0,
                  dripDay:
                    this.section[t].parts[p].dripType == 2
                      ? this.section[t].parts[p].dripDay
                      : null,
                  dripDate:
                    this.section[t].parts[p].dripType == 3 ? lesDat : null
                });
              } else if (this.section[t].parts[p].type === "Test") {
                let testDat;
                if (this.section[t].parts[p].dripDate != null) {
                  let td = this.section[t].parts[p].dripDate;
                  testDat =
                    td.getFullYear() +
                    "-" +
                    this.appendLeadingZeros(td.getMonth() + 1) +
                    "-" +
                    this.appendLeadingZeros(td.getDate());
                }
                this.sectionList[t].question.push({
                  questionId: this.section[t].parts[p].id,
                  order: oBeforeLen + 1,
                  dripStatus:
                    typeof this.section[t].parts[p].dripStatus == "undefined"
                      ? 0
                      : this.section[t].parts[p].dripStatus,
                  dripType:
                    this.section[t].parts[p].dripStatus == 1
                      ? this.section[t].parts[p].dripType
                      : 0,
                  dripDay:
                    this.section[t].parts[p].dripType == 2
                      ? this.section[t].parts[p].dripDay
                      : null,
                  dripDate:
                    this.section[t].parts[p].dripType == 3 ? testDat : null
                });
              }
            }
          }
          let a = this.formData.startDate;
          let Dat =
            a.getFullYear() +
            "-" +
            this.appendLeadingZeros(a.getMonth() + 1) +
            "-" +
            this.appendLeadingZeros(a.getDate());
          const payload = {
            course: {
              name: this.formData.title,
              status: this.formData.status,
              description: this.formData.description,
              startDate: Dat,
              courseImage: this.formData.courseImage,
              langId: this.formData.langId
            },
            section: this.sectionList,
            addedby: localStorage.getItem("userId")
          };
          this.createCourses(payload);
          this.changeMsg = "Added successfully";
          this.$bvModal.show("modal-change");
        } else {
          this.existMsg = "Fill out all required field";
          this.$bvModal.show("modal-exist");
        }
      });
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.$router.push({ path: "/listModularization/" });
    },
    addSection() {
      if (
        typeof this.section.find(x => x.name === "") == "undefined" &&
        typeof this.section.find(x => x.sectionImage === "") == "undefined"
      ) {
        this.section.push({
          name: "",
          parts: [],
          sectionImage: "",
          progress: {
            imagePercent: 0,
            imageUpload: false,
            imagecolours: {
              variant: "warning"
            }
          }
        });
      }
    },
    onSelectLesson(val, Index) {
      if (val === 0) {
        var titlename = this.courseMedia.filter(
          x => x.ID === this.formData.lesson
        )[0].title;
        this.type = "Lesson";
        this.section[Index].parts.push({
          sectionId: Index,
          type: this.type,
          id: this.formData.lesson,
          text: titlename
        });
        this.searchLes = this.searchLes.filter(
          x => x.value !== this.formData.lesson
        );
      } else {
        var testname = this.mediaTest.filter(
          x => x.qnre_id === this.formData.question
        )[0].qnre_name;
        this.type = "Test";
        this.section[Index].parts.push({
          sectionId: Index,
          type: this.type,
          text: testname,
          id: this.formData.question
        });
        this.searchQues = this.searchQues.filter(
          x => x.value !== this.formData.question
        );
      }
    },
    deleteEvent: function(secIndex, index, lists) {
      this.section[secIndex].parts.splice(index, 1);
      if (lists.type === "Lesson") {
        this.searchLes.push({ value: lists.id, text: lists.text });
      } else {
        this.searchQues.push({ value: lists.id, text: lists.text });
      }
    },
    checkDrip(e) {
      if (e == 1) {
        this.showDripType = true;
      } else {
        this.showDripType = false;
      }
    },
    handleFileUpload(evt, i) {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        var self = this;
        if (i === 0) {
          if (typeof this.$refs.courseImg.files[0] !== "undefined") {
            this.imgErr = false;
            this.file = this.$refs.courseImg.files[0];
            let formData = new FormData();
            formData.append("file", this.file);
            this.progress.imagecolours.variant = "warning";
            this.progress.imageUpload = true;
            axios
              .post(process.env.VUE_APP_DB_API + "upload/image", formData, {
                headers: {
                  "Content-Type": "multipart/form-data"
                },
                onUploadProgress: function(progressEvent) {
                  this.progress.imagePercent = 5;
                  setTimeout(function() {
                    self.progress.imagePercent = 50;
                    self.progress.imagecolours.variant = "info";
                  }, 100);
                }.bind(this)
              })
              .then(function(res) {
                if (typeof res.data.file === "string") {
                  self.progress.imagePercent = 100;
                  self.progress.imagecolours.variant = "success";
                  self.formData.courseImage = res.data.file;
                  self.file = "";
                  setTimeout(function() {
                    self.progress.imageUpload = false;
                    self.progress.imagePercent = 0;
                    self.progress.imagecolours.variant = "light";
                  }, 3000);
                }
              })
              .catch(function() {
                self.imgErr = "Check your internet connection";
                self.progress.imageUpload = false;
                console.log("FAILURE!!");
              });
          } else {
            self.progress.imageUpload = false;
            this.imgErr = "Image field must be an valid format";
          }
        } else {
          if (typeof evt.target.files[0] !== "undefined") {
            this.secImgErr = false;
            this.secImage = evt.target.files[0];
            let formData = new FormData();
            formData.append("file", this.secImage);
            this.section[i - 1].progress.imagecolours.variant = "warning";
            this.section[i - 1].progress.imageUpload = true;
            axios
              .post(process.env.VUE_APP_DB_API + "upload/image", formData, {
                headers: {
                  "Content-Type": "multipart/form-data"
                },
                onUploadProgress: function(progressEvent) {
                  this.section[i - 1].progress.imagePercent = 5;
                  setTimeout(function() {
                    self.section[i - 1].progress.imagePercent = 50;
                    self.section[i - 1].progress.imagecolours.variant = "info";
                  }, 2000);
                }.bind(this)
              })
              .then(function(res) {
                if (typeof res.data.file === "string") {
                  self.section[i - 1].progress.imagePercent = 100;
                  self.section[i - 1].progress.imagecolours.variant = "success";
                  self.section[i - 1].sectionImage = res.data.file;
                  setTimeout(function() {
                    self.section[i - 1].progress.imageUpload = false;
                    self.section[i - 1].progress.imagePercent = 0;
                    self.section[i - 1].progress.imagecolours.variant = "light";
                  }, 3000);
                }
              })
              .catch(function() {
                self.secImgErr = "Check your internet connection";
                self.section[i - 1].progress.imageUpload = false;
                console.log("FAILURE!!");
              });
          } else {
            this.section[i - 1].progress.imageUpload = false;
            this.secImgErr = "Image field must be an valid format";
          }
        }
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
