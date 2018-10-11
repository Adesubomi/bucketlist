<template>
	<div class="">
		<div class="app-header-2">
			<el-row type="flex">
				<el-col :span="20">
					<h3>My bucketlists</h3>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" v-if="!is_loading" @click="create_item_is_open = true" size="small" icon="el-icon-plus" circle></el-button>
				</el-col>
			</el-row>
		</div>

		<transition name="el-zoom-in-top">
			<el-card class="bucketlist-card" v-if="create_item_is_open && !is_loading" v-loading="adding_bucketlist">
				<h5 style="margin: 0; padding-bottom: 18px;">
					Create a buckelist
					<i class="el-icon-close close-icon pull-right c-pointer" @click="create_item_is_open = false"></i>
				</h5>

				<el-row :gutter="10">
					<el-col :span="18">
						<el-input placeholder="Name of Bucketlist" v-model="new_bucketlist.name"></el-input>
					</el-col>
					<el-col :span="6">
						<el-button type="primary" @click="createBucketlist()">
							<i class="el-icon-upload el-icon-right"></i> &nbsp;
							Save
						</el-button>
					</el-col>
				</el-row>
			</el-card>
		</transition>

		<app-loader v-if="is_loading">..Loading</app-loader>

		<div class="bucketlist-card c-pointer" v-for="item in bucketlists" v-if="!is_loading">
			<el-card class="c-pointer" shadow="hover" @click.native="openBucketlist(item.id)">
				<el-row type="flex">
					<el-col :span="2">
						<div style="margin-top: 3px; text-align: center;">
							<i class="ti-package"></i>
						</div>
					</el-col>
					<el-col :span="21">
						<div class="buckelist-name">{{item.name}}</div>
						<div class="buckelist-date">{{item.date}}</div>
					</el-col>
				</el-row>
			</el-card>
		</div>
	</div>
</template>

<style scoped="">
	.bucketlist-card {
		margin-top: 12px;
	}

	.bucketlist-card .buckelist-name {
		font-size: 17px;
	}
	.bucketlist-card .buckelist-date {
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
	mounted: function () {
		this.fetchBucketlists()
	},
	data () {
		return {
			is_loading: true,
			create_item_is_open: false,
			new_bucketlist: {
				name: ''
			},
			adding_bucketlist: false,
			bucketlists: [
				{name: "Champioship finalist teams ever", date: "Today"},
				{name: "List of all players in Manchester Utd.", date: "Yesterday"},
				{name: "All Chealsea wins since 2005", date: "Yesterday"},
			]
		}
	},

	methods: {


		sanitize_ui: function () {
			this.create_item_is_open = false
			this.is_loading = false
			this.adding_bucketlist = false

			this.new_bucketlist.name = ''
		},

		openBucketlist: function (id) {
			this.$router.push({name: 'buckelists.show', params:{id: id}})
		},

		fetchBucketlists: function () {

			this.is_loading = true;

			axios.get(this.$api.url('bucketlists'))
				.then(response => {
					this.is_loading = false;

					if (response.data.status && response.data.status == 'success') {

						this.bucketlists = response.data.payload;
					}
					else {

						this.$snotify.error('Unable to get buckelists',
							'Sorry');
					}
				})
				.catch( err => {

					this.is_loading = false;
					this.$snotify.error('Opertion failed. Try again later',
						'Ooops!')
				})
		},

		createBucketlist: function () {

			this.adding_bucketlist = true

			axios.post(this.$api.url('bucketlists'), this.new_bucketlist)

				.then(response => {

					this.adding_bucketlist = false

					if (response.data.status == 'success') {

						this.$snotify.success('Bucketlist has been created successfully', 'Great')
						this.sanitize_ui()
						this.fetchBucketlists()
					}
					else {
						this.$snotify.error('Unable to create bucketlist', 'Sorry!')
					}
				})
				.catch(error => {

					this.adding_bucketlist = false
					this.sanitize_ui()

					this.$snotify.error('Unable to create bucketlist', 'Ooops!')
				});
		}
	}
}
</script>
