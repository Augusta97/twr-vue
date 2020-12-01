<template>
  <div
    style="background-image: -webkit-linear-gradient(left, #9d9ede, rgb(62, 5, 50));
     position:relative;background-size: cover;color:white;"
  >
    <div style="background-color: rgb(33, 16, 47);">
      <div>
        <app-header />
      </div>
    </div>
    <div class="container paddTopBot">
      <div class="text-center">
        <b-breadcrumb
          :items="items"
          class="text-center"
        />
        <!-- <userRegistration></userRegistration> -->
        <!-- <groupDetails></groupDetails> -->
      </div>
    </div>
  </div>
</template>
<script>
import header from '../common/header.vue'
export default {
  components: {
    'app-header': header
  },
  data () {
    return {
      images: {
        logo: require('../../assets/images/logo.png')
      },
      items: [
        {
          text: 'Home'
        },
        {
          text: 'Registration'
        }
      ]
    }
  }
}
</script>
<style>
.paddTopBot{
  padding: 3em 0px;
}
</style>
