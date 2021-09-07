import Vue from 'vue'
import App from './App.vue'
//引入创建好的路由器
import router from './router';
//引入重置样式表
import '../static/css/reset.css'
//引入vuex
import store from './store'
//引入mintui 注册为全局组件标签
import 'mint-ui/lib/style.min.css'
import { Button } from 'mint-ui'
//引入图片懒加载
import VueLazyload from "vue-lazyload";
import loading from './common/imgs/loading.gif'
//引入mock
import './mock/mockServer'
//引入过滤器
import './filters/index'
//注册组件全局标签
Vue.component(Button.name, Button)
Vue.use(VueLazyload, {
  loading
})

Vue.config.productionTip = false

new Vue({
  el:'#app',
  render: h => h(App),
  router,
  store
})
