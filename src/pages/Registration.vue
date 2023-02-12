<template>
  <div>
    <b-form ref="register" class="mx-auto my-auto w-25" @submit.prevent="onSubmit">
      <b-form-group class="mt-2" id="input-group-1" label="Имя" label-for="firstName">
        <b-form-input id="firstName" placeholder="Иван"
                      v-model="$v.firstName.$model"
                      :class="{invalid: ($v.firstName.$dirty  && !$v.firstName.required)}"
        ></b-form-input>
        <small
            class="helper-text invalid"
            v-if="($v.firstName.$dirty  && !$v.firstName.required)"
        >Поле имя обязательное</small>
      </b-form-group>

      <b-form-group id="input-group-2" label="Фамилия" label-for="lastName">
        <b-form-input id="lastName" placeholder="Иванов" v-model="$v.lastName.$model"
                      :class="{invalid: ($v.lastName.$dirty  && !$v.lastName.required)}"
        ></b-form-input>
        <small
            class="helper-text invalid"
            v-if="($v.lastName.$dirty  && !$v.lastName.required)"
        >Поле фамилия обязательное</small>
      </b-form-group>

      <b-form-group id="input-group-3" label="Имя пользователя" label-for="username">
        <b-form-input id="username" placeholder="user" v-model="$v.username.$model"
                      :class="{invalid: ($v.username.$dirty  && !$v.username.required)}"
        ></b-form-input>
        <small
            class="helper-text invalid"
            v-if="($v.username.$dirty  && !$v.username.required)"
        >Поле логин обязательное</small>
      </b-form-group>

      <b-form-group id="input-group-4" label="Почта" label-for="email">
        <b-form-input id="email" type="email" placeholder="user@example.com"
                      v-model="$v.email.$model"
                      :class="{invalid: ($v.email.$dirty  && !$v.email.required) || ($v.email.$dirty  && !$v.email.email)}"
        ></b-form-input>
        <small
            class="helper-text invalid"
            v-if="($v.email.$dirty  && !$v.email.required)"
        >Поле почта обязательное</small>
        <small
            class="helper-text invalid"
            v-if="($v.email.$dirty  && !$v.email.email)"
        >Введите почту</small>
      </b-form-group>

      <b-form-group id="input-group-5" label="Телефон" label-for="phone">
        <b-form-input id="phone" type="tel" placeholder="88008008080" v-model="$v.phone.$model"
                      :class="{invalid: ($v.phone.$dirty  && !$v.phone.required) || ($v.phone.$dirty  && !$v.phone.isPhoneCorrect)}"
        ></b-form-input>
        <small
            class="helper-text invalid"
            v-if="($v.phone.$dirty  && !$v.phone.required)"
        >Поле телефон обязательное</small>
        <small
            class="helper-text invalid"
            v-if="($v.phone.$dirty  && !$v.phone.isPhoneCorrect)"
        >Не корректный номер</small>
      </b-form-group>

      <b-form-group id="input-group-6" label="Пароль" label-for="password">
        <b-form-input id="password" type="password" placeholder="******"
                      v-model="$v.password.$model"
                      :class="{invalid: ($v.password.$dirty  && !$v.password.required) || ($v.password.$dirty  && !$v.password.minLength)}"
        ></b-form-input>
        <small
            class="helper-text invalid"
            v-if="($v.password.$dirty  && !$v.password.required)"
        >Поле пароль обязательное</small>
        <small
            class="helper-text invalid"
            v-else-if="($v.password.$dirty  && !$v.password.minLength)"
        >Пароль должен быть не меньше 6-ти символов</small>
      </b-form-group>

      <b-form-group id="input-group-7" label="Подтвердите пароль" label-for="password2">
        <b-form-input id="password2" type="password" placeholder="******" v-model="$v.password2.$model"
                      :class="{invalid: ($v.password2.$dirty  && !$v.password2.required) || ($v.password2.$dirty  && !$v.password2.sameAsPassword)}"
        ></b-form-input>
        <small
            class="helper-text invalid"
            v-if="($v.password2.$dirty  && !$v.password2.sameAsPassword)"
        >Пароли должны совпадать</small>
      </b-form-group>

      <b-form-group id="input-group-8" label="Адрес" label-for="address">
        <b-form-input id="address" v-model="address"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-9" label="Город" label-for="country">
        <b-form-input id="country" v-model="country"></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import AuthService from "../services/AuthService";
import {required, sameAs, minLength, email} from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      address: "",
      country: "",
      password2: ""
    }
  },
  validations: {
    firstName: {required},
    lastName: {required},
    username: {required},
    email: {required, email},
    phone: {required, isPhoneCorrect(phone) {
        const regex = /^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/;
        return regex.test(phone);
      }},
    password: {
      required,
      minLength: minLength(6)
    },
    password2: {
      required,
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    onSubmit() {
      this.$v.$touch();
      if (this.$v.$pending || this.$v.$error) return

      let user = {
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.username,
        email: this.email,
        phone: this.phone,
        password: this.password,
        address: this.address,
        country: this.country,
      }

      AuthService.register(user).then(res => {
        console.log(res.data.json)
        if (res.status === 200) {
          this.$refs.register.reset();
          this.$router.push({path: '/login'})
        }
      })
    }
  }
}
</script>

<style scoped>

</style>