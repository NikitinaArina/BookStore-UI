import axios from "axios";

let BASE_URL = `http://localhost:9000/api`

class BookService{
    getBooks(){
        return axios.get(BASE_URL);
    }
    getUrl(){
        return BASE_URL;
    }
}

export default new BookService();