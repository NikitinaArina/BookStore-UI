<template>
  <div class="h-100">
    <b-form ref="login" class="mx-auto my-auto w-25">
      <b-form-group id="input-group-1" label="Имя пользователя" label-for="input-1">
        <b-form-input id="input-1" placeholder="user" required v-model="username"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Пароль" label-for="input-2">
        <b-form-input id="input-2" type="password" placeholder="******" required v-model="password"></b-form-input>
      </b-form-group>

      <b-button type="button" variant="primary" @click="onSubmit">Войти</b-button>

      <div>
        <router-link to="/registration">Зарегистрироваться</router-link>
      </div>
    </b-form>
    <div class="form-group">
      <div v-if="show" class="alert alert-danger" dismissible role="alert">{{ message }}</div>
    </div>
  </div>
</template>

<script>
import AuthService from "../services/AuthService";
import {bus} from '../main.js'

export default {
  data() {
    return {
      username: "",
      password: "",
      message: "",
      show: this.isShow()
    }
  },
  methods: {
    onSubmit() {
      AuthService.login(this.username, this.password).then(res => {
        if (res.status === 200) {
          this.$refs.login.reset();
          let jwtResponse = res.data
          localStorage.setItem('Authorization', jwtResponse.jwttoken)
          localStorage.setItem('username', jwtResponse.name)
          localStorage.setItem('isAdmin', jwtResponse.admin)
          localStorage.setItem('isManager', jwtResponse.manager)
          bus.$emit('logged', 'User logged')
          this.$router.push({path: '/profile'})
        }
      })
    },
    isShow() {
      if (this.message) return true
      else return false;
    }
  },
  mounted() {
    bus.$on('error', () => {
      this.show = this.isShow()
    })
  },
}
</script>

<style scoped>
div a {
  color: black;
}
</style>