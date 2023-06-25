<template>
  <div>
    <h3>취소결과</h3>
    <table>
        <tr>
            <th>결과코드</th>
            <td>{{props.resultParams.resultCode}}</td>
        </tr>
        <tr>
            <th>결과메세지</th>
            <td>{{props.resultParams.resultMsg}}</td>
        </tr>
        <tr>
            <th>취소금액</th>
            <td>{{props.resultParams.cancelAmt}}</td>
        </tr>
        <tr>
            <th>취소일</th>
            <td>{{props.resultParams.cancelDate}}</td>
        </tr>
        <tr>
            <th>취소시간</th>
            <td>{{props.resultParams.cancelTime}}</td>    
        </tr>   
    </table>
  </div>
</template>

<script setup>
import { defineProps, onMounted } from 'vue'

onMounted(() => {
    
})

const props = defineProps({
    resultParams: {
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