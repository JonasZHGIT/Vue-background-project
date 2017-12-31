<template>
	<div class="main-container">
		<div class="main-sidebar">
		</div>
    	<div class="main-rightside">
    		<el-row type="flex" class="main-topbar" justify="space-between">
    			<h2>Jonas的后台页面</h2>
    			<el-button type="primary" plain @click="logout" size="small">退出</el-button>
    		</el-row>
    		<router-view></router-view>
    	</div>
	</div>
</template>

<script>
import OAuth from '@/oauth';

let oAuth = new OAuth();

export default {
	methods: {
		logout() {
			oAuth.logout();
			this.$router.push({ path: '/login' });
		}
	}
}
</script>

<style lang="stylus">
$border = 1px solid rgb(230, 233, 240)
.main-container
	display flex
	min-height 100%
.main-sidebar
	flex-basis 10em
	border-right $border
.main-rightside
	display flex
	flex-direction column
	flex-basis calc(100% - 10em)
	padding-bottom 5em
.main-topbar
	display flex
	align-items center
	flex-basis 3em
	border-bottom $border
	& h2
		padding-left 2em
	& button
		margin-right 2em
</style>





