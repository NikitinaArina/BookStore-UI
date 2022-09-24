<template>
  <b-table-simple hover small caption-top responsive>
    <colgroup>
      <col>
      <col>
    </colgroup>
    <colgroup>
      <col>
      <col>
      <col>
    </colgroup>
    <colgroup>
      <col>
      <col>
    </colgroup>
    <b-thead head-variant="dark">
      <b-tr>
        <b-th>ID</b-th>
        <b-th>Active</b-th>
        <b-th>Логин</b-th>
        <b-th>Имя</b-th>
        <b-th>Фамилия</b-th>
        <b-th>Телефон</b-th>
        <b-th>Почта</b-th>
        <b-th>Адрес</b-th>
        <b-th>Город</b-th>
        <b-th>Роль</b-th>
        <b-th></b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <b-tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>
          {{user.active}}
        </td>
        <td>{{ user.username||'не найдено' }}</td>
        <td>{{ user.firstName||'не найдено' }}</td>
        <td>{{ user.lastName||'не найдено' }}</td>
        <td>{{ user.phone||'не найдено' }}</td>
        <td>{{ user.email||'не найдено' }}</td>
        <td>{{ user.address||'не найдено' }}</td>
        <td>{{ user.country||'не найдено' }}</td>
        <td>
          <p v-for="role in user.roles" :key="role">
            {{ role }}
          </p>
        </td>
        <td>
          <p class="edit">
            <router-link :to="{name:'edit', params: {id: user.id, user: user}}">Редактировать</router-link>
          </p>
          <button type="button" @click="userDelete(user.id)">Удалить</button>
        </td>
      </b-tr>
    </b-tbody>
  </b-table-simple>
</template>

<script>
import UserService from "../services/UserService";

export default {
  props: ['users'],
  data() {
    return {
      isSuccess: false
    }
  },
  created() {
  },
  methods: {
    userDelete(id) {
      UserService.deleteUser(id).then(res => {
        if(res.status === 200) {
          window.location.reload()
        }
      })
    },
  }
}
</script>

<style scoped>
p.edit a{
  color: black;
}
</style>