<template>
  <b-tab title="Attendance" active style="dispaly:block;">
    <b-tabs content-class="mt-3" class="clrtab">
      <b-tab title="Add Attendance" active>
        <div class="col-sm-12 marginTop20">
          <h5 class>Add New Attendance</h5>
          <add-attendance></add-attendance>
        </div>
      </b-tab>
      <b-tab title="View Attendance">
        <div class="col-sm-12 marginTop20">
          <h5 class>View Attendance</h5>
          <view-attendance :totalRow="grpAttendance.filter(x => x.groupId == $route.params.id).length">
          </view-attendance>
        </div>
      </b-tab>
    </b-tabs>
  </b-tab>
</template>
<script>
import { mapState } from 'vuex'
import addAttendance from '../group/addAttendance.vue'
import viewAttendance from '../group/viewAttendance.vue'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState(['users', 'groupList', 'groupMember', 'roles', 'allLeaders', 'assignedMembers', 'grpAttendance'])
  },
  components: {
    'add-attendance': addAttendance,
    'view-attendance': viewAttendance
  }
}
</script>
