<template>
  <div>
    <b-table-simple hover small caption-top responsive>
      <b-thead head-variant="dark">
        <b-tr>
          <b-th>ID</b-th>
          <b-th>Дата заказа</b-th>
          <b-th>Пользователь</b-th>
          <b-th>Сумма заказа</b-th>
          <b-th>Статус заказа</b-th>
          <b-th></b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="order in orders" :key="order.id">
          <td>
            <router-link :to="{name:'order', params: {id: order.id}}"> {{ order.id }}</router-link>
          </td>
          <td>{{ new Date(order.date).toLocaleString() || 'не найдено' }}</td>
          <td>{{ order.user.username || 'не найдено' }}
            <p>ФИ: {{ order.user.lastName }} {{ order.user.firstName }}
            </p>
          </td>
          <td>{{ order.totalPrice || 'не найдено' }}</td>
          <td>{{ order.status || 'не найдено' }}</td>
          <td>
            <b-button class="mr-2" type="button" variant="primary" @click="cancelOrder(order.id)"
                      v-if="order.status === 'Создан'">Отменить заказ
            </b-button>
            <b-button class="mr-2" type="button" variant="primary" @click="confirmOrder(order.id)"
                      v-if="order.status === 'Отправлен' && !(isAdmin === true || isManager === true)">Подтвердить
            </b-button>
            <b-button class="mr-2" type="button" variant="primary" @click="sendOrder(order.id)"
                      v-if="order.status === 'Создан' && (isAdmin === true || isManager === true)">Отправить
            </b-button>
          </td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </div>
</template>

<script>
import OrderService from "../services/OrderService";

const Status = Object.freeze({Отменен: 4, Отправлен: 2, Доставлен: 3});

export default {
  props: ['orders'],
  data() {
    return {
      isAdmin: false,
      isManager: false
    }
  },
  methods: {
    cancelOrder(id) {
      OrderService.changedStatus(id, Status.Отменен).then(res => {
        if (res.status === 200) {
          window.location.reload()
        }
      })
    },
    confirmOrder(id) {
      OrderService.changedStatus(id, Status.Доставлен).then(res => {
        if (res.status === 200) {
          window.location.reload()
        }
      })
    },
    sendOrder(id) {
      OrderService.changedStatus(id, Status.Отправлен).then(res => {
        if (res.status === 200) {
          window.location.reload()
        }
      })
    },
    checkIsUserAdmin() {
      let isAdmin = localStorage.getItem('isAdmin')
      return isAdmin === 'true';
    },
    checkIsUserManager() {
      let isManager = localStorage.getItem('isManager')
      return isManager === 'true';
    }
  },
  created() {
    this.isAdmin = this.checkIsUserAdmin()
    this.isManager = this.checkIsUserManager()
  }
}
</script>

<style scoped>
a {
  color: blue;
}
</style>