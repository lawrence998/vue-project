<template>
    <div class="regionComponent">
        <div v-for="(item,idx) in dataset" :key="idx">
            <div  class="objRegion">
                <router-link :to="gernerateLink(item.product_id)">
                    <img :src="gernerateImg(item.imgurl.split(',')[0] || item.imgurl)" class="bigImg"/>
                </router-link> 
                <router-link :to="gernerateLink(item.product_id)">
                    <p v-html="item.title" class="intr"></p>
                </router-link>
                <span v-html="item.price" class="price"></span>
                <div v-html="city" class="city"></div>
                <p>
                    <img :src="gernerateImg(item.comment_img)" class="pl"/>
                    共<span v-html="item.comment_qty"></span>条评论
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import httpClient from '../../httpClient/httpClient.js'
    export default{
        data(){
            return {
                dataset:[],
                imgurl:[],
                city:'',
                title:[],
                itemId:''
            }
        },
        methods:{
            gernerateImg: function (imgurl){
                return "../../../../src/assets/img/hotel/" + imgurl
            },
            gernerateLink: function (linkurl){
                return "/Detail/" + linkurl
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
        beforeMount:function(){
            console.log(this.$route.params);
            this.city = this.$route.params.city;
            var currentCity = this.city;
            httpClient.get('getCity',{city:currentCity}).then((res)=>{
                this.dataset = res.data.data.results;
            });
        },
        // created(){
        //     this.onSearch();
        // }

    }
</script>