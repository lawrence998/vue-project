<template>
    <transition name="fade">
        <div v-if="show" class="bannerDetail">
            <div class="nav" >
                <div class="nav-inner">
                    <router-link to="/#"><i class="el-icon-back"></i></router-link>
                    <span>在旅行中迎接新年</span>
                    <router-view></router-view>
                </div>
            </div> 
            <div class="page-content">
                <div class="special-header">
                    <div class="special-banner">
                        <img src="../../../../src/assets/img/carousel/Banner2.jpg"/>
                    </div>
                    <div class="header-cont cont-width">
                        <p>这个春节，你想怎么过？是否已经厌倦了“年夜饭+春晚”的标配，厌倦了七大姑八大姨的轮番轰炸，厌倦了家人围坐在一起却只顾各自抱着手机抢红包的无聊场景？</p><br>
                        <p>想逃离，想改变？这一次，给自己和家人来点特别的！趁着假期，去旅游吧！新鲜的、难忘的永远在路上！春节的第一天，你想在哪里醒来？无论国内还是境外，这5个地方，保证是你最佳的选择！</p>
                        
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
    import './detail1.scss'
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