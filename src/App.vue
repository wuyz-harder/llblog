<template>
<div class="full">
  <div id="app">
    <head><meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"></head>
    <router-view/>
  </div>
</div>
</template>

<script>
import login from './components/login/login.vue'
import { get } from './api/getMethods'
export default {
  name: 'App',
  components: {
    login
  },
   created:function(){ 
      document.title ="博客系统"; 
    },
}
</script>

<style>
html,body{
      width: 100%;
      height: 100%;
      background-color: #f5f5f5;
      padding: 0;
      margin: 0;
    }
body{
  width: 1300px;
  overflow: hidden;
}
</style>
