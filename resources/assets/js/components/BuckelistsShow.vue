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
								<el-button type="" plain size="mini" @click="create_item_is_open = true">
									<i class="el-icon-plus"></i>
								</el-button>
								<el-button type="primary" plain size="mini">
									<i class="el-icon-edit"></i>
								</el-button>
								<el-button type="danger" plain size="mini" @click.native="confirmDeleteBucketlist(bucketlist.id)">
									<i class="el-icon-delete"></i>
								</el-button>
							</div>

						</el-col>
					</el-row>
				</el-card>

				<transition name="el-zoom-in-top">
					<el-card class="bucketlist-card" v-show="create_item_is_open" v-loading="adding_item">
						<h5 style="margin: 0; padding-bottom: 18px;">
							Add Item to bucketlist
							<i class="el-icon-close close-icon pull-right" @click="create_item_is_open = false"></i>
						</h5>

						<el-row :gutter="10">
							<el-col :span="18">
								<el-input placeholder="Name of item" v-model="new_item.name"></el-input>
							</el-col>
							<el-col :span="6">
								<el-button type="primary" @click="addItemToBucketlist()">
									<i class="el-icon-upload el-icon-right"></i> &nbsp;
									Save
								</el-button>
							</el-col>
						</el-row>
					</el-card>
				</transition>

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
									<!-- <div class="" style="margin-top: 12px;">
										<el-button type="primary" plain size="mini">
											<i class="el-icon-edit"></i>
										</el-button>
										<el-button type="danger" plain size="mini">
											<i class="el-icon-delete"></i>
										</el-button>
									</div> -->
								</el-col>
							</el-row>
						</el-card>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

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
			create_item_is_open: false,
			edit_bucketlist_is_open: false,
			adding_item: false,
			bucketlist: {
				items: []
			},
			new_item: {
				name: ''
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

		sanitize_ui: function () {
			this.create_item_is_open = false
			this.edit_bucketlist_is_open = false
			this.is_loading = false
			this.adding_item = false

			this.new_item.name = ''
		},

		fetchBucketlist: function () {

			this.is_loading = true

			axios.get(this.$api.url('get_bucketlist_full', {id: this.bucketlist_id}))
                .then(response => {

					this.is_loading = false

                    if (response.data.status == 'success') {
						this.bucketlist = response.data.payload;
                    }
                })
                .catch(error => {

					this.is_loading = false
                    this.$snotify.error('Unable to get bucketlist full details', 'Ooops!');
                });
		},

		addItemToBucketlist: function () {

			this.adding_item = true

			axios.post(this.$api.url('bucketlists_items', {bucketlist_id: this.bucketlist_id}), this.new_item)

				.then(response => {

					this.adding_item = false

					if (response.data.status == 'success') {

						this.$snotify.success('Item has been added to bucketlist', 'Great')
						this.sanitize_ui()
						this.fetchBucketlist()
					}
					else {
						this.$snotify.error('Unable to add this item', 'Sorry!')
					}
				})
				.catch(error => {

					this.adding_item = false
					this.sanitize_ui()

					this.$snotify.error('Unable to add item', 'Ooops!')
				});
		},

		confirmDeleteBucketlist: function (id) {

			this.$swal({
				title: 'Delete bucketlist?',
				text: "Are you sure you want to delete this bucketlist? This action is not reversible.",
				type: 'warning',
				showCancelButton: true,
			})
			.then((result) => {
				if (result.value) {
					this.deleteBucketlist(id)
				}
			})
		},

		deleteBucketlist: function (id) {

			this.$swal({
				title: 'Deleting...',
		  		text: '',
				allowOutsideClick: false,
				allowEscapeKey: false,
		  		onOpen: () => {
		    		this.$swal.showLoading()

					axios.delete(this.$api.url('get_bucketlist', {id: id}))
		                .then(response => {

							this.$swal.close()
		                    if (response.data.status == 'success') {
								this.$snotify.success('Bucketlist has been deleted successfully', 'Great')
								this.$router.push({name: 'bucketlists.index'})
		                    }
							else {
								this.$snotify.error('Could not delete bucketlist', 'Sorry!')
							}
		                })
		                .catch(error => {
							this.$swal.close()
		                    this.$snotify.error('Unable to delete this bucketlist', 'Ooops!')
		                });
		  		},
			})
		}

	}
}
</script>

<style scoped="">
	.bucketlist-card {
		margin-top: 12px;
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
