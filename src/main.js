import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
// import { setCookie, getCookie, delCookie } from "./assets/cookie.js"
import VueCookies from 'vue-cookies';


Vue.use(ElementUI);
Vue.use(VueCookies)
Vue.config.productionTip = false

// Vue.prototype.$cookieStore = { setCookie, getCookie, delCookie }


new Vue({
    router,
    render: h => h(App)
}).$mount('#app')