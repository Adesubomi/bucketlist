<template>
	<div class="">
		<div class="app-header-2">
			<el-row type="flex">
				<el-col :span="20">
					<h3>My bucketlists</h3>
				</el-col>
				<el-col :span="4">
					<el-button size="small" icon="el-icon-plus" circle></el-button>
				</el-col>
			</el-row>
		</div>

		<app-loader v-if="is_fetching">..Loading</app-loader>
		<div class="" v-for="item in bucketlists" v-if="!is_fetching">
			<el-card class="bucketlist-card" shadow="hover" @click.native="openBucketlist(1)">
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

<style>
	.bucketlist-card {
		margin-top: 12px;
		cursor: pointer;
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
	data () {
		return {
			is_fetching: true,
			bucketlists: [
				{name: "Champioship finalist teams ever", date: "Today"},
				{name: "List of all players in Manchester Utd.", date: "Yesterday"},
				{name: "All Chealsea wins since 2005", date: "Yesterday"},
			]
		}
	},

	methods: {
		openBucketlist: function (id) {
			this.$router.push({name: 'buckelists.show', params:{id: 1}});
		}
	}
}
</script>
