<template>
	<el-row type="flex" justify="center" class="login-group">
		<el-form :model="formData">
			<el-form-item>
     			<el-input class="login-input" v-model="formData.username" placeholder="用户名"></el-input>
     		</el-form-item>
     		<el-form-item>
     			<el-input class="login-input" v-model="formData.password" placeholder="密码"></el-input>
     		</el-form-item>
     		<el-form-item>
     			<el-button class="login-btn" type="primary">登录</el-button>
     		</el-form-item>
  		</el-form>
	</el-row>
</template>

<script>
export default {
	data() {
		return {
			formData: {
				username: '',
				password: ''
			}
		}
	}
}
</script>

<style>
.login-group {
	padding: 10em 0;
}
.login-input, .login-btn {
	width: 15em;
}
</style>