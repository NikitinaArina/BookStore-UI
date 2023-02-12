<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand class="ml-2">
      <router-link to="/">Book shop</router-link>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-brand>
        <router-link to="/">Книги</router-link>
      </b-navbar-brand>
      <b-navbar-brand v-if="isAdmin === true">
        <router-link to="/users">Пользователи</router-link>
      </b-navbar-brand>
      <b-navbar-brand v-if="isAdmin === true || isManager === true">
        <router-link to="/books">Добавить книгу</router-link>
      </b-navbar-brand>
      <b-navbar-brand v-if="isAdmin === true || isManager === true">
        <router-link to="/orders">Заказы</router-link>
      </b-navbar-brand>
      <b-navbar-brand v-else>
        <router-link to="/orders" v-if="isLogged === true">Мои заказы</router-link>
      </b-navbar-brand>
      <b-navbar-brand>
        <router-link to="/cart">Корзина</router-link>
      </b-navbar-brand>

      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model="filter"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="button" @click="search">Search</b-button>
        </b-nav-form>

        <b-navbar-nav class="ml-2 mr-2">
          <router-link to="/profile" v-if="isLogged === true">Профиль</router-link>
          <router-link to="/login" v-else>Log in</router-link>
          <b-button href="#" @click="singout" v-if="isLogged === true">Log out</b-button>
        </b-navbar-nav>

      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import {bus} from '../main.js'
import BookService from "@/services/BookService";

export default {
  data() {
    return {
      isLogged: this.checkIfIsLogged(),
      isAdmin: this.checkIsUserAdmin(),
      isManager: this.checkIsUserManager(),
      user: null,
      filter: ""
    }
  },
  created() {
    bus.$on('logged', () => {
      this.isLogged = this.checkIfIsLogged()
      this.isAdmin = this.checkIsUserAdmin()
      this.isManager = this.checkIsUserManager()
    })
  },
  methods: {
    singout() {
      localStorage.removeItem('Authorization')
      localStorage.removeItem('isAdmin')
      localStorage.removeItem('isManager')
      this.isLogged = this.checkIfIsLogged()
      this.isAdmin = this.checkIsUserAdmin()
      this.isManager = this.checkIsUserManager()
      this.$router.push('/')
    },
    checkIfIsLogged() {
      let token = localStorage.getItem('Authorization')
      return !!token;
    },
    checkIsUserAdmin() {
      let isAdmin = localStorage.getItem('isAdmin')
      return isAdmin === 'true';
    },
    checkIsUserManager() {
      let isManager = localStorage.getItem('isManager')
      return isManager === 'true';
    },
    search() {
      BookService.search(this.filter).then(res => {
        if (res.status === 200) {
          this.$root.$emit('filteredBooks', res.data)
        }
      })
    }
  }
}
</script>

<style>
a.router-link-active {
  text-decoration: none;
  color: white;
}

a {
  text-decoration: none;
  color: white;
  align-self: center;
  padding-right: 8px;
}

a:hover {
  text-decoration: none;
  color: white;
}
</style>