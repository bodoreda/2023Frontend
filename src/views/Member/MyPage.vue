<template>
    <table>
        <tr>
            <td><button @click="methods.logout">로그아웃</button></td>
            <td><button @click="methods.getUserInfoTest">회원정보</button></td>
        </tr>
        <tr>
            <td>cuid</td>
            <td> {{ props.userInfo.cuid }} </td>
        </tr>
        <tr>
            <td>아이디</td>
            <td> {{ props.userInfo.login_id }} </td>
        </tr>
        <tr>
            <td>이름</td>
            <td> {{ props.userInfo.user_name }} </td>
        </tr>
        <tr>
            <td>연락처</td>
            <td> {{ props.userInfo.phone }} </td>
        </tr>
        <tr>
            <td>이메일</td>
            <td> {{ props.userInfo.email }} </td>
        </tr>
        <tr>
            <td>주소</td>
            <td> {{ props.userInfo.addr }} {{ props.userInfo.addr_dtl }}  </td>
        </tr>
        <tr>
            <td>권한</td>
            <td> {{ props.userInfo.roles }} </td>
        </tr>
    </table>
</template>

<script setup>
import { onMounted, defineProps, defineEmits } from 'vue'
import api from '@/api/service.js'

onMounted(() => {
    
})

const props = defineProps({
    userInfo: {
        type: Object,
        required: true
    }
})

const emit = defineEmits([ 'logoutSuccess' ])

const methods = {
    logout() {
        sessionStorage.removeItem('accessToken')
        emit('logoutSuccess')
        alert('로그아웃 성공')
    },
    getUserInfoTest() {
        api.post('/v1/member/getUserInfo').then((res) => {
            console.log(res)
        })
    }
}

</script>

<style scoped>
table, td, th {
  border : 1px solid black;
  border-collapse : collapse;
  padding: 3px;
  text-align: center;
};
</style>