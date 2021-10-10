<template>
  <div name="app_div">
      <!-- 此处使用router-view实现页面切换展示不同组件 -->
      <router-view></router-view>
  </div>
  
</template>

<script type="module">
// import store from './vuex/store';
// export default {
// 	store
// }
</script>

<style>
html{
  font-size: 16px;
  margin:0;
  padding: 0;
}
div[name='app_div'] {
    overflow: hidden;
    display: block;
    width: 100%;
    height: 755px;
    background:url('/static/images/bamboo.jpeg') center no-repeat;
    background-size: 100%;
}
</style>