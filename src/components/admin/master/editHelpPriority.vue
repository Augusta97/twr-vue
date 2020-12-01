<template>
  <div class="scroll-y">
    <div v-for="(priority, index) in priorityList" :key="index" class="marTop10">
      <div v-if="priority.status==0" class="d-flex">
        <div v-if="priority.id!=priorityClick" class="col-sm-1 col-md-2">{{ priority.priority }}</div>
        <div v-else class="col-sm-4">
          <form @submit.prevent="updatePriority">
            <div class="row col-sm-12">
              <b-form-input
                v-model="formData.editpriorityName"
                v-validate="'required'"
                name="editpriorityName"
                class="col-sm-8"
              />
              <div class="col-sm-2">
                <button type="submit" class="btn btn-success" @click="clkEditBtn">Edit</button>
              </div>
              <!-- <div class="col-sm-2"><button type="button" class="btn btn-danger" @click="delRole(role.role_id, index, role)">Delete</button></div> -->
            </div>
            <span
              v-show="errors.has('editpriorityName')"
              class="help is-danger"
            >{{ errors.first('editpriorityName') }}</span>
          </form>
        </div>
        <div v-if="priority.id!=priorityClick" class="spacelr">
          <font-awesome-icon
            v-b-tooltip.hover
            v-b-modal.modaledit
            icon="edit"
            title="edit"
            class="marTop5 clr-green"
            @click="editPriorityText(priority.id, index, priority)"
          />
        </div>
        <div v-if="priority.id!=priorityClick">
          <font-awesome-icon
            v-b-tooltip.hover
            icon="trash"
            title="delete"
            style="color: #de0404;"
            class="marTop5"
            @click="delPriority(priority.id, index)"
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
      show: false,
      priorityClick: "",
      formData: {
        editpriorityName: ""
      }
    };
  },
  computed: {
    ...mapState(["priorityList"])
  },
  methods: {
    ...mapActions(["editPriority", "deletePriority"]),
    editPriorityText(id, index, item) {
      this.show = true;
      this.priorityClick = id;
      this.formData.editpriorityName = item.priority;
      this.priorityId = id;
      this.index = index;
    },
    updatePriority() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.priorityList[
            this.index
          ].priority = this.formData.editpriorityName;
          const payload = {
            userId: localStorage.getItem("userId"),
            priorityId: this.priorityId,
            index: this.index,
            priorityName: this.formData.editpriorityName
          };
          this.editPriority(payload);
          this.priorityClick = "";
          // this.formData.editroleType = ''
        }
      });
    },
    delPriority(id, inx) {
      this.priorityList[inx].status = 1;
      const payload = {
        userId: localStorage.getItem("userId"),
        index: inx,
        data: {
          priorityId: id,
          status: 1
        }
      };
      this.deletePriority(payload);
    },
    clkEditBtn() {
      this.show = false;
    }
  }
};
</script>
