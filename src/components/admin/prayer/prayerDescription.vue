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
              Prayer Description
            </li>
          </ol>
        </div>
        <div class="col">
          <h5>ADD NEW PRAYER DESCRIPTION</h5>
        </div>
        <form
          class="common-bg"
          method="post"
          @submit.prevent="addPrayerDescription"
        >
          <b-row class="col">
            <div class="col-sm-3 col-md-4">
              <label>Type Your request</label>
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
            <div class="col-sm-2 marginTop30">
              <button type="submit" class="btn btn-success">Create</button>
            </div>
          </b-row>
        </form>
        <div class="col">
          <h5>SHOW PRAYER DESCRIPTION</h5>
        </div>
        <view-prayer-description></view-prayer-description>
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
import viewPrayerDescription from "../../admin/prayer/viewPrayerDescription.vue";
import sessionModal from "../../sessionModal.vue";
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
      formData: {
        name: "",
        status: ""
      }
    };
  },
  methods: {
    ...mapActions(["createPrayerDescription"]),
    addPrayerDescription() {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.$validator.validateAll().then(valid => {
          if (valid) {
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
              titleId: this.$route.params.id,
              createdAt: dateTime,
              description: {
                name: this.formData.name,
                status: this.formData.status,
                deleteAccess: 0
              }
            };
            this.createPrayerDescription(payload);
            this.formData.name = "";
          }
        });
      }
    }
  },
  components: {
    "admin-header": adminHeader,
    "app-sidebar": sidebar,
    "view-prayer-description": viewPrayerDescription,
    "session-modal": sessionModal
  },
  computed: {
    ...mapState(["prayerDescription"])
  },
  mounted() {
    const payload = {
      titleId: this.$route.params.id
    };
    return this.$store.dispatch("loadExistingPrayerDescription", payload);
  }
};
</script>
