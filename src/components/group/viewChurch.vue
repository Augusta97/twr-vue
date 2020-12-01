<template>
  <div>
    <div class="marginTop30 d-flex vio-clr">
      <div class="col-sm-1 col-md-2">Church Id</div>
      <div class="col-sm-2 col-md-2">Church Name</div>
      <div class="col-sm-2 col-md-2">Denomination</div>
      <div class="col-sm-1 col-md-2">Contact No</div>
      <div class="col-sm-1 col-md-2">Signed</div>
      <div class="col-sm-2 col-md-2">Action</div>
    </div>
    <div class="marginTop30" v-for="(church, index) in churchList" :key="index">
      <div class="d-flex" v-if="church.status == 0">
        <div class="col-sm-1 col-md-2">{{church.churchId}}</div>
        <div class="col-sm-2 col-md-2">{{church.churchName}}</div>
        <div class="col-sm-2 col-md-2">{{church.denominationName}}</div>
        <div class="col-sm-1 col-md-2">{{church.contactNo}}</div>
        <div class="col-sm-1 col-md-2">{{church.signedStatus}}</div>
        <div class="col-sm-1 col-md-2">
          <span @click="updateClk(church.churchId)" class="clrlink">Edit</span>
          <font-awesome-icon
            v-b-tooltip.hover
            icon="trash"
            title="delete"
            style="color: #de0404;"
            class="marTop5 spacelr"
            @click="delChurch(church.churchId, index)"
          />
        </div>
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
      delIndex: "",
      delMsg: ""
    };
  },
  computed: {
    ...mapState(["churchList"])
  },
  methods: {
    ...mapActions(["deleteChurch"]),
    delChurch(id, inx) {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.delId = id;
        this.delIndex = inx;
        this.delMsg = "Are you sure wants to delete the Church ?";
        this.$refs.deleteModal.show();
      }
    },
    updateClk(ID) {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.$router.push({ path: "/editChurch/" + ID });
      }
    },
    handleDelete() {
      if (this.delId) {
        this.delCallBack(this.delId, this.delIndex);
      }
    },
    delCallBack(id, inx) {
      this.churchList[inx].status = 1;
      const payload = {
        userId: localStorage.getItem("userId"),
        index: inx,
        data: {
          churchId: id,
          status: 1
        }
      };
      this.deleteChurch(payload);
    }
  }
};
</script>
