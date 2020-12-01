<template>
  <form class="marginTop30">
    <b-row>
      <b-container fluid class="scrollBehav">
        <!--{{totalRow}}-->
        <!-- {{paging}} -->
        <!-- {{paginatedItems}} -->
        <!-- {{Object.keys(paginatedItems).slice(
        pageNumber * pageSize,
        (pageNumber + 1) * pageSize
        )}}-->
        <keep-alive>
          <b-col class="mb-2">
            <b-pagination :total-rows="totalRow" :per-page="perPage" v-model="currentPage"></b-pagination>
            <b-row>
              <b-col sm="1">
                <p>
                  <b>Name</b>
                </p>
                <p v-for="(c, ind) in sortFunc()" :key="ind">
                  <span>{{c.firstname}}</span>
                </p>
              </b-col>
              <b-col sm="11">
                <b-row>
                  <b-col
                    md="2"
                    :items="paginatedItems"
                    :per-page="perPage"
                    :current-page="currentPage"
                    v-for="(mem, inx) in paginatedItems"
                    :key="inx"
                  >
                    <p>
                      <b>{{mem.attendanceDate}}</b>
                    </p>
                    <p v-for="(d, indx) in mem.attendance" :key="indx">
                      <!-- @click="editNote(d.attendanceId, d, mem.attendanceDate)" -->
                      <span
                        :class="d.present == 0 ? 'clr-trash' : ''"
                        v-b-tooltip.hover
                        title="click here to edit"
                      >{{d.present == 0 ? 'A' : 'P'}}</span>
                    </p>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-col>
        </keep-alive>
      </b-container>
      <b-modal
        id="modalEdit"
        ref="modalEdit"
        title="Edit Attendance"
        no-close-on-backdrop
        centered
        @ok="handleAttendance"
      >
        <form @submit.prevent="updateAttendance">
          <b-row>
            <b-form-group label="Member Name" class="col-sm-6">
              <b-form-input v-model="formData.editfirstname" readonly />
            </b-form-group>
            <b-form-group label="Attendance Status" class="col-sm-6">
              <b-form-select
                v-model="formData.editattendanceStatus"
                v-validate="'required'"
                :class="{'is-danger': errors.has('editattendanceStatus')}"
                name="editattendanceStatus"
              >
                <option class="disable" disabled value>Select</option>
                <option value="present">present</option>
                <option value="absent">absent</option>
              </b-form-select>
              <span
                v-show="errors.has('editattendanceStatus')"
                class="help is-danger"
              >{{ errors.first('editattendanceStatus') }}</span>
            </b-form-group>
          </b-row>
          <p v-show="updateMsg" class="invalid-cls">Attendance updated Successfully</p>
        </form>
      </b-modal>
    </b-row>
  </form>
</template>
<script>
import { mapState, mapActions } from "vuex";
import eventBus from "@/bus";
export default {
  props: {
    totalRow: Number,
    meth: Function,
    paging: Array
  },
  data() {
    return {
      grpKey: "",
      uID: [],
      updateMsg: false,
      editStatusIndex: "",
      editAttenId: "",
      editAttenDate: "",
      currentPage: 1,
      perPage: 5,
      formData: {
        editfirstname: "",
        editattendanceStatus: ""
      },
      pageNumber: 0
    };
  },
  computed: {
    ...mapState(["groupList", "grpAttendance", "assignedMembers"]),
    pageStart: function() {
      return (this.currentPage - 1) * this.perPage;
    },
    paginatedItems: function() {
      return this.paging;
    }
  },
  created() {
    eventBus.$on("form-submitted", () => {
      this.paginate(this.perPage, 0);
    });
    this.paginate(this.perPage, 0);
    // alert('jghjhj')
    // eventBus.$emit(this.paginate(this.perPage, 0))
    this.paginatedItems = this.paging;
    // this.totalRow = this.grpAttendance.data.length;
    // eventBus.$on('fireMethod', () => {
    //   this.paginate(this.perPage, 0)
    // })
  },
  watch: {
    paginatedItems: function() {
      return this.paging;
    }
    // totalRows: function () {
    //   return this.grpAttendance.filter(x => parseInt(x.groupId) === parseInt(this.$route.params.id)).length
    // }
  },
  // activated () {
  //   // this.totalRows = this.grpAttendance.filter(x => parseInt(x.groupId) === parseInt(this.$route.params.id)).length
  //   this.$nextTick(function () {
  //     this.paginate(this.perPage, 0)
  //   })
  // },
  methods: {
    ...mapActions(["editGroupAttendance"]),
    editNote(id, item, date) {
      this.formData.editfirstname = item.firstname;
      this.formData.editattendanceStatus =
        item.attendanceStatus === "P" ? "present" : "absent";
      this.editStatusIndex = id - 1;
      this.editAttenId = id;
      this.editAttenDate = date;
      this.$refs.modalEdit.show();
    },
    handleAttendance(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.updateAttendance();
    },
    paginate(pageSize, pageNumber) {
      let itemsToParse = this.paginatedItems;
      // this.paginatedItems = itemsToParse.slice(
      //   pageNumber * pageSize,
      //   (pageNumber + 1) * pageSize
      // );
      // console.log(this.paginatedItems)
    },
    onPageChanged(page) {
      this.paginate(this.perPage, page - 1);
    },
    updateAttendance() {
      this.$validator.validateAll().then(result => {
        if (result) {
          // for (let x = 0; x < this.grpAttendance.filter(y => parseInt(y.groupId) === parseInt(this.$route.params.id) && y.attendanceDate === this.editAttenDate).length; x++) {
          //   for (let z = 0; z < this.grpAttendance[x].attendance.length; z++) {
          //     this.grpAttendance[x].attendance[z].attendanceStatus = this.formData.editattendanceStatus
          //     console.log(this.grpAttendance[x].attendance[z].attendanceStatus)
          //   }
          // }
          var ats = this.formData.editattendanceStatus.toUpperCase();
          const payload = {
            loginId: localStorage.getItem("userId"),
            data: {
              groupId: this.$route.params.id,
              attendanceId: this.editAttenId,
              attendanceDate: this.editAttenDate,
              attendanceStatus: ats.substring(0, 1)
            }
          };
          console.log(payload);
          this.editGroupAttendance(payload);
        }
      });
    },
    sortFunc: function() {
      return this.assignedMembers
        .filter(
          x =>
            parseInt(x.groupId) === parseInt(this.$route.params.id) &&
            x.deleted === 0
        )
        .slice()
        .sort(function(a, b) {
          return a.firstname > b.firstname ? 1 : -1;
        });
    }
  }
};
</script>
