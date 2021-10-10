<template>
  <div name="home_div">
    <h1>hello world</h1>
    <input v-model="text" />
    <div>{{ text }}</div>
    <el-button @click="jump">跳转</el-button>
    <Myprogress :data="progressData" :callback="callback" :active="active" :jumpActive="jumpActive"></Myprogress>
    <router-view></router-view>
  </div>
</template>

<script>
import Myprogress from "../component/progress.vue";
export default {
  components: { Myprogress },
  name: "home",
  comments: {
    Myprogress,
  },
  data: function () {
    return {
      text: "",
      jumpActive: 4,
      progressData: [
        {
          title: '测试',
          caption: "test1"
        },
        {
          caption: "test2"
        },
        {
          caption: "test3"
        },
        {
          caption: "test4"
        },
        {
          caption: "test5"
        },
        {
          caption: "test6"
        },
      ],
      active: 2
    };
  },
  methods: {
    jump: function () {
      this.$router.push({ path: "/tabel" });
    },
    callback: function(item, index) {
        console.log(item.title);
        this.progressData = [
        {
          title: '测试重载',
          caption: "测试重载test1"
        },
        {
          caption: "测试重载test2"
        },
        {
          caption: "测试重载test3"
        },
        {
          caption: "测试重载test4"
        },
      ],
      this.active = 2;
      this.jumpActive = 0;
    }
  },
};
</script>
