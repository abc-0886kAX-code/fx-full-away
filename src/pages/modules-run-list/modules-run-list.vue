<!--
 * @FilePath: \3D防汛作战\src\pages\modules-run-list\modules-run-list.vue
 * @Author: zhangyang
 * @Date: 2022-06-29 10:19:47
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-05 11:11:46
 * @Description: 
-->
<template>
    <!-- 模拟列表查询 -->
    <mg-table
        class="modules-body modules-run-list"
        v-loading="tableLoading"
        v-bind="loadStyle"
        :defaultPageSize="100"
        :controller="tableRowContaoller"
        :tableSchema="tableSchema"
        :tableData="tableData"
        @handleRow="handlerRowAccess"
    >
    </mg-table>
</template>

<script>
import { onMounted, computed, unref } from "@vue/composition-api";
import { loadStyle } from "@/biz/share/entify/Load";
import { useTableData, useTableHandleRow } from "@/biz/Table";

import { icmQuerySimulationList } from "@/api/icm/run.api";
import TableColumnConfig from "./config/table.column";
import TableRowControllerConfig from "./config/row.controller";

export default {
    name: "modules-run-list",
    mixins: [],
    components: {},
    props: {},
    setup() {
        const {
            table,
            setupLoading,
            setupTableColumn,
            setupTableData,
            setupUiSchema,
            setupRowController,
        } = useTableData("modules-query-network");
        const { handlerRowAccess } = useTableHandleRow(
            TableRowControllerConfig
        );
        const tableSchema = computed(() => ({
            uiSchema: unref(unref(table).uiSchema),
            columnSchema: unref(unref(table).column),
        }));
        const tableRowContaoller = computed(() =>
            unref(unref(table).controller)
        );
        const tableData = computed(() => unref(unref(table).data));
        const tableLoading = computed(() => unref(unref(table).loading));
        setupTableColumn(TableColumnConfig);
        setupRowController(TableRowControllerConfig);
        setupUiSchema({
            isPage: false,
            isIndex: true,
            stripe: true,
            handleFixed: "right",
        });

        const executeQuery = async () => {
            setupLoading();
            const data = await setupTableData(icmQuerySimulationList());
            return { data };
        };

        onMounted(async () => {
            executeQuery();
        });

        return {
            table,
            tableSchema,
            tableRowContaoller,
            tableData,
            tableLoading,
            loadStyle,
            handlerRowAccess,
        };
    },
};
</script>
<style lang='scss' scoped>
@import "~@/assets/style/modules-body.scss";
@import "./modules-run-list.scss";
@import "~@/assets/style/home-table.scss";
</style>
