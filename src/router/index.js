import Vue from 'vue';
import Router from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Loginnav from '@/components/loginnav';
import Login from '@/components/login';
import Navigation from '@/components/navigation';
import Homepage from '@/components/homepage';


Vue.use(Router);
Vue.use(ElementUI);

export default new Router({
	mode: 'history',
	routes: [
	{
		path: '/nav',
		component: Navigation,
		redirect: '/home',
		children: [
		{
			path: '/home',
			component: Homepage
		}
		]
	}, {
		path: '/loginnav',
		component: Loginnav,
		redirect: '/login',
		children: [
		{
			path: '/login',
			component: Login
		}
		]
	}
	]
});
