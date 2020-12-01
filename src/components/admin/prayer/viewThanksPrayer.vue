<template>
  <b-container fluid>
    <b-row class="form-height">
      <app-sidebar />
      <b-col md="10" class="mb-2 form-bg">
        <admin-header></admin-header>
        <!-- <div aria-label="breadcrumb" class="breadcrumpCss">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Thankful Prayers
            </li>
          </ol>
        </div> -->
        <div class="pb-2">
          <h5 class="pt-3">I'M Thankful for</h5>
        </div>
        <div class="common-bg bg-white">
          <div style="height:50%;">
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
                v-if="thankPrayer"
                class="table-bordered viewtable-width"
                :items="thankPrayer.result"
                :fields="columns"
                :current-page="currentPage"
                :per-page="perPage"
                :filter="filter"
                :filterIncludedFields="filterOn"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
              >
                <template v-slot:cell(createdAt)="row">{{
                  row.item.createdAt
                }}</template>
                <template v-slot:cell(answeredAt)="row">{{
                  row.item.answeredAt
                }}</template>
              </b-table>
              <div class="viewtable-width">
                <b-col md="6" class="my-1">
                  <b-pagination
                    v-model="currentPage"
                    :total-rows="thankPrayer.result.length"
                    :per-page="perPage"
                    class="my-0"
                  ></b-pagination>
                </b-col>
              </div>
            </b-col>
          </div>
        </div>
      </b-col>
    </b-row>
    <session-modal></session-modal>
  </b-container>
</template>
<script>
import sidebar from "../../admin/sidebar.vue";
import adminHeader from "../../admin/adminHeader.vue";
import { Validator } from "vee-validate";
import { mapState } from "vuex";
import sessionModal from "../../sessionModal.vue";
export default {
  data() {
    const dictionary = {
      en: {
        messages: {
          required: function() {
            return "This field is required";
          }
        }
      }
    };
    Validator.localize(dictionary);
    return {
      columns: [
        {
          key: "id",
          label: "ID",
          class: "row1 text-center",
          sortable: true
        },
        {
          key: "descriptionName",
          label: "Description Name",
          class: "row2",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "createdAt",
          label: "Published",
          sortable: true,
          sortDirection: "desc",
          class: "row5 text-center"
        },
        {
          key: "answeredAt",
          label: "Answered At",
          sortable: true,
          sortDirection: "desc",
          class: "row5 text-center"
        }
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
  components: {
    "session-modal": sessionModal,
    "app-sidebar": sidebar,
    "admin-header": adminHeader
  },
  computed: {
    ...mapState(["answeredPrayer", "thankPrayer"])
  }
};
</script>
