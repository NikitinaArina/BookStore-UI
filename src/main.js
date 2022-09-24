import Vue from 'vue'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from "./router/router";
import App from './App.vue'
import VueResource from 'vue-resource'

export const bus = new Vue();

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueResource)

new Vue({
  el: '#app',
  router,
  render: a => a(App)
})