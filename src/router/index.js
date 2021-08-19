import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login/login'
import Home from '../components/home/home'
import register from '../components/register/register'
import mainpage from '../components/home/mainpage'
import comment from '../components/comments/comment'
import tags from '../components/tags/tags'
import write from '../components/write/write'
import paper from '../components/paper/paper'
import detail from '../components/home/detail'
Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
     
      { 
        path: '/',
        component:login
    },
      { path: '/login',
        redirect:'/'
    },
    {
      path:'/home',
      component:Home,
      children:[
        {
        path:"/mainpage",
        component:mainpage
      },
      {
        path:"/",
        component:mainpage
      },
      {
        path:"/tags",
        component:tags
      },{
        path:'/write',
        component:write
      },
      {
        path:'/comment',
        component:comment
      },
      {
        name:"detail",
        path:'/detail',
        component:detail
      },
      {
        path:'/paper',
        component:paper
      }
    ]
    },
    {
      path:'/register',
      component:register
    }
    ]
  })

  export default router