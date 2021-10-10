import VueRouter from 'vue-router';
import table from '../page/table.vue';
import home from '../page/home.vue';
import login from '../page/login.vue';


const routes = [
    {
        path:"/login",
        component:login
    },
    {
        path: "/table",
        component: table
    },
    {
        path: '/home',
        component: home
    },
    {
        path: '/', 
        redirect: '/login' 
    }
]
var router = new VueRouter({
    routes
})
export default router 