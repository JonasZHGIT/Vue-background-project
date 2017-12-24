<template>
	<el-row type="flex" justify="center" class="login-group">
		<el-form>
			<el-form-item>
     			<el-input class="login-input" v-model="formData.username" placeholder="用户名"></el-input>
     		</el-form-item>
     		<el-form-item>
     			<el-input class="login-input" v-model="formData.password" type="password" placeholder="密码"></el-input>
     		</el-form-item>
     		<el-form-item>
     			<el-button class="login-btn" type="primary" @click="login">登录</el-button>
     		</el-form-item>
  		</el-form>
	</el-row>
</template>

<script>
import {loginAPI} from '../../util/mock';
import OAuth from '@/oauth';

let oAuth = new OAuth();

export default {
	data() {
		return {
			formData: {
				username: 'jonas',
				password: '123'
			}
		}
	},
	methods: {
		login() {
        	this.$axios.post(`/login`, this.formData)
        	.then(resp => {
        		console.log(resp);
        		let access_token = resp.data;
        		oAuth.setCookie("access_token", access_token);
        		this.$router.push({ path: '/home'});
        	}).catch(error => {
        		console.log(error);
        	});
        }
	}
}
</script>

<style lang="stylus">
.login-group
    padding 10em 0
.login-input,
.login-btn
    width 15em
</style>