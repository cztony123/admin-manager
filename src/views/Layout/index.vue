<template>
	<div>
		<!-- 头部 -->
		<div class="header">
			<a href="/" style="padding-left: 30px">
				<img src="@/assets/logo.png" class="logo" />
				<span class="title">后台管理系统</span>
			</a>
			<el-dropdown>
				<span class="el-dropdown-link">
					下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item icon="el-icon-edit">修改密码</el-dropdown-item>
					<el-dropdown-item icon="el-icon-user" @click.native="loginOut">退出系统</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>

		<!-- 左侧导航 -->
		<div class="navbar">
			<el-menu default-active="1" :router="true" background-color="#545c64" text-color="#fff"
				acive-text-color="#ffd04b">
				<el-menu-item index="/home">
					<i class="el-icon-menu"></i><span slot="title">首页</span>
				</el-menu-item>
				<el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">财务管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/memberOrder">
                            <i class="el-icon-s-order"></i>
                            <span slot="title">会员订单</span>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <!-- <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-s-platform"></i
                        ><span slot="title">库存管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/kucunsearch">
                            <span slot="title">库存查询</span>
                        </el-menu-item>
                        <el-menu-item index="/rukusearch">
                            <span slot="title">入库查询</span>
                        </el-menu-item>
                        <el-menu-item index="/chukusearch">
                            <span slot="title">出库查询</span>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="/user">
                    <i class="el-icon-s-check"></i
                    ><span slot="title">用户管理</span>
                </el-menu-item> -->
			</el-menu>
		</div>

		<!-- 主区域 -->
		<div class="main">
			<el-breadcrumb separator-class="el-icon-arrow-right" v-show="$route.path !='/'">
				<el-breadcrumb-item v-show="$route.path=='/memberOrder' || $route.path== '/bookinfo'">财务管理</el-breadcrumb-item>
				<el-breadcrumb-item v-show="$route.path=='/chukusearch' || $route.path== '/kucunsearch' || $route.path== '/rukusearch'">库存管理</el-breadcrumb-item>
				<el-breadcrumb-item :to="{path: $route.path}">{{$route.meta.title}}</el-breadcrumb-item>
			</el-breadcrumb>
			<router-view />
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods:{
			loginOut(){
				this.$store.commit('loginOut')
				this.$router.push('/login')
				this.$message.success('退出成功');
			}
		}
	};
</script>



<style lang="scss" scoped>
	// 头部样式
	.header {
		position: absolute;
		line-height: 50px;
		background-color: #130505;
		left: 0;
		right: 0;
		top: 0;
		color: #fff;

		.logo {
			border-radius: 5px;
			vertical-align: middle;
			width: 25px;
		}

		.title {
			position: absolute;
			color: #fff;
			padding-left: 5px;
			font-size: 18px;
		}

		.el-dropdown-link {
			color: #fff;
			cursor: pointer;
		}

		.el-icon-arrow-down {
			font-size: 12px;
		}

		.el-dropdown {
			float: right;
			margin-right: 30px;
		}
	}


	// 菜单样式
	.navbar {
		position: absolute;
		width: 200px;
		background-color: #545c64;
		left: 0;
		right: 0;
		top: 50px;
		bottom: 0;
		color: #fff;

		.el-menu {
			border-right: none;
		}
	}


	// 主体样式
	.main {
		position: absolute;
		background-color: #fff;
		left: 200px;
		right: 0;
		top: 50px;
		bottom: 0;
		padding: 20px;
		overflow-y: auto;

		.el-breadcrumb {
			height: 10px;
			padding: 15px;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
			margin-bottom: 10px;
			border-radius: 5px;
		}

		.line {
			position: absolute;
			color: #fff;
			border-left: 3px solid #ccc;
			left: 27px;
			height: 15px;
		}
	}
</style>