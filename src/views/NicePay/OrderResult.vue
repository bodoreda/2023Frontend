<template>
  <div>
    <h3>주문결과</h3>
    <table>
        <tr>
            <th>결과내용</th>
            <td>{{props.orderResult.resultMsg}}</td>
        </tr>
        <tr>
            <th>결제수단</th>
            <td>{{props.orderResult.payMethod}}</td>
        </tr>
        <tr>
            <th>상품명</th>
            <td>{{props.orderResult.goodsName}}</td>
        </tr>
        <tr>
            <th>결제금액</th>
            <td>{{props.orderResult.amt}}</td>
        </tr>
        <tr>
            <th>구매자 이름</th>
            <td>{{props.orderResult.buyerName}}</td>
        </tr>  
        <tr>
            <th>구매자 이메일</th>
            <td>{{props.orderResult.buyerEmail}}</td>
        </tr>  
        <tr>
            <th>은행명</th>
            <td>{{props.orderResult.vbankBankName}}</td>
        </tr>
        <tr>
            <th>가상계좌</th>
            <td>{{props.orderResult.vbankNum}}</td>
        </tr>
        <tr>
            <th>가상계좌만료일</th>
            <td>{{props.orderResult.vbankExp}}</td>
        </tr>
    </table>
    <p>*테스트 아이디인경우 당일 오후 11시 30분에 취소됩니다.</p>
  </div>
</template>

<script setup>
import { defineProps, onMounted } from 'vue'

onMounted(() => {
    
})

const props = defineProps({
    orderResult: {
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