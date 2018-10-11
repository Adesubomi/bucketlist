<template>
	<div class="">
		<div class="app-header-2">
			<h3>My Dashboard</h3>
		</div>

		<div class="" style="margin-top: 32px;">
			<el-row :gutter="20">
				<el-col :span="12">
					<el-row>
						<el-col :span="6">
							<div class="summary-icon">
								<i class="ti-package"></i>
							</div>
						</el-col>
						<el-col :span="18">
							<div class="summary-count" v-text="count.bucketlists"></div>
							<div class="summary-title">
								Bucketlists
							</div>
						</el-col>
					</el-row>
				</el-col>


				<el-col :span="12">
					<el-row>
						<el-col :span="6">
							<div class="summary-icon">
								<i class="el-icon-document"></i>
							</div>
						</el-col>
						<el-col :span="18">
							<div class="summary-count" v-text="count.items"></div>
							<div class="summary-title">
								Bucketlist Items
							</div>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script type="text/javascript">

export default {
	data () {
		return {
			count: {
				bucketlists: 'xxx',
				items: 'xxxx',
			}
		}
	},
	mounted: function () {
		this.getStats()
	},
	methods: {

		getStats: function() {

		}
	}
}
</script>

<style scoped>
	.summary-icon {
		font-size: 3em;
		color: #a0c0f0;
		margin-top: 20px;
	}

	.summary-count {
		font-size: 2.0em;
		margin-top: 12px;
	}

	.summary-title {
		color: #707070;
	}
</style>
