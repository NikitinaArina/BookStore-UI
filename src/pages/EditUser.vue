<template>
  <div>
    <b-form ref="login" class="mx-auto my-auto w-25">
      <b-form-group id="input-group-1" label="Логин" label-for="input-1">
        <b-form-input id="input-1" :placeholder=userN.username :v-model="userN.username"></b-form-input>
      </b-form-group>
      <p v-for="role in allRoles" :key="role.text">
        <label>
          <input
              type="checkbox"
              :checked="role.checked"
              :value="role.text"
              @click="checkboxToggle(role)"/>
          {{ role.text }}
        </label>
      </p>

      <b-button type="button" variant="primary" @click="onSubmit">Сохранить</b-button>
    </b-form>
  </div>
</template>
<q></q>
<script>
import UserService from "../services/UserService";

export default {
  props: ['user'],
  data() {
    return {
      allRoles: [
        {text: 'USER', value: 'USER', checked: false},
        {text: 'MANAGER', value: 'MANAGER', checked: false},
        {text: 'ADMIN', value: 'ADMIN', checked: false}
      ],
      updateUser: [],
      userN: this.user
    }
  },
  created() {
    let userRoles = this.userN.roles;

    for (let role in this.allRoles) {
      if (userRoles.includes(this.allRoles[role].text)) {
        this.allRoles[role].checked = true;
        this.updateUser.push(this.allRoles[role].text)
      }
    }
  },
  methods: {
    onSubmit() {
      this.userN.roles = this.updateUser

      UserService.updateUser(this.userN).then(res => {
        if(res.status === 200) {
          this.userN = res.data
        }
      })
    },
    checkboxToggle(role) {
      if (!this.updateUser.includes(role.text)) {
        this.updateUser.push(role.text)
      } else {
        let index = this.updateUser.indexOf(role.text)
        this.updateUser.splice(index, 1)
      }
    }
  }
}
</script>

<style scoped>

</style>