<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="navbar-collapse collapse w-100 dual-collapse2 order-1 order-md-0">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a
            class="mx-auto logo"
            href="#"
          >
            <img
              :src="images.logo"
              class="img-logo"
            >
            <span class="logotxt">Bibleapp</span>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target=".dual-collapse2"
          >
            <span class="navbar-toggler-icon" />
          </button>
        </li>
      </ul>
    </div>
    <!-- <div class="mx-auto order-0 text-center">
        <a class="mx-auto logo" href="#">
            <img v-bind:src="images.logo" class="img-logo"/>
            <span class="logotxt">Bibleapp</span>
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
          <span class="navbar-toggler-icon"></span>
        </button>
    </div> -->
    <div class="navbar-collapse collapse w-100 dual-collapse2 order-2 order-md-2 navbar-nav">
      <ul class="navbar-nav ml-auto">
        <router-link
          to="/userRegistration"
          active-class="active"
          tag="li"
        >
          <a class="nav-link">Register</a>
        </router-link>
        <router-link
          to="/"
          active-class="active"
          tag="li"
        >
          <a class="nav-link">Login</a>
        </router-link>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  data () {
    return {
      images: {
        logo: require('../../assets/images/logo.png'),
        group: require('../../assets/images/group.png')
      }
    }
  }
}
</script>
