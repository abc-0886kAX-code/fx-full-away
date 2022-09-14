<!--
 * @FilePath: \3D防汛作战\src\pages\basin-flood\components\basin-cbh\components\basic-data-cbh\dialog\reservoir.vue
 * @Author: zhangyang
 * @Date: 2022-06-17 10:18:51
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-21 10:00:01
 * @Description: 水库
-->
<template>
    <dialog-tabs-data :listData="listData"></dialog-tabs-data>
</template>
<script>
import { computed } from "@vue/composition-api";
import DialogTabsData from "@/components/dialog-tabs-data";

export default {
    name: 'reservoir',
    mixins: [],
    components: { DialogTabsData },
    props: {
        info: Object
    },
    setup(props, context) {
        context.emit("loadEnd");
        const listData = computed(() => {
            const {
                FID,
                ID,
                NAME,
                SOURCE
            } = props.info;
            return [
                {
                    field: "FID",
                    label: "FID",
                    value: FID,
                    handler: (val) => `${val}`,
                },
                {
                    field: "ID",
                    label: "id",
                    value: ID,
                    handler: (val) => `${val}`,
                },
                {
                    field: "NAME",
                    label: "名称",
                    value: NAME,
                    handler: (val) => `${val}`,
                },
                {
                    field: "SOURCE",
                    label: "来源",
                    value: SOURCE,
                    handler: (val) => `${val}`,
                }
            ]
        });

        return {
            listData
        }
    }
};
</script>
<style lang='scss' scoped>
</style>
