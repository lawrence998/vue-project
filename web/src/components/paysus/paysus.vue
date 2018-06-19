<template>
    <div>
        <div class="paysus">
            <div class="tops"><i class="jts" v-on:click="gosu"></i>订单状态</div>
            <img src="../../assets/img/pay/timg (2).jpg" alt="" class="ddzt"/>
            <div class="dx"><p class="zi" v-on:click="ddxq">订单详情</p></div>

        </div>
    </div>
</template>

<script type="text/javascript">
    import './paysus.scss'

export default{
        data(){
            return{
             
            }
        },
    
        methods:{
            gosu(){
                this.$router.push('/Users');
               
            },
            ddxq(){
                this.$router.push('/orderlist');
            }
        }
       
    }



</script>