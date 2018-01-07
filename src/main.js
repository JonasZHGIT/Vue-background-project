// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Axios from 'axios';
import OAuth from './oauth';

// Vue.config.productionTip = false;
let oAuth = new OAuth();
Vue.prototype.$oauth = oAuth;

const douban_axios = Axios.create({
	baseURL: ''
});
const axios = Axios.create({
	// ajax请求baseurl修改
	baseURL: process.env.API_ROOT
	// baseURL: ''
});
// 后台页面浏览认证
axios.interceptors.request.use(function (config) {
    config.headers.common['Authorization'] = oAuth.getAuthHeaders();
    return config;
}, function (error) {
    console.log(error);
    return Promise.reject(error);
});

Vue.prototype.$axios = axios;
Vue.prototype.$douban = douban_axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
