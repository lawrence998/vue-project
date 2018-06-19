<template>
    <div class="order_box">
        <div class="order-top">
            <div class="order-top-inner">
                <div class="left">
                    <span @click="go">
                        <i class="el-icon-back"></i>
                    </span>
                </div>
                <div class="center">申请预定</div>
            </div>
        </div>

        <div class="order-main">
            <div class="houseItem">
                    <a href="#" class="showIndicator">
                        <span class="ulhouseimg">
                            <img :src="gernerateImg() + imgurl" />
                        </span>
                        <div class="ulhouseinfo">
                            <span class="ulhousetitle">{{title}}</span>
                            <span class="ulhouserroominfo">{{houseType}}-{{adress}}</span>
                            <span class="ulhouseprice">
                                <span class="currency">￥{{price}}</span>
                            </span>
                        </div>
                    </a>
            </div>
            <div class="select_date">选择日期</div>
            <div class="block">
                <el-date-picker
                  v-model="value8"
                  type="date"
                  placeholder="订房日期"
                  default-value="">
                </el-date-picker>
                至
                <el-date-picker
                  v-model="value9"
                  type="date"
                  placeholder="退房日期"
                  default-value="">
                </el-date-picker>
            </div>
            <div class="people_count">房客人数</div>
            <div class="people_count_b">
                <el-input-number v-model="num5" @change="handleChange" :min="1" :max="4"></el-input-number>
            </div>
            <div class="price_count">结算价格</div>
            <div class="total-price">
                <span class="price_count_left">总价</span>
                <span class="price_count_right">{{price_now}}</span>
            </div>
        </div>
        <div class="order-bottom">
            <button @click="insertData" >提交订单</button>
        </div>
    </div>
    
    
</template>

<script>
    import './order.scss'
    import axios from 'axios'
    import httpClient from '../../../httpClient/httpClient.js'
    export default{
        data() {
            return {
                value6: '',
                num5:'',
                value8:'',
                value9:'',
                // order_id:'',
                // price_now:'',
                // results:'',
                product_id:'',
                user_id:'',
                owner_ID:'',
                user_ID:'',

                // 华丽分割线
                imgurl:'',
                title:'',
                houseType:'',
                adress:'',
                price:'',
                price_now:'',
            };
        },
        mounted(){
            try{
                // var uname = JSON.parse(localStorage.getItem("data")).username;
                var user_id = JSON.parse(localStorage.getItem("data")).user_id;
                // var obj = JSON.stringify({'username':username});
                var obj = JSON.stringify({'user_id':user_id});
                localStorage.setItem("data1",obj);
            }catch(err){
                // console.log(err)
            }
            
            // this.order_id = this.$route.params.id;

            // var obj = JSON.stringify({'username':'lz','password':'12345','nicheng':'lolo'});
            // localStorage.setItem("data",obj);
            this.order_id = this.$route.params.id;
            console.log(this.order_id)

            var self = this;
            httpClient.get('DetailOrder',{order_id:self.order_id}).then((res)=>{
                console.log( res);
                console.log( res.data.data.results);
                //华丽分割线
                this.imgurl = res.data.data.results[0].imgurl.split(',')[0];
                this.price = res.data.data.results[0].price;
                this.price_now = res.data.data.results[0].price;
                this.title = res.data.data.results[0].title.split(',')[0];
                this.adress = res.data.data.results[0].adress.split(',')[0];
                this.owner_name = res.data.data.results[0].owner_name.split(',')[0];
                this.houseType = res.data.data.results[0].houseType.split(',')[0];
                this.product_id = res.data.data.results[0].product_id;
            });
        },
        methods:{
            gernerateImg: function (houseImgurl){
                return "../../../../src/assets/img/hotel/";
            },
            gernerateLink: function (linkurl){
                return "/orderpage/" + linkurl
            },
            go(){
                this.$router.go(-1);
            },
            // onSearch() {
            //     const loading = this.$loading({
            //       lock: true,
            //       text: '玩命加载中',
            //       spinner: 'el-icon-loading',
            //       background: 'rgba(255, 255, 255, 1)',
            //       target: document.querySelector('.order_box')
            //     });
            //     setTimeout(() => {
            //       loading.close();
            //     }, 500);
            // },
            handleChange(index){
                var val1 = this.price;
                var val2 = index;
                this.price_now = val1*val2;
            },
            insertData(){
                var datas = localStorage.getItem('data1');
                
                var start = this.value8.toLocaleDateString().split('\/').join('-');
                var end = this.value9.toLocaleDateString().split('\/').join('-');
                
                        self = this;
                        var arr = [];
                        // var uname = JSON.parse(localStorage.getItem("data")).username;
                        var user_id = JSON.parse(localStorage.getItem("data")).user_id;
                        // arr.push(this.housePrice_ID,this.houseType_ID,this.placeTotal_id,this.owner_ID,this.user_ID,uname);
                        // arr.push(this.product_id,this.user_ID,user_id);
                        arr.push(this.product_id,user_id,start,end);
                        console.log(arr);
                        httpClient.get('insertOrder/',{order_id:arr}).then((res)=>{
                            // var orderData = {val2,price_now,housePrice_ID,houseType_ID,placeTotal_id,owner_ID,user_ID}
                            // this.$router.push({name:'orderPage',params:{id:id}})
                            // console.log(orderData);
                            console.log(111)
                            self.$router.push("/Users");
                        })
                
            }
        },
        // created(){
        //     this.onSearch();
        // }
    }
</script>