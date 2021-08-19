// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import store from './store'
import './plugins/mavenEditor.js'
//导入组件相关样式
import 'element-ui/lib/theme-chalk/index.css'
import $ from 'jquery'
import highlight from 'highlight.js';
// 配置vue 插件
Vue.use(Vuex).use(ElementUI).use(highlight);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store:store,
  components: { App },
  template: '<App/>'
})
