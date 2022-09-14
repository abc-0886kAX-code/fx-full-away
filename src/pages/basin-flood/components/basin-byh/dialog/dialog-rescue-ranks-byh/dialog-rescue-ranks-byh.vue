<template>
    <dialog-tabs-data :listData="listData"></dialog-tabs-data>
</template>

<script>
import { getRTInfo } from "@/pages/basin-flood/components/basin-cbh/api";
import { computed, onMounted, unref, ref } from "@vue/composition-api";
import { default as DialogContentMixins } from "@/mixins/dialog-content.mixins";
import DialogTabsData from "@/components/dialog-tabs-data";

const setupListData = (data) => {
    const {
        id,
        name,
        dept,
        numbers,
        captain,
        tel1,
        tel2,
        duty,
        equipment,
        location,
        lgtd,
        lttd,
        tp,
        area,
    } = data;

    return [
        {
            field: "id",
            label: "队伍编码",
            value: id,
            handler: (val) => `${val}`,
        },
        {
            field: "name",
            label: "抢险队伍名称",
            value: name,
            handler: (val) => `${val}`,
        },
        {
            field: "dept",
            label: "责任单位",
            value: dept,
            handler: (val) => `${val}`,
        },
        {
            field: "numbers",
            label: "人数",
            value: numbers,
            handler: (val) => `${val}`,
        },
        {
            field: "captain",
            label: "负责人",
            value: captain,
            handler: (val) => `${val}`,
        },
        {
            field: "tel1",
            label: "联系方式",
            value: tel1,
            handler: (val) => `${val}`,
        },
        {
            field: "tel2",
            label: "值班电话",
            value: tel2,
            handler: (val) => `${val}`,
        },
        {
            field: "duty",
            label: "抢险职责",
            value: duty,
            handler: (val) => `${val}`,
        },
        {
            field: "equipment",
            label: "抢险设备",
            value: equipment,
            handler: (val) => `${val}`,
        },
        {
            field: "location",
            label: "队伍分布配置",
            value: location,
            handler: (val) => `${val}`,
        },
        {
            field: "lgtd",
            label: "经度",
            value: lgtd,
            handler: (val) => `${val}`,
        },
        {
            field: "lttd",
            label: "纬度",
            value: lttd,
            handler: (val) => `${val}`,
        },
        {
            field: "tp",
            label: "队伍了配型（FX:防汛抢险队伍，SL:水利抢险队伍）",
            value: tp,
            handler: (val) => `${val}`,
        },
        {
            field: "area",
            label: "区域",
            value: area,
            handler: (val) => `${val}`,
        },
    ];
};

export default {
    name: "dialog-rescue-ranks-byh",
    mixins: [DialogContentMixins],
    components: { DialogTabsData },
    props: {},
    setup(props, context) {
        const requeestData = ref({});
        const params = computed(() => {
            return {
                id: props.info.id,
                tp: "FX",
            };
        });

        const listData = computed(() => {
            return setupListData(requeestData.value);
        });

        const executeQuery = async (params) => {
            context.emit("loadStart");
            requeestData.value = await getRTInfo(params);

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
<style lang='scss' scoped></style>