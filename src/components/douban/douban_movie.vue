<template>
	<div class="movie-container">
		<div class="movie-onshow-container">
			<div class="movie-onshow-title">
				<div>
    				<h3>正在热映</h3>
    				<router-link to='/douban/movie'>全部正在热映<i class="el-icon-d-arrow-right"></i></router-link>
    				<router-link to='/douban/movie'>即将上映<i class="el-icon-d-arrow-right"></i></router-link>
    			</div>
			</div>
			<div class="movie-onshow-carousel">
				<el-carousel height="240px" trigger="click" :interval="10000">
                    <el-carousel-item v-for="item in totalPage" :key="item">
                    	<div class="carousel-single" v-for="n in 6" :key="n" :class="{ishidden: !slideLists[6*(item-1) + n - 1].image}">
                        	<img :src="slideLists[6*(item-1) + n - 1].image">
                        	<p>{{slideLists[6*(item-1) + n - 1].name}}</p>
                        	<p class="carousel-rate"><span :class="slideLists[6*(item-1) + n - 1].starRate"></span>{{slideLists[6*(item-1) + n - 1].rate}}</p>
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
		this.$nextTick(() => {
			this.getOnShowing();
		});
	},
	data() {
		return {
			curPage: '1',
			totalPage: '',
			slideLists: [],
			currentIndex: 0
		}
	},
	methods: {
		getOnShowing: function() {
			this.$axios.get('/douban_api/movie/in_theaters?city=上海')
        	.then(resp => {
        		console.log(resp);
        		let res = resp.data;
        		this.totalPage = Math.ceil(res.subjects.length / 6);
        		for(let i=0; i<res.subjects.length; i++) {
        			let oRes = {};
       				oRes.image = res.subjects[i].images.small;
       				oRes.name = res.subjects[i].original_title;
       				oRes.rate = res.subjects[i].rating.average;
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
        		for(let i=0; i<6 - res.subjects.length % 6; i++) {
        			this.slideLists.push({});
        		}
        	}).catch(error => {
        		console.log(error);
        	});
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
	& img
		width 8em
		height 12em
		overflow hidden
		padding: 0 0.5em
	& p
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
.ishidden
	opacity 0
</style>





