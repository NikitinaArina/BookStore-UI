import axios from "axios";
import BookService from "../services/BookService";

const ORDER_API = `/order`
const GET_ORDERS = '/'
const GET_ALL_ORDERS = '/getOrders'
const CHANGED_STATUS = '/changeStatus/'

class OrderService {
    getOrders() {
        return axios.get(BookService.getUrl() + ORDER_API + GET_ORDERS,
            this.getToken())
    }

    getAllOrders() {
        return axios.get(BookService.getUrl() + ORDER_API + GET_ALL_ORDERS,
            this.getToken())
    }

    getOrderLines(id) {
        return axios.get(BookService.getUrl() + ORDER_API + GET_ORDERS + `${id}`, this.getToken())
    }

    changedStatus(id, status) {
        return axios.patch(BookService.getUrl() + ORDER_API + CHANGED_STATUS + `${id}`, status, this.getToken())
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

export default new OrderService();