import axios from "axios";
import BookService from "../services/BookService";

const USER_API = `/user`
const UPDATE_USER = '/update'
const USERS = "/getUsers"
const DELETE_USER = `/delete/`

class UserService {
    getUser(username) {
        return axios.get(BookService.getUrl() + USER_API,
            {headers: {'Authorization': 'Bearer_' + localStorage.getItem("Authorization")},
                params: {username: username}});
    }

    updateUser(user) {
        return axios.patch(BookService.getUrl() + USER_API + UPDATE_USER, user, this.getToken());
    }

    getUsers() {
        return axios.get(BookService.getUrl() + USER_API + USERS, this.getToken());
    }

    deleteUser(id) {
        return axios.delete(BookService.getUrl() + USER_API + DELETE_USER + `${id}`, this.getToken())
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

export default new UserService();