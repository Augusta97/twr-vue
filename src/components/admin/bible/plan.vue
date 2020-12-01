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
              Add Reading Plan
            </li>
          </ol>
        </div>
        <div class>
          <b-card no-body>
            <b-tabs pills card vertical class="tab-design">
              <b-tab title="1 Create Plan" active>
                <b-card-text>
                  <p class="text-center tab-head">Create Plan</p>
                  <!--create plan-->
                  <add-plan />
                </b-card-text>
              </b-tab>
              <b-tab title="2 Create Reading">
                <b-card-text>
                  <p class="text-center tab-head">Create Reading Plan</p>
                  <!--create readings-->
                  <add-reading />
                </b-card-text>
              </b-tab>
              <b-tab title="3 View Plans">
                <b-card-text>
                  <!--view plan-->
                  <view-plan />
                </b-card-text>
              </b-tab>
              <b-tab title="4 View Readings">
                <b-card-text>
                  <!--view readings-->
                  <view-reading />
                </b-card-text>
              </b-tab>
            </b-tabs>
          </b-card>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import sidebar from "../../admin/sidebar.vue";
import addPlan from "../../admin/bible/addPlan.vue";
import addReading from "../../admin/bible/addReading.vue";
import viewReading from "../../admin/bible/viewReading.vue";
import viewPlan from "../../admin/bible/viewPlan.vue";
import adminHeader from "../../admin/adminHeader.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      format: "d MMMM yyyy",
      disabledDates: {
        from: new Date()
      }
    };
  },
  components: {
    "app-sidebar": sidebar,
    "add-plan": addPlan,
    "admin-header": adminHeader,
    "view-plan": viewPlan,
    "add-reading": addReading,
    "view-reading": viewReading
  },
  computed: {
    ...mapState([
      "existinglang",
      "version",
      "messages",
      "bibleplan",
      "bookList"
    ])
  }
};
</script>
