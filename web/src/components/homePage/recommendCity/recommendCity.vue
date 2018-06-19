<template>
    <div class="recommendCity">
        <p class="separatorTitle">-房东推荐-</p>
        <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="(item,index) in swiperSlides" :key="index">
                <router-link :to="gernerateLink(item.product_id)" class="house-pic">
                    <img :src="gernerateImg(item.imgurl.split(',')[0] || item.imgurl)"/>
                    <p class="price-tip"><span>￥</span>{{item.price}}</p>
                </router-link>
                <div class="house-info">
                    <router-link :to="gernerateLink(item.product_id)" class="house-info-top">
                        {{item.title}}
                    </router-link>
                    <router-link :to="gernerateLink(item.product_id)" class="house-info-mid">
                        <div class="hose-info-cont fl">
                            <span>{{item.houseType}}</span>-<i>{{item.city}}</i>
                        </div>
                    </router-link>
                    <div class="house-info-bottom">
                        <img class="house-info-rec" :src="gernerateImg(item.comment_img)">
                        {{item.comment_qty}}条评价
                    </div>
                    <router-link :to="gernerateLink(item.product_id)" class="head-portrait">
                        <img :src="gernerateImg(item.owner_img)"/>
                    </router-link>
                    <div class="collectionbox">
                        <img :src="gernerateImg(item.collection_img.split(',')[0])" class="uncollectionimg" @click="like"/>
                        <img :src="gernerateImg(item.collection_img.split(',')[1])" class="hascollectionedimg" @click="like1" />
                    </div>  
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import './recommendCity.scss'
    import httpClient from '../../../httpClient/httpClient.js'
    import axios from 'axios';
    export default{
        data(){
            return {
                swiperOption: { //以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
                notNextTick: true, // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
                loop: false,
                direction: 'horizontal',
                grabCursor: true,
                setWrapperSize: true,
                autoHeight: true,
                centeredSlides: true,
                keyboard: true,
                mousewheelControl: true,
                observeParents: true, // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
                debugger: true
              },
            swiperSlides: [],
            dataset:'',
            node:undefined,
            }
        },
        methods:{
            gernerateImg: function (imgurl){
                return "src/assets/img/hotel/" + imgurl
            },
            gernerateLink: function (linkurl){
                return "/Detail/" + linkurl
            },
            like:function(event){      
                event.target.style.display = 'none';
                event.target.nextElementSibling.style.display = 'block';
            },
            like1:function(event){
                event.target.style.display = 'none';
                event.target.previousElementSibling.style.display = 'block';
                
            }
        },
        beforeMount:function(){
            httpClient.get('getRecommend',{recommend:1}).then((res)=>{
                console.log(res);
                this.swiperSlides = res.data.data.results;
                console.log('swiperSlides',this.swiperSlides)
            });
        }
    }
</script>