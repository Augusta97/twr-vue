<template>
  <div>
    <b-modal
      id="assignLeader"
      title="Assign Leader"
      no-close-on-backdrop
      centered
      @ok="handleLeader"
    >
      <form @submit.prevent="addLeader">
        <b-row>
          <b-form-group label="Select Leader" class="col-sm-6">
            <model-select
              v-model="item"
              v-validate="'required'"
              name="leadGroupId"
              :options="searchGrp"
              :selected-option="item"
              placeholder="placeholder text"
              @select="printSearchText"
            />
            <span v-show="errmessage" class="help is-danger"
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
        <p v-show="addedMsg" class="invalid-cls">Leader added Successfully</p>
        <!-- <b-form-group
          label="Select Role"
          label-for="role-name"
        >
          <b-form-select
            v-model="formData.roleType"
            v-validate="'required'"
            class="form-control"
            name="roleType"
          >
            <option
              disabled
              value=""
            >
              select
            </option>
            <option
              v-for="(role, index) in roles"
              :key="index"
              :value="role.role_id"
            >
              {{ role.roleType }}
            </option>
          </b-form-select>
          <span
            v-show="errors.has('roleType')"
            class="help is-danger"
          >
            {{ errors.first('roleType') }}
          </span>
        </b-form-group>-->
      </form>
    </b-modal>
    <b-modal
      id="modal-alreadyexist"
      title="Confirmation Message"
      ref="memberModal"
      no-close-on-backdrop
      ok-title="Ok"
    >
      <p class="my-4 text-center">{{ existMsg }}</p>
    </b-modal>
    <b-modal
      title="Alert Message"
      id="modal-change"
      ref="changeModal"
      no-close-on-backdrop
      ok-only
      ok-title="Ok"
      @ok="existLeaderModal"
    >
      <p class="my-4 text-center">{{ changeMsg }}</p>
    </b-modal>
    <b-modal
      title="Error Message"
      id="modal-incorrect"
      ref="incrtModal"
      no-close-on-backdrop
      ok-only
    >
      <p class="my-4 text-center">{{ incrtmes }}</p>
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
      changeMsg: "",
      existMsg: "",
      searchGrp: [],
      searchPhone: [],
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
      "roles",
      "assignedMembers",
      "groupLeader",
    ]),
  },
  mounted() {
    var SearchUser = this.users.filter((x) => x.roleId === 2 || x.roleId === 4);
    SearchUser = SearchUser.map(function (x) {
      return { value: x.firstname, text: x.firstname };
    });
    this.searchGrp = SearchUser;
    var SearchPhon = this.users.filter((x) => x.roleId === 2 || x.roleId === 4);
    SearchPhon = SearchPhon.map(function (x) {
      return { value: x.phone, text: x.phone };
    });
    this.searchPhone = SearchPhon;
  },
  methods: {
    ...mapActions(["assignLeaders", "assignUpdate"]),
    printSearchText(item) {
      this.item = item;
    },
    printPhoneNo(phone) {
      this.phone = phone;
    },
    handleLeader(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.addLeader();
    },
    addLeader() {
      var userX = this.groupLeader.filter(
        (o) => o.groupId == this.$route.params.id && o.deleted == 0
      ).length;
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
          if (userX > 0) {
            this.existMsg =
              "Already " +
              this.item.text +
              " has assigned as a Leader in " +
              this.groupList[this.$route.params.id - 1].name;
            this.$bvModal.show("modal-alreadyexist");
          } else {
            var userind = this.users.findIndex(
              (x) =>
                x.firstname === this.item.value && x.phone === this.phone.value
            );
            const payload = {
              addedby: localStorage.getItem("userId"),
              index: userind,
              roleId: 2,
              groupId: this.$route.params.id,
              deleted: 0,
              userId: this.users[userind].userId,
              firstname: this.users[userind].firstname,
              phone: this.users[userind].phone,
            };
            this.assignLeaders(payload);
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
          this.$refs.incrtModal.show();
        }
      } else {
        this.errmessage = true;
        this.incorrect = true;
      }
    },
    // afterModalOk () {
    //   // var m = this.assignedMembers.findIndex(y => y.groupId === this.$route.params.id && y.status === 0)
    //   var ind = this.users.findIndex(x => x.firstname === this.item.value && x.phone === this.phone.value)
    //   // this.assignedMembers[m].status = 1
    //   // const payload1 = {
    //   //   index: ind,
    //   //   assignupdate: this.assignedMembers[m].assignId,
    //   //   data: {
    //   //     assignId: this.assignedMembers[m].assignId,
    //   //     userId: this.users[ind].userId,
    //   //     roleId: 2,
    //   //     groupId: this.$route.params.id,
    //   //     // groupName: this.groupList[this.$route.params.id - 1].groupName,
    //   //     // firstname: this.item.text,
    //   //     // roleType: this.roles[this.formData.roleType -1].roleType,
    //   //     // phone: this.users[this.item.value - 1].phone,
    //   //     status: 1
    //   //   }
    //   // }
    //   // this.assignUpdate(payload1)
    //   const payload = {
    //     index: ind,
    //     data: {
    //       assignId: this.assignedMembers.length + 1,
    //       userId: this.users[ind].userId,
    //       roleId: 2,
    //       groupId: this.$route.params.id,
    //       groupName: this.groupList[this.$route.params.id - 1].groupName,
    //       firstname: this.users[ind].firstname,
    //       lastname: this.users[ind].lastname,
    //       roleType: this.roles[1].roleType,
    //       phone: this.phone.value,
    //       status: 0
    //     }
    //   }
    //   this.assignRoleAndGroup(payload)
    //   this.$nextTick(() => {
    //     this.$refs.leaderModal.hide()
    //   })
    //   this.item = {
    //     value: '',
    //     text: ''
    //   }
    //   this.phone = {
    //     value: '',
    //     text: ''
    //   }
    //   this.addedMsg = true
    //   var self = this
    //   setTimeout(function () {
    //     self.addedMsg = false
    //   }, 5000)
    // },
    existLeaderModal() {
      this.item = {
        value: "",
        text: "",
      };
      this.phone = {
        value: "",
        text: "",
      };
    },
  },
};
</script>
