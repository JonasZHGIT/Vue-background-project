import Vue from 'vue';
import Router from 'vue-router';
import ElementUI from 'element-ui';
import OAuth from '@/oauth';

import 'element-ui/lib/theme-chalk/index.css';

import Loginnav from '@/components/login/loginnav';
import Login from '@/components/login/login';
import Navigation from '@/components/main/navigation';
import Homepage from '@/components/main/homepage';
import Hidden from '@/components/other/hidden.vue';
import Movie from '@/components/douban/douban_movie.vue';


let oAuth = new OAuth(); 

Vue.use(Router);
Vue.use(ElementUI);

const router = new Router({
	mode: 'history',
	routes: [
        { path: '/', redirect: '/home' },
        { path: '/nav', component: Navigation, redirect: '/home', children: [
        	{ path: '/home', component: Homepage },
        	{ path: '/douban/movie', component: Movie },
        	{ path: '/hidden', component: Hidden }
        ]}, 
        { path: '/loginnav', component: Loginnav, redirect: '/login', children: [
        	{ path: '/login', name: 'loginPage', component: Login, meta: { allowAnonymous : true } }
        ]}
    ]
});

// 路由跳转认证控制
// router.beforeEach((to, from, next) => {
// 	let allowAnonymous = false;
// 	if(to.name === 'loginPage' && oAuth.isAuthenticated()) {
// 		console.log("authenticated");
// 		return next({
//             path: '/'
//         });
// 	} else if(!to.meta.allowAnonymous && oAuth.isGuest()) {
// 		console.log("Guest");
// 		return next({
//             path: '/login',
//             query: {
//                 redirect: to.fullPath // 登录成功后返回原访问页面
//             }
//         });
// 	}
// 	return next();
// });

export default router;
