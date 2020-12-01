<template>
  <div class="bg-white">
    <div class="marginTop30">
      <b-col md="10" class="py-2">
        <b-row class="text-center">
          <b-col md="6" class="my-1 text-left">
            <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
              <b-input-group>
                <b-form-input
                  v-model="filter"
                  placeholder="Type to Search"
                ></b-form-input>
                <b-input-group-append>
                  <b-button :disabled="!filter" @click="filter = ''"
                    >Clear</b-button
                  >
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col md="6" class="my-1">
            <b-form-group label-cols-sm="7" label="Per page" class="mb-0">
              <b-form-select
                v-model="perPage"
                :options="pageOptions"
              ></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>

        <!-- To show bible data in a table-->
        <b-table
          class="table-bordered viewtable-width marginTop30"
          :items="xmlbible"
          :fields="columns"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :filterIncludedFields="filterOn"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
        >
          <template v-slot:cell(action)="data">
            <div class="action-cls">
              <i
                @click="editBibleClk(data.item.id, data.item)"
                v-b-tooltip.hover
                title="edit"
                class="far fa-edit action-icons edit-active"
              ></i>
              <i
                @click="delBibleClk(data.item.id, data.item)"
                v-b-tooltip.hover
                title="delete"
                style="color: #de0404;"
                class="fa fa-trash edit-active"
              ></i>
            </div>
          </template>
        </b-table>
        <div class="marginTop30">
          <b-col md="6" class="my-1">
            <b-pagination
              v-model="currentPage"
              :total-rows="xmlbible.length"
              :per-page="perPage"
              class="my-0"
            ></b-pagination>
          </b-col>
        </div>
      </b-col>
    </div>

    <!-- Edit bible modal-->
    <b-modal
      centered
      title="Edit Existing Bible"
      ref="modalEditBible"
      no-close-on-backdrop
      ok-title="Save"
      @ok="handleSubmit"
    >
      <b-form @submit.prevent="editExistingBible">
        <b-form-group class="col">
          <label for="editBibleName">Bible name</label>
          <b-form-input
            id="editBibleName"
            v-model="formData.editBibleName"
            v-validate="'required'"
            type="text"
            name="editBibleName"
            class="form-control"
            :class="{ 'is-danger': errors.has('editBibleName') }"
          />
          <span v-show="errors.has('editBibleName')" class="help is-danger">
            {{ errors.first("editBibleName") }}
          </span>
        </b-form-group>
        <b-form-group class="col">
          <label for>Choose Language</label>
          <b-form-select
            name="editLangId"
            v-model="formData.editLangId"
            class="form-control"
            v-validate="'required'"
            :class="{ 'is-danger': errors.has('editLangId') }"
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
          <label for="editFile">Xml Url</label>
          <div class="dashborder mt-3">
            <progressBar
              v-if="progress.editFileUpload"
              :max="progress.maxval"
              :colours="progress.editFilecolours.variant"
              :percent="progress.editFilePercent"
              filerefs="filexml"
            ></progressBar>
            <input
              type="file"
              name="editFile"
              id="editFile"
              class="form-control"
              v-validate="'required'"
              :class="{ 'is-danger': errors.has('editFile') }"
              v-on:change="handleFileUpload(1)"
              ref="filexml"
            />
          </div>
          <span v-show="errors.has('editFile')" class="help is-danger">
            {{ errors.first("editFile") }}
          </span>
        </b-form-group>
        <b-form-group class="col">
          <label for="editTblName">App Table name</label>
          <b-form-input
            id="editTblName"
            v-model="formData.editTblName"
            v-validate="'required'"
            type="text"
            name="editTblName"
            class="form-control"
            :class="{ 'is-danger': errors.has('editTblName') }"
          />
          <span v-show="errors.has('editTblName')" class="help is-danger">
            {{ errors.first("editTblName") }}
          </span>
        </b-form-group>
      </b-form>
    </b-modal>

    <!-- delete bible modal-->
    <b-modal
      id="modal-delete"
      ref="deleModal"
      hide-header-close
      no-close-on-backdrop
      ok-title="Ok"
      @ok="handleDelete"
    >
      <p class="my-4 text-center">Are you sure wants to delete?</p>
    </b-modal>
  </div>
</template>
<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
import { Validator } from "vee-validate";
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
      columns: [
        {
          key: "langType",
          label: "Language",
          class: "row1",
          sortable: true
        },
        {
          key: "name",
          label: "Bible Name",
          class: "row1",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "xmlurl",
          label: "Xml url",
          class: "row3",
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
        editLangId: "",
        editXmlurl: "",
        editBibleName: "",
        editTblName: ""
      },
      editFile: "",
      editfFleErr: "",
      progress: {
        maxval: 100,
        editFilePercent: 0,
        editFileUpload: false,
        editFilecolours: {
          variant: "warning"
        }
      },
      bId: "",
      itm: "",
      delbId: ""
    };
  },
  computed: {
    ...mapState(["existinglang", "xmlbible"])
  },
  components: {
    progressBar
  },
  methods: {
    ...mapActions(["editBible", "deleteBible"]),
    handleFileUpload(i) {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        // to upload images
        var self = this;
        if (i === 1) {
          this.file = this.$refs.filexml.files[0];
          let formData = new FormData();
          formData.append("file", this.file);
          this.progress.editFilecolours.variant = "warning";
          this.progress.editFileUpload = true;
          axios
            .post(process.env.VUE_APP_DB_API + "upload/doc", formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              },
              onUploadProgress: function(progressEvent) {
                this.progress.editFilePercent = 5;
                setTimeout(function() {
                  self.progress.editFilePercent = 50;
                  self.progress.editFilecolours.variant = "info";
                }, 100);
              }.bind(this)
            })
            .then(function(res) {
              if (typeof res.data.file === "string") {
                self.progress.editFilePercent = 100;
                self.progress.editFilecolours.variant = "success";
                self.formData.editXmlurl = res.data.file;
                setTimeout(function() {
                  self.progress.editFileUpload = false;
                  self.progress.editFilePercent = 0;
                  self.progress.editFilecolours.variant = "light";
                }, 3000);
              }
            })
            .catch(function() {
              self.editFileErr = "Check your internet connection";
              self.progress.editFileUpload = false;
              console.log("FAILURE!!");
            });
        }
      }
    },
    editBibleClk(id, item) {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        // opens edit bible modal
        this.bId = id;
        this.itm = item;
        this.formData.editLangId = item.langId;
        this.formData.editXmlurl = item.xmlurl;
        this.formData.editBibleName = item.name;
        this.formData.editTblName = item.tblName;
        this.$refs.modalEditBible.show();
      }
    },
    handleSubmit(bvModalEvt) {
      bvModalEvt.preventDefault();
      if (this.bId) {
        // call editExistingBible method after modal's submit
        this.editExistingBible(this.bId);
      }
    },
    editExistingBible(id) {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          const payload = {
            id: this.bId,
            langId: this.formData.editLangId,
            xmlurl: this.formData.editXmlurl,
            name: this.formData.editBibleName,
            tblName: this.formData.editTblName
          };
          // when we update a form it will call editBible method in action.js
          this.editBible(payload);
          this.$nextTick(() => {
            this.$refs.modalEditBible.hide();
          });
          this.bId = "";
        }
      });
    },
    delBibleClk(id, item) {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.delbId = id;
        this.$refs.deleModal.show();
      }
    },
    handleDelete(bvModalEvt) {
      bvModalEvt.preventDefault();
      if (this.delbId) {
        // call deleBible method after modal's submit
        this.deleBible(this.delbId);
      }
    },
    deleBible(id) {
      const payload = {
        id: id
      };
      // call's deleteBible method in action.js
      this.deleteBible(payload);
      this.$nextTick(() => {
        this.$refs.deleModal.hide();
      });
      this.delbId = "";
    }
  }
};
</script>
