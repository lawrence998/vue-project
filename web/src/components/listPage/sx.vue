<template>
    <div class="sxComponent" @click="sxComponent">
        <div class="sxss" v-if="sxss">
        <p v-html="p1" class="p1"></p>
        <ul class="fylx">
        <li><i></i><span>整套</span><input type="radio" name="onlyOne"/></li>
        <li><i></i><span>单间</span><input type="radio" name="onlyOne"/></li>
        <li><i></i><span>合住</span><input type="radio" name="onlyOne"/></li>
        </ul>
        <p v-html="p2" class="p2"></p>
        <div class="add" @click="add">
            <span>-</span>
            <p><i v-html="countPeople"></i><i  v-html="qty"></i></p>
            <span>+</span>
        </div>
        <p v-html="p3" class="p3"></p>
        <input type="text" value="请输入价格范围" class="price"/>
        <p v-html="p4" class="p4"></p>
        <ul class="fylx">
            <li><i></i><span>接待机</span><input type="checkbox"/></li>
        </ul>
        <p v-html="p5" class="p5"></p>
        <div class="fj" @click="rooms">
            <div>
                <span>-</span>
                <p>
                    <span class="qtyss"></span>
                    <span v-html="livingRoom"></span>
                </p>
                <span>+</span>
            </div>
            <div>
                <span>-</span>
                <p>
                    <span class="qtyss"></span>
                    <span v-html="bed"></span>
                </p>
                <span>+</span>
            </div>
            <div>
                <span>-</span>
                <p>
                    <span class="qtyss"></span>
                    <span v-html="wc"></span>
                </p>
                <span>+</span>
            </div>
            <div>
                <span>-</span>
                <p>
                    <span class="qtyss"></span>
                    <span v-html="publicWc"></span>
                </p>
                <span>+</span>
            </div>
        </div>
        <p v-html="p6" class="p6"></p>
        <ul class="fylx facility">
            <li><i></i><span>热水沐浴</span><input type="checkbox"/></li>
            <li><i></i><span>空调</span><input type="checkbox"/></li>
            <li><i></i><span>厨房</span><input type="checkbox"/></li>
            <li><i></i><span>暖气</span><input type="checkbox"/></li>
            <li><i></i><span>电视机</span><input type="checkbox"/></li>
            <li><span>更多配套设施</span></li>
        </ul>
        <div v-html="ent" class="ent"></div>
        </div>
        <div v-if="filters" class="filters"></div>
    </div>
</template>
<script>
    import './sx.scss';
    import axios from 'axios';
    export default{
        data:function(){
            return {
                p1:"房源类型",
                p2:"房客人数",
                qty:"不限",
                p3:"价格范围",
                p4:"其他服务",
                p5:"房间和床位",
                p6:"配套设施",
                countPeople:"",
                livingRoom:"卧室",
                bed:"床",
                wc:"独立卫生间",
                publicWc:"公共卫生间",
                ent:"确定",
                dataset:[],
                filters:false,
                sxss:true,
            }
        },
        methods:{
            add:function(e){
                var tg=e.target.innerText;
                if(tg=='+'){
                    this.countPeople=this.countPeople*1+1;
                    if(this.countPeople>16){
                        this.countPeople=16;
                        return;
                    }
                    this.qty="位房客";
                }else if(tg=='-'){
                    this.countPeople=this.countPeople*1-1;
                    this.qty="位房客";
                    if(this.countPeople*1<=0){
                        this.countPeople='';
                        this.qty='不限';
                    }
                }
            },
            rooms:function(e){
                var tags=e.target;
                var tags_qty=tags.parentNode.children[1].children[0];
                var tags_type=tags.parentNode.children[1].children[1];
                
                if(tags.innerText=='+'){
                    tags_qty.innerText=tags_qty.innerText*1+1; 
                    if(tags_type.innerText=='卧室'){
                        tags_type.innerText="间卧室";
                    }else if(tags_type.innerText=='床'){
                        tags_type.innerText="张床";
                    }else if(tags_type.innerText=='独立卫生间'){
                        tags_type.innerText="个独立卫生间";
                    }else if(tags_type.innerText=='公共卫生间'){
                        tags_type.innerText="个公共卫生间";
                    }   
                }
                if(tags.innerText=='-'){
                    var tg_qty=tags_qty.innerText=tags_qty.innerText*1-1; 
                    var tgin=tags_type.innerText;
                    if(tgin=="卧室" || tgin=="间卧室"){
                        if(tg_qty<=0){
                            tags_qty.innerText="";
                            tags_type.innerText="卧室";
                        }
                    }else if(tgin=='床' || tgin=='张床'){
                        if(tg_qty<=0){
                            tags_qty.innerText="";
                            tags_type.innerText="床";
                        }
                    }else if(tgin=='独立卫生间' || tgin=='个独立卫生间'){
                        if(tg_qty<=0){
                            tags_qty.innerText="";
                            tags_type.innerText="独立卫生间";
                        }
                    }else if(tgin=='公共卫生间' || tgin=='个公共卫生间'){
                        if(tg_qty<=0){
                            tags_qty.innerText="";
                            tags_type.innerText="公共卫生间";
                        }
                    }
                }
            },
            sxComponent:function(e){
                var target=e.target;
                var arr_infor=[];
                if(target.tagName.toLowerCase()=='input'){
                    var cshu=target.parentNode.parentNode.className;
                    if(target.checked && cshu=='fylx'){
                        var name=target.parentNode.children[1].innerText;
                        window.localStorage.setItem('house',name);
                    }else if(target.checked && target.parentNode.tagName=='LI'){
                        var facility=target.parentNode.children[1].innerText;
                        window.localStorage.setItem('facility',facility);
                    }
                }
                if(target.className=='ent'){
                    var house=window.localStorage.getItem('house');
                    var facility=window.localStorage.getItem('facility');
                    var str = house=house.length>0 ? house : facility=facility.length>0 ? facility : '';
                    console.log(house,facility);
                    axios.get('http://www.floats.top:1200/sx',{params:{date:str}}).then(response=>{
                        this.dataset=response.data.data.results;
                        this.sxss=false;
                        this.filters=true;
                        
                        var homeList=this.dataset;
                        var filtersBox =this.$el.firstElementChild;
                        filtersBox.innerHTML=homeList.map(function(item){
                            return `
                                <img src="../../assets/img/house/${item.placeimg}" />
                                <p>价格：￥${item.price}</p>
                                <p class="home_p1">
                                    <span>${item.way}</span>-
                                    <span>${item.city}</span>
                                </p>
                            `;
                        }).join('');


                        
                    });
                }
            }
        }
    }
</script>