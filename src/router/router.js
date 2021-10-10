import VueRouter from 'vue-router';
import table from '../page/table.vue';
import index from '../page/index.vue';
import login from '../page/login.vue';
import home from '../page/Home.vue';
import about from '../page/About.vue';

const routes = [
    {
        path:"/login",
        component:login
    },
	{
		path:"/home",
		component:home
	},
	{
		path:"/about",
		component:about
	},
    {
        path: "/table",
        component: table
    },
    {
        path: '/index',
        component: index
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