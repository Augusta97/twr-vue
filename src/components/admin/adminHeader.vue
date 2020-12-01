<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark row adpg-menu">
      <div class="navbar-collapse collapse w-100 dual-collapse2 order-1 order-md-0">
        <div class="navbar-collapse collapse w-100 dual-collapse2 order-2 order-md-2 navbar-nav">
          <ul class="navbar-nav ml-auto">
            <!-- <span><a
            v-b-modal.changePass
            class="nav-linkad"
            >Change Password</a></span>-->
            <router-link
              :to="{ path: `/userRegistration/${userId}` }"
              active-class="active"
              tag="li"
            >
              <a class="nav-linkad">Register</a>
            </router-link>
            <span activeClass="active" tag="li">
              <a class="nav-linkad" @click="logout">Logout</a>
            </span>
          </ul>
        </div>
      </div>
    </nav>
    <changePassword />
  </div>
</template>
<script>
import changePassword from "../user/changePassword.vue";
export default {
  components: {
    changePassword
  },
  data() {
    return {
      userId: localStorage.getItem("userId")
    };
  },
  methods: {
    logout: function() {
      if (localStorage.getItem("userId") == null) {
        this.$router.push("/");
      } else {
        this.$store.dispatch("logout").then(() => {
          this.$router.push("/");
        });
      }
    }
  }
};
</script>
