<template>
    <div class="order-page">
        <el-form :inline="true">
            <el-form-item>
                <date-range-shortcut v-model="dateRange"></date-range-shortcut>
            </el-form-item>
            <el-form-item label="选择时间">
                <el-date-picker v-model="dateRange" size="small" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="订单号">
                <el-input v-model="form.orderNum" size="small" clearable placeholder="请输入订单号"></el-input>
            </el-form-item>
            <el-form-item label="会员ID">
                <el-input v-model="form.userId" size="small" clearable placeholder="请输入会员ID"></el-input>
            </el-form-item>
            <el-form-item label="充值类型" size="small">
                <el-select v-model="form.depositType" placeholder="请选择">
                    <el-option v-for="item in orderList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" size="small" @click="handleQuery">查询</el-button>
                <el-button size="small" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="dataList" style="width: 100%">
            <el-table-column prop="userId" label="会员ID" align="center" />
            <el-table-column prop="orderNum" label="订单号" align="center" />
            <el-table-column prop="userName" label="会员昵称" align="center" />
            <el-table-column label="充值类型" align="center">
                <template slot-scope="scope">
                    {{ handelDepositType(scope.row.depositType) }}
                </template>
            </el-table-column> 
            <el-table-column prop="depositAmount" label="充值金额" align="center" />
            <el-table-column prop="dateTime" label="充值时间" align="center" />
            <el-table-column label="操作" align="center" width="150">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            v-if="total > 0"
            @size-change="handleSizeChange" 
            @current-change="handleCurrentChange" 
            :current-page="page.pageNum" 
            :page-sizes="[10, 20, 30, 500]" 
            :page-size="10" 
            layout="total, sizes, prev, pager, next, jumper" 
            :total="total"
        />
    </div>
</template>

<script>
import { getOrderList, getOrderData } from '@/api/financeManageApi'
import DateRangeShortcut from '../../components/DateRangeShortcut/index.vue'
import moment from "moment";
export default {
    components: {
        DateRangeShortcut
    },
    data() {
        return {
            dateRange: [],
            form: {
                orderNum: '',
                userId: '',
                depositType: '',
                startTime: null,
                endTime: null,
            },
            page: {
                pageNum: 1,
                pageSize: 10
            },
            orderList: [],
            dataList: [],
            total: 0
        }
    },

    created() {
        this.handelSelect()
        this.handleQuery()
    },

    methods: {
        //充值类型下拉列表
        handelSelect() {
            getOrderList().then(res => {
                if (res.code == 200) {
                    this.orderList = res.data
                }
            })
        },

        //处理充值类型
        handelDepositType(val){
            let obj = this.orderList.find(item => item.id == val)
            return obj.name
        },

        //查询按钮
        handleQuery() {
            let params = {
                ...this.form,
                ...this.page
            }
            params.startTime = moment(this.dateRange[0]).startOf("day").format('YYYY-MM-DD HH:mm:ss')
            params.endTime = moment(this.dateRange[1]).endOf("day").format('YYYY-MM-DD HH:mm:ss')

            getOrderData(params).then(res => {
                if (res.code == 200) {
                    this.dataList = res.data
                    this.total = res.total
                }
            })
        },

        //重置按钮
        resetQuery() {
            this.form = {}
            this.dateRange = []
        },

        handleClick() {

        },

        handleSizeChange(val) {
            this.page.pageSize = val
            this.handleQuery() 
        },
        handleCurrentChange(val) {
            this.page.pageNum = val
            this.handleQuery() 
        }
    }
}
</script>

<style scoped lang="scss">
::v-deep .el-table .el-table__cell{
    padding: 8px 0
}
.el-pagination{
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
}
</style>