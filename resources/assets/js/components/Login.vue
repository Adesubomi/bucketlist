<template>
	<el-row type="flex" justify="center">
		<el-col :span="8">
			<el-card :body-style="{ padding: '0px' }" class="login-card">
				<img src="/assets/img/login-icon.png" class="img img-login-icon">
				<h2 class="text-center">Login</h2>
				<div style="padding: 14px;">
					<el-input type="email"
						placeholder="Email address"
						v-model="credentials.email">
						<i slot="prefix" class="ti-user ti-slot"></i>
					</el-input>
				</div>
				<div style="padding: 14px;">
					<el-input type="password"
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
				credentials: {
					email: '',
					password: ''
				}
			}
		},
		mounted: function() {

		},
		methods: {

			login: function () {

				this.is_loading = true;

				axios.post(this.$api.url('login'), this.credentials)
	                .then(response => {
						this.is_loading = false;

						if (response.data.status && response.data.status == 'success') {

							const authObj = {
								token: response.data.payload.token.token,
								user: response.data.payload.user,
							}

							this.$store.commit('authenticate', authObj)

							this.$router.push({name: 'dashboard'});
						}
						else {

							this.$snotify.error('Username - password combination does not match',
								'Login failed');
						}
					})
					.catch( err => {

						this.is_loading = false;
						this.$snotify.error('Login attempt failed. Try again later',
							'Ooops!');

							console.log(err);
					})
			}
		}
	};
</script>
<!--  daniel@bucketlist.dev -->
