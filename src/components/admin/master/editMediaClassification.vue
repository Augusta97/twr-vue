<template>
  <div class="scroll-y">
    <div v-for="(media, index) in mediaType" :key="index" class="marTop10">
      <div v-if="media.status==0" class="d-flex">
        <div
          v-if="media.mediaClassifyId!=mediaClick"
          class="col-sm-1 col-md-2"
        >{{ media.mediaClassifyName }}</div>
        <div v-else class="col-sm-4">
          <form @submit.prevent="updateMediaClassify">
            <div class="row col-sm-12">
              <b-form-input
                v-model="formData.editMediaClassifyName"
                v-validate="'required'"
                name="editMediaClassifyName"
                class="col-sm-8"
              />
              <div class="col-sm-2">
                <button type="submit" class="btn btn-success" @click="clkEditBtn">Edit</button>
              </div>
              <!-- <div class="col-sm-2"><button type="button" class="btn btn-danger" @click="delRole(role.role_id, index, role)">Delete</button></div> -->
            </div>
            <span
              v-show="errors.has('editMediaClassifyName')"
              class="help is-danger"
            >{{ errors.first('editMediaClassifyName') }}</span>
          </form>
        </div>
        <div v-if="media.mediaClassifyId!=mediaClick" class="spacelr">
          <font-awesome-icon
            v-b-tooltip.hover
            v-b-modal.modaledit
            icon="edit"
            title="edit"
            class="marTop5 clr-green"
            @click="editMediaClassifyText(media.mediaClassifyId, index, media)"
          />
        </div>
        <div v-if="media.mediaClassifyId!=mediaClick">
          <font-awesome-icon
            v-b-tooltip.hover
            icon="trash"
            title="delete"
            style="color: #de0404;"
            class="marTop5"
            @click="delMediaClassify(media.mediaClassifyId, index)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      mId: "",
      index: "",
      show: false,
      mediaClick: "",
      formData: {
        editMediaClassifyName: ""
      }
    };
  },
  computed: {
    ...mapState(["mediaType"])
  },
  methods: {
    ...mapActions(["editMediaClassification", "deleteMediaClassification"]),
    editMediaClassifyText(id, index, item) {
      this.show = true;
      this.mediaClick = id;
      this.formData.editMediaClassifyName = item.mediaClassifyName;
      this.mId = id;
      this.index = index;
    },
    updateMediaClassify() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          // this.mediaType[
          //   this.index
          // ].mediaClassifyName = this.formData.editMediaClassifyName;
          const payload = {
            userId: localStorage.getItem("userId"),
            mediaClassifyId: this.mId,
            index: this.index,
            mediaClassifyName: this.formData.editMediaClassifyName
          };
          this.editMediaClassification(payload);
          this.mediaClick = "";
          // this.formData.editroleType = ''
        }
      });
    },
    delMediaClassify(id, inx) {
      this.mediaType[inx].status = 1;
      const payload = {
        userId: localStorage.getItem("userId"),
        index: inx,
        mediaClassifyId: id,
        status: 1
      };
      this.deleteMediaClassification(payload);
    },
    clkEditBtn() {
      this.show = false;
    }
  }
};
</script>
