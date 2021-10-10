<template>
    <div id="formEl">
    <el-row :gutter="0" class="el-item">
	<p class="rb-tit mt5">薪资</p>	
		<el-col :span="12">
			<p style="color:#999;font-size:14px;text-align:left;">最低薪资</p>
			<el-form-item label="" size="small" class="selet mgl5">
				<el-select v-model="form.payLow" placeholder="不限" @change="jobExperienceChange">
					<el-option label="2K" value="2"></el-option>
					<el-option label="3K" value="3"></el-option>
					<el-option label="4K" value="4"></el-option>
					<el-option label="5K" value="5"></el-option>
					<el-option label="6K" value="6"></el-option>
					<el-option label="7K" value="7"></el-option>
					<el-option label="8K" value="8"></el-option>
					<el-option label="9K" value="9"></el-option>
					<el-option label="10K" value="10"></el-option>
				</el-select>
			</el-form-item>	
		</el-col>
		<el-col :span="12">
				<p style="color:#999;font-size:14px;text-align:left;">最高薪资</p>
				<el-form-item label="" size="small" class="selet mgl5">
					<el-select v-model="form.payHigh" placeholder="--" @change="jobExperienceChange">				
						<el-option label="2K" value="2"></el-option>
						<el-option label="3K" value="3"></el-option>
						<el-option label="4K" value="4"></el-option>
						<el-option label="5K" value="5"></el-option>
						<el-option label="6K" value="6"></el-option>
						<el-option label="7K" value="7"></el-option>
						<el-option label="8K" value="8"></el-option>
						<el-option label="9K" value="9"></el-option>
						<el-option label="10K" value="10"></el-option>
					</el-select>
				</el-form-item>	
		</el-col>
	</el-row>
	
	<el-row :gutter="0" class="el-item">
		<p class="rb-tit mt5">学历</p>	
		<el-col :span="12">
			<p style="color:#999;font-size:14px;text-align:left;">最低学历</p>
			<el-form-item label="" size="small" class="selet mgl5">
				<el-select v-model="form.educationLow" placeholder="不限" @change="jobExperienceChange">
					<el-option v-for="(item,index) in xls" :key="index" :label="item.dictLabel" :value="item.dictValue"></el-option>
				</el-select>
			</el-form-item>	
		</el-col>
		<el-col :span="12">
			<p style="color:#999;font-size:14px;text-align:left;">最高学历</p>
			<el-form-item label="" size="small" class="selet mgl5">
				<el-select v-model="form.educationHigh" placeholder="--" @change="jobExperienceChange">
					<el-option v-for="(item,index) in xls" :key="index" :label="item.dictLabel" :value="item.dictValue"></el-option>
				</el-select>
			</el-form-item>	
		</el-col>
	</el-row> 
	
	<el-row class="rb-tit mt5 sex-box el-item">性别  
		<el-dropdown @command="sexHandleCommand">
			<span class="el-dropdown-link" id="sex-dropdown">
				不限<i class="el-icon-arrow-down el-icon--right"></i>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="null">不限</el-dropdown-item>
				<el-dropdown-item command="M">男</el-dropdown-item>
				<el-dropdown-item command="F">女</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>								
	</el-row>
    </div>
</template>


<script>
import axios from "axios";

export default {
    name: "recruit",
    data() {
        return {
            form: {
                name: "", // 姓名
                sex: "M", // 性别
                telphone: "", // 联系方式
                age: "", // 年龄
                area: "0000340100,0000340100,0000340104,", // 求职地址
                jobIntention: "", //销售
                detailaddress: "", //详细地址
                jobyear: "1", // 工作年限
                salaryExp: "4", // 期望薪资
                education: [
                { value: "0", label: "初中及以下" },
                { value: "1", label: "高中" },
                { value: "2", label: "大专" },
                { value: "3", label: "本科" },
                { value: "4", label: "硕士及以上" }
                ], // 最高学历
                speciality: "", // 特长 优势
                jobWantedState: "离职随时到岗" // 求职状态
            },
            addressOptions: citys, // 工作地址
            labelWidth: "70px", // 统一定义label宽度
            loading: false // 刷新加载
        };
    },
 
   
    ajaxRegisterApi: function(form) {
      // 获取localStorage本地token
      var key = localStorage.getItem("token");
      console.log("key=" + key);

      // 表单验证（略）
    
        var localPath = this.GLOBAL.localSrc; // 本地 接口地址
        var serverPath = this.GLOBAL.serverSrc; // 线上 接口地址

        axios.post(
            serverPath + "/jobs/upresume/",
            {
              resumeName: this.form.name, // 姓名
              sex: this.form.sex, // 性别
              phone: this.form.telphone, // 联系方式
              birthday: this.form.age, // 年龄
              jobIntention: this.form.jobIntention, // 求职意向
              location: this.form.detailaddress, // 求职地址 this.form.area
              seniority: this.form.jobyear, // 工作年限
              salaryExp: this.form.salaryExp, // 期望薪资
              education: this.form.education, // 最高学历
              remarks: this.form.speciality, // 特长 优势
              jobWantedState: this.form.jobWantedState // 在职状态
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: key
              }
            }
          )
          .then(
            function(response) {
              //console.log(response);
              var reslutData = response;

              localStorage.setItem("token", response.headers.authorization); // token 复写本地 localStorage

              if (response.data.code == "0") {
                this.$message({
                  type: "warning",
                  message: "上传错误"
                });
              }
              if (response.data.code == "2010") {
                this.$message({
                  type: "warning",
                  message: "简历已经存在在简历库中,不可重复上传"
                });
              }

              if (response.data.code == "200") {
                this.$message({
                  type: "success",
                  message: "简历分享成功"
                });
              }
            }.bind(this)
          )
          .catch(function(error) {
            console.log("请求失败" + error);
          });

        this.getresume();
    },

    getresume() {
      var key = localStorage.getItem("token");
      console.log("key=" + key);
      axios.post(
          ecsPath + "/jobs/listMyUpResume/",
          {
            resumeName: "zhangsan"
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: key
            }
          }
        )
        .then(
          function(response) {
            var resultData = response;
            console.log(response.data);
            if (response.data.code == "4007") {
              // 未登陆执行跳转
              this.$router.push({
                path: "/login"
              });
            }
            this.resumes = response.data.data.resumes;
            localStorage.setItem("token", response.headers.authorization); // token 复写本地 localStorage
          }.bind(this)
        )
        .catch(function(error) {
          console.log("请求失败" + error);
        });
    }
  
};
</script>

<style>
/* 样式省略 */
</style>
