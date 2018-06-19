<template>
  <div>
      <div class="orderlist">
            <div class="toplist"><i class="jtlist" v-on:click="golist"></i>我的预定</div>
            <div class="payment">
              <span :class="{'notpaid':true,'active':not}" style="border-right:1px solid #ccc;" v-on:click="nopaid">未付款</span>
              <span :class="{'spend':true,'active':yes}" v-on:click="spend">即将入住</span>
            </div>

            <ul v-show="ul1">
                <li v-for="(obj,index) in goods" v-if="obj.status==0" class="goodslist"  v-on:click="cli(obj.order_id)" :key="index">
                    <div class="hoteltitle"><span class="htitle">酒店名称</span>{{obj.title}}</div>
                    <div class="checktimes">

                      <div class="checkin fl"><span class="ruzhu">入住时间</span>{{format(obj.checkin)}}</div>
                      <div class="checkin fr"><span class="ruzhu">退房时间</span>{{format(obj.checkout)}}</div>
                    </div>
                </li>
            </ul>

            <ul v-show="ul2">
            <li  class="goodslist" v-for="(obj,index) in goods" v-if="obj.status==1"  v-on:click="cli(obj.order_id)" :key="index">
                  <div class="hoteltitle"><span class="htitle">酒店名称</span>{{obj.title}}</div>
                  <div class="checktimes">

                      <div class="checkin fl"><span class="ruzhu">入住时间</span>{{format(obj.checkin)}}</div>
                      <div class="checkin fr"><span class="ruzhu">退房时间</span>{{format(obj.checkout)}}</div>
                    </div>
            </li>
            </ul>
    </div>
  </div>
</template>

<script>
    import './orderlist.scss'
    import Http from'../../httpClient/httpClient'
      export default{
            data(){
              return{
                 ul1:true,
                 ul2:false,
                 not:true,
                 yes:false,
                 goods:[]
              }
            },
            methods:{
                golist(){
                  this.$router.go(-1);
                },
                nopaid(){
                     this.ul1=true
                      this.ul2=false
                      this.not = true
                      this.yes=false

                },
                spend(){
                    this.ul1=false
                    this.ul2=true
                    this.yes = true
                    this.not = false

                },
                cli(objid){
                    this.$router.push({name:'orderPage',query:{title:objid}})
                },

                 format(date){
                             
                              var year = (new Date(date).getFullYear());
                              var month = (new Date(date).getMonth()+1);
                              var day = (new Date(date).getDate());

                              return year + '-' + month + '-' + day;
                }

            },
            beforeMount(){
                   var oname = JSON.parse(localStorage.getItem("data")).user_id;
                   
                  Http.post('orderlist',{user_id:oname}).then((res)=>{

                   try{
                     this.goods =  res.data.data.results
                     console.log(res.data.data.results[0])
                   }catch(err){
                      console.log(err)
                   }


             })
    }
}

</script>