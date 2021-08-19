<template>
    <div id="mainpage">
            <div v-for="item in papers.slice((current_page-1)*num_per_page,current_page*num_per_page)" :key="item.id" class="blogitem">
                <a href="#"><h2 > <router-link :to="{name:'detail',query:{name:item.title,author:item.author}}">{{ item.title }}</router-link> </h2></a>
                <p style="display:block;">概述:{{item.textarea.substring(0,20)  }}...</p>
                <p class="el-icon-user" style="margin-bottom:0;width:200px"> 作者:{{ item.author}} </p>
                <p style="text-align:right;margin-left:180px;margin-right:180px" class="el-icon-date"> 创建时间:{{ item.date.substring(0,10)}}</p> 
                <p class="el-icon-collection-tag" style="margin-right:0px;">标签：<button v-for="item2 in item.tag.split(',') " :key="item2">{{ item2 }}</button></p>    
            </div>
         
        <div class="block" style="text-align:center">
            <el-pagination
                :current-page.sync='current_page'
                background
                :page-size.sync = 'num_per_page'
                layout="prev, pager, next"
                 :total=this.papers.length>
            </el-pagination>
            
        </div>  
    </div>
    
</template>
<script>
import { get } from '../../api/getMethods'
export default ({
    name:"mainpage",
    data:function(){
        return{   
            isShow:true,
            papers:[],
            num_per_page:4,
            current_page:0
        }
    },
    methods:{
        
    },
    mounted:function(){ 
            get('/mainpage').then(resp=> 
            this.papers =resp.data
            ).catch(err =>{
                this.$message({type:"error",message:"您没有权限，请登录"})
                this.$router.push("/login")
                return  
        })  
        
    }
    ,
    // mounted:function(){
       
    //     get('/mainpage').then(resp=>
    //         this.papers = resp.data,
    //         console.log(1)
    //     ).catch(err =>{
    //         this.isShow = false;
    //     })
    // },
    destroyed:function(){
        console.log(this.papers)
    }
}
)
</script>
<style scoped>
#mainpage{
    margin-top: 2px;
    /* background-color: #fff; */
}
#mainpage div {
   
    height: 136px;
    margin-left: 200px;
    margin-right: 200px;
   
}
#user{
    margin-bottom: 0;
    margin-left: 0;
}
h2{
    text-align: center;
}
p{
    display:inline-block;
    left:0;
    bottom:0
}
button{
    margin-left: 3px;
    border: none;
    outline: none;
    color:#67C23A;
    background-color: transparent;
    border-color: #4447ff;
    text-shadow: 0 -1px 0 rgba(0,0,0,0.12);
    -webkit-box-shadow: 0 2px 0 rgba(0,0,0,0.045);
    box-shadow: 0 2px 0 rgba(0,0,0,0.045);
     
}
.blogitem{
    background-color: white;
  
}
.el-pagination{
    background-color:#f5f5f5 ;
    margin-top:10px;
    margin-left: 300px;
    text-align: center;
    font-size: large;
    display:inline-block;
}
</style>