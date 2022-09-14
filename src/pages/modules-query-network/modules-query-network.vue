<!--
 * @FilePath: \3D防汛作战\src\pages\modules-query-network\modules-query-network.vue
 * @Author: zhangyang
 * @Date: 2022-06-29 10:19:26
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-08 11:31:20
 * @Description: @handleRow="handleRow"
-->
<template>
    <mg-table class='modules-body modules-query-network' v-loading="tableLoading" v-bind="loadStyle"
        :defaultPageSize="100" :controller="tableRowContaoller" :tableSchema="tableSchema" :tableData="tableData"
        @handleRow="handlerRowAccess" @tableHandle="tableHandle">
    </mg-table>
</template>

<script>
import { onMounted, computed, unref } from "@vue/composition-api";
import { loadStyle } from "@/biz/share/entify/Load";
import { useTableData, useTableHandleRow } from "@/biz/Table";

import { icmQueryModuleNetwork } from "@/api/icm/query.api";
import { default as TableColumnConfig, tableRequest } from "./config/table.column";
import TableRowControllerConfig from "./config/row.controller";

export default {
    name: 'modules-query-network',
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
            setupRowController
        } = useTableData("modules-query-network");
        const { handlerRowAccess } = useTableHandleRow(TableRowControllerConfig);
        const { order, prop } = tableRequest;
        const tableSchema = computed(() => ({
            uiSchema: unref(unref(table).uiSchema),
            columnSchema: unref(unref(table).column)
        }));
        const tableRowContaoller = computed(() => unref(unref(table).controller));
        const tableData = computed(() => unref(unref(table).data));
        const tableLoading = computed(() => unref(unref(table).loading));
        setupTableColumn(TableColumnConfig);
        setupRowController(TableRowControllerConfig);
        setupUiSchema({
            isPage: false,
            isIndex: true,
            stripe: true,
            handleFixed: "right",
            sortOrder: order,
            sortProp: prop
        });

        const executeQuery = async (params = {}) => {
            setupLoading();
            const data = await setupTableData(icmQueryModuleNetwork(params));
            return { data };
        }

        function tableHandle(handler) {
            executeQuery(handler);
        }

        onMounted(async () => {
            executeQuery(tableRequest);
        });

        return {
            table,
            tableSchema,
            tableRequest,
            tableRowContaoller,
            tableData,
            tableLoading,
            loadStyle,
            tableHandle,
            handlerRowAccess
        }
    }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/style/modules-body.scss";
@import "./modules-query-network.scss";
@import "~@/assets/style/home-table.scss";
</style>
