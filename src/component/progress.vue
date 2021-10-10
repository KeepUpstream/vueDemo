<template>
  <div class="process-container">
    <div v-show="isLeftShow" @click="changeLeftShow()">{{left}}</div>
    <ul>
      <li v-for="(item, index) in copyData" :key="item.caption">
        <div @click="handleCallBack(item, index)" v-bind:class="{ active: item.isActive }">
          <span v-bind="item">{{ item.title }}</span>
        </div>
        <p v-bind="item">{{ item.caption }}</p>
      </li>
    </ul>
    <div v-show="isRightShow" @click="changeRightShow()">{{right}}</div>
  </div>
</template>

<script>
export default {
  name: "Myprocess",
  data: function () {
    return {
      maxSize: 4,
      copyData: this.data,
      left: '<',
      right: '>',
      isLeftShow: false,
      isRightShow: false,
      extraData: []
    };
  },
  props: {
    data: Array,
    title: Array,
    caption: Array,
    callback: Function,
    active: Number,
    jumpActive: Number
  },
  created: function () {
    this.createId();
    this.init();
    console.log('created')
  },
  mounted: function () {
    console.log('mounted')
  },
  updated: function() {
    console.log('updated')
  },
  beforeUpdated: function() {
    console.log('beforeUpdated')
  },
  methods: {
    //为每个节点创建id以便标识
    createId: function() {
      this.copyData.forEach((element,index) => {
            element.id = index;
            return element;
      })
    },
    // 点击后的回调函数
    handleCallBack: function (item, index) {
      this.setStep(index);
      this.$chk(this.callback) ? this.callback(item, index) : "";
    },
    //设置第几个为active状态
    setStep: function (index) {
      this.copyData[index].isActive = true;
      this.copyData = JSON.parse(JSON.stringify(this.copyData));
    },
    //删除active状态
    removeActive: function (index) {
      this.copyData[index].isActive = false;
      this.copyData = JSON.parse(JSON.stringify(this.copyData));
    },
    //动态设置caption
    setCaption: function (index, caption) {
      this.copyData[index].caption = caption + "";
      // this.copyData = JSON.parse(JSON.stringify(this.copyData));
    },
    //点击右箭头
    changeRightShow: function(){
      this.copyData = this.extraData[0]
      this.init()
    },
    //点击左箭头
    changeLeftShow: function() {
      let id = this.copyData[0].id;
      this.copyData = this.data.slice(id - this.maxSize);
      this.init()
    },
    //初始化
    init: function() {
        this.extraData = [];
        let data = _.cloneDeep(this.copyData); //为防止会对父组件传过来的data造成影响导致报错，用loadash里面的cloneDeep函数深拷贝一下
        let active = this.active;
        let obj = { //设置组件标准数据集
          title: "",
          caption: "",
          isActive: false,
          id: NaN
        };
        let that = this;
        this.extraData.push(data.splice(this.maxSize)); //存储除maxSize外的数据
        data.forEach((element, index) => { //数据合并
          obj.title = element.id + 1 + '';
          let newObj = Object.assign({}, obj, element);
          if (element.id < active || element.id == this.jumpActive) { //渲染不跳步骤的活跃节点
            newObj.isActive = true;
          }
          element = newObj;
          data[index] = element;
        });
        this.isRightShow = this.copyData.length > this.maxSize?true:false; //是否显示右箭头
        this.isLeftShow = data[0].id > 0?true:false //是否显示左箭头
        this.copyData = data; //开始渲染
    }
  },
  watch: {
    data: {
      handler(newVal, oldVal) { //深度监听data，以便父组件改变data值可以实时更新
        this.copyData = newVal;
        this.createId();
        this.init();
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
ul li {
  list-style: none;
}
.process-container {
  display: flex;
  ul {
    display: flex;
    justify-content: space-between;
    width: 80%;
    text-align: center;
    margin: auto;
    li div {
      background: gray;
      border-radius: 50%;
    }
    li div:hover {
      background: yellow;
    }
    li div.active {
      background: #3f77db;
    }
  }
}
</style>