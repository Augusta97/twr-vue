<template>
  <div class="scroll-y">
    <div
      v-for="(country, index) in countryList"
      :key="index"
      class="marTop10"
    >
      <div
        v-if="country.status==0"
        class="d-flex"
      >
        <div
          v-if="country.countryId!=countryClick"
          class="col-sm-1 col-md-2"
        >
          {{ country.countryName }}
        </div>
        <div
          v-else
          class="col-sm-4"
        >
          <form @submit.prevent="updateCountry">
            <div class="row col-sm-12">
              <b-form-input
                v-model="formData.editcountryName"
                v-validate="'required'"
                name="editcountryName"
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
              v-show="errors.has('editcountryName')"
              class="help is-danger"
            >
              {{ errors.first('editcountryName') }}
            </span>
          </form>
        </div>
        <div
          v-if="country.countryId!=countryClick"
          class="spacelr"
        >
          <font-awesome-icon
            v-b-tooltip.hover
            v-b-modal.modaledit
            icon="edit"
            title="edit"
            class="marTop5 clr-green"
            @click="editCountryText(country.countryId, index, country)"
          />
        </div>
        <div v-if="country.countryId!=countryClick">
          <font-awesome-icon
            v-b-tooltip.hover
            icon="trash"
            title="delete"
            style="color: #de0404;"
            class="marTop5"
            @click="delCountry(country.countryId, index)"
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
      countryClick: '',
      formData: {
        editcountryName: ''
      }
    }
  },
  computed: {
    ...mapState(['countryList'])
  },
  methods: {
    ...mapActions(['editCountry', 'deleteCountry']),
    editCountryText (id, index, item) {
      this.show = true
      this.countryClick = id
      this.formData.editcountryName = item.countryName
      this.countryId = id
      this.index = index
    },
    updateCountry () {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.countryList[this.index].countryName = this.formData.editcountryName
          const payload = {
            userId: localStorage.getItem('userId'),
            countryId: this.countryId,
            index: this.index,
            countryName: this.formData.editcountryName
          }
          this.editCountry(payload)
          this.countryClick = ''
          // this.formData.editroleType = ''
        }
      })
    },
    delCountry (id, inx) {
      this.countryList[inx].status = 1
      const payload = {
        userId: localStorage.getItem('userId'),
        index: inx,
        data: {
          countryId: id,
          status: 1
        }
      }
      this.deleteCountry(payload)
    },
    clkEditBtn () {
      this.show = false
    }
  }
}
</script>
