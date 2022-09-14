<!--
 * @Author: zhangyang
 * @Date: 2022-04-21 09:44:12
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-08-15 15:12:20
 * @Description: file content
-->
<template>
    <div class="panel-table" :style="style" v-loading="tableLoading" v-bind="loadStyle">
        <YtxdTable :tableSchema="tableSchema" :tableData="tableData" @handleLink="handleLink"> </YtxdTable>
    </div>
</template>

<script>
import { useTableDataInject } from "@/biz/Table";
import { default as PanelCellMixins } from "@/mixins/panel-cell.mixins";
import { loadStyle } from "@/biz/share/entify/Load";
import { YtxdTable } from "../ytxd-table";
export default {
    name: "panel-table",
    mixins: [PanelCellMixins],
    emit: ["handleLink"],
    components: { YtxdTable },
    props: {
        id: {
            type: String,
            default: "default"
        },
        height: String,
        isLabel: {
            type: Boolean,
            default: true
        },
        icon: {
            type: String,
            default: "el-icon-s-tools"
        }
    },
    setup(props) {
        const { tableSign, tableLoading, tableColumn, tableData, rowController, tableChoice, uiSchema, setupSign } =
            useTableDataInject(props.id);

        return {
            tableSign,
            tableLoading,
            tableColumn,
            tableData,
            rowController,
            tableChoice,
            uiSchema,
            setupSign,
            loadStyle
        };
    },
    data() {
        //这里存放数据
        return {};
    },
    //监听属性 类似于data概念
    computed: {
        tableSchema() {
            return {
                uiSchema: {
                    size: "mini",
                    stripe: true,
                    indexWidth: 50,
                    ...this.uiSchema
                },
                columnSchema: this.tableColumn
            };
        },
        style() {
            if (!this.height) return {};

            return {
                height: this.height
            };
        }
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        handleLink(e) {
            this.$emit("handleLink", e);
        }
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
    activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
@import "./panel-table.scss";
@import "~@/assets/style/home-table.scss";
::v-deep .site-style {
    color: #409eff;
    cursor: pointer;
}
</style>
