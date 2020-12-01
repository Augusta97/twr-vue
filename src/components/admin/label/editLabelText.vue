<template>
  <div>
    <div v-if="$route.params.id == 1" class="common-bg linearbg marginTop20">
      <h5>
        <strong>{{ existinglang.rows[langid].langType }} Label List</strong>
      </h5>
      <div class="row">
        <p class="col-sm-2">
          <b>Label name</b>
        </p>
        <p class="col-sm-2">
          <b>Label Description</b>
        </p>
      </div>
      <div
        v-for="(label, inx) in LabelList.rows.filter((x) => x.status == 0)"
        :key="inx"
      >
        <div class="row">
          <p class="col-sm-2">{{ inx + 1 }}] {{ label.name }}</p>
          <p class="col-sm-2">{{ label.appId }}</p>
          <!-- <span><font-awesome-icon icon="plus" v-b-tooltip.hover title="add and edit label" class="marlr10 marTop5 clr-vio" @click="addLabel(lang.lang_id, lang)"></font-awesome-icon></span> -->
          <p class="spacelr">
            <font-awesome-icon
              v-b-tooltip.hover
              icon="edit"
              title="edit"
              class="marTop5 clr-green"
              @click="editEng(label.engId, label)"
            />
          </p>
          <p>
            <font-awesome-icon
              v-b-tooltip.hover
              icon="trash"
              title="delete"
              class="marTop5 clr-trash"
              @click="deleteEng(label.engId, inx)"
            />
          </p>
        </div>
      </div>
    </div>
    <div v-else class="common-bg linearbg marginTop20">
      <h5>
        <strong>{{ existinglang.rows[langid].langType }} Label List</strong>
      </h5>
      <div class="row">
        <p class="col-sm-2">
          <b>English Label name</b>
        </p>
        <p class="col-sm-2">
          <b>Native Tongue</b>
        </p>
      </div>
      <div v-for="(allLabel, inx) in filterLang" :key="inx">
        <div v-if="allLabel.status == 0" class="row">
          <p class="col-sm-2">{{ inx + 1 }}] {{ allLabel.name }}</p>
          <p class="col-sm-2">{{ allLabel.labelName }}</p>
          <!-- <span><font-awesome-icon icon="plus" v-b-tooltip.hover title="add and edit label" class="marlr10 marTop5 clr-vio" @click="addLabel(lang.lang_id, lang)"></font-awesome-icon></span> -->
          <p>
            <font-awesome-icon
              v-b-tooltip.hover
              icon="edit"
              title="edit"
              class="marTop5 clr-green"
              @click="editLabel(allLabel.labelId, allLabel)"
            />
          </p>
          <p class="spacelr">
            <font-awesome-icon
              v-b-tooltip.hover
              icon="trash"
              title="delete"
              class="marTop5 clr-trash"
              @click="deleteLabel(allLabel.labelId, inx)"
            />
          </p>
        </div>
      </div>
    </div>
    <b-modal id="modaledit" ref="editModal" title="Edit Label" @ok="handleOk">
      <form @submit.prevent="editFun">
        <div v-if="$route.params.id == 1">
          <p v-show="msg" class="invalid-cls">Data updated</p>
          <b-form-group label="Label Name" label-for="langtype-input">
            <b-form-input
              v-model="formData.editEngName"
              v-validate="'required'"
              name="editEngName"
              :class="{ input: true, 'is-danger': errors.has('editEngName') }"
            />
            <span v-show="errors.has('editEngName')" class="help is-danger">{{
              errors.first("editEngName")
            }}</span>
          </b-form-group>
          <b-form-group label="Label Description" label-for="label-desc">
            <b-form-input
              v-model="formData.editEngDesc"
              v-validate="'required'"
              name="editEngDesc"
              :class="{ input: true, 'is-danger': errors.has('editEngDesc') }"
              readonly
            />
            <span v-show="errors.has('editEngDesc')" class="help is-danger">{{
              errors.first("editEngDesc")
            }}</span>
          </b-form-group>
          <b-form-group>
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
              v-if="progress.imageUpload1"
              :max="progress.maxval"
              :colours="progress.imagecolours1.variant"
              :percent="progress.imagePercent1"
              class="mt-2"
            ></progressBar>
          </b-form-group>
        </div>
        <div v-else>
          <p v-show="msg" class="invalid-cls">Data updated</p>
          <b-form-group
            label="Label name in English"
            label-for="ownlabel-input"
          >
            <model-select
              v-model="item"
              :options="searcheng"
              :selected-option="item"
              placeholder="placeholder text"
              @select="printSearchText"
            />
            <span v-show="errors.has('editEngid')" class="help is-danger">{{
              errors.first("editEngid")
            }}</span>
          </b-form-group>
          <b-form-group
            label="Label name in native tongue"
            label-for="labelname-input"
          >
            <b-form-input
              v-model="formData.editLabelName"
              v-validate="'required'"
              name="editLabelName"
              :class="{ input: true, 'is-danger': errors.has('editLabelName') }"
            />
            <span v-show="errors.has('editLabelName')" class="help is-danger">{{
              errors.first("editLabelName")
            }}</span>
          </b-form-group>
        </div>
      </form>
    </b-modal>
    <b-modal
      id="modal-deleteEngModal"
      ref="deleteEngModal"
      title="Confirmation Message"
      no-close-on-backdrop
      ok-title="Yes"
      cancel-title="No"
      @ok="handleEngDelete"
    >
      <p class="my-4 text-center">{{ delMsg }}</p>
    </b-modal>
    <b-modal
      ref="deleteLabelModal"
      title="Confirmation Message"
      no-close-on-backdrop
      ok-title="Yes"
      cancel-title="No"
      @ok="handleLabelDelete"
    >
      <p class="my-4 text-center">{{ delMsg }}</p>
    </b-modal>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";
import { ModelSelect } from "vue-search-select";
import "vue-search-select/dist/VueSearchSelect.css";
export default {
  components: {
    ModelSelect,
  },
  data() {
    return {
      delEngId: "",
      delEngIndex: "",
      delLabelId: "",
      delLabelIndex: "",
      delMsg: "",
      msg: false,
      searchText: "",
      searcheng: [],
      eng: "",
      item: {
        value: "",
        text: "",
      },
      // item: {
      //   id: '',
      //   name: ''
      // },
      formData: {
        editEngName: "",
        editEngDesc: "",
        editEngid: "",
        editLabelName: "",
      },
      file: "",
      imgErr: "",
      progress: {
        imagePercent1: 0,
        imageUpload1: false,
        imagecolours1: {
          variant: "warning",
        },
      },
    };
  },
  methods: {
    ...mapActions([
      "editEngLabel",
      "editAllLabel",
      "deleteEngLabel",
      "deleteAllLabel",
    ]),
    printSearchText(item) {
      this.item = item;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.editFun();
    },
    editEng(id, item) {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.formData.editEngName = item.name;
        this.formData.editEngDesc = item.appId;
        this.editlabel_index = this.LabelList.rows.findIndex(
          (x) => x.engId === id
        );
        this.$refs.editModal.show();
      }
      // this.editlabel_id = id
    },
    editLabel(id, itm) {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.item.value = itm.engId;
        this.item.text = itm.name;
        this.formData.editLabelName = itm.labelName;
        this.langId = itm.langId;
        this.index = id - 1;
        this.editlbid = id;
        this.$refs.editModal.show();
      }
    },
    editFun() {
      if (parseInt(this.$route.params.id) === 1) {
        this.$validator.validateAll().then((result) => {
          if (result) {
            // this.LabelList.rows[
            //   this.editlabel_index
            // ].name = this.formData.editEngName;
            // this.LabelList.rows[
            //   this.editlabel_index
            // ].labelDesc = this.formData.editEngDesc;
            // var b =this.LabelList.rows(x=>x.id)
            this.msg = true;
            const payload = {
              langId: this.$route.params.id,
              engId: this.LabelList.rows[this.editlabel_index].engId,
              index: this.editlabel_index,
              userId: localStorage.getItem("userId"),
              name: this.formData.editEngName,
              labelDesc: this.formData.editEngDesc,
              labelImage: this.formData.labelImage
                ? this.formData.labelImage
                : null,
            };
            this.editEngLabel(payload);
            var self = this;
            setTimeout(function () {
              self.msg = false;
              self.$refs.editModal.hide();
            }, 3000);
          }
        });
      } else {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.msg = true;
            const payload = {
              langId: this.langId,
              labelId: this.editlbid,
              engId: this.item.value,
              index: this.index,
              userId: localStorage.getItem("userId"),
              labelName: this.formData.editLabelName,
            };
            this.editAllLabel(payload);
            var self = this;
            setTimeout(function () {
              self.msg = false;
              self.$refs.editModal.hide();
            }, 5000);
          }
        });
      }
    },
    deleteEng(id, indx) {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.delEngId = id;
        this.delEngIndex = indx;
        this.delMsg = "Are you sure wants to delete ?";
        this.$refs.deleteEngModal.show();
      }
    },
    handleEngDelete() {
      if (this.delEngId) {
        this.delEngCallBack(this.delEngId, this.delEngIndex);
      }
    },
    delEngCallBack(id, indx) {
      this.LabelList.rows[indx].status = 1;
      const payload = {
        userId: localStorage.getItem("userId"),
        index: indx,
        id: id,
        status: 1,
      };
      this.deleteEngLabel(payload);
    },
    deleteLabel(lbid, lbIndx) {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.delLabelId = lbid;
        this.delLabelIndex = lbIndx;
        this.delMsg = "Are you sure wants to delete ?";
        this.$refs.deleteLabelModal.show();
      }
    },
    handleLabelDelete() {
      if (this.delLabelId) {
        this.delLabelCallBack(this.delLabelId, this.delLabelIndex);
      }
    },
    delLabelCallBack(lbid, lbIndx) {
      this.filterLang[lbIndx].status = 1;
      const payload = {
        userId: localStorage.getItem("userId"),
        index: lbIndx,
        labelId: lbid,
        status: 1,
      };
      this.deleteAllLabel(payload);
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
          this.progress.imagecolours1.variant = "warning";
          this.progress.imageUpload1 = true;
          axios
            .post(process.env.VUE_APP_DB_API + "upload/image", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              onUploadProgress: function (progressEvent) {
                this.progress.imagePercent1 = 5;
                setTimeout(function () {
                  self.progress.imagePercent1 = 50;
                  self.progress.imagecolours1.variant = "info";
                }, 100);
              }.bind(this),
            })
            .then(function (res) {
              if (typeof res.data.file === "string") {
                self.progress.imagePercent1 = 100;
                self.progress.imagecolours1.variant = "success";
                self.formData.labelImage = res.data.file;
                setTimeout(function () {
                  self.progress.imageUpload1 = false;
                  self.progress.imagePercent1 = 0;
                  self.progress.imagecolours1.variant = "light";
                }, 3000);
              }
            })
            .catch(function () {
              self.imgErr = "Check your internet connection";
              self.progress.imageUpload1 = false;
              console.log("FAILURE!!");
            });
        }
      }
    },
  },
  mounted() {
    var SearchList = this.LabelList.rows;
    SearchList = SearchList.map(function (x) {
      return {
        value: x.engId,
        text: x.name,
        langId: x.langId,
        labelDesc: x.labelDesc,
      };
    });
    this.searcheng = SearchList;
  },
  computed: {
    ...mapState(["existinglang", "LabelList", "AllLabel"]),
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
          (item) =>
            item.langId === parseInt(this.$route.params.id) && item.status === 0
        );
      } else {
        return -1;
      }
    },
  },
};
</script>
