<template>
	<div class="">
		<div class="app-header-2">
			<h3>Bucketlist details</h3>
		</div>

		<app-loader v-if="is_loading">..Loading</app-loader>

		<div class="" v-if="!is_loading">

			<div v-if="!bucketlist.name" style="margin-top: 36px;">
				<el-alert title="Hey!" type="warning" :closable="false" show-icon>
					Bucketlist was not found
				</el-alert>
			</div>

			<div v-if="bucketlist.name">
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

							<div class="" style="margin-top: 12px;">
								<el-button type="" plain size="mini">
									<i class="el-icon-plus"></i>
								</el-button>
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

				<div class="buckelist-items-list-block">
					<div class="app-header-3">
						<h4>Items in this list</h4>
					</div>

					<div class="" v-if="bucketlist.items.length == 0">
						<el-alert title="Hey!" type="info" :closable="false" show-icon>
							No items in this bucketlist
						</el-alert>
					</div>
					<div v-for="item in bucketlist.items" v-if="bucketlist.items.length > 0">
						<el-card class="bucketlist-item-card done" shadow="never">
							<el-row type="flex">
								<el-col :span="2">
									<div style="margin-top: 3px; text-align: center;">
										<i class="el-icon-document"></i>
									</div>
								</el-col>
								<el-col :span="21">
									<div class="buckelist-item-name">{{item.name}}</div>
									<div class="buckelist-item-date">{{item.created_at}}</div>
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
			bucketlist_id: this.$route.params.id,
			is_loading: true,
			bucketlist: {
				items: []
			}
		}
	},
	mounted: function () {
		this.fetchBucketlist()
	},
	watch: {
		'$route' (to, from) {
			this.bucketlist_id = this.$route.params.id
			this.fetchBucketlist()
	    }
	},
	methods: {

		fetchBucketlist: function () {

			this.is_loading = true

			axios.get(this.$api.url('get_bucketlist_full', {id: this.bucketlist_id}))
                .then(response => {

					this.is_loading = false

                    if (response.data.status == 'success') {
						this.bucketlist = response.data.payload;
                    }
                    else {
                        // this.$snotify.error(response.data.message, 'Sorry!');
                    }
                })
                .catch(error => {

					console.log(error);
					this.is_loading = false
                    this.$snotify.error('Unable to get bucketlist full details', 'Ooops!');
                });
		}
	}
}
</script>
