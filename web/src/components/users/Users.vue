<template>
    <div>
        <div class="via">
            <img src="../../assets/logo3-2.fw.png" class="img2"/>
            <div class="users">{{name}}</div>
            <button class="dl" v-on:click="dl" v-show="lg">登录</button><button class="zc" v-on:click="zc" v-show = "rg">注册</button>
        </div>
        <div class="myorder" v-on:click="myorder">我的订单</div>
        <div class="myorder">芝麻信用</div>
        <div class="myorder">旅行红包</div>
        <div class="exit" v-on:click = "exit" v-show="tuichu">退出</div>

        <buttoms></buttoms>
    </div>
</template>

<script>

    import './users.scss'
    import buttoms from '../bottomNavigation/bottomNavigation.vue'
      export default{
        data(){
            return{
                name:'',
                lg:true,
                rg:true,
                tuichu:false
            }
            
        },
        components:{
            buttoms
        },
        mounted(){

            try{
                var uname = JSON.parse(localStorage.getItem("data")).nicheng;
            
                this.name = uname;
                this.tuichu = true;

                if(this.name!=''){
                    this.lg = false;
                    this.rg = false;

                }
            }catch(err){
                console.log(err)
            }
        },
        methods:{

            dl(){
                this.$router.push('/Login')
            },
            zc(){
                this.$router.push('/register')
            },

            myorder(){
                 this.$router.push('/orderlist');
            },
            exit(){
                localStorage.removeItem('data');
                localStorage.removeItem('data1');
                this.name = '';

                setTimeout(function(){
                      this.$router.push('/Login')
                  }.bind(this),1000)

                return;
            }
        }
    }

</script>