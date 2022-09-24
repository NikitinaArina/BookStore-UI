import axios from "axios";
import BookService from "../services/BookService";

const REGISTER_API = '/register'
const LOGIN_API = '/authenticate'

const options = {
    headers: {'Content-Type': 'application/json'}
};

class AuthService{
    register(user){
        return axios.post(BookService.getUrl() + REGISTER_API, JSON.stringify(user), options);
    }
    login(username, password){
        return axios.post(BookService.getUrl() + LOGIN_API, {username, password}, options);
    }
}

export default new AuthService();