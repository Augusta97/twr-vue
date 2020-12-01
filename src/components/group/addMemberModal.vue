<template>
  <div>
    <b-modal
      id="assignMember"
      ref="assignMember"
      title="Add Group Member"
      no-close-on-backdrop
      centered
      @ok="handleMember"
    >
      <!-- {{assignedMembers}} -->
      <!-- {{users.filter(x.roleId==4 || x.roleId==3)}} -->
      <!-- <p
        v-show="createLeadMsg"
        class="invalid-cls"
      >
        {{ createLeadMsg }}
      </p>-->
      <form @submit.prevent="addMember">
        <b-row>
          <b-form-group label="Select Member" class="col-sm-6">
            <model-select
              v-model="item"
              v-validate="'required'"
              name="leadGroupId"
              :options="searchUsr"
              :selected-option="item"
              placeholder="Search name"
              @select="printSearchText"
            />
            <span v-show="errmessage == true" class="help is-danger"
              >This field is required</span
            >
          </b-form-group>
          <b-form-group label="Select Phoneno" class="col-sm-6">
            <model-select
              v-model="phone"
              v-validate="'required'"
              name="phoneno"
              :options="searchPhone"
              :selected-option="phone"
              placeholder="Select Phone No"
              @select="printPhoneNo"
            />
            <span v-show="incorrect == true" class="help is-danger"
              >This field is required</span
            >
          </b-form-group>
        </b-row>
        <p v-show="addedMsg" class="invalid-cls">Member added Successfully</p>
      </form>
    </b-modal>
    <b-modal
      id="modal-memberalreadyexist"
      title="Confirmation Message"
      ref="memberModal"
      no-close-on-backdrop
      ok-only
      ok-title="OK"
    >
      <p class="my-4 text-center">{{ existMsg }}</p>
    </b-modal>
    <b-modal
      title="Error Message"
      id="modal-memberincorrect"
      ref="incrtModal"
      no-close-on-backdrop
      ok-only
    >
      <p class="my-4">{{ incrtmes }}</p>
    </b-modal>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { ModelSelect } from "vue-search-select";
import "vue-search-select/dist/VueSearchSelect.css";
export default {
  data() {
    return {
      addedMsg: false,
      incorrect: false,
      errmessage: false,
      incrtmes: "",
      existMsg: "",
      searchUsr: [],
      searchPhone: [],
      udata: [],
      // formData: {
      //   roleType: ''
      // },
      item: {
        value: "",
        text: "",
      },
      phone: {
        value: "",
        text: "",
      },
    };
  },
  components: {
    ModelSelect,
  },
  computed: {
    ...mapState([
      "users",
      "groupList",
      "groupMember",
      "roles",
      "groupLeader",
      "assignedMembers",
    ]),
  },
  mounted() {
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
  },
  methods: {
    ...mapActions(["assignMemberRoleAndGroup", "assignUpdate"]),
    printSearchText(item) {
      this.item = item;
    },
    printPhoneNo(phone) {
      this.phone = phone;
    },
    handleMember(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.addMember();
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      // this.aftermemberModalOk();
    },
    addMember() {
      var userX =
        typeof this.assignedMembers.find(
          (o) =>
            o.firstname === this.item.value &&
            o.phone === this.phone.value &&
            o.deleted === 0
        ) != "undefined";
      if (
        this.item.value !== "" &&
        typeof this.item.value !== "undefined" &&
        this.phone.value !== "" &&
        typeof this.phone.value !== "undefined"
      ) {
        this.errmessage = false;
        this.incorrect = false;
        var finduser =
          typeof this.users.find(
            (x) =>
              x.firstname === this.item.value && x.phone === this.phone.value
          ) != "undefined";
        if (finduser) {
          if (userX) {
            this.existMsg =
              "Already " +
              this.item.text +
              " has assigned as a Member in " +
              this.groupList[this.$route.params.id - 1].name;
            this.$bvModal.show("modal-memberalreadyexist");
          } else {
            var userind = this.users.findIndex(
              (x) =>
                x.firstname === this.item.value && x.phone === this.phone.value
            );
            var members = [];
            members.push({ userId: this.users[userind].userId });
            const payload = {
              index: userind,
              leaderId: localStorage.getItem("userId"),
              groupId: this.$route.params.id,
              members,
            };
            // console.log(payload);
            this.assignMemberRoleAndGroup(payload);
            this.$nextTick(() => {
              this.$refs.memberModal.hide();
            });
            this.item = {
              value: "",
              text: "",
            };
            this.phone = {
              value: "",
              text: "",
            };
            this.addedMsg = true;
            var selfmsg = this;
            setTimeout(function () {
              selfmsg.addedMsg = false;
            }, 2000);
          }
        } else {
          this.incrtmes = "Check your phone number or User name";
          this.$bvModal.show("modal-memberincorrect");
          // this.$nextTick(() => {
          //   this.$refs.incrtModal.hide();
          // });
        }
      } else {
        this.errmessage = true;
        this.incorrect = true;
      }
    },
    aftermemberModalOk() {
      var filterAll = this.groupLeader
        .filter(
          (x) =>
            x.firstname === this.item.value &&
            x.phone === this.phone.value &&
            x.deleted === 0
        )
        .map((x) => x.assignId);
      var userind = this.users.findIndex(
        (x) => x.firstname === this.item.value && x.phone === this.phone.value
      );
      for (var i = 0; i < filterAll.length; i++) {
        this.groupLeader[filterAll[i] - 1].deleted = 1;
        var udate = [];
        const payload1 = {
          assignupdate: this.groupLeader[filterAll[i] - 1].id,
          index: userind,

          id: this.groupLeader[filterAll[i] - 1].id,
          roleId: 3,
          groupId: this.$route.params.id,
          // groupName: this.groupList[this.$route.params.id - 1].groupName,
          // firstname: this.item.text,
          // roleType: this.roles[this.formData.roleType -1].roleType,
          // phone: this.users[this.item.value - 1].phone,
          deleted: 1,
          user: udate.push(this.users[userind].userId),
        };
        this.assignUpdate(payload1);
      }
      const payload = {
        index: userind,
        data: {
          assignId: this.assignedMembers.length + 1,
          userId: this.users[userind].userId,
          roleId: 3,
          groupId: this.$route.params.id,
          groupName: this.groupList[this.$route.params.id - 1].groupName,
          firstname: this.item.value,
          lastname: this.users[userind].lastname,
          roleType: this.roles[2].roleType,
          phone: this.phone.value,
          profilePic: this.users[userind].profilePic,
          status: 0,
        },
      };
      this.assignRoleAndGroup(payload);
      this.$nextTick(() => {
        this.$refs.memberModal.hide();
      });
      this.item = {
        value: "",
        text: "",
      };
      this.phone = {
        value: "",
        text: "",
      };
      this.addedMsg = true;
      var self = this;
      setTimeout(function () {
        self.addedMsg = false;
      }, 5000);
      // this.$nextTick(() => {
      //   this.$refs.assignMember.hide()
      // })
    },
  },
};
</script>
