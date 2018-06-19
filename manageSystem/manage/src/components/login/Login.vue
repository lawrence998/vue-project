
<template>
  <div>
    <el-form label-width="100px" class="demo-ruleForm" v-on:submit.prevent="LoginIn">
    <p class="youyu">有鱼民宿管理系统</p>
      <el-form-item label="用户名">
        <el-input type="text" id="username" v-model="username">
        </el-input>
        <span v-show="this.$store.state.username == 'ok'" class=" checkLogin el-icon-circle-check"></span>
        <span v-show="this.$store.state.username == 'err'" class=" checkfailure el-icon-circle-close"></span>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" id="password" v-model="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.prevent = 'LoginIn'>登录</el-button>
      </el-form-item>
      <div class="common_set">
        <div class="commen_center">
          <span class="remberPaw">
            <ins @click = 'remberState'><span class="remberPassword el-icon-check" v-show="changeRember"></span></ins>
            <em>记住密码</em>
        </span>
          <span class="regsiter" @click = 'register'>注册</span>
          <span class="forgetPaw">忘记密码</span>
        </div>
        <global-spinner v-show = 'spinner'></global-spinner>
      </div>
    </el-form>
  </div>
</template>


<script>

import './login.scss'

  export default {
    data() {
      return {
        username:'',
        password:'',
        changeRember:false,
        indexStatu:0,
        spinner:true
      }
        
    },
    beforeCreate(){
      if(localStorage.getItem('username') &&　localStorage.getItem('password')){
        var username = localStorage.getItem('username');
        var password = localStorage.getItem('password');
        var parm = {username:username,password:password};
        this.$store.dispatch('loginIn',{path:'login',login:parm});
      }
    },
    methods:{
      getUsername(){
         // 延时请求，验证用户名
        var _username = document.querySelector('#username');
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
            this.$store.dispatch('get_username',{path:'getUsername',name:{username:this.username}})
        }.bind(this);
        _username.addEventListener('input',getName(timeOut,500));
      },

      LoginIn(e){
        //登录验证
        if(this.username && this.password){
          var parm = {username:this.username,password:this.password};
          this.$store.dispatch('loginIn',{path:'login',login:parm});
        }
      },

      register(){
        this.$router.push({name:'register'});
      },

      remberState(){
        this.indexStatu++;
        if(this.indexStatu%2 !==0){
          this.changeRember = true;
        }else{
          this.changeRember = false;
        }
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