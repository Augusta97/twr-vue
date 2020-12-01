<template>
  <div class="scroll-y">
    <div
      v-for="(denomination, index) in denominationList"
      :key="index"
      class="marTop10"
    >
      <div
        v-if="denomination.status==0"
        class="d-flex"
      >
        <div
          v-if="denomination.denominationId!=denominationClick"
          class="col-sm-1 col-md-2"
        >
          {{ denomination.denominationName }}
        </div>
        <div
          v-else
          class="col-sm-4"
        >
          <form @submit.prevent="updateDenomination">
            <div class="row col-sm-12">
              <b-form-input
                v-model="formData.editDenominationName"
                v-validate="'required'"
                name="editDenominationName"
                class="col-sm-8"
              />
              <div class="col-sm-2">
                <button
                  type="submit"
                  class="btn btn-success"
                  @click="clkEditBtn"
                >
                  Edit
                </button>
              </div>
              <!-- <div class="col-sm-2"><button type="button" class="btn btn-danger" @click="delRole(role.role_id, index, role)">Delete</button></div> -->
            </div>
            <span
              v-show="errors.has('editDenominationName')"
              class="help is-danger"
            >
              {{ errors.first('editDenominationName') }}
            </span>
          </form>
        </div>
        <div
          v-if="denomination.denominationId!=denominationClick"
          class="spacelr"
        >
          <font-awesome-icon
            v-b-tooltip.hover
            v-b-modal.modaledit
            icon="edit"
            title="edit"
            class="marTop5 clr-green"
            @click="editDenominationText(denomination.denominationId, index, denomination)"
          />
        </div>
        <div v-if="denomination.denominationId!=denominationClick">
          <font-awesome-icon
            v-b-tooltip.hover
            icon="trash"
            title="delete"
            style="color: #de0404;"
            class="marTop5"
            @click="delDenomination(denomination.denominationId, index)"
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
      denominationClick: '',
      formData: {
        editDenominationName: ''
      }
    }
  },
  computed: {
    ...mapState(['denominationList'])
  },
  methods: {
    ...mapActions(['editDenomination', 'deleteDenomination']),
    editDenominationText (id, index, item) {
      this.show = true
      this.denominationClick = id
      this.formData.editDenominationName = item.denominationName
      this.denominationId = id
      this.index = index
    },
    updateDenomination () {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.denominationList[this.index].denominationName = this.formData.editDenominationName
          const payload = {
            userId: localStorage.getItem('userId'),
            denominationId: this.denominationId,
            index: this.index,
            denominationName: this.formData.editDenominationName
          }
          this.editDenomination(payload)
          this.denominationClick = ''
          // this.formData.editroleType = ''
        }
      })
    },
    delDenomination (id, inx) {
      this.denominationList[inx].status = 1
      const payload = {
        userId: localStorage.getItem('userId'),
        index: inx,
        data: {
          denominationId: id,
          status: 1
        }
      }
      this.deleteDenomination(payload)
    },
    clkEditBtn () {
      this.show = false
    }
  }
}
</script>
