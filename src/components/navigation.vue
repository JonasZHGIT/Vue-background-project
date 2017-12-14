<template>
	<div class="container">
		<div class="main-sidebar">
		</div>
    	<div class="main-rightside">
    		<el-row class="main-topbar">
    			<h2>Jonas的后台页面</h2>
    		</el-row>
    		<router-view></router-view>
    	</div>
	</div>
</template>

<script>
export default {
}
</script>

<style>
.container {
	display: flex;
	min-height: 100%;
}
.main-sidebar {
	flex-basis: 10em;
	border-right: 1px solid rgb(230, 233, 240);
}
.main-rightside {
	display: flex;
	flex-direction: column;
	flex-basis: calc(100% - 10em);
}
.main-topbar {
	display: flex;
	align-items: center;
	flex-basis: 3em;
	border-bottom: 1px solid rgb(230, 233, 240);
}
.main-topbar h2 {
	padding-left: 2em;
}
</style>