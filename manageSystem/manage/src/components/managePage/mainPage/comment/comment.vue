<template>
  <div class="comment">
    <!-- <p>{{$store.state.comment.slice(0,1)}}</p> -->
    <el-button class="searchMsg"
        size="mini"
        type="danger"
        @click="handleWatch(scope.$index, scope.row)">搜索
    </el-button>
    <div class="editComment">
      <editComponents ref = 'edit'>
      </editComponents>
    </div>
    <el-table
      :data="$store.state.comment"
      style="width: 100%">

      <el-table-column
        label="旅馆序号"
        width='100%'>
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.product_id}}号旅馆</span>
        </template>
      </el-table-column>

      <el-table-column
        label="房主"
        width="100%">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.owner_name }}</p>
            <p>电话: {{ scope.row.dianhua }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.owner_name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column
        label="标题"
        width="140%">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>房子详情: {{ scope.row.title }}</p>
            <div slot="reference" class="name-wrapper">
              <span>{{ scope.row.title }}</span>
            </div>
          </el-popover>
        </template>
      </el-table-column>

     <el-table-column
        label="所在城市"
        width="150%">
        <template slot-scope="scope">
          <span>{{ scope.row.adress }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="房型"
        width="150%">
        <template slot-scope="scope">
          <span>{{ scope.row.houseType }}/{{scope.row.room_qty}}/{{scope.row.bed_qty}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="评论数量"
        width="80%">
        <template slot-scope="scope">
          <span>{{ scope.row.comment_qty}}</span>
        </template>
      </el-table-column>

     <el-table-column
        label="用户评价"
        width="200%">
        <template slot-scope="scope">
         <el-popover trigger="hover" placement="top">
            <p>旅馆评价: {{ scope.row.comment_content }}</p>
            <div slot="reference" class="name-wrapper">
              <span>{{ scope.row.comment_content }}</span>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="$store.state.pageNumber*10">
    </el-pagination>
  </div>
</template>

<script>
  import editComponents from './editComponents'
  import http from '../../../../httpClient/httpClient'
  export default {
    data() {
        return{
          
        }
    },
    beforeCreate(){
      this.$store.dispatch('comment',{path:'comment/',msg:'allComment',qty:9});
    },
    components:{
      editComponents,
    },
    computed:{
      dataSet:{
        get(){
          return this.$store.getters.getComment;
        }
      }
    },
    methods:{
      handleCurrentChange(index){
        this.$store.dispatch('commentPageList',{path:'commentPage/',msg:index,qty:9});
      },
      handleEdit(index,row){
        console.log(index,row);
        this.$refs.edit.changeComment(row,index);
      },
      handleDelete(index,row){
        http.get('commentdele',{id:row.product_id}).then(res => {
            if(res.state = true){
              this.$store.state.comment.splice(index,1);
            }
         })
      }
    }
  }
</script>



<style lang='scss'>

.comment .el-table td{
    padding-top:8px;
    border-right:1px solid #ebeef5;
    .cell{
      height:40px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      .name-wrapper{
        display:block;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
  }

  .searchMsg{
    margin:10px 20px;
  }

  .el-pagination{
    padding-left:600px;
    margin-top:20px;
  }
  .editComment{
    .el-input__inner{
      width:400px;
      height:100px;
    }
  }

  .comment th{
    text-align:center;
  }
</style>