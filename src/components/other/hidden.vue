<template>
	<div>
		<iframe width="530" height="298" :src="videoSrc" frameborder="0" allowfullscreen></iframe>
	</div>
</template>

<script>
export default {
	created() {
		this.getVideo();
	},
	data() {
		return {
			videoSrc: '',
			page: 1
		}
	},
	methods: {
		getVideo() {
			console.log(process.env.HIDDEN_ROOT);
			this.$axios.get(`/videos/${this.page}`)
			.then(resp => {
				console.log(resp);
				console.log(resp.data.response.videos[0].embedded_url);
				let aVideo = resp.data.response.videos;
				this.videoSrc = aVideo[0].embedded_url;
			}).catch(error => {
				console.log(error);
			});
		}
	}
}
</script>

<style>
</style>