<template>
  <div>
    <b-card no-body>
      <b-tabs card class="clrtab">
        <b-tab no-body title="Attendance">
          <user-attendance></user-attendance>
          <b-card-footer>User | Attendance</b-card-footer>
        </b-tab>
        <b-tab title="Module">
          <b-card-title><code>Module</code></b-card-title>
          <b-card-text>
            Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla tempor. Laborum
            consequat non elit enim exercitation cillum aliqua consequat id aliqua. Esse ex
            consectetur mollit voluptate est in duis laboris ad sit ipsum anim Lorem. Incididunt
            veniam velit elit elit veniam Lorem aliqua quis ullamco deserunt sit enim elit aliqua
            esse irure.
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import userAttendance from '../user/userAttendance.vue'
export default {
  components: {
    'user-attendance': userAttendance
  },
  computed: {
    ...mapState(['users'])
  }
}
</script>
