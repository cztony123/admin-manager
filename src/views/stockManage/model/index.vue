<template>
    <el-dialog :title="title" :visible.sync="centerDialogVisible" width="500px" center :before-close="handleClose" :close-on-press-escape="false" :close-on-click-modal="false">
        <el-form :model="form" :rules="rules" ref="form" :inline="true" label-width="90px">
            <el-form-item label="茶品名称" prop="teaName">
                <el-input v-model="form.teaName" size="small" clearable placeholder="请输入茶品名称"></el-input>
            </el-form-item>
            <el-form-item label="单位" prop="unit">
                <el-select v-model="form.unit" placeholder="请选择">
                    <el-option v-for="item in unitList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="等级" prop="level">
                <el-select v-model="form.level" placeholder="请选择">
                    <el-option v-for="item in levelList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="库存数量" prop="reality">
                <el-input v-model="form.reality" size="small" clearable placeholder="请输入茶品名称"></el-input>
            </el-form-item>
            <el-form-item label="总成本" prop="totalCost">
                <el-input v-model="form.totalCost" size="small" clearable placeholder="请输入茶品名称"></el-input>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="handleCancel">取 消</el-button>
            <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { getStockAdd, getStockEdit } from '@/api/stockManageApi'
export default {
    data() {
        return {
            centerDialogVisible: false,
            title:'',
            form: {
                id: '',
                teaName: '',
                unit: '',
                level: '',
                reality: '',
                totalCost: ''
            },
            unitList:[
                { id: 1, name: 'kg' },
                { id: 2, name: 'g' },
                { id: 3, name: 't' },
            ],
            levelList:[
                { id: 1, name: 'A' },
                { id: 2, name: 'B' },
                { id: 3, name: 'C' },
                { id: 4, name: 'D' },
            ],
            rules: {
                teaName: [{ required: true, message: "请输入茶品名称", trigger: "blur" }],
                unit: [{ required: true, message: "请选择单位", trigger: "blur" }],
                level: [{ required: true, message: "请选择等级", trigger: "blur" }],
                reality: [{ required: true, message: "请输库存数量", trigger: "blur" }],
                totalCost: [{ required: true, message: "请输入总成本", trigger: "blur" }],
            }
        }
    },
    methods: {
        //打开弹窗
        open(row){
            this.centerDialogVisible = true
            this.title = row ? '编辑' : '新增'
            if(row){
                this.form.id = row.id
                this.form.teaName = row.teaName
                this.form.unit = this.handeleData(row.unit, 'unit')
                this.form.level = this.handeleData(row.level, 'level')
                this.form.reality = row.reality
                this.form.totalCost = row.totalCost
            }
        },

        //处理单位和等级
        handeleData(val, lable) {
            let isData = lable == 'unit' ? this.unitList : this.levelList
            let obj = isData.find(item => item.id == val)
            return obj.name
        },

        //点击确认按钮
        handleSubmit(){
            this.$refs.form.validate(valid => {
                if (valid) {
                    if(this.title == '新增'){
                        getStockAdd(this.form).then(res =>{
                            if(res.code == 200){
                                this.$emit('success')
                                this.$message.success(res.message)
                                this.form = {}
                                this.centerDialogVisible = false
                            }else{
                                this.$message.error(res.message)
                            }
                        })
                    }else{
                        getStockEdit(this.form).then(res =>{
                            if(res.code == 200){
                                this.$emit('success')
                                this.$message.success(res.message)
                                this.centerDialogVisible = false
                            }
                        })
                    }
                }
            })
        },

        //点击取消按钮
        handleCancel(){
            this.form = {}
            this.centerDialogVisible = false
        },

        //点击叉
        handleClose(){
            this.form = {}
            this.centerDialogVisible = false
        }
    }
}
</script>

<style scoped lang="scss">
::v-deep .el-form-item{
    width: 100%;
}
::v-deep .el-form-item__content{
    width: 75%;
}
.el-select{
    width: 100%;
}
</style>