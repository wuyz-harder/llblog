<template>
<div>
  <el-container class="home_container">
    <el-header>
      <div class="home_title" style="color:blue">small Blog,big World</div>
      <el-menu>
           <el-menu-item index="1" ><router-link to="/mainpage">首页</router-link></el-menu-item>
           <el-menu-item index="2"><router-link to="/paper">文章分类</router-link></el-menu-item>
           <el-menu-item index="3"><router-link to="/tags">标签管理</router-link></el-menu-item>
           <el-menu-item index="4"><router-link to="/comment">留言板</router-link></el-menu-item>
           <el-menu-item index="5" class="el-icon-edit"><router-link to="/write">写文章</router-link></el-menu-item>
      </el-menu>
      <div class="home_userinfoContainer">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link home_userinfo" style="color:red">
            {{ this.$store.state.name }}<i class="el-icon-arrow-down el-icon--right home_userinfo"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item  icon="el-icon-chat-dot-round">系统消息</el-dropdown-item>
            <el-dropdown-item  icon="el-icon-tickets">我的文章</el-dropdown-item>
            <el-dropdown-item  icon="el-icon-house"> 个人主页</el-dropdown-item>
            <el-dropdown-item  divided icon="el-icon-switch-button"  command="logout">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div> 
    </el-header>
    <router-view></router-view>
    </el-container>
  
</div>
</template>
<script>
  // import { get } from '../../api/getMethods'
  export default{
    name:"blogheader",
    data:function(){
      return{
        fu_papers:[],
       
      }
    },
    created:function(){
        if(this.$store.state.name ==''){
          this.$store.state.name = sessionStorage.getItem("user")
        }
    },
    methods:{
      handleCommand(command) {
        let _this = this;
        if(command == "logout"){
        this.$confirm('注销登录吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {
            _this.$router.push("/login")
          }, function () {
            //取消
          })
        
        }
      }
    }
  }
</script>
<style>
  .home_container {
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    margin-bottom: 2px;
  }

  .el-header {
    background-color:white;
    color: #333;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    border-bottom:4px solid grey ;
    
  }
a {
  text-decoration: none;
}
  .el-aside {
    background-color: #ECECEC;
  }

  .el-main {
   
    background-color:white;
    color: #000;
    text-align: center;
  }

  .home_title {
    color: #fff;
    font-size: 22px;
    display: inline;
  }

  .home_userinfo {
    color: #fff;
    cursor: pointer;
  }
.el-menu-item{
  display: inline-block;
  margin: auto 40px;
}
.el-menu-item :hover{
  color: green;
}
.el-menu{
  background-color:white;
}
  .home_userinfoContainer {
    display: inline;
    margin-right: 20px;
  }
</style>
