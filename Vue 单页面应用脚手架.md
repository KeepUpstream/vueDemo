# Vue 学习
# 一、VUE入门大纲
前提：会用vscode vue基本命令

1.vue使用：

​		vue基础语法：模板、计算属性与侦听器、数据及样式绑定、条件渲染、列表渲染、事件处理

​		vue声明周期|钩子函数：

​		组件：组件封装、注册与使用；（自定义组件&异步组件）

​		过渡 & 动画

​		插件

​					router；axios；element

2.编译启动

3.打包构建

## 

## 1. 使用vue-cli创建项目

```
vue install webpack myApp
```

创建一个名为firstApp的基于webpack构建的vue项目。在输入以上命令时，程序会提示我们指定Project name、Project description、Author、Vue build等信息，还会询问我们是否安装vue-router、ESLint等。

然后进入myApp项目目录

```
cd myApp
```

使用npm安装相关依赖

```
cnpm install  --这是使用淘宝镜像来安装依赖； 没使用镜像，可直接使用npm来安装依赖
```

执行之后的目录结构如下：

```
build	最终发布代码
 |______build.js
 |______check_versions.js
 |______utils.js
 |______vue-loader.config.js
 |______webpack.base.conf.js
 |______webpack.dev.conf.js		//开发环境配置
 |______webpack.prod.conf.js	//生产环境配置
config	配置信息，如路径、端口ect
 |______index.js
 |______dev.env.js
 |______prod.env.js
node_modules npm加载的项目依赖模块
src		开发目录
 |______assets 放置
 |______compnents 组件目录
 |______router 路由
 |______App.vue 项目入口文件
 |______main.js 项目核心文件
static	静态资源目录
index.html 		项目初始页面
package.json 	项目配置文件
README.md		项目说明文件
```

最后启动项目

```
npm run dev
```

即可在默认端口查看进入http://localhost:8080/#/。

**question1: 这里为什么带"#/" ?**

## 2. 项目配置

### 2.1 文件说明

##### 2.1.1 index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>my-app</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```

这个是vue项目的初始化页面，在这里我们定义容器，vue设置el与此容器对应初始化vue作用范围。

##### 2.1.2 App.vue

```vue
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
//暴露组件，名称App
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

##### 2.1.3 main.js

入口文件

```js
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios' //引用axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

```







### 2.2 package.json配置

以下是我们使用vue-cli构建工具刚创建好的vue项目的package.json文件。

```js
{
  "name": "my-app",
  "version": "1.0.0",
  "description": "to start my first vue app",
  "author": "aihui",
  "private": true,
  "scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    //"dev": "webpack-dev-server --config build/webpack.dev.conf.js --hot --inline --open"
    "start": "npm run dev",
    "build": "node build/build.js"
  },
  "dependencies": {
    "vue": "^2.5.2",
    "vue-router": "^3.0.1"
  },
  "devDependencies": {
    "autoprefixer": "^7.1.2",
    "babel-core": "^6.22.1",
    "babel-helper-vue-jsx-merge-props": "^2.0.3",
    "babel-loader": "^7.1.1",
    "babel-plugin-syntax-jsx": "^6.18.0",
    "babel-plugin-transform-runtime": "^6.22.0",
    "babel-plugin-transform-vue-jsx": "^3.5.0",
    "babel-preset-env": "^1.3.2",
    "babel-preset-stage-2": "^6.22.0",
    "chalk": "^2.0.1",
    "copy-webpack-plugin": "^4.0.1",
    "css-loader": "^0.28.0",
    "extract-text-webpack-plugin": "^3.0.0",
    "file-loader": "^1.1.4",
    "friendly-errors-webpack-plugin": "^1.6.1",
    "html-webpack-plugin": "^2.30.1",
    "node-notifier": "^5.1.2",
    "optimize-css-assets-webpack-plugin": "^3.2.0",
    "ora": "^1.2.0",
    "portfinder": "^1.0.13",
    "postcss-import": "^11.0.0",
    "postcss-loader": "^2.0.8",
    "postcss-url": "^7.2.1",
    "rimraf": "^2.6.0",
    "semver": "^5.3.0",
    "shelljs": "^0.7.6",
    "uglifyjs-webpack-plugin": "^1.1.1",
    "url-loader": "^0.5.8",
    "vue-loader": "^13.3.0",
    "vue-style-loader": "^3.0.1",
    "vue-template-compiler": "^2.5.2",
    "webpack": "^3.6.0",
    "webpack-bundle-analyzer": "^2.9.0",
    "webpack-dev-server": "^2.9.1",
    "webpack-merge": "^4.1.0"
  },
  "engines": {
    "node": ">= 6.0.0",
    "npm": ">= 3.0.0"
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
}
```

**package.json中devDepencies和depencies的区别**

devDepencies为开发环境中所需要的依赖

depencies为生产环境

依赖版本不对应有可能导致项目报错。查看某个依赖对应其他依赖的版本可以去github中搜索此依赖，查看github项目中的package.json文件中的依赖版本。

在项目执行过程中引入第三方依赖后

```
npm install vue-router
npm install axios qs.js
```





### 2.3 build webpack配置

vue工程需要总入口，所以需要webpack打包并输出，以下为webpack出入口配置

```js
const path = require('path');

module.exports = {
    
    //。。。
    devtool: 'eval-cheap-module-source-map' //生产环境使用'hidden-source-map'

    entry: path.resolve(__dirname, "../src/main.js"), //配置入口文件
    output: { //配置出口文件
        filename: 'bundle.js',
        path: path.join(__dirname,'dist')
    },
    mode: 'development' //开发模式

	devServer: {
            port: 8080, //服务端口号
            host: '127.0.0.1', //服务host
            proxy: { //proxy跨域配置
                '/api': {
                    target: 'http://127.0.0.1:8102/ajax.sword?ctrl=TestCtrl_initgrid',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/api': ''
                    }
                }
            }
    }
};
```

配置入口出口后，webpack会从entry配置的文件开始打包，打包生成的代码放在output指定路径的文件中。

在本例中，webpack从main.js开始打包，打包生成的文件叫bundle.js，并且文件放在dist目录下。

**配置HtmlWebpackPlugin**

HtmlWebpackPlugin可以生成创建html入口文件，比如单页面可以生成一个html文件入口

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    //....
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: './index.html',
            title: 'vueDemo'
        })
    ]
}
```

配置后会在内存中生成index.html作为入口文件。package.json中webpack-dev-server配置项中配置了inline可以使项目启动直接跳转到index.html文件。

### 2.4 vue-loader配置

安装vue-loader并配置

```js
npm install vue-loader -D
npm install sass-loader style-loader css-loader 
npm install file-loader url-loader
```

```js
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    entry: path.resolve(__dirname, "../src/main.js"),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname,'dist')
    },
    mode: 'development',
    module: {
            rules: [
                {
                    test: /.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test:/.css$/,
                    use: 
                        [
                            'style-loader',
                            'css-loader'
                        ]
                },
                {
                    test: /.scss$/,
                    use: 'sass-loader'
                },
                {
                    test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
                    loader: 'url-loader',
                    query: {
                      limit: 10000,
                      name: path.posix.join('static', '[name].[hash:7].[ext]')
                    }
                }  
            ]
    }
};

plugins: [
    new VueLoaderPlugin()
]
```





### 2.5 vue使用

##### 2.5.1模板

安装vue-template-compiler

```js
vue-template-compiler
```

安装后即可打包.vue文件

##### 2.5.2 定义全局变量

(在main.js中)

1. 引入基于vue的第三方插件、自定义组件、自定义指令

   ```js
   import Vue from 'vue'
   import axios from 'axios'
   Vue.use(axios) //使用引入
   ```

   引入自定义指令

   ```js
   Vue.directive("focus",function(){
   	//todo...
   });
   ```

2. 引入非基于vue的第三方插件

   ```js
   //基于原型链引入
   import axios from 'axios'
   
   Vue.prototype.$axios = axios;
   Vue.prototype.$chk = $chk;
   function $chk(obj){
       return !!(obj || obj===0);
   }
   ```

3. 挂载全局对象上，比如引入：Lodash.js、moment.js等

   ```
   window.lodash = require('lodash')
   window.moment = require('moment')
   ```

##### 2.5.3 render函数

https://www.jianshu.com/p/7508d2a114d3

比如：

```js
import Vue from 'vue'; //引用Vue
import App from './app.vue'; //引用vue入口文件
import Router from 'vue-router';//引用vue-router
import axios from 'axios'; //引用axios
import router from './router/router' //引用路由配置文件

Vue.use(Router); //将vue-router
axios.defaults.baseURL = (process.env.NODE_ENV === 'production'?'':'/api');
Vue.prototype.$axios = axios;
Vue.prototype.qs = qs;
Vue.prototype.$chk = $chk;
function $chk(obj) {
  return !!(obj || obj === 0);
}

const root = document.createElement('div'); //创建跟节点，以便Vue实例挂载
document.body.appendChild(root);
new Vue({
    render: (h) => h(App),
    router
}).$mount(root);
```





## 3. 项目启动及调试

### 3.1.1 启动项目

```js
npm init		//初始化项目，若package.json不存在，会创建它
npm install		//安装依赖模块
npm run dev		//启动工程
```

### 3.1.2 vue-devtools安装调试

```js
git clone -b v5.1.1 https://github.com/vuejs/vue-devtools.git	
//可能存在版本问题，我的node版本12.0，不能build 6.0版本的，所以这里指定下载vue-devtools的版本号
然后进入vue-devtools目录，将shells-chrome下的manifest.json中的persistent改为true
然后在vue-devtools目录下，shift右键打开命令行
cnpm install
npm run build
//看到Compiled successfully...代表成功
```



## 4.打包

```
npm run build
```



