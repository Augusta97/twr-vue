<template>
  <div class="col-sm-12 marginTop30 btmspace">
    <h5 class="col-sm-12">
      <b>MEDIA CLASSIFICATION</b>
    </h5>
    <edit-media-classification />
    <form class="marginTop30" @submit.prevent="createMediaClassy">
      <b-row>
        <div class="col-sm-3">
          <b-form-group label="Media Type" label-for="mediaType">
            <b-form-input
              v-model="formData.mediaClassifyName"
              v-validate="'required'"
              class="form-control"
              name="mediaClassifyName"
            />
            <span
              v-show="errors.has('mediaClassifyName')"
              class="help is-danger"
            >{{ errors.first('mediaClassifyName') }}</span>
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
import editMediaClassification from "../master/editMediaClassification.vue";
export default {
  data() {
    return {
      show: false,
      formData: {
        mediaClassifyName: ""
      }
    };
  },
  methods: {
    ...mapActions(["addMediaClassification"]),
    createMediaClassy() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          const payload = {
            data: {
              mediaClassifyName: this.formData.mediaClassifyName,
              status: 0
            }
          };
          this.addMediaClassification(payload);
          this.formData.mediaClassifyName = "";
        }
      });
    }
  },
  computed: {
    ...mapState(["mediaType"])
  },
  components: {
    "edit-media-classification": editMediaClassification
  }
};
</script>
