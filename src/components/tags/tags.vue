<template>
   <div id="tags">
     <p>标签管理ddded</p>
     <button @click="onClick">123</button>
   </div>
</template>
<script>

export default ({
    name:"tags",
    methods: {
        onClick () {
            console.log('123')
        }
    }
})
</script>
<style scoped>
#tags{
margin-top: 2px;
   height: 708px; 
    margin-left: 300px;
    margin-right: 300px;
    background-color:white;
    z-index: 999;
}
</style>