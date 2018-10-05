<template>
	<div class="container">
		<div class="app-header-1">
			<h2>Bucketlist Application</h2>
		</div>
		<el-row type="flex" justify="center">
			<el-col :xs="24" :sm="10" :md="8" :lg="6" :xl="4">
				<div style="margin: 72px 0 48px 0; text-align: center;">
					<img src="/assets/img/people.png" class="img img-login-icon">
				</div>
				<el-menu default-active="2" :router="true"
					class="el-menu-vertical-demo">

					<el-menu-item index="1" :route="{ name: 'home' }">
						<i class="ti-home"></i>
						<span>Dashboard </span>
					</el-menu-item>
					<el-menu-item index="2" :route="{ name: 'bucketlists.index' }">
						<i class="ti-package"></i>
						<span>Buckelists </span>
					</el-menu-item>
					<el-menu-item index="3">
						<i class="ti-power-off"></i>
						<span>Logout</span>
					</el-menu-item>
				</el-menu>
			</el-col>

			<el-col :xs="24" :sm="14" :md="16" :lg="18" :xl="20">
				<router-view></router-view>
			</el-col>
		</el-row>
	</div>
</template>

<style>

</style>

<script>
	export default {
		data() {
			return {

			}
		}
	};
</script>
