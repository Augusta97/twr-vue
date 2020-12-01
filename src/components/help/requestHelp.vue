<template>
  <b-container fluid>
    <b-row class="form-height">
      <app-sidebar/>
      <b-col md="10" class="mb-2 form-bg">
        <admin-header />
        <div aria-label="breadcrumb" class="breadcrumpCss">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Help
            </li>
          </ol>
        </div>
        <div class="mt-4">
          <b-card :img-src="helpImg" img-alt="Card image" img-left class="mb-3 imgwidth25">
            <b-card-text>
              <b-form @submit.prevent="askHelp" class="col-sm-6 m-auto helpForm">
                <b-row>
                  <b-form-group class="col-sm-9"
                  >
                    <b-form-select name="priority" v-model="formData.priority" placeholder="select"
                      v-validate="'required'" class="form-control"
                    >
                      <option class="disable" disabled value="">Select Priority</option>
                      <option value="critical">Critical</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </b-form-select>
                    <span
                      v-show="errors.has('priority')"
                      class="help is-danger"
                    >
                      {{ errors.first('priority') }}
                    </span>
                  </b-form-group>
                </b-row>
                <b-row>
                  <b-form-group
                    class="col-sm-9"
                  >
                    <textarea
                      id="helpText"
                      v-model="formData.helpText"
                      v-validate="'required'" name="helpText"
                      class="form-control"
                      :class="{ 'is-danger': errors.has('helpText') }"
                      placeholder="Type your request here..." rows="1 1/2" cols="30">
                    </textarea>
                    <span v-show="errors.has('helpText')" class="help is-danger">
                      {{ errors.first("helpText") }}
                    </span>
                  </b-form-group>
                  <b-form-group>
                    <b-button type="submit" class="btn btn-success">
                      <font-awesome-icon
                        v-b-tooltip.hover
                        :icon="['fas', 'paper-plane']"
                        title="send your request"
                      />
                    </b-button>
                  </b-form-group>
                </b-row>
              </b-form>
            </b-card-text>
          </b-card>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import sidebar from '../admin/sidebar.vue'
import adminHeader from '../admin/adminHeader.vue'
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      formData: {
        helpText: '',
        priority: ''
      },
      helpImg: require('@/assets/images/helps.png')
    }
  },
  components: {
    'app-sidebar': sidebar,
    'admin-header': adminHeader
  },
  computed: {
    ...mapState(['userId'])
  },
  methods: {
    ...mapActions(['requestHelp']),
    askHelp () {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          const today = new Date()
          const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
          const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
          const dateTime = date + ' ' + time
          const payload = {
            data: {
              // helpId: this.help.length + 1,
              userId: this.userId,
              helpText: this.formData.helpText,
              priority: this.formData.priority,
              status: 'pending',
              textedAt: dateTime
            }
          }
          console.log(payload)
          this.requestHelp(payload)
          // this.msg = 'Data submitted'
          // this.$bvModal.show('modal-submit')
          this.formData.helpText = ''
          this.formData.priority = ''
        }
      })
    }
  }
}
</script>
