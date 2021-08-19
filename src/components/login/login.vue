<template>
  <div style="margin:0 auto">
    <h1>欢迎来到blog</h1>
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" :rules="rules">
      <el-form-item label="姓名" style="margin-top:20px"  prop='name'>
            <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formLabelAlign.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="loginblog('ruleForm')">立即登录</el-button>
      </el-form-item>
      <a><p style="margin-left:400px;margin-top:-50px"><router-link to="/register">没有账号？点我去注册吧</router-link></p></a>
    </el-form>
  </div>
</template>
<script>
import { get } from '../../api/getMethods'
import axios from 'axios'
export default{
    name:"login",
    data(){
        return{
            locale:"",
            buttoncan:{
                disabled:false
            }, 
            labelPosition: 'right',
            formLabelAlign: {
                name: '',
                password: '',    
            },
            rules:{
                name: [
                           { required: true, message: '请输入名字', trigger: 'blur' }
                     ],
                password: [
                      { required: true, message: '请输入密码', trigger: 'blur' }
                      ]
                  }
               }
      },
      methods:{
        
        loginblog(){
          var _this = this;
              if(!this.formLabelAlign.name){
                this.$router.push('/login')
                this.$message({type: 'error', message: "登录名为空"});
                return
              };
              if(!this.formLabelAlign.password){
                this.$router.push('/login')
                this.$message({type: 'error', message: "密码为空"});
                return
              }
              let timenow = new Date().getHours();//获取当前时间
              if(6<timenow && timenow<12){
                _this.locale = "早上好";
              }else if(timenow < 18){
                _this.locale = "下午好";
              }else{
                _this.locale = "晚上好";
              }
              
              this.buttoncan.disabled = true;
              get("/login",{name:this.formLabelAlign.name, password:this.formLabelAlign.password}).then(resp=>{
                  if (resp.status == 200) {
                    this.$store.commit('changename',this.formLabelAlign.name)
                    this.$message({type: 'success', message: _this.locale + "  登录成功,欢迎你 " + this.formLabelAlign.name});
                    sessionStorage.setItem("user",this.formLabelAlign.name)
                    localStorage.setItem("token",resp.data.token)
                    axios.defaults.headers.common['token'] = resp.data.token
                    this.$router.push('/home')
                    return
                 } else {
                        this.$message({type: 'error', message: '登录失败!请检查用户名或密码'});
                        return
                       }
                },resp=>{
                  this.$message({type: 'error', message: "登录失败！！！用户名或密码错误"});
                  return
                }
              )
              
          },
         
      }

  
  
}
</script>

<style scoped>
h1{
  margin:  50px auto;
  text-shadow:5px 5px 5px #8c8ea3;
  margin-left: 630px;
}
.el-form{
  margin: 0 auto;
  text-align: center;
}
.el-form-item{
 margin: 20px 500px;
}
.el-button{
 margin-left: -20px;
}
a{
  text-decoration: none;
}
</style>