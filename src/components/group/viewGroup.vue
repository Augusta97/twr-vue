<template>
  <b-container fluid>
    <b-row class="form-height">
      <app-sidebar />
      <b-col md="10" class="mb-2 form-bg">
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
        <div class="col-sm-12">
          <form class="searchForm text-right">
            <input type="text" placeholder="Type here" class="inputSearch" />
            <!-- <span v-show="searchQuery" class="removeInput" @click="removeSearchQuery">+</span> -->
          </form>
        </div>
        <b-row>
          <b-col
            sm="6"
            lg="3"
            md="6"
            class="bgcards mt-2"
            v-for="(grp, index) in groupList.filter(x => x.deleted == 0)"
            :key="index"
          >
            <b-card class="cardTitle" :title="grp.name">
              <div class="bg-litash text-center">
                <b-img
                  thumbnail
                  fluid
                  :src="userImage"
                  class="grpuploadImg mt-2 mb-2"
                ></b-img>
              </div>
              <div class="mt-2">
                <span>{{ grp.area }}</span>
              </div>
              <b-row>
                <b-col lg="5">
                  <b>Leader:</b>
                </b-col>
                <div v-if="groupLeader.length > 0">
                  <b
                    v-for="(lead, inx) in groupLeader"
                    :key="inx"
                    style="color:green;"
                  >
                    <span v-if="lead.groupId == grp.id && lead.deleted == 0">{{
                      " " + lead.firstname
                    }}</span>
                  </b>
                </div>
              </b-row>
              <b-row>
                <b-col lg="5">
                  <b>Members:</b>
                  <!-- {{assignedMembers}} -->
                </b-col>
                <div v-if="assignedMembers.length > 0">
                  <span
                    v-for="(mem, inx) in assignedMembers.filter(
                      x => x.groupId == grp.id && x.deleted == 0
                    )"
                    :key="inx"
                  >
                    <span
                      v-if="
                        assignedMembers.filter(
                          x => x.groupId == grp.id && x.deleted == 0
                        ).length == 1
                      "
                      >{{ mem.firstname }}</span
                    >
                  </span>
                  <span
                    v-if="
                      assignedMembers.filter(
                        x => x.groupId == grp.id && x.deleted == 0
                      ).length > 1
                    "
                    v-b-modal.showMore
                    @click="
                      viewMore(
                        assignedMembers.filter(
                          x =>
                            x.groupId == grp.id &&
                            x.roleId == 3 &&
                            x.deleted == 0
                        )
                      )
                    "
                  >
                    {{
                      assignedMembers.filter(
                        x => x.groupId == grp.id && x.deleted == 0
                      )[0].firstname + " +"
                    }}
                    <b>{{
                      assignedMembers.filter(
                        x => x.groupId == grp.id && x.deleted == 0
                      ).length - 1
                    }}</b>
                  </span>
                </div>
              </b-row>
              <div>
                <!-- <b-button href="#" variant="success"> -->
                <font-awesome-icon
                  @click="viewGrpProfile(grp.id)"
                  v-b-tooltip.hover
                  icon="eye"
                  title="view group"
                  style="color: rgb(6, 161, 196);"
                  class="marTop5"
                  >View Profile</font-awesome-icon
                >
                <font-awesome-icon
                  v-b-tooltip.hover
                  icon="trash"
                  title="delete"
                  style="color: #de0404;"
                  class="marTop5"
                  @click="delGrp(grp.id, index)"
                />
                <!-- </b-button> -->
                <!-- <router-link :to="{path: `/groupProfile/${grp.groupId}`}">
                  <a class="">View Profile</a>
                </router-link>-->
              </div>
              <!-- <div>
                <font-awesome-icon
                  v-b-tooltip.hover
                  icon="trash"
                  title="delete"
                  style="color: #de0404;"
                  class="marTop5"
                  @click="delGrp(grp.groupId, index)"
                />
              </div>-->
            </b-card>
            <!-- <div class="textAlign">
              <h6 class="mt-2">{{file.text}}</h6>
            </div>
            <h6 class="mt-3"><b>Type: </b> {{file.type.charAt(0).toUpperCase() + file.type.slice(1)}}</h6>
            <h6><b>Description: </b> {{file.description}}</h6>
            <h6><b>Event Date: </b> {{file.eventDate.substr(8, 2) + '-' + file.eventDate.substr(5, 2) + '-' + file.eventDate.substr(0, 4)}}</h6>
            <h6>uploaded by <b>{{file.firstname+ ' ' + file.lastname}}</b></h6>
            <h6>from <b>{{file.groupName}}</b></h6>
            <b class="clr-trash" @click="delFiles(file.uploadId, index)">Delete</b>-->
          </b-col>
        </b-row>
        <!-- <div class="common-bg">
          <div class="d-flex bgyellow paddTop20">
            <b-col sm="1" md="2" />
            <b class="col-sm-1">Group name</b>
            <b class="col-sm-2">Area</b>
            <b class="col-sm-1 col-md-2">Leader name</b>
            <b class="col-sm-2 col-md-2">Members name</b>
          </div>
          <div
            v-for="(grp, index) in groupList"
            :key="index"
            class="bgyellow"
          >
            <div
              v-if="grp.status==0"
              class="d-flex"
            >
              <div class="col-sm-1 col-md-2">
                <img
                  :src="userImage"
                  class="user-image rounded-circle"
                  style="width:40%;"
                >
              </div>
              <div class="col-sm-1 marTopBot35">
                <p>{{ grp.groupName }}</p>
              </div>
              <div class="col-sm-2 marTopBot35">
                <span>{{ grp.area }}</span>
              </div>
              <div
                class="col-sm-1 col-sm-2 marTopBot35"
              >
                <b
                  v-for="(lead, inx) in assignedMembers"
                  :key="inx"
                  style="color:green;"
                ><span v-if="lead.groupId == grp.groupId && lead.roleId ==2 && lead.status ==0">{{ lead.firstname }}</span></b>
              </div>
              <div class="col-sm-1 marTopBot35">
                <b
                  v-for="(mem, inx) in assignedMembers"
                  :key="inx"
                  style="color:green;"
                ><h6 v-if="mem.groupId == grp.groupId && mem.roleId == 3 && mem.status ==0">{{ mem.firstname + ' ' }}</h6></b>
              </div>
              <div class="col-sm-1 marTopBot35">
                <router-link :to="{path: `/groupProfile/${grp.groupId}`}">
                  <a class="">View Profile</a>
                </router-link>
              </div>
              <div class="col-sm-1 marTopBot35">
                <font-awesome-icon
                  v-b-tooltip.hover
                  icon="trash"
                  title="delete"
                  style="color: #de0404;"
                  class="marTop5"
                  @click="delGrp(grp.groupId, index)"
                />
              </div>
            </div>
          </div>
        </div>-->
      </b-col>
    </b-row>
    <b-modal
      id="modal-delete"
      ref="deleteModal"
      title="Confirmation Message"
      no-close-on-backdrop
      ok-title="Yes"
      cancel-title="No"
      @ok="handleDelete"
    >
      <p class="my-4 text-center">{{ delMsg }}</p>
    </b-modal>
    <b-modal
      ref="viewMore"
      id="showMore"
      title="View More"
      ok-title="Cancel"
      ok-only
      no-hide-header-close
    >
      <p class="my-1" v-for="name in nameList" :key="name">{{ name }}</p>
    </b-modal>
    <session-modal></session-modal>
  </b-container>
</template>
<script>
import sidebar from "../admin/sidebar.vue";
import { mapState, mapActions } from "vuex";
import sessionModal from "../sessionModal.vue";
export default {
  components: {
    "app-sidebar": sidebar,
    "session-modal": sessionModal
  },
  data() {
    return {
      nameList: [],
      msg: "",
      delId: "",
      delIndex: "",
      delMsg: "",
      createLeadMsg: "",
      // searchUser: [],
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
      "groupLeader"
    ])
  },
  // mounted () {
  //   var SearchUser = this.users
  //   SearchUser = SearchUser.map(function (x) {
  //     return {'value': x.userId, 'text': x.firstname}
  //   })
  //   this.searchUser = SearchUser
  // },
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
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.assignToLeader();
    },
    assignToLeader() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          const roleLeaderIndex = this.roles.findIndex(
            r => r.roleType === "Leader"
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
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.delId = id;
        this.delIndex = inx;
        this.delMsg = "Are you sure wants to delete the Group ?";
        this.$refs.deleteModal.show();
      }
    },
    viewGrpProfile(ID) {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.$router.push({ path: "/groupProfile/" + ID });
      }
    },
    handleDelete() {
      if (this.delId) {
        this.delCallBack(this.delId, this.delIndex);
      }
    },
    delCallBack(id, inx) {
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
    },
    viewMore(name) {
      this.nameList = [];
      for (var x = 0; x < name.length; x++) {
        this.nameList.push(name[x].firstname);
        console.log(this.nameList);
      }
      this.$refs.viewMore.show();
    }
    // viewMore (name) {
    //   console.log(name)
    //   for (var x = 0; x < name.length; x++) {
    //     this.nameList.push(name[x].firstname)
    //     console.log(this.nameList)
    //   }
    // }
  }
};
</script>
