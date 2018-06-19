<template>
	<div>
		<ul class="page_list">
			<span class="yyms">有鱼民宿管理系统</span>
			<li>
				<p @click = 'leftListChangeStae("houseList")'>客户信息</p>
				<ul v-show="houseList">
					<li @click = 'mainCustomerRouter'>房源列表</li>
					<li @click = 'sourceEidt'>房源编辑</li>
					<li>订单管理</li>
				</ul>
			</li>
			<li>
				<p @click = 'leftListChangeStae("userList")'>用户信息</p>
				<ul v-show="userList">
					<li @click = 'getUser'>用户</li>
				</ul>
			</li>
			<li>
				<p @click = 'order'>订单管理</p>
			</li>
			<li>
				<p @click = 'leftListChangeStae("houseMsg")'>房源信息</p>
				<ul v-show="houseMsg">
					<li @click = 'mainContainerRouter'>房源列表</li>
					<li>新增房源</li>
					<li>折扣房源</li>
				</ul>
			</li>
			<li>
				<p @click = 'leftListChangeStae("commentDeal")'>评论管理</p>
				<ul  v-show="commentDeal">
					<li @click = 'comment'>评论列表</li>
				</ul>
			</li>
			<li>
				<p @click = 'leftListChangeStae("managerDeal")'>管理员</p>
				<ul  v-show="managerDeal">
					<li>客户</li>
					<li>话务员</li>
					<li>业务员</li>
					<li>经理</li>
				</ul>
			</li>
		</ul>
	</div>
</template>


<script>
	import './pageLeft.scss'

	export default{
		data(){
			return{
				houseList:false,
				userList:false,
				houseMsg:false,
				newCustomer:false,
				managerDeal:false,
				commentDeal:false
			}
		},
		methods:{
			leftListChangeStae(parmas){
				if(this[parmas] == false){
					this[parmas] = true;
				}else{
					this[parmas] = false;
				}
			},
			mainCustomerRouter(msg1,msg2){
				this.$router.push({name:'customerMainPage',query:{page:1,qty:10}});

			},
			mainContainerRouter(){
				this.$router.push({name:'houseSourceList',query:{page:1,qty:10}});
			},
			sourceEidt(){
				// this.$router.push({name:'sourceEdit',params:{msg:0}});
				this.$router.push({name:'sourceEdit',query:{page:1,qty:10}});
			},
			comment(){
				this.$router.push({name:'comment'});
			},
			order(){
				this.$router.push({name:'customerOrder'});
			},
			getUser(){
				this.$router.push({name:"user"});
			}
		},

	}
</script>


<style>
	.yyms{
		display:block;
		padding-top:20px;
		text-align:center;
		font-size: 16px;
		font-weight:600;
		color:#fff;
	}
</style>