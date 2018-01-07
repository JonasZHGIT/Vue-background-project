<template>
	<div class="movie-detail-container">
		<div v-if="!loading">
			<h1>{{message.title}}<span class="movie-detail-year">&nbsp;({{message.year}})</span></h1>
			<div class="movie-detail-message">
				<img :src="message.images.large" class="movie-detail-image" />
				<div class="movie-detail-content">
					<p>导演: <span v-for="(director, index) in message.directors" :key="index">{{director.name}}&nbsp;</span></p>
					<p>主演: <span v-for="(cast, index) in message.casts" :key="index">{{cast.name}}&nbsp;</span></p>
					<p>类型: <span v-for="(genre, index) in message.genres" :key="index">{{genre}}&nbsp;</span></p>
					<p>制片国家/地区: <span v-for="(country, index) in message.countries" :key="index">{{country}}&nbsp;</span></p>
					<p>又名: <span v-for="(name, index) in message.aka" :key="index">{{name}}&nbsp;</span></p>
				</div>
			</div>
			<div class="movie-detail-intro"><h3>{{message.title}}的剧情简介：</h3><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{message.summary}}</p></div>
			<br /><br /><br />
			<div>
				<el-button type="primary" plain @click="toBack">返回</el-button>
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
			this.$douban.get(`/douban_api/movie/subject/${this.id}`)
			.then(resp => {
				this.message = resp.data;
				this.loading = false;
			}).catch(error => {
				console.log(error);
			});
		},
		toBack() {
			this.$router.go(-1);
		}
	}
}
</script>

<style lang="stylus">
.movie-detail-container
	padding 2em
	& .movie-detail-year
		color #666
	& .movie-detail-message
		display flex
	& .movie-detail-image
		width 10em
		height 13.5em
		padding 1em 2em 1em 0 
	& .movie-detail-content
		padding-top 1em
		& p
			line-height 2em
			color #666
		& span
			color #000
	& .movie-detail-intro
		& p
			padding-top 1em
		& h3
			padding-top 1em
			color #072
</style>





