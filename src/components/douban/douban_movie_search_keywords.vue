<template>
	<div class="movie-search-container" v-loading="loading">
		<el-row>
		<el-col class="movie-search" :span="15">
			<el-input class="movie-search-input" placeholder="影片搜索" v-model="keywords" @keyup.enter.native="searchMovie">
				<el-select v-model="searchType" slot="prepend" class="movie-search-select" placeholder="请选择">
					<el-option value="1" label="关键字搜索"></el-option>
					<el-option value="2" label="标签搜索"></el-option>
				</el-select>
				<el-button slot="append" icon="el-icon-search" @click="searchMovie"></el-button>
			</el-input>
		</el-col>
		<el-col class="movie-search-back" :span="6">
			<el-button type="primary" plain @click="toBack">返回</el-button>
		</el-col>
	</el-row>
		<h2>搜索 {{id}}</h2>
		<div class="movie-search-result-container">
			<div v-for="(result, index) in results" :key="index" class="movie-search-result">
				<img :src="result.images.small" class="movie-search-image" @click="toDetail(result.id)" />
				<div class="movie-search-content">
					<h3 @click="toDetail(result.id)">{{result.title}}&nbsp;{{result.year}}</h3>
					<p class="movie-result-rate"><span :class="result.starRate"></span>{{result.rating.average}}</p>
					<p>影片类型： <span v-for="(genre, index) in result.genres" :key="index">{{genre}}&nbsp;</span></p>
					<p>主演： <span v-for="(cast, index) in result.casts" :key="index">{{cast.name}}&nbsp;</span></p>
				</div>
			</div>
		</div>
		<el-col :offset="16">
			<el-button type="text" @click="toFirst">首页</el-button>
			<el-button type="text" :disabled="start === 0" @click="toPrevious">上一页</el-button>
			<el-button type="text" :disabled="end" @click="toNext">下一页</el-button>
		</el-col>
	</div>
</template>

<script>
export default {
	created: function() {
		this.getResult();
	},
	data() {
		return {
			id: this.$route.params.id.split("=")[1],
			start: 0,
			end: false,
			keywords: '',
			searchType: '1',
			results: [],
			loading: true
		}
	},
	methods: {
		searchMovie: function() {
			if(this.searchType === '1') {
				this.$router.push({path: `/douban/movie_search/keywords=${this.keywords}`});
			} else {
				this.$router.push({path: `/douban/movie_search/tag=${this.keywords}`});
			}
			this.$router.go(0);
		},
		getResult: function() {
			let params = {
				count: 10,
				start: this.start
			};
			this.loading = true;
			this.result = [];
			if(this.$route.params.id.split("=")[0] === 'tag') {
				params.tag = this.id;
			} else {
				params.q = this.id;
			}
			this.$douban({
				url: '/douban_api/movie/search',
				method: 'get',
				params: params
			}).then(resp => {
				this.results = [...resp.data.subjects];
				if(this.results.length != 0) {
					this.end = false;
					this.results.forEach((e, i) => {
						if(e.rating.average === 0) {
							e.starRate = '';
							e.rating.average = '暂无评分';
						} else {
							e.starRate = this.defineStar(e.rating.average);
						}
						e.rating.average = (e.rating.average + '').length === 1?e.rating.average + '.0':e.rating.average;
						this.loading = false;
					});
				} else {
					this.end = true;
					this.showMsg();
					this.loading = false;
				}
			}).catch(error => {
				console.log(error);
			});
		},
		defineStar: function(num) {
			if (num < 1) {
				return 'star_1';
			} else if (num < 2) {
				return'star_2';
			} else if (num < 3) {
				return 'star_3';
			} else if (num < 4) {
				return 'star_4';
			} else if (num < 5) {
				return 'star_5';
			} else if (num < 6) {
				return 'star_6';
			} else if (num < 7) {
				return 'star_7';
			} else if (num < 8) {
				return 'star_8';
			} else if (num < 9) {
				return 'star_9';
			} else if (num < 10) {
				return 'star_10';
			} else {
				return 'star_10full';
			}
		},
		toDetail: function(id) {
			this.$router.push({path: `/douban/movie_detail/${id}`});
		},
		toBack() {
			this.$router.go(-1);
		},
		toFirst() {
			this.$router.go(0);
		},
		toPrevious() {
			this.start -= 10;
			this.getResult();
		},
		toNext() {
			this.start += 10;
			this.getResult();
		},
		showMsg() {
			this.$notify({
        message: '( ⊙ o ⊙ )啊！没有更多结果了！',
        position: 'bottom-right'
      });
		}
	}
}
</script>

<style lang="stylus">
.movie-search-back
	padding 2em 0 2em 5em
.movie-search
	padding 2em 0 2em 5em
	& .movie-search-input
		width 28em
		& .movie-search-select
			width 10em
.el-input-group__prepend,
.el-input-group__append
	background-color #fff !important
.movie-search-container
	width 54em
	margin 0 auto
	& h2
		padding-left 2em
.movie-search-result-container
	padding 2em
	& .movie-search-result
		display flex
		padding 1em
		& .movie-search-content
			padding-left 1em
			& h3
				padding-bottom 0.5em
				cursor pointer
			& p
				color #666
				line-height 2em
				& span
					color #000
			& .movie-result-rate
				font-size 0.14rem
				color #e09015
				& .star_1,
				& .star_2,
				& .star_3,
				& .star_4,
				& .star_5,
				& .star_6,
				& .star_7,
				& .star_8,
				& .star_9,
				& .star_10,
				& .star_10full
					display inline-block
					width 4.5em
					height 0.78em
					background url('../../assets/star_rating.png') no-repeat center
				& .star_1
					background-position left -7.85em
				& .star_2
					background-position left -7.1em
				& .star_3
					background-position left -6.3em
				& .star_4
					background-position left -5.5em
				& .star_5
					background-position left -4.75em
				& .star_6
					background-position left -3.95em
				& .star_7
					background-position left -3.15em
				& .star_8
					background-position left -2.35em
				& .star_9
					background-position left -1.6em
				& .star_10
					background-position left -0.8em
				& .star_10full
					background-position left 0
		& .movie-search-image
			width 5em
			height 7em
			padding 0.5em
			cursor pointer
</style>




