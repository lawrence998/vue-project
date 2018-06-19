<template>
    <div class="page" @click="getCity">
        <div class="nav" >
            <div class="nav-inner">
                <router-link to="/#"><i class="el-icon-close"></i></router-link>
                <span>搜索</span>
                <router-view></router-view>
            </div>
        </div>
        <form id="searchform" class="searchbar">
            <div class="searchbar-input">
                <input type="search" id="search-input" placeholder="搜索想去的目的地、景点" @focus="button" v-model="city"/>
            </div>
        </form>
        <div class="search_history">
            <p>历史搜索</p>
            <ul>
                <li v-for="(value,index) in cityName" :key="index">
                    {{value}}
                </li>
            </ul>
        </div>
        <router-link :to="gernerateLink(city)" >
            <button class="search-btn" @click="history">立即搜索</button>
        </router-link>
        <div class="hot-city">
            <p>热门城市</p>
            <ul class="list-group" >
                <li>京都</li>
                <li>上海</li>
                <li>大阪府</li>
                <li>曼谷</li>
                <li>洛杉矶</li>
                <li>杭州</li>
                <li>清迈</li>
                <li>新加坡</li>
            </ul>
        </div>  

    </div>
</template>

<script>
    import './searchDetail.scss'
    export default{
        data(){
            return {
                city:'',
                cityName:[]
            }
        },
        beforeMount(){
            var searchInput = document.querySelector('#search-input');
            console.log(JSON.parse(window.localStorage.historyCity))
            var storage = window.localStorage.historyCity;
            if(storage){
                storage = JSON.parse(storage)
                var history = storage.search_city.split(',') || storage.search_city;
                this.cityName = history;
                console.log(this.cityName);
            }
        },
        methods:{
            getCity: function(event){
                var currentLi = event.target;
                var searchInput = document.querySelector('#search-input');
                var searchBtn = document.querySelector('.search-btn');
                if(currentLi.tagName.toLowerCase() == 'li'){
                    var currentCity = currentLi.innerText;
                    searchInput.value = currentCity;
                    searchBtn.style.background = '#58bc58';
                    this.city = searchInput.value;
                    console.log(this.city);
                }
            },
            history(){console.log(777)
                var searchInput = document.querySelector('#search-input');
                var storage = window.localStorage.historyCity;
                var value = searchInput.value;
                var obj = {};
                var obj = JSON.stringify({search_city:value});
                localStorage.setItem("historyCity",obj);
                if(storage){
                    storage = JSON.parse(storage)
                    var history = storage.search_city;
                    var value = searchInput.value + ',' + history;
                    var obj = JSON.stringify({search_city:value});
                    localStorage.setItem("historyCity",obj);
                }
                
            },
            gernerateLink: function (linkurl){
                return "/ListPage/" + linkurl
            },
            onSearch() {
                const loading = this.$loading({
                  lock: true,
                  text: '玩命加载中',
                  spinner: 'el-icon-loading',
                  background: 'rgba(255, 255, 255, 1)',
                  target: document.querySelector('.page')
                });
                setTimeout(() => {
                  loading.close();
                }, 1000);
            },
            button(){
                var searchBtn = document.querySelector('.search-btn');
                searchBtn.style.background = '#58bc58';
            },
            searchCity(){
                var searchInput = document.querySelector('#search-input');
                this.city = searchInput.value; console.log(this.city)
            }
        },
        created(){
            this.onSearch();
        },
        watch:{
            '$route':function(to,from){
　　　　　　　　　document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
           }
		}
    }
</script>