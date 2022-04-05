// import Session from 'koa-session/lib/session'
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
// import { setCookie, getCookie, delCookie } from "../assets/cookie.js"

Vue.use(VueRouter)
    // Vue.prototype.$cookieStore = { setCookie, getCookie, delCookie }


const routes = [{
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


// router.beforeEach((to, from, next) => {
//     if (to.name == 'home' && ) next({ name: 'login' })
//     else next()
// })

router.beforeEach((to, from, next) => {
    // console.log(window.$cookies.get("username"))
    // 
    if (to.path == "/") {
        if ((window.$cookies.get("username") == 666)) {
            next();
        } else {
            next("/login")
        }
    } else {
        next();
    }

})

export default router