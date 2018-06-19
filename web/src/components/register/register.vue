<template>
	  <div>
        <i class="jt2" v-on:click="gogo"></i>
        <img src="../../assets/logo3.jpg" class="img"/>
        <div class="register-wrap">
            <h3 class="h3">注册</h3>
            <p v-show="showTishi" class="showtishi">{{tishi}}</p>
            <div class="phone">手机号</div><input type="text" v-model="username" class="name" v-on:blur="phoneFilter">
            <div class="phone">昵称</div><input type="text" v-model="nicheng" class="nc" v-on:blur="ncFilter">
            <div class="phone">密码</div><input type="password"  v-model="password" class="word">
            <input type="button1" v-on:click="register" value="注册" class="button1">
            <span class="span" v-on:click="yes">已有账号？马上登录</span>
        </div>
    </div>
</template>

<script>
	import './register.scss'
    import Http from'../../httpClient/httpClient'

	  export default{
        data(){
            return{
                showTishi: false,
                tishi: '',
                username: '',
                password: '',
                nicheng:''

            }
        },

        methods:{

            // 查询是否已注册
             phoneFilter(){

                    var reg = /^1[34578]\d{9}$/i
                    if(!reg.test(this.username)){
                       this.tishi = '手机号不合法'
                       this.showTishi = true
                        return false;
                    }

                 Http.post('getUsername',{username:this.username}).then((res)=>{
                    if(res.data.state == 'ok'){
                        this.tishi = '您已注册'
                        this.showTishi = true
                        document.getElementsByClassName('button1')[0].disabled = true;
                        
                    }else if(res.data.state == 'err'){
                        document.getElementsByClassName('button1')[0].disabled = false;
                    }

                })
            },
            ncFilter(){
                var nicheng2 = this.nicheng
                var reg = /^[\u2E80-\u9FFF]+$/
                if(!reg.test(nicheng2)){
                    
                    this.tishi = '昵称只能输入中文'
                    this.showTishi = true
                    return false;//阻止代码向下执行，阻止默认行为（表单提交）
                }else{
                     this.showTishi = false
                }

            },

          
            // 写入数据库
            register(){
                var username = this.username
                var password = this.password
                var nicheng = this.nicheng

                if(username == '' || password == ''){  
                    this.tishi = '非法操作'
                    this.showTishi = true
                    return;  
                }
               
                var reg = /^\S{6,20}$/;
                if(!reg.test(this.password)){
                    this.tishi = '长度小于20 不能包含空格'
                    this.showTishi = true
                    return false;
                }
                Http.post('LoginIn',{username:username,password:password,nicheng:nicheng}).then((res)=>{
                        var userid = res.data.insertId;

                         var obj = {'username':username,'password':password,'nicheng':nicheng,'user_id':userid}
                        localStorage.setItem('data',JSON.stringify(obj)); 
                         this.$router.go(-1)
                    // if(res.data.state == 'ok'){
                    //     this.tishi = '您已注册'
                    //     this.showTishi = true
                    //     this.$router.push('/Users');
                    //     return;
                    // }
                    // else{
                    //     this.tishi = '您已注册'
                    //     this.showTishi = true
                    // }
                })

               
            },
            yes(){
                 this.$router.push('/Login');
            },
             gogo(){
                this.$router.push('/')
            },
        }
    }
</script>