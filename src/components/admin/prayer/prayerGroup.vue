<template>
  <b-container fluid>
    <b-row class="form-height">
      <app-sidebar />
      <b-col md="10" class="mb-2 form-bg">
        <admin-header />
        <div aria-label="breadcrumb" class="breadcrumpCss">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Prayer Group
            </li>
          </ol>
        </div>
        <div class="text-center">
          <h4>SHOW PRAYER GROUP</h4>
        </div>
        <view-prayer-group></view-prayer-group>
        <div class="text-center">
          <h4>ADD NEW PRAYER GROUP</h4>
        </div>
        <form class="common-bg" method="post" @submit.prevent="addPrayerGroup">
          <b-row class="col">
            <div class="col-sm-3">
              <label>Name of the Group</label>
              <b-form-input
                v-model="formData.name"
                v-validate="'required'"
                type="text"
                name="name"
                :class="{ input: true, 'is-danger': errors.has('name') }"
              />
              <span v-show="errors.has('name')" class="help is-danger">{{
                errors.first("name")
              }}</span>
            </div>
            <div class="col-sm-4">
              <label>Group Image</label>
              <div>
                <input
                  type="file"
                  name="prgrpImg"
                  id="prgrpImg"
                  class="form-control"
                  accept="image/jpeg, image/png, image/gif, image/jpg"
                  v-validate="'required'"
                  :class="{ 'is-danger': errors.has('prgrpImg') }"
                  v-on:change="handleFileUpload(0)"
                  ref="prgrpImg"
                />
                <span v-show="errors.has('prgrpImg')" class="help is-danger">{{
                  errors.first("prgrpImg")
                }}</span>
                <!-- <span v-show="imgErr" class="help is-danger ml-2">{{imgErr}}</span> -->
              </div>
              <progressBar
                class="mt-2"
                v-if="progress.imageUpload"
                :max="progress.maxval"
                :colours="progress.imagecolours.variant"
                :percent="progress.imagePercent"
              ></progressBar>
              <!-- <span
                v-show="errors.has('groupImage')"
                class="help is-danger"
              >{{ errors.first("groupImage") }}</span>-->
            </div>
            <div class="col-sm-4">
              <label>Status</label>
              <b-form-select
                v-model="formData.status"
                v-validate="'required'"
                type="text"
                :class="{ input: true, 'is-danger': errors.has('status') }"
                class="form-control"
                name="status"
              >
                <option class="disable" disabled value>Select</option>
                <option value="Published">Published</option>
                <option value="Private">Private</option>
                <option value="Draft">Draft</option>
              </b-form-select>
              <span v-show="errors.has('status')" class="help is-danger">{{
                errors.first("status")
              }}</span>
            </div>
          </b-row>
          <b-row class="col mt-3">
            <b-form-group
              label="Specific Date"
              label-for="specificDate"
              class="col-3"
            >
              <b-form-select
                v-model="formData.specificDate"
                v-validate="'required'"
                name="specificDate"
                class="txtbox-design"
                :class="{
                  input: true,
                  'is-danger': errors.has('specificDate')
                }"
              >
                <option class="disable" disabled value>Select</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </b-form-select>
              <span
                v-show="errors.has('specificDate')"
                class="help is-danger"
                >{{ errors.first("specificDate") }}</span
              >
            </b-form-group>
            <b-form-group
              label="Start Date"
              v-if="formData.specificDate == 1"
              class="col-4"
            >
              <datepicker
                v-model="formData.startDate"
                v-validate="'required'"
                placeholder="Select Date"
                input-class="form-control bg-white"
                data-vv-name="fromDate"
                name="startDate"
                :format="format"
                :class="{ input: true, 'is-danger': errors.has('startDate') }"
              />
              <span v-show="errors.has('startDate')" class="help is-danger">{{
                errors.first("startDate")
              }}</span>
            </b-form-group>
            <b-form-group
              label="End Date"
              v-if="formData.specificDate == 1"
              class="col-3"
            >
              <datepicker
                v-model="formData.endDate"
                v-validate="'required'"
                placeholder="Select Date"
                input-class="form-control bg-white"
                data-vv-name="fromDate"
                name="endDate"
                :format="format"
                :class="{ input: true, 'is-danger': errors.has('endDate') }"
              />
              <span v-show="errors.has('endDate')" class="help is-danger">{{
                errors.first("endDate")
              }}</span>
            </b-form-group>
            <div class="col-sm-2 marginTop30">
              <button type="submit" class="btn btn-success">Create</button>
            </div>
            <br />
          </b-row>
        </form>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import sidebar from "../../admin/sidebar.vue";
import adminHeader from "../../admin/adminHeader.vue";
import { Validator } from "vee-validate";
import { mapState, mapActions } from "vuex";
import axios from "axios";
import progressBar from "../../admin/progressBar.vue";
import viewPrayerGroup from "../../admin/prayer/viewPrayerGroup.vue";
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";
export default {
  data() {
    const dictionary = {
      en: {
        messages: {
          required: function() {
            return "This field is required";
          }
        }
      }
    };
    Validator.localize(dictionary);
    return {
      format: "dd MMM",
      disabledDates: {
        from: new Date()
      },
      file: "",
      imgErr: "",
      formData: {
        name: "",
        groupImage: "",
        status: "",
        specificDate: "",
        startDate: "",
        endDate: ""
      },
      progress: {
        imagePercent: 0,
        imageUpload: false,
        imagecolours: {
          variant: "warning"
        }
      }
    };
  },
  methods: {
    ...mapActions(["createPrayerGroup"]),
    addPrayerGroup() {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.$validator.validateAll().then(valid => {
          if (valid) {
            let l = this.formData.startDate;
            let m = this.formData.endDate;
            const today = new Date();
            const date =
              today.getFullYear() +
              "-" +
              (today.getMonth() + 1) +
              "-" +
              today.getDate();
            const time = today.getHours() + ":" + 10 + ":" + today.getSeconds();
            const dateTime = date + " " + time;
            const payload = {
              userId: localStorage.getItem("userId"),
              createdAt: dateTime,
              group: {
                name: this.formData.name,
                status: this.formData.status,
                groupImage: this.formData.groupImage,
                specificDate: this.formData.specificDate,
                startDate:
                  this.formData.specificDate == 1
                    ? l.toString().substr(8, 2) +
                      " " +
                      l.toString().substr(4, 3)
                    : null,
                endDate:
                  this.formData.specificDate == 1
                    ? m.toString().substr(8, 2) +
                      " " +
                      m.toString().substr(4, 3)
                    : null,
                deleteAccess: 0
              }
            };
            this.createPrayerGroup(payload);
            this.formData.name = "";
            this.formData.status = "";
            this.formData.specificDate = "";
            this.formData.startDate = "";
            this.formData.endDate = "";
          }
        });
      }
    },
    handleFileUpload(i) {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        var self = this;
        if (i === 0) {
          if (typeof this.$refs.prgrpImg.files[0] !== "undefined") {
            this.imgErr = false;
            this.file = this.$refs.prgrpImg.files[0];
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
                  self.formData.groupImage = res.data.file;
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
        }
      }
    }
  },
  components: {
    "admin-header": adminHeader,
    "app-sidebar": sidebar,
    progressBar,
    "view-prayer-group": viewPrayerGroup,
    Datepicker
  },
  computed: {
    ...mapState(["prayerGroup"])
  }
};
</script>
