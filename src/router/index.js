import Vue from 'vue';
import Router from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Loginnav from '@/components/loginnav';
import Login from '@/components/login';
import Navigation from '@/components/navigation';
import Homepage from '@/components/homepage';
import OAuth from '@/oauth';

let oAuth = new OAuth(); 

Vue.use(Router);
Vue.use(ElementUI);

const router = new Router({
	mode: 'history',
	routes: [
        { path: '/', redirect: '/home' },
        { path: '/nav', component: Navigation, redirect: '/home', children: [
        	{ path: '/home', component: Homepage }
        ]}, 
        { path: '/loginnav', component: Loginnav, redirect: '/login', children: [
        	{ path: '/login', name: 'loginPage', component: Login, meta: { allowAnonymous : true } }
        ]}
    ]
});

router.beforeEach((to, from, next) => {
	let allowAnonymous = false;
	if(to.name === 'loginPage' && oAuth.isAuthenticated()) {
		console.log("authenticated");
		return next({
            path: '/'
        });
	} else if(!to.meta.allowAnonymous && oAuth.isGuest()) {
		console.log("Guest");
		return next({
            path: '/login'
            // query: {
            //     redirect: to.fullPath // 登录成功后返回原访问页面
            // }
        });
	}
	return next();
});

export default router;
