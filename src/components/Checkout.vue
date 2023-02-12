<template>
  <div>
    <h2 class="mb-4 mt-4">Оформление заказа</h2>
    <b-form class="mx-auto my-auto w-25">
      <b-form-group class="mt-2" id="input-group-1" label="Имя" label-for="firstName">
        <b-form-input id="firstName" placeholder="Иван" required v-model="user.firstName"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Фамилия" label-for="lastName">
        <b-form-input id="lastName" placeholder="Иванов" required v-model="user.lastName"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Имя пользователя" label-for="username">
        <b-form-input id="username" placeholder="user" required v-model="user.username"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Почта" label-for="email">
        <b-form-input id="email" type="email" placeholder="user@example.com" required
                      v-model="user.email"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label="Телефон" label-for="phone">
        <b-form-input id="phone" type="tel" placeholder="88008008080" required v-model="user.phone"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-8" label="Адрес" label-for="address">
        <b-form-input id="address" v-model="user.address"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-9" label="Город" label-for="country">
        <b-form-input id="country" v-model="user.country"></b-form-input>
      </b-form-group>

      <b-button type="button" variant="primary" @click="checkout">Оформить заказ</b-button>

      <div class="form-group">
        <div v-if="message" class="alert alert-danger" role="alert">{{ message }}</div>
      </div>
    </b-form>
  </div>
</template>

<script>
import UserService from "../services/UserService";
import CartService from "../services/CartService";
import CartRow from "./CartRow.vue";

export default {
  props: ['currentCart'],
  data() {
    return {
      username: "",
      user: null
    }
  },
  created() {
    this.username = localStorage.getItem('username')
    UserService.getUser(this.username).then(res => {
      this.user = res.data
    })
  },
  methods: {
    checkout() {
      let cart = {
        cartLineList: [],
        totalPrice: CartRow.methods.getTotalPrice(this.currentCart)
      }
      for (let i = 0; i < this.currentCart.length; i++) {
        let cartLine = {
          book: this.currentCart[i].book,
          quantity: this.currentCart[i].quantity
        }
        cart.cartLineList.push(cartLine);
      }
      CartService.checkout(cart, this.user).then(res => {
        if (res.status === 200) {
          this.$store.state.cart = [];
          console.log("success");
        }
      })
    }
  }
}
</script>

<style scoped>
h2 {
  text-align: center;
}
</style>