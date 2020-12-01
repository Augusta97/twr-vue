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
              Manage Testimony
            </li>
          </ol>
        </div>
        <b-container fluid class="bg-white">
          <b-row class="form-height">
            <b-col md="10" class="mb-2">
              <b-row class="phasetable-space py-2">
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
                :items="testimonyList"
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
                <template v-slot:cell(action)="row">
                  <i
                    class="fa fa-eye action-icons eye-active"
                    style="width:20%;color:blue;"
                    @click="viewModal(row.item, row.index, $event.target)"
                    v-b-tooltip.hover
                    title="View"
                  ></i>
                  <i
                    class="fa fa-trash eye-active"
                    style="color: #de0404;"
                    @click="deleteRow(row.item.ID)"
                    v-b-tooltip.hover
                    title="Delete"
                  ></i>
                </template>
              </b-table>
              <div class="viewtable-width">
                <b-col md="6" class="my-1">
                  <b-pagination
                    v-model="currentPage"
                    :total-rows="testimonyList.length"
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
      ref="testimonyModal"
      no-close-on-backdrop
      centered
      hide-header-close
      ok-only
      ok-title="Close"
    >
      <b-col>
        <h4>
          <b>Testimony by</b>
          {{ testimonyName }}
        </h4>
      </b-col>
      <b-row class="mt-5">
        <!-- <b-img :src="testimonyList[testimonyInd].profilePic"></b-img> -->
        <b-col sm="1"></b-col>
        <b-col sm="9">
          <p v-if="testimonytext != null">{{ testimonytext }}</p>
          <h6 class="mt-3" v-if="testimonyAudio != null">Uploaded as Audio</h6>
          <b-embed
            type="audio"
            v-if="testimonyAudio != null"
            controls
            class="audiocls bg-iavt bgcards mt-2"
          >
            <source :src="testimonyAudio" type="audio/webm" />
            <source :src="testimonyAudio" type="audio/mp3" />
          </b-embed>
          <h6 class="mt-3" v-if="testimonyVideo != null">Uploaded as Video</h6>
          <b-embed
            type="video"
            v-if="testimonyVideo != null"
            controls
            class="audiocls bg-iavt bgcards mt-2"
          >
            <source :src="testimonyVideo" type="video/webm" />
            <source :src="testimonyVideo" type="video/mp4" />
          </b-embed>
        </b-col>
      </b-row>
    </b-modal>
  </b-container>
</template>
<script>
import sidebar from "../admin/sidebar.vue";
import adminHeader from "../admin/adminHeader.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      testimonyInd: "",
      testimonyVideo: "",
      testimonyAudio: "",
      testimonytext: "",
      testimonyName: "",
      columns: [
        {
          key: "ID",
          label: "S.NO",
          class: "row1 text-center",
          sortable: true
        },
        {
          key: "firstname",
          label: "First name",
          class: "row2",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "lastname",
          label: "Last name",
          class: "row2",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "createdAt",
          label: "Date Added",
          sortable: true,
          sortDirection: "desc",
          class: "row5 text-center"
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
    "admin-header": adminHeader
  },
  computed: {
    ...mapState(["testimonyList"])
  },
  methods: {
    viewModal(id, inx, item) {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.testimonyInd = inx;
        this.testimonyVideo = this.testimonyList[inx].testimonyVideo;
        this.testimonyAudio = this.testimonyList[inx].testimonyAudio;
        this.testimonytext = this.testimonyList[inx].testimonytext;
        this.testimonyName =
          this.testimonyList[inx].firstname +
          " " +
          this.testimonyList[inx].lastname;
        // this.delAdminIndex = inx;
        // this.delAdminItem = item;
        // this.delMsg = this.messages.commondelete;
        this.$refs.testimonyModal.show();
      }
    }
  }
};
</script>
