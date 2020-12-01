<template>
  <div class="col-sm-12 marginTop30 btmspace">
    <h5 class="col-sm-12">
      <b>Help Priority</b>
    </h5>
    <edit-help-priority />
    <form class="marginTop30" @submit.prevent="createPriority">
      <b-row>
        <div class="col-sm-3">
          <b-form-group label="Priority Name" label-for="priority">
            <b-form-input
              v-model="formData.priorityName"
              v-validate="'required'"
              class="form-control"
              name="priorityName"
            />
            <span
              v-show="errors.has('priorityName')"
              class="help is-danger"
            >{{ errors.first('priorityName') }}</span>
          </b-form-group>
        </div>
        <div class="col-sm-3 marginTop30">
          <button type="submit" class="btn btn-success">Add</button>
        </div>
      </b-row>
    </form>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import editHelpPriority from "../master/editHelpPriority.vue";
export default {
  data() {
    return {
      show: false,
      formData: {
        priorityName: ""
      }
    };
  },
  methods: {
    ...mapActions(["addHelpPriority"]),
    createPriority() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          const payload = {
            data: {
              priorityId: this.priorityList.length + 1,
              priorityName: this.formData.priorityName,
              status: 0
            }
          };
          this.addPriority(payload);
          this.formData.priorityName = "";
        }
      });
    }
  },
  computed: {
    ...mapState(["roles", "groupMember", "priorityList"])
  },
  components: {
    "edit-help-priority": editHelpPriority
  }
};
</script>
