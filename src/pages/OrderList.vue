<template>
  <div>
    <order-row :orders="orders"/>
  </div>
</template>

<script>
import OrderRow from "../components/OrderRow.vue";
import OrderService from "../services/OrderService";
import {bus} from "@/main";

export default {
  data() {
    return {
      orders: [],
      isAdmin: this.checkIsUserAdmin(),
      isManager: this.checkIsUserManager(),
    }
  },
  components: {OrderRow},
  methods: {
    getOrders() {
      if (this.isAdmin === true || this.isManager === true) {
        OrderService.getAllOrders().then(res => {
          this.orders = res.data
        })
      } else {
        OrderService.getOrders().then(res => {
          this.orders = res.data
        })
      }
    },
    checkIsUserAdmin() {
      let isAdmin = localStorage.getItem('isAdmin')
      return isAdmin === 'true';
    },
    checkIsUserManager() {
      let isManager = localStorage.getItem('isManager')
      return isManager === 'true';
    },
  },
  created() {
    bus.$on('logged', () => {
      this.isLogged = this.checkIfIsLogged()
      this.isAdmin = this.checkIsUserAdmin()
      this.isManager = this.checkIsUserManager()
    })
    this.getOrders();
  }
}
</script>

<style scoped>

</style>