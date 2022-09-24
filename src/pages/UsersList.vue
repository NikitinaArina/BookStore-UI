<template>
  <div>
    <user-row :users="users"/>
  </div>
</template>

<script>
import UserService from "../services/UserService";
import UserRow from "../components/UserRow";

export default {
  components: {UserRow},
  data() {
    return {
      users: []
    }
  },
  methods: {
    getUsers() {
      UserService.getUsers().then((response) => {
        this.users = response.data;
      });
    }
  },
  created() {
    this.getUsers();
  }
}
</script>

<style scoped>

</style>