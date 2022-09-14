<!--
 * @FilePath: \3D防汛作战\src\pages\modules\dialog\icm-tmp-site\icm-tmp-site.vue
 * @Author: zhangyang
 * @Date: 2022-07-07 10:57:16
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-12 17:22:13
 * @Description: 
-->
<template>
    <main class='modules-page icm-tmp-site'>
        <section class="modules-page-head">
            <biz-controller-search-setup class="modules-page-head-search" :schema="searchSchema"
                :jobFunction="jobFunction" @sendSearch="handlerSearch">
            </biz-controller-search-setup>

            <biz-controller-handler class="modules-page-head-handler" :handleEvent="tableHandleAllEvent"
                :baseEvent="tableBaseEvent" @triggerEvent="handlerAllAccess">
            </biz-controller-handler>
        </section>

        <section class="modules-page-body">
            <biz-controller-tables size="small" :hasChoice="false" :schema="tableSchema" :key="tableKey"
                :table="tableData" :tableRequest="tableRequest" :handleEvent="tableHandleEvent"
                :baseEvent="tableBaseEvent" @toPage="handlerPage" @choiceChange="setupTableChoice"
                @tableEvent="handlerRowAccess">
            </biz-controller-tables>
        </section>

        <ytxd-dialog :visable.sync="dialogVisable" :loading="dialogLoading" :title="dialogTitle" :width="dialogWidth"
            :height="dialogHeight">
            <component :key="dialogKey" :is="dialogName" :info="dialogPropsExtend" @loadStart="dialogLoadStart"
                @loadEnd="dialogLoadEnd" @closeDialog="dialogClose"></component>
        </ytxd-dialog>
    </main>
</template>

<script>
import { onMounted, inject, watch, unref, computed } from "@vue/composition-api";
import { useTemplateType, useCountySelect } from "@/composables/biz-search/useSearchSelect";
import { usePlainStringInput } from "@/composables/biz-search/useSearchInput";
import { useDialog } from "@/composables/useDialog";
import { useTable } from "@/composables/biz-table/useTable";
import { useTableHandleRow } from "@/biz/Table";

import { icmImportTemplateSiteData } from "@/api/icm/import.api";
import TableColumnConfig from "./config/table.column";
import {
    usableEvent,
    usableEventAll,
    default as TableRowControllerConfig
} from "./config/row.controller";
import { default as IcmTmpSiteAdd } from "../icm-tmp-site-add";
import { default as IcmTmpSiteEdit } from "../icm-tmp-site-edit";
import { default as IcmTmpSiteDelete } from "../icm-tmp-site-delete";
import { default as CommonComponents } from "@/biz/common-template/install";
import { default as DialogContentMixins } from "@/mixins/dialog-content.mixins";
export default {
    name: 'icm-tmp-site',
    mixins: [DialogContentMixins],
    components: {
        IcmTmpSiteAdd,
        IcmTmpSiteEdit,
        IcmTmpSiteDelete,
        ...CommonComponents
    },
    props: {},
    setup(props) {
        const dialog = useDialog("icmSiteDialog");

        const dialogPropsExtend = computed(() => ({
            ...unref(props).info,
            ...unref(dialog.dialogProps)
        }));
        const { dialogLoadStart, dialogLoadEnd } = inject("dialog");
        const { countySelectSchema } = useCountySelect("addvcd");
        const { templateTypeSchema } = useTemplateType("tmptype");
        const { plainStringSchema: stnmSchema } = usePlainStringInput("stnm", { tips: "请输入站点名称" });
        const { plainStringSchema: stcdSchema } = usePlainStringInput("stcd", { tips: "请输入站点编码" });
        const searchSchema = computed(() => ([
            unref(countySelectSchema),
            unref(templateTypeSchema),
            unref(stnmSchema),
            unref(stcdSchema)
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
            prop: "stcd",
            order: "desc"
        });
        const { handlerRowAccess, handlerAllAccess } = useTableHandleRow(TableRowControllerConfig, {
            provideName: "icmSiteDialog",
            choice: tableChoice
        });
        setupTableSchema(TableColumnConfig);

        async function setupDataSource() {
            dialogLoadStart();
            const table = await icmImportTemplateSiteData(unref(tableFactor), unref(props).info);
            setupTableData(table);

            dialogLoadEnd();
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
            () => unref(dialog.dialogNoticeKey),
            setupDataSource
        );

        onMounted(() => {
            handlerSearch({
                searchnoquery: "no"
            });
        });

        return {
            ...dialog,
            dialogPropsExtend,
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
@import "./icm-tmp-site.scss";
</style>
