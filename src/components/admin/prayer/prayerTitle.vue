<template>
  <b-container fluid>
    <b-row class="form-height">
      <app-sidebar />
      <b-col md="10" class="mb-2 form-bg">
        <admin-header />
        <div aria-label="breadcrumb" class="breadcrumpCss">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Prayer Title
            </li>
          </ol>
        </div>
        <div class="col" v-if="thankPrayerCnt > 0">
          <h5>SHOW PRAYER TITLE</h5>
        </div>
        <view-prayer-title v-if="thankPrayerCnt > 0"></view-prayer-title>
        <view-thanks-prayer v-else></view-thanks-prayer>
        <div class="col" v-if="thankPrayerCnt > 0">
          <h5>ADD NEW PRAYER TITLE</h5>
        </div>
        <form
          v-if="thankPrayerCnt > 0"
          class="common-bg"
          method="post"
          @submit.prevent="addPrayerTitle"
        >
          <b-row class="col">
            <div class="col-sm-3 col-md-4">
              <label>Name of the Title</label>
              <b-form-input
                v-model="formData.name"
                v-validate="'required'"
                type="text"
                name="name"
                :class="{ input: true, 'is-danger': errors.has('name') }"
              />
              <span v-show="errors.has('name')" class="help is-danger">{{
                errors.first("name")
              }}</span>
            </div>
            <b-form-group
              label="Specific Date"
              label-for="specificDate"
              class="col-4"
            >
              <b-form-select
                v-model="formData.specificDate"
                v-validate="'required'"
                name="specificDate"
                class="txtbox-design"
                :class="{
                  input: true,
                  'is-danger': errors.has('specificDate')
                }"
              >
                <option class="disable" disabled value>Select</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </b-form-select>
              <span
                v-show="errors.has('specificDate')"
                class="help is-danger"
                >{{ errors.first("specificDate") }}</span
              >
            </b-form-group>
            <div class="col-sm-3">
              <label>Status</label>
              <b-form-select
                v-model="formData.status"
                v-validate="'required'"
                type="text"
                :class="{ input: true, 'is-danger': errors.has('status') }"
                class="form-control"
                name="status"
              >
                <option class="disable" disabled value>Select</option>
                <option value="Published">Published</option>
                <option value="Private">Private</option>
                <option value="Draft">Draft</option>
              </b-form-select>
              <span v-show="errors.has('status')" class="help is-danger">{{
                errors.first("status")
              }}</span>
            </div>
          </b-row>
          <b-row class="col mt-3">
            <b-form-group
              label="Start Date"
              v-if="formData.specificDate == 1"
              class="col-4"
            >
              <datepicker
                v-model="formData.startDate"
                v-validate="'required'"
                placeholder="Select Date"
                input-class="form-control bg-white"
                data-vv-name="fromDate"
                name="startDate"
                :format="format"
                :class="{ input: true, 'is-danger': errors.has('startDate') }"
              />
              <span v-show="errors.has('startDate')" class="help is-danger">{{
                errors.first("startDate")
              }}</span>
            </b-form-group>
            <b-form-group
              label="End Date"
              v-if="formData.specificDate == 1"
              class="col-4"
            >
              <datepicker
                v-model="formData.endDate"
                v-validate="'required'"
                placeholder="Select Date"
                input-class="form-control bg-white"
                data-vv-name="fromDate"
                name="endDate"
                :format="format"
                :class="{ input: true, 'is-danger': errors.has('endDate') }"
              />
              <span v-show="errors.has('endDate')" class="help is-danger">{{
                errors.first("endDate")
              }}</span>
            </b-form-group>
            <div class="col-sm-2 marginTop30">
              <button type="submit" class="btn btn-success">Create</button>
            </div>
            <br />
          </b-row>
        </form>
      </b-col>
    </b-row>
    <session-modal></session-modal>
  </b-container>
</template>
<script>
import sidebar from "../../admin/sidebar.vue";
import adminHeader from "../../admin/adminHeader.vue";
import { Validator } from "vee-validate";
import { mapState, mapActions } from "vuex";
import viewPrayerTitle from "../../admin/prayer/viewPrayerTitle.vue";
import viewThanksPrayer from "../../admin/prayer/viewThanksPrayer.vue";
import sessionModal from "../../sessionModal.vue";
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";
export default {
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
      format: "dd MMM",
      disabledDates: {
        from: new Date()
      },
      formData: {
        name: "",
        status: "",
        specificDate: "",
        startDate: "",
        endDate: ""
      }
    };
  },
  methods: {
    ...mapActions(["createPrayerTitle"]),
    addPrayerTitle() {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.$validator.validateAll().then(valid => {
          if (valid) {
            let l = this.formData.startDate;
            let m = this.formData.endDate;
            const today = new Date();
            const date =
              today.getFullYear() +
              "-" +
              (today.getMonth() + 1) +
              "-" +
              today.getDate();
            const time =
              today.getHours() +
              ":" +
              today.getMinutes() +
              ":" +
              today.getSeconds();
            const dateTime = date + " " + time;
            const payload = {
              groupId: this.$route.params.id,
              createdAt: dateTime,
              title: {
                name: this.formData.name,
                status: this.formData.status,
                specificDate: this.formData.specificDate,
                startDate:
                  this.formData.specificDate == 1
                    ? l.toString().substr(8, 2) +
                      " " +
                      l.toString().substr(4, 3)
                    : null,
                endDate:
                  this.formData.specificDate == 1
                    ? m.toString().substr(8, 2) +
                      " " +
                      m.toString().substr(4, 3)
                    : null,
                deleteAccess: 0
              }
            };
            this.createPrayerTitle(payload);
            this.formData.name = "";
            this.formData.status = "";
            this.formData.specificDate = "";
            this.formData.startDate = "";
            this.formData.endDate = "";
          }
        });
      }
    }
  },
  components: {
    "admin-header": adminHeader,
    "app-sidebar": sidebar,
    "view-prayer-title": viewPrayerTitle,
    "view-thanks-prayer": viewThanksPrayer,
    "session-modal": sessionModal,
    Datepicker
  },
  computed: {
    ...mapState(["prayerTitle", "prayerGroup", "thankPrayer"]),
    thankPrayerCnt() {
      return this.prayerGroup.result.filter(
        x => x.id == this.$route.params.id && x.thankGroup == 0
      ).length;
    }
  },
  mounted() {
    if (
      this.prayerGroup.result.filter(
        x => x.id == this.$route.params.id && x.thankGroup == 0
      ).length > 0
    ) {
      const payload = {
        groupId: this.$route.params.id
      };
      return this.$store.dispatch("loadExistingPrayerTitle", payload);
    } else {
      const payload = {
        groupId: this.$route.params.id,
        userId: localStorage.getItem("userId")
      };
      return this.$store.dispatch("thankfulPrayerGroup", payload);
    }
  }
};
</script>
