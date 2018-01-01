<template>
	<div class="movie-detail-container">
		<div v-if="!loading">
		<h2>{{message.title}}<span>({{message.year}})</span></h2>
		<div class="movie-detail-message">
			<image :src="message.images.small" ></image>
			<div>
				<p>导演<span v-for="(director, index) in message.directors" :key="index">{{director.name}}</span></p>
				<p>主演<span v-for="(cast, index) in message.casts" :key="index">{{cast.name}}</span></p>
				<p>类型<span v-for="(genre, index) in message.genres" :key="index">{{genre}}</span></p>
				<p>制片国家/地区<span v-for="(country, index) in message.countries" :key="index">{{country}}</span></p>
				<p>又名<span v-for="(name, index) in message.aka" :key="index">{{name}}</span></p>
			</div>
		</div>
		<div class="movie-detail-intro">{{message.summary}}</div>
		<div class="movie-detail-pic">
		</div>
	</div>
	</div>
</template>

<script>
export default {
	created() {
		this.getMessage();
	},
	data() {
		return {
			loading: true,
			id: this.$route.params.id,
			message: null
		}
	},
	methods: {
		getMessage() {
			this.$axios.get(`/douban_api/movie/subject/${this.id}`)
			.then(resp => {
				console.log(resp);
				this.message = resp.data;
				this.loading = false;
			}).catch(error => {
				console.log(error);
			});
		}
	}
}
</script>

<style lang="stylus">
</style>