<template>
	<div v-loading="loading" :class="{'movie-loading': loading}">
		<div class="movie-container"v-if="!loading">
			<div class="movie-onshow-container">
				<el-col class="movie-search" :offset="10" :span="14">
					<el-input class="movie-search-input" placeholder="影片搜索" v-model="keywords" @keyup.enter.native="searchMovie">
						<el-select v-model="searchType" slot="prepend" class="movie-search-select" placeholder="请选择">
							<el-option value="1" label="关键字搜索"></el-option>
							<el-option value="2" label="标签搜索"></el-option>
						</el-select>
						<el-button slot="append" icon="el-icon-search" @click="searchMovie"></el-button>
					</el-input>
				</el-col>
				<div class="movie-onshow-title">
					<div>
						<h3>&nbsp;&nbsp;正在热映</h3>
					</div>
				</div>
				<div class="movie-onshow-carousel">
					<el-carousel height="240px" indicator-position="none" :interval="10000" :autoplay="false">
						<el-carousel-item v-for="item in totalPage" :key="item">
							<div class="carousel-single" v-for="n in 6" :key="n" :class="{ishidden: !slideLists[6*(item-1) + n - 1].image}">
								<img :src="slideLists[6*(item-1) + n - 1].image" @mouseover="showPop(6*(item-1) + n - 1)" @mouseleave="showPop(-1)" @click="toDetail(slideLists[6*(item-1) + n - 1].id)">
								<p class="carousel-detail" @click="toDetail(slideLists[6*(item-1) + n - 1].id)">&nbsp;{{slideLists[6*(item-1) + n - 1].name}}</p>
								<p class="carousel-rate carousel-detail"><span :class="slideLists[6*(item-1) + n - 1].starRate"></span>{{slideLists[6*(item-1) + n - 1].rate}}</p>
								<div class="movie-popover" :class="[n === 5 || n === 6?'movie-popover-right':'movie-popover-left', {isshown: showStatus === 6*(item-1) + n - 1}]">
									<h4>{{slideLists[6*(item-1) + n - 1].name}}<span class="movie-onshow-year">{{slideLists[6*(item-1) + n - 1].year}}</span></h4>
									<div class="carousel-rate"><span :class="slideLists[6*(item-1) + n - 1].starRate"></span>{{slideLists[6*(item-1) + n - 1].rate}}</div>
									<p>导演<span v-for="(director, index) in slideLists[6*(item-1) + n - 1].director" :key="index">{{director.name}}</span></p>
									<p>主演<span v-for="(cast, index) in slideLists[6*(item-1) + n - 1].cast" :key="index">{{cast.name}}</span></p>
								</div>
							</div>
						</el-carousel-item>
					</el-carousel>
				</div>
			</div>

			<div class="movie-onshow-container">
				<div class="movie-onshow-title">
					<div>
						<h3>&nbsp;&nbsp;北美票房榜</h3>
					</div>
				</div>
				<div class="movie-onshow-carousel">
					<el-carousel height="240px" indicator-position="none" :interval="10000" :autoplay="false">
						<el-carousel-item v-for="item in totalPageUSA" :key="item">
							<div class="carousel-single" v-for="n in 6" :key="n" :class="{ishidden: !slideUSA[6*(item-1) + n - 1].image}">
								<img :src="slideUSA[6*(item-1) + n - 1].image" @mouseover="showPopUSA(6*(item-1) + n - 1)" @mouseleave="showPopUSA(-1)" @click="toDetail(slideUSA[6*(item-1) + n - 1].id)">
								<p class="carousel-detail" @click="toDetail(slideUSA[6*(item-1) + n - 1].id)">&nbsp;{{slideUSA[6*(item-1) + n - 1].name}}</p>
								<p class="carousel-rate carousel-detail"><span :class="slideUSA[6*(item-1) + n - 1].starRate"></span>{{slideUSA[6*(item-1) + n - 1].rate}}</p>
								<div class="movie-popover" :class="[n === 5 || n === 6?'movie-popover-right':'movie-popover-left', {isshown: showStatusUSA === 6*(item-1) + n - 1}]">
									<h4>{{slideUSA[6*(item-1) + n - 1].name}}<span class="movie-onshow-year">{{slideUSA[6*(item-1) + n - 1].year}}</span></h4>
									<div class="carousel-rate"><span :class="slideUSA[6*(item-1) + n - 1].starRate"></span>{{slideUSA[6*(item-1) + n - 1].rate}}</div>
									<p>导演<span v-for="(director, index) in slideUSA[6*(item-1) + n - 1].director" :key="index">{{director.name}}</span></p>
									<p>主演<span v-for="(cast, index) in slideUSA[6*(item-1) + n - 1].cast" :key="index">{{cast.name}}</span></p>
								</div>
							</div>
						</el-carousel-item>
					</el-carousel>
				</div>
			</div>

			<div class="movie-onshow-container">
				<div class="movie-onshow-title">
					<div>
						<h3>&nbsp;&nbsp;豆瓣TOP250影片</h3>
					</div>
				</div>
				<div class="movie-onshow-carousel">
					<el-carousel height="480px" indicator-position="none" :autoplay="false">
						<el-carousel-item v-for="item in 5" :key="item">
							<div class="carousel-single" v-for="n in 12" :key="n">
								<img :src="slideTops[12*(item-1) + n - 1].image" @mouseover="showPopTop(12*(item-1) + n - 1)" @mouseleave="showPopTop(-1)" @click="toDetail(slideTops[12*(item-1) + n - 1].id)">
								<p class="carousel-detail" @click="toDetail(slideTops[12*(item-1) + n - 1].id)">&nbsp;{{slideTops[12*(item-1) + n - 1].name}}</p>
								<p class="carousel-rate carousel-detail"><span :class="slideTops[12*(item-1) + n - 1].starRate"></span>{{slideTops[12*(item-1) + n - 1].rate}}</p>
								<div class="movie-popover" :class="[n === 5 || n === 6 || n === 11 || n === 12?'movie-popover-right':'movie-popover-left', {isshown: showStatusTop === 12*(item-1) + n - 1}]">
									<h4>{{slideTops[12*(item-1) + n - 1].name}}<span class="movie-onshow-year">{{slideTops[12*(item-1) + n - 1].year}}</span></h4>
									<div class="carousel-rate"><span :class="slideTops[12*(item-1) + n - 1].starRate"></span>{{slideTops[12*(item-1) + n - 1].rate}}</div>
									<p>导演<span v-for="(director, index) in slideTops[12*(item-1) + n - 1].director" :key="index">{{director.name}}</span></p>
									<p>主演<span v-for="(cast, index) in slideTops[12*(item-1) + n - 1].cast" :key="index">{{cast.name}}</span></p>
								</div>
								<br />
							</div>
						</el-carousel-item>
					</el-carousel>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
export default {
	created: function() {
		this.getOnShowing();
		this.getTop();
		this.getUSA();
	},
	data() {
		return {
			loading: true,
			searchType: '1',
			keywords: '',
			totalPage: '',
			totalPageUSA: '',
			totalTop: '',
			slideLists: [],
			slideTops: [],
			slideUSA: [],
			showStatus: -1,
			showStatusTop: -1,
			showStatusUSA: -1
		}
	},
	methods: {
		getOnShowing: function() {
			this.$douban.get('/douban_api/movie/in_theaters?city=上海')
			.then(resp => {
				console.log(resp);
				let res = resp.data.subjects;
				this.totalPage = Math.ceil(res.length / 6);
				for(let i=0; i<res.length; i++) {
					let oRes = {};
					oRes.image = res[i].images.small;
					oRes.name = res[i].original_title;
					oRes.rate = res[i].rating.average;
					oRes.year = res[i].year;
					oRes.director = [...res[i].directors];
					oRes.cast = [...res[i].casts];
					oRes.id = res[i].id;
					if(oRes.rate === 0) {
						oRes.starRate = '';
						oRes.rate = '暂无评分';
					} else {
						oRes.starRate = this.defineStar(oRes.rate);
					}
					oRes.rate = (oRes.rate + '').length === 1?oRes.rate + '.0':oRes.rate;
					this.slideLists.push(oRes);
				}
				for(let i=0; i<6 - res.length % 6; i++) {
					this.slideLists.push({});
				}
			}).catch(error => {
				console.log(error);
			});
		},
		getTop: function() {
			this.$douban.get(`/douban_api/movie/top250?start=0&count=60`)
			.then(resp => {
				let res = resp.data.subjects;
				for (let i=0; i<res.length; i++) {
					let oRes = {};
					oRes.image = res[i].images.small;
					oRes.name = res[i].title;
					oRes.year = res[i].year;
					oRes.director = [...res[i].directors];
					oRes.cast = [...res[i].casts];
					oRes.id = res[i].id;
					oRes.rate = res[i].rating.average;
					this.defineStar(oRes.rate, oRes.starRate);
					if(oRes.rate === 0) {
						oRes.starRate = '';
						oRes.rate = '暂无评分';
					} else {
						oRes.starRate = this.defineStar(oRes.rate);
					}
					oRes.rate = (oRes.rate + '').length === 1?oRes.rate + '.0':oRes.rate;
					this.slideTops.push(oRes);
					this.loading = false;
				}
			}).catch(error => {
				console.log(error);
			});
		},
		getUSA: function() {
			this.$douban.get('/douban_api/movie/us_box')
			.then(resp => {
				let res = resp.data.subjects;
				this.totalPageUSA = Math.ceil(res.length / 6);
				for (let i=0; i<res.length; i++) {
					let oRes = {};
					oRes.image = res[i].subject.images.small;
					oRes.name = res[i].subject.title;
					oRes.year = res[i].subject.year;
					oRes.director = [...res[i].subject.directors];
					oRes.cast = [...res[i].subject.casts];
					oRes.id = res[i].subject.id;
					oRes.rate = res[i].subject.rating.average;
					if(oRes.rate === 0) {
						oRes.starRate = '';
						oRes.rate = '暂无评分';
					} else {
						oRes.starRate = this.defineStar(oRes.rate);
					}
					oRes.rate = (oRes.rate + '').length === 1?oRes.rate + '.0':oRes.rate;
					this.slideUSA.push(oRes);
				}
				for(let i=0; i<6 - res.length % 6; i++) {
					this.slideUSA.push({});
				}
			}).catch(error => {
				console.log(error)
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
		showPop: function(n) {
			this.showStatus = n;
		},
		showPopTop: function(n) {
			this.showStatusTop = n;
		},
		showPopUSA: function(n) {
			this.showStatusUSA = n;
		},
		searchMovie: function() {
			if(this.searchType === '1') {
				this.$router.push({path: `/douban/movie_search/keywords=${this.keywords}`});
			} else {
				this.$router.push({path: `/douban/movie_search/tag=${this.keywords}`});
			}
		}
	}
}
</script>

<style lang="stylus">
.movie-loading
	width 100%
	height 100%
.movie-onshow-container
	& .movie-search
		padding 1em
	& .movie-search-input
		width 28em
		& .movie-search-select
			width 10em
.el-input-group__prepend,
.el-input-group__append
	background-color #fff !important
.movie-container,
.movie-onshow-container
	display flex
	flex-direction column
	width 54em
	margin 0 auto
.movie-onshow-title
	display flex
	justify-content space-between
	padding 1em 0
	border-bottom: 1px solid rgb(230, 233, 240)
	& div
		line-height 2em
	& h3
		display inline
.movie-onshow-carousel
	width 54em
	padding  1.5em 0
	& .carousel-single
		display inline-block
		position relative
		& .movie-popover-left
			left 9em
		& .movie-popover-right
			left -18em
		& .movie-popover
			display none
			position absolute
			width 18em
			height 15em
			top 0
			padding: 1em
			text-align left
			background-color #fff
			overflow: hidden
			z-index 10
			& .carousel-rate
				line-height 3em
			& p
				text-align left
				line-height 2em
				font-size: 0.12rem
				width: 15em
				& span
					padding-left 1em
			& .movie-onshow-year 
				padding-left 1em
				font-size 0.12rem
	& img
		width 8em
		height 12em
		overflow hidden
		padding 0 0.5em
		cursor pointer
	& .carousel-detail
		width 9em
		line-height 3em
		overflow hidden
		white-space nowrap
		text-overflow ellipsis
		text-align center
	& .carousel-rate
		font-size 0.14rem
		color #e09015
		line-height 1em
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
.isshown
	display block !important
.ishidden
	opacity 0
</style>





