<template>
    <table>
        <tr>
            <td>아이디</td>
            <td><input type="text" v-model="state.signUpParams.loginId"></td>
        </tr>
        <tr>
            <td>비밀번호</td>
            <td><input type="password" v-model="state.signUpParams.encPw"></td>
        </tr>
        <tr>
            <td>이름</td>
            <td><input type="text" v-model="state.signUpParams.userName"></td>
        </tr>
        <tr>
            <td>휴대폰</td>
            <td><input type="text" v-model="state.signUpParams.phone"></td>
        </tr>
        <tr>
            <td>이메일</td>
            <td><input type="text" v-model="state.signUpParams.email"></td>
        </tr>
        <tr>
            <td colspan="2"><button style="width: 60px; height: 25px;" @click="methods.signUp">확인</button></td>
        </tr>
    </table>
</template>

<script setup>
import { reactive, onMounted, defineEmits } from 'vue'
import sha256 from 'crypto-js/sha256'
import api from '@/api/service.js'

onMounted(() => {

})

const state = reactive({
    signUpParams: {
        loginId: '',
        encPw: '',
        userName: '',
        phone: '',
        email: '',
    },
})

const emit = defineEmits([ 'signUpSuccess' ])

const methods = {
    signUp() {
        state.signUpParams.encPw = sha256(state.signUpParams.encPw).toString()
        api.post('/v1/member/signUp', state.signUpParams).then((res) => {
            for(let key in state.signUpParams) {
                state.signUpParams[key] = ''
            }
            if(res.data == 1) {
                emit('signUpSuccess')
                alert('회원가입 성공')
            }else{
                alert('회원가입 실패')
            }
        }).catch((err) => {
            console.log(err)
            for(let key in state.signUpParams) {
                state.signUpParams[key] = ''
            }
            alert('에러 : 아이디 또는 휴대폰 중복 또는 유레카 인스턴스 비활성')
        })
    },

}

</script>

<style scoped>
    table, tr, td {
        border-collapse : collapse;
        padding: 6px;
        text-align: center;
    };
    button {
        color: aqua;
    }
</style>