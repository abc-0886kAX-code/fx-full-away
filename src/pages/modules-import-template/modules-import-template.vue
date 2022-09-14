<!--
 * @FilePath: \3D防汛作战\src\pages\modules-import-template\modules-import-template.vue
 * @Author: zhangyang
 * @Date: 2022-07-06 16:17:50
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-11 13:13:27
 * @Description: 
-->
<template>
    <main class='modules-page modules-import-template' v-loading="loading" v-bind="loadStyle">
        <section class="modules-page-head">
            <biz-controller-search-setup class="modules-page-head-search" :schema="searchSchema"
                :jobFunction="jobFunction" @sendSearch="handlerSearch">
            </biz-controller-search-setup>

            <biz-controller-handler class="modules-page-head-handler" :handleEvent="tableHandleAllEvent"
                :baseEvent="tableBaseEvent" @triggerEvent="handlerAllAccess">
            </biz-controller-handler>
        </section>

        <section class="modules-page-body">
            <biz-controller-tables :hasChoice="false" :schema="tableSchema" :key="tableKey" :table="tableData"
                :tableRequest="tableRequest" :handleEvent="tableHandleEvent" :baseEvent="tableBaseEvent"
                @toPage="handlerPage" @choiceChange="setupTableChoice" @tableEvent="handlerRowAccess">
            </biz-controller-tables>
        </section>
    </main>
</template>

<script>
import { onMounted, inject, watch, unref, computed } from "@vue/composition-api";
import { useTemplateType } from "@/composables/biz-search/useSearchSelect";
import { usePlainStringInput } from "@/composables/biz-search/useSearchInput";
import { useCustomDate } from "@/composables/biz-search/useSearchDate";
import { useTable } from "@/composables/biz-table/useTable";
import { useTableHandleRow } from "@/biz/Table";
import { Load } from "@/biz/share/entify/Load";

import { icmImportTemplateData } from "@/api/icm/import.api";
import TableColumnConfig from "./config/table.column";
import {
    usableEvent,
    usableEventAll,
    default as TableRowControllerConfig
} from "./config/row.controller";
import { default as CommonComponents } from "@/biz/common-template/install";

export default {
    name: 'modules-import-template',
    mixins: [],
    components: { ...CommonComponents },
    props: {},
    setup() {
        const { dialogNoticeKey } = inject("dialog");
        const { loading, loadStyle, setupLoading } = Load(false);
        const { templateTypeSchema } = useTemplateType("tmptype");
        const { plainStringSchema: tmpnameSchema } = usePlainStringInput("tmpname", { tips: "请输入模板名称" });
        const { plainStringSchema: tmpidSchema } = usePlainStringInput("tmpid", { tips: "请输入模板ID" });
        const { schema: timeSchema } = useCustomDate("times");
        const searchSchema = computed(() => ([
            unref(templateTypeSchema),
            unref(tmpnameSchema),
            unref(tmpidSchema),
            unref(timeSchema),
        ]));
        const jobFunction = {};

        const {
            tableKey,
            tableData,
            tableSchema,
            tableChoice,
            tableRequest,
            tableFactor,
            setupTableKey,
            setupTableData,
            setupTableSchema,
            setupTableChoice,
            setupTableFactorQuery,
            setupTableFactorBody
        } = useTable({
            prop: "times",
            order: "desc"
        });
        const { handlerRowAccess, handlerAllAccess } = useTableHandleRow(TableRowControllerConfig, {
            choice: tableChoice
        });
        setupTableSchema(TableColumnConfig);

        async function setupDataSource() {
            setupLoading(true);

            const table = await icmImportTemplateData(unref(tableFactor));
            setupTableData(table);

            setupLoading(false);
        }

        async function handlerSearch(searchParams) {
            setupTableFactorBody(searchParams);
            setupTableFactorQuery();
            await setupDataSource();
            setupTableKey();
        }
        async function handlerPage(searchPage) {
            setupTableFactorQuery(searchPage);
            await setupDataSource();
        }

        watch(
            () => unref(dialogNoticeKey),
            setupDataSource
        );

        onMounted(() => {
            handlerSearch({
                searchnoquery: "no"
            });
        });

        return {
            loading, loadStyle,
            searchSchema,
            jobFunction,

            tableKey,
            tableSchema,
            tableBaseEvent: TableRowControllerConfig,
            tableHandleEvent: usableEvent,
            tableHandleAllEvent: usableEventAll,
            tableData,
            tableChoice,
            tableRequest,
            setupTableChoice,

            handlerSearch,
            handlerPage,
            handlerRowAccess,
            handlerAllAccess
        }
    }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/style/modules-page.scss";
@import "~@/assets/style/home-table.scss";
</style>
