<template>
  <div class="ml-2 mt-2" v-if="book.quantity!==0 && book.removed === false">
    <b-card :key="book.id"
            :title="book.name"
            :img-src="itemImage"
            style="max-width: 400px; max-height: 330px"
            img-left
            img-width="150px"
    >
      <b-card-text>
        {{ book.author }}
      </b-card-text>
      <b-card-text>
        Цена: {{ book.price }}
      </b-card-text>
      <b-card-text>
        <b-form-group id="input-group-4" label="Количество" label-for="quantity">
          <b-form-input ref="quantity" id="quantity" type="number" :min=1 :max="book.quantity" placeholder="1" required
                        v-model.number="count"></b-form-input>
        </b-form-group>
      </b-card-text>

      <b-button variant="primary" v-on:click="addItemToCart(getCartRow(book, count))">Добавить в корзину</b-button>
    </b-card>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  props: ['book'],
  data() {
    return {
      image: this.book.filename,
      quantity: "",
      count: 1,
      cart: []
    }
  },
  computed: {
    itemImage() {
      if (!this.image) {
        return
      }
      const fileName = this.image
      return require("@/assets/" + fileName)
    }
  },
  methods: {
    ...mapActions({
      addItemToCart: 'addItemToCart'
    }),
    getCartRow(book, count) {
      let cartRow = {
        book: book,
        quantity: count
      }

      return cartRow;
    }
  }
}
</script>

<style scoped>

</style>