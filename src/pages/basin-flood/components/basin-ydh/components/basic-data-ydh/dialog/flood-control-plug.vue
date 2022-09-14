<!--
 * @FilePath: \3D防汛作战\src\pages\basin-flood\components\basin-cbh\components\basic-data-cbh\dialog\flood-control-plug.vue
 * @Author: zhangyang
 * @Date: 2022-06-17 10:18:28
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-22 10:21:38
 * @Description: 防洪堵口
-->
<template>
    <ytxd-empty v-if="isEmpty"></ytxd-empty>
    <dialog-tabs-data v-else :listData="listData"></dialog-tabs-data>
</template>
<script>
import { default as DialogContentMixins } from "@/mixins/dialog-content.mixins";
import { getFloodControlPlugDetails } from "../api/flood-control-plug.api";
import { computed, onMounted, unref, ref } from "@vue/composition-api";
import DialogTabsData from "@/components/dialog-tabs-data";

const setupListData = (data) => {
    const { field, value } = data;

    return field.map((item) => {
        return {
            field: item.fieldname,
            label: item.description,
            value: value[item.fieldname],
            handler: (val) => `${val}`,
        };
    });
};

export default {
    name: "flood-control-plug",
    mixins: [DialogContentMixins],
    components: { DialogTabsData },
    props: {},
    setup(props, context) {
        const params = computed(() => {
            return {
                addvcd: props.info.addvcd,
                stcd: props.info.stcd,
            };
        });
        const listData = ref([]);
        const isEmpty = computed(() => unref(listData).length <= 0);

        const executeQuery = async (params) => {
            context.emit("loadStart");
            getFloodControlPlugDetails(params)
                .then((data) => {
                    listData.value = setupListData(data);
                })
                .catch((error) => {
                    console.log(error);
                    listData.value = [];
                })
                .finally(() => context.emit("loadEnd"));
        };

        onMounted(async () => {
            await executeQuery(unref(params));
        });

        return {
            listData,
            isEmpty
        };
    },
};
</script>
<style lang='scss' scoped>
</style>
