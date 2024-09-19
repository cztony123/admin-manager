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
            <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
            </div>
        </el-card>
    </div>
</template>

<script>
import { upload } from '../../api/userApi'
export default {
    data() {
        return {
            userInfo: {},
            user:{
                imgUrl: ''
            },
            pwd:{},
        }
    },

    created() {
        this.userInfo = this.$store.state.userInfo
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
        }
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