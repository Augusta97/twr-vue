<template>
  <b-container fluid>
    <b-row class="form-height">
      <app-sidebar />
      <b-col md="10" class="mb-2 form-bg">
        <admin-header></admin-header>
        <div aria-label="breadcrumb" class="breadcrumpCss">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              List Quiz
            </li>
          </ol>
        </div>
        <b-container fluid class="mt-3">
          <h4>
            To see Quiz
            <a href="http://www.twrradio.in/bible/">click here</a>
          </h4>
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { mapState } from "vuex";
import sidebar from "../../admin/sidebar.vue";
import adminHeader from "../../admin/adminHeader.vue";

export default {
  data() {
    return {};
  },
  components: {
    "app-sidebar": sidebar,
    "admin-header": adminHeader
  },
  computed: {
    ...mapState(["allQuiz", "existinglang"])
  }
};
</script>
