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
            <li class="breadcrumb-item active" aria-current="page">Add Footer Menu</li>
          </ol>
        </div>
        <div>
          <b-form class="grpbg" enctype="multipart/form-data" @submit.prevent="createNewFooterMenu">
            <b-row>
              <b-form-group class="col-sm-12">
                <h5>Create New Footer Menu</h5>
              </b-form-group>
            </b-row>
            <b-row>
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
                <b-form-group class="col-sm-12">
                  <label for="file">Icon</label>
                  <div class="dashborder mt-3">
                    <!--  -->
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
                      class="form-control"
                      v-validate
                      accept=".jpg, .png, .jpeg"
                      :class="{ 'is-danger': errors.has('file') }"
                      v-on:change="handleFileUpload(0)"
                      ref="file"
                    />
                    <!-- <span v-show="errors.has('file')" class="help is-danger">
                      {{
                      errors.first("file")
                      }}
                    </span>-->
                  </div>
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
      <p class="my-4 text-center">{{ changeMsg }}</p>
    </b-modal>
    <session-modal></session-modal>
  </b-container>
</template>
<script>
import axios from "axios";
import sidebar from "../../admin/sidebar.vue";
import adminHeader from "../../admin/adminHeader.vue";
import progressBar from "../../admin/progressBar.vue";
import { Validator } from "vee-validate";
import { mapState, mapActions } from "vuex";
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
      titleExists: false,
      formData: {
        name: "",
        labelDesc: "",
        iconUrl: "",
        pageId: "",
        parentMenu: "",
        subMenu: "",
        parentMenuId: "",
        menuOrder: ""
      },
      bannerImageUrl: "",
      file: "",
      progress: {
        imagePercent: 0,
        imageUpload: false,
        imagecolours: {
          variant: "warning"
        }
      },
      changeMsg: ""
    };
  },
  components: {
    "app-sidebar": sidebar,
    "admin-header": adminHeader,
    progressBar,
    "session-modal": sessionModal
  },
  computed: {
    ...mapState(["existinglang", "allFooterMenu", "allPages"])
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
    ...mapActions(["createFooterMenu"]),
    showImagePrompt(command) {
      const src = prompt("Enter the url of your image here");
      if (src !== null) {
        command({ src });
      }
    },
    createNewFooterMenu() {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.$validator.validateAll().then(valid => {
          if (valid && !this.titleExists) {
            const payload = {
              ID: this.allFooterMenu.length + 1,
              name: this.formData.name,
              labelDesc: this.formData.labelDesc,
              labelImage: this.formData.bannerImageUrl,
              pageId: this.formData.pageId,
              parentMenu: this.formData.parentMenu,
              subMenu:
                this.formData.parentMenu == 1 ? 0 : this.formData.subMenu,
              parentMenuId:
                this.formData.parentMenu == 1 ? 0 : this.formData.parentMenuId,
              menuOrder: this.formData.menuOrder
            };
            this.createFooterMenu(payload);
            this.changeMsg = "Added successfully";
            this.$bvModal.show("modal-change");
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
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.$router.push({ path: "/viewFooterMenu/" });
    }
  }
};
</script>
