import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/index.vue')
    },
    {
        path: '/',
        name: 'Layout',
        redirect: "/home",
        component: () => import('../views/Layout/index.vue'),
        children: [
            {
                path: "/home",
                name: 'home',
                component: () => import('../views/home/index.vue'),
                meta:{
                    title:"首页"
                }
            },
            {
                path: "/memberOrder",
                name: 'memberOrder',
                component: () => import('../views/financeManage/memberOrder.vue'),
                meta:{
                    title:"会员订单"
                }
            },
            {
                path: "/stockQuery",
                name: 'stockQuery',
                component: () => import('../views/stockManage/stockQuery.vue'),
                meta:{
                    title:"库存查询"
                }
            },
            {
                path: "/user",
                name: 'user',
                component: () => import('../views/user/index.vue'),
                meta:{
                    title:"个人中心"
                }
            },
        ]
    }
]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
	const token = JSON.parse(localStorage.getItem('userInfo')) ? JSON.parse(localStorage.getItem('userInfo')).token : ''
	if(!token){
		if(to.path != '/login'){
			next({path:'/login'})
		}else{
			next()
		}
	}else{
		if(to.path == '/login'){
			next({path:'/'})
		}
	}
	next();
});

export default router
