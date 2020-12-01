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
            <li
              class="breadcrumb-item active"
              aria-current="page"
              v-if="$route.params.view === 'view'"
            >
              View General Settings
            </li>
            <li class="breadcrumb-item active" aria-current="page" v-else>
              Edit General Settings
            </li>
          </ol>
        </div>
        <div>
          <b-form
            class="grpbg"
            enctype="multipart/form-data"
            @submit.prevent="editGeneralization"
          >
            <b-row>
              <b-form-group class="col-sm-12">
                <h5 v-if="$route.params.view === 'view'">
                  View General Settings
                </h5>
                <h5 v-else>Edit General Settings</h5>
              </b-form-group>
            </b-row>
            <b-row v-if="$route.params.view === 'view'">
              <b-col sm="9" class="marginTop">
                <b-form-group class="col-sm-12">
                  <label for="appname">Name of the App</label>
                  <b-form-input
                    type="text"
                    name="appname"
                    v-model="formData.appname"
                    id="appname"
                    class="form-control"
                    v-validate="'required'"
                    :class="{ 'is-danger': errors.has('appname') }"
                    readonly
                  />
                </b-form-group>
                <b-form-group class="col-sm-12">
                  <label for="logo">App Logo</label>
                  <div class="row col-sm-3 mt-3">
                    <b-img
                      :src="formData.logourl"
                      fluid
                      alt="Fluid image"
                      class="img-thumbnail tick1 sqr-img"
                    ></b-img>
                  </div>
                </b-form-group>
                <b-form-group class="col-sm-12">
                  <label for="icon" class="mt-3">App Icon</label>
                  <div class="row col-sm-3 mt-3">
                    <b-img
                      :src="formData.iconurl"
                      fluid
                      alt="Fluid image"
                      class="img-thumbnail tick1 sqr-img"
                    ></b-img>
                  </div>
                </b-form-group>
                <b-row>
                  <b-col>
                    <b-form-group class="col-sm-12">
                      <label for="fontcolor">Font Color</label>
                      <b-form-input
                        v-model="formData.fontcolor"
                        type="text"
                        name="fontcolor"
                        id="fontcolor"
                        class="form-control"
                        :class="{ 'is-danger': errors.has('fontcolor') }"
                        readonly
                      />
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group class="col-sm-12">
                      <label for="fontfamily">Font Family</label>
                      <b-form-input
                        v-model="formData.fontfamily"
                        type="text"
                        name="fontfamily"
                        id="fontfamily"
                        class="form-control"
                        :class="{ 'is-danger': errors.has('fontfamily') }"
                        readonly
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-form-group class="col-sm-12">
                  <label for="foupload" class="mt-3">Font uploads</label>
                  <div class="row col-sm-3 mt-3">
                    <b-img
                      :src="formData.fontupload"
                      fluid
                      alt="Fluid image"
                      class="img-thumbnail tick1 sqr-img"
                    ></b-img>
                  </div>
                </b-form-group>
              </b-col>
              <b-col sm="3">
                <b-row>
                  <b-form-group class="col-sm-12">
                    <label for="fontsize">Font Size</label>
                    <b-form-input
                      v-model="formData.fontsize"
                      type="text"
                      name="fontsize"
                      id="fontsize"
                      class="form-control"
                      readonly
                    />
                  </b-form-group>
                </b-row>
                <b-row>
                  <b-form-group class="col-sm-12">
                    <label for="logosize">Logo Size</label>
                    <b-form-input
                      v-model="formData.logosize"
                      type="text"
                      name="logosize"
                      id="logosize"
                      class="form-control"
                      readonly
                    />
                  </b-form-group>
                </b-row>
                <b-row>
                  <b-form-group class="col-sm-12">
                    <label for="logosize">Icon Size</label>
                    <b-form-input
                      v-model="formData.iconsize"
                      type="text"
                      name="iconsize"
                      id="iconsize"
                      class="form-control"
                      readonly
                    />
                  </b-form-group>
                </b-row>
                <b-row>
                  <b-form-group class="col-sm-12">
                    <label for="bgcolor">Background Color</label>
                    <b-form-input
                      v-model="formData.bgcolor"
                      type="text"
                      name="bgcolor"
                      id="bgcolor"
                      class="form-control"
                      readonly
                    />
                  </b-form-group>
                </b-row>
              </b-col>
            </b-row>
            <b-row v-else>
              <b-col sm="9" class="marginTop">
                <b-form-group class="col-sm-12">
                  <label for="appname">Name of the App</label>
                  <b-form-input
                    v-model="formData.appname"
                    type="text"
                    name="appname"
                    id="appname"
                    class="form-control"
                    v-validate="'required'"
                    :class="{ 'is-danger': errors.has('appname') }"
                  />
                  <span v-show="errors.has('appname')" class="help is-danger">
                    {{ errors.first("appname") }}
                  </span>
                </b-form-group>
                <b-form-group class="col-sm-12">
                  <p class="mt-3">App Logo</p>
                  <progressBar
                    v-if="progress1.imageUpload"
                    :max="maxval"
                    :colours="progress1.imagecolours.variant"
                    :percent="progress1.imagePercent"
                    filerefs="file"
                  ></progressBar>
                  <div class="row col-sm-3 mt-3">
                    <b-img
                      class="img-thumbnail tick1 sqr-img"
                      :src="formData.logourl"
                      alt="Fluid image"
                    />
                    <!-- <b-img v-else :src="userImage" class="user-profile img-thumbnail tick2" /> -->
                    <label for="applogo" class="editoverlay">
                      <div class="editcamicon">
                        <i class="fa fa-camera imgedithover"></i>
                        <p class="changeimg-text">CHANGE IMAGE</p>
                      </div>
                    </label>
                  </div>
                  <input
                    type="file"
                    name="applogo"
                    id="applogo"
                    class="mt-3 d-none"
                    accept="image/jpeg, image/png, image/gif, image/jpg"
                    v-validate
                    :class="{ 'is-danger': errors.has('applogo') }"
                    v-on:change="handleFileUpload(0)"
                    ref="applogo"
                  />
                  <span v-show="errors.has('applogo')" class="help is-danger">
                    {{ errors.first("applogo") }}
                  </span>
                </b-form-group>
                <b-form-group class="col-sm-12">
                  <p class="mt-3">App Icon</p>
                  <progressBar
                    v-if="progress2.imageUpload"
                    :max="maxval"
                    :colours="progress2.imagecolours.variant"
                    :percent="progress2.imagePercent"
                    filerefs="file"
                  ></progressBar>
                  <div class="row col-sm-3 mt-3">
                    <b-img
                      class="img-thumbnail tick1"
                      :src="formData.iconurl"
                      alt="Fluid image"
                      style="height: 125px;width: 125px;"
                    />
                    <!-- <b-img v-else :src="userImage" class="user-profile img-thumbnail tick2" /> -->
                    <label for="appicon" class="editoverlay">
                      <div class="editcamicon">
                        <i class="fa fa-camera imgedithover"></i>
                        <p class="changeimg-text">CHANGE IMAGE</p>
                      </div>
                    </label>
                  </div>
                  <input
                    type="file"
                    name="appicon"
                    id="appicon"
                    class="mt-3 d-none"
                    accept="image/jpeg, image/png, image/gif, image/jpg"
                    v-validate
                    :class="{ 'is-danger': errors.has('appicon') }"
                    v-on:change="handleFileUpload(1)"
                    ref="appicon"
                  />
                  <span v-show="errors.has('appicon')" class="help is-danger">
                    {{ errors.first("appicon") }}
                  </span>
                </b-form-group>
                <b-row>
                  <b-col>
                    <b-form-group class="col-sm-12">
                      <label for="fontcolor">Font Color</label>
                      <b-form-input
                        v-model="formData.fontcolor"
                        type="text"
                        name="fontcolor"
                        id="fontcolor"
                        class="form-control"
                        v-validate="'required'"
                        :class="{ 'is-danger': errors.has('fontcolor') }"
                      />
                      <span
                        v-show="errors.has('fontcolor')"
                        class="help is-danger"
                        >{{ errors.first("fontcolor") }}</span
                      >
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group class="col-sm-12">
                      <label for="fontfamily">Font Family</label>
                      <b-form-input
                        v-model="formData.fontfamily"
                        type="text"
                        name="fontfamily"
                        id="fontfamily"
                        class="form-control"
                        v-validate="'required'"
                        :class="{ 'is-danger': errors.has('fontfamily') }"
                      />
                      <span
                        v-show="errors.has('fontfamily')"
                        class="help is-danger"
                        >{{ errors.first("fontfamily") }}</span
                      >
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-form-group class="col-sm-12">
                  <p class="mt-3">Font Upload</p>
                  <progressBar
                    v-if="progress3.imageUpload"
                    :max="maxval"
                    :colours="progress3.imagecolours.variant"
                    :percent="progress3.imagePercent"
                    filerefs="file"
                  ></progressBar>
                  <div class="row col-sm-3 mt-3">
                    <b-img
                      class="img-thumbnail tick1"
                      :src="formData.fontupload"
                      alt="Fluid image"
                      style="height: 125px;width: 125px;"
                    />
                    <!-- <b-img v-else :src="userImage" class="user-profile img-thumbnail tick2" /> -->
                    <label for="fontupload" class="editoverlay">
                      <div class="editcamicon">
                        <i class="fa fa-camera imgedithover"></i>
                        <p class="changeimg-text">CHANGE IMAGE</p>
                      </div>
                    </label>
                  </div>
                  <input
                    type="file"
                    name="fontupload"
                    id="fontupload"
                    class="mt-3 d-none"
                    accept="image/jpeg, image/png, image/gif, image/jpg"
                    v-validate
                    :class="{ 'is-danger': errors.has('fontupload') }"
                    v-on:change="handleFileUpload(2)"
                    ref="fontupload"
                  />
                  <span
                    v-show="errors.has('fontupload')"
                    class="help is-danger"
                  >
                    {{ errors.first("fontupload") }}
                  </span>
                </b-form-group>
              </b-col>
              <b-col sm="3">
                <b-row>
                  <b-form-group class="col-sm-12">
                    <label for="fontsize">Font Size</label>
                    <b-form-input
                      v-model="formData.fontsize"
                      type="text"
                      name="fontsize"
                      id="fontsize"
                      class="form-control"
                      v-validate="'required'"
                      :class="{ 'is-danger': errors.has('fontsize') }"
                    />
                    <span
                      v-show="errors.has('fontsize')"
                      class="help is-danger"
                      >{{ errors.first("fontsize") }}</span
                    >
                  </b-form-group>
                </b-row>
                <b-row>
                  <b-form-group class="col-sm-12">
                    <label for="logosize">Logo Size</label>
                    <b-form-input
                      v-model="formData.logosize"
                      type="text"
                      name="logosize"
                      id="logosize"
                      class="form-control"
                      v-validate="'required'"
                      :class="{ 'is-danger': errors.has('logosize') }"
                    />
                    <span
                      v-show="errors.has('logosize')"
                      class="help is-danger"
                      >{{ errors.first("logosize") }}</span
                    >
                  </b-form-group>
                </b-row>
                <b-row>
                  <b-form-group class="col-sm-12">
                    <label for="logosize">Icon Size</label>
                    <b-form-input
                      v-model="formData.iconsize"
                      type="text"
                      name="iconsize"
                      id="iconsize"
                      class="form-control"
                      v-validate="'required'"
                      :class="{ 'is-danger': errors.has('iconsize') }"
                    />
                    <span
                      v-show="errors.has('iconsize')"
                      class="help is-danger"
                      >{{ errors.first("iconsize") }}</span
                    >
                  </b-form-group>
                </b-row>
                <b-row>
                  <b-form-group class="col-sm-12">
                    <label for="bgcolor">Background Color</label>
                    <b-form-input
                      v-model="formData.bgcolor"
                      type="text"
                      name="bgcolor"
                      id="bgcolor"
                      class="form-control"
                      v-validate="'required'"
                      :class="{ 'is-danger': errors.has('bgcolor') }"
                    />
                    <span
                      v-show="errors.has('bgcolor')"
                      class="help is-danger"
                      >{{ errors.first("bgcolor") }}</span
                    >
                  </b-form-group>
                </b-row>
              </b-col>
            </b-row>
            <div class="row"></div>
            <b-form-group class="col-sm-12 text-right">
              <router-link to="/ViewGeneralization">
                <button class="btn btn-warning">Cancel</button>
              </router-link>
              <b-button
                type="submit"
                class="btn btn-warning"
                v-if="$route.params.view !== 'view'"
                >Submit</b-button
              >
            </b-form-group>
          </b-form>
        </div>
      </b-col>
    </b-row>
    <!-- updatetd successfully msg modal-->
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
    <!--if the application logout but opened in another tab then it will apear-->
    <session-modal></session-modal>
  </b-container>
</template>
<script>
import axios from "axios";
import sidebar from "../../admin/sidebar.vue";
import adminHeader from "../../admin/adminHeader.vue";
import { Validator } from "vee-validate";
import { mapState, mapActions } from "vuex";
import progressBar from "../../admin/progressBar.vue";
import sessionModal from "../../sessionModal.vue";
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
      formData: {
        appname: "",
        fontcolor: "",
        fontfamily: "",
        fontsize: "",
        logosize: "",
        iconsize: "",
        bgcolor: "",
        logourl: "",
        iconurl: "",
        fontupload: ""
      },
      changeMsg: "",
      file1: "",
      file2: "",
      file3: "",
      maxval: 100,
      progress1: {
        imagePercent: 0,
        imageUpload: false,
        imagecolours: {
          variant: "warning"
        }
      },
      progress2: {
        imagePercent: 0,
        imageUpload: false,
        imagecolours: {
          variant: "warning"
        }
      },
      progress3: {
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
    progressBar,
    "session-modal": sessionModal
  },
  computed: {
    ...mapState(["GeneralSettings"]),
    commonIndex() {
      if (
        this.GeneralSettings.row !== null &&
        this.GeneralSettings.row.length !== 0
      ) {
        return this.GeneralSettings.row.findIndex(
          x => x.ID === parseInt(this.$route.params.id)
        );
      } else {
        return -1;
      }
    }
  },
  methods: {
    ...mapActions(["editGeneralizationById"]),
    editGeneralization() {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.$validator.validateAll().then(valid => {
          if (valid) {
            const today = new Date();
            const date =
              today.getFullYear() +
              "-" +
              (today.getMonth() + 1) +
              "-" +
              today.getDate();
            const time =
              today.getHours() +
              ":" +
              today.getMinutes() +
              ":" +
              today.getSeconds();
            const dateTime = date + " " + time;
            const payload = {
              index: this.commonIndex,
              ID: this.GeneralSettings.row[this.commonIndex].ID,
              appname: this.formData.appname,
              logourl: this.formData.logourl,
              logosize: this.formData.logosize,
              iconurl: this.formData.iconurl,
              iconsize: this.formData.iconsize,
              fontcolor: this.formData.fontcolor,
              fontsize: this.formData.fontsize,
              fontfamily: this.formData.fontfamily,
              fontupload: this.formData.fontupload,
              bgcolor: this.formData.bgcolor,
              editedby: localStorage.getItem("userId"),
              editedat: dateTime
            };
            console.log(payload);
            this.editGeneralizationById(payload);
            this.changeMsg = "Edited successfully";
            this.$bvModal.show("modal-change");
          }
        });
      }
    },
    handleFileUpload(i) {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        // upload images
        var self = this;
        if (i === 0) {
          this.file1 = this.$refs.applogo.files[0];
          let formData = new FormData();
          formData.append("file", this.file1);
          this.progress1.imagecolours.variant = "warning";
          this.progress1.imageUpload = true;
          axios
            .post(process.env.VUE_APP_DB_API + "upload/image", formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              },
              onUploadProgress: function(progressEvent) {
                this.progress1.imagePercent = 5;
                setTimeout(function() {
                  self.progress1.imagePercent = 50;
                  self.progress1.imagecolours.variant = "info";
                }, 100);
              }.bind(this)
            })
            .then(function(res) {
              if (typeof res.data.file === "string") {
                self.progress1.imagePercent = 100;
                self.progress1.imagecolours.variant = "success";
                self.formData.logourl = res.data.file;
                setTimeout(function() {
                  self.progress1.imageUpload = false;
                  self.progress1.imagePercent = 0;
                  self.progress1.imagecolours.variant = "light";
                }, 3000);
              }
            })
            .catch(function() {
              self.imgErr = "Check your internet connection";
              self.progress1.imageUpload = false;
              console.log("FAILURE!!");
            });
        } else if (i === 1) {
          this.file2 = this.$refs.appicon.files[0];
          let formData = new FormData();
          formData.append("file", this.file2);
          this.progress2.imagecolours.variant = "warning";
          this.progress2.imageUpload = true;
          axios
            .post(process.env.VUE_APP_DB_API + "upload/image", formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              },
              onUploadProgress: function(progressEvent) {
                this.progress2.imagePercent = 5;
                setTimeout(function() {
                  self.progress2.imagePercent = 50;
                  self.progress2.imagecolours.variant = "info";
                }, 100);
              }.bind(this)
            })
            .then(function(res) {
              if (typeof res.data.file === "string") {
                self.progress2.imagePercent = 100;
                self.progress2.imagecolours.variant = "success";
                self.formData.iconurl = res.data.file;
                setTimeout(function() {
                  self.progress2.imageUpload = false;
                  self.progress2.imagePercent = 0;
                  self.progress2.imagecolours.variant = "light";
                }, 3000);
              }
            })
            .catch(function() {
              self.imgErr = "Check your internet connection";
              self.progress2.imageUpload = false;
              console.log("FAILURE!!");
            });
        } else if (i === 2) {
          this.file3 = this.$refs.fontupload.files[0];
          let formData = new FormData();
          formData.append("file", this.file3);
          this.progress3.imagecolours.variant = "warning";
          this.progress3.imageUpload = true;
          axios
            .post(process.env.VUE_APP_DB_API + "upload/image", formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              },
              onUploadProgress: function(progressEvent) {
                this.progress3.imagePercent = 5;
                setTimeout(function() {
                  self.progress3.imagePercent = 50;
                  self.progress3.imagecolours.variant = "info";
                }, 100);
              }.bind(this)
            })
            .then(function(res) {
              if (typeof res.data.file === "string") {
                self.progress3.imagePercent = 100;
                self.progress3.imagecolours.variant = "success";
                self.formData.fontupload = res.data.file;
                setTimeout(function() {
                  self.progress3.imageUpload = false;
                  self.progress3.imagePercent = 0;
                  self.progress3.imagecolours.variant = "light";
                }, 3000);
              }
            })
            .catch(function() {
              self.imgErr = "Check your internet connection";
              self.progress3.imageUpload = false;
              console.log("FAILURE!!");
            });
        }
      }
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.$router.push({ path: "/ViewGeneralization/" });
    }
  },
  created() {
    this.formData.appname = this.GeneralSettings.row[this.commonIndex].appname;
    this.formData.logourl = this.GeneralSettings.row[this.commonIndex].logourl;
    this.formData.iconurl = this.GeneralSettings.row[this.commonIndex].iconurl;
    this.formData.fontcolor = this.GeneralSettings.row[
      this.commonIndex
    ].fontcolor;
    this.formData.fontfamily = this.GeneralSettings.row[
      this.commonIndex
    ].fontfamily;
    this.formData.fontupload = this.GeneralSettings.row[
      this.commonIndex
    ].fontupload;
    this.formData.fontsize = this.GeneralSettings.row[
      this.commonIndex
    ].fontsize;
    this.formData.logosize = this.GeneralSettings.row[
      this.commonIndex
    ].logosize;
    this.formData.iconsize = this.GeneralSettings.row[
      this.commonIndex
    ].iconsize;
    this.formData.bgcolor = this.GeneralSettings.row[this.commonIndex].bgcolor;
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
