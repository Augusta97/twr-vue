// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate'
import App from './App'
import store from './store'
import './components/common/fa.config'
import {
  routes
} from './router/routes'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'REPLACE-THIS-WITH-YOUR-KEY-FROM-ABOVE',
    libraries: 'places' // necessary for places input
  }
})

Vue.use(VeeValidate)

// bootstrap
Vue.use(BootstrapVue)
Vue.use(VueRouter)
const router = new VueRouter({
  routes,
  mode: 'hash'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  render: (h) => h(App)
})
