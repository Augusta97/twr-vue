<template>
  <div class="col-sm-12 btmspace">
    <h5 class="col-sm-12">
      <b>ROLE</b>
    </h5>
    <edit-role-master />
    <form
      class="marginTop30"
      @submit.prevent="createRole"
    >
      <b-row>
        <div class="col-sm-3">
          <b-form-group
            label="Role Type"
            label-for="role"
          >
            <b-form-input
              v-model="formData.roleType"
              v-validate="'required'"
              class="form-control"
              name="roleType"
            />
            <span
              v-show="errors.has('roleType')"
              class="help is-danger"
            >
              {{ errors.first('roleType') }}
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
import editRoleMaster from '../master/editRoleMaster.vue'
export default {
  components: {
    'edit-role-master': editRoleMaster
  },
  data () {
    return {
      show: false,
      formData: {
        roleType: ''
      }
    }
  },
  computed: {
    ...mapState(['roles', 'groupMember'])
  },
  methods: {
    ...mapActions(['addRole']),
    createRole () {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          const payload = {
            data: {
              roleId: this.roles.length + 1,
              roleType: this.formData.roleType,
              status: 0
            }
          }
          this.addRole(payload)
          this.formData.roleType = ''
        }
      })
    }
  }
}
</script>
