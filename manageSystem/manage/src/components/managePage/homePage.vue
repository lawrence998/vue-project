<template>
	<div>
		<div id="page_top">
			<span></span>
			<span class="login_user">
				<b class="userImg"><img src="../../assets/messager/mm.jpg"/></b>
				<i>welcome,<b>lucase</b></i>
			</span>
			<span class="top_right">
				<i class="page_i1">
					<span class="el-icon-upload"></span>
				</i>
				<i class="page_i2">
					<span class="el-icon-menu"></span>
				</i>
				<i class="page_i3">
					<span class="el-icon-message"></span>
				</i>
				<i class="page_i4" @click = 'quiteState'>
					<Quit ref = 'quiteState'></Quit>
					<span class="el-icon-setting"></span>
				</i>
				<i class="page_i5">
					<el-input v-model="searchTop" placeholder="请输入内容" class="el-icon-search">
					</el-input>
				</i>
			</span>
		</div>
		<div id="container">
			<div id="page_left">
				<PageLeft></PageLeft>
			</div>
			<div id="page_right">
				<router-view></router-view>
			</div>
		</div>
		 <global-spinner v-show = 'spinner'></global-spinner>
	</div>
</template>



<script>
	  import './homePage.scss'
	  import PageLeft from './pageLeft/pageLeft'
	  import Quit from '../quit/userQuit'

	  export default {
	    data() {
	      return{
	      	showDetail:false,
	      	searchTop:'',
	      	spinner:true,
	      	quite:false,
			
			}
	    },
	    components:{
	    	PageLeft,
	    	Quit,
	    },
	    methods:{
	    	showIdx(){
	    		this.showDetail = true;
	    	},
	    	quiteState(){
	    		this.$refs.quiteState.open2();
	    	}
	    },
	    mounted(){
	    	setTimeout(item =>{
	    		this.spinner = false;
	    	},2000);
	    }
	  };
</script>