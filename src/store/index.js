import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [
        createPersistedState({
            storage: window.sessionStorage,
        }),
    ],
    state: {
        cart: []
    },
    getters: {
        getCart: state => state.cart,
        getCartLength: (state, getters) => {
            return getters.getCart.length
        }
    },
    actions: {
        async fetchCart({commit}) {
            await axios.get(`cart`).then(response => {
                commit('setCart', response.data)
            })
        },
        async addItemToCart({commit}, cartRow) {
            commit('addProductToCart', cartRow)

        },
        async deleteItemFromCart({commit}, cartRow) {
            commit('deleteItemFromCart', cartRow)

        }
    },
    mutations: {
        setCart: (state, cart) => (state.cart = cart),
        addProductToCart: (state, cartRow) => {
            let flag = false;
            if(state.cart.length === 0) {
                state.cart.unshift(cartRow);
                return;
            }
            for (let i = 0; i < state.cart.length; i++) {
                if (JSON.stringify(state.cart[i].book) === JSON.stringify(cartRow.book)) {
                    let quantity = state.cart[i].quantity;
                    state.cart.splice(i, 1);
                    if(quantity+cartRow.quantity <= cartRow.book.quantity) {
                        cartRow.quantity = cartRow.quantity + quantity
                        state.cart.unshift(cartRow);
                    }
                    flag = true;
                }
            }
            if(!flag) {
                state.cart.unshift(cartRow);
            }
        },
        deleteItemFromCart: (state, cartRow) => {
            for (let i = 0; i < state.cart.length; i++) {
                if (state.cart[i].book === cartRow.book && state.cart[i].quantity === cartRow.quantity) {
                    state.cart.splice(i, 1);
                }
            }
        }
    }
})