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
            <li class="breadcrumb-item active" aria-current="page">
              List General Settings
            </li>
          </ol>
        </div>
        <b-container fluid class="bg-white">
          <b-row class="form-height">
            <b-col md="10" class="mb-2 pt-2">
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
                :items="GeneralSettings.row"
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
                    @click="viewGeneralization(row.item.ID)"
                    class="fa fa-eye action-icons eye-active"
                    style="width:20%;color:red;"
                    v-b-tooltip.hover
                    title="View"
                  ></i>
                  <i
                    @click="editGeneralization(row.item.ID)"
                    v-b-tooltip.hover
                    title="edit"
                    class="far fa-edit action-icons edit-active"
                  ></i>
                </template>
              </b-table>
              <div class="viewtable-width">
                <b-col md="6" class="my-1">
                  <b-pagination
                    v-model="currentPage"
                    :total-rows="GeneralSettings.row.length"
                    :per-page="perPage"
                    class="my-0"
                  ></b-pagination>
                </b-col>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </b-col>
    </b-row>
    <session-modal></session-modal>
  </b-container>
</template>
<script>
import { mapState } from "vuex";
import sidebar from "../../admin/sidebar.vue";
import adminHeader from "../../admin/adminHeader.vue";
import sessionModal from "../../sessionModal.vue";
export default {
  data() {
    return {
      activeMenu: false,
      disable: false,
      params: {
        id: this.$route.params.id
      },
      setIndex: "",
      setItem: "",
      columns: [
        {
          key: "ID",
          label: "ID",
          class: "row1 text-center",
          sortable: true
        },
        {
          key: "appname",
          label: "App Name",
          class: "row2",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "updatedOn",
          label: "Updated On",
          sortable: true,
          sortDirection: "desc",
          class: "row3"
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
      filterOn: []
    };
  },
  components: {
    "app-sidebar": sidebar,
    "admin-header": adminHeader,
    "session-modal": sessionModal
  },
  computed: {
    ...mapState(["GeneralSettings"])
  },
  methods: {
    viewGeneralization(ID) {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.$router.push({ path: "/EditGeneralization/" + ID + "/view" });
      }
    },
    editGeneralization(ID) {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.$router.push({ path: "/EditGeneralization/" + ID });
      }
    }
  }
};
</script>
