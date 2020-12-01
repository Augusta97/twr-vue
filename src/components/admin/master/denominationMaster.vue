<template>
  <div class="col-sm-12 marginTop30 btmspace">
    <h5 class="col-sm-12">
      <b>Denomination</b>
    </h5>
    <edit-denomination-master />
    <form
      class="marginTop30"
      @submit.prevent="createDenomination"
    >
      <b-row>
        <div class="col-sm-3">
          <b-form-group
            label="Denomination Name"
            label-for="denominationName"
          >
            <b-form-input
              v-model="formData.denominationName"
              v-validate="'required'"
              class="form-control"
              name="denominationName"
            />
            <span
              v-show="errors.has('denominationName')"
              class="help is-danger"
            >
              {{ errors.first('denominationName') }}
            </span>
          </b-form-group>
        </div>
        <div class="col-sm-3 marginTop30">
          <button
            type="submit"
            class="btn btn-success"
          >
            Add
          </button>
        </div>
      </b-row>
    </form>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import editDenominationMaster from '../master/editDenominationMaster.vue'
export default {
  data () {
    return {
      show: false,
      formData: {
        denominationName: ''
      }
    }
  },
  methods: {
    ...mapActions(['addDenomination']),
    createDenomination () {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          const payload = {
            data: {
              denominationId: this.denominationList.length + 1,
              denominationName: this.formData.denominationName,
              status: 0
            }
          }
          this.addDenomination(payload)
          this.formData.denominationName = ''
        }
      })
    }
  },
  computed: {
    ...mapState(['roles', 'groupMember', 'denominationList'])
  },
  components: {
    'edit-denomination-master': editDenominationMaster
  }
}
</script>
