
<template>
  <div>
    <div class="flex-container" v-show = "showcontainer">
          <div class="top"><i class="jt" v-on:click="go"></i>订单详情</div>
          <div class="housemsg">
             <span class="houseimg fl"><img src="../../assets/img/house/bg1_1.jpg" height="683" width="1024" class="houseimg2"></span>
             <span class="fl">
                <p class="bt">{{bt}}</p>
                <p class="jg">￥{{jg}}</p>
             </span>
          </div>
          <div class="landlady">房&nbsp;&nbsp;&nbsp;&nbsp;东&nbsp;:&nbsp;&nbsp;<span>{{landlady}}</span></div> 
          <div class="landtel">联系电话&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;013-22345678</div>
          <div class="landwc">房东微信&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;xwkijel</div>
          <div class="houseadd">地&nbsp;&nbsp;址&nbsp;&nbsp;:&nbsp;&nbsp;<span class="housedz">{{houseadd}}</span></div>
          <div class="checkin">
                入住时间&nbsp;&nbsp;:&nbsp;&nbsp;<span class="rzsj">{{checkin}}</span><br/>
                退房时间&nbsp;&nbsp;:&nbsp;&nbsp;<span class="tfsj">{{checkout}}</span><br/>
                入住天数&nbsp;&nbsp;:&nbsp;&nbsp;<span class="rs">{{rs}}</span>
          </div>
          <div class="allPrice">总价<span class="zjq fr">￥{{allPrice}}</span></div> 
          <div class="anniu"><span class="span1" v-on:click="qx" v-show="fk2">取消订单</span><span style="color:#E7336E" class="span1" v-on:click="fk" v-show="fk2">付款</span></div> 
    </div>


     <div class="flex-container2" v-show = "showcontainer2">
          <div class="top"><i class="jt" v-on:click="go"></i>订单详情</div>
         <img src="../../assets/img/house/no-oreder.png" class="no-order"/>
    </div>
  </div>
</template>

<script>
    import './orderpage.scss'
    import Http from'../../httpClient/httpClient'
      export default{
            data(){
              return{

                    showcontainer:true,
                    showcontainer2:false,
                    bt:'',
                    jg:'',
                    rs:'',
                    landlady:'',
                    houseadd:'',
                    allPrice:'',
                    checkin:'',
                    checkout:'',
                    fk2:false
                 
                  
              }
            },
            beforeMount(){
               var objid = this.$route.query.title;
                Http.post('orderpage',{oname:objid}).then((res)=>{
                  
                    if(res){
                            console.log(res.data.data.results[0]);
                            this.bt = res.data.data.results[0].title
                            this.jg = res.data.data.results[0].price;
                            this.landlady = res.data.data.results[0].owner_name;
                            this.houseadd = res.data.data.results[0].adress
                            var check = res.data.data.results[0].checkin;
                            var out =  res.data.data.results[0].checkout;
                            var oldTime = (new Date(check)).getTime(); 
                            var outTime = (new Date(out)).getTime();
                            var newTime = (outTime-oldTime)/1000/60/60/24;
                            this.rs = newTime;

                            // // var imgs = res.data.dd.imgurl.split(',')[0]
                            // // console.log(imgs)
                            // // this.imgs = imgs;
                            this.allPrice = this.rs * this.jg;
                            
                            var format = function(date) {

                              var year = (new Date(date).getFullYear());
                              var month = (new Date(date).getMonth()+1);
                              var day = (new Date(date).getDate());

                              return year + '-' + month + '-' + day;
                          };

                           this.checkin = format(check)
                            this.checkout = format(out)

                            if(res.data.data.results[0].status == 0){
                                this.fk2 = true;

                            }else{
                              this.fk2 = false;
                            }
                    }

                    // else{
                    //     this.showcontainer = false;
                    //     this.showcontainer2 = true;
                    // }
                })
            },
            methods:{
                go(){
                    this.$router.go(-1);
                },

                qx(){
                   var objid = this.$route.query.title;
                    Http.post('qxdd',{oname:objid}).then((res)=>{
                        
                    })
                    this.showcontainer = false;
                    this.showcontainer2 = true;
                },
                fk(){
                   var objid = this.$route.query.title;
                   this.$router.push({name:'pay',query:{title:this.bt,price:this.allPrice,id:objid}});
                }
            }
    }
</script>