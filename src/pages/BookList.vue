<template>
  <div>
    <book-row v-for="book in books"
              :key="book.id"
              :book="book"/>
  </div>
</template>

<script>
import BookRow from "../components/BookRow.vue";
import BookService from "../services/BookService";

export default {
  data(){
    return {
      books: []
    }
  },
  components: {
    BookRow
  },
  methods: {
    getBooks(){
      BookService.getBooks().then((response) => {
        this.books = response.data;
      });
    }
  },
  created() {
    this.getBooks();
  }
}
</script>

<style>

</style>