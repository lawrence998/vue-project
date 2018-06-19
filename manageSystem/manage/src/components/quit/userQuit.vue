<template>
  <div>
    <el-button type="text" @click="open2"></el-button>
  </div>
</template>

<script>
  export default {
    methods: {
      open2() {
        this.$confirm('退出登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          window.localStorage.removeItem('username');
          window.localStorage.removeItem('password');
          this.$message({
            type: 'success',
            message: '已退出登录!'
          });

          setTimeout(item => {
            this.$router.push('/');
          },1000);

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出登录'
          });          
        });
      }
    }
  }
</script>