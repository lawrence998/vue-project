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
      :data="dataList"
      style="width: 100%">

      <el-table-column
        label="用户ID"
        width='100%'>
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.user_id}}号旅馆</span>
        </template>
      </el-table-column>

      <el-table-column
        label="用户昵称"
        width="100%">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.username }}</p>
            <p>电话: {{ scope.row.dianhua }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.username }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column
        label="电话"
        width="130%">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>房子详情: {{ scope.row.title }}</p>
            <div slot="reference" class="name-wrapper">
              <span>{{ scope.row.user_phone }}</span>
            </div>
          </el-popover>
        </template>
      </el-table-column>

     <el-table-column
        label="头像"
        width="100%">
        <template slot-scope="scope">
          <span>{{ scope.row.user_img }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="住址"
        width="150%">
        <template slot-scope="scope">
          <span>{{text}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="入住时间"
        width="80%">
        <template slot-scope="scope">
          <span>{{ scope.row.comment_qty}}</span>
        </template>
      </el-table-column>

     <el-table-column
        label="退房时间"
        width="200%">
        <template slot-scope="scope">
            <span>{{ scope.row.comment_content }}</span>
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
      :total="pageNum*10">
    </el-pagination>
  </div>
</template>

<script>
  import editComponents from '../comment/editComponents'
  import http from '../../../../httpClient/httpClient'

  export default{
    data(){
      return{
        text:'住址',
        dataList:[],
        pageNum:1
      }
    },
    mounted(){
      http.get('userMsg/',{qty:10}).then(res => {
        if(res){
            this.dataList = res.data.datas;
            this.pageNum = res.data.pageNum;
        }
      })
    },
    components:{
      editComponents,
    },
    methods:{
      handleCurrentChange(page){
        http.get('userMsg/',{page:page,qty:10,pageNum:this.pageNum}).then(res => {
        if(res){
            this.dataList = res.data.datas;
          }
        })
      },

    },
  }

</script>


<style land='scss'>
  .comment{
    .cell{
      text-align:center;
    }
  }
</style>