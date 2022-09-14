<!--
 * @Author: zhangxin
 * @Date: 2022-07-04 15:15:59
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-04 15:32:05
 * @Description: 
-->
<template>
    <mg-table
        id="icm-run-list-region"
        :tableSchema="tableSchema"
        :tableData="tableData"
    ></mg-table>
</template>

<script>
import { icmQueryRegionalStatisticsList } from "@/api/icm/run.api";
import { onMounted, inject, ref } from "@vue/composition-api";
import { default as DialogContentMixins } from "@/mixins/dialog-content.mixins";

const tableOptions = Object.freeze({
    uiSchema: {
        stripe: true,
    },
    columnSchema: [
        {
            prop: "id",
            mold: "default",
            label: "区域名称",
            align: "center",
        },
        {
            prop: "maxDepth",
            mold: "default",
            label: "最大积水深度",
            align: "center",
        },
        {
            prop: "duration",
            mold: "default",
            label: "累计积水时长",
            align: "center",
        },
        {
            prop: "maxFloodedArea",
            mold: "default",
            label: "最大积水面积",
            align: "center",
        },
    ],
});

export default {
    name: "icm-run-list-region",
    mixins: [DialogContentMixins],
    components: {},
    props: {},
    setup(props, context) {
        const { dialogLoadStart, dialogLoadEnd } = inject("dialog");
        const tableSchema = ref(tableOptions);
        const tableData = ref([]);

        const executeQuery = async () => {
            dialogLoadStart();
            const data = await icmQueryRegionalStatisticsList({
                simId: props.info.id,
            });
            tableData.value = data;
            dialogLoadEnd();
        };

        onMounted(async () => {
            await executeQuery();
        });

        return {
            tableSchema,
            tableData,
        };
    },
};
</script>
<style lang='scss' scoped>
#icm-run-list-region {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
@import "~@/assets/style/home-table.scss";
</style>