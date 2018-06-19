

<template>
    <div>
      <el-dialog
        title="评论重定义"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>修改用户评论</span>  
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea">
          </el-input> 
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="sendDatas">确 定</el-button>
        </span>
      </el-dialog>  
    </div>
</template>


<script>

  import http from '../../../../httpClient/httpClient'
  export default {
    data() {
      return {
        dialogVisible: false,
        textarea:'',
        comments_change_id:''

      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认修改？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      changeComment(datas,idx){
        this.dialogVisible = true;
        this.textarea = datas.comment_content;
        this.product_id = datas.product_id;
        this.idx = idx;
      },
      sendDatas(){
          var changeData = this.textarea;
          var product_id = this.product_id;
          http.get('commentupdate',{msg:changeData,id:product_id}).then(res => {
            if(res){
              var index =  this.idx;
              this.$store.state.comment[index].comment_content = this.textarea;
              this.dialogVisible = false;
            }
          })
      }
    }
  };
</script>


<style>
  
  .el-textarea__inner{
      height:150px;
  }

  .el-popover{
    width:500px !important;
  }
</style>