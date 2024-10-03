<template>
    <div class="home-page">
        <div v-if="isShow">
            <el-form :inline="true">
                <el-form-item>
                    <date-range-shortcut v-model="dateRange"></date-range-shortcut>
                </el-form-item>
                    <el-form-item label="选择时间">
                        <el-date-picker v-model="dateRange" size="small" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                
                <el-form-item>
                    <el-button type="primary" size="small" @click="handleQuery">查询</el-button>
                    <el-button size="small" @click="resetQuery">重置</el-button>
                </el-form-item>
            </el-form>


            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>茶品库存概况</span>
                </div>
                <div class="content">
                    <div v-for="(item, index) in stock" :key="index" class="text item">
                        <span>{{ item.surplusNum}}</span>
                        <span>{{ item.title}}</span>
                    </div>
                </div>
            </el-card>

            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>资金详情概况</span>
                </div>
                <div class="content">
                    <div v-for="(item, index) in funds" :key="index" class="text item">
                        <span>{{ item.moneyNum}}</span>
                        <span>{{ item.title}}</span>
                    </div>
                </div>
            </el-card>

            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>用户情况概况</span>
                </div>
                <div class="content">
                    <div v-for="(item, index) in userstate" :key="index" class="text item">
                        <span>{{ item.isNum}}</span>
                        <span>{{ item.title}}</span>
                    </div>
                </div>
            </el-card>
        </div>



        <div class="in-index" v-else>
            <div>您 已 进 入 管 理 后 台</div>
            <div>You have entered the managements</div>
        </div>
    </div>
</template>

<script>
import { getHomeData } from '@/api/homeApi'
import DateRangeShortcut from '../../components/DateRangeShortcut/index.vue'
import moment from "moment";
export default {
    components: {
        DateRangeShortcut
    },
    data() {
        return {
            isShow: false,
            dateRange: [],
            stock: [], //库存
            funds: [], //资金
            userstate: [], //用户
        };
    },

    created(){
        this.handleQuery()
    },

    methods: {
        //查询按钮
        handleQuery(){
            let params = {
                startTime: moment(this.dateRange[0]).startOf("day").format('YYYY-MM-DD HH:mm:ss'),
                endTime: moment(this.dateRange[1]).endOf("day").format('YYYY-MM-DD HH:mm:ss')
            }

            //请求接口
            getHomeData(params).then(res =>{
                
                if(res.code == 200){
                    this.stock = res.data.stock
                    this.funds = res.data.funds
                    this.userstate = res.data.userstate
                    this.isShow = true
                }
            })
        },

        //重置按钮
        resetQuery(){
            this.dateRange = []
        }
    }
};
</script>

<style scoped lang="scss">
    .box-card{
        margin-bottom: 30px;
        .content{
            display: flex;
            justify-content: space-around;
            padding: 12px 0;
            text-align: center;
            .text{
                display: flex;
                flex-direction: column;
                span{
                    padding: 6px 0;
                }
            }
        }
    }

    .in-index{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        color: #636363;
        font-size: 45px;
        div:nth-of-type(2){
            font-size: 27px;
        }
    }
</style>