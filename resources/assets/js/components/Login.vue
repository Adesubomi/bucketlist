<template>
	<el-row type="flex" justify="center">
		<el-col :span="8">
			<el-card :body-style="{ padding: '0px' }" class="login-card">
				<img src="/assets/img/login-icon.png" class="img img-login-icon">
				<h2 class="text-center">Login</h2>
				<div style="padding: 14px;">
					<el-input
						placeholder="Email address"
						v-model="credentials.email">
						<i slot="prefix" class="ti-user ti-slot"></i>
					</el-input>
				</div>
				<div style="padding: 14px;">
					<el-input
						placeholder="Password"
						v-model="credentials.password">
						<i slot="prefix" class="ti-lock ti-slot"></i>
					</el-input>
				</div>

				<div style="padding: 14px; margin-bottom: 28px; text-align: center;">
					<el-button type="primary">
						<i class=""></i>
						Login</el-button>
				</div>
			</el-card>
		</el-col>
	</el-row>
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
