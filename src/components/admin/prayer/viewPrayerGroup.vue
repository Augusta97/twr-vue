<template>
  <div class="common-bg bg-white">
    <div style="height:50%;">
      <b-col md="10" class="mb-2 ">
        <b-row class="phasetable-space pb-2">
          <b-col md="6" class="my-1">
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
          <b-col md="6" class="my-1 text-right">
            <b-form-group label-cols-sm="7" label="Per page" class="mb-0">
              <b-form-select
                v-model="perPage"
                :options="pageOptions"
              ></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-table
          class="table-bordered viewtable-width"
          v-if="prayerGroup.result.length > 0"
          :items="prayerGroup.result"
          :fields="columns"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :filterIncludedFields="filterOn"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
        >
          <template v-slot:cell(updatedOn)="row">{{
            row.item.updatedOn
          }}</template>
          <template v-slot:cell(action)="row">
            <i
              @click="viewPrayer(row.item.id, row.item.thankGroup)"
              class="fa fa-eye action-icons eye-active"
              style="width:20%;color:red;"
              v-b-tooltip.hover
              title="View"
            ></i>
            <i
              @click="editPrayer(row.item.id, row.item)"
              v-b-tooltip.hover
              title="edit"
              class="far fa-edit action-icons edit-active"
            ></i>
            <i
              @click="deleteRow(row.item.id)"
              v-b-tooltip.hover
              title="delete"
              style="color: #de0404;"
              class="fa fa-trash edit-active"
            ></i>
          </template>
        </b-table>
        <div class="viewtable-width">
          <b-col md="6" class="my-1">
            <b-pagination
              v-model="currentPage"
              :total-rows="prayerGroup.result.length"
              :per-page="perPage"
              class="my-0"
            ></b-pagination>
          </b-col>
        </div>
      </b-col>
    </div>
    <b-modal
      id="modaledit"
      ref="editModal"
      title="Edit Prayer Group"
      @ok="handleOk"
      no-close-on-backdrop
    >
      <form @submit.prevent="editFun">
        <p v-show="msg" class="invalid-cls">Data updated</p>
        <b-form-group label="Group Name" label-for="groupname-input">
          <b-form-input
            v-model="formData.editName"
            v-validate="'required'"
            name="editName"
            :class="{ input: true, 'is-danger': errors.has('editName') }"
          />
          <span v-show="errors.has('editName')" class="help is-danger">{{
            errors.first("editName")
          }}</span>
        </b-form-group>
        <b-row>
          <b-form-group class="col">
            <p class="mt-2">Group Image</p>
            <div class="col-sm-8 mt-3">
              <b-img
                class="img-thumbnail tick1"
                :src="formData.editGroupImage"
                fluid
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
            <input
              type="file"
              name="file"
              id="file"
              accept=".jpg, .png, .jpeg"
              class="mt-3 d-none"
              :class="{ 'is-danger': errors.has('file') }"
              v-on:change="handleFileUpload(1)"
              ref="file"
            />
            <progressBar
              class="mt-2"
              v-if="editProgress.imageUpload"
              :max="editProgress.maxval"
              :colours="editProgress.imagecolours.variant"
              :percent="editProgress.imagePercent"
            ></progressBar>
            <!-- <label for="file">Banner Image</label>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    class="form-control"
                    v-on:change="handleFileUpload(0)"
                    ref="file"
            />-->
          </b-form-group>
          <b-form-group
            label="Specific Date"
            label-for="editSpecificDate"
            class="col"
          >
            <b-form-select
              v-model="formData.editSpecificDate"
              v-validate="'required'"
              name="editSpecificDate"
              class="txtbox-design"
              :class="{
                input: true,
                'is-danger': errors.has('editSpecificDate')
              }"
            >
              <option class="disable" disabled value>Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </b-form-select>
            <span
              v-show="errors.has('editSpecificDate')"
              class="help is-danger"
              >{{ errors.first("editSpecificDate") }}</span
            >
          </b-form-group>
          <b-form-group label="Status" label-for="editStatus" class="col">
            <b-form-select
              v-model="formData.editStatus"
              v-validate="'required'"
              type="text"
              :class="{ input: true, 'is-danger': errors.has('editStatus') }"
              class="form-control"
              name="editStatus"
            >
              <option class="disable" disabled value>Select</option>
              <option value="Published">Published</option>
              <option value="Private">Private</option>
              <option value="Draft">Draft</option>
            </b-form-select>
            <span v-show="errors.has('editStatus')" class="help is-danger">{{
              errors.first("editStatus")
            }}</span>
          </b-form-group>
        </b-row>
        <b-row>
          <b-form-group
            class="col"
            label="Start Date"
            v-if="formData.editSpecificDate == 1"
          >
            <datepicker
              v-model="formData.editStartDate"
              v-validate="'required'"
              placeholder="Select Date"
              input-class="form-control bg-white"
              data-vv-name="fromDate"
              name="editStartDate"
              :format="format"
              :class="{ input: true, 'is-danger': errors.has('editStartDate') }"
            />
            <span v-show="errors.has('editStartDate')" class="help is-danger">{{
              errors.first("editStartDate")
            }}</span>
          </b-form-group>
          <b-form-group
            class="col"
            label="End Date"
            v-if="formData.editSpecificDate == 1"
          >
            <datepicker
              v-model="formData.editEndDate"
              v-validate="'required'"
              placeholder="Select Date"
              input-class="form-control bg-white"
              data-vv-name="fromDate"
              name="editEndDate"
              :format="format"
              :class="{ input: true, 'is-danger': errors.has('editEndDate') }"
            />
            <span v-show="errors.has('editEndDate')" class="help is-danger">{{
              errors.first("editEndDate")
            }}</span>
          </b-form-group>
        </b-row>
      </form>
    </b-modal>
    <b-modal
      id="modal-change"
      ref="changeModal"
      hide-header-close
      no-close-on-backdrop
      ok-title="Ok"
      @ok="handleDel"
    >
      <p class="my-4 text-center">Are you sure you want to delete?</p>
    </b-modal>
    <session-modal></session-modal>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";
import progressBar from "../../admin/progressBar.vue";
import sessionModal from "../../sessionModal.vue";
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";
export default {
  data() {
    return {
      delId: "",
      imgErr: "",
      editFile: "",
      msg: false,
      editID: "",
      format: "dd MMM",
      disabledDates: {
        from: new Date()
      },
      formData: {
        editName: "",
        editGroupImage: "",
        editStatus: "",
        editSpecificDate: "",
        editStartDate: "",
        editEndDate: ""
      },
      editProgress: {
        imagePercent: 0,
        imageUpload: false,
        imagecolours: {
          variant: "warning"
        }
      },
      columns: [
        {
          key: "id",
          label: "ID",
          class: "row1 text-center",
          sortable: true
        },
        {
          key: "name",
          label: "Group Name",
          class: "row2",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "firstname",
          label: "Created By",
          sortable: true,
          sortDirection: "desc",
          class: "row3"
        },
        {
          key: "status",
          label: "Status",
          sortable: true,
          sortDirection: "desc",
          class: "row3"
        },
        {
          key: "updatedOn",
          label: "Updated On",
          sortable: true,
          sortDirection: "desc",
          class: "row5 text-center"
        },
        { key: "action", class: "row6 text-center", label: "Actions" }
      ],
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: null,
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: []
    };
  },
  methods: {
    ...mapActions(["editPrayerGroup", "deletePrayerGroup"]),
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.editFun();
    },
    editPrayer(id, item) {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.formData.editName = item.name;
        this.formData.editStatus = item.status;
        this.formData.editGroupImage = item.groupImage;
        this.formData.editSpecificDate = item.specificDate;
        this.formData.editStartDate = item.startDate;
        this.formData.editEndDate = item.endDate;
        this.editID = id;
        this.$refs.editModal.show();
      }
    },
    viewPrayer(ID, thankGroup) {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        if (thankGroup === 0) {
          this.$router.push({ path: "/PrayerTitle/" + ID });
        } else {
          this.$router.push({ path: "/viewThanksPrayer/" });
        }
      }
    },
    editFun() {
      this.$validator.validateAll().then(result => {
        if (result) {
          // this.existinglang.rows[
          //   this.editlang_index
          // ].langType = this.formData.editLangType;
          // this.existinglang.rows[
          //   this.editlang_index
          // ].OriginalLangtext = this.formData.editOriginalLangtext;
          this.msg = true;
          let l = this.formData.editStartDate;
          let m = this.formData.editEndDate;
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
            userId: localStorage.getItem("userId"),
            id: this.editID,
            name: this.formData.editName,
            status: this.formData.editStatus,
            groupImage: this.formData.editGroupImage,
            specificDate: this.formData.editSpecificDate,
            startDate:
              this.formData.editSpecificDate === 1
                ? l.length == 6
                  ? l
                  : l.toString().substr(8, 2) + " " + l.toString().substr(4, 3)
                : null,
            endDate:
              this.formData.editSpecificDate === 1
                ? m.length == 6
                  ? m
                  : m.toString().substr(8, 2) + " " + m.toString().substr(4, 3)
                : null,
            deleteAccess: 0,
            editedAt: dateTime
          };
          this.editPrayerGroup(payload);
          var self = this;
          setTimeout(function() {
            self.msg = false;
            self.$refs.editModal.hide();
          }, 3000);
        }
      });
    },
    handleFileUpload(i) {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        var self = this;
        if (i === 1) {
          if (typeof this.$refs.file.files[0] !== "undefined") {
            this.imgErr = false;
            this.editFile = this.$refs.file.files[0];
            let formData = new FormData();
            formData.append("file", this.editFile);
            this.editProgress.imagecolours.variant = "warning";
            this.editProgress.imageUpload = true;
            axios
              .post(process.env.VUE_APP_DB_API + "upload/image", formData, {
                headers: {
                  "Content-Type": "multipart/form-data"
                },
                onUploadeditProgress: function(editProgressEvent) {
                  this.editProgress.imagePercent = 5;
                  setTimeout(function() {
                    self.editProgress.imagePercent = 50;
                    self.editProgress.imagecolours.variant = "info";
                  }, 100);
                }.bind(this)
              })
              .then(function(res) {
                if (typeof res.data.file === "string") {
                  self.editProgress.imagePercent = 100;
                  self.editProgress.imagecolours.variant = "success";
                  self.formData.editGroupImage = res.data.file;
                  self.file = "";
                  setTimeout(function() {
                    self.editProgress.imageUpload = false;
                    self.editProgress.imagePercent = 0;
                    self.editProgress.imagecolours.variant = "light";
                  }, 3000);
                }
              })
              .catch(function() {
                self.imgErr = "Check your internet connection";
                self.editProgress.imageUpload = false;
                console.log("FAILURE!!");
              });
          } else {
            self.editProgress.imageUpload = false;
            this.imgErr = "Image field must be an valid format";
          }
        }
      }
    },
    deleteRow(id) {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.delId = id;
        this.$bvModal.show("modal-change");
      }
    },
    handleRowDelete(id) {
      const payload = {
        groupId: this.delId
      };
      this.deletePrayerGroup(payload);
    },
    handleDel() {
      if (this.delId) {
        this.handleRowDelete(this.delId);
      }
    }
  },
  computed: {
    ...mapState(["prayerGroup"])
  },
  components: {
    progressBar,
    "session-modal": sessionModal,
    Datepicker
  }
};
</script>