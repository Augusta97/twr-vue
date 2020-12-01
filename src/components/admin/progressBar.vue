<template>
  <div>
    <b-row class="mb-3">
      <b-col class="col-sm-10">
        <b-progress :max="maxval" striped height="2rem">
          <!-- {{uploadPercentage}}  v-if="audioUpload"  variant-->
          <b-progress-bar
            animated
            :variant="colours"
            show-progress
            :value="percent"
            :label="percent == 100 ? `completed ${((percent / 100) * 100).toFixed(2)}%`
                                : `loading ${((percent / 100) * 100).toFixed(2)}%`"
          ></b-progress-bar>
        </b-progress>
      </b-col>
      <!-- <b-button size="sm" variant="danger" class="px-3" @click="audiomethod(filerefs)">x</b-button> -->
    </b-row>
  </div>
</template>
<script>
export default {
  props: {
    upload: Boolean,
    maxval: Number,
    percent: Number,
    colours: String
    // filerefs: String
  },
  data() {
    return {
      files: {}
    };
  },
  methods: {
    // audiomethod() {
    //   this.files = document.getElementById(this.filerefs).value;
    //   // this.files = document.getElementById(this.filerefs).files[0];
    //   document.getElementById(this.filerefs).value = "";
    // }
  }
};
</script>