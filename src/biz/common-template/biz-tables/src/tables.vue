<!--
 * @Author: zhangyang
 * @Date: 2021-06-10 11:14:10
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-11 14:19:13
 * @Description: file content
-->
<template>
    <mg-table class="biz-controller-tables" ref="tables" rowPower="poweredit" :key="tableKey"
        :parentHeight="parentHeight" :tableSchema="tableSchema" :tableData="tableData" :total="tableTotal"
        :controller="rowController" :resetCurrentPage="resetPage" @tableHandle="tableHandle"
        @handleRow="tableController" @onChoice="onChoice" @cellEvent="cellEvent"></mg-table>
</template>

<script>
import { setHandler } from "@/biz/common-template/utils";

export default {
    name: "biz-controller-tables",
    mixins: [],
    components: {},
    props: {
        schema: {
            type: Array,
            default: () => [],
        },
        tableKey: {
            type: [String, Number],
            default: Date.now(),
        },
        table: {
            type: Object,
            default: () => ({
                total: 0,
                data: [],
            }),
        },
        tableRequest: {
            type: Object,
            default: () => ({
                prop: "",
                order: "",
                current: 1,
                size: 10,
            }),
        },
        handleEvent: {
            type: Array,
            default: () => [],
        },
        baseEvent: {
            type: Object,
            default: () => ({}),
        },
        parentHeight: {
            type: Number,
            default: 0,
        },
        resetPage: [String, Number],
        hasPage: {
            type: Boolean,
            default: true,
        },
        hasChoice: {
            type: Boolean,
            default: true,
        },
        tableSize: {
            type: String,
            default: "medium"
        }
    },
    data() {
        //这里存放数据
        return {};
    },
    //监听属性 类似于data概念
    computed: {
        tableSchema() {
            const { prop } = this.tableRequest;

            return {
                uiSchema: {
                    size: this.tableSize,
                    isChoice: this.hasChoice,
                    isIndex: true,
                    isPage: this.hasPage,
                    stripe: true,
                    sortProp: prop,
                    handleFixed: "right"
                },
                columnSchema: this.schema,
            };
        },
        tableData() {
            const { data } = this.table;

            return data;
        },
        tableTotal() {
            const { total } = this.table;

            return total;
        },
        rowController() {
            return setHandler(this.handleEvent, this.baseEvent);
        },
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        tableHandle(handler) {
            for (const key in handler) {
                handler[key] === "" && delete handler[key];
            }

            this.$emit("toPage", Object.assign({}, this.tableRequest, handler));
        },
        tableController(handle) {
            this.$emit("tableEvent", handle);
        },
        onChoice(choice) {
            this.$emit("choiceChange", choice);
        },
        cellEvent(cell) {
            this.$emit("rowEvent", cell);
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() { },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    beforeCreate() { }, //生命周期 - 创建之前
    beforeMount() { }, //生命周期 - 挂载之前
    beforeUpdate() { }, //生命周期 - 更新之前
    updated() { }, //生命周期 - 更新之后
    beforeDestroy() { }, //生命周期 - 销毁之前
    destroyed() { }, //生命周期 - 销毁完成
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
@import "~@/assets/style/biz-tables.scss";
</style>
