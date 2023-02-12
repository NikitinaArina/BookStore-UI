import axios from "axios";

let BASE_URL = `http://localhost:9000/api`
const BOOK_API = '/books'
const ADD_API = '/add'
const SEARCH_API = '/search'
const EDIT_API = '/edit'
const DELETE_API = '/delete/'

class BookService {
    getBooks() {
        return axios.get(BASE_URL);
    }

    getUrl() {
        return BASE_URL;
    }

    addBook(book, file) {
        let formData = new FormData();
        const json = JSON.stringify(book);
        const blob = new Blob([json], {
            type: 'application/json'
        });
        formData.append('file', file, file.name);
        formData.append("book", blob);
        return axios.post(BASE_URL + BOOK_API + ADD_API, formData, {
            headers: {
                'Authorization': 'Bearer_' + localStorage.getItem("Authorization"),
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    editBook(book) {
        return axios.patch(BASE_URL + BOOK_API + EDIT_API, book, this.getToken())
    }

    deleteBook(id) {
        return axios.delete(BASE_URL + BOOK_API + DELETE_API + `${id}`, this.getToken())
    }

    search(filter) {
        return axios.get(BASE_URL + SEARCH_API, {
            params: {
                filter: filter
            }
        })
    }

    getToken() {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer_' + localStorage.getItem("Authorization")
            }
        }
        return options
    }
}

export default new BookService();