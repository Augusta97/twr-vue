<template>
  <div class="common-bg bg-white">
    <div style="height: 50%">
      <b-col md="10" class="mb-2">
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
          v-if="prayerDescription.result.length > 0"
          class="table-bordered viewtable-width"
          :items="prayerDescription.result"
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
              @click="editPrayer(row.item.id, row.item)"
              v-b-tooltip.hover
              title="edit"
              class="far fa-edit action-icons edit-active"
            ></i>
            <font-awesome-icon
              v-b-tooltip.hover
              icon="trash"
              title="delete"
              style="color: #de0404"
              class="marTop5"
              @click="deleteRow(row.item.id)"
            />
          </template>
        </b-table>
        <div class="viewtable-width">
          <b-col md="6" class="my-1">
            <b-pagination
              v-model="currentPage"
              :total-rows="prayerDescription.result.length"
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
      title="Edit Prayer Description"
      @ok="handleOk"
      no-close-on-backdrop
    >
      <form @submit.prevent="editFun">
        <p v-show="msg" class="invalid-cls">Data updated</p>
        <b-form-group label="Your Request" label-for="groupname-input">
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
        <b-form-group label="Status" label-for="editStatus">
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
        <b-form-checkbox
          id="checkbox-1"
          v-model="formData.answered"
          name="checkbox-1"
          value="0"
          unchecked-value="0"
          @change="confirmAnswered()"
          >Check if answered</b-form-checkbox
        >
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
    <b-modal
      id="modal-confirmation"
      ref="confirmationModal"
      hide-header-close
      no-close-on-backdrop
      ok-title="Yes"
      cancel-title="Cancel"
      @ok="handleConfirm"
    >
      <p class="my-4 text-center">
        Are you sure this prayer request got answered?
      </p>
    </b-modal>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      delId: "",
      msg: false,
      editID: "",
      formData: {
        editName: "",
        editStatus: "",
        answered: 0,
      },
      columns: [
        {
          key: "id",
          label: "ID",
          class: "row1 text-center",
          sortable: true,
        },
        {
          key: "name",
          label: "Description Name",
          class: "row2",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "status",
          label: "Status",
          sortable: true,
          sortDirection: "desc",
          class: "row5 text-center",
        },
        {
          key: "updatedOn",
          label: "Updated On",
          sortable: true,
          sortDirection: "desc",
          class: "row5 text-center",
        },
        { key: "action", class: "row6 text-center", label: "Actions" },
      ],
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: null,
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
    };
  },
  methods: {
    ...mapActions([
      "editPrayerDescription",
      "deletePrayerDescription",
      "answeredPrayer",
    ]),
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
        this.formData.answered = item.answered;
        this.editID = id;
        this.$refs.editModal.show();
      }
    },
    editFun() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          // this.existinglang.rows[
          //   this.editlang_index
          // ].langType = this.formData.editLangType;
          // this.existinglang.rows[
          //   this.editlang_index
          // ].OriginalLangtext = this.formData.editOriginalLangtext;
          this.msg = true;
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
            // titleId: this.$route.params.id,
            id: this.editID,
            name: this.formData.editName,
            status: this.formData.editStatus,
            deleteAccess: 0,
            editedAt: dateTime,
          };
          this.editPrayerDescription(payload);
          var self = this;
          setTimeout(function () {
            self.msg = false;
            self.$refs.editModal.hide();
          }, 5000);
        }
      });
    },
    deleteRow(id) {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.delId = id;
        this.$bvModal.show("modal-change");
      }
    },
    confirmAnswered() {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        alert(this.formData.answered);
        if (this.formData.answered == 1) {
          this.$bvModal.show("modal-confirmation");
        }
      }
    },
    handleConfirm() {
      alert(this.editID);
      const payload = {
        titleId: this.$route.params.id,
        descriptionId: this.editID,
      };
      this.answeredPrayer(payload);
      this.$bvModal.hide("modal-confirmation");
      this.$bvModal.hide("modal-change");
    },
    handleRowDelete(id) {
      const payload = {
        titleId: this.$route.params.id,
        descriptionId: this.delId,
      };
      this.deletePrayerDescription(payload);
    },
    handleDel() {
      if (this.delId) {
        this.handleRowDelete(this.delId);
      }
    },
  },
  computed: {
    ...mapState(["prayerDescription"]),
  },
};
</script>