<!--
 * @FilePath: \3D防汛作战\src\pages\modules\dialog\icm-plan-query\icm-plan-query.vue
 * @Author: zhangyang
 * @Date: 2022-06-30 16:01:30
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-30 16:55:33
 * @Description: 
-->
<template>
    <div class='icm-plan-query'>
        <template v-for="(item, index) in tableData">
            <h1 :key="index">{{ item }}</h1>
        </template>
    </div>
</template>

<script>
import { onMounted, inject, computed, unref } from "@vue/composition-api";
import { useTableData } from "@/biz/Table";
import { icmQueryModuleNetworkPlan } from "@/api/icm/query.api";

import { default as DialogContentMixins } from "@/mixins/dialog-content.mixins";

export default {
    name: 'icm-plan-query',
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
            setupTableData
        } = useTableData("icm-plan-query");
        const tableData = computed(() => unref(unref(table).data));

        const executeQuery = async () => {
            dialogLoadStart();
            const data = await setupTableData(icmQueryModuleNetworkPlan(props.info));
            dialogLoadEnd();
            return { data };
        }

        onMounted(() => {
            executeQuery();
        });

        return {
            tableData
        }
    }
};
</script>
<style lang='scss' scoped>
@import "./icm-plan-query.scss";
</style>
