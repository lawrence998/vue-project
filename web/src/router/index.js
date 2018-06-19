import Vue from 'vue'
import VueRouter from 'vue-router'

import pay from '../components/pay/pay'
import ordersus from '../components/ordersus/ordersus'
import axios from 'axios'
import paysus from '../components/paysus/paysus'
import Login from '../components/login/Login'
import Register from '../components/register/register'
import Users from '../components/users/Users'
import orderPage from '../components/orderPage/orderpage'
import HomePage from '../components/homePage/homePage'
import Detail from '../components/detail/detail'
import ListPage from '../components/listPage/listPage'
import News from '../components/news/news'
import Order from '../components/detail/order/order'
import bannerDetail from '../components/homePage/carousel/detail0'
import bannerDetail1 from '../components/homePage/carousel/detail1'
import bannerDetail2 from '../components/homePage/carousel/detail2'
import searchDetail from '../components/homePage/search/searchDetail'
import orderlist from '../components/orderlist/orderlist'

Vue.use(VueRouter);


const router = new VueRouter({
		routes:[
			{
				path:'/Login',
				name:'Login',
				meta:{index: 9},
				component:Login
			},
			{
				path:'/Register',
				name:'Register',
				meta:{index: 9},
				component:Register
			},
			{

				path:'/Users',
				name:'Users',
				meta:{index: 5},
				component:Users
			},
			{
				path:'/',
				name:'HomePage',
				meta:{index: 0},
				component:HomePage
			},
			{
				path:'/Detail/:id',
				meta:{index: 3},
				name:'Detail',
				component:Detail
			},
			{
				path:'/ListPage/:city',
				meta:{index: 2},
				name:'ListPage',
				component:ListPage
			},
			{
				path:'/orderPage',
				name:'orderPage',
				meta:{index: 7},
				component:orderPage
			},
			{
				path:'/orderlist',
				name:'orederlist',
				meta:{index: 6},
				component:orderlist
			},
			{
				path:'/pay',
				name:'pay',
				meta:{index: 8},
				component:pay
			},
			{
				path:'/paysus',
				name:'paysus',
				meta:{index: 9},
				component:paysus
			},
			{
				path:'/ordersus',
				name:'ordersus',
				component:ordersus
			},
			{
				path:'/carousel/detail0',
				name:'detail',
				meta:{index: 1},
				component:bannerDetail
			},
			{

				path:'/carousel/detail1',
				name:'detail1',
				meta:{index: 1},
				component:bannerDetail1
			},
			{

				path:'/carousel/detail2',
				name:'detail2',
				meta:{index: 1},
				component:bannerDetail2
			},
			{
				path:'/search/searchDetail',
				name:'searchDetail',
				meta:{index: 1},
				component:searchDetail
			},
			{
				path:'/News',
				name:'News',
				meta:{index: 3},
				component:News
			},
			{
				path:'/Order/:id',
				name:'Order',
				meta:{index: 4},
				component:Order
			}
		]
})


export default router;