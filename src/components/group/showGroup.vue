<template>
  <div>
    <div class="marginTop30 d-flex vio-clr">
      <b-col sm="1" md="2">Group code</b-col>
      <b-col sm="2" md="2">Group Name</b-col>
      <b-col sm="2" md="2">Address</b-col>
      <b-col sm="1" md="2">Area</b-col>
      <b-col sm="2" md="2">Action</b-col>
    </div>
    <div class="marginTop30" v-for="(group, index) in groupList" :key="index">
      <div class="d-flex" v-if="group.deleted == 0">
        <b-col sm="1" md="2">{{group.id}}</b-col>
        <b-col sm="2" md="2">{{group.name}}</b-col>
        <b-col sm="2" md="2">{{group.address}}</b-col>
        <b-col sm="1" md="2">{{group.area}}</b-col>
        <b-col sm="1" md="2">
          <!-- <router-link :to="{path: `/editGroup/${group.id}`}"> -->
          <span @click="editGrp(group.id)" class="clrlink">Edit</span>
          <!-- </router-link> -->
          <font-awesome-icon
            v-b-tooltip.hover
            icon="trash"
            title="delete"
            style="color: #de0404;"
            class="marTop5 spacelr"
            @click="delGroup(group.id, index)"
          />
        </b-col>
      </div>
    </div>
    <b-modal
      id="modal-delete"
      ref="deleteModal"
      hide-header-close
      no-close-on-backdrop
      ok-title="Yes"
      cancel-title="No"
      @ok="handleDelete"
    >
      <p class="my-4 text-center">{{ delMsg }}</p>
    </b-modal>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      delId: "",
      delMsg: ""
    };
  },
  computed: {
    ...mapState(["groupList"])
  },
  methods: {
    ...mapActions(["deleteGroup"]),
    showModal() {
      this.$refs.deleteModal.show();
    },
    hideModal() {
      this.$refs.deleteModal.hide();
    },
    delGroup(id, inx) {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.delId = id;
        this.delMsg = "Are you sure wants to delete the Group ?";
        this.$refs.deleteModal.show();
      }
    },
    handleDelete() {
      if (this.delId) {
        this.deleGrp(this.delId);
      }
    },
    deleGrp(id) {
      this.groupList[id - 1].deleted = 1;
      const payload = {
        userId: localStorage.getItem("userId"),
        index: id - 1,
        groupId: id
      };
      this.deleteGroup(payload);
    },
    editGrp(ID) {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.$router.push({ path: "/editGroup/" + ID });
      }
    }
  }
};
</script>
