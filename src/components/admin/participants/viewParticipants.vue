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
              View Participants
            </li>
          </ol>
        </div>
        <div role="tablist">
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block href="#" v-b-toggle.accordion-1 variant="success"
                >View Admin & Super Admin</b-button
              >
            </b-card-header>
            <b-collapse
              id="accordion-1"
              visible
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <b-card-text>
                  <div class="d-flex">
                    <b-col sm="3">
                      <b-form-checkbox
                        v-model="checked"
                        name="check-button"
                        switch
                      >
                        <span v-if="checked">Public</span>
                        <span v-else>Friends Only</span>
                      </b-form-checkbox>
                      <!-- <ToggleButton
                        :value="true"
                        @change="changeStatus(checkStatus)"
                        :color="{checked: '#28a745', unchecked: '#5c749a'}"
                        :labels="{checked: 'Private', unchecked: 'Public'}"
                        width="90"
                        height="30"
                        font-size="15"
                        v-model="checkStatus"
                      />-->
                      <!-- <ToggleButton :value="false" color="#82C7EB" :sync="true" :labels="true" /> -->
                      <!-- <ToggleButton v-model="checkStatus"></ToggleButton> -->
                    </b-col>
                    <b-col sm="6"></b-col>
                    <b-col sm="3">
                      <b-form-input
                        type="search"
                        placeholder="Search by name"
                        class="inputSearch"
                        v-model="search"
                      />
                    </b-col>
                  </div>
                  <b-row class="my-4">
                    <b-card
                      no-body
                      class="overflow-hidden col-lg-3 mt-3 no-border"
                      v-for="(superuser, index) in filteredListSuperUser.filter(
                        m => m.status === 0
                      )"
                      :key="index"
                    >
                      <b-row
                        no-gutters
                        class="userbg"
                        v-if="superuser.status == 0"
                      >
                        <b-col md="3" class="mt-2 mb-2 ml-3">
                          <b-card-img
                            v-if="superuser.profilePic == null"
                            :src="userImage"
                            class="rounded-circle"
                          ></b-card-img>
                          <b-card-img
                            v-else
                            :src="superuser.profilePic"
                            class="rounded-circle"
                          ></b-card-img>
                        </b-col>
                        <b-col md="8">
                          <b-card-body class="car-bdy">
                            <b-card-text>
                              <b-col>
                                <h5>
                                  <router-link
                                    :to="{
                                      path: `/adminProfile/${superuser.userId}`
                                    }"
                                  >
                                    <a
                                      class
                                      v-b-tooltip.hover
                                      title="View Profile"
                                      >{{ superuser.firstname }}</a
                                    >
                                  </router-link>
                                </h5>
                              </b-col>
                              <b-col>
                                <span>{{ superuser.roleType }}</span>
                              </b-col>
                              <div>
                                <font-awesome-icon
                                  v-b-tooltip.hover
                                  icon="trash"
                                  title="delete"
                                  style="color: #de0404;"
                                  class="marTop5 spacelr"
                                  @click="
                                    delSuperUserPersonalInfo(
                                      superuser.userId,
                                      index,
                                      superuser
                                    )
                                  "
                                />
                              </div>
                              <!-- <div>
                              <font-awesome-icon
                                v-b-tooltip.hover
                                icon="edit"
                                title="Change Role"
                                class="marTop5 spacelr text-success"
                                @click="changeRoleAdmin(user.userId, index, user)"
                              />
                              </div>-->
                            </b-card-text>
                          </b-card-body>
                        </b-col>
                      </b-row>
                    </b-card>
                  </b-row>
                </b-card-text>
                <b-card-text>
                  To
                  <code>
                    <router-link :to="{ path: `/userRegistration` }"
                      >Make Admin</router-link
                    >
                  </code>
                  click the link.
                </b-card-text>
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1 no-border">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block href="#" v-b-toggle.accordion-2 variant="success"
                >View All App Users</b-button
              >
            </b-card-header>
            <b-collapse
              id="accordion-2"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <b-card-text>
                  <div class="d-flex">
                    <b-col sm="3">
                      <b-form-checkbox
                        v-model="userStatus"
                        name="check-button"
                        switch
                      >
                        <span v-if="userStatus">Public</span>
                        <span v-else>Friends Only</span>
                      </b-form-checkbox>
                    </b-col>
                    <b-col sm="6"></b-col>
                    <b-col sm="3">
                      <b-form-input
                        type="search"
                        placeholder="Search by name"
                        class="inputSearch"
                        v-model="search"
                      />
                    </b-col>
                  </div>
                  <b-row class="my-4">
                    <b-card
                      no-body
                      class="overflow-hidden col-lg-3 mt-3 no-border"
                      v-for="(user, index) in filteredList"
                      :key="index"
                    >
                      <b-row no-gutters class="userbg">
                        <b-col md="3" class="mt-2 mb-2 ml-3">
                          <b-card-img
                            v-if="user.profilePic == null"
                            :src="userImage"
                            class="rounded-circle"
                          ></b-card-img>
                          <b-card-img
                            v-else
                            :src="user.profilePic"
                            class="rounded-circle"
                          ></b-card-img>
                        </b-col>
                        <b-col md="8">
                          <b-card-body class="car-bdy">
                            <b-card-text>
                              <b-col>
                                <h5>
                                  <router-link
                                    :to="{
                                      path: `/userProfile/${user.userId}`
                                    }"
                                  >
                                    <a
                                      class
                                      v-b-tooltip.hover
                                      title="View Profile"
                                      >{{ user.firstname }}</a
                                    >
                                  </router-link>
                                </h5>
                              </b-col>
                              <b-col v-if="user.roleId != 4">
                                <b
                                  v-for="(assignMem, indx) in assignedMembers"
                                  :key="indx"
                                >
                                  <h6
                                    v-if="
                                      assignMem.userId == user.userId &&
                                        assignMem.deleted == 0
                                    "
                                  >
                                    {{ assignMem.groupName }}
                                  </h6>
                                </b>
                              </b-col>
                              <b-col v-else-if="user.roleId == 4">
                                <b>
                                  <span>Not assigned</span>
                                </b>
                              </b-col>
                              <b-col>
                                <span>{{ user.roleType }}</span>
                              </b-col>
                              <div>
                                <font-awesome-icon
                                  v-b-tooltip.hover
                                  icon="trash"
                                  title="delete"
                                  style="color: #de0404;"
                                  class="marTop5 spacelr"
                                  @click="
                                    delUserPersonalInfo(
                                      user.userId,
                                      index,
                                      user
                                    )
                                  "
                                />
                              </div>
                              <!-- <div>
                              <font-awesome-icon
                                v-b-tooltip.hover
                                icon="edit"
                                title="Change Role"
                                class="marTop5 spacelr text-success"
                                @click="changeRoleAdmin(user.userId, index, user)"
                              />
                              </div>-->
                            </b-card-text>
                          </b-card-body>
                        </b-col>
                      </b-row>
                    </b-card>
                  </b-row>
                </b-card-text>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </b-col>
      <b-modal
        id="modal-alreadyexist"
        hide-header-close
        no-close-on-backdrop
        ok-only
      >
        <p class="my-4 text-center">{{ existMsg }}</p>
      </b-modal>
      <b-modal
        id="modal-delete"
        ref="deleteModal"
        no-close-on-backdrop
        ok-title="Yes"
        cancel-title="No"
        @ok="handleDelete"
      >
        <div class="text-center">
          <i class="fa fa-question-circle danger-tick"></i>
        </div>
        <p class="my-4 text-center">{{ delMsg }}</p>
      </b-modal>
    </b-row>
    <session-modal></session-modal>
  </b-container>
</template>
<script>
import sidebar from "../../admin/sidebar.vue";
import { mapState, mapActions } from "vuex";
import adminHeader from "../../admin/adminHeader.vue";
import sessionModal from "../../sessionModal.vue";
export default {
  components: {
    "app-sidebar": sidebar,
    adminHeader,
    "session-modal": sessionModal
  },
  data() {
    return {
      uId: "",
      userDetails: "",
      delId: "",
      delIndex: "",
      delItem: "",
      delMsg: "",
      delAdminId: "",
      delAdminIndex: "",
      delAdminItem: "",
      search: "",
      msg: "",
      existMsg: "",
      createLeadMsg: "",
      searchGrp: [],
      userImage: require("@/assets/images/usericon.png"),
      formData: {
        roleType: ""
      },
      item: {
        value: "",
        text: ""
      },
      grpLists: {
        value: "",
        text: ""
      },
      userStatus: false,
      checked: false
    };
  },
  computed: {
    ...mapState([
      "users",
      "groupList",
      "groupMember",
      "roles",
      "allLeaders",
      "assignedMembers",
      "roleId",
      "messages"
    ]),
    filteredList() {
      if (this.search !== "" && this.userStatus === false) {
        return this.users.filter(post => {
          return (
            post.firstname.toLowerCase().includes(this.search.toLowerCase()) &&
            post.published === 1 &&
            post.roleId !== 1 &&
            post.roleId !== 99 &&
            post.roleId !== 5
          );
        });
      } else if (this.search === "" && this.userStatus === false) {
        return this.users.filter(
          x =>
            x.published === 1 &&
            x.roleId !== 1 &&
            x.roleId !== 99 &&
            x.roleId !== 5
        );
      } else if (this.search !== "" && this.userStatus === true) {
        return this.users.filter(post => {
          return (
            post.firstname.toLowerCase().includes(this.search.toLowerCase()) &&
            post.published === 0 &&
            post.roleId !== 1 &&
            post.roleId !== 99 &&
            post.roleId !== 5
          );
        });
      } else {
        return this.users.filter(
          x =>
            x.published === 0 &&
            x.roleId !== 1 &&
            x.roleId !== 99 &&
            x.roleId !== 5
        );
      }
    },
    filteredListSuperUser() {
      if (this.search !== "" && this.checked === false) {
        return this.users.filter(post => {
          return (
            post.firstname.toLowerCase().includes(this.search.toLowerCase()) &&
            post.published === 1 &&
            (post.roleId === 1 || post.roleId === 99)
          );
        });
      } else if (this.search === "" && this.checked === false) {
        return this.users.filter(
          x => x.published === 1 && (x.roleId === 1 || x.roleId === 99)
        );
      } else if (this.search !== "" && this.checked === true) {
        return this.users.filter(post => {
          return (
            post.firstname.toLowerCase().includes(this.search.toLowerCase()) &&
            post.published === 0 &&
            (post.roleId === 1 || post.roleId === 99)
          );
        });
      } else {
        return this.users.filter(
          x => x.published === 0 && (x.roleId === 1 || x.roleId === 99)
        );
      }
    }
  },
  mounted() {
    var SearchGroup = this.groupList;
    SearchGroup = SearchGroup.map(function(x) {
      return { value: x.groupId, text: x.groupName };
    });
    this.searchGrp = SearchGroup;
  },
  methods: {
    ...mapActions(["deleteUsrPersonalInfo", "changeRoleByAdmin"]),
    delUserPersonalInfo(id, inx, item) {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.delId = id;
        this.delIndex = inx;
        this.delItem = item;
        this.delMsg = this.messages.commondelete;
        this.$refs.deleteModal.show();
      }
    },
    handleDelete() {
      if (
        this.delAdminId &&
        (this.delAdminItem.roleId === 1 || this.delAdminItem.roleId === 99)
      ) {
        this.delSuperUser(
          this.delAdminId,
          this.delAdminIndex,
          this.delAdminItem
        );
      } else if (
        this.delId &&
        this.delItem.roleId !== 1 &&
        this.delItem.roleId !== 99
      ) {
        this.delCallBack(this.delId, this.delIndex, this.delItem);
      }
    },
    delCallBack(id, inx, item) {
      this.users[inx].firstname = "Anonymous User";
      this.users[inx].lastname = "Not Available";
      this.users[inx].email = "Not Available";
      this.users[inx].phone = "1000000000";
      this.users[inx].gender = "Not Available";
      this.users[inx].roleId = item.roleId;
      this.users[inx].roleType = item.roleType;
      this.users[inx].dob = "1000-01-01";
      this.users[inx].address = "Not Available";
      this.users[inx].city = "Not Available";
      this.users[inx].state = "Not Available";
      this.users[inx].pincode = "000000";
      this.users[inx].profilePic = null;
      this.users[inx].status = 1;
      const payload = {
        index: inx,
        rolname: "usr",
        userId: id,
        firstname: "Anonymous User",
        lastname: "Not Available",
        email: "Not Available",
        phone: "1000000000",
        gender: "Not Available",
        roleId: item.roleId,
        roleType: item.roleType,
        dob: "1000-01-01",
        address: "Not Available",
        city: "Not Available",
        state: "Not Available",
        pincode: "000000",
        profilePic: null,
        status: 1
      };
      this.deleteUsrPersonalInfo(payload);
      this.delId = "";
      this.delIndex = "";
      this.delItem = "";
    },
    delSuperUserPersonalInfo(id, inx, item) {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.delAdminId = id;
        this.delAdminIndex = inx;
        this.delAdminItem = item;
        this.delMsg = this.messages.commondelete;
        this.$refs.deleteModal.show();
      }
    },
    delSuperUser(id, inx, item) {
      this.users[inx].firstname = "Anonymous User";
      this.users[inx].lastname = "Not Available";
      this.users[inx].email = "Not Available";
      this.users[inx].phone = "1000000000";
      this.users[inx].gender = "Not Available";
      this.users[inx].roleId = item.roleId;
      this.users[inx].roleType = item.roleType;
      this.users[inx].dob = "1000-01-01";
      this.users[inx].address = "Not Available";
      this.users[inx].city = "Not Available";
      this.users[inx].state = "Not Available";
      this.users[inx].pincode = "000000";
      this.users[inx].profilePic = null;
      this.users[inx].status = 1;
      const payload = {
        index: inx - 1,
        rolname: "adm",
        userId: id,
        firstname: "Anonymous User",
        lastname: "Not Available",
        email: "Not Available",
        phone: "1000000000",
        gender: "Not Available",
        roleId: item.roleId,
        roleType: item.roleType,
        dob: "1000-01-01",
        address: "Not Available",
        city: "Not Available",
        state: "Not Available",
        pincode: "000000",
        profilePic: null,
        status: 1
      };
      this.deleteUsrPersonalInfo(payload);
      this.delAdminId = "";
      this.delAdminIndex = "";
      this.delAdminItem = "";
    },
    mountMethod() {
      var SearchMember = this.groupMember.map(mem => mem.userId);
      this.searchmem = SearchMember;
    }
  }
};
</script>
