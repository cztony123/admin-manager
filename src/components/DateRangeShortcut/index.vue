<template>
    <div class="flex">
        <div v-for="o in shortcuts" :key="o.name" style="margin-right: 5px">
            <el-button :type="o.name === activeName ? 'warning' : 'primary'" size="mini" @click="handleClick(o)" v-if="o.ishow">
                {{ o.name }}
            </el-button>
        </div>
    </div>
</template>

<script>
import moment from "moment";
export default {
    props: {
        shortcuts: {
            type: Array,
            default: () => [
                {
                    name: "今日",
                    ishow: true,
                    // range: [() => moment().startOf('day'), () => moment()],
                    range: [
                        () => moment().subtract(0, "day").startOf("day"),
                        () => moment().subtract(0, "day").endOf("day"),
                    ],
                },
                {
                    name: "昨日",
                    ishow: true,
                    range: [
                        () => moment().subtract(1, "day").startOf("day"),
                        () => moment().subtract(1, "day").endOf("day"),
                    ],
                },
                {
                    name: "本周",
                    ishow: true,
                    // range: [() => moment().startOf('isoWeek'), () => moment()],
                    range: [
                        () => moment().startOf("isoWeek"),
                        () => moment().endOf("isoWeek"),
                    ],
                },
                {
                    name: "本月",
                    ishow: true,
                    // range: [() => moment().startOf('month'), () => moment()],
                    range: [
                        () => moment().startOf("month"),
                        () => moment().endOf("month"),
                    ],
                },
                {
                    name: "30天",
                    ishow: true,
                    range: [() => moment().subtract(30, "day"), () => moment()],
                },
                {
                    name: "上月",
                    ishow: true,
                    range: [
                        () => moment().subtract(1, "months").startOf("month"),
                        () => moment().subtract(1, "months").endOf("month"),
                    ],
                },
                {
                    name: "60天",
                    ishow: false, //60天默认不显示，为"金币记录"新增需求。
                    range: [
                        () => moment().subtract(60, "day").startOf("day"),
                        () => moment().endOf("day"),
                    ],
                },
            ],
        },
        value: "",
        formatter: {
            type: String,
            default: "YYYY-MM-DD HH:mm:ss",
        },
        isShowDefault: {
            type: Boolean,
            default: true,
        },
        showOtherDate: {
            type: String,
            default: "",
        },
    },
    watch: {
        // 是否展示其他时间
        showOtherDate: {
            handler(newVal, oldVal) {
                if (newVal) {
                    this.shortcuts.forEach((item) => {
                        if (item.name === newVal) {
                            item.ishow = true;
                        }
                    });
                }
            },
            deep: true,
            immediate: true,
        },
        // 通过isShowDefault设置是否显示默认高亮兼容之前的模式
        isShowDefault: {
            handler(newVal, oldVal) {
                if (newVal) {
                    this.activeName = this.shortcuts[0].name;
                } else {
                    this.setActive("");
                }
            },
            deep: true,
            immediate: true,
        },
    },
    data() {
        return {
            // activeName: this.defaultActive || this.shortcuts[0].name
            activeName: this.defaultActive,
        };
    },
    created() {
        if (this.activeName) {
            const item = this.shortcuts.find(
                (item) => item.name === this.activeName
            );
            if (item) {
                this.updateModalValue(item.range[0](), item.range[1]());
            }
        }
    },
    computed: {
        activeValue: {
            set(val) {
                this.$emit("input", val);
            },
            get() {
                return this.value;
            },
        },
    },
    methods: {
        updateModalValue(start, end) {
            if (this.activeName == "30天") {
                this.activeValue = [
                    start.format(this.formatter).substring(0, 10) + " 00:00:00",
                    end.format(this.formatter).substring(0, 10) + " 23:59:59",
                ];
            } else {
                this.activeValue = [
                    start.format(this.formatter),
                    end.format(this.formatter),
                ];
            }
        },
        handleClick(item) {
            this.activeName = item.name;
            this.updateModalValue(item.range[0](), item.range[1]());
        },
        setActive(index) {
            if (index === "") {
                this.activeName = "";
                return;
            }
            const active = this.shortcuts[index];
            this.activeName = active.name;
            this.updateModalValue(active.range[0](), active.range[1]());
        },
    },
};
</script>

<style scoped>
.flex{
    display: flex;
}
</style>
