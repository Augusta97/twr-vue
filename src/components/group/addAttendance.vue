<template>
  <div class>
    <div class>
      <form class="marginTop30">
        <b-row>
          <!-- {{grpAttendance.data}} -->
          <!-- {{showAttendDate}}
          {{dmy}}-->
          <!--{{showAttendDate}}
          {{formData.attendanceDate}}-->
          <!-- <b-form-group
            label="Select Group"
            class="col-sm-2"
          >
            <model-select
              v-model="item"
              v-validate="'required'"
              name="groupId"
              :options="searchGrp"
              :selected-option="item"
              placeholder="placeholder text"
              @select="selectGrp"
            />
            <span
              v-show="grpmess"
              class="help is-danger"
            >
              This field is required
            </span>
          </b-form-group>-->
          <b-form-group class="col-sm-2" label="Select Date">
            <datepicker
              v-model="formData.attendanceDate"
              v-validate="'required'"
              placeholder="Select Date"
              input-class="form-control bg-white"
              data-vv-name="attendanceDate"
              input-name="attendanceDate"
              :format="format"
              :class="{
                input: true,
                'is-danger': errors.has('attendanceDate')
              }"
              :disabled-dates="disabledDates"
              @change="attenDate"
            ></datepicker>
            <span
              v-show="errors.has('attendanceDate')"
              class="help is-danger"
              >{{ errors.first("attendanceDate") }}</span
            >
          </b-form-group>

          <b-form-group class="col-sm-2 marginTop30">
            <button class="btn btn-warning" type="button" @click="attenDate()">
              <font-awesome-icon
                v-b-tooltip.hover
                icon="search"
                title="Search Attendance List"
                style="color: #de0404;"
                class="marTop5 spacelr"
              />
            </button>
          </b-form-group>
        </b-row>
      </form>
      <!-- {{typeof grpAttendance.find(y => y.groupId == $route.params.id && y.attendanceDate == dmy) == 'undefined'}} -->
      <form
        v-if="showAttendance == true"
        class="marginTop30"
        @submit.prevent="addAttendance"
      >
        <b-row>
          <b class="col-sm-2">
            <p>Group name</p>
          </b>
          <b class="col-sm-2">
            <p>Member name</p>
          </b>
          <b class="col-sm-2">
            <p>Phone no</p>
          </b>
          <b class="col-sm-2">
            <p>Date</p>
          </b>
          <b class="col-sm-2">
            <p>Attendance Status</p>
          </b>
        </b-row>
        <b-row
          v-for="(mem, index) in assignedMembers
            .filter(
              x =>
                x.groupId == $route.params.id && x.deleted == 0 && x.roleId == 3
            )
            .sort((a, b) => a.firstname.localeCompare(b.firstname))"
          :key="index"
        >
          <p class="col-sm-2">{{ groupList[$route.params.id - 1].name }}</p>
          <p class="col-sm-2">{{ mem.firstname }}</p>
          <p class="col-sm-2">{{ mem.phone }}</p>
          <p class="col-sm-2">{{ dmy }}</p>
          <p class="col-sm-2">
            <b-form-select
              :name="'statusfor_' + mem.userId"
              v-model="formData.attendanceStatus[index]"
              v-validate="'required'"
              :class="{ input: true, 'is-danger': errors.has('firstname') }"
            >
              <option class="disable" disabled value>Select</option>
              <option value="1">present</option>
              <option value="0">absent</option>
            </b-form-select>
            <span
              v-show="errors.has('statusfor_' + mem.userId)"
              class="help is-danger"
              >{{ errors.first("statusfor_" + mem.userId) }}</span
            >
          </p>
        </b-row>
        <div class="text-right col-sm-10">
          <button type="submit" class="btn btn-success">Submit</button>
        </div>
      </form>
      <!-- <editAttendance v-if="typeof grpAttendance.find(y => y.groupId == $route.params.id && y.attendanceDate == dmy) != 'undefined' && showAttendance==true"
      :groupId="$route.params.id" :attDate="dmy" :grpAttendance="grpAttendance"></editAttendance>-->
    </div>
    <b-modal
      title="Message"
      ref="existModal"
      no-close-on-backdrop
      ok-title="Ok"
      ok-only
    >
      <p class="my-4" v-if="existMsg">
        Attendance for this date already exist.
        <!-- <span @click="tabIndex ++">Click Here</span> -->
      </p>
    </b-modal>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";
import { Validator } from "vee-validate";
export default {
  props: {},
  components: {
    Datepicker
  },
  data() {
    const dictionary = {
      en: {
        messages: {
          required: function() {
            return "This field is required";
          }
        }
      }
    };
    Validator.localize(dictionary);
    return {
      showAttendance: false,
      grpmess: false,
      existMsg: false,
      format: "d MMMM yyyy",
      disabledDates: {
        from: new Date()
      },
      searchGrp: [],
      // item: {
      //   value: '',
      //   text: ''
      // },
      // showAttendDate: "",
      formData: {
        attendanceDate: "",
        attendanceStatus: []
      },
      attendance: []
    };
  },
  computed: {
    ...mapState(["users", "groupList", "assignedMembers", "grpAttendance"]),
    dmy: function() {
      var m = new Date(this.formData.attendanceDate);
      var yy = JSON.stringify(m.getFullYear());
      var ddat = m.getDate();
      var mm = m.getMonth() + 1;
      var b =
        (ddat <= 9 ? "0" + ddat : ddat) +
        "-" +
        (mm <= 9 ? "0" + mm : mm) +
        "-" +
        yy.substr(2);
      return b;
    },
    showAttendDate: function() {
      var m = new Date(this.formData.attendanceDate);
      var yy = JSON.stringify(m.getFullYear());
      var ddat = m.getDate();
      var mm = m.getMonth() + 1;
      var b =
        yy +
        "-" +
        (mm <= 9 ? "0" + mm : mm) +
        "-" +
        (ddat <= 9 ? "0" + ddat : ddat);
      return b;
    }
  },
  mounted() {
    const payload = {
      groupId: this.$route.params.id
    };
    this.$store.dispatch("loadAttendance", payload);
  },
  // beforeUpdate () {
  //   this.$store.dispatch('loadAttendance')
  // },
  methods: {
    ...mapActions(["groupAttendance"]),
    // selectGrp (item) {
    //   this.item = item
    // },
    appendLeadingZeros(n) {
      if (n <= 9) {
        return "0" + n;
      }
      return n;
    },
    attenDate() {
      // this.showAttendDate = ''
      this.$validator.validateAll().then(valid => {
        if (valid) {
          if (
            this.grpAttendance.attendanceList.filter(
              x => x.attendanceDate == this.showAttendDate
            ).length === 0
          ) {
            this.showAttendance = true;
          } else {
            this.existMsg = true;
            this.$refs.existModal.show();
          }
        }
      });
    },
    addAttendance() {
      // for (let c = 0; c < this.formData.attendanceStatus.length; c++) {
      //   var attStatus = this.formData.attendanceStatus[c]
      // }
      this.$validator.validateAll().then(valid => {
        if (valid) {
          var assignUser = this.assignedMembers
            .filter(
              x =>
                parseInt(x.groupId) === parseInt(this.$route.params.id) &&
                x.deleted === 0 &&
                x.roleId === 3
            )
            .sort((a, b) => a.firstname.localeCompare(b.firstname));
          for (var i = 0; i < assignUser.length; i++) {
            // var strChange = this.formData.attendanceStatus[i].substring(0, 1);
            let formVal = "";
            formVal = {
              // attendanceId:
              //   this.grpAttendance.length === 0
              //     ? this.grpAttendance.length + 1
              //     : this.grpAttendance[0].attendance.reduce((a, b) =>
              //         a.attendanceId > b.attendanceId ? a : b
              //       ).attendanceId +
              //       1 +
              //       i,
              userId: assignUser[i].userId,
              present: this.formData.attendanceStatus[i]
              // firstname: assignUser[i].firstname,
              // lastname: assignUser[i].lastname,
              // phone: assignUser[i].phone
            };
            if (formVal !== "") {
              this.attendance.push(formVal);
            }
          }
          const payload = {
            leaderId: localStorage.getItem("userId"),
            // data: {
            groupId: this.$route.params.id,
            groupName: this.groupList[this.$route.params.id - 1].groupName,
            date: this.showAttendDate,
            attendance: this.attendance
            // }
          };
          console.log(payload);
          this.groupAttendance(payload);
          this.addattend = [];
          this.formData.attendanceStatus = [];
          this.showAttendance = false;
        }
      });
    }
  }
};
</script>
