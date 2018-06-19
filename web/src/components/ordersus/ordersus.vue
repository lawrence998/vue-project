<template>
  <div>
    <div class="flex-container" v-show = "showcontainer">
          <div class="top"><i class="jt" v-on:click="go"></i>已付款</div>
          <div class="housemsg">
             <span class="houseimg fl"><img src="../../assets/img/house/bg1_1.jpg" height="683" width="1024" class="houseimg2"></span>
             <span class="fl">
                <p class="bt">{{bt}}</p>
                <p class="jg">￥{{jg}}</p>
             </span>
          </div>
          <div class="landlady">房&nbsp;&nbsp;&nbsp;&nbsp;东&nbsp;:&nbsp;&nbsp;<span>{{landlady}}</span></div> 
          <div class="landtel">联系电话&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;{{dianhua}}</div>
          <div class="landwc">房东微信&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;{{landlady}}</div>
          <div class="houseadd">地&nbsp;&nbsp;址&nbsp;&nbsp;:&nbsp;&nbsp;<span class="housedz">{{houseadd}}</span></div>
          <div class="checkin">
                入住时间&nbsp;&nbsp;:&nbsp;&nbsp;<span class="rzsj">2018-2-1</span><br/>
                退房时间&nbsp;&nbsp;:&nbsp;&nbsp;<span class="tfsj">2018-2-3</span><br/>
                入住天数&nbsp;&nbsp;:&nbsp;&nbsp;<span class="rs">{{rs}}</span>
          </div>
          <div class="allPrice">总价<span class="zjq fr">￥{{allPrice}}</span></div> 
    </div>


     <div class="flex-container2" v-show = "showcontainer2">
          <div class="top"><i class="jt" v-on:click="go"></i>订单详情</div>
         <img src="../../assets/img/house/no-oreder.png" class="no-order"/>
    </div>
  </div>
</template>


<script>
    import './ordersus.scss'
    import Http from'../../httpClient/httpClient'
      export default{
            data(){
              return{

                    showcontainer:true,
                    showcontainer2:false,
                    bt:'',
                    jg:'',
                    landlady:'',
                    houseadd:'',
                    allPrice:'',
                    rs:'',
                    dianhua:''
                    // imgs:''
              }
            },
            beforeMount(){
                var oname = JSON.parse(localStorage.getItem("data")).username;
                Http.post('orderpage',{oname:oname}).then((res)=>{
                    if(res.data.state=='ok'){
                        Http.post('downmsg',{oname:oname}).then((res)=>{
                            console.log(res);
                            this.bt = res.data.dd.introduce;
                            
                            this.jg = res.data.dd.price;
                            this.landlady = res.data.dd.username
                            this.houseadd = res.data.dd.city
                            this.rs = 3
                            this.dianhua = res.data.dd.dianhua
                            // this.rs = res.data.dd.day
                            // var imgs = res.data.dd.imgurl.split(',')[0]
                            // console.log(imgs)
                            // this.imgs = imgs;
                            this.allPrice = this.rs * this.jg;
                            
                            return;
                        })

                    }else{
                        this.showcontainer = false;
                        this.showcontainer2 = true;
                    }
                })
            },
            methods:{
                go(){
                    this.$router.go(-1);
                }
            }
    }
</script>