import axios from "axios";
import BookService from "../services/BookService";

const CHECKOUT_API = '/checkout'
const CART_API = '/cart'

class CartService {

    checkout(carts) {
        let cart = JSON.stringify(carts)
        return axios.post(BookService.getUrl() + CART_API + CHECKOUT_API, JSON.parse(cart), this.getToken());
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

export default new CartService();