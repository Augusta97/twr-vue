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
            >View Footer Menu</li>
            <li class="breadcrumb-item active" aria-current="page" v-else>Edit Footer Menu</li>
          </ol>
        </div>
        <div>
          <b-form class="grpbg" enctype="multipart/form-data" @submit.prevent="editFooterMenu">
            <b-row>
              <b-form-group class="col-sm-12">
                <h5 v-if="$route.params.view === 'view'">View Footer Menu</h5>
                <h5 v-else>Edit Footer Menu</h5>
              </b-form-group>
            </b-row>
            <b-row v-if="$route.params.view === 'view'">
              <b-col sm="9" class="marginTop">
                <b-form-group class="col-sm-12">
                  <label for="title">Name</label>
                  <b-form-input
                    type="text"
                    name="name"
                    v-model="formData.name"
                    id="name"
                    class="form-control"
                    v-validate="'required'"
                    :class="{ 'is-danger': errors.has('name') }"
                    readonly
                  />
                  <span v-show="errors.has('name')" class="help is-danger">
                    {{
                    errors.first("name")
                    }}
                  </span>
                </b-form-group>
                <b-form-group class="col-sm-12">
                  <label for="file" class="mt-3">Icon</label>
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
                  </div>
                </b-form-group>
                <b-form-group class="col-sm-12">
                  <label for="labelDesc">Label Description</label>
                  <b-form-input
                    type="text"
                    name="labelDesc"
                    v-model="formData.labelDesc"
                    id="labelDesc"
                    class="form-control"
                    v-validate="'required'"
                    :class="{ 'is-danger': errors.has('labelDesc') }"
                  />
                  <span v-show="errors.has('labelDesc')" class="help is-danger">
                    {{
                    errors.first("labelDesc")
                    }}
                  </span>
                </b-form-group>
                <b-row>
                  <b-col>
                    <b-form-group label="Parent Menu" label-for="Parent Menu" class="col-sm-12">
                      <b-form-select
                        v-model="formData.parentMenu"
                        v-validate="'required'"
                        name="parentMenu"
                        class="txtbox-design"
                        readonly
                        :class="{'input': true, 'is-danger': errors.has('parentMenu') }"
                      >
                        <option class="disable" disabled value>Select</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </b-form-select>
                      <span
                        v-show="errors.has('parentMenu')"
                        class="help is-danger"
                      >{{ errors.first('parentMenu') }}</span>
                    </b-form-group>
                  </b-col>
                  <b-col v-if="formData.parentMenu==0">
                    <b-form-group label="Sub Menu" label-for="Sub Menu" class="col-sm-12">
                      <b-form-select
                        v-model="formData.subMenu"
                        v-validate="'required'"
                        name="subMenu"
                        class="txtbox-design"
                        readonly
                        :class="{'input': true, 'is-danger': errors.has('subMenu') }"
                      >
                        <option class="disable" disabled value>Select</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </b-form-select>
                      <span
                        v-show="errors.has('subMenu')"
                        class="help is-danger"
                      >{{ errors.first('subMenu') }}</span>
                    </b-form-group>
                  </b-col>
                  <b-col v-if="formData.parentMenu==0">
                    <b-form-group
                      label="Choose Parent Menu"
                      label-for="Parent Menu Name"
                      class="col-sm-12"
                    >
                      <b-form-select
                        v-model="formData.parentMenuId"
                        v-validate="'required'"
                        name="parentMenuId"
                        class="txtbox-design"
                        readonly
                        :class="{'input': true, 'is-danger': errors.has('parentMenuId') }"
                      >
                        <option class="disable" disabled value>Select</option>
                        <option
                          v-for="(side, index) in allFooterMenu"
                          :key="index"
                          :value="side.ID"
                        >{{ side.name }}</option>
                      </b-form-select>
                      <span
                        v-show="errors.has('parentMenuId')"
                        class="help is-danger"
                      >{{ errors.first('parentMenuId') }}</span>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-col>
              <b-col sm="3">
                <b-row>
                  <b-form-group label="Page" label-for="pageId" class="col-sm-12">
                    <b-form-select
                      v-model="formData.pageId"
                      v-validate="'required'"
                      name="pageId"
                      class="txtbox-design"
                      :class="{'input': true, 'is-danger': errors.has('pageId') }"
                      disabled
                    >
                      <option class="disable" disabled value>Select</option>
                      <option value="0">None</option>
                      <option
                        v-for="(eve, index) in allPages.row"
                        :key="index"
                        :value="eve.ID"
                      >{{ eve.title }}</option>
                    </b-form-select>
                    <span
                      v-show="errors.has('pageId')"
                      class="help is-danger"
                    >{{ errors.first('pageId') }}</span>
                  </b-form-group>
                </b-row>
                <b-row>
                  <b-form-group label="Menu Order" label-for="Menu Order" class="col-sm-12">
                    <b-form-select
                      v-model="formData.menuOrder"
                      v-validate="'required'"
                      name="menuOrder"
                      class="txtbox-design"
                      readonly
                      :class="{'input': true, 'is-danger': errors.has('menuOrder') }"
                    >
                      <option class="disable" disabled value>Select</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                    </b-form-select>
                    <span
                      v-show="errors.has('menuOrder')"
                      class="help is-danger"
                    >{{ errors.first('menuOrder') }}</span>
                  </b-form-group>
                </b-row>
              </b-col>
            </b-row>
            <b-row v-else>
              <b-col sm="9" class="marginTop">
                <b-form-group class="col-sm-12">
                  <label for="title">Name</label>
                  <b-form-input
                    type="text"
                    name="name"
                    v-model="formData.name"
                    id="name"
                    class="form-control"
                    v-validate="'required'"
                    :class="{ 'is-danger': errors.has('name') }"
                    v-on:keyup="titleCheck"
                  />
                  <span v-show="errors.has('name')" class="help is-danger">
                    {{
                    errors.first("name")
                    }}
                  </span>
                  <span class="help is-danger" v-if="titleExists">Already Exists</span>
                </b-form-group>
                <b-form-group class="col-sm-12">
                  <p class="mt-3">Icon</p>
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
                      <div class="editcamicon" title="Upload Image">
                        <i class="fa fa-camera imgedithover"></i>
                        <p class="changeimg-text">CHANGE IMAGE</p>
                      </div>
                    </label>
                  </div>
                  <progressBar
                    v-if="progress.imageUpload"
                    :max="progress.maxval"
                    :colours="progress.imagecolours.variant"
                    :percent="progress.imagePercent"
                    filerefs="file"
                  ></progressBar>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    class="mt-3 d-none"
                    accept=".jpg, .png, .jpeg"
                    :class="{ 'is-danger': errors.has('file') }"
                    v-on:change="handleFileUpload(0)"
                    v-validate
                    ref="file"
                  />
                  <!-- <span v-show="errors.has('file')" class="help is-danger">
                    {{
                    errors.first("file")
                    }}
                  </span>-->
                </b-form-group>
                <b-form-group class="col-sm-12">
                  <label for="labelDesc">Label Description</label>
                  <b-form-input
                    type="text"
                    name="labelDesc"
                    v-model="formData.labelDesc"
                    id="labelDesc"
                    class="form-control"
                    v-validate="'required'"
                    :class="{ 'is-danger': errors.has('labelDesc') }"
                  />
                  <span v-show="errors.has('labelDesc')" class="help is-danger">
                    {{
                    errors.first("labelDesc")
                    }}
                  </span>
                </b-form-group>
                <b-row>
                  <b-col>
                    <b-form-group label="Parent Menu" label-for="Parent Menu" class="col-sm-12">
                      <b-form-select
                        v-model="formData.parentMenu"
                        v-validate="'required'"
                        name="parentMenu"
                        class="txtbox-design"
                        :class="{'input': true, 'is-danger': errors.has('parentMenu') }"
                      >
                        <option class="disable" disabled value>Select</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </b-form-select>
                      <span
                        v-show="errors.has('parentMenu')"
                        class="help is-danger"
                      >{{ errors.first('parentMenu') }}</span>
                    </b-form-group>
                  </b-col>
                  <b-col v-if="formData.parentMenu==0">
                    <b-form-group label="Sub Menu" label-for="Sub Menu" class="col-sm-12">
                      <b-form-select
                        v-model="formData.subMenu"
                        v-validate="'required'"
                        name="subMenu"
                        class="txtbox-design"
                        :class="{'input': true, 'is-danger': errors.has('subMenu') }"
                      >
                        <option class="disable" disabled value>Select</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </b-form-select>
                      <span
                        v-show="errors.has('subMenu')"
                        class="help is-danger"
                      >{{ errors.first('subMenu') }}</span>
                    </b-form-group>
                  </b-col>
                  <b-col v-if="formData.parentMenu==0">
                    <b-form-group
                      label="Choose Parent Menu"
                      label-for="Parent Menu Name"
                      class="col-sm-12"
                    >
                      <b-form-select
                        v-model="formData.parentMenuId"
                        v-validate="'required'"
                        name="parentMenuId"
                        class="txtbox-design"
                        :class="{'input': true, 'is-danger': errors.has('parentMenuId') }"
                      >
                        <option class="disable" disabled value>Select</option>
                        <option
                          v-for="(side, index) in allFooterMenu"
                          :key="index"
                          :value="side.ID"
                        >{{ side.name }}</option>
                      </b-form-select>
                      <span
                        v-show="errors.has('parentMenuId')"
                        class="help is-danger"
                      >{{ errors.first('parentMenuId') }}</span>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-col>
              <b-col sm="3">
                <b-row>
                  <b-form-group label="Page" label-for="pageId" class="col-sm-12">
                    <b-form-select
                      v-model="formData.pageId"
                      v-validate="'required'"
                      name="pageId"
                      class="txtbox-design"
                      :class="{'input': true, 'is-danger': errors.has('pageId') }"
                    >
                      <option class="disable" disabled value>Select</option>
                      <option value="0">None</option>
                      <option
                        v-for="(eve, index) in allPages.row"
                        :key="index"
                        :value="eve.ID"
                      >{{ eve.title }}</option>
                    </b-form-select>
                    <span
                      v-show="errors.has('pageId')"
                      class="help is-danger"
                    >{{ errors.first('pageId') }}</span>
                  </b-form-group>
                </b-row>
                <b-row>
                  <b-form-group label="Menu Order" label-for="Menu Order" class="col-sm-12">
                    <b-form-select
                      v-model="formData.menuOrder"
                      v-validate="'required'"
                      name="menuOrder"
                      class="txtbox-design"
                      :class="{'input': true, 'is-danger': errors.has('menuOrder') }"
                    >
                      <option class="disable" disabled value>Select</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                    </b-form-select>
                    <span
                      v-show="errors.has('menuOrder')"
                      class="help is-danger"
                    >{{ errors.first('menuOrder') }}</span>
                  </b-form-group>
                </b-row>
              </b-col>
            </b-row>
            <div class="row"></div>
            <b-form-group class="col-sm-12 text-right">
              <router-link to="/viewFooterMenu">
                <button class="btn btn-warning">Cancel</button>
              </router-link>
              <b-button
                type="submit"
                class="btn btn-warning"
                v-if="$route.params.view !== 'view'"
              >Submit</b-button>
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
      <p class="my-4 text-center">{{ changeMsg }}</p>
    </b-modal>
  </b-container>
</template>
<script>
import axios from "axios";
import sidebar from "../../admin/sidebar.vue";
import adminHeader from "../../admin/adminHeader.vue";
import { Validator } from "vee-validate";
import { mapState, mapActions } from "vuex";
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
      titleExists: false,
      formData: {
        name: "",
        iconUrl: null,
        pageId: "",
        parentMenu: "",
        subMenu: "",
        parentMenuId: "",
        menuOrder: "",
        labelDesc: ""
      },
      file: "",
      progress: {
        imagePercent: 0,
        imageUpload: false,
        imagecolours: {
          variant: "warning"
        },
        maxval: 100
      },
      changeMsg: ""
    };
  },
  components: {
    "app-sidebar": sidebar,
    "admin-header": adminHeader,
    progressBar
  },
  computed: {
    ...mapState(["existinglang", "allFooterMenu", "allPages"]),
    commonIndex() {
      if (this.allFooterMenu !== null && this.allFooterMenu.length !== 0) {
        return this.allFooterMenu.findIndex(
          x => x.ID === parseInt(this.$route.params.id)
        );
      } else {
        return -1;
      }
    }
  },
  methods: {
    titleCheck() {
      let pa = this.allFooterMenu.findIndex(x => x.name === this.formData.name);
      if (pa !== -1) {
        this.titleExists = true;
      } else {
        this.titleExists = false;
      }
    },
    ...mapActions(["editFooterMenuById"]),
    showImagePrompt(command) {
      const src = prompt("Enter the url of your image here");
      if (src !== null) {
        command({ src });
      }
    },
    editFooterMenu() {
      this.$validator.validateAll().then(valid => {
        if (valid && !this.titleExists) {
          const payload = {
            index: this.commonIndex,
            ID: this.allFooterMenu[this.commonIndex].ID,
            engId: this.allFooterMenu[this.commonIndex].engId,
            name: this.formData.name,
            labelDesc: this.formData.labelDesc,
            labelImage:
              this.formData.bannerImageUrl === ""
                ? this.allFooterMenu[this.commonIndex].labelImage
                : this.formData.bannerImageUrl,
            pageId: this.formData.pageId,
            parentMenu: this.formData.parentMenu,
            subMenu: this.formData.subMenu,
            parentMenuId: this.formData.parentMenuId,
            menuOrder: this.formData.menuOrder
          };
          this.editFooterMenuById(payload);
          this.changeMsg = "Edited successfully";
          this.$bvModal.show("modal-change");
        }
      });
    },
    handleFileUpload(i) {
      var self = this;
      if (i === 0) {
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
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.$router.push({ path: "/viewFooterMenu/" });
    }
  },
  created() {
    this.formData.name = this.allFooterMenu[this.commonIndex].name;
    this.formData.bannerImageUrl =
      this.allFooterMenu[this.commonIndex].labelImage !== ""
        ? this.allFooterMenu[this.commonIndex].labelImage
        : "";
    this.formData.labelDesc = this.allFooterMenu[this.commonIndex].labelDesc;
    this.formData.pageId = this.allFooterMenu[this.commonIndex].pageId;
    this.formData.parentMenu = this.allFooterMenu[this.commonIndex].parentMenu;
    this.formData.subMenu = this.allFooterMenu[this.commonIndex].subMenu;
    this.formData.parentMenuId = this.allFooterMenu[
      this.commonIndex
    ].parentMenuId;
    this.formData.menuOrder = this.allFooterMenu[this.commonIndex].menuOrder;
  }
};
</script>
