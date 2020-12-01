<template>
  <b-container fluid>
    <b-row class="form-height">
      <app-sidebar />
      <b-col md="10" class="mb-2 form-bg">
        <admin-header />
        <b-row class="marTop10">
          <b-col sm="4" class="text-left">
            <b-breadcrumb :items="breadcrum" class="text-left"></b-breadcrumb>
          </b-col>
          <b-col sm="3" class="text-right">
            <h2 class="grpHead">{{ groupList[$route.params.id - 1].name }}</h2>
          </b-col>
          <b-col sm="5" class="text-right">
            <b-button class="btn btn-info marRit10" @click="register"
              >Register</b-button
            >
            <b-button v-b-modal.assignMember class="btn btn-info marRit10"
              >Add Member</b-button
            >
            <b-button v-b-modal.assignLeader class="btn btn-info"
              >Add Leader</b-button
            >
          </b-col>
        </b-row>
        <div class="bg-linear">
          <b-col>
            <b-col class="text-center">
              <img :src="userImage" class="lead-image rounded-circle" />
              <h6 class="marTop5">
                <b>Group Leader</b>
              </h6>
            </b-col>
            <div
              v-for="(lead, index) in groupLeader.filter(
                (y) => y.groupId == $route.params.id && y.deleted == 0
              )"
              :key="index"
              class="text-center"
            >
              <b>{{ lead.firstname + " " + lead.lastname }}</b>
              <b class="marLeft20">{{ lead.phone }}</b>
              <b-col class="text-right absolBtn">
                <b-button
                  type="button"
                  class="btn btn-dif"
                  @click="delLeader(lead, index)"
                  >Remove</b-button
                >
                <b-button
                  type="button"
                  class="btn btn-dif"
                  @click="transferLeadClkModal(lead, index)"
                  >Transfer</b-button
                >
              </b-col>
            </div>
          </b-col>
        </div>
        <b-col style="background-color: #24bed5">
          <marquee>
            Meeting location: {{ groupList[$route.params.id - 1].address }},
            Time: {{ grpSrtTime }} - {{ grpEndTime }} , Day:
            {{ groupList[$route.params.id - 1].meetingDay }}.
          </marquee>
        </b-col>
        <b-tabs content-class="mt-3" class="marTop10 clrtab" lazy>
          <b-tab title="Group Members">
            <b-row>
              <div class="col-sm-9">
                <p class="marTop10">Group Members</p>
                <div v-for="(mem, index) in assignedMembers" :key="index" class>
                  <div
                    v-if="
                      mem.groupId == $route.params.id &&
                      mem.roleId == 3 &&
                      mem.deleted == 0
                    "
                    class="d-flex memberbg"
                  >
                    <img
                      v-if="mem.profilePic == ''"
                      class="memberPic rounded-circle"
                      :src="userImage"
                    />
                    <img
                      v-else
                      :src="mem.profilePic"
                      class="memberPic rounded-circle"
                    />
                    <span
                      v-if="mem.groupId == $route.params.id"
                      class="col-sm-2 marTop10"
                      >{{ mem.firstname }}</span
                    >
                    <font-awesome-icon
                      icon="phone"
                      class="marTop10 col-sm-1 litgreen"
                    />
                    <span class="marTop10 col-sm-2">{{ mem.phone }}</span>
                    <h6
                      class="col-sm-2 marTop10 clr-trash"
                      @click="delUser(mem.id, index, mem)"
                    >
                      Remove
                    </h6>
                    <b
                      class="txt-orange marTop10 col-sm-2"
                      @click="transfer(mem.id, index, mem)"
                    >
                      <span>Transfer</span>
                    </b>
                    <b-col sm="3" class="marTop10">
                      <router-link :to="{ path: `/userProfile/${mem.userId}` }">
                        <a class>View Profile</a>
                      </router-link>
                    </b-col>
                  </div>
                </div>
              </div>
              <div class="col-sm-6" />
            </b-row>
            <p v-if="transferMemMsg" class="invalid-cls">
              {{ transferMemMsg }}
            </p>
            <p v-if="transleadmsg" class="invalid-cls">{{ transleadmsg }}</p>
          </b-tab>
          <b-tab title="Attendance">
            <b-tabs content-class="mt-3" class="clrtab">
              <b-tab title="Add Attendance" active>
                <div class="col-sm-12 marginTop20">
                  <h5 class>Add New Attendance</h5>
                  <!-- {{paginatedItems}} -->
                  <add-attendance></add-attendance>
                </div>
              </b-tab>
              <b-tab title="View Attendance">
                <div class="col-sm-12 marginTop20" v-if="grpAttendance">
                  <h5 class>View Attendance</h5>
                  <!-- {{Object.keys(grpAttendance.data)}} -->
                  <view-attendance
                    :totalRow="Object.keys(grpAttendance.attendanceList).length"
                    :paging="grpAttendance.attendanceList"
                    :meth="parentMethod"
                  ></view-attendance>
                </div>
              </b-tab>
            </b-tabs>
          </b-tab>
          <b-tab title="Location">
            <group-location></group-location>
          </b-tab>
          <b-tab title="Upload">
            <b-row>
              <b-col sm="5">
                <group-upload></group-upload>
              </b-col>
              <b-col sm="7">
                <view-group-upload></view-group-upload>
              </b-col>
            </b-row>
          </b-tab>
        </b-tabs>
        <add-member-modal></add-member-modal>
        <add-leader-modal></add-leader-modal>
        <!-- Transfer User Modal -->
        <b-modal
          ref="transferMemberModal"
          no-close-on-backdrop
          centered
          title="Transfer Member"
          @ok="handleOk"
        >
          <b-form @submit.prevent="transferUser">
            <b-form-group label="Select Group">
              <model-select
                v-model="item"
                v-validate="'required'"
                name="groupId"
                :options="searchGrp"
                :selected-option="item"
                placeholder="placeholder text"
                @select="printSearchText"
              />
              <span v-show="memErr" class="help is-danger"
                >This field is required</span
              >
            </b-form-group>
          </b-form>
        </b-modal>
        <!-- Transfer Leader Modal -->
        <b-modal
          ref="transferLeaderModal"
          centered
          title="Transfer Leader"
          @ok="handleLeaderOkBtn"
        >
          <p v-if="transfermsg" class="invalid-cls">{{ transfermsg }}</p>
          <b-form @submit.prevent="transLeader">
            <b-form-group label="Select Group">
              <model-select
                v-model="itemForLeader"
                v-validate="'required'"
                name="leadergrpid"
                :options="searchGrp"
                :selected-option="itemForLeader"
                placeholder="placeholder text"
                @select="searchGrpForLeader"
              />
              <span v-show="leadErr" class="help is-danger"
                >This field is required</span
              >
            </b-form-group>
          </b-form>
        </b-modal>
        <!-- Transfer Message Modal For Member -->
        <b-modal
          title="Confirmation Message"
          id="modal-change"
          ref="changeModal"
          hide-header-close
          no-close-on-backdrop
          ok-title="Ok"
          @ok="transferMemClk"
        >
          <p class="my-4">{{ changeMsg }}</p>
        </b-modal>
        <!-- Transfer Message Modal For Leader -->
        <b-modal
          title="Confirmation Message"
          ref="leadconfirmModal"
          no-close-on-backdrop
          ok-title="Ok"
          @ok="transferLeadClk"
        >
          <p class="my-4">{{ leadChangeMsg }}</p>
        </b-modal>
        <!-- Delete Message Modal For Leader -->
        <b-modal
          title="Confirmation Message"
          ref="deleteLeadModal"
          no-close-on-backdrop
          ok-title="Yes"
          cancel-title="No"
          @ok="handleLeadDelete"
        >
          <p class="my-4">{{ delMsg }}</p>
        </b-modal>
        <!-- Transfer Message Modal For Member -->
        <b-modal
          title="Confirmation Message"
          ref="deleteMemModal"
          no-close-on-backdrop
          ok-title="Yes"
          cancel-title="No"
          @ok="handleMemDelete"
        >
          <p class="my-4">{{ delMsg }}</p>
        </b-modal>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import sidebar from "../admin/sidebar.vue";
import adminHeader from "../admin/adminHeader.vue";
import addMemberModal from "../group/addMemberModal.vue";
import addLeaderModal from "../group/addLeaderModal.vue";
import addAttendance from "../group/addAttendance.vue";
import viewAttendance from "../group/viewAttendance.vue";
import groupLocation from "../group/groupLocation.vue";
import groupUpload from "../group/groupUpload.vue";
import viewGroupUpload from "../group/viewGroupUpload.vue";
import { mapActions, mapState } from "vuex";
import { ModelSelect } from "vue-search-select";
import "vue-search-select/dist/VueSearchSelect.css";
import { Validator } from "vee-validate";
// import {LocationPicker} from 'vue2-location-picker'
export default {
  components: {
    "app-sidebar": sidebar,
    "admin-header": adminHeader,
    ModelSelect,
    "add-member-modal": addMemberModal,
    "add-leader-modal": addLeaderModal,
    "add-attendance": addAttendance,
    "group-location": groupLocation,
    "group-upload": groupUpload,
    "view-group-upload": viewGroupUpload,
    "view-attendance": viewAttendance,
  },
  data() {
    const dictionary = {
      en: {
        messages: {
          required: function () {
            return "This field is required";
          },
          numeric: function () {
            return "Only accept digits";
          },
          min: function () {
            return "This field is required";
          },
          max: function () {
            return "This field is required";
          },
        },
      },
    };
    Validator.localize(dictionary);
    return {
      grpSrtTime: "",
      grpEndTime: "",
      transferAssignIdMem: "",
      transferMemIndex: "",
      transferMemId: "",
      transferLeadItems: "",
      transferLeadId: "",
      changeMsg: "",
      leadChangeMsg: "",
      transferMemMsg: false,
      transleadmsg: false,
      transfermsg: "",
      memErr: false,
      leadErr: false,
      delLeadId: "",
      delLeadItem: "",
      delMemId: "",
      delMemItem: "",
      delMsg: false,
      searchGrp: [],
      userImage: require("@/assets/images/userImage.png"),
      item: {
        value: "",
        text: "",
      },
      itemForLeader: {
        value: "",
        text: "",
      },
      breadcrum: [
        {
          text: "Home",
        },
        {
          text: "Group Profile",
        },
      ],
      paginatedItems: [],
    };
  },
  computed: {
    ...mapState([
      "users",
      "groupList",
      "groupMember",
      "roles",
      "groupLeader",
      "assignedMembers",
      "grpAttendance",
    ]),
  },
  mounted() {
    var SearchGroup = this.groupList.filter(
      (x) => x.id != this.$route.params.id
    );
    SearchGroup = SearchGroup.map(function (x) {
      return { value: x.id, text: x.name };
    });
    this.searchGrp = SearchGroup;
  },
  created() {
    var gs = this.groupList[this.$route.params.id - 1].startTime;
    var ge = this.groupList[this.$route.params.id - 1].endTime;
    this.grpSrtTime = JSON.parse(gs).HH + ":" + JSON.parse(gs).mm;
    this.grpEndTime = JSON.parse(ge).HH + ":" + JSON.parse(ge).mm;
  },
  methods: {
    ...mapActions([
      "transferMember",
      "deleteUser",
      "deleteLeader",
      "transferLeader",
    ]),
    register() {
      this.$router.push({ path: "/userRegistration" });
    },
    printSearchText(item) {
      this.item = item;
    },
    searchGrpForLeader(itemForLeader) {
      this.itemForLeader = itemForLeader;
    },
    transfer(id, inx, items) {
      this.transferAssignIdMem = id;
      this.transferMemIndex = inx;
      this.transferMemId = items.userId;
      this.$refs.transferMemberModal.show();
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      if (this.item.value !== "" && typeof this.item.value !== "undefined") {
        this.memErr = false;
        if (this.transferAssignIdMem) {
          this.changeMsg = "Are you sure wants to transfer the User?";
          this.$refs.changeModal.show();
        }
      } else {
        this.memErr = true;
      }
    },
    transferMemClk() {
      if (this.transferAssignIdMem) {
        this.transferUser(
          this.transferAssignIdMem,
          this.transferMemIndex,
          this.transferMemId
        );
      }
    },
    transferUser(id, inx, usrId) {
      var members = [];
      members.push({ userId: usrId });
      const payload = {
        groupId: this.$route.params.id,
        toGroup: this.item.value,
        leaderId: localStorage.getItem("userId"),
        members,
      };
      this.transferMember(payload);
      this.$nextTick(() => {
        this.$refs.transferMemberModal.hide();
      });
      this.transferMemMsg = true;
      this.transferMemMsg = "Transferred Successfully";
      var self = this;
      setTimeout(function () {
        self.transferMemMsg = false;
      }, 5000);
      this.item = {
        value: "",
        text: "",
      };
    },
    transferLeadClkModal(itm, index) {
      this.transferLeadItems = itm;
      this.transferLeadId = itm.userId;
      this.$refs.transferLeaderModal.show();
    },
    handleLeaderOkBtn(bvModalEvt) {
      bvModalEvt.preventDefault();
      if (
        this.itemForLeader.value !== "" &&
        typeof this.itemForLeader.value !== "undefined"
      ) {
        this.leadErr = false;
        if (
          typeof this.groupLeader.find(
            (o) =>
              parseInt(o.groupId) == this.itemForLeader.value && o.deleted == 0
          ) == "undefined"
        ) {
          if (this.transferLeadId) {
            this.leadChangeMsg = "Are you sure wants to transfer the Leader?";
            this.$refs.leadconfirmModal.show();
          }
        } else {
          this.transfermsg = this.itemForLeader.text + " already has a leader";
          var transSelf = this;
          setTimeout(function () {
            transSelf.transfermsg = false;
          }, 5000);
        }
      } else {
        this.leadErr = true;
      }
    },
    transferLeadClk() {
      if (this.transferLeadId) {
        this.transLeader(this.transferLeadItems, this.transferLeadId);
      }
    },
    transLeader(items, usrId) {
      const payload = {
        addedby: localStorage.getItem("userId"),
        id: items.id,
        groupId: items.groupId,
        toGroup: this.itemForLeader.value,
        userId: usrId,
      };
      this.transferLeader(payload);
      this.transleadmsg = true;
      this.transleadmsg = "Transferred Successfully";
      var self = this;
      setTimeout(function () {
        self.transleadmsg = false;
      }, 5000);
      this.itemForLeader = {
        value: "",
        text: "",
      };
      this.transferLeadItems = "";
      this.transferLeadId = "";
    },
    delLeader(itm, inx) {
      this.delLeadId = itm.userId;
      this.delLeadItem = itm;
      this.delMsg = "Are you sure wants to remove ?";
      this.$refs.deleteLeadModal.show();
    },
    handleLeadDelete() {
      if (this.delLeadId) {
        this.deleLeader(this.delLeadId, this.delLeadItem);
      }
    },
    deleLeader(userid, itm) {
      // var newUser = this.groupLeader.filter(
      //   x =>
      //     x.userId === itm.userId &&
      //     x.groupId === itm.groupId &&
      //     x.deleted === 0
      // ).length;
      // if (newUser > 0) {
      const payload = {
        userId: itm.userId,
        groupId: itm.groupId,
        deleted: 1,
      };
      this.deleteLeader(payload);
      // }
    },
    delUser(id, inx, itm) {
      this.delMemId = id;
      this.delMemItem = itm;
      this.delMsg = "Are you sure wants to remove ?";
      this.$refs.deleteMemModal.show();
    },
    handleMemDelete() {
      if (this.delMemId) {
        this.deleUser(this.delMemId, this.delMemItem);
      }
    },
    deleUser(id, itm) {
      var newUser = this.assignedMembers.filter(
        (x) =>
          x.userId === itm.userId &&
          x.groupId === itm.groupId &&
          x.deleted === 0
      ).length;
      if (newUser > 0) {
        var members = [];
        members.push({ userId: itm.userId });
        const payload = {
          leaderId: localStorage.getItem("userId"),
          groupId: itm.groupId,
          members,
        };
        this.deleteUser(payload);
        var SearchUser = this.users.filter((x) => x.roleId === 4);
        SearchUser = SearchUser.map(function (x) {
          return { value: x.firstname, text: x.firstname };
        });
        this.searchUsr = SearchUser;
        var SearchPhon = this.users.filter((x) => x.roleId === 4);
        SearchPhon = SearchPhon.map(function (x) {
          return { value: x.phone, text: x.phone };
        });
        this.searchPhone = SearchPhon;
      }
    },
  },
};
</script>
