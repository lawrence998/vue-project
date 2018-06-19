
<template>
  <div class="register">
    <el-form label-width="100px" class="demo-ruleForm" v-on:submit.prevent="register">
    <p class="registerIn">用户注册</p>
      <el-form-item label="手机号码">
        <el-input type="text" id="phone" v-model="phone">
        </el-input>
        <span v-show="$store.state.phone == 'err'" class=" checkLogin el-icon-circle-check"></span>
        <span v-show="$store.state.phone == 'ok'" class=" checkfailure el-icon-circle-close"></span>
      </el-form-item>

      <el-form-item label="用户名">
        <el-input type="text" id="username" v-model="username"></el-input>
      </el-form-item>

      <el-form-item label="密码">
        <el-input type="password" id="password1" v-model="password1"></el-input>
      </el-form-item>
      <el-form-item label="再次密码">
        <el-input type="password" id="password2" v-model="password2"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click.prevent = 'register'>注册</el-button>
      </el-form-item>
      <div class="common_set">
        <span class='goblackLogin' @click='goblackLogin'>返回登陆</span>
        <div class="commen_center">
        </div>
      </div>
    </el-form>
    <global-spinner v-show = 'spinner'></global-spinner>
  </div>
</template>


<script>

import './login.scss'
import http from '../../httpClient/httpClient'

  export default {
    data() {
      return {
        phone:'',
        username:'',
        password1:'',
        password2:'',
        changeRember:false,
        indexStatu:0,
        spinner:true
      }
        
    },

    methods:{
      getUsername(){
         // 延时请求，验证用户名
        var _username = document.querySelector('#phone');
        var getName = function(fn,dealy){
          var timer = null;
          return function(){
            clearTimeout(timer);
            timer = setTimeout(()=>{
              fn.apply(this,arguments);
            },dealy);
          }
        }

        var timeOut = function(){

            this.$store.dispatch('getPhone',{path:'getPhone',phone:this.phone});
        }.bind(this);
        _username.addEventListener('input',getName(timeOut,500));

      },
      goblackLogin(){
          this.$router.push('/');
      },

      register(){
       console.log(666);
        var reg = /^1[34578]\d{9}$/i;
        if(!reg.test(this.phone)){
          alert('手机号不合法');
          return false;
        }

        var reg = /^\S{1,6}$/;
        if(!reg.test(this.username)){
          alert('用户名长度必须小于6 ,不能包含空格');
          return false;
        } 

        var reg = /^\S{1,10}$/;
        if(!reg.test(this.password2)){
          console.log(4444);
          alert('密码长度必须小于6 ,不能包含空格');
          return false;
        }

        if(this.password1 !== this.password2){
           this.open('两次密码不一致');
        }else if(this.password1 == '' || this.password1 == '' || this.username == '' || this.phone == ''){
           this.open('输入框不能为空');

        }else{
          var self = this;
          http.post('register',{username:self.username,phone:self.phone,password:self.password2}).then(res => {
            if(res.data.state == 'ok'){
              this.$router.push('homePage');
            }
          })    
      }

      },
      open(parmas) {
        this.$alert(parmas, '注册', {
          confirmButtonText: '确定',
        })
      }
    },
    mounted(){
      this.getUsername();
      //loading
      setTimeout(item=>{
        this.spinner = false;

      },1000)
    },
    destoryed(){
      this.spinner = true;
    }
  }
</script>



<style lang='scss'>
  .registerIn{
    padding:30px 0;
    text-align:center;
    font-weight:600;
    color:#606266;
    margin-left:9px;
  }
  .register{
    .checkLogin{
      position:absolute;
      left:0;
      top:0;
    }
    .checkfailure{
      position:absolute;
      left:75%;
      top:22px;
    }
    .checkLogin{
      position:absolute;
      left:75%;
      top:22px;
    }

    .el-form{
      width:430px;
      border-radius:8px;
      border:1px solid #ccc;
    }
    .goblackLogin{
      display:block;
      position:absolute;
      right:20px;
      bottom:10px;
    }

  }
</style>