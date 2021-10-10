<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="tSworddemoLeaveBegindate" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="tSworddemoLeaveName" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="tSworddemoLeaveType" label="理由">
      </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row, scope.column)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row, scope.column)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-button type="primary" @click="postData" :loading="isloading">主要按钮</el-button>
    <el-button type="primary" @click="sendData" :loading="isloading">发送数据</el-button>
  </div>
</template>

<script>
export default {
  name: "tabel",
  data: function () {
    return {
      text: "",
      tableData: [],
      isloading: false,
      responseList: {},
      tableIndex: NaN
    };
  },
  methods: {
    postData: function () {
      this.isloading = true
      this.$axios({
        method: "get",
        url: "ajax.sword?ctrl=TestCtrl_initgrid",
      })
        .then((response) => {
          response = response.data.data;
          response.shift();
          response = response.filter((curVal) => {
            return curVal.name == "tableList";
          });
          this.tableData = JSON.parse(response[0].value);
          this.isloading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    }, 
    handleEdit: function($index,$row) {
        let that = this
        this.tableIndex = $index
        this.$alert('理由', '编辑' , {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            showInput: true
        }).then((row) => {
            that.tableData[that.tableIndex].tSworddemoLeaveType = row.value
        })
    },
    handleDelete: function($index){
        let that = this;
        this.tableIndex = $index;
        this.$alert('删除', '确定删除？' , {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then((row) => {
          that.tableData.splice(that.tableIndex,1);
        })
    },
    sendData: function(){
        this.$axios({
          method: "post",
          url: "ajax.sword?ctrl=TestCtrl_initgrid",
          data: this.tableData
      })
    }
  },
};
</script>

<style>
</style>