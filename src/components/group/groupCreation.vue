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
              Create Group
            </li>
          </ol>
        </div>
        <b-form class="grpbg" @submit.prevent="createGrp">
          <b-row>
            <b-form-group class="col-sm-12">
              <h5>Create New Group</h5>
            </b-form-group>
          </b-row>
          <b-row class="marginTop">
            <b-form-group class="col-sm-3">
              <label for="groupName" :class="[focusStatus ? 'focuscss' : '']"
                >Group name</label
              >
              <b-form-input
                id="groupName"
                v-model="formData.groupName"
                v-validate="'required'"
                type="text"
                name="groupName"
                class="form-control focus"
                ref="groupname"
                :class="{
                  'is-danger': errors.has('groupName'),
                  focuscss: focusStatus
                }"
                @keyup="focuss"
              />
              <span v-show="errors.has('groupName')" class="help is-danger">
                {{ errors.first("groupName") }}
              </span>
            </b-form-group>
            <b-form-group class="col-sm-3">
              <label for="area">Meeting Day</label>
              <b-form-select
                v-model="formData.meetingDay"
                v-validate="'required'"
                name="meetingDay"
                class="txtbox-design"
                :class="{ input: true, 'is-danger': errors.has('meetingDay') }"
              >
                <option class="disable" disabled value>Select</option>
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednessday">Wednessday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </b-form-select>
              <span v-show="errors.has('meetingDay')" class="help is-danger">
                {{ errors.first("meetingDay") }}
              </span>
            </b-form-group>
            <b-form-group class="col-sm-3">
              <label for="startTime">Start Time</label>
              <vue-timepicker
                v-model="formData.startTime"
                input-name="startTime"
                format="HH:mm"
              ></vue-timepicker>
              <span v-show="errors.has('startTime')" class="help is-danger">{{
                errors.first("startTime")
              }}</span>
            </b-form-group>
            <b-form-group class="col-sm-3">
              <label for="endTime">End Time</label>
              <vue-timepicker
                v-model="formData.endTime"
                input-name="endTime"
                format="HH:mm"
              ></vue-timepicker>
              <span v-if="timemsg" class="help is-danger"
                >End time should be greater than Start time</span
              >
              <span v-else></span>
            </b-form-group>
          </b-row>
          <b-row>
            <b-form-group class="col-sm-3">
              <label for="area">Area</label>
              <b-form-input
                id="area"
                v-model="formData.area"
                v-validate="'required'"
                type="text"
                name="area"
                class="form-control"
                :class="{ 'is-danger': errors.has('area') }"
              />
              <span v-show="errors.has('area')" class="help is-danger">
                {{ errors.first("area") }}
              </span>
            </b-form-group>
            <b-form-group class="col-sm-3">
              <label for="country">Country</label>
              <model-select
                v-model="item"
                :options="searchCountry"
                :selected-option="item"
                placeholder="placeholder text"
                name="country"
                @select="onSelect"
              />
              <span v-show="countryerr" class="help is-danger"
                >This field is required</span
              >
            </b-form-group>
            <b-form-group class="col-sm-3">
              <label for="grpAddress">Address</label>
              <textarea
                id="grpAddress"
                v-model="formData.grpAddress"
                v-validate="'required'"
                type="textarea"
                name="grpAddress"
                class="form-control"
                :class="{ 'is-danger': errors.has('grpAddress') }"
              />
              <span v-show="errors.has('grpAddress')" class="help is-danger">
                {{ errors.first("grpAddress") }}
              </span>
            </b-form-group>
            <b-form-group class="col-sm-3">
              <label for="grpCity">City</label>
              <b-form-input
                id="grpCity"
                v-model="formData.grpCity"
                v-validate="'required|alpha'"
                type="text"
                name="grpCity"
                class="form-control"
                :class="{ 'is-danger': errors.has('grpCity') }"
              />
              <span v-show="errors.has('grpCity')" class="help is-danger">
                {{ errors.first("grpCity") }}
              </span>
            </b-form-group>
          </b-row>
          <b-row>
            <b-form-group class="col-sm-3">
              <label for="grpState">State</label>
              <b-form-input
                id="grpState"
                v-model="formData.grpState"
                v-validate="'required|alpha'"
                type="text"
                name="grpState"
                class="form-control"
                :class="{ 'is-danger': errors.has('grpState') }"
              />
              <span v-show="errors.has('grpState')" class="help is-danger">
                {{ errors.first("grpState") }}
              </span>
            </b-form-group>
            <b-form-group class="col-sm-3">
              <label for="grpPincode">Pincode</label>
              <b-form-input
                id="grpPincode"
                v-model="formData.grpPincode"
                v-validate="'required|numeric'"
                type="text"
                name="grpPincode"
                class="form-control"
                :class="{ 'is-danger': errors.has('grpPincode') }"
              />
              <span v-show="errors.has('grpPincode')" class="help is-danger">
                {{ errors.first("grpPincode") }}
              </span>
            </b-form-group>
            <b-form-group class="col-sm-3">
              <label for="latitude">Latitude</label>
              <b-form-input
                id="latitude"
                v-model="formData.latitude"
                v-validate="'required'"
                type="text"
                name="latitude"
                class="form-control"
                :class="{ 'is-danger': errors.has('latitude') }"
              />
              <span v-show="errors.has('latitude')" class="help is-danger">
                {{ errors.first("latitude") }}
              </span>
            </b-form-group>
            <b-form-group class="col-sm-3">
              <label for="longitude">Longitude</label>
              <b-form-input
                id="longitude"
                v-model="formData.longitude"
                v-validate="'required'"
                type="text"
                name="longitude"
                class="form-control"
                :class="{ 'is-danger': errors.has('longitude') }"
              />
              <span v-show="errors.has('longitude')" class="help is-danger">
                {{ errors.first("longitude") }}
              </span>
            </b-form-group>
          </b-row>
          <b-row>
            <b-form-group class="col-sm-6">
              <label for="file">Banner Image</label>
              <div class="dashborder mt-3">
                <!--  -->
                <progressBar
                  v-if="progress.imageUpload"
                  :max="progress.maxval"
                  :colours="progress.imagecolours.variant"
                  :percent="progress.imagePercent"
                ></progressBar>
                <input
                  type="file"
                  name="file"
                  id="file"
                  class="form-control"
                  accept="image/jpeg, image/png, image/gif, image/jpg"
                  v-validate="'required'"
                  :class="{ 'is-danger': errors.has('file') }"
                  v-on:change="handleFileUpload(0)"
                  ref="file"
                />
                <span v-show="imgErr" class="help is-danger ml-2">{{
                  imgErr
                }}</span>
              </div>
            </b-form-group>
          </b-row>
          <b-form-group class="col-sm-12 text-right">
            <b-button type="submit" class="btn btn-warning">Submit</b-button>
          </b-form-group>
        </b-form>
        <show-group></show-group>
      </b-col>
    </b-row>
    <b-modal id="modal-submit" ok-only hide-header-close no-close-on-backdrop>
      <p class="my-4 text-center">{{ msg }}</p>
    </b-modal>
    <b-modal
      id="modal-alreadyexist"
      ref="alreadyexist"
      ok-only
      hide-header-close
      no-close-on-backdrop
      @ok="handleOk"
    >
      <p class="my-4 text-center">{{ existMsg }}</p>
    </b-modal>
  </b-container>
</template>
<script>
import progressBar from "../admin/progressBar.vue";
import axios from "axios";
import sidebar from "../admin/sidebar.vue";
import showGroup from "../group/showGroup.vue";
import { Validator } from "vee-validate";
import { mapState, mapActions } from "vuex";
import adminHeader from "../admin/adminHeader.vue";
import VueTimepicker from "vue2-timepicker";
// import "vue2-timepicker/dist/VueTimepicker.css";
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
          },
          min: function() {
            return "This field is required";
          },
          max: function() {
            return "This field is required";
          },
          alpha_spaces: function() {
            return "Only accept alphabets and spaces";
          },
          alpha: function() {
            return "Only accept alphabets";
          }
        }
      }
    };
    Validator.localize(dictionary);
    return {
      focusStatus: false,
      msg: "",
      imgErr: false,
      timemsg: false,
      existMsg: "",
      searchCountry: [],
      countryerr: false,
      item: {
        value: "",
        text: ""
      },
      formData: {
        groupName: "",
        bannerImageUrl: "",
        area: "",
        grpAddress: "",
        grpCity: "",
        grpState: "",
        grpPincode: "",
        latitude: "",
        longitude: "",
        meetingDay: "",
        startTime: {
          HH: "09",
          mm: "00"
        },
        endTime: {
          HH: "09",
          mm: "00"
        }
      },
      file: "",
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
    ...mapActions(["addGroup"]),
    onSelect(item) {
      this.item = item;
    },
    createGrp() {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        var gname = this.formData.groupName.toUpperCase();
        if (
          typeof this.groupList.find(o => o.groupName === gname.trim()) ==
          "undefined"
        ) {
          this.$validator.validateAll().then(valid => {
            if (this.beginingTime < this.endingTime && this.item.value !== "") {
              this.timemsg = false;
              this.countryerr = false;
              if (valid) {
                var gstate = this.formData.grpState.toUpperCase();
                var gcity = this.formData.grpCity.toUpperCase();
                const payload = {
                  group: {
                    adminId: localStorage.getItem("userId"),
                    // groupId: this.groupList.length + 1,
                    name: gname.trim(),
                    bannerImageUrl: this.formData.bannerImageUrl,
                    area: this.formData.area,
                    address: this.formData.grpAddress,
                    city: gcity.trim(),
                    state: gstate.trim(),
                    pincode: this.formData.grpPincode,
                    countryId: this.item.value,
                    latitude: this.formData.latitude,
                    longitude: this.formData.longitude,
                    meetingDay: this.formData.meetingDay,
                    startTime: this.formData.startTime,
                    endTime: this.formData.endTime,
                    deleted: 0
                  }
                };
                this.addGroup(payload);
                this.msg = "Data submitted";
                this.$bvModal.show("modal-submit");
                this.formData.groupName = "";
                this.formData.bannerImageUrl = "";
                this.formData.area = "";
                this.formData.grpAddress = "";
                this.formData.grpCity = "";
                this.formData.grpState = "";
                this.formData.grpPincode = "";
                this.formData.latitude = "";
                this.formData.longitude = "";
              }
            } else {
              this.timemsg = true;
              this.countryerr = true;
            }
          });
        } else {
          this.existMsg = 'Group name: " ' + gname.trim() + ' " already exist';
          this.$refs.alreadyexist.show();
        }
      }
    },
    handleOk() {
      var self = this;
      self.focusStatus = true;
      this.$refs.groupname.focus();
    },
    focuss() {
      var gname = this.formData.groupName.toUpperCase();
      var self = this;
      if (
        typeof this.groupList.find(o => o.groupName === gname.trim()) ==
        "undefined"
      ) {
        self.focusStatus = false;
      }
    },
    handleFileUpload(i) {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        var self = this;
        if (i === 0) {
          this.imgErr = false;
          this.file = this.$refs.file.files[0];
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
                self.formData.bannerImageUrl = res.data.file;
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
        }
      }
    }
  },
  mounted() {
    var SearchList = this.countryList;
    SearchList = SearchList.map(function(x) {
      return { value: x.countryId, text: x.countryName };
    });
    this.searchCountry = SearchList;
  },
  computed: {
    ...mapState(["groupList", "countryList"]),
    beginingTime: function() {
      let calcstart =
        parseInt(this.formData.startTime.mm) +
        parseInt(this.formData.startTime.HH * 60);
      return calcstart;
    },
    endingTime: function() {
      let calcend =
        parseInt(this.formData.endTime.mm) +
        parseInt(this.formData.endTime.HH * 60);
      return calcend;
    }
  },
  components: {
    "app-sidebar": sidebar,
    "admin-header": adminHeader,
    "show-group": showGroup,
    VueTimepicker,
    progressBar
  }
};
</script>
