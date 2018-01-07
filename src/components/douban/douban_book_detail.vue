<template>
	<div class="movie-detail-container">
		<div v-if="!loading">
			<h1>{{message.title}}</h1>
			<div class="movie-detail-message">
				<img :src="message.images.large" class="movie-detail-image" />
					<div class="movie-detail-content">
						<p>作者: <span v-for="(name, index) in message.author" :key="index">{{name}}&nbsp;</span><span v-if="message.translator.length" v-for="(tr_name, tr_index) in message.translator" :key="tr_index+tr_name">{{tr_name}}(译)</span></p>
						<p v-if="message.translator.length">译者: <span v-for="(name, index) in message.translator" :key="index">{{name}}&nbsp;</span></p>
						<p v-if="message.origin_title">原标题: <span>{{message.origin_title}}</span></p>
						<p v-if="message.subtitle">副标题: <span>{{message.subtitle}}</span></p>
						<p>出版社: <span>{{message.publisher}}</span></p>
						<p>出版年份: <span>{{message.pubdate}}</span></p>
						<p>页数: <span>{{message.pages}}</span></p>
						<p>定价: <span>{{message.price}}</span></p>
						<p>ISBN: <span>{{message.isbn13}}</span></p>
						<p>标签： <span v-for="(tag, index) in message.tags" :key="index">{{tag.name}}&nbsp;</span></p>
					</div>
			</div>
			<div class="movie-detail-intro"><h3>{{message.title}}的剧情简介：</h3><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{message.summary}}</p></div>
			<br />
			<div class="movie-detail-intro"><h3>{{message.title}}的作者简介：</h3><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{message.author_intro}}</p></div>
			<br />
			<div class="movie-detail-intro" v-if="message.catalog"><h3>{{message.title}}的目录：</h3><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{message.catalog}}</p></div>
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
			this.$douban.get(`/douban_api/book/${this.id}`)
			.then(resp => {
				console.log(resp);
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





