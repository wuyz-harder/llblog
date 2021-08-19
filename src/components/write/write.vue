<template>
    <div id="write">
        <div id="side">
            <div style="width:100%">
                <div id="new" @click="showadd()">
                    <a style="text-align:center"><span class="el-icon-plus" >新建文集</span></a>
                </div>
                <div id="add" :style="{ display:addshow }">
                    <el-input placeholder="请输入文集名字..." v-model="catalog">{{ catalog }}</el-input>
                    <el-button type="success" @click="addli()">提交</el-button>
                    <el-button type="error" @click="canceladd()">取消</el-button>
                </div>
                <ul>
                   <a><li  @click="changeset($event)" v-for="aset in setlist" :key="aset.index">{{ aset }}</li></a>
                </ul>
            </div>
        </div>
       
        <div id="main">
            <el-input placeholder="请输入你的标题" style="display:block;margin:20px auto" v-model="title" @input="clear"></el-input>
            <p style="color:red">{{ tips }}</p>
            
             <mavon-editor :ishljs = "true" v-model="value" ref=md @save="save" @imgAdd="imgAdd" :imageFilter="uploadBefore"/>
            <br>
            <div style="text-align:center" id="tag">
                <p style="display:inline-block">标签：</p>
                <el-select v-model="tags" clearable placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select> 
            </div>
        </div>
    </div>
</template>
<script>
import { post } from '../../api/getMethods'
export default ({
    name:"write",
    data(){
        return{
            tips:"",
            tags:'',
            addshow:'none',
            catalog:'',
            setlist:['日记本','随笔'],
            set_same:0,
            now_set:'',
            title:'',
            textarea:'',
            value:'',
            options: [{
                value: 'Java',
                label: 'java'
            }, {
            value: 'Vue',
            label: 'vue'
            }, {
            value: 'springboot',
            label: 'springboot'
            }, {
            value: '前端',
            label: '前端'
            }, {
            value: '后端',
            label: '后端'
            }],
            value: ''
        }
    },
    methods:{
        imgAdd(pos,$file){
            var _this = this
            var form_data = new FormData()
            form_data.append("image",$file)
            post('/uploadfile',form_data).then(resp =>{
                console.log(resp)
                var url = resp.data.url
                _this.$refs.md.$img2Url(pos,url)
            }).catch(err =>{
                alert(err)
            })

        },
        clear(){
            this.tips=''
        },
        uploadBefore(f) {
        if (f.size > 2016324) {
            this.$message({
            message: "图片不能大于2M",
            type: "error"
                });
                return false;
        } else {
            return true;
        }
        },
        save(){
            if(this.title==""){
                this.$message({type:"error",message:"标题不能为空哦，除非你想搞死我"})
                this.tips = '！请输入标题'
                return
            }
            post('/paper',{author:sessionStorage.getItem("user"), title:this.title,textarea:this.value,tag:this.tags}).then(
                resp =>{
                    if (resp.data.status==200){
                        this.$message({type:'success',message:resp.data.msg})
                        
                    }else{
                        this.$message({type:'error',message:"发表失败了！！"})
                    }
                    return
                }
            ).catch(err =>{
                this.$message({type:"error",message:err.data.msg})
                this.$message({type:'error',message:err.data.msg})
                console.log(err)
                return
            })
        },
        showadd(){
            this.addshow = ''
        },
        canceladd(){
            this.addshow = 'none'
        },
        addli(){
            //后面重建完数据库之后也要存到数据库
            //每次加载组件前要从数据库中获取，加载
            if(this.catalog==''){
                alert('添加文集名字为空')
                return
            }
            this.setlist.forEach(item=>{
                if(item == this.catalog){
                    this.set_same = this.set_same + 1
                }
            })
            if (this.set_same == 0){
            this.setlist.push(this.catalog)
            }else{
                this.setlist.push(this.catalog + '(' + this.set_same + ')')
                this.set_same = 0
            }
        },
        changeset(e){
        // 获取方法传进来的事件的文本值
          this.now_set =  e.target.innerText
                 }
    }
})

</script>
<style scoped>
#write {
    overflow: scroll;
    display: inline-block;
    height: 788px;
    margin-right: 30px;
    margin-left: 30px;
    background-color:#ffffff;
}
#write div{
    display: inline-block;
    overflow: hidden;
    
}
ul{
    list-style: none;
    width: 100%;
}
#side li{
    height: 30px;
    color: #f1f1f1;
    margin-top: 10px;
    cursor: pointer;
    width: 100%;
    text-align: center;
    margin-left: -40px;
    padding-top: 5px;
    
}

span{
    padding-top: 7px;
    font-weight: 880;
    color: #f1f1f1;
}
#new{
    
    margin-top: 10px;
   text-align: center;
    cursor: pointer;
    width: 100%;
}
#new a{
   display: block;
    height: 30px;
}
#add{
    display:none;
    margin-left: 30px;
}
#side{
    float: left;
    background-color: #404040;
    width: 25%;
    height: 100%;
    border-right: 10px solid #F56C6C;
}
#main{
    height: 800px;
    text-align: center;
    margin-right: 2px;
    overflow: scroll;
}
#main .el-input{
    margin-top: 2px;
    margin-right: 2px;
    width: 550px;
}
.el-input{
    margin-bottom: 10px;
    margin-top: 13px;
  
}

.el-select{
    margin: auto;
   
   
}
.el-option{
    color:green;
    line-height: 50%;
}
.el-option >li{
    margin-left: 0px;
    padding-left: 0px;
}
a:hover{
    background-color:#99CC00;
    
}
a:hover span{
    color:#CC3399
}
li:hover{ 
    background-color:#99CC00;
    color:#CC3399
}
#tag{
    height: 50px;
}
#tag>p{
    line-height: 50%;
   margin-top: 0px;
}
.el-button{
    width: 80px;
    margin-left: 30px;
}
</style>