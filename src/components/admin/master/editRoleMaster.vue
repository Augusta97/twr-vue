<template>
  <div class="scroll-y">
    <div
      v-for="(role, index) in roles"
      :key="index"
      class="marTop10"
    >
      <div
        v-if="role.status==0"
        class="d-flex"
      >
        <div
          v-if="role.roleId!=roleClick"
          class="col-sm-1 col-md-2"
        >
          {{ role.roleType }}
        </div>
        <div
          v-else
          class="col-sm-4"
        >
          <form @submit.prevent="updateRole()">
            <div class="row col-sm-12">
              <b-form-input
                v-model="formData.editroleType"
                v-validate="'required'"
                name="editroleType"
                class="col-sm-8"
              />
              <div class="col-sm-2">
                <button
                  type="submit"
                  class="btn btn-success"
                >
                  Edit
                </button>
              </div>
              <!-- <div class="col-sm-2"><button type="button" class="btn btn-danger" @click="delRole(role.role_id, index, role)">Delete</button></div> -->
            </div>
            <span
              v-show="errors.has('editroleType')"
              class="help is-danger"
            >
              {{ errors.first('editroleType') }}
            </span>
          </form>
        </div>
        <div
          v-if="role.roleId!=roleClick"
          class="spacelr"
        >
          <font-awesome-icon
            v-b-tooltip.hover
            v-b-modal.modaledit
            icon="edit"
            title="edit"
            class="marTop5 clr-green"
            @click="editRoleText(role.roleId, index, role)"
          />
        </div>
        <div v-if="role.roleId != roleClick">
          <font-awesome-icon
            v-b-tooltip.hover
            icon="trash"
            title="delete"
            style="color: #de0404;"
            class="marTop5"
            @click="delRole(role.roleId, index)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      show: false,
      roleClick: '',
      formData: {
        editroleType: ''
      }
    }
  },
  computed: {
    ...mapState(['roles'])
  },
  methods: {
    ...mapActions(['editRole', 'deleteRole']),
    editRoleText (id, index, item) {
      this.show = true
      this.roleClick = id
      this.formData.editroleType = item.roleType
      this.roleId = id
      this.index = index
    },
    updateRole () {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.roles[this.index].roleType = this.formData.editroleType
          const payload = {
            userId: localStorage.getItem('userId'),
            roleId: this.roleId,
            index: this.index,
            roleType: this.formData.editroleType
          }
          this.editRole(payload)
          this.roleClick = ''
          // this.formData.editroleType = ''
        }
      })
    },
    delRole (id, inx) {
      this.roles[inx].status = 1
      const payload = {
        userId: localStorage.getItem('userId'),
        index: inx,
        data: {
          roleId: id,
          status: 1
        }
      }
      this.deleteRole(payload)
    }
  }
}
</script>
