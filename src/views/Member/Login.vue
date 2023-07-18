<template>
    <table v-show="state.show.loginShow">
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
    <sign-up v-show="state.show.signUpShow" @signUpSuccess="methods.handleSignUpSuccess" />
    <my-page v-show="state.show.myPage" @logoutSuccess="methods.handleLogoutSuccess" :userInfo="state.userInfo" />
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import sha256 from 'crypto-js/sha256'
import axios from 'axios'
import signUp from './SignUp.vue'
import myPage from './MyPage.vue'

onMounted(() => {
    const accessToken = sessionStorage.getItem('accessToken')
    if(accessToken) {
        state.show.signUpShow = false
        state.show.loginShow = false
        state.show.myPage = true
    }
})

const state = reactive({
    loginParams: {
        loginId: '',
        encPw: '',
    },
    show: {
        signUpShow: false,
        loginShow: true,
    },
    userInfo: {

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
            if(res.headers.authorization) {
                alert("로그인 성공")
                const accessToken = res.headers.authorization
                sessionStorage.setItem('accessToken', accessToken)
                state.show.loginShow = false
                state.show.myPage = true

                // sessionStorage에 토큰을 저장하는 것은 적절하지 않음. 아래 6가지 고려 필요
                // 1. HTTPS 사용: 암호화된 HTTPS 연결을 통해 통신하는 것이 중요합니다. HTTPS는 데이터의 기밀성과 무결성을 보호하는 데 도움이 됩니다.
                // 2. HttpOnly 쿠키 사용: 토큰을 쿠키에 저장할 때 HttpOnly 속성을 설정하여 클라이언트 측에서 스크립트를 통한 접근을 막습니다. 이를 통해 XSS 공격으로부터 보호될 수 있습니다.
                // 3. 토큰 유효성 검사: 클라이언트 측에서 토큰을 검증하는 방법을 구현해야 합니다. 예를 들어, 서버에서 제공한 토큰을 서명 검증하고 만료 시간을 확인하여 유효한 토큰인지 확인해야 합니다.
                // 4. 보안 헤더 설정: 적절한 보안 헤더를 설정하여 웹 애플리케이션을 보호해야 합니다. 예를 들어, Content Security Policy (CSP), X-Content-Type-Options, X-XSS-Protection 등의 보안 헤더를 사용할 수 있습니다.
                // 5. CSRF 방어: CSRF(Cross-Site Request Forgery) 공격으로부터 보호하기 위해 적절한 CSRF 방어 메커니즘을 구현해야 합니다.
                // 6. 토큰 관리: 토큰의 안전한 저장소와 관리 메커니즘을 구현해야 합니다. 예를 들어, 서버 측에 토큰을 안전하게 저장하고, 필요한 경우 토큰을 갱신하거나 폐기할 수 있는 방법을 구현해야 합니다.

                state.userInfo = res.data.userInfo
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
    handleLogoutSuccess() {
        state.show.myPage = false
        state.show.loginShow = true
    }
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