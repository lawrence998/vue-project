<template>
	<div>
		<div class="houseSource">
			<ul>
				<li class="data_picker">
					<datePicker1></datePicker1>
				</li>
				<li class="list_title"> : 日期选择</li>
				<li class='search_in'>
					<el-input v-model="input" placeholder="请输入查询内容"></el-input>
				</li>
				<li class="list_title1">
					<el-button type="primary">查询</el-button>
				</li>
			</ul>
			<p class="houseSourceList">房源列表</p>
			<ul v-for='(value,key) in this.$store.state.customerList'>
				<li v-for="(item,index) in value" v-text="item" v-if="item"></li>
			</ul>
		</div>
	</div>
</template>



<script>

	import datePicker1 from './datePicker1'
	import './customerMainPage.scss'

	export default{
		data(){
			return {
				datas:'',
				input:''
			}
		},
		components:{
			datePicker1,
		},
		mounted(){
			var para = this.$route.params.msg;
			this.$store.dispatch('getCustomerMsg',{path:'getCustomerMsg/',message:para});
		},
		methods:{
			getSearch(){

			}
		}
	}
</script>