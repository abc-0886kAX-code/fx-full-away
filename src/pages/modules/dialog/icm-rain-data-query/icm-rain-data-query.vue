<!--
 * @FilePath: \3D防汛作战\src\pages\modules\dialog\icm-rain-data-query\icm-rain-data-query.vue
 * @Author: zhangyang
 * @Date: 2022-06-30 16:01:00
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-01 10:56:48
 * @Description: 
-->
<template>
    <mg-table class='modules-body icm-rain-data-query' v-loading="tableLoading" v-bind="loadStyle"
        :defaultPageSize="100" :tableSchema="tableSchema" :tableData="tableData">
    </mg-table>
</template>

<script>
import { onMounted, inject, computed, unref } from "@vue/composition-api";
import { loadStyle } from "@/biz/share/entify/Load";
import { useTableData } from "@/biz/Table";
import { icmQueryRainfallData } from "@/api/icm/query.api";

import { default as DialogContentMixins } from "@/mixins/dialog-content.mixins";

export default {
    name: 'icm-rain-data-query',
    mixins: [DialogContentMixins],
    components: {},
    props: {},
    setup(props) {
        const {
            dialogLoadStart,
            dialogLoadEnd
        } = inject("dialog");
        const {
            table,
            setupTableData,
            setupTableColumn,
            setupUiSchema
        } = useTableData("icm-rain-data-query");
        const tableSchema = computed(() => ({
            uiSchema: unref(unref(table).uiSchema),
            columnSchema: unref(unref(table).column)
        }));
        const tableData = computed(() => unref(unref(table).data));
        const tableLoading = computed(() => unref(unref(table).loading));

        const executeQuery = async () => {
            dialogLoadStart();
            const { datacase, columns } = await icmQueryRainfallData(props.info);
            const data = await setupTableData(Promise.resolve(datacase));
            datacase.length > 0 && setupTableColumn(columns);
            setupUiSchema({
                isPage: false,
                isIndex: true,
                stripe: true,
            });
            dialogLoadEnd();
            return { data };
        }

        onMounted(() => {
            executeQuery();
        });

        return {
            table,
            tableSchema,
            tableData,
            tableLoading,
            loadStyle,
        }
    }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/style/modules-body.scss";
@import "./icm-rain-data-query.scss";
@import "~@/assets/style/home-table.scss";
</style>
