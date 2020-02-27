<template>
    <div class="pxComponent">
        <ul @click="active">
            <li v-for="(val,idx) in dataset" v-bind="lming" :key="idx">
                <span v-html="val"></span>
                <i></i>
            </li>
        </ul>
    </div>
</template>
<script>
    import axios from 'axios';
    export default{
        data(){
            return {
                dataset:['默认排序','低价优先','高价优先','好评优先'],
                dates:[],
                lming:''
            }
        },
        methods:{
            active:function(e){
                var lis=this.$el.firstChild.childNodes;
                for(var i=0;i<lis.length;i++){
                    lis[i].className='';
                }
                if(e.target.tagName.toLowerCase()=='span'){
                    e.target.parentNode.classList.add('active');
                }else if(e.target.tagName.toLowerCase()=='li'){
                    e.target.classList.add('active');
                }
                var yuan =e.target;
                var render=this.dataset[0];
                var lowPrice=this.dataset[1];
                var highPrice=this.dataset[2];
                var goodPing=this.dataset[3];
                if(yuan.innerText==lowPrice){
                    axios.get('localhost:1200/lowPrice',{params:{date:"lowPrice"}}).then(response=>{
                        console.log(response)
                        var dates=response.data.results;
                        this.dates=dates;
                        var all =document.querySelector('.pxComponent');
                        console.log(all);
                        all.innerHTML=this.dates.map(function(item){
                            return `
                                <div class="objRegion">
                                    <a href="/#/Detail/${item.product_id}">
                                        <img src="src/assets/img/hotel/${item.imgurl.split(',')[0] || item.imgurl}" class="bigImg"/>
                                    </a>
                                    <a href="/#/Detail/${item.product_id}">
                                        <p class="intr">${item.title}</p>
                                    </a>
                                    <span class="price">${item.price}</span>
                                    <div class="city">${item.city}</div>
                                    <p>
                                        <img src="src/assets/img/hotel/${item.comment_img}" class="pl"/>
                                        共<span>${item.comment_qty}</span>条评论
                                    </p>
                                </div>
                            `;
                        }).join(''); 
                    }); 
                }

               
                //高价排序排序
                if(yuan.innerText==highPrice){
                    axios.get('localhost:1200/highPrice',{params:{date:"highPrice"}}).then(response=>{
                        var dates=response.data.results;
                        this.dates=dates;
                        var all =document.querySelector('.pxComponent');
                        console.log(all);
                        all.innerHTML=this.dates.map(function(item){
                            return `
                                <div class="objRegion">
                                    <a href="/#/Detail/${item.product_id}">
                                        <img src="src/assets/img/hotel/${item.imgurl.split(',')[0] || item.imgurl}" class="bigImg"/>
                                    </a>
                                    <a href="/#/Detail/${item.product_id}">
                                        <p class="intr">${item.title}</p>
                                    </a>
                                    <span class="price">${item.price}</span>
                                    <div class="city">${item.city}</div>
                                    <p>
                                        <img src="src/assets/img/hotel/${item.comment_img}" class="pl"/>
                                        共<span>${item.comment_qty}</span>条评论
                                    </p>
                                </div>
                            `;
                        }).join(''); 
                    });
                }
                // var kinds=e.target.children[0].innerText != undefined ? e.target.children[0].innerText : e.target.innerText;
                // console.log(kinds);
                // var lowPrice=this.dataset[1];
                // var highPrice=this.dataset[2];
                // var goodPing=this.dataset[3];
                // if(kinds==lowPrice){
                // //排序 低价优先
                //     axios.get('localhost:1200/px',{params:{date:''}}).then(response=>{
                //         console.log(response);
                //     })
                // }else if(kinds==highPrice){
                // //排序  高价优先
                    
                // }else if(kinds==goodPing){
                // //排序  好评优先
                   
                // }

                //好评 排序
                
                if(yuan.innerText==goodPing){
                    axios.get('localhost:1200/goodPing',{params:{date:"goodPing"}}).then(response=>{
                        var dates=response.data.results;
                        this.dates=dates;
                        var all =document.querySelector('.pxComponent');
                        all.innerHTML=this.dates.map(function(item){
                            return `
                                <div class="objRegion">
                                    <a href="/#/Detail/${item.product_id}">
                                        <img src="src/assets/img/hotel/${item.imgurl.split(',')[0] || item.imgurl}" class="bigImg"/>
                                    </a>
                                    <a href="/#/Detail/${item.product_id}">
                                        <p class="intr">${item.title}</p>
                                    </a>
                                    <span class="price">${item.price}</span>
                                    <div class="city">${item.city}</div>
                                    <p>
                                        <img src="src/assets/img/hotel/${item.comment_img}" class="pl"/>
                                        共<span>${item.comment_qty}</span>条评论
                                    </p>
                                </div>
                            `;
                        }).join(''); 
                    });
                }

                //默认（我这里用的是随机排序）排序
                
                if(yuan.innerText==render){
                    axios.get('localhost:1200/rander',{params:{date:"rander"}}).then(response=>{
                        var dates=response.data.results;
                        this.dates=dates;
                        var all =document.querySelector('.pxComponent');
                        all.innerHTML=this.dates.map(function(item){
                            return `
                                <div class="objRegion">
                                    <a href="/#/Detail/${item.product_id}">
                                        <img src="src/assets/img/hotel/${item.imgurl.split(',')[0] || item.imgurl}" class="bigImg"/>
                                    </a>
                                    <a href="/#/Detail/${item.product_id}">
                                        <p class="intr">${item.title}</p>
                                    </a>
                                    <span class="price">${item.price}</span>
                                    <div class="city">${item.city}</div>
                                    <p>
                                        <img src="src/assets/img/hotel/${item.comment_img}" class="pl"/>
                                        共<span>${item.comment_qty}</span>条评论
                                    </p>
                                </div>
                            `;
                        }).join(''); 
                    });
                }

            }
        }
    }
</script>