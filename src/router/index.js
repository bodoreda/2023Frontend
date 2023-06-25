import { createWebHistory, createRouter } from "vue-router"
import Main from "@/views/Main/Main.vue"
import NicePay from "@/views/NicePay/NicePay.vue"
import Login from "@/views/Member/Login.vue"

const routes = [
    {
        path: '/Main',
        name: 'Main',
        component: Main,
    },
    {
        path: '/NicePay',
        name: 'Nicepay',
        component: NicePay,
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router