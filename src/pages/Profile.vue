<template>
  <b-form ref="login" class="mx-auto my-auto w-25">
    <b-form-group id="input-group-1" label="Email" label-for="input-1">
      <b-form-input id="input-1" type="email" :placeholder=user.email v-model="user.email"></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-1" label="Телефон" label-for="input-1">
      <b-form-input id="input-1" :placeholder=user.phone v-model="user.phone"></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-2" label="Пароль" label-for="input-2">
      <b-form-input id="input-2" type="password" placeholder="******" v-model="password"></b-form-input>
    </b-form-group>

    <b-button type="button" variant="primary" @click="onSubmit">Сохранить</b-button>
  </b-form>
</template>

<script>
import UserService from "../services/UserService";
import { bus } from '../main.js'

export default {
  data() {
    return {
      username: "",
      user: null,
      password: "",
      isUpdated: false,
      isSuccess: false
    }
  },
  created() {
    this.username = localStorage.getItem('username')
    UserService.getUser(this.username).then(res => {
      this.user = res.data
    })
    bus.$on('updated', () => {
      this.isUpdated = this.isUserUpdated()
    })
  },
  methods: {
    onSubmit() {
      this.user.password = this.password
      UserService.updateUser(this.user).then(res => {
        if(res.status === 200) {
          this.user = res.data
          this.isSuccess = true
          bus.$emit('updated', 'User updated')
        }
      })
    },
    isUserUpdated() {
      return this.isSuccess;
    }
  }
}
</script>

<style scoped>

</style>