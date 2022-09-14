<!--
 * @Author: zhangxin
 * @Date: 2022-06-30 13:25:59
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-01 10:26:23
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
    const { FID, 标注名称, 行政区, 地名地址, 分类 } = data;

    return [
        {
            field: "FID",
            label: "FID",
            value: FID,
            handler: (val) => `${val}`,
        },
        {
            field: "标注名称",
            label: "标注名称",
            value: 标注名称,
            handler: (val) => `${val}`,
        },
        {
            field: "行政区",
            label: "行政区",
            value: 行政区,
            handler: (val) => `${val}`,
        },
        {
            field: "地名地址",
            label: "地名地址",
            value: 地名地址,
            handler: (val) => `${val}`,
        },
        {
            field: "分类",
            label: "分类",
            value: 分类,
            handler: (val) => `${val}`,
        },
    ];
};

export default {
    name: "dialog-sponge-ponding-point-two",
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