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
        <el-button type="primary" @click="registerblog('ruleForm')" v-bind="buttoncan">立即注册</el-button>
      </el-form-item>
    </el-form>
    
  </div>
</template>
<script >
import { post } from '../../api/getMethods'
export default{
    name:"register",
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
        
        registerblog(){
          var _this = this;
              if(!this.formLabelAlign.name){
                this.$router.push('/register')
                this.$message({type: 'error', message: "注册名为空"});
                return
              };
              if(!this.formLabelAlign.password){
                this.$router.push('/register')
                this.$message({type: 'error', message: "密码为空"});
                return
              }
              
              this.buttoncan.disabled = true;
              post("/register",{"name":this.formLabelAlign.name, "password":this.formLabelAlign.password}).then(resp=>{
                  if (resp.status == 200) {
                    this.$message({type: 'success', message: _this.locale + "  注册成功,请登录 "});
                    this.$router.push('/login')
                    return
                 } else {
                        this.$message({type: 'error', message: '注册失败'});
                        return
                       }
                },resp=>{
                  this.$message({type: 'error', message: "注册失败"});
                  this.buttoncan.disabled = false;
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