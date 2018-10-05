<template>
	<el-row type="flex" justify="center" class="container bordered">
		<el-col :xs="24" :sm="10" :md="8" :lg="6" :xl="4" class="bordered">
			<el-menu
				default-active="2"
				class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
				<el-submenu index="1">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>Navigator One</span>
					</template>
					<el-menu-item-group title="Group One">
						<el-menu-item index="1-1">item one</el-menu-item>
						<el-menu-item index="1-2">item one</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group title="Group Two">
						<el-menu-item index="1-3">item three</el-menu-item>
					</el-menu-item-group>
					<el-submenu index="1-4">
						<template slot="title">item four</template>
						<el-menu-item index="1-4-1">item one</el-menu-item>
					</el-submenu>
				</el-submenu>
				<el-menu-item index="2">
					<i class="el-icon-menu"></i>
					<span>Navigator Two</span>
				</el-menu-item>
				<el-menu-item index="3" disabled>
					<i class="el-icon-document"></i>
					<span>Navigator Three</span>
				</el-menu-item>
				<el-menu-item index="4">
					<i class="el-icon-setting"></i>
					<span>Navigator Four</span>
				</el-menu-item>
			</el-menu>
		</el-col>

		<el-col :xs="24" :sm="14" :md="16" :lg="18" :xl="20" class="bordered">
			<router-view></router-view>
		</el-col>
	</el-row>
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
