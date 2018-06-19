<template>
    <transition name="fade">
        <div v-if="show" class="bannerDetail">
            <div class="nav" >
                <div class="nav-inner">
                    <router-link to="/#"><i class="el-icon-back"></i></router-link>
                    <span>一家民宿注册红包</span>
                    <router-view></router-view>
                </div>
            </div> 
            <img :src="gernerateImg(url[0])">
            <img :src="gernerateImg(url[1])">
        </div>
    </transition>
</template>

<script>
    import './detail0.scss'
    import httpClient from '../../../httpClient/httpClient.js'
    export default{
        data(){
            return {
                url:['../../../../src/assets/img/carousel/Banner4.jpg','../../../../src/assets/img/carousel/Banner5.jpg'],
                show:true
            } 
        },
        mounted:function(){
            var self = this;
            console.log(this.onSearch.loading);
            // httpClient.get('getImg',{houseImg_ID:12}).then((res)=>{
            //     console.log(res)
            //     this.url = res.data.data.results[0].imgurl.split(',');
                
            // });
        },
        methods:{
            gernerateImg: function (imgurl){
                return "../../../../src/assets/img/carousel/" + imgurl
            },
            gernerateLink: function (linkurl){
                return "carousel/detail" + linkurl
            },
            onSearch() {
                const loading = this.$loading({
                  lock: true,
                  text: '玩命加载中',
                  spinner: 'el-icon-loading',
                  background: 'rgba(255, 255, 255, 1)',
                  target: document.querySelector('.bannerDetail')
                });
                setTimeout(() => {
                  loading.close();
                }, 1000);
            },
            test:function(){
                return '11';
            }
            
        },
        created(){
            this.onSearch();
        }
    }
</script>  