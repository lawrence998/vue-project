<template>
    <transition name="fade">
        <div v-if="show" class="bannerDetail">
            <div class="nav" >
                <div class="nav-inner">
                    <router-link to="/#"><i class="el-icon-back"></i></router-link>
                    <span>一家民宿注册红包</span>
                    <router-view></router-view>
                </div>
            </div> 
            <img src="../../../../src/assets/img/carousel/Banner4.jpg">
            <img src="../../../../src/assets/img/carousel/Banner5.jpg">
        </div>
    </transition>
</template>

<script>
    import './detail.scss'
    export default{
        data(){
            return {
                url:[],
                show:true
            } 
        }
    }
</script>  