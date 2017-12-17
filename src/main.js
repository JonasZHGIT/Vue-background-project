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

const axios = Axios.create({
	baseURL: process.env.API_ROOT
});
axios.interceptors.request.use(function (config) {
    config.headers.common['Authorization'] = oAuth.getAuthHeaders();
    return config;
}, function (error) {
    console.log(error);
    return Promise.reject(error);
});

Vue.prototype.$axios = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
