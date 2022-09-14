<!--
 * @FilePath: \3D防汛作战\src\pages\basin-flood\components\basin-cbh\components\basic-data-cbh\dialog\river.vue
 * @Author: zhangyang
 * @Date: 2022-06-17 10:18:45
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-21 09:55:11
 * @Description: 河道
-->
<template>
    <dialog-tabs-data :listData="listData"></dialog-tabs-data>
</template>
<script>
import { computed } from "@vue/composition-api";
import DialogTabsData from "@/components/dialog-tabs-data";

export default {
    name: 'river',
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
                NAME
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
