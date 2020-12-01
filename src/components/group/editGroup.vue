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
              Edit Group
            </li>
          </ol>
        </div>
        <b-form class="grpbg" @submit.prevent="editGrp">
          <b-row>
            <b-form-group class="col-sm-12">
              <h5>Edit Group</h5>
            </b-form-group>
          </b-row>
          <p v-show="msg" class="invalid-cls">Data updated</p>
          <b-row class="marginTop">
            <b-form-group class="col-sm-3">
              <label
                for="editGroupName"
                :class="[focusStatus ? 'focuscss' : '']"
                >Group name</label
              >
              <b-form-input
                id="editGroupName"
                v-model="formData.editGroupName"
                v-validate="'required'"
                type="text"
                name="editGroupName"
                class="form-control"
                ref="groupname"
                :class="{
                  'is-danger': errors.has('editGroupName'),
                  focuscss: focusStatus
                }"
                @keyup="focuss"
              />
              <span v-show="errors.has('editGroupName')" class="help is-danger">
                {{ errors.first("editGroupName") }}
              </span>
            </b-form-group>
            <b-form-group class="col-sm-3">
              <label for="editMeetingDay">Meeting Day</label>
              <b-form-select
                v-model="formData.editMeetingDay"
                v-validate="'required'"
                name="editMeetingDay"
                class="txtbox-design"
                :class="{
                  input: true,
                  'is-danger': errors.has('editMeetingDay')
                }"
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
              <span
                v-show="errors.has('editMeetingDay')"
                class="help is-danger"
              >
                {{ errors.first("editMeetingDay") }}
              </span>
            </b-form-group>
            <b-form-group class="col-sm-3">
              <label for="editStartTime">Start Time</label>
              <vue-timepicker
                v-model="formData.editStartTime"
                v-validate="'required'"
                name="editStartTime"
                :class="{
                  input: true,
                  'is-danger': errors.has('editStartTime')
                }"
                format="HH:mm"
              ></vue-timepicker>
            </b-form-group>
            <b-form-group class="col-sm-3">
              <label for="editEndTime">End Time</label>
              <vue-timepicker
                v-model="formData.editEndTime"
                v-validate="'required'"
                name="editEndTime"
                :class="{ input: true, 'is-danger': errors.has('editEndTime') }"
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
              <label for="editArea">Area</label>
              <b-form-input
                id="editArea"
                v-model="formData.editArea"
                v-validate="'required'"
                type="text"
                name="editArea"
                class="form-control"
                :class="{ 'is-danger': errors.has('editArea') }"
              />
              <span v-show="errors.has('editArea')" class="help is-danger">
                {{ errors.first("editArea") }}
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
              <span v-show="countryErr" class="help is-danger"
                >This field is required</span
              >
            </b-form-group>
            <b-form-group class="col-sm-3">
              <label for="editGrpAddress">Address</label>
              <textarea
                id="editGrpAddress"
                v-model="formData.editGrpAddress"
                v-validate="'required'"
                type="textarea"
                name="editGrpAddress"
                class="form-control"
                :class="{ 'is-danger': errors.has('editGrpAddress') }"
              />
              <span
                v-show="errors.has('editGrpAddress')"
                class="help is-danger"
                >{{ errors.first("editGrpAddress") }}</span
              >
            </b-form-group>
            <b-form-group class="col-sm-3">
              <label for="editGrpCity">City</label>
              <b-form-input
                id="editGrpCity"
                v-model="formData.editGrpCity"
                v-validate="'required|alpha_spaces'"
                type="text"
                name="editGrpCity"
                class="form-control"
                :class="{ 'is-danger': errors.has('editGrpCity') }"
              />
              <span v-show="errors.has('editGrpCity')" class="help is-danger">
                {{ errors.first("editGrpCity") }}
              </span>
            </b-form-group>
          </b-row>
          <b-row>
            <b-form-group class="col-sm-3">
              <label for="grpState">State</label>
              <b-form-input
                id="editGrpState"
                v-model="formData.editGrpState"
                v-validate="'required|alpha_spaces'"
                type="text"
                name="editGrpState"
                class="form-control"
                :class="{ 'is-danger': errors.has('editGrpState') }"
              />
              <span v-show="errors.has('editGrpState')" class="help is-danger">
                {{ errors.first("editGrpState") }}
              </span>
            </b-form-group>
            <b-form-group class="col-sm-3">
              <label for="editGrpPincode">Pincode</label>
              <b-form-input
                id="editGrpPincode"
                v-model="formData.editGrpPincode"
                v-validate="'required|numeric'"
                type="text"
                name="editGrpPincode"
                class="form-control"
                :class="{ 'is-danger': errors.has('editGrpPincode') }"
              />
              <span
                v-show="errors.has('editGrpPincode')"
                class="help is-danger"
                >{{ errors.first("editGrpPincode") }}</span
              >
            </b-form-group>
            <b-form-group class="col-sm-3">
              <label for="editLatitude">Latitude</label>
              <b-form-input
                id="editLatitude"
                v-model="formData.editLatitude"
                v-validate="'required'"
                type="text"
                name="editLatitude"
                class="form-control"
                :class="{ 'is-danger': errors.has('editLatitude') }"
              />
              <span v-show="errors.has('editLatitude')" class="help is-danger">
                {{ errors.first("editLatitude") }}
              </span>
            </b-form-group>
            <b-form-group class="col-sm-3">
              <label for="editLongitude">Longitude</label>
              <b-form-input
                id="editLongitude"
                v-model="formData.editLongitude"
                v-validate="'required'"
                type="text"
                name="editLongitude"
                class="form-control"
                :class="{ 'is-danger': errors.has('editLongitude') }"
              />
              <span v-show="errors.has('editLongitude')" class="help is-danger">
                {{ errors.first("editLongitude") }}
              </span>
            </b-form-group>
          </b-row>
          <b-row>
            <b-form-group class="col-sm-6">
              <p class="mt-3">Banner Image</p>
              <progressBar
                v-if="progress.imageUpload"
                :max="progress.maxval"
                :colours="progress.imagecolours.variant"
                :percent="progress.imagePercent"
                filerefs="file"
              ></progressBar>
              <div class="row col-sm-3 mt-3">
                <b-img
                  v-if="formData.bannerImageUrl == ''"
                  class="img-thumbnail tick1"
                  :src="banimg"
                  alt="Fluid image"
                  style="height: 125px;width: 125px;"
                />
                <b-img
                  v-else
                  class="img-thumbnail tick1"
                  :src="formData.bannerImageUrl"
                  alt="Fluid image"
                  style="height: 125px;width: 125px;"
                />
                <!-- <b-img v-else :src="userImage" class="user-profile img-thumbnail tick2" /> -->
                <label for="file" class="editoverlay">
                  <div class="editcamicon">
                    <i class="fa fa-camera imgedithover"></i>
                    <p class="changeimg-text">CHANGE IMAGE</p>
                  </div>
                </label>
              </div>
              <input
                type="file"
                name="file"
                id="file"
                class="mt-3 d-none"
                accept="image/jpeg, image/png, image/gif, image/jpg"
                v-validate
                :class="{ 'is-danger': errors.has('file') }"
                v-on:change="handleFileUpload(0)"
                ref="file"
              />
              <span v-show="imgErr" class="help is-danger ml-2">{{
                imgErr
              }}</span>
            </b-form-group>
          </b-row>
          <b-form-group class="col-sm-12 text-right">
            <b-button
              type="button"
              class="btn btn-warning spacelr"
              @click="backBtn"
              >Back</b-button
            >
            <b-button type="submit" class="btn btn-warning">Save</b-button>
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>
    <b-modal
      id="modal-alreadyexist"
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
import { Validator } from "vee-validate";
import { mapState, mapActions } from "vuex";
import adminHeader from "../admin/adminHeader.vue";
import VueTimepicker from "vue2-timepicker";
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
          }
        }
      }
    };
    Validator.localize(dictionary);
    return {
      focusStatus: false,
      countryErr: false,
      msg: false,
      timemsg: false,
      existMsg: "",
      searchCountry: [],
      item: {
        value: "",
        text: ""
      },
      formData: {
        bannerImageUrl: "",
        editGroupName: "",
        editArea: "",
        editGrpAddress: "",
        editGrpCity: "",
        editGrpState: "",
        editGrpPincode: "",
        editLatitude: "",
        editLongitude: "",
        editMeetingDay: "",
        editStartTime: {
          HH: "",
          mm: ""
        },
        editEndTime: {
          HH: "",
          mm: ""
        }
      },
      file: "",
      imgErr: false,
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
    ...mapActions(["editGroup"]),
    onSelect(item) {
      this.item = item;
    },
    editGrp() {
      var gname = this.formData.editGroupName.toUpperCase();
      if (
        this.groupList[this.$route.params.id - 1].groupName === gname.trim() ||
        this.groupList.findIndex(o => o.groupName === gname.trim()) === -1
      ) {
        this.$validator.validateAll().then(valid => {
          if (this.item.value !== "" && this.beginingTime < this.endingTime) {
            this.timemsg = false;
            this.countryErr = false;
            if (valid) {
              var gstate = this.formData.editGrpState.toUpperCase();
              var gcity = this.formData.editGrpCity.toUpperCase();
              this.groupList[this.$route.params.id - 1].name = gname.trim();
              this.groupList[
                this.$route.params.id - 1
              ].bannerImageUrl = this.formData.bannerImageUrl;
              this.groupList[
                this.$route.params.id - 1
              ].area = this.formData.editArea;
              this.groupList[
                this.$route.params.id - 1
              ].countryId = this.item.value;
              this.groupList[
                this.$route.params.id - 1
              ].address = this.formData.editGrpAddress;
              this.groupList[
                this.$route.params.id - 1
              ].countryName = this.item.text;
              this.groupList[this.$route.params.id - 1].city = gcity.trim();
              this.groupList[this.$route.params.id - 1].state = gstate.trim();
              this.groupList[
                this.$route.params.id - 1
              ].pincode = this.formData.editGrpPincode;
              this.groupList[
                this.$route.params.id - 1
              ].latitude = this.formData.editLatitude;
              this.groupList[
                this.$route.params.id - 1
              ].longitude = this.formData.editLongitude;
              this.groupList[
                this.$route.params.id - 1
              ].meetingDay = this.formData.editMeetingDay;
              this.groupList[
                this.$route.params.id - 1
              ].startTime = JSON.stringify(this.formData.editStartTime);
              this.groupList[
                this.$route.params.id - 1
              ].endTime = JSON.stringify(this.formData.editEndTime);
              this.msg = true;
              const payload = {
                userId: localStorage.getItem("userId"),
                index: this.$route.params.id - 1,
                groupId: this.groupList[this.$route.params.id - 1].id,
                group: {
                  adminId: localStorage.getItem("userId"),
                  name: gname.trim(),
                  bannerImageUrl: this.formData.bannerImageUrl,
                  area: this.formData.editArea,
                  countryId: this.item.value,
                  address: this.formData.editGrpAddress,
                  city: gcity.trim(),
                  state: gstate.trim(),
                  pincode: this.formData.editGrpPincode,
                  latitude: this.formData.editLatitude,
                  longitude: this.formData.editLongitude,
                  meetingDay: this.formData.editMeetingDay,
                  startTime: this.formData.editStartTime,
                  endTime: this.formData.editEndTime
                }
              };
              this.editGroup(payload);
              var self = this;
              setTimeout(function() {
                self.msg = false;
              }, 5000);
            }
          } else {
            this.timemsg = true;
            this.countryErr = true;
          }
        });
      } else {
        this.existMsg = 'Group name: " ' + gname.trim() + ' " already exist';
        this.$bvModal.show("modal-alreadyexist");
      }
    },
    backBtn() {
      this.$router.push({ path: "/groupCreation" });
    },
    handleOk() {
      var self = this;
      self.focusStatus = true;
      this.$refs.groupname.focus();
    },
    focuss() {
      var gname = this.formData.editGroupName.toUpperCase();
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
  created() {
    this.formData.editGroupName = this.groupList[
      this.$route.params.id - 1
    ].name;
    this.formData.bannerImageUrl = this.groupList[
      this.$route.params.id - 1
    ].bannerImageUrl;
    this.formData.editArea = this.groupList[this.$route.params.id - 1].area;
    this.item.value = this.groupList[this.$route.params.id - 1].countryId;
    this.item.text = this.groupList[this.$route.params.id - 1].countryName;
    this.formData.editGrpAddress = this.groupList[
      this.$route.params.id - 1
    ].address;
    this.formData.editGrpCity = this.groupList[this.$route.params.id - 1].city;
    this.formData.editGrpState = this.groupList[
      this.$route.params.id - 1
    ].state;
    this.formData.editGrpPincode = this.groupList[
      this.$route.params.id - 1
    ].pincode;
    this.formData.editLatitude = this.groupList[
      this.$route.params.id - 1
    ].latitude;
    this.formData.editLongitude = this.groupList[
      this.$route.params.id - 1
    ].longitude;
    this.formData.editMeetingDay = this.groupList[
      this.$route.params.id - 1
    ].meetingDay;
    this.formData.editStartTime = JSON.parse(
      this.groupList[this.$route.params.id - 1].startTime
    );
    this.formData.editEndTime = JSON.parse(
      this.groupList[this.$route.params.id - 1].endTime
    );
  },
  mounted() {
    var SearchList = this.countryList;
    SearchList = SearchList.map(function(x) {
      return { value: x.countryId, text: x.countryName };
    });
    this.searchCountry = SearchList;
  },
  computed: {
    ...mapState(["denominationList", "countryList", "groupList"]),
    beginingTime: function() {
      let calcstart =
        parseInt(this.formData.editStartTime.mm) +
        parseInt(this.formData.editStartTime.HH * 60);
      return calcstart;
    },
    endingTime: function() {
      let calcend =
        parseInt(this.formData.editEndTime.mm) +
        parseInt(this.formData.editEndTime.HH * 60);
      return calcend;
    }
  },
  components: {
    "app-sidebar": sidebar,
    "admin-header": adminHeader,
    VueTimepicker,
    progressBar
  }
};
</script>
