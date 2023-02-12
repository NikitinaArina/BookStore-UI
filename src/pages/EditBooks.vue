<template>
  <div>
    <b-button v-b-toggle="'collapse-2'" class="mt-2 mb-2 ml-4 mr-4">Добавить книжку</b-button>
    <b-collapse id="collapse-2" class="mt-2 mb-2 ml-4 mr-4">
      <b-form class="w-25" enctype="multipart/form-data">
        <b-form-group class="mt-2" id="input-group-1" label="Введите название книги" label-for="name">
          <b-form-input id="name" placeholder="Мертвые души" required v-model="book.name"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Имя" label-for="authorB">
          <b-form-input id="authorB" placeholder="Николай" required v-model="book.firstName"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Фамилия" label-for="authorB">
          <b-form-input id="authorB" placeholder="Гоголь" required v-model="book.lastName"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Цена" label-for="price">
          <b-form-input id="price" type="number" placeholder="200" min="0" required v-model="book.price"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4" label="Количество" label-for="quantity">
          <b-form-input id="quantity" type="number" min="1" max="1000" placeholder="1" required
                        v-model="book.quantity"></b-form-input>
        </b-form-group>

        <b-form-file
            v-model="file"
            :state="Boolean(file)"
            @change="onFileUpload"
            placeholder="Выбрать файл"
            drop-placeholder="Drop file here..."
        ></b-form-file>
        <div class="mt-3">Выбранный файл {{ file ? file.name : '' }}</div>

        <b-button type="button" variant="primary" @click="onSubmit">Добавить</b-button>

        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">{{ message }}</div>
        </div>
      </b-form>
    </b-collapse>

    <b-table-simple hover small caption-top responsive>
      <b-thead head-variant="dark">
        <b-tr>
          <b-th>Название книги</b-th>
          <b-th>Автор</b-th>
          <b-th>Цена</b-th>
          <b-th>Количество</b-th>
          <b-th></b-th>
          <b-th></b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="b in books" :key="b.id">
          <template v-if="b.removed === false">
            <td>{{ b.name }}</td>
            <td>
              {{ b.author }}
            </td>
            <td>
              <b-form-group id="input-group-3" label="Цена" label-for="price">
                <b-form-input id="price" type="number" placeholder="200" required v-model="b.price"></b-form-input>
              </b-form-group>
            </td>
            <td>
              <b-form-group id="input-group-4" label="Количество" label-for="quantity">
                <b-form-input id="quantity" type="number" placeholder="1" required
                              v-model="b.quantity"></b-form-input>
              </b-form-group>
            </td>
            <td class="mx-auto my-auto">
              <b-button class="mr-2" type="button" variant="primary" @click="editBooks(b)">Редактировать</b-button>
              <button class="mr-2" type="button" @click="deleteBook(b.id)">Удалить</button>
            </td>
          </template>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </div>
</template>

<script>
import BookService from "../services/BookService";

export default {
  data() {
    return {
      book: {
        name: "",
        lastName: "",
        firstName: "",
        price: "",
        quantity: ""
      },
      file: null,
      books: []
    }
  },
  methods: {
    onFileUpload(event) {
      this.file = event.target.files[0]
    },
    onSubmit() {
      BookService.addBook(this.book, this.file).then(res => {
        if (res.status === 200) {
          window.location.reload()
        }
      })
    },
    getBooks() {
      BookService.getBooks().then((response) => {
        this.books = response.data
      });
    },
    editBooks(book) {
      BookService.editBook(book).then(res => {
        if (res.status === 200) {
          window.location.reload()
        }
      })
    },
    deleteBook(id) {
      BookService.deleteBook(id).then(res => {
        if (res.status === 200) {
          window.location.reload()
        }
      })
    }
  },
  created() {
    this.getBooks();
  }
}
</script>

<style scoped>

</style>