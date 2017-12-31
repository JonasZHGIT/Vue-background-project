<template>
	<div class="movie-container">
		<div class="movie-onshow-container">
			<div class="movie-onshow-title">
				<div>
    				<h3>&nbsp;&nbsp;正在热映</h3>
    				<router-link to='/douban/movie'>全部正在热映<i class="el-icon-d-arrow-right"></i></router-link>
    				<router-link to='/douban/movie'>即将上映<i class="el-icon-d-arrow-right"></i></router-link>
    			</div>
			</div>
			<div class="movie-onshow-carousel">
				<el-carousel height="240px" trigger="click" :interval="10000" :autoplay="false">
                    <el-carousel-item v-for="item in totalPage" :key="item">
                    	<div class="carousel-single" v-for="n in 6" :key="n" :class="{ishidden: !slideLists[6*(item-1) + n - 1].image}">
                        	<img :src="slideLists[6*(item-1) + n - 1].image" @mouseover="showPop(6*(item-1) + n - 1)" @mouseleave="showPop(-1)">
                        	<p class="carousel-detail">&nbsp;{{slideLists[6*(item-1) + n - 1].name}}</p>
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
    				<h3>&nbsp;&nbsp;豆瓣TOP250影片</h3>
    			</div>
			</div>
			<div class="movie-onshow-carousel">
				<el-carousel height="480px" trigger="click" :autoplay="false">
                    <el-carousel-item v-for="item_top in 5" :key="item_top">
                    	<div class="carousel-single" v-for="m in 12" :key="m">
                        	<img :src="slideTops[12*(item_top-1) + m - 1].image" @mouseover="showPopTop(6*(item_top-1) + m - 1)" @mouseleave="showPopTop(-1)">
                        	<p class="carousel-detail">&nbsp;{{slideTops[12*(item_top-1) + m - 1].name}}</p>
                        	<p class="carousel-rate carousel-detail">{{slideTops[12*(item_top-1) + m - 1].rate}}</p>
                        	<div class="movie-popover" :class="[m === 5 || m === 6 || m === 11 || m === 12?'movie-popover-right':'movie-popover-left', {isshown: showStatusTop === 12*(item_top-1) + m - 1}]">
                        		<h4>{{slideTops[12*(item_top-1) + m - 1].name}}<span class="movie-onshow-year">{{slideTops[12*(item_top-1) + m - 1].year}}</span></h4>
                        		<div class="carousel-rate"><span :class="slideTops[12*(item_top-1) + m - 1].starRate"></span>{{slideTops[12*(item_top-1) + m - 1].rate}}</div>
                        		<p>导演<span v-for="(director, index) in slideTops[12*(item_top-1) + m - 1].director" :key="index">{{director.name}}</span></p>
                        		<p>主演<span v-for="(cast, index) in slideTops[12*(item_top-1) + m - 1].cast" :key="index">{{cast.name}}</span></p>
                        	</div>
                        	<br />
                        </div>
                    </el-carousel-item>
                </el-carousel>
			</div>
		</div>

	</div>
</template>

<script>
export default {
	created: function() {
		this.getOnShowing();
		this.getTop();
	},
	data() {
		return {
			curPage: '1',
			totalPage: '',
			totalTop: '',
			slideLists: [],
			slideTops: [],
			currentIndex: 0,
			showStatus: -1,
			showStatusTop: -1
		}
	},
	methods: {
		getOnShowing: function() {
			this.$axios.get('/douban_api/movie/in_theaters?city=上海')
        	.then(resp => {
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
       				if(oRes.rate === 0) {
       					oRes.starRate = '';
       					oRes.rate = '暂无评分';
       				} else if (oRes.rate < 1) {
       					oRes.starRate = 'star_1';
       				} else if (oRes.rate < 2) {
       					oRes.starRate = 'star_2';
       				} else if (oRes.rate < 3) {
       					oRes.starRate = 'star_3';
       				} else if (oRes.rate < 4) {
       					oRes.starRate = 'star_4';
       				} else if (oRes.rate < 5) {
       					oRes.starRate = 'star_5';
       				} else if (oRes.rate < 6) {
       					oRes.starRate = 'star_6';
       				} else if (oRes.rate < 7) {
       					oRes.starRate = 'star_7';
       				} else if (oRes.rate < 8) {
       					oRes.starRate = 'star_8';
       				} else if (oRes.rate < 9) {
       					oRes.starRate = 'star_9';
       				} else if (oRes.rate < 10) {
       					oRes.starRate = 'star_10';
       				} else {
       					oRes.starRate = 'star_10full';
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
			this.$axios.get(`/douban_api/movie/top250?start=0&count=60`)
			.then(resp => {
				let res = resp.data.subjects;
				for (let i=0; i<res.length; i++) {
					let oRes = {};
					oRes.image = res[i].images.small;
					oRes.name = res[i].title;
					oRes.year = res[i].year;
       				oRes.director = [...res[i].directors];
       				oRes.cast = [...res[i].casts];
					oRes.rate = res[i].rating.average;
					oRes.rate = (oRes.rate + '').length === 1?oRes.rate + '.0':oRes.rate;
       				this.slideTops.push(oRes);
				}
				console.log(resp);
			}).catch(error => {
				console.log(error);
			});
		},
		showPop: function(n) {
			this.showStatus = n;
		},
		showPopTop: function(n) {
			this.showStatusTop = n;
		}
	}
}
</script>

<style lang="stylus">
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
	& a
		padding-left 1em
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
			width 5em
			height 0.8em
			background url('../../assets/star_rating.png') no-repeat center
		& .star_1
			background-position center -7.85em
		& .star_2
			background-position center -7.1em
		& .star_3
			background-position center -6.3em
		& .star_4
			background-position center -5.5em
		& .star_5
			background-position center -4.75em
		& .star_6
			background-position center -3.95em
		& .star_7
			background-position center -3.15em
		& .star_8
			background-position center -2.35em
		& .star_9
			background-position center -1.6em
		& .star_10
			background-position center -0.8em
		& .star_10full
			background-position center 0
.isshown
	display block !important
.ishidden
	opacity 0
</style>





