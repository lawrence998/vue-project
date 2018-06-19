
<template>
    <div class="releaseEdit">
      <el-dialog title="房源发布" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="房源名称" :label-width="formLabelWidth">
              <el-input v-model="form.title" auto-complete="off"></el-input>
            </el-input>
          </el-form-item>
          <el-form-item label="区域" :label-width="formLabelWidth">
            <el-input v-model="form.adress" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="房子类型" :label-width="formLabelWidth">
            <el-input v-model="form.houseType" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="房间尺寸" :label-width="formLabelWidth">
            <el-input v-model="form.room_size" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="房间数量" :label-width="formLabelWidth">
            <el-input v-model="form.room_qty" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="床位" :label-width="formLabelWidth">
            <el-input v-model="form.bed_qty" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="价格/每晚" :label-width="formLabelWidth">
            <el-input v-model="form.price" auto-complete="off"></el-input>
          </el-form-item> 
          <el-form-item label="房东" :label-width="formLabelWidth">
            <el-input v-model="form.owner_name" auto-complete="off"></el-input>
          </el-form-item> 
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="determine">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>

  import './releaseHouse.scss'
  import http from '../../../../httpClient/httpClient'

  export default {
    data() {
      return {
        dialogFormVisible:false,
        form: {
          title:'',
          adress:'',
          houseType:'',
          room_size:'',
          room_qty:'',
          bed_qty:'',
          price:'',
          owner_name:''
        },
        formLabelWidth: '120px'
      };
    },
    methods:{
      showRelease(){
        this.dialogFormVisible = true;
      },
      determine(){
        var arrs = [
                        this.form.title,
                        this.form.adress,
                        this.form.houseType,
                        this.form.room_size,
                        this.form.room_qty,
                        this.form.bed_qty,
                        this.form.price,
                        this.form.owner_name,
                        ]

          console.log(arrs.length);


        if(arrs[0] == '' ||　arrs[1] == '' || arrs[2] == '' || 
          arrs[3] == '' || arrs[4] == ''|| arrs[5] == '' || 
          arrs[6] == '' || arrs[7] == ''){
          alert('输入框不能为空');
          return;
        }else{
          http.get('releaseHouse/',{arr:arrs}).then(res => {
            if(res.results){
              console.log(6666);
               this.dialogFormVisible = false;
            }
          })
        }
      },
      cancel(){
        this.dialogFormVisible = false;
        this.form = {};
      }
    }
  };
</script>
