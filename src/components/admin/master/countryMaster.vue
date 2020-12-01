<template>
  <div class="col-sm-12 marginTop30 btmspace">
    <h5 class="col-sm-12">
      <b>COUNTRY</b>
    </h5>
    <edit-country-master />
    <form class="marginTop30" @submit.prevent="createCountry">
      <b-row>
        <div class="col-sm-3">
          <b-form-group label="Country Name" label-for="country">
            <b-form-input
              v-model="formData.countryName"
              v-validate="'required'"
              class="form-control"
              name="countryName"
            />
            <span
              v-show="errors.has('countryName')"
              class="help is-danger"
            >{{ errors.first('countryName') }}</span>
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
import editCountryMaster from "../master/editCountryMaster.vue";
export default {
  data() {
    return {
      show: false,
      formData: {
        countryName: ""
      }
    };
  },
  methods: {
    ...mapActions(["addCountry"]),
    createCountry() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          const payload = {
            data: {
              countryId: this.countryList.length + 1,
              countryName: this.formData.countryName,
              status: 0
            }
          };
          this.addCountry(payload);
          this.formData.countryName = "";
        }
      });
    }
  },
  computed: {
    ...mapState(["roles", "groupMember", "countryList"])
  },
  components: {
    "edit-country-master": editCountryMaster
  }
};
</script>
