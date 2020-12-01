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
              Add Bible
            </li>
          </ol>
        </div>
        <div class="common-bg bg-white" v-if="roleId === 99">
          <div class="row">
            <div class="col-sm-6">
              <button
                v-b-modal.modal-addBible
                type="button"
                class="btn btn-success"
                style="margin:0px 15px;"
              >
                Add New Bible
              </button>
            </div>
          </div>
        </div>

        <!--show existing bible-->
        <view-bible></view-bible>

        <!--create bible modal-->
        <b-modal
          id="modal-addBible"
          size="md"
          centered
          title="Add New"
          ref="modal-addBible"
          no-close-on-backdrop
          ok-title="Submit"
          @ok="handleSubmit"
        >
          <b-form-group class="col">
            <label for="bibleName">Bible name</label>
            <b-form-input
              id="bibleName"
              v-model="formData.bibleName"
              v-validate="'required'"
              type="text"
              name="bibleName"
              class="form-control"
              :class="{ 'is-danger': errors.has('bibleName') }"
            />
            <span v-show="errors.has('bibleName')" class="help is-danger">
              {{ errors.first("bibleName") }}
            </span>
          </b-form-group>
          <b-form-group class="col">
            <label for>Choose Language</label>
            <b-form-select
              name="langId"
              v-model="formData.langId"
              class="form-control"
              v-validate="'required'"
              :class="{ 'is-danger': errors.has('langId') }"
            >
              <option disabled value>select</option>
              <option
                v-for="(lang, index) in existinglang.rows"
                :key="index"
                :value="lang.langId"
                >{{ lang.langType }}</option
              >
            </b-form-select>
            <span v-show="errors.has('langId')" class="help is-danger spacelr">
              {{ errors.first("langId") }}
            </span>
          </b-form-group>
          <b-form-group class="col">
            <label for="file">Xml Url</label>
            <div class="dashborder mt-3">
              <progressBar
                v-if="progress.fileUpload"
                :max="progress.maxval"
                :colours="progress.filecolours.variant"
                :percent="progress.filePercent"
                filerefs="file"
              ></progressBar>
              <input
                type="file"
                name="file"
                id="file"
                class="form-control"
                v-validate="'required'"
                accept=".xml"
                :class="{ 'is-danger': errors.has('file') }"
                v-on:change="handleFileUpload(0)"
                ref="file"
              />
            </div>
            <span v-show="errors.has('xmlurl')" class="help is-danger">
              {{ errors.first("xmlurl") }}
            </span>
          </b-form-group>
          <b-form-group class="col">
            <label for="tblName">App Table name</label>
            <b-form-input
              id="tblName"
              v-model="formData.tblName"
              v-validate="'required'"
              type="text"
              name="tblName"
              class="form-control"
              :class="{ 'is-danger': errors.has('tblName') }"
            />
            <span v-show="errors.has('tblName')" class="help is-danger">
              {{ errors.first("tblName") }}
            </span>
          </b-form-group>
        </b-modal>

        <!--if the application logout but opened in another tab then it will apear-->
        <session-modal></session-modal>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import axios from "axios";
import sidebar from "../../admin/sidebar.vue";
import viewBible from "../../admin/bible/viewBible.vue";
import adminHeader from "../../admin/adminHeader.vue";
import { mapState, mapActions } from "vuex";
import progressBar from "../../admin/progressBar.vue";
import sessionModal from "../../sessionModal.vue";
export default {
  components: {
    "app-sidebar": sidebar,
    "admin-header": adminHeader,
    "view-bible": viewBible,
    progressBar,
    "session-modal": sessionModal
  },
  data() {
    return {
      columns: [
        {
          key: "langType",
          label: "Language Name",
          class: "row1",
          sortable: true
        },
        {
          key: "versionName",
          label: "Version Name",
          class: "row2",
          sortable: true,
          sortDirection: "desc"
        },
        { key: "action", class: "row6 text-center", label: "Actions" }
      ],
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 50, 100],
      sortBy: null,
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      formData: {
        bibleName: "",
        langId: "",
        xmlurl: "",
        tblName: ""
      },
      file: "",
      fileErr: "",
      progress: {
        filePercent: 0,
        fileUpload: false,
        filecolours: {
          variant: "warning"
        }
      }
    };
  },
  methods: {
    ...mapActions(["createNewBible"]),
    handleSubmit(bvModalEvt) {
      bvModalEvt.preventDefault();
      // call addBible method after modal's submit button clicks
      this.addBible();
    },
    handleFileUpload(i) {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        // to upload images
        var self = this;
        if (i === 0) {
          this.file = this.$refs.file.files[0];
          let formData = new FormData();
          formData.append("file", this.file);
          this.progress.filecolours.variant = "warning";
          this.progress.fileUpload = true;
          axios
            .post(process.env.VUE_APP_DB_API + "upload/doc", formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              },
              onUploadProgress: function(progressEvent) {
                this.progress.filePercent = 5;
                setTimeout(function() {
                  self.progress.filePercent = 50;
                  self.progress.filecolours.variant = "info";
                }, 100);
              }.bind(this)
            })
            .then(function(res) {
              if (typeof res.data.file === "string") {
                self.progress.filePercent = 100;
                self.progress.filecolours.variant = "success";
                self.formData.xmlurl = res.data.file;
                setTimeout(function() {
                  self.progress.fileUpload = false;
                  self.progress.filePercent = 0;
                  self.progress.filecolours.variant = "light";
                }, 3000);
              }
            })
            .catch(function() {
              self.fileErr = "Check your internet connection";
              self.progress.fileUpload = false;
              console.log("FAILURE!!");
            });
        }
      }
    },
    addBible() {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.$validator.validateAll().then(result => {
          if (result) {
            const payload = {
              langId: this.formData.langId,
              name: this.formData.bibleName,
              xmlurl: this.formData.xmlurl,
              tblName: this.formData.tblName
            };
            // call's createNewBible method in action.js
            this.createNewBible(payload);
            this.formData.bibleName = "";
          }
        });
      }
    }
  },
  computed: {
    ...mapState(["existinglang", "bible", "roleId"])
  }
};
</script>
