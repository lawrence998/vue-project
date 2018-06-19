<template>
	<div class="home-big">
		<div class="box">
			<carousel class="carousel" :carouselImg="carouselImg"></carousel>
			<search></search>
			<recommendCity></recommendCity>
		</div>
		<homerest></homerest>
		<bottomNavigation></bottomNavigation>
	</div>
</template>

<script>
	import './homePage.scss'
	import carousel from './carousel/carousel.vue'
	import search from './search/search.vue'
	import recommendCity from './recommendCity/recommendCity.vue'
	import homerest from './homerest/homerest.vue'
	import bottomNavigation from '../bottomNavigation/bottomNavigation.vue'
	import httpClient from '../../httpClient/httpClient.js'
	export default{
		data(){
			return {
				text:'我来自7班',
				carouselImg:[],
			}
		},
		components: {
            carousel,
            search,
            recommendCity,
            homerest,
            bottomNavigation
        },
		methods:{
			getmsg(){
				this.$store.dispatch('getmsg_get',{path:'getImg',msg:{houseOwner:'Kemo'}});
			},
			postmsg(){
				this.$store.dispatch('getmsg_post',{path:'product',msg:{houseOwner:'Kemo'}});
			},
			fromData(data){
				console.log(data);
			},
			// onSearch() {
			//     const loading = this.$loading({
			//       lock: true,
			//       text: '玩命加载中',
			//       spinner: 'el-icon-loading',
			//       background: 'rgba(255, 255, 255, 1)',
			//       target: document.querySelector('.box')
			//     });
			//     setTimeout(() => {
			//       loading.close();
			//     }, 1500);
			// }
		},
		computed:{
			get_msg:{
				get:function(){
					console.log(11555);
					return this.$store.getters.getmsg_get;
				}
			}
		},
		created(){
			// this.onSearch();
		},
		beforeMount(){
			//console.log(this.$store.state.getmsg_get.data.data);
			//this.carouselImg = this.$store.state.getmsg_get.data.data.results[0].imgurl.split(',');
			//console.log(this.carouselImg);
			//httpClient.get('getImg',{houseOwner:'Kemo'}).then((res)=>{
				//console.log(res);
				//this.carouselImg = res.data.data.results[0].imgurl.split(',');
				//console.log(this.carouselImg)
			//});
			//this.$store.dispatch('getmsg_get',{path:'getImg',msg:{houseOwner:'Kemo'}});

			//this.carouselImg = this.$store.state.getmsg_get.data.data.results[0].imgurl.split(',');
		},
		mounted(){
			
		}
}
</script>