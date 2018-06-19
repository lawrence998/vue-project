<style lang="scss" src="./homerest.scss"></style>
<template>
  <div class="home-page">
    <div class="hot-city">
      <p class="hot-title">-热门城市-</p>
      <div class="cover-left"></div>
      <ul class="content1" v-on:touchstart="start($event)" v-on:touchmove="move($event)">
        <li v-for="(item, key) in dataset" v-if="item.hot" :key="key">
          <router-link :to="{name:'ListPage',params:{city:item.city}}" >
            <img v-bind:src="'src/assets/img/hotel/'+item.city_img"/>
            <p>{{item.city}}</p>
          </router-link>
        </li>
      </ul>
      <div class="cover-right"></div>
      <div class="dot1">
        <span class="active"></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="you-like">
      <p class="like-title">-你可能会喜欢-</p>
      <ul class="content2" v-on:touchstart="start($event)" v-on:touchmove="move($event)" :style="`width:${ulWidth}rem`">
        <li v-for="(item, index) in dataset2" :key="index">
          <router-link class="like-contain" :title="item.title" :to="clickFn2(item.product_id)" >
            <img class="house" v-bind:src="gernerateImg(item.imgurl.split(',')[0] || item.imgurl)" />
            <i class="like" v-on:click="like($event)"></i>
            <p class="price"><span>￥</span>{{item.price}}</p>
            <a class="name">{{item.title}}</a>
            <p class="location">{{item.houseType}}-{{item.adress}}</p>
          </router-link>
          <img class="host" v-bind:src="'src/assets/img/hotel/'+item.owner_img" />
          <p class="evaluate"><img src="../../../assets/img/hotel/evaluate_5.png" /><span>{{item.comment_qty}}条评价</span></p>
        </li>
      </ul>
    </div>
    <div class="china-city">
      <p class="city-title">-玩遍中国-</p>
      <div class="cover-left"></div>
      <ul class="content3" v-on:touchstart="start($event)" v-on:touchmove="move($event)">
        <li v-for="(item, index) in dataset" v-if="item.china" v-on:click="clickFn2(item.city)" :key="index">
          <router-link :to="{name:'ListPage',params:{city:item.city}}">
            <img v-bind:src="'src/assets/img/hotel/'+item.city_img" />
            <p>{{item.city}}</p>
          </router-link>
        </li>
      </ul>
      <div class="cover-right"></div>
      <div class="dot3">
        <span class="active"></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</template>
<script>
import Http from'../../../httpClient/httpClient'
import Velocity from 'velocity-animate';
export default {
  data() {
    return {
      startX: 0,
      startY: 0,
      dataset: [],
      dataset2: [],
      heart:true,
      liWidth: 0,
      ulWidth: 0
    }
  },
  methods: {
    clickFn2(routeDetail){
        return '/Detail/'+routeDetail;    
    },
    gernerateImg: function (imgurl){
        return "src/assets/img/hotel/" + imgurl
    },
    start($event) {
      this.startX = $event.changedTouches[0].pageX;
      this.startY = $event.changedTouches[0].pageY;
    },
    move($event) {
      var moveEndX = $event.changedTouches[0].pageX;
      var moveEndY = $event.changedTouches[0].pageY;
      var X = moveEndX - this.startX;
      var Y = moveEndY - this.startY;
      var content1 = document.getElementsByClassName('content1')[0];
      var content2 = document.getElementsByClassName('content2')[0];
      var content3 = document.getElementsByClassName('content3')[0];
      var left = parseFloat(getComputedStyle(content1).left);
      var target1 = left;
      var target2 = left;
      var left2 = parseFloat(getComputedStyle(content2).left);
      var target3 = left2;
      var target4 = left2;
      var left3 = parseFloat(getComputedStyle(content3).left);
      var target5 = left3;
      var target6 = left3;

      var dot1 = document.getElementsByClassName('dot1')[0].children;
      var dot3 = document.getElementsByClassName('dot3')[0].children;

      if(X > 0){
        if($event.path[3].className === 'content1') {
            if(left >=0){
              target1 += 0;
            }else{
              target1 += 750;
            }
            for(var i = 0 ;i<dot1.length;i++){
              dot1[i].classList.remove('active');
              if(left == -750 || left == 0){
                dot1[0].classList = 'active';
              }else if(left == -1500){
                dot1[1].classList = 'active';
              }
           }
            Velocity(content1, {left:target1}, 1000);
        }
        if($event.path[3].className === 'content2'){
          if(left2 >=0){
            target3 += 0;
          }else{
            target3 += 690;
          }
          Velocity(content2, {left:target3}, 1000)
        }
        if($event.path[3].className === 'content3'){
          if(left3 >=0){
            target5 += 0;
          }else{
            target5 += 750;
          }
          for(var i =0;i<dot3.length;i++){
              dot3[i].classList.remove('active');
              if(left3 == -750 || left3 == 0){
                dot3[0].classList = 'active';
              }else if(left3 == -1500){
                dot3[1].classList = 'active';
              }
           }
            Velocity(content3, {left:target5}, 1000)
        }

      }else if(X < 0){
        if($event.path[3].className === 'content1') {
          if(left <-800){
            target2 -= 0;
          }else{
            target2 -= 750;
          }
          for(var i=0;i<dot1.length;i++){
              dot1[i].classList.remove('active');
            if(left == 0){
              dot1[1].className = 'active';
            }else if(left == -750 || left == -1500){
              dot1[2].className = 'active';
            }
          }
          
          Velocity(content1, {left:target2}, 1000)
        }
        if($event.path[3].className === 'content2'){
          if(left2 <-4830){
            target4 -= 0;
          }else{
            target4 -= 690;
          }
          Velocity(content2, {left:target4}, 1000)
        }
        if($event.path[3].className === 'content3'){
          if(left3 <-900){
           target6 -= 0;
          }else{
             target6 -= 750;
          }
          for(var i=0;i<dot3.length;i++){
              dot3[i].classList.remove('active');
            if(left3 == 0){
              dot3[1].className = 'active';
            }else if(left3 == -750 || left3 == -1500){
              dot3[2].className = 'active';
            }
          }
            Velocity(content3, {left:target6}, 1000)
        }
      }
    },
    like($event){
       $event.preventDefault(); 
      $event.toElement.style.background = this.heart===true? "url('src/assets/img/hascollectioned.png') no-repeat" : "url('src/assets/img/uncollection.png') no-repeat";

      this.heart = !this.heart;
    }
  },
  beforeMount() {
    Http.get('hotcity').then(response => {  
      console.log(response)
      this.dataset = response.data.data.results;
    })
    Http.get('youlike').then(response => {
      this.dataset2 = response.data.data.results; 
    }).then(()=>{
      let li = document.querySelector('.content2 li');
      if(li){
        this.liWidth = document.querySelector('.content2 li').offsetWidth + parseFloat(window.getComputedStyle(document.querySelector('.content2 li')).marginLeft) + parseFloat(window.getComputedStyle(document.querySelector('.content2 li')).marginRight);
        let marginLeft = parseFloat(window.getComputedStyle(li).marginLeft);
        let marginRight = parseFloat(window.getComputedStyle(li).marginRight);
        this.liWidth = li.offsetWidth + marginLeft + marginRight;
        this.ulWidth = this.liWidth*this.dataset2.length;
        console.log(this.ulWidth)
      }
    })
  }
}

</script>