<template>
	<div class="EditList">
		<div class="editel">
			<el-tabs type="border-card">
				<span>房源编辑:</span>
				<el-button type="primary" @click="titleHasChange('付款订单',1)">付款订单</el-button>
				<el-button type="primary" @click="titleHasChange('退款订单',0)">退款订单</el-button>
				<!-- <el-button type="primary" @click="titleHasChange('发布房源',2)">发布房源</el-button> -->
			</el-tabs>
		</div>
		<p class='titleChange'>
			<button v-text = 'titleChange'></button>
		</p>
		<div class="sourchEditList" v-model="order">
			<el-table
		      :data="order || [{houseType_ID:'暂时没有你需要的数据'}]"
			  @row-click="clickMsg"
		      style="width: 100%;height:550px;" @click='clickMsg'>
		      <el-table-column
		        prop="order_ID"
		        label="订单号"
		        width="100px">
		      </el-table-column>
		       <el-table-column
		        prop="title"
		        label="标题"
		        width="130px">
		      </el-table-column>
		       <el-table-column
		        prop="price"
		        label="价格"
		        width="100px">
		      </el-table-column>
		       <el-table-column
		        prop="city"
		        label="城市"
		        width="100px">
		      </el-table-column>
		      <el-table-column
		        prop="admin"
		        label="区域"
		        width="100px">
		      </el-table-column>
		      <el-table-column
		        prop="Business"
		        label="商圈"
		        width="100px">
		      </el-table-column>
		      <el-table-column
		        prop="air_car_Station"
		        label="附近交通"
		        width="100px">
		      </el-table-column>
		      <el-table-column
		        prop="view"
		        label="景区"
		        width="100px">
		      </el-table-column>
		      <el-table-column
		        prop="begliving_room"
		        label="厅/卧室"
		        width="100px">
		      </el-table-column>
		      <el-table-column
		        prop="beg_count"
		        label="床位"
		        width="100px">
		      </el-table-column>
		      <el-table-column
		        prop="people_count"
		        label="适住人数"
		        width="100px">
		      </el-table-column>
		      <el-table-column
		        prop="room_size"
		        label="尺寸"
		        width="100px">
		      </el-table-column>
		      <el-table-column
		        prop="way"
		        label="房型"
		        width="100px">
		      </el-table-column>
		      <el-table-column
		        prop="status"
		        label="出租情况"
		        width="100px">
		      </el-table-column>
		    </el-table>
		</div>
		<clickSourceDetail ref='showMessage'></clickSourceDetail>
		<ReleaseHouse ref = 'releaseHouse'></ReleaseHouse>
		<p>{{order}}</p>
	</div>
</template>

<script>
	import clickSourceDetail from './clickSourceDetail.vue'
	import ReleaseHouse from './releaseHouse'
	import './sourceEdit.scss'
	import http from '../../../../httpClient/httpClient'

	export default{
		data(){
			return{
				stripe:true,
	            parm:'',
	            titleChange:'付款订单',
	            order:'',
	            filter:['checkin','checkout','ophone','user_ID',
	            'housePrice_ID','placeTotal_id','owner_ID','houseType_ID'],
			}

		},
		components:{
			clickSourceDetail,
			ReleaseHouse,
		},
		beforeMount(){
			this.parm = this.$route.params.msg;
			
		},
		mounted(){
			var ownerID= localStorage.getItem('ownerID');
			// this.$store.dispatch('saleSource',{path:'saleSource/',saleMsg:{ownerID:ownerID,status:0}});

			http.get('getOrder/',{msg:'all'}).then((res) => {
		    })

		},
		methods:{
			clickMsg(row){
				this.$refs.showMessage.showMsg(row);
			},
			titleHasChange(parmas,par1){
				this.titleChange = parmas;
				//获取后台数据进行切换
				var ownerID= localStorage.getItem('ownerID');
				if(par1 == 2){
					//清空数据源
					this.$store.getters.salehouse;
					this.$refs.releaseHouse.showRelease();
				}else{
					this.$store.dispatch('saleSource',{path:'saleSource/',saleMsg:{ownerID:ownerID,status:par1}});
				}
			}
		}
	}
</script>


<style>
	.EditList .el-table .cell{
		white-space: nowrap !important;
	}
	.EditList .editSmall .el-table__row td .cell{
		white-space: normal !important;
	}
	.el-tabs--border-card{
		-webkit-box-shadow:0 !important;
		box-shadow:0 !important;
	}
</style>
