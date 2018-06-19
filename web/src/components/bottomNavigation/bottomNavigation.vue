<style lang="scss" src="./bottomNavigation.scss"></style>
<template>
    <div class="bottom-navigation">
        <router-link :to="{name:'HomePage'}" exact><i class="el-icon-search"></i>发现 </router-link>
        <router-link :to="{name:'ListPage',params:{city:'上海'}}"><i class="el-icon-star-off"></i>推荐</router-link>
        <router-link :to="{name:'News'}"><i class="el-icon-service"></i>消息 </router-link>
        <router-link :to="{name:'Users'}"><i class="el-icon-view"></i>我的 </router-link>
    </div>
</template>

<script>

export default {
   
}

</script>
