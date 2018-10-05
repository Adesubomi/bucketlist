<template>
	<div class="">
		<router-view></router-view>
	</div>
</template>

<style>
	.login-card {
		margin-top: 40px;
	}

	.img-login-icon {
		margin: 20px auto;
		max-width: 144px;
	}
</style>

<script>
	export default {
		data() {
			return {
				currentDate: new Date(),
				// tableData: Array(20).fill(item)
				tableData: [],
				credentials: {
					email: '',
					password: ''
				}
			}
		}
	};
</script>
