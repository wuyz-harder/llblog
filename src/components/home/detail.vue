<template>
    
    <div id="more">
        <blogheader></blogheader>
       
        <div class="mainbody">
            <h1>{{ title }} </h1>
            <h3 >作者: {{ author }}</h3>
            <hr>
        <!--这里只需要加上v-highlight即可高亮-->
        <!-- <div v-highlight v-html="htmlMD" class="styleClass"></div> -->
            <VueMarkdown :source="htmlMD" ></VueMarkdown>
        </div>
        <h3 style="text-align:center;border-top:solid 3px  gainsboro ">评论区</h3>
        <ul>
            <li v-for = " item in comments" :key="item.index">{{item.user}}:      {{   item.text}}  <p style="color:blue">回复</p>
                <hr>
            </li>
            
        </ul>
        <div class="fz"> 
            <div style="margin:10px 50px;height:50%">     
                <el-input placeholder="优质的评论可以让作者获得更多权重" v-model="comment">{{ comment }}</el-input><el-button type="success" @click="submitcomment()">评论</el-button>
            </div>
        </div>
        <br>
        
    </div>

  
</template>

<script>
import axios from 'axios'
import VueMarkdown from "vue-markdown"
import blogheader from "./blogheader.vue"
import "highlight.js/styles/atelier-forest-dark.css";


export default {
    name:'test',
    data(){
        return{
            htmlMD:'vvvv',
            title: '今天',
            comment:'',
            author:'',
            comments:[]
        }
    },
    methods:{
        submitcomment(){
            this.comments.push({"user":sessionStorage.getItem("user"),"text":this.comment})
            this.comment=''
            // 后续还要把文章标题，评论者，评论内容发到后台
        }
    },
    components:{
        VueMarkdown,
        blogheader
    },
     create(){
            //获取路由参数
            //vue-router中挂载两个对象的属性
            //$route(信息数据)
            //$router(功能函数)
            /*console.log(this.$route.params);*/
            //this.title = this.$route.query.name;
 
        },
    mounted(){
        this.title = this.$route.query.name;
        this.author = this.$route.query.author;
        var url = 'http://localhost:8888/getmd/' + this.title;
        axios.get(url).then((response) => {
    　  this.htmlMD = response.data;
});
    }
}
</script>

<style>

.fz{
    margin-top: 10px;
    height: 80px;
    background-color: #fff;
    text-align: center;
    position: relative;
    border-top: 3px solid gainsboro;
}
.fz>div{
    position:absolute;
    margin:auto;
    top:12px;
    left:0;
    right:0;
    bottom:0;
}
h1{
    margin-top: 30px ;
    text-align: center;
}
#more>ul{
    list-style: none;
    margin:auto 100px ;
    background-color: #fff;
}
li{
    margin-left: 0px;
}
p{
    display:inline-block;
}
#more > div{
    margin: auto 100px;
    background-color: #fff;
}
.mainbody{
    /* text-align: center; */
    /* height: 650px; */
    border-bottom: solid 3px gray;
}
.el-input{
    margin: ;
    display: inline-block;
    width: 90%;
}
.el-button{
    width: 10%;
    display: inline-block;
}

</style>