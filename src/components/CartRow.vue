<template>
  <div>
    <b-table-simple fixed hover small caption-top responsive>
      <b-thead head-variant="light">
        <b-tr>
          <b-th>Название книги</b-th>
          <b-th>Автор</b-th>
          <b-th>Количество</b-th>
          <b-th>Цена</b-th>
          <b-th></b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="c in cart" :key="c.id">
          <td>{{ c.book.name }}</td>
          <td>{{ c.book.author || 'не найдено' }}</td>
          <td>
            <b-form>
              <b-form-input id="quantity" type="number" min="1" :max="c.book.quantity" placeholder="1" required
                            :value="c.quantity" v-model.number="c.quantity"></b-form-input>
            </b-form>
          </td>
          <td>{{ c.book.price || 'не найдено' }}</td>
          <td>
            <button type="button" v-on:click="deleteItemFromCart(getCartRow(c.book, c.quantity))">Удалить</button>
          </td>
        </b-tr>
      </b-tbody>
      <tr>
        <td>Общая сумма: {{ getTotalPrice(cart) }}</td>
      </tr>
    </b-table-simple>
    <h3 v-if="isLogged === false">Чтобы оформить заказ нужно <a href="/login"> авторизоваться или
      зарегистрироваться </a>
    </h3>
    <checkout :current-cart="cart" v-else/>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import {bus} from "@/main";
import Checkout from "./Checkout.vue";

export default {
  components: {Checkout},
  props: ['cart'],
  data() {
    return {
      isLogged: this.checkIfIsLogged(),
      count: 1
    }
  },
  created() {
    bus.$on('logged', () => {
      this.isLogged = this.checkIfIsLogged()
    })
  },
  methods: {
    ...mapActions({
      deleteItemFromCart: 'deleteItemFromCart'
    }),
    checkIfIsLogged() {
      let token = localStorage.getItem('Authorization')
      return !!token;
    },
    getCartRow(book, count) {
      let cartRow = {
        book: book,
        quantity: count
      }

      return cartRow;
    },
    getTotalPrice(cart) {
      let total = 0;
      for (let i = 0; i < cart.length; i++) {
        total += cart[i].quantity * cart[i].book.price;
      }
      return total;
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
  align-self: center;
  padding-right: 8px;
}
a:hover {
  text-decoration: none;
  color: blue;
}
</style>