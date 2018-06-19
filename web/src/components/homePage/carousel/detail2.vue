<template>
    <transition name="fade">
        <div v-if="show" class="bannerDetail">
            <div class="nav" >
                <div class="nav-inner">
                    <router-link to="/#"><i class="el-icon-back"></i></router-link>
                    <span>树屋古堡</span>
                    <router-view></router-view>
                </div>
            </div> 
            <div class="pageContent">
                <div class="special-header">
                    <div class="special-banner">
                        <img src="../../../../src/assets/img/carousel/Banner3.jpg"/>
                    </div>
                    <div class="header-cont cont-width">
                        <p>
                        憧憬着电影里泰山坐在树屋上看着旭日东升，万道金光透过树梢，给湖面染上了一层绯红；想象自己是电影里女主角，住在古堡里体验极致的法式优雅与浪漫~
                        上一家民宿，你就可以感受不一样的住宿体验！
                        </p>
                    </div>
                </div>
                <div class="special-list">
                    <div v-for="(value,index) in dataset" class="special-item" :key="index">
                        <router-link :to="gernerateLink(index+1)" class="house-pic">
                            <img :src="gernerateImg(value.imgurl.split(',')[0] || value.imgurl)"/>
                            <p class="price-tip"><span>￥</span>{{value.price}}</p>
                        </router-link>
                        <div class="house-info">
                            <router-link :to="gernerateLink(index+1)" class="house-info-top">
                                {{value.title}}
                            </router-link>
                            <router-link :to="gernerateLink(index+1)" class="house-info-mid">
                                <div class="hose-info-cont fl">
                                    <span>{{value.houseType}}</span>-<i>{{value.city}}</i>
                                </div>
                            </router-link>
                            <div class="house-info-bottom">
                                <img class="house-info-rec" :src="gernerateImg(value.comment_img)">
                                {{value.comment_qty}}条评价
                            </div>
                            <router-link :to="gernerateLink(index+1)" class="head-portrait">
                                <img :src="gernerateImg(value.owner_img)"/>
                            </router-link>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import './detail2.scss'
    import httpClient from '../../../httpClient/httpClient.js'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default{
        data(){
            return {
                dataset:[],
                url:[],
                show:true
            } 
        },
        mounted:function(){
            httpClient.get('getRecommend',{recommend:1}).then((res)=>{
                console.log(res);
                this.dataset = res.data.data.results;
            });
        },
        methods:{
            gernerateImg: function (imgurl){
                return "src/assets/img/hotel/" + imgurl
            },
            gernerateLink: function (linkurl){
                return "/Detail/" + linkurl
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
            }
        },
        created(){
            this.onSearch();
        }
    }
</script>