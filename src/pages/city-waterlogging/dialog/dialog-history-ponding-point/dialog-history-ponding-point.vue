<!--
 * @Author: zhangxin
 * @Date: 2022-06-30 13:25:59
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-30 15:41:24
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
    const { 积水点, 积水次数, 积水时间1, 类别, 积水深度1, 所在区, 备注 } = data;

    return [
        {
            field: "积水点",
            label: "积水点",
            value: 积水点,
            handler: (val) => `${val}`,
        },
        {
            field: "积水次数",
            label: "积水次数",
            value: 积水次数,
            handler: (val) => `${val}`,
        },
        {
            field: "积水时间1",
            label: "积水时间1",
            value: 积水时间1,
            handler: (val) => `${val}`,
        },
        {
            field: "类别",
            label: "类别",
            value: 类别,
            handler: (val) => `${val}`,
        },
        {
            field: "积水深度1",
            label: "积水深度1",
            value: 积水深度1,
            handler: (val) => `${val}`,
        },
        {
            field: "所在区",
            label: "所在区",
            value: 所在区,
            handler: (val) => `${val}`,
        },
        {
            field: "备注",
            label: "备注",
            value: 备注,
            handler: (val) => `${val}`,
        },
    ];
};

export default {
    name: "dialog-history-ponding-point",
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