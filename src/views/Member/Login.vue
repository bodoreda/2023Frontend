<template>
    <table>
        <tr>
            <td colspan="2"><input type="text" placeholder="아이디" v-model="state.loginParams.loginId"></td>
        </tr>
        <tr>
            <td colspan="2"><input type="password" placeholder="비밀번호" v-model="state.loginParams.encPw"></td>
        </tr>
        <tr>
            <td>
                <span>아이디 저장</span>
                <input type="checkbox">
            </td>
            <td>
                <span>로그인 유지</span>
                <input type="checkbox">
            </td>
        </tr>
        <tr>
            <td><button @click="methods.login">로그인</button></td>
            <td><button @click="methods.goSignUp">회원가입</button></td>
        </tr>
    </table>
    <br>
    <sign-up v-show="state.show.signUpShow" @signUpSuccess="methods.handleSignUpSuccess"/>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import sha256 from 'crypto-js/sha256'
import axios from 'axios'
import signUp from './SignUp.vue'

onMounted(() => {

})

const state = reactive({
    loginParams: {
        loginId: '',
        encPw: '',
    },
    show: {
        signUpShow: false,
    }
})

const methods = {
    login() {
        if(state.loginParams.encPw) {
            state.loginParams.encPw = sha256(state.loginParams.encPw).toString()
        }
        axios.post('/v1/member/login', state.loginParams).then((res) => {
            for(let key in state.loginParams) {
                state.loginParams[key] = ''
            }
            if(res.data.member) {
                alert("로그인 성공")
                window.location.href = '/main'
            }else{
                alert("아이디와 비밀번호를 확인해주세요")
            }
        })
    },
    goSignUp() {
        state.show.signUpShow =!state.show.signUpShow
    },
    handleSignUpSuccess() {
        state.show.signUpShow = false
    },
}

</script>

<style scoped>
    table {
        margin: 15px ;
        border: 1px;
    }
    table td {
        text-align: center;
        padding: 2px;
    }
    input[type="text"], input[type="password"] {
        width: 240px;
        height: 25px;
    }
    input[type="checkbox"] {
        width: 16px;
        height: 16px;
        margin-left: 10px;
    }
    span {
        font-size: 13px;
        font-weight: bold;
    }
</style>