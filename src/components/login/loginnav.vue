<template>
	<div>
		<el-row type="flex" class="login-topbar">
			<h2>Jonas的个人后台系统</h2>
		</el-row>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'First'
}
</script>

<style lang="stylus">
.login-topbar
	display flex
	align-items center
	height 3em
	border-bottom 1px solid rgb(230, 233, 240)
	& h2
		padding-left 2em
</style>