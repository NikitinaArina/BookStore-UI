<template>
  <div>
    <b-form ref="register" class="mx-auto my-auto w-25">
      <b-form-group class="mt-2" id="input-group-1" label="Имя" label-for="firstName">
        <b-form-input id="firstName" placeholder="Иван" required v-model="user.firstName"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Фамилия" label-for="lastName">
        <b-form-input id="lastName" placeholder="Иванов" required v-model="user.lastName"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Имя пользователя" label-for="username">
        <b-form-input id="username" placeholder="user" required v-model="user.username"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Почта" label-for="email">
        <b-form-input id="email" type="email" placeholder="user@example.com" required
                      v-model="user.email"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label="Телефон" label-for="phone">
        <b-form-input id="phone" type="tel" placeholder="88008008080" required v-model="user.phone"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-6" label="Пароль" label-for="password">
        <b-form-input id="password" type="password" placeholder="******" required
                      v-model="user.password"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-7" label="Подтвердите пароль" label-for="password2">
        <b-form-input id="password2" type="password" placeholder="******" required v-model="password2"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-8" label="Адрес" label-for="address">
        <b-form-input id="address" v-model="user.address"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-9" label="Город" label-for="country">
        <b-form-input id="country" v-model="user.country"></b-form-input>
      </b-form-group>

      <b-button type="button" variant="primary" @click="onSubmit">Submit</b-button>

      <div class="form-group">
        <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
      </div>
    </b-form>
  </div>
</template>

<script>
import AuthService from "../services/AuthService";

export default {
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        address: "",
        country: ""
      },
      password2: ""
    }
  },
  methods: {
    onSubmit() {
      let user = this.user;
      AuthService.register(user).then(res => {
        console.log(res.data.json)
        if(res.status===200){
          this.$refs.register.reset();
        }
      })
    }
  }
}
</script>

<style scoped>

</style>