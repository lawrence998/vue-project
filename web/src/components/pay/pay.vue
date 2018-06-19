<template>
    <div>
        <div class="payfor">
              <div class="topp"><i class="jtp" v-on:click="gop"></i>订单支付</div>
              <span class="ddxq">订单详情</span>
                <span class="title2">{{this.$route.query.title}}</span>
              <div class="zprice">总价&nbsp;
                    <span class="zj2" style="color:red;font-size:0.533333rem;font-weight:bold;">{{this.$route.query.price}}</span>
              </div>
              <div class="zffs">选择支付方式</div>
              <div>
              <div class="zfb">支付宝<input type="checkbox" class="checkbox1"/></div>
              <div class="wechat">微信<input type="checkbox" class="checkbox"/></div>
              <div class="zfan"><input type="button" value="立即支付" class="ljzf" v-on:click="ljzf"/></div>
              </div>
    </div>
    </div>
</template>


<script type="text/javascript">
    import './pay.scss'
    import axios from 'axios'
    import Http from'../../httpClient/httpClient'

    export default{
        data(){
            return{
              title:'',
              price:''
            }
        },
        methods:{
            gop(){
                this.$router.go(-1);
            },
            ljzf(){
               var objid = this.$route.query.id;
                Http.post('pay',{oname:objid}).then((res)=>{
                  
                })

                this.$router.push('/paysus');

            }
        }
       
    }
</script>