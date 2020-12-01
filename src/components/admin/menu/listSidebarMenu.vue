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
              List Sidebar menu
            </li>
          </ol>
        </div>
        <b-container fluid class="bg-white">
          <b-row class="form-height">
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
                class="table-bordered viewtable-width"
                :items="allSidebarMenu.filter(x => x.status == 0)"
                :fields="columns"
                :current-page="currentPage"
                :per-page="perPage"
                :filter="filter"
                :filterIncludedFields="filterOn"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
              >
                <template v-slot:cell(action)="row">
                  <i
                    @click="viewSidebarMenu(row.item.ID)"
                    class="fa fa-eye action-icons eye-active"
                    style="width:20%;color:red;"
                    v-b-tooltip.hover
                    title="View"
                  ></i>
                  <i
                    @click="editSidebarMenu(row.item.ID)"
                    v-b-tooltip.hover
                    title="edit"
                    class="far fa-edit action-icons edit-active"
                  ></i>
                  <i
                    @click="deleteRow(row.item.engId)"
                    v-b-tooltip.hover
                    style="color: #de0404;"
                    title="delete"
                    class="fa fa-trash edit-active"
                  ></i>
                </template>
              </b-table>
              <div class="viewtable-width">
                <b-col md="6" class="my-1">
                  <b-pagination
                    v-model="currentPage"
                    :total-rows="
                      allSidebarMenu.filter(x => x.status == 0).length
                    "
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
    <b-modal
      id="modal-change"
      ref="changeModal"
      hide-header-close
      no-close-on-backdrop
      ok-title="Ok"
      @ok="handleOk"
    >
      <p class="my-4 text-center">Are you sure you want to delete?</p>
    </b-modal>
    <session-modal></session-modal>
  </b-container>
</template>
<script>
import { mapState, mapActions } from "vuex";
import sidebar from "../../admin/sidebar.vue";
import adminHeader from "../../admin/adminHeader.vue";
import sessionModal from "../../sessionModal.vue";
export default {
  data() {
    return {
      id: null,
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
          key: "name",
          label: "Name",
          class: "row2",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "langType",
          label: "Language",
          sortable: true,
          sortDirection: "desc",
          class: "row3"
        },
        {
          key: "parentMenu",
          label: "Menu Status",
          sortable: true,
          sortDirection: "desc",
          class: "row3"
        },
        {
          key: "menuOrder",
          label: "Menu Order",
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
  methods: {
    ...mapActions(["deleteSidebarMenu"]),
    deleteRow(id) {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.id = id;
        this.$bvModal.show("modal-change");
      }
    },
    handleRowDelete(id) {
      const payload = {
        id: this.id
      };
      this.deleteSidebarMenu(payload);
    },
    handleOk() {
      if (this.id) {
        this.handleRowDelete(this.id);
      }
    },
    editSidebarMenu(ID) {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.$router.push({ path: "/EditSidebarMenu/" + ID });
      }
    },
    viewSidebarMenu(ID) {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.$router.push({ path: "/EditSidebarMenu/" + ID + "/view" });
      }
    }
  },
  computed: {
    ...mapState(["allSidebarMenu"])
  }
};
</script>
