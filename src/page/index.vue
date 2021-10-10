<template>
  <div name="home_div">
	  <div class="row">
		  <div class="col-xs-offset-2 col-xs-8">
			  <div class="page-header"><h2>Router Basic 01</h2></div>
		  </div>
	  </div>
	  <div class="row">
		  <div class="col-xs-2  col-xs-offset-2">
			  <div class="list-group">
				  <router-link to="/about" class="list-group-item">About</router-link>
				  <router-link to="/home" class="list-group-item">Home</router-link>
				  <!-- <a href="#/about" class="Aboutlist-group-item router-link-exact-active activeClass">About</a>
				  <a href="#/about" class="list-group-item">Home</a> -->
			  </div>
		  </div>
		  <div class="col-xs-6">
				  <div class="panel">
					  <div class="panel-body">
						  <!-- <div>
							  <h2>about组件</h2>
							  <p>接受外部数据：at</p>
							  <input type="text" name="" id="">
						  </div> -->
						  <router-view></router-view>
					  </div>
				  </div>
			  </div>
	  </div>
  </div>
</template>

<script>

import Home from "./Home.vue";
import About from "./About.vue";
import Header from "../component/header/Header.vue";

export default {
  components: {
	Header,
	Home,
	About
  },
  name: "index",
  data: function () {
    return {
	}  
  },
  methods: {
    
  },
};
</script>
