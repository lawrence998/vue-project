<template>
<div>
    <div class="talk-box" v-if="show">
        <div class="talk-title">
            <p>{{title}}</p>
            <button class="close" @click="close">&times;</button>
        </div>
        <div class="talkcontent" @click="hide">
            <ul>
            </ul>
        </div>
        <div class="bottom">
            <div class="msg">
                <input type="text" class="txt" @click="question"/>
                <button class="send" @click="send(title)">发送</button>
            </div>
            <div class="keyboard">
                模拟手机键盘位置
            </div>
        </div>  
    </div> 
    <div class="news-box" v-else>
        <div class="news-tatie">
            <p>消息</p>
        </div>

        <div class="news-kefu" @click="talkRobot('客服小一为您服务')">
            <div class="news-kefu-left" >
                <i class="el-icon-service"></i>
            </div>
            <div class="news-kefu-right">
                <p class="news-p1">  
                    <span class="newsFrom">客服小一</span>
                    <span class="newsTime">{{day}}</span>
                </p>
                <p class="news-p2">您好，我是客服小一，很高兴为您服务！</p>
            </div> 
        </div>
        <div class="news-list">
            <div class="news-kefu" v-for="(item,index) in house" @click="talk(item.househost)" :key="index">
                <div class="news-kefu-left">
                    <img class="host" :src="'src/assets/img/house/'+item.housekeeper"/>
                </div>
                <div class="news-kefu-right">
                    <p class="news-p1">  
                        <span class="newsFrom">{{item.househost}}</span>
                        <span class="newsTime">{{day}}</span>
                    </p>
                    <p class="news-p2">消息记录</p>
                </div> 
            </div>
        </div>
        <bottomNavigation></bottomNavigation>
    </div>
</div>  
</template>

<script>
    import bottomNavigation from '../bottomNavigation/bottomNavigation.vue'
    import './news.scss'
    import Http from'../../httpClient/httpClient'
    import $ from 'jquery'
    export default{
        data(){
            return{
                user:'',
                house:[],
                day:'',
                show:false,
                title:'',
                time: ''
            }
        },
        components:{
            bottomNavigation
        },
        methods:{
            houseHost(){
                var storage = window.localStorage;
                if(storage.data){
                    this.user = JSON.parse(storage.data).nicheng;
                    if(this.$route.params.househost){
                        if(storage.house){
                            this.house = JSON.parse(storage.house)
                            // for(var i=0;i<this.house.length;i++){
                            //     if(this.house[i].househost == this.$route.params.househost){
                            //         return;
                            //     }
                            // }
                        }

                        console.log(this.house);
                        this.house.push({househost:this.$route.params.househost,housekeeper:this.$route.params.housekeeper});

                        this.house = JSON.stringify(this.house);

                        storage.setItem("house",this.house);

                        this.house = JSON.parse(storage.house);
                       
                    }else{
                        if(storage.house){
                            console.log(storage.house);
                            this.house = JSON.parse(JSON.stringify(storage.house));
                            console.log(this.house);
                        }
                        
                    }
                }
            },
           msgDate(){
                var now = new Date();
                var y = now.getFullYear();
                var m = now.getMonth() + 1;
                var d = now.getDate();
                var h = now.getHours();
                var m = now.getMinutes();

                h = (h<10 ? '0' : '') + h;
                m = (m<10 ? '0' : '') + m;

                this.day = y + '-' + m + '-' + d;
                this.time = m + '-' + d + ' ' + h + ':' + m;
            },
            talkRobot(a){
                this.show = true;
                this.title = a;
            },
            talk(b){
                this.show = true;
                this.title = b;
            },
            close(){
                this.show = false;
            },
            question(){
                let bottom = document.querySelector('.bottom');
                bottom.style.bottom = '0px';
            },
            hide(){
                let bottom = document.querySelector('.bottom');
                bottom.style.bottom = '-4.933333rem';
            },
            send(title){
                let bottom = document.querySelector('.bottom');
                let txts = document.querySelector('.txt');
                let txtVal = txts.value;
                
                if(txtVal === ''){
                    return;
                }
                var anwser;
                Http.post('http://www.tuling123.com/openapi/api',{
                    "key": "456bfe964b814f54ac186657ef2b9c26",
                    "info": '"'+txtVal+'"',
                    "useid": "1"
                }).then(response=>{  
                     anwser = response.data.text;
                })

                let content = document.querySelector('.talkcontent');
                let ul = content.children[0];
                
                let li = `<li class="active">
                            <p>${txtVal}</p>
                            <img src="src/assets/img/house/via.jpg"/>
                         </li>`;
                $(ul).append(li);
                content.scrollTop = content.scrollHeight;
                 
                if(this.title === '客服小一为您服务'){
                console.log(this.anwser)
                    setTimeout(function(){
                        li = `<li>
                                <img src="src/assets/img/kefu.jpg"/>
                                <p>${anwser}</p>
                            </li>`;
                        $(ul).append(li);
                        content.scrollTop = content.scrollHeight;
                    },2000);
                }else{
                    setTimeout(function(){
                     li = `<li>
                                <img src="src/assets/img/kefu.jpg"/>
                                <p>已为您通知房东，请注意消息回复</p>
                            </li>`;
                        $(ul).append(li);  
                        content.scrollTop = content.scrollHeight;
                    },2000);
                }
                txts.value = '';
                bottom.style.bottom = '-4.933333rem';
            }
        },
        mounted(){
           this.houseHost();
           this.msgDate();  
        }
    }
</script>