<template>
  <b-container fluid>
    <b-row class="form-height">
      <app-sidebar />
      <b-col md="10" class="mb-2 form-bg">
        <div aria-label="breadcrumb" class="breadcrumpCss">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Master</li>
          </ol>
        </div>
        <role-master />
        <country-master />
        <denomination-master />
        <media-classification />
        <help-priority />
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import sidebar from "../../admin/sidebar.vue";
import roleMaster from "../master/roleMaster.vue";
import countryMaster from "../master/countryMaster.vue";
import denominationMaster from "../master/denominationMaster.vue";
import mediaClassification from "../master/mediaClassification.vue";
import helpPriority from "../master/helpPriority.vue";
export default {
  components: {
    "app-sidebar": sidebar,
    "role-master": roleMaster,
    "country-master": countryMaster,
    "denomination-master": denominationMaster,
    "media-classification": mediaClassification,
    "help-priority": helpPriority
  },
  data() {
    return {};
  }
};
</script>
