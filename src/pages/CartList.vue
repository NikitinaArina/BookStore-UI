<template>
  <div>
    <cart-row :cart="cart"/>
  </div>
</template>

<script>
import CartRow from "../components/CartRow";
import {mapGetters} from 'vuex'

export default {
  components: {CartRow},
  computed: {
    ...mapGetters({
      cart:'getCart'
    })
  }
}
</script>

<style scoped>

</style>