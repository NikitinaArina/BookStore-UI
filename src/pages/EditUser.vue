<template>
  <div>
    <b-form ref="login" class="mx-auto my-auto w-25">
      <b-form-group id="input-group-1" label="Логин" label-for="input-1">
        <b-form-input id="input-1" :placeholder=user.username :v-model="user.username"></b-form-input>
      </b-form-group>
      <p v-for="role in allRoles" :key="role">
        <label>
          <input
              type="checkbox"
              :v-model="role.text"
              :checked="role.checked"
              :value="role.text"/>
          {{ role.text }}
        </label>
      </p>

      <b-button type="button" variant="primary" @click="onSubmit">Сохранить</b-button>
    </b-form>
  </div>
</template>
<q></q>
<script>
export default {
  props: ['user'],
  data() {
    return {
      allRoles: [
        {text: 'USER', value: 'USER', checked: false},
        {text: 'MANAGER', value: 'MANAGER', checked: false},
        {text: 'ADMIN', value: 'ADMIN', checked: false}
      ]
    }
  },
  created() {
    let userRoles = this.user.roles;

    for (let role in this.allRoles) {
      if (userRoles.includes(this.allRoles[role].text)) {
        this.allRoles[role].checked = true;
      }
    }
  }
}
</script>

<style scoped>

</style>