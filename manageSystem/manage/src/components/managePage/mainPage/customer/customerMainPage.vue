
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
			<ul>
				<li class="citySelect citySearch">
					<el-select v-model="value1" @change="citySelect" clearable placeholder="地域城市">
					    <el-option
					      v-for="item in $store.state.adressObj"
					      :key="item.value"
					      :label="item.label"
					      :value="item.label">
					    </el-option>
				  	</el-select>
				</li>
				<li class="areaSelect areaGet">
					<el-select v-model="value2" @change="citySelect" clearable placeholder="房型选择">
					    <el-option
					      v-for="item in $store.state.houseTypeObj"
					      :key="item.value"
					      :label="item.label"
					      :value="item.label">
					    </el-option>
				  	</el-select>
				</li>
				<li class="areaSelect room_qtyObj">
					<el-select v-model="value3" @change="citySelect" clearable placeholder="房间数量">
					    <el-option
					      v-for="item in $store.state.room_qtyObj"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
				  	</el-select>
				</li>
				<li class="areaSelect room_sizeObj">
					<el-select v-model="value4" @change="citySelect" clearable placeholder="房间尺寸">
					    <el-option
					      v-for="item in $store.state.room_sizeObj"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
				  	</el-select>
				</li>
				<li class="areaSelect bed_qtyObj">
					<el-select v-model="value5" @change="citySelect" clearable placeholder="床铺数量">
					    <el-option
					      v-for="item in $store.state.bed_qtyObj"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
				  	</el-select>
				</li>
				<li class="areaSelect priceObj">
					<el-select v-model="value6" @change="citySelect" clearable placeholder="价格">
					    <el-option
					      v-for="item in $store.state.priceObj"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
				  	</el-select>
				</li>

				<li class="list_title1">
					<el-button type="primary" @click = 'selectReset'>重置</el-button>
				</li>
			</ul>
			<p class="houseSourceList">房源列表</p>
			
			<div class="tableList">
				<table class="tblist">
					<thead>
						<tr>
							<th v-for='(value,key) in $store.state.houseList[0]' v-text = "sourceDataSet[key]" v-if="(newFilter.indexOf(key) >=0)"></th>
						</tr>
					</thead>
					<tbody class="houseTbody">
						<tr v-for='(value,index) in $store.state.houseList'>
							<td v-for="(item,key) in value" v-text = "item" v-if="newFilter.indexOf(key) >=0"></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<el-pagination
	        @current-change="handleCurrentChange"
	        background
	        layout="prev, pager, next"
	        :total="$store.state.pageNumber*10">
        </el-pagination>
        <span :view-id="urlParamsChange"></span>
	</div>
</template>



<script>

	import http from '../../../../httpClient/httpClient'
	import datePicker1 from '../datePicker1'
	import '../houseSource/houseSource.scss'

	export default{
		data(){
			return {
				input:'',
				housedatas:this.houseData || '',
				value1: '',
				value2:'',
				value3:'',
				value4:'',
				value5:'',
				value6:'',
				page:'',
				qty:'',
				totalPage:'',
				sourceDataSet:{
					product_id:'房子序号',
					adress:'区域',
					title:'标题',
					houseType:'房子类型',
					room_size:'房间尺寸',
					room_qty:'房间数量',
					bed_qty:"床位",
					price:'价格/每晚',
					owner_name:'房东',
				},
				newFilter:[
					'product_id',
					'adress',
					'title',
					'houseType',
					'room_size',
					'room_qty',
					'bed_qty',
					'price',
					'owner_name'
				]
				
			}
		},
		components:{
			datePicker1,
		},
		mounted(){
			if(this.$route.query.totalPage){
				return;
			}else{
				var page = this.$route.query.page;
				var qty = this.$route.query.qty;
				this.$store.dispatch('getHouseMsg',{path:'getCustomerMsg/',page:page,qty:qty});
			}
		},
		methods:{
			citySelect(){

				var arrs = [{
						adress:this.value1,
						houseType:this.value2,
						room_qty:this.value3,
						room_size:this.value4,
						bed_qty:this.value5,
						price:this.value6
					}];

				

				http.get('selectSource/',{message:arrs}).then((res,err) => {
					if(err){
						return;
					}
					this.$store.state.houseList = res.data.data;
					window.lzfilter(this.$store,res);
				})
			},
			selectReset(){
				this.value1='';
				this.value2='';
				this.value3='';
				this.value4='';
				this.value5='';
				this.value6='';
				this.citySelect();
			},
			handleCurrentChange(page){
				this.$router.push({name:'customerMainPage',query:{page:page,qty:10,totalPage:26}});
			}
		},
		computed:{
			houseData:{
				get(){
					return this.$store.state.houseList;
				}
			},
			urlParamsChange:function(){
				// console.log(4444444444);
	   			this.page = this.$route.query.page;
				this.qty = this.$route.query.qty;
				this.totalPage = this.$route.query.totalPage;

				var page = this.$route.query.page;
				var qty = this.$route.query.qty;
				var totalPage = this.$route.query.totalPage;
				if(totalPage){
		            http.get('getCustomerMsg/',{page:page,qty:qty,totalPage:totalPage}).then((res,err) => {
						if(err){
							return;
						}

					// console.log('1212',localStorage.getItem('total'));
					var total = JSON.parse(localStorage.getItem('total'));
					var state = this.$store.state;
					console.log(total);
						state.adressObj = total.adressObj;
						state.room_qtyObj = total.room_qtyObj;
						state.bed_qtyObj = total.bed_qtyObj;
						state.room_sizeObj = total.room_sizeObj;
						state.priceObj = total.priceObj;
						state.houseTypeObj = total.houseTypeObj;

						state.houseList = res.data.data;
						state.pageNumber = res.data.totalPage;
						// window.lzfilter(this.$store,res);
					})
				}
				return this.page;
			}
			
		}
	}
</script>


<style land='scss'>
    .tableList tr{
		border-bottom:1px solid #ebeef5;
    
    }
	.tableList tbody tr{
		border-left:1px solid #ebeef5;
	}

	.tableList th{
	    color:#909399;
	    font-size:14px;
	    text-align:center;
	}
	.tableList td{
		color:#606266;
	    font-size:14px;
	    border-right:1px solid #ebeef5;
	}
</style>

