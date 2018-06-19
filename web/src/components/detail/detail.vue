<template>
	<div class="detail_box">

		<!-- 顶部固定区域 -->
		<div class="top_fiex">
			<div class="top_fiex-inner">
				<div class="left">
					<router-link  to="">
						<i class="el-icon-back" @click="go"></i>
					</router-link>
				</div>

				<div class="center" style="text-align:center;">房源详情</div>

				<div class="right">
					<a href="#">
						<i class="el-icon-star-off fl"></i>						
					</a>
					<a href="#">
						<i class="el-icon-share fr"></i>
					</a>
				</div>
			</div>
		</div>

		<!-- 底部固定区域 -->
		<div class="bt_fiex">
			<div class="bt_left fl" @click="VerifyLogin('host')">
				<a>联系房东</a>
			</div>
			<div class="bt_right fr" @click="VerifyLogin('book')">
				<!-- <a href="#">申请预定</a> -->
				<router-link :to="gernerateLink(place_id)">申请预定</router-link>

                <!-- <router-view></router-view> -->
			</div>
		</div>

		<!-- main部分 -->
		<div class="main_fiex">
			
			<div class="banner">
				<!-- 数据库获取值 -->
				<img :src="gernerateImg() + imgurl" />
				<em class="room_price">
					<span>￥{{price}}</span>
				</em>
			</div>

			
			<div class="house-detail-user-comment">
				<div class="user-content">
					<div class="house-detail-title">
						<!-- 数据库获取值，暂时写死 -->
						<!-- 【304】免费WIFI新建和式青旅 -->
						{{title}}
					</div>
					<div class="user-name">
						<div class="user-name-left">
							<!-- 房东头像 -->
							<img :src="gernerateImg() + owner_img" />
						</div>
						<div class="user-name-right">
							<!-- 房东昵称 -->
							<p>{{owner_name}}</p>
						</div>
					</div>
				</div>
			</div>

			
			<div class="room-type">
				<h3 class="way">
					<!-- 单间出租 -->
					{{houseType}}
				</h3>
				<div class="type">
					<div class="begdivving-room">
						<i class="el-icon-goods"></i>
						<!-- <p>1室</p> -->
						<p>{{room_qty}}</p>
					</div>
					<div class="beg-count">
						<i class="el-icon-goods"></i>
						<!-- <p>1张床</p> -->
						<p>{{bed_qty}}</p>
					</div>
					<!-- <div class="people-count" v-if="people_count != 0">
						<i class="el-icon-goods"></i>
						<p>可住1人</p>
						<p>{{bed_qty}}</p>
					</div> -->
					<div class="room_size">
						<i class="el-icon-goods"></i>
						<!-- <p>38㎡</p> -->
						<p>{{room_size}}</p>
					</div>
				</div>
			</div>

			<div class="room_comment">
				<h3>房源描述</h3>
				<div>
					<!-- 数据库获取值 -->
					<p>{{room_des}}</p>
				</div>
			</div>

			<div class="room_city">
				<!-- 数据库获取信息 -->
				<h3>房源位置</h3>
				<h4>{{adress}}</h4>
			</div>

			<div class="room_beg">
				<h3>床铺信息</h3>
				<div class="room_beg_1">
					<i class="el-icon-goods"></i>
					<p><!-- 张单人床 -->
						{{bed_qty}}
					</p>
				</div>
			</div>

			<div class="house-details">
				<h3>入住信息</h3>
				<ul class="house-details-ul">
					<li class="house-details-li">
						<div class="house-details-div">
							<div class="item-title">房源类型</div>
							<div class="item-title item-title-right">{{houseType}}-公寓</div>
						</div>
					</li>
					<li class="house-details-li">
						<div class="house-details-div">
							<div class="item-title">卫生间(独立/公用)</div>
							<div class="item-title item-title-right">0/3</div>
						</div>
					</li>
					<li class="house-details-li">
						<div class="house-details-div">
							<div class="item-title">最短入住天数</div>
							<div class="item-title item-title-right">1</div>
						</div>
					</li>
					<li class="house-details-li">
						<div class="house-details-div">
							<div class="item-title">入住时间</div>
							<div class="item-title item-title-right">15:00</div>
						</div>
					</li>
					<li class="house-details-li">
						<div class="house-details-div">
							<div class="item-title">退房时间</div>
							<div class="item-title item-title-right">11:00</div>
						</div>
					</li>
					<li class="house-details-li">
						<div class="house-details-div">
							<div class="item-title">在线押金<i class="el-icon-question"></i></div>
							<div class="item-title item-title-right">不收取</div>
						</div>
					</li>
					<li class="house-details-li">
						<div class="house-details-div">
							<div class="item-title">可订日期</div>
							<div class="item-title item-title-right">
								<a href="#" style="color:#f44336">查看日历</a>
							</div>
						</div>
					</li>
				</ul>
			</div>

			<div class="room-device">
				<h3>配套设施</h3>
				<div class="device">
					<div class="begdivving-room">
						<i class="el-icon-goods"></i>
						<!-- 数据库获取值 -->
						<p>洗漱用品</p>
					</div>
					<div class="beg-count">
						<i class="el-icon-goods"></i>
						<!-- 数据库获取值 -->
						<p>吹风机</p>
					</div>
					<div class="people-count">
						<i class="el-icon-goods"></i>
						<!-- 数据库获取值 -->
						<p>暖气</p>
					</div>
					<div class="room_size">
						<i class="el-icon-goods"></i>
						<!-- 数据库获取值 -->
						<p>电视</p>
					</div>
				</div>
			</div>

			<div class="room-remove">
				<h3>退订政策</h3>
				<p>入住前14天取消预定，则全额退款;不符合全额条件，则扣除剩余房款的50%;</p>
			</div>
		</div>
	</div>

</template>

<script>
	import './detail.scss'
	import axios from 'axios'
	import httpClient from '../../httpClient/httpClient.js'
	export default{
		data(){
			return{
				place_id:'',
				imgurl:'',
				price:'',
				title:'',
				owner_img:'',
				owner_name:'',
				houseType:'',
				room_qty:'',
				bed_qty:'',
				city:'',
				adress:'',
				room_size:'',
				room_des:'',
			}
		},

		mounted(){
			this.place_id = this.$route.params.id;
			var self = this;
			console.log("id：" + this.place_id);
			//如果得到的参数是room_ID,那么另作处理
			// if(this.place_id.indexOf('room_ID')>=0){
			// 	self.place_id = self.place_id.split('=')[1];
			// 	httpClient.get('houseImg2/',{room_ID:self.place_id}).then((res)=>{
			// 		this.dataset = res.data.data.results;
			// 	})
			// }else {
				httpClient.get('houseImg/',{place_id:self.place_id}).then((res)=>{
					console.log(res);
					console.log( res.data.data.results);
					this.imgurl = res.data.data.results[0].imgurl.split(',')[0];
					this.price = res.data.data.results[0].price;
					this.title = res.data.data.results[0].title.split(',')[0];
					this.owner_img = res.data.data.results[0].owner_img.split(',')[0];
					this.owner_name = res.data.data.results[0].owner_name.split(',')[0];
					this.houseType = res.data.data.results[0].houseType.split(',')[0];
					this.room_qty = res.data.data.results[0].room_qty.split(',')[0];
					this.bed_qty = res.data.data.results[0].bed_qty.split(',')[0];
					this.adress = res.data.data.results[0].adress.split(',')[0];
					this.city = res.data.data.results[0].city.split(',')[0];
					this.room_size = res.data.data.results[0].room_size.split(',')[0];
					this.room_des = res.data.data.results[0].room_des.split(',')[0];

					console.log('housekeeper',this.owner_img);
				});
			// }
			

		},

		methods:{
			VerifyLogin(a){
				var storage = window.localStorage;
				if(storage.data){
					if(JSON.parse(storage.data).nicheng){
						if(a === 'host'){
							
							this.$router.push({name:'News',params:{househost:this.owner_name,housekeeper:this.owner_img}})
						}else if(a === 'book'){
							this.$router.push({name:'Order'})
						}
					}
					
				}else{
					this.$router.push({name:'Login'})
				}
			},
			go(){
                this.$router.go(-1)
            },
			getmsg(){
				this.$store.dispatch('getmsg_get',{path:'product/',msg:{houseOwner:'Kemo'}});
			},
			postmsg(){
				this.$store.dispatch('getmsg_post',{path:'product',msg:{houseOwner:'Kemo'}});
			},
			handleChange(value){
				console.log(value);
			},
			gernerateImg: function (houseImgurl){
                return "../../../../src/assets/img/hotel/";
            },
            gernerateLink: function (linkurl){
                return "/Order/" + linkurl
            },
            // onSearch() {
            //     const loading = this.$loading({
            //       lock: true,
            //       text: '玩命加载中',
            //       spinner: 'el-icon-loading',
            //       background: 'rgba(255, 255, 255, 1)',
            //       target: document.querySelector('.detail_box')
            //     });
            //     setTimeout(() => {
            //       loading.close();
            //     }, 500);
            // }

		},
		computed:{
			get_msg:{
				get:function(){
					console.log(11555);
					return this.$store.getters.getmsg_get;
				}
			}
		}
		// created(){
        //     this.onSearch();
        // }
	}
</script>