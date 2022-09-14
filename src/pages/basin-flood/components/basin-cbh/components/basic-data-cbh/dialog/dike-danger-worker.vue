<!--
 * @FilePath: \3D防汛作战\src\pages\basin-flood\components\basin-cbh\components\basic-data-cbh\dialog\dike-danger-worker.vue
 * @Author: zhangyang
 * @Date: 2022-06-17 10:18:34
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-21 11:18:14
 * @Description: 提房险工
-->
<template>
    <dialog-tabs-data :listData="listData"></dialog-tabs-data>
</template>
<script>
import { default as DialogContentMixins } from "@/mixins/dialog-content.mixins";
import { computed } from "@vue/composition-api";
import DialogTabsData from "@/components/dialog-tabs-data";

export default {
    name: "dike-danger-worker",
    mixins: [DialogContentMixins],
    components: { DialogTabsData },
    props: {},
    setup(props, context) {
        context.emit("loadEnd");
        const listData = computed(() => {
            const { FID, NAME, 流域分布, 风险图ID, 风险等级 } = props.info;

            return [
                {
                    field: "FID",
                    label: "FID",
                    value: FID,
                    handler: (val) => `${val}`,
                },
                {
                    field: "NAME",
                    label: "名称",
                    value: NAME,
                    handler: (val) => `${val}`,
                },
                {
                    field: "流域分布",
                    label: "流域分布",
                    value: 流域分布,
                    handler: (val) => `${val}`,
                },
                {
                    field: "风险图ID",
                    label: "风险图ID",
                    value: 风险图ID,
                    handler: (val) => `${val}`,
                },
                {
                    field: "风险等级",
                    label: "风险等级",
                    value: 风险等级,
                    handler: (val) => `${val}`,
                },
            ];
        });

        return {
            listData,
        };
    },
};
</script>
<style lang='scss' scoped>
</style>
