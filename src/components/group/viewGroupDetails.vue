<template>
  <div class="d-flex">
    <app-sidebar />
    <div class="marleft9per">
      <div aria-label="breadcrumb" class="breadcrumpCss">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            User view
          </li>
        </ol>
      </div>
      <b-col sm="12">
        <b-form class="searchForm text-right">
          <input type="text" placeholder="Type here" class="inputSearch" />
          <!-- <span v-show="searchQuery" class="removeInput" @click="removeSearchQuery">+</span> -->
        </b-form>
      </b-col>
      <div class="common-bg">
        <div class="d-flex bgyellow paddTop20">
          <div class="col-sm-1" />
          <b class="col-sm-1">Group name</b>
          <b class="col-sm-2">Area</b>
          <b class="col-sm-1">Leader name</b>
          <b class="col-sm-2">Members name</b>
        </div>
        <div v-for="(grp, index) in groupList" :key="index" class="bgyellow">
          <div v-if="grp.status == 0" class="d-flex">
            <b-col sm="1">
              <img
                :src="userImage"
                class="user-image rounded-circle"
                style="width:45%;"
              />
            </b-col>
            <b-col sm="1" class="marTopBot35">
              <p>{{ grp.groupName }}</p>
            </b-col>
            <b-col sm="2" class="marTopBot35">
              <span>{{ grp.area }}</span>
            </b-col>
            <b-col sm="1" class="marTopBot35">
              <b
                v-for="(lead, inx) in assignedMembers"
                :key="inx"
                style="color:green;"
                ><span
                  v-if="
                    lead.groupId == grp.groupId &&
                      lead.roleId == 2 &&
                      lead.status == 0
                  "
                  >{{ lead.firstname }}</span
                ></b
              >
            </b-col>
            <b-col sm="1" class="marTopBot35">
              <b
                v-for="(mem, inx) in assignedMembers"
                :key="inx"
                style="color:green;"
                ><h6
                  v-if="
                    mem.groupId == grp.groupId &&
                      mem.roleId == 3 &&
                      mem.status == 0
                  "
                >
                  {{ mem.firstname + " " }}
                </h6></b
              >
            </b-col>
            <b-col sm="1" class="marTopBot35">
              <router-link :to="{ path: `/groupProfile/${grp.groupId}` }">
                <a class="">View Profile</a>
              </router-link>
            </b-col>
            <b-col sm="1" class="marTopBot35">
              <font-awesome-icon
                v-b-tooltip.hover
                icon="trash"
                title="delete"
                style="color: #de0404;"
                class="marTop5"
                @click="delGrp(grp.groupId, index)"
              />
            </b-col>
          </div>
        </div>
      </div>
      <b-modal id="addLeader" title="Assign Leader" centered @ok="handleOk">
        <b-form @submit.prevent="assignToLeader">
          <p v-show="msg" class="invalid-cls">
            {{ msg }}
          </p>
          <b-form-group label="Select Leader" label-for="grp-name">
            <model-select
              v-model="leader"
              v-validate="'required'"
              name="leaderId"
              :options="searchUser"
              :selected-option="leader"
              placeholder="placeholder text"
              @select="leaderSearchText"
            />
            <span v-show="errors.has('leaderId')" class="help is-danger">
              {{ errors.first("leaderId") }}
            </span>
          </b-form-group>
        </b-form>
      </b-modal>
      <b-modal id="addMember" title="Add Users" centered @ok="handleMembers">
        <p v-show="createLeadMsg" class="invalid-cls">
          {{ createLeadMsg }}
        </p>
        <b-form @submit.prevent="addGroupMember">
          <b-form-group label="Select Group">
            <model-select
              v-model="item"
              v-validate="'required'"
              name="userid"
              :options="searchUser"
              :selected-option="item"
              placeholder="placeholder text"
              @select="printSearchText"
            />
            <span v-show="errors.has('userid')" class="help is-danger">
              {{ errors.first("userid") }}
            </span>
          </b-form-group>
        </b-form>
      </b-modal>
    </div>
    <b-modal
      id="modal-alreadyexist"
      ok-only
      hide-header-close
      no-close-on-backdrop
    >
      <p class="my-4 text-center">
        {{ existMsg }}
      </p>
    </b-modal>
  </div>
</template>
<script>
import sidebar from "../admin/sidebar.vue";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    "app-sidebar": sidebar
  },
  data() {
    return {
      msg: "",
      existMsg: "",
      createLeadMsg: "",
      searchUser: [],
      searchmem: "",
      userImage: require("@/assets/images/group.png"),
      formData: {
        leaderId: ""
      },
      item: {
        value: "",
        text: ""
      },
      leader: {
        value: "",
        text: ""
      }
    };
  },
  computed: {
    ...mapState([
      "users",
      "groupList",
      "assignedMembers",
      "roles",
      "allLeaders"
    ]),
    grpMems() {
      return this.groupMember.filter(gpmem => gpmem.userId == this.id);
    }
  },
  mounted() {
    var SearchUser = this.users;
    SearchUser = SearchUser.map(function(x) {
      return { value: x.userId, text: x.firstname };
    });
    this.searchUser = SearchUser;
  },
  methods: {
    ...mapActions(["addToGrpBasic", "assignLeaders", "deleteGroup"]),
    printSearchText(item) {
      this.item = item;
    },
    leaderSearchText(leader) {
      this.leader = leader;
    },
    assignLeadThroughGrp(id, inx) {
      this.groupId = id;
      this.grpIndex = inx;
      // this.handleOk()
    },
    addMembers(id, index) {
      this.grp_id = id;
      this.grp_index = index;
      // this.handleOk()
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.assignToLeader();
    },
    handleMembers(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.addGroupMember();
    },
    addGroupMember() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          const payload = {
            data: {
              firstname: this.item.text,
              userId: this.item.value,
              groupId: this.grp_id,
              groupName: this.groupList[this.grp_index].groupName
            }
          };
          this.addToGrpBasic(payload);
          // this.mountMethod()
          this.msg =
            "User ID: " +
            this.item.value +
            " added to " +
            this.groupList[this.grp_index].groupName;
          var self = this;
          setTimeout(function() {
            self.msg = false;
          }, 5000);
          this.item = "";
        }
      });
    },
    assignToLeader() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          const roleLeaderIndex = this.roles.findIndex(
            r => r.roleType == "Leader"
          );
          const payload = {
            userId: this.leader.value,
            index: this.leader.value - 1,
            data: {
              firstname: this.users[this.leader.value - 1].firstname,
              lastname: this.users[this.leader.value - 1].lastname,
              userId: this.leader.value,
              groupId: this.groupId,
              roleId: this.roles[roleLeaderIndex].roleId,
              roleType: this.roles[roleLeaderIndex].roleType,
              groupName: this.groupList[this.grpIndex].groupName
            }
          };
          this.assignLeaders(payload);
          // this.mountMethod()
          this.msg =
            this.users[this.leader.value - 1].firstname +
            " assigned as a leader for " +
            this.groupList[this.grpIndex].groupName;
          var self = this;
          setTimeout(function() {
            self.msg = false;
          }, 5000);
          this.leader = {
            value: "",
            text: ""
          };
        }
      });
    },
    delGrp(id, inx) {
      this.groupList[inx].status = 1;
      const payload = {
        userId: localStorage.getItem("userId"),
        index: inx,
        data: {
          groupId: id,
          status: 1
        }
      };
      this.deleteGroup(payload);
    }
  }
};
</script>