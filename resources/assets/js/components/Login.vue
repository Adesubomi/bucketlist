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
					<el-button type="primary" @click.prevent="login()" :disabled="is_loading">
						<i class="el-icon-loading" v-show="is_loading"></i>
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
</style>

<script>
	export default {
		data() {
			return {
				is_loading: false,
				currentDate: new Date(),
				// tableData: Array(20).fill(item)
				tableData: [],
				credentials: {
					email: '',
					password: ''
				}
			}
		},
		methods: {

			login: function () {

				this.is_loading = true;

				axios.post(this.$api.url('login'), this.resolvedBankAccount)
	                .then(response => {

						this.is_loading = false;
						console.log(response);
					})
					.catch( err => {

						this.is_loading = false;
						console.log(err);
					})
			}
		}
	};
</script>
