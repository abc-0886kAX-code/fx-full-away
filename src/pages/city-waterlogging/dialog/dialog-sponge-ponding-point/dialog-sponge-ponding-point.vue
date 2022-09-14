<!--
 * @Author: zhangxin
 * @Date: 2022-06-30 13:25:59
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-01 10:09:01
 * @Description: 
-->
<template>
    <dialog-tabs-data :listData="listData"></dialog-tabs-data>
</template>

<script>
import { computed } from "@vue/composition-api";
import { default as DialogContentMixins } from "@/mixins/dialog-content.mixins";
import DialogTabsData from "@/components/dialog-tabs-data";

const setupListData = (data) => {
    const { FID, 积水点名称, 行政区, 治理主体, 当前进展 } = data;

    return [
        {
            field: "FID",
            label: "FID",
            value: FID,
            handler: (val) => `${val}`,
        },
        {
            field: "积水点名称",
            label: "积水点名称",
            value: 积水点名称,
            handler: (val) => `${val}`,
        },
        {
            field: "行政区",
            label: "行政区",
            value: 行政区,
            handler: (val) => `${val}`,
        },
        {
            field: "治理主体",
            label: "治理主体",
            value: 治理主体,
            handler: (val) => `${val}`,
        },
        {
            field: "当前进展",
            label: "当前进展",
            value: 当前进展,
            handler: (val) => `${val}`,
        },
    ];
};

export default {
    name: "dialog-sponge-ponding-point",
    mixins: [DialogContentMixins],
    components: { DialogTabsData },
    props: {},
    setup(props, context) {
        context.emit("loadEnd");
        const listData = computed(() => {
            return setupListData(props.info);
        });

        return {
            listData,
        };
    },
};
</script>
<style lang='scss' scoped></style>