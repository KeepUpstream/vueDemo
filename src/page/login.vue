<template>
  <div name="login_div">
    <form class="login" action="">
      <label class="item">账号：</label>
      <input
        class="item inputbox"
        type="text"
        placeholder="请输入您的手机号|邮箱"
        v-model="formMess.user"
      />
      <label class="item">密码：</label>
      <input
        class="item inputbox"
        type="password"
        placeholder="请输入您的密码"
        v-model="formMess.password"
      />
      <div class="btns">
        <input class="submit" type="reset" value="重 置" />
        <input
          class="submit"
          type="submit"
          value="提 交"
          @click.enter="onSubmit()"
        />
      </div>
      <div class="more"><a>去注册？</a><a>忘记密码</a></div>
    </form>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      formMess: {
        user: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      /* json格式提交： */
      // let formData = JSON.stringify(this.formMess);

      /* formData格式提交： */
      let formData = new FormData();
      for (var key in this.formMess) {
        formData.append(key, this.formMess[key]);
      }
      if (!formData.get("user") && !formData.get("password")) {
        alert("请输入账号密码后再点击登录");
        return;
      }
      axios({
        method: "post",
        url: "http://localhost:8080/submit",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
        data: formData,
      }).then((res) => {
        console.log(res);
        var logined = res.data.loginCode;
        if (logined == 1) {
          this.$router.push({ path: "/index" });
        } else {
          this.$router.push({ path: "/login" });
        }
      });
    },
  },
};
</script>
<style scoped>
div[name="login_div"] {
  overflow: hidden;
  display: block;
  width: 100%;
  overflow: hidden;
  display: block;
  width: 100%;
  height: 698px;
  background: url(/static/images/bamboo.jpeg) center no-repeat;
  background-size: 100% 100%;
}
.login {
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 300px;
  height: 333px;
  border: solid 1px lightcyan;
  border-radius: 4px;
  background: rgb(135 206 250 / 50%);
}
form.login:before {
  text-indent: 18px;
  letter-spacing: 5px;
  background: #0086ff;
  position: absolute;
  top: -20px;
  left: 13px;
  display: block;
  width: 138px;
  height: 40px;
  line-height: 40px;
  content: "欢迎登录";
  font-size: 22px;
  color: #fdfffe;
}
input.inputbox {
  text-indent: 12px;
  border-radius: 5px;
  border: solid 1px #333;
}
.item {
  display: inline-block;
  width: 78%;
  height: 2em;
  margin: 0.3em 0;
  line-height: 2em;
  color: #3e3e3e;
}
.submit {
  color: #00abe3;
  font-size: 16px;
  width: 70px;
  height: 35px;
  margin: 20px;
  border: solid 1px #0190bf;
  border-radius: 4px;
}
.more {
  align-self: flex-end;
  margin-right: 31px;
  font-size: 14px;
  color: cyan;
}
</style>
