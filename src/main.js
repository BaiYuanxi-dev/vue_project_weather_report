// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 访问入口
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import './assets/css/style.css'
import {
  api
} from '@/api';

// import axios from 'axios'
//
// axios.defaults.baseURL = 'http://192.168.43.104:5000/getMsg';
// Vue.config.productionTip = false
import echarts from 'echarts'
import axios from 'axios'
import qs from 'qs'
Vue.prototype.$qs = qs
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts


Vue.config.productionTip = false

Vue.prototype.$api = api;//请求接口

//全局添加模块
Vue.use(ElementUI, {
  size: 'normal'
});

export default new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})

// new Vue({
//   router,
//   data: function(){
//       return {
//           username: '',
//       }
//   },
//   render: h => h(App)
// }).$mount('#App');
