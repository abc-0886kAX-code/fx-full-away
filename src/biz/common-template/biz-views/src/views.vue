<!--
 * @Author: zhangyang
 * @Date: 2021-06-10 11:14:30
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-06-15 13:55:21
 * @Description: file content
-->
<template>
    <div class="biz-controller-views">
        <el-row class="biz-view-text-main" :gutter="20">
            <el-col
                v-for="cell in textSchema"
                :key="cell.field"
                :span="setSpan(cell)"
            >
                <biz-view-item
                    :scope="cell"
                    :labelWidth="labelWidth"
                ></biz-view-item>
            </el-col>
        </el-row>

        <el-collapse
            v-if="useList"
            class="biz-view-list-main"
            v-model="activeName"
            accordion
        >
            <biz-view-list
                v-for="cell in listSchema"
                :key="cell.field"
                :scope="cell"
            ></biz-view-list>
        </el-collapse>
    </div>
</template>

<script>
import BizViewItem from "./view-item";
import BizViewList from "./view-list";

import { isArray, isNil } from "lodash";

export default {
    name: "biz-controller-views",
    mixins: [],
    components: { BizViewItem, BizViewList },
    props: {
        span: {
            type: Number,
            default: () => 6,
        },
        viewSchema: {
            type: Array,
            default: () => [],
        },
        labelWidth: {
            type: [Number, String],
            default: () => 120,
        },
    },
    data() {
        //这里存放数据
        return {
            activeName: "",
        };
    },
    //监听属性 类似于data概念
    computed: {
        textSchema() {
            return this.viewSchema.filter((item) => !isArray(item.value));
        },
        listSchema() {
            return this.viewSchema.filter((item) => isArray(item.value));
        },
        useList() {
            return this.listSchema.length > 0;
        },
    },
    //监控data中的数据变化
    watch: {
        listSchema(newVal) {
            if (this.useList) {
                const { field } = newVal[0];

                this.activeName = field;
            }
        },
    },
    //方法集合
    methods: {
        setSpan(cell) {
            const { uiSchema } = cell;

            const { col } = uiSchema;

            return isNil(col) ? this.span : col;
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
.biz-controller-views {
    width: 100%;
    height: auto;
    min-height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
}
</style>