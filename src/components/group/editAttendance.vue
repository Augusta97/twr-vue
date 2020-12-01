<template>
  <form
    class="marginTop30"
  >
    <b-row>
      <b-col sm="7" class="d-flex">
        <p class="col-sm-6 text-left"><b>Group name</b> <span class="spacelr">{{groupList[groupId - 1].groupName}}</span></p>
        <p class="col-sm-6 text-right"><b class="spacelr">Date</b> <span>{{attDate}}</span></p>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="7" class="d-flex">
        <b class="col"><p>Member name</p></b>
        <b class="col"><p>Phone no</p></b>
        <b class="col"><p>Attendance Status</p></b>
      </b-col>
    </b-row>
    <b-row
      v-for="(mem) in grpAttendance.filter(x => x.groupId == groupId && x.attendanceDate == attDate)"
        :key="mem.attendanceId"
    >
      <b-col sm="7" class="d-flex" v-for="(filterAttendance, inx) in mem.attendance"
        :key="inx">
        <p class="col">
          {{ filterAttendance.firstname }}
        </p>
        <p class="col">
          {{ filterAttendance.phone }}
        </p>
        <p class="col ">
          <b-form-select
            v-model="filterAttendance.attendanceStatus"
            :name="'statusfor_'+mem.userId"
          >
            <option
              class="disable"
              disabled
              value=""
            >
              Select
            </option>
            <option value="present">
              present
            </option>
            <option value="absent">
              absent
            </option>
          </b-form-select>
        </p>
      </b-col>
    </b-row>
  </form>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    groupId: Number,
    attDate: String,
    grpAttendance: Array
  },
  data () {
    return {
      updateattendance: []
    }
  },
  computed: {
    ...mapState(['groupList'])
  },
  methods: {
    // ...mapActions(['editGroupAttendance']),
    // editAttendance () {
    //   // this.grpAttendance.forEach((a, index) => {
    //   // // for (var i = 0; i < this.grpAttendance.length; i++) {
    //   //   if (a.groupId === this.groupId && a.attendanceDate === this.attDate) {
    //   //     a.attendanceStatus = a.attendanceStatus
    //   //   }
    //   // })
    //   // this.filterIndex = this.grpAttendance.findIndex(x => x.groupId === this.groupId && x.attendanceDate === this.attDate)
    //   this.updateattendance = this.grpAttendance.filter(x => x.groupId === this.groupId && x.attendanceDate === this.attDate).map(y => y.attendance)
    //   const payload = {
    //     userId: localStorage.getItem('userId'),
    //     data: {
    //       groupId: this.groupId,
    //       attendanceDate: this.attDate,
    //       attendance: this.updateattendance
    //     }
    //   }
    //   this.editGroupAttendance(payload)
    // }
  }
}
</script>
