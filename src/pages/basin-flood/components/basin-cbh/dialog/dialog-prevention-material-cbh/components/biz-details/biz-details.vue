<template>
    <dialog-tabs-data :listData="listData"></dialog-tabs-data>
</template>

<script>
import { getWHInfo } from "@/pages/basin-flood/components/basin-cbh/api";
import { computed, onMounted, unref, ref } from "@vue/composition-api";
import { default as DialogContentMixins } from "@/mixins/dialog-content.mixins";
import DialogTabsData from "@/components/dialog-tabs-data";
const setupListData = (data) => {
    const {
        area,
        lv,
        remark,
        dept,
        groupname,
        stlc,
        structure,
        footprint,
        stnm,
        yr,
        user,
        tel,
    } = data;

    return [
        {
            field: "area",
            label: "区县",
            value: area,
            handler: (val) => `${val}`,
        },
        {
            field: "lv",
            label: "级别",
            value: lv,
            handler: (val) => `${val}`,
        },
        {
            field: "remark",
            label: "仓库信息",
            value: remark,
            handler: (val) => `${val}`,
        },
        {
            field: "dept",
            label: "仓库权属",
            value: dept,
            handler: (val) => `${val}`,
        },
        {
            field: "groupname",
            label: "管理单位",
            value: groupname,
            handler: (val) => `${val}`,
        },
        {
            field: "stlc",
            label: "仓库地址",
            value: stlc,
            handler: (val) => `${val}`,
        },
        {
            field: "structure",
            label: "仓库结构",
            value: structure,
            handler: (val) => `${val}`,
        },
        {
            field: "footprint",
            label: "仓库面积",
            value: footprint,
            handler: (val) => `${val}`,
        },
        {
            field: "stnm",
            label: "仓库名称",
            value: stnm,
            handler: (val) => `${val}`,
        },
        {
            field: "yr",
            label: "建设日期",
            value: yr,
            handler: (val) => `${val}`,
        },
        {
            field: "user",
            label: "管理人员",
            value: user,
            handler: (val) => `${val}`,
        },
        {
            field: "tel",
            label: "联系方式",
            value: tel,
            handler: (val) => `${val}`,
        },
    ];
};

export default {
    name: "ytxd-biz-details",
    mixins: [DialogContentMixins],
    components: { DialogTabsData },
    props: {},
    setup(props, context) {
        const requeestData = ref({});
        const params = computed(() => {
            return {
                stcd: props.info.stcd,
            };
        });

        const listData = computed(() => {
            return setupListData(requeestData.value);
        });

        const executeQuery = async (params) => {
            context.emit("loadStart");
            requeestData.value = await getWHInfo(params);

            context.emit("loadEnd");
        };

        onMounted(async () => {
            await executeQuery(unref(params));
        });

        return {
            listData,
        };
    },
};
</script>
<style lang='scss' scoped>
</style>