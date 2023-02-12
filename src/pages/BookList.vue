<template>
  <div>
    <b-card-group deck>
      <book-row v-for="book in books"
                :key="book.id"
                :book="book"/>
    </b-card-group>
  </div>
</template>

<script>
import BookRow from "../components/BookRow.vue";
import BookService from "../services/BookService";

export default {
  data() {
    return {
      books: [],
      cart: []
    }
  },
  components: {
    BookRow
  },
  methods: {
    getBooks() {
      BookService.getBooks().then((response) => {
        this.books = response.data;
      });
    },
    /*addItemToCart(cartQ) {
      if (this.cart.filter(x => x.book === cartQ.book).length > 0) {
        this.cart.filter(x => x.book === cartQ.book).map(x => x.quantity = parseInt(x.quantity) + parseInt(cartQ.quantity))
      } else this.cart.push(cartQ);
    },*/
    removeItemFromCart(book) {
      this.cart.splice(this.cart.indexOf(book), 1);
    }
  },
  created() {
    this.getBooks();
  },
  mounted: function () {
    this.$root.$on('filteredBooks', (books) => {
      this.books = books
    })
  }
}
</script>

<style>

</style>