<template>
  <div>
    <h3>주문조회</h3>
    <table>
      <thead>
        <tr>
          <th>거래ID</th>
          <th>주문ID</th>
          <th>상품</th>
          <th>가격</th>
          <th>결제수단</th>
          <th>가상계좌은행</th>
          <th>가상계좌번호</th>
          <th>가상계좌만료일시</th>
          <th>주문상태</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in props.orderList.list" :key="item.tid">
          <td>{{ item.tid }}</td>
          <td>{{ item.moid }}</td>
          <td>{{ item.goods }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.payMethod }}</td>
          <td>{{ item.vbankName }}</td>
          <td>{{ item.vbankNum }}</td>
          <td>{{ item.vbankExp }}</td>
          <td>{{ item.odStatus }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps, onMounted } from 'vue'

onMounted(() => {
    
})

const props = defineProps({
    orderList: {
        type: Array,
        required: true
    }
})

</script>

<style scoped>
table, td, th {
  border : 1px solid black;
  border-collapse : collapse;
  padding: 3px;
  text-align: center;
};
</style>