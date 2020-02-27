<template>
	<div class="box1">
		<div class="head">
			<div class="nav1">
				<router-link to="/"><div class="iconfont icon-fanhui" @click="go"></div></router-link>
				<div class="city" v-html="city"></div>
				<div class="iconfont icon-caidan"></div>
				
			</div>
			<ul class="navs">	
				<li @click="datetime">日期
					<i class="iconfont icon-jiantou-copy-copy"></i>
				</li>
				<li @click="regions">区域
					<i class="iconfont icon-jiantou-copy-copy"></i>
				</li>
				<li @click="sx">筛选
					<i class="iconfont icon-jiantou-copy-copy"></i>
					
				</li>
				<li @click="px">排序
					<i class="iconfont icon-jiantou-copy-copy"></i>
				</li>
			</ul>
		</div>
		<div class="main">
			<regionComponent v-if="rgCpt"></regionComponent>
			<sxComponent v-if="sxCpt"></sxComponent>
			<pxComponent v-if="pxCpt"></pxComponent>
			<div class="all" v-html="content"></div>
		</div>
		<bottomNavigation></bottomNavigation>
	</div>
</template>
<script>
	import './listpage.scss';
	import './sx.scss';
	import './px.scss';
	import './region.scss';
	import regionComponent from './region.vue';
	import sxComponent from './sx.vue';
	import pxComponent from './px.vue';
	import bottomNavigation from '../bottomNavigation/bottomNavigation.vue'
	import httpClient from '../../httpClient/httpClient';
	export default{
		data(){
			return{
				city:'',
				content:'',
				rgCpt:true,
				sxCpt:false,
				pxCpt:false,
			}
		},
		methods:{
			datetime:function(){
				this.sxCpt=false;
				this.pxCpt=false;
				this.rgCpt=false;
			},
			go(){
                this.$router.go(-1)
            },
			regions:function(){
				this.sxCpt=false;
				this.pxCpt=false;
				this.rgCpt=true;
				
			},
			sx:function(){
				this.sxCpt=true;
				this.pxCpt=false;
				this.rgCpt=false;
			},
			px:function(){
				this.pxCpt=true;
				this.sxCpt=false;
				this.rgCpt=false;
			},
			// onSearch() {
            //     const loading = this.$loading({
            //       lock: true,
            //       text: '玩命加载中',
            //       spinner: 'el-icon-loading',
            //       background: 'rgba(255, 255, 255, 1)',
            //       target: document.querySelector('.page')
            //     });
            //     setTimeout(() => {
            //       loading.close();
            //     }, 1000);
            // },

		},
		computed:{
			get_msg:{
				get:function(){
					console.log(1155511);
					return this.$store.getters.getmsg_get;
				}
			}
		},
		components:{
			sxComponent,
			pxComponent,
			regionComponent,
			bottomNavigation
		},
		// created(){
        //     this.onSearch();
        // }
	}
</script>