
<template>
  <div class="editSmall">
        <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
        <el-table :data="gridData">
          <el-table-column property="houseType_ID" label="房子序号" width="150"></el-table-column><br>
          <el-table-column property="title" label="标题" width="200"></el-table-column><br>
          <el-table-column property="price" label="价格"></el-table-column><br>
          <el-table-column property="city" label="城市"></el-table-column><br>
          <el-table-column property="admin" label="区域"></el-table-column><br>
          <el-table-column property="Business" label="商圈"></el-table-column><br>
          <el-table-column property="air_car_Station" label="附近交通"></el-table-column><br>
          <el-table-column property="view" label="景区"></el-table-column><br>
          <el-table-column property="begliving_room" label="厅/卧室"></el-table-column><br>
          <el-table-column property="beg_count" label="床位"></el-table-column><br>
          <el-table-column property="people_count" label="适住人数"></el-table-column><br>
          <el-table-column property="room_size" label="尺寸"></el-table-column><br>
          <el-table-column property="way" label="房型"></el-table-column><br>
          <el-table-column property="status" label="出租情况"></el-table-column><br>
        </el-table>
      </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        dialogTableVisible: false,
        formLabelWidth: '120px'
      }
    },
    methods:{
      showMsg(parmas){
        this.dialogTableVisible = true;
        var obj = [];
        obj.push(parmas);
        this.gridData = obj;
      }
    },
    mounted(){
    }
  };
</script>

<style>
  .el-dialog{
    width:94%;
  }
</style>