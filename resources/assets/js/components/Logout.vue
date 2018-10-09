<template>
	<el-row type="flex" justify="center">
		<el-col :span="8">
			<el-card :body-style="{ padding: '0px' }" class="login-card">
				<img src="/assets/img/login-icon.png" class="img img-login-icon">
				<h2 class="text-center">Logout</h2>
				<div style="margin: 0 0 24px 0; padding: 0;">
					<app-loader v-if="is_loading">..Signing out</app-loader>
				</div>

			</el-card>
		</el-col>
	</el-row>
</template>

<style>
	.login-card {
		margin-top: 40px;
	}
</style>

<script>

import AppLoader from '../partials/AppLoader'

	export default {
		components: {
			AppLoader
		},
		data() {
			return {
				is_loading: true,
			}
		},
		mounted: function() {

			setTimeout( () => {
				this.$store.commit('dis_authenticate')
				this.$router.replace({name: 'login'})
			}, 1200)
		}
	};
</script>
<!--  daniel@bucketlist.dev -->
