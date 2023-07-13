<template>
    <table>
        <tr>
            <td colspan="2"><button @click="methods.logout">로그아웃</button></td>
        </tr>
        <tr>
            <td>cuid</td>
            <td> {{ state.userInfo.cuid }} </td>
        </tr>
        <tr>
            <td>아이디</td>
            <td> {{ state.userInfo.loginId }} </td>
        </tr>
        <tr>
            <td>이름</td>
            <td> {{ state.userInfo.userName }} </td>
        </tr>
        <tr>
            <td>연락처</td>
            <td> {{ state.userInfo.phone }} </td>
        </tr>
        <tr>
            <td>이메일</td>
            <td> {{ state.userInfo.email }} </td>
        </tr>
        <tr>
            <td>주소</td>
            <td> {{ state.userInfo.addr }} {{ state.userInfo.addrDtl }}  </td>
        </tr>
        <tr>
            <td>권한</td>
            <td> {{ state.userInfo.roles }} </td>
        </tr>
    </table>
</template>

<script setup>
import { reactive, onMounted, defineEmits } from 'vue'

onMounted(() => {

})

const state = reactive({
    userInfo: {
        cuid: 'test-cuid',
        loginId: 'test-아이디',
        userName: 'test-이름',
        phone: 'test-연락처',
        email: 'test-이메일',
        addr: 'test-주소',
        addrDtl: 'test-상세주소',
        roles: 'test-권한',
    }
})

const emit = defineEmits([ 'logoutSuccess' ])

const methods = {
    logout() {
        sessionStorage.removeItem('accessToken')
        emit('logoutSuccess')
        alert('로그아웃 성공')
    }
}

</script>