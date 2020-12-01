<template>
  <b-modal
    size="md"
    id="modal-sessionout"
    ref="sessionoutModal"
    no-close-on-backdrop
    ok-title="Ok"
    title="Warning Message"
    @ok="sessionOut"
  >
    <div>
      <i class="fa fa-exclamation-triangle warn-tick"></i>
      <span class="txt-des text-center">{{ sessionMsg }}</span>
    </div>
  </b-modal>
</template>
<script>
export default {
  data() {
    return {
      sessionMsg: "Login to continue"
    };
  },
  methods: {
    sessionOut(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.$router.push({ path: "/" });
    }
  }
};
</script>