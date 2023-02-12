import Vue from 'vue'
import Vuelidate from 'vuelidate'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from "./router/router";
import App from './App.vue'
import VueResource from 'vue-resource'
import Vuex from "vuex";
import store from './store/index'

export const bus = new Vue();

Vue.use(Vuex);
Vue.use(Vuelidate)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueResource)

Vue.prototype.$store = store;

new Vue({
  el: '#app',
  store,
  router,
  render: a => a(App)
})