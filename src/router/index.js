import { createWebHistory, createRouter } from "vue-router"
import Main from "@/views/Main/Main.vue"
import Login from "@/views/Member/Login.vue"
import NicePay from "@/views/NicePay/NicePay.vue"

const routes = [
    {
        path: '/Main',
        name: 'Main',
        component: Main,
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/NicePay',
        name: 'Nicepay',
        component: NicePay,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router