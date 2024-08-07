<template>
	<div class="login-box">
		<el-form :model="form" :rules="rules" ref="form" label-width="70px" class="login-form">
			<h2 class="login-title">vue+Echarts后台管理系统</h2>
			<el-form-item label="用户名" prop="userName">
				<el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmitLogin">登录</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { loginApi } from '@/api/loginApi'
import {mapMutations} from 'vuex'
export default {
    data() {
        return {
            form: {
                userName: "admin",
                password: '123456',
            },
            rules: {
                userName: [
                    { required: true, message: "请输入用户名", trigger: "blur" },
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { min: 5, max: 12, message: "密码长度在5到12位字符", trigger: ["blur", "change"]}
                ]
            }
        }
    },
    methods: {
        ...mapMutations(['login']),

        onSubmitLogin() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    let params = {
						...this.form
					}
					loginApi(params).then((res)=>{
						if(res.code == 200){
							this.login(res.data)
							localStorage.setItem('userInfo', JSON.stringify(res.data)); //本地 存储用户信息
							this.$router.push('/')
							this.$message.success(res.message);
						}else{
                            this.$message.error(res.message);
                        }
					})
                }
            })
        }
    }
}
</script>

<style scoped>
	/* 最外层盒子 */
	.login-box {
		position: absolute;
		width: 100%;
		height: 100%;
		background: #999;
	}

	/* form表单 */
	.login-form {
		width: 350px;
		background-color: #fff;
		padding: 15px;
		height: 250px;
		border-radius: 20px;
		position: absolute;
		margin-top: -125px;
		margin-left: -175px;
		top: 50%;
		left: 50%;
	}

	/* h2的标签样式 */
	.login-title {
		color: #333;
		text-align: center;
		margin-top: 10px;
		margin-bottom: 30px;
	}
</style>