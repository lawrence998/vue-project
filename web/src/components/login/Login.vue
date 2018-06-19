<template>
    <div>
        <i class="jt1" v-on:click="gog"></i>
        <img src="../../assets/logo3.jpg" class="img"/>
        <div class="login-wrap">
            <h3 class="h3">登录</h3>
            <p v-show="showTishi" class="showtishi">{{tishi}}</p>
            <div class="phone">手机号</div><input type="text" v-model="username" class="name" v-on:input="shuru">
            <div class="phone">密码</div><input type="password"  v-model="password" class="word">
            <input type="button" v-on:click="login" class="button" value="登录" />
            <span class="span" v-on:click="no">没有账号？马上注册</span>
        </div>
    </div>
</template>


<script>
    import './Login.scss'
    import axios from 'axios'
    import Http from'../../httpClient/httpClient'

      export default{
        data(){
            return{
                showTishi: false,
                tishi: '',
                username: '',
                password: '',
                newUsername: '',
                newPassword: ''
            }
        },

         mounted(){
             
                if(localStorage.hasOwnProperty('data') ){
                    this.$router.push('/Users')
                }
              },

        methods:{
            login(){
                var username = this.username
                var password = this.password

                if(username == '' || password == ''){  
                    this.tishi = '非法操作'
                    this.showTishi = true
                    return;  

                }
                Http.post('Login',{username:username,password:password}).then((res)=>{
                    console.log(res)
                    if(res.data.state=='ok'){

                        var nc = res.data.nc.username;
                        var userid = res.data.nc.user_id

                        var obj = {'user_id':userid,'username':username,'password':password,'nicheng':nc}
                        localStorage.setItem('data',JSON.stringify(obj)); 

                        this.$router.push('/Users');
                        return;

                    }else{
                        this.tishi = '用户名不存在'
                        this.showTishi = true
                    }
                })
            
        },
            shuru(){

                document.getElementsByClassName('button')[0].style.backgroundColor = "#E7336E";
            },

            no(){
                 this.$router.push('/Register');
            },
            gog(){
                this.$router.push('/')
            },

    }
  
}

</script>
