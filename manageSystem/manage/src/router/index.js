import Vue from 'vue'
import VueRouter from 'vue-router'


import Login from '../components/login/Login'
import register from '../components/login/register'

import homePage from '../components/managePage/homePage'
import customerMainPage from '../components/managePage/mainPage/customer/customerMainPage'
import sourceEdit from '../components/managePage/mainPage/customer/sourceEdit'

import customerOrder from '../components/managePage/mainPage/customer/customerOrder'
import houseSourceList from '../components/managePage/mainPage/houseSource/houseSourceList'
import comment from '../components/managePage/mainPage/comment/comment'
import user from '../components/managePage/mainPage/userLiving/user'

Vue.use(VueRouter)

const router = new VueRouter({
	routes:[
		{
			path:'/',
			name:'login',
			component:Login,
				
		},
		{
			path:'/register',
			name:'register',
			component:register
		},
		{
			path:'/homePage',
			name:'homePage',
			component:homePage,
			children:[
				{	
					path:'customerMainPage/',
					name:'customerMainPage',
					component:customerMainPage,
				},
				{
					path:'houseSourceList/',
					name:'houseSourceList',
					component:houseSourceList
				},
				{
					path:'sourceEdit/',
					name:'sourceEdit',
					component:sourceEdit
				},
				{
					path:'comment',
					name:'comment',
					component:comment
				},
				{
					path:'customerOrder',
					name:'customerOrder',
					component:customerOrder
				},
				{
					path:'user',
					name:'user',
					component:user
				}
			]
		}
	]
})

window.router = router;






// 路由拦截
// router.beforeEach((to, from, next) =>{
// 	// console.log(to);
// 	if(to.path.indexOf('login') < 0 && !window.localStorage.getItem('access_token')){
// 		router.replace('login');
// 		next();
// 	} 
// 	next();
// })

export default router;
