<template>
    <div class="user-page">
        <!-- 左侧 -->
        <el-card class="box-card left">
            <div slot="header" class="clearfix">
                <span>个人信息</span>
            </div>
            <div class="centent two">
                <el-upload class="avatar-uploader" 
                    action="" 
                    :show-file-list="false" 
                    :http-request="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                >
                    <img v-if="user.imgUrl" :src="user.imgUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
            <div class="centent">
                <span>
                    <i class="el-icon-user"></i>
                    用户名称
                </span>
                <span>{{userInfo.userName}}</span>
            </div>
            <div class="centent">
                <span>
                    <i class="el-icon-mobile-phone"></i>
                    手机号码
                </span>
                <span>{{userInfo.tel}}</span>
            </div>
            <div class="centent">
                <span>
                    <i class="el-icon-message"></i>
                    用户邮箱
                </span>
                <span>{{userInfo.mail}}</span>
            </div>
            <div class="centent">
                <span>
                    <i class="el-icon-user-solid"></i>
                    所属角色
                </span>
                <span>{{userInfo.role}}</span>
            </div>
            <div class="centent">
                <span>
                    <i class="el-icon-date"></i>
                    创建日期
                </span>
                <span>{{userInfo.creatDate}}</span>
            </div>
        </el-card>




        <!-- 右侧 -->
        <el-card class="box-card right">
            <div slot="header" class="clearfix">
                <span>基本资料</span>
            </div>
            <div>
                <el-tabs v-model="activeName">
                    <el-tab-pane label="基本资料" name="1">
                        <el-form label-width="80px">
                            <el-form-item label="用户昵称">
                                <el-input v-model="user.userName" size="small" clearable placeholder="请输入用户昵称"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号码">
                                <el-input v-model="user.tel" size="small" clearable placeholder="请输入手机号码"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱">
                                <el-input v-model="user.mail" size="small" clearable placeholder="请输入邮箱"></el-input>
                            </el-form-item>
                            <el-form-item label="性别">
                                <el-radio v-model="user.sex" label="1">男</el-radio>
                                <el-radio v-model="user.sex" label="2">女</el-radio>
                            </el-form-item>

                            <el-form-item>
                                <el-button type="primary" size="small" @click="handleSubmit">保存</el-button>
                                <el-button type="danger" size="small" @click="handleClos">关闭</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>


                    <el-tab-pane label="修改密码" name="2">
                        <el-form label-width="80px">
                            <el-form-item label="旧密码">
                                <el-input v-model="pwd.oldPassword" size="small" clearable placeholder="请输入旧密码"></el-input>
                            </el-form-item>
                            <el-form-item label="新密码">
                                <el-input v-model="pwd.newPassword" size="small" clearable placeholder="请输入新密码"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码">
                                <el-input v-model="okpwd" size="small" clearable placeholder="请确认密码"></el-input>
                            </el-form-item>

                            <el-form-item>
                                <el-button type="primary" size="small" @click="handlePwdSubmit">保存</el-button>
                                <el-button type="danger" size="small" @click="handleClos">关闭</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-card>
    </div>
</template>

<script>
import { upload, userEdit, pwdEdit } from '../../api/userApi'
export default {
    data() {
        return {
            userInfo: {},
            activeName: '1',
            user:{
                userid: '',
                imgUrl: '',
                userName: '',
                tel: '',
                mail: '',
                sex: '2',
            },
            pwd:{
                userid: '',
                oldPassword: '',
                newPassword: '',
            },
            okpwd: ''
        }
    },

    created() {
        this.userInfo = this.$store.state.userInfo
        this.user.userid = this.$store.state.userInfo.userid
        this.pwd.userid = this.$store.state.userInfo.userid
        this.user.imgUrl = this.$store.state.userInfo.imgUrl
        this.user.userName = this.$store.state.userInfo.userName
        this.user.tel = this.$store.state.userInfo.tel
        this.user.mail = this.$store.state.userInfo.mail
        this.user.sex = this.$store.state.userInfo.sex
    },
    methods: {
        //上传头像
        handleAvatarSuccess(parame) {
            let formData = new FormData()
            formData.append('file', parame.file)
            upload(formData).then(res =>{
                if(res.code == 200){
                    this.user.imgUrl = res.data.imgUrl
                }
            })
        },

        //上传头像之前的校验
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        
        //保存基本资料按钮
        handleSubmit(){
            userEdit(this.user).then(res =>{
                if(res.code == 200){
                    localStorage.setItem('userInfo', JSON.stringify(res.data));
                    this.$message.error(res.message);
                    this.$router.go(0)
                }
            })
        },

        //保存密码按钮
        handlePwdSubmit(){
            if(this.okpwd != this.pwd.newPassword){
                this.$message.error('两次密码不一致');
                return
            }
            pwdEdit(this.pwd).then(res =>{
                if(res.code == 200){
                    localStorage.setItem('userInfo', JSON.stringify(res.data));
                    this.$message.error(res.message);
                }
            })
        },

        //关闭按钮
        handleClos(){
            this.$router.push('/home')
        },
    }
}
</script>

<style scoped lang="scss">
.user-page {
    display: flex;
    .left {
        width: 25%;
        .centent {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #d4d4d4;
            padding: 8px 0;
            font-size: 14px;
            .avatar-uploader .el-upload {
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }
            .avatar-uploader .el-upload:hover {
                border-color: #409EFF;
            }
            .avatar-uploader-icon {
                font-size: 28px;
                color: #8c939d;
                width: 120px;
                height: 120px;
                line-height: 120px;
                text-align: center;
            }
            .avatar {
                width: 120px;
                height: 120px;
                border-radius: 50%;
                display: block;
            }
            .avatar-uploader{
                width: 120px;
                height: 120px;
                border: 1px solid #000;
                border-radius: 50%;
            }
        }
        .two{
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    .right {
        width: 75%;
        margin-left: 20px;
    }
}
</style>