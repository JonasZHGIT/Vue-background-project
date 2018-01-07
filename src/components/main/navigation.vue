<template>
	<div class="main-container">
		<div class="main-sidebar">
			<div>
				<img class="sidebar-image" src="../../assets/main_logo.jpg" />
			</div>
			<router-link class="sidebar-link" to="/home">首页</router-link>
			<router-link class="sidebar-link" to="/douban/movie">豆瓣电影</router-link>
			<router-link class="sidebar-link" to="/douban/book_search">豆瓣图书</router-link>
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
	display flex
	flex-direction column
	align-items center
	flex-basis 10em
	flex-shrink 0
	border-right $border
	& .sidebar-image
		margin 2em
		width 5em
		height 5em
	& .sidebar-link
		width 4em
		padding 1em
.main-rightside
	display flex
	flex-direction column
	flex-basis calc(100% - 10em)
	padding-bottom 5em
.main-topbar
	display flex
	align-items center
	flex-basis 5em
	border-bottom $border
	& h2
		padding-left 2em
		flex-shrink 0
	& button
		margin-right 2em
</style>





