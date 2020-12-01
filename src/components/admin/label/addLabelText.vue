<template>
  <b-container fluid>
    <b-row class="form-height">
      <app-sidebar />
      <b-col md="10" class="mb-2 form-bg">
        <admin-header />
        <div aria-label="breadcrumb" class="breadcrumpCss">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">Language</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Add {{ existinglang.rows[langid].langType }}
            </li>
          </ol>
        </div>
        <form
          v-if="$route.params.id == 1 && roleId == 99"
          class="common-bg"
          method="post"
          @submit.prevent="addlbList"
        >
          <!-- <p v-show="msg" class="invalid-cls col-sm-12">Check your language</p> -->
          <div class="row col-sm-12">
            <div class="col-sm-3">
              <label>Label name</label>
              <b-form-input
                v-model="formData.engName"
                v-validate="'required'"
                type="text"
                name="engName"
                :class="{ input: true, 'is-danger': errors.has('engName') }"
              />
              <span v-show="errors.has('engName')" class="help is-danger">{{
                errors.first("engName")
              }}</span>
            </div>
            <div class="col-sm-3">
              <label>Label Description</label>
              <b-form-input
                v-model="formData.labelDesc"
                v-validate="'required'"
                type="text"
                name="labelDesc"
                :class="{ input: true, 'is-danger': errors.has('labelDesc') }"
              />
              <span v-show="errors.has('labelDesc')" class="help is-danger">{{
                errors.first("labelDesc")
              }}</span>
            </div>
            <b-form-group class="col-sm-4">
              <label for="file">Banner Image</label>
              <div class="dashborder">
                <!--  -->
                <input
                  type="file"
                  name="file"
                  id="file"
                  class="form-control"
                  accept="image/jpeg, image/png, image/gif, image/jpg"
                  v-validate
                  :class="{ 'is-danger': errors.has('file') }"
                  v-on:change="handleFileUpload(0)"
                  ref="file"
                />
                <span v-show="imgErr" class="help is-danger ml-2">{{
                  imgErr
                }}</span>
              </div>
              <progressBar
                v-if="progress.imageUpload"
                :max="progress.maxval"
                :colours="progress.imagecolours.variant"
                :percent="progress.imagePercent"
                class="mt-2"
              ></progressBar>
            </b-form-group>
            <div class="col-sm-2 marginTop30">
              <button type="submit" class="btn btn-success">Add</button>
            </div>
          </div>
        </form>
        <!-- display existing label list-->
        <editLabelText />
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import sidebar from "../../admin/sidebar.vue";
import adminHeader from "../../admin/adminHeader.vue";
import editLabelText from "./editLabelText.vue";
import { Validator } from "vee-validate";
import { mapState, mapActions } from "vuex";
import progressBar from "../../admin/progressBar.vue";
import axios from "axios";
export default {
  data() {
    const dictionary = {
      en: {
        messages: {
          required: function () {
            return "This field is required";
          },
        },
      },
    };
    Validator.localize(dictionary);
    return {
      errmessage: false,
      msg: false,
      searchText: "",
      searcheng: [],
      item: {
        value: "",
        text: "",
      },
      file: "",
      imgErr: "",
      // selected: { name: null, id: null },
      formData: {
        labelName: "",
        labelDesc: "",
        engName: "",
        labelImage: "",
      },
      progress: {
        imagePercent: 0,
        imageUpload: false,
        imagecolours: {
          variant: "warning",
        },
      },
    };
  },
  methods: {
    ...mapActions(["createEnglishLabel"]),
    addlbList() {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        if (parseInt(this.$route.params.id) === 1) {
          this.$validator.validateAll().then((valid) => {
            if (valid) {
              const payload = {
                userId: localStorage.getItem("userId"),
                // id: this.LabelList.rows.length + 1,
                langId: this.$route.params.id,
                name: this.formData.engName,
                labelDesc: this.formData.labelDesc,
                labelImage: this.formData.labelImage
                  ? this.formData.labelImage
                  : null,
                status: 0,
              };
              this.createEnglishLabel(payload);
              this.formData.engName = "";
              this.formData.labelDesc = "";
              this.formData.labelImage = "";
            }
          });
        }
      }
    },
    handleFileUpload(i) {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        // upload image
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
                "Content-Type": "multipart/form-data",
              },
              onUploadProgress: function (progressEvent) {
                this.progress.imagePercent = 5;
                setTimeout(function () {
                  self.progress.imagePercent = 50;
                  self.progress.imagecolours.variant = "info";
                }, 100);
              }.bind(this),
            })
            .then(function (res) {
              if (typeof res.data.file === "string") {
                self.progress.imagePercent = 100;
                self.progress.imagecolours.variant = "success";
                self.formData.labelImage = res.data.file;
                setTimeout(function () {
                  self.progress.imageUpload = false;
                  self.progress.imagePercent = 0;
                  self.progress.imagecolours.variant = "light";
                }, 3000);
              }
            })
            .catch(function () {
              self.imgErr = "Check your internet connection";
              self.progress.imageUpload = false;
              console.log("FAILURE!!");
            });
        }
      }
    },
  },
  mounted() {
    // english label list
    var SearchList = this.LabelList.rows;
    SearchList = SearchList.map(function (x) {
      return {
        value: x.id,
        text: x.name,
        langId: x.langId,
        labelDesc: x.labelDesc,
      };
    });
    this.searcheng = SearchList;
  },
  components: {
    "admin-header": adminHeader,
    "app-sidebar": sidebar,
    editLabelText,
    progressBar,
  },
  computed: {
    ...mapState(["existinglang", "LabelList", "AllLabel", "roleId"]),
    langid() {
      if (
        this.existinglang.rows !== null &&
        this.existinglang.rows.length !== 0
      ) {
        return this.existinglang.rows.findIndex(
          (item) => parseInt(item.langId) === parseInt(this.$route.params.id)
        );
      } else {
        return -1;
      }
    },
    filterLang() {
      if (this.$route.params.id) {
        return this.AllLabel.rows.filter(
          (item) => item.langId === this.$route.params.id
        );
      } else {
        return -1;
      }
    },
  },
};
</script>
