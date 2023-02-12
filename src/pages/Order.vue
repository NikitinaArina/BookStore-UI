<template>
  <div>
    <router-link to="/orders"><b-button class="ml-2 mr-4 mt-2 mb-2">Назад</b-button></router-link>

    <b-table-simple hover small caption-top responsive>
      <b-thead head-variant="dark">
        <b-tr>
          <b-th>Книга</b-th>
          <b-th>Количество</b-th>
          <b-th>Цена</b-th>
          <b-th></b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="orderLine in orderLines" :key="orderLine.id">
          <td>{{ orderLine.book.name || 'не найдено' }}
            <p>Автор: {{ orderLine.book.author || 'не найдено' }} </p>
          </td>
          <td>{{ orderLine.quantity || 'не найдено' }}
          </td>
          <td>{{ orderLine.book.price || 'не найдено' }}</td>
        </b-tr>
      </b-tbody>
      <td>
        Общая стоимость: {{ getTotalPrice() }}
      </td>
    </b-table-simple>
  </div>
</template>

<script>
import OrderService from "../services/OrderService";

export default {
  props: ['id'],
  data() {
    return {
      orderLines: []
    }
  },
  methods: {
    getOrderLines() {
      OrderService.getOrderLines(this.id).then(res => {
        this.orderLines = res.data
      })
    },
    getTotalPrice() {
      let totalPrice = 0;

      for (let i = 0; i < this.orderLines.length; i++) {
        totalPrice = totalPrice + (this.orderLines[i].quantity * this.orderLines[i].book.price)
      }

      return totalPrice;
    }
  },
  created() {
    this.getOrderLines()
  }
}
</script>

<style scoped>

</style>