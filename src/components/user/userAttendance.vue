<template>
  <b-col class="scrolInUsrAtten marTopBot35">
    <!-- {{uniqueDate}} -->
    <b-row>
      <!-- <b-col sm="3"></b-col> -->
      <b-col sm="6">
        <b-row>
          <b-col sm="6">
            <p><b>Date</b></p>
          </b-col>
          <b-col sm="6">
            <p><b>Attendance</b></p>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="6">
        <b-row v-for="(mem, inx) in userAtten" :key="inx">
          <!-- <b-col sm="3"></b-col> -->
          <b-col sm="6">
            <p>{{mem.attendanceDate}}</p>
          </b-col>
          <b-col sm="6">
            <p :class="mem.attendanceStatus == 'A' ? 'clr-trash' : ''">{{mem.attendanceStatus}}</p>
          </b-col>
        </b-row>
      </b-col>
      <b-col sm="6">
        <b-row>
          <b-col sm="7"><b>No.of days Present</b></b-col>
          <b-col sm="3">{{presentCount}}</b-col>
        </b-row>
        <b-row>
          <b-col sm="7"><b>No.of days Absent</b></b-col>
          <b-col sm="3">{{absentCount}}</b-col>
        </b-row>
        <b-row>
          <b-col sm="7"><b>Total days</b></b-col>
          <b-col sm="3">{{userAtten.length}}</b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-col>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      userAtten: [],
      uniqueDate: ''
    }
  },
  computed: {
    ...mapState(['groupList', 'grpAttendance', 'assignedMembers']),
    presentCount: function () {
      return this.userAtten.filter(m => m.attendanceStatus === 'P').length
    },
    absentCount: function () {
      return this.userAtten.filter(m => m.attendanceStatus === 'A').length
    },
    uniqueYr: function () {
      return [...new Set(this.userAtten.map(x => x.attendanceDate.substr(6, 2)))]
    }
  },
  mounted () {
    for (var x = 0; x < this.grpAttendance.length; x++) {
      for (var k = 0; k < this.grpAttendance[x].attendance.filter(t => parseInt(t.userId) === parseInt(this.$route.params.id)).length; k++) {
        this.userAtten.push({'attendanceDate': this.grpAttendance[x].attendanceDate, 'attendanceStatus': this.grpAttendance[x].attendance[k].attendanceStatus})
      }
    }
    // var l = ''
    // for (var g = 0; g < this.userAtten.length; g++) {
    //   if (l !== this.userAtten[g].attendanceDate.substr(6, 2)) {
    //     this.uniqueDate = this.userAtten.filter(o => o.attendanceDate.substr(6, 2) === 19)
    //   }
    //   l = this.userAtten[g].attendanceDate.substr(6, 2)
    // }
    // const key = 'attendanceDate.substr(6, 2)'
    // var l = ''
    // [...new Set(array.map(x => x.fiscalYear))]
    // for (var k = 0; k < this.userAtten.length; k++) {
    //   if (l != this.userAtten[k].attendanceDate.substr(6, 2)) {
    //     this.uniqueYr.push({'attendanceDate': this.userAtten[k].attendanceDate, 'attendanceStatus': this.userAtten[k].attendanceStatus})
    //   }
    //   l = this.userAtten[k].attendanceDate.substr(6, 2)
    // }
    // for (var x = 0; x < this.userAtten.length; x++) {
    //   if (typeof this.userAtten[x].attendanceDate.substr(6, 2) == 'undefined') {
    //     this.uniqueYr.push({'attendanceDate': this.userAtten[x].fiscalYear})
    //   }
    // }
  }
}
</script>
