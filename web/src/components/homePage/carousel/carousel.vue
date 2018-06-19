<template>
    <div>
        <swiper :options="swiperOption" ref="mySwiper">
            <!-- slides -->
            <swiper-slide v-for="(value,index) in swiperSlides"  :key="value.id" >
                <router-link :to="gernerateLink(index)">
                    <img :src="gernerateImg(value)"/>
                </router-link>
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
    </div>
</template>

<script>
    import axios from 'axios';
    import './carousel.scss';
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import httpClient from '../../../httpClient/httpClient.js'
    export default{
        name: 'carousel',
        props:[],
        data () {
            return {
              swiperOption: { //以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
                notNextTick: true, // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
                autoplay: true,
                loop: true,
                direction: 'horizontal',
                grabCursor: true,
                setWrapperSize: true,
                autoHeight: true,
                pagination: {
                  el: '.swiper-pagination'
                },
                centeredSlides: true,
                paginationClickable: true,
                navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev'
                },
                keyboard: true,
                mousewheelControl: true,
                observeParents: true, // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
                debugger: true,
                observer:true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents:true,//修改swiper的父元素时，自动初始化swiper
              },
              swiperSlides: ['../../../../src/assets/img/carousel/Banner1.jpg','../../../../src/assets/img/carousel/Banner2.jpg','../../../../src/assets/img/carousel/Banner3.jpg']
            }
        },
        components: {
            swiper,
            swiperSlide
        },
        beforeMount:function(){
            // httpClient.get('getImg',{houseImg_ID:11}).then((res)=>{
            //     //console.log(this.$refs.mySwiper.update)
            //     //this.swiperSlides = res.data.data.results[0].imgurl.split(',');
            //     //console.log(this.swiperSlides)
            //     //this.$refs.mySwiper.update();
            // });
        },
        watch:{

        },
        methods:{
            gernerateImg: function (imgurl){
                return "src/assets/img/carousel/" + imgurl
            },
            gernerateLink: function (linkurl){
                return "carousel/detail" + linkurl
            },
        },
        computed:{
            
        }
    }
</script>
