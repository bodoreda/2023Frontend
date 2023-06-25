<template>
  <div class="header">
    <router-link to="/Main">메인</router-link> |
    <router-link to="/Nicepay">NicePay</router-link> |
    <router-link to="/Login">로그인</router-link> |
  </div>
</template>

<style scoped>
    .header {
        color: white;
        background-color: #42b883;
        display: flex;
        padding: 8px;
    }
    .header .router-link-exact-active {
        color: #354953;
    }
    .header a {
        color: white;
        margin: 5px;
    }
</style>