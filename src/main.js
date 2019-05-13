import Vue from 'vue'
//引入mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import { Indicator } from 'mint-ui';

Vue.use(MintUI)


Vue.config.productionTip = false;
Vue.prototype.axios = axios

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    Indicator.open('加载中...');
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    Indicator.close();
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
