<template>
    <div class="stock-page">
        <el-form :inline="true">
            <el-form-item label="茶品名称">
                <el-input v-model="form.teaName" size="small" clearable placeholder="请输入茶品名称"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" size="small" @click="handleQuery">查询</el-button>
                <el-button size="small" @click="resetQuery">重置</el-button>
                <el-button type="primary" size="small" @click="handleAdd">新增</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="dataList" style="width: 100%">
            <el-table-column label="茶品名称" prop="teaName" align="center" />
            <el-table-column label="单位" prop="unit" align="center">
                <template slot-scope="{ row }">
                    {{ handeleData(row.unit, 'unit') }}
                </template>
            </el-table-column>
            <el-table-column label="等级" prop="level" align="center">
                <template slot-scope="{ row }">
                    {{ handeleData(row.level, 'level') }}级
                </template>
            </el-table-column>
            <el-table-column label="库存" prop="reality" align="center">
                <template slot-scope="{ row }">
                    {{ row.reality }}{{ handeleData(row.unit, 'unit') }}
                </template>
            </el-table-column>
            <el-table-column label="平均成本" prop="userId" align="center">
                <template slot-scope="{ row }">
                    ${{ (row.totalCost / row.reality).toFixed(2) }}
                </template>
            </el-table-column>
            <el-table-column label="总成本" prop="totalCost" align="center">
                <template slot-scope="{ row }">
                    ${{ row.totalCost }}
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="150">
                <template slot-scope="{ row }">
                    <el-button size="small" type="text" @click="handleEdit(row)">编辑</el-button>
                    <el-button size="small" type="text" @click="handleDel(row)"> 删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination v-if="total > 0" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.pageNum" :page-sizes="[10, 20, 30, 500]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total" />

        <stockDialog ref="isDialog" @success="handleQuery" />
    </div>
</template>

<script>
import { getStockData, getStockDel } from '@/api/stockManageApi'
import stockDialog from "./model/index.vue";
export default {
    components: {
        stockDialog
    },
    data() {
        return {
            form: {
                teaName: ''
            },
            page: {
                pageNum: 1,
                pageSize: 10
            },
            total: 0,
            dataList: [],
            unitList: [
                { id: 1, name: 'kg' },
                { id: 2, name: 'g' },
                { id: 3, name: 't' },
            ],
            levelList: [
                { id: 1, name: 'A' },
                { id: 2, name: 'B' },
                { id: 3, name: 'C' },
                { id: 4, name: 'D' },
            ]
        }
    },

    created() {
        this.handleQuery()
    },

    methods: {
        //处理单位和等级
        handeleData(val, lable) {
            let isData = lable == 'unit' ? this.unitList : this.levelList
            let obj = isData.find(item => item.id == val)
            return obj.name
        },

        //查询按钮
        handleQuery() {
            getStockData(this.form).then(res => {
                if (res.code == 200) {
                    this.dataList = res.data
                    this.total = res.total
                }
            })
        },

        //重置按钮
        resetQuery() {
            this.form = {}
        },

        //新增按钮
        handleAdd() {
            this.$refs.isDialog.open()
        },

        //编辑按钮
        handleEdit(row) {
            this.$refs.isDialog.open(row)
        },

        //删除按钮
        handleDel(row) {
            this.$confirm(`确认删除 ${row.teaName} 吗？`, '删除提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                getStockDel({ id: row.id }).then(res => {
                    if(res.code == 200){
                        this.handleQuery()
                        this.$message.success(res.message)
                    }
                })
            }).catch(() => {});
        },

        //选择每页多少条按钮
        handleSizeChange(val) {
            this.page.pageSize = val
            this.handleQuery()
        },

        //第几页按钮
        handleCurrentChange(val) {
            this.page.pageNum = val
            this.handleQuery()
        },
    }
}
</script>

<style scoped lang="scss">
::v-deep .el-table .el-table__cell {
    padding: 8px 0;
}
.el-pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
}
</style>