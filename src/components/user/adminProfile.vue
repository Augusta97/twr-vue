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
            <li class="breadcrumb-item active" aria-current="page">User Profile</li>
          </ol>
        </div>
        <div class="common-bg" style="padding: 0px 0px 50px;">
          <b-col sm="12" class="d-flex userTopbg">
            <div class="col-sm-2">
              <img
                v-if="users[$route.params.id - 1].profilePic == null"
                class="user-profile img-thumbnail tick1"
                :src="userImage"
              />
              <img
                v-else
                :src="users[$route.params.id - 1].profilePic"
                class="user-profile img-thumbnail tick2"
              />
            </div>
            <h6 class="col-sm-3 absolBot0">{{fullname}}</h6>
          </b-col>
          <b-col class="text-right">
            <b-button
              class="btn btn-default edit-user absolBot10"
              type="button"
              @click="edit($route.params.id)"
            >
              <font-awesome-icon icon="edit" class="pink" />edit
            </b-button>
          </b-col>
        </div>
        <div class="d-flex">
          <div class="col-sm-6 profilebg">
            <div class="paddTopBot10">
              <h5 class="text-right">Personal Info</h5>
            </div>
            <div class="d-flex bg-blue paddTopBot10">
              <b class="col-sm-6">First name</b>
              <b-col sm="6">{{ users[$route.params.id - 1].firstname }}</b-col>
            </div>
            <div class="d-flex paddTopBot10">
              <b class="col-sm-6">Last name</b>
              <b-col sm="6">{{ users[$route.params.id - 1].lastname }}</b-col>
            </div>
            <div class="d-flex bg-blue paddTopBot10">
              <b class="col-sm-6">Gender</b>
              <b-col sm="6">{{ users[$route.params.id - 1].gender }}</b-col>
            </div>
            <div class="d-flex paddTopBot10">
              <b class="col-sm-6">Dob</b>
              <b-col sm="6">{{ users[$route.params.id - 1].dob }}</b-col>
            </div>
            <div class="d-flex paddTopBot10">
              <b class="col-sm-6">Phone</b>
              <b-col sm="6">{{ users[$route.params.id - 1].phone }}</b-col>
            </div>
            <div class="d-flex bg-blue paddTopBot10">
              <b class="col-sm-6">Email</b>
              <b-col sm="6">{{ users[$route.params.id - 1].email }}</b-col>
            </div>
            <div class="d-flex bg-blue paddTopBot10">
              <b class="col-sm-6">Address</b>
              <b-col sm="6">{{ users[$route.params.id - 1].address }}</b-col>
            </div>
            <div class="d-flex bg-blue paddTopBot10">
              <b class="col-sm-6">City</b>
              <b-col sm="6">{{ users[$route.params.id - 1].city }}</b-col>
            </div>
            <div class="d-flex paddTopBot10">
              <b class="col-sm-6">State</b>
              <b-col sm="6">{{ users[$route.params.id - 1].state }}</b-col>
            </div>
            <div class="d-flex bg-blue paddTopBot10">
              <b class="col-sm-6">Pincode</b>
              <b-col sm="6">{{ users[$route.params.id - 1].pincode }}</b-col>
            </div>
          </div>
          <!-- <div class="col-sm-6" v-if="users[$route.params.id - 1].roleId!=1">
            <user-tabs></user-tabs>
          </div>-->
        </div>
        <b-col sm="12" class="text-right marTop10">
          <b-button class="btn btn-success" @click="backBtn">Back</b-button>
        </b-col>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import sidebar from "../admin/sidebar.vue";
// import userTabs from "../user/userTabs.vue";
import { mapState } from "vuex";
export default {
  components: {
    "app-sidebar": sidebar
    // "user-tabs": userTabs
  },
  data() {
    return {
      userImage: require("@/assets/images/usericon.png"),
      selectedFile: null,
      imgsrc: ""
    };
  },
  methods: {
    edit(id) {
      this.$router.push({ path: "/editAdminProfile/" + id });
    },
    backBtn() {
      this.$router.push({ path: "/viewParticipants" });
    }
  },
  computed: {
    ...mapState(["users"]),
    fullname: function() {
      // `this` points to the vm instance
      return (
        this.users[this.$route.params.id - 1].firstname +
        " " +
        this.users[this.$route.params.id - 1].lastname
      );
    }
  }
};
</script>
