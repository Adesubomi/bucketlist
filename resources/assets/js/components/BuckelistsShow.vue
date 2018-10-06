<template>
	<div class="">
		<div class="app-header-2">
			<h3>Bucketlist details</h3>
		</div>

		<app-loader v-if="is_fetching">..Loading</app-loader>

		<div class="" v-if="!is_fetching">

			<el-card class="bucketlist-card">
				<el-row type="flex">
					<el-col :span="2">
						<div style="margin-top: 3px; text-align: center;">
							<i class="ti-package"></i>
						</div>
					</el-col>
					<el-col :span="21">
						<div class="buckelist-name">{{bucketlist.name}}</div>
						<div class="buckelist-date">{{bucketlist.date}}</div>
					</el-col>
				</el-row>
			</el-card>

			<div class="buckelist-items-list-block">
				<div class="app-header-3">
					<h4>Items in this list</h4>
				</div>

				<div v-for="i in 4">
					<el-card class="bucketlist-item-card done" shadow="never">
						<el-row type="flex">
							<el-col :span="2">
								<div style="margin-top: 3px; text-align: center;">
									<i class="el-icon-document"></i>
								</div>
							</el-col>
							<el-col :span="21">
								<div class="buckelist-item-name">{{bucketlist.name}}</div>
								<div class="buckelist-item-date">{{bucketlist.date}}</div>
								<div class="" style="margin-top: 12px;">
									<el-button type="primary" plain size="mini">
										<i class="el-icon-edit"></i>
									</el-button>
									<el-button type="danger" plain size="mini">
										<i class="el-icon-delete"></i>
									</el-button>
								</div>
							</el-col>
						</el-row>
					</el-card>
				</div>
			</div>

		</div>
	</div>
</template>

<style scoped="">
	.bucketlist-card {
		margin-top: 12px;
		cursor: pointer;
	}

	.bucketlist-card .buckelist-name {
		font-size: 17px;
		font-weight: bold;
	}
	.bucketlist-card .buckelist-date {
		margin-top: 4px;
		color: #707070;
		font-size: 12px;
	}


	.bucketlist-item-card {
		margin-top: 12px;
	}

	.bucketlist-item-card.done {
		border-left: 3px solid #00cc88;
	}


	.bucketlist-item-card .buckelist-item-name {
		font-size: 17px;
	}
	.bucketlist-item-card .buckelist-item-date {
		margin-top: 4px;
		color: #707070;
		font-size: 12px;
	}

</style>

<script>

import AppLoader from '../partials/AppLoader'

export default {
	components: {
		AppLoader,
	},
	data () {
		return {
			is_fetching: true,
			bucketlist: {
				name: "Champioship finalist teams ever", date: "Today",
				items: []
			}
		}
	},
	mounted: function () {
		this.fetchBucketlist()
	},
	methods: {

		fetchBucketlist: function () {

			// console.log(axios.interceptors.response);

			// axios.get(this.$api.url('bucketlists'), this.resolvedBankAccount)
            //     .then(response => {
			// 		console.log(response.data)
			// 	})

			// this.$snotify.success('Example body content', 'Example title', {
			//   timeout: 2000,
			//   showProgressBar: false,
			//   closeOnClick: false,
			//   pauseOnHover: true
			// });

			// console.log(`Getting this buckelist at ${this.$route.params.id}`)
			//
			// setTimeout( () => {
			// 	this.is_fetching = false
			// }, 1600);
			//
			// this.$snotify.success('Your bank account has been updated successfully.', 'Updated');

			// axios.post(this.$api.url('bank_account_create'), this.resolvedBankAccount)
            //     .then(response => {
            //         this.saving = false;
			//
            //         if (response.data.status == true) {
			//
            //             this.$snotify.success('Your bank account has been updated successfully.', 'Updated',
            //                 this.$configs.snot.response);
			//
            //             this.$router.replace({name: 'settings'});
            //         }
            //         else {
            //             this.$notify.errorNotify('Sorry!', response.data.message);
            //         }
            //     })
            //     .catch(error => {
			//
            //         this.saving = false;
			//
            //         if ( this.$error.unprocessable(this, error) ) {
            //             return;
            //         }
			//
            //         this.$snotify.error(...this.$configs.snot.generalError, this.$configs.snot.auth);
            //     });
		}
	}
}
</script>
