<template>
	<div>
	<el-row>
		<h3>This is the homepage.</h3>
	</el-row>
</div>
</template>

<script>
import {doSomethingAPI} from '../../util/mock';

export default {
	data() {
		return {
		}
	},
	methods: {
		getData: function() {
			this.$axios.get(`/some`)
			.then(resp => {
				console.log(resp);
			}).catch(error => {
				console.log(error);
			});
		}
	}
}
</script>

<style>
</style>