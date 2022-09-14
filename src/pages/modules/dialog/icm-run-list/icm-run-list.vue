<!--
 * @FilePath: \3D防汛作战\src\pages\modules-run-list\modules-run-list.vue
 * @Author: zhangyang
 * @Date: 2022-06-29 10:19:47
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-29 13:15:02
 * @Description: 
-->
<template>
    <!-- 模拟列表查询详细信息 -->
    <dialog-tabs-data :listData="listData"></dialog-tabs-data>
</template>

<script>
import { onMounted, inject, computed, unref, ref } from "@vue/composition-api";
import { icmQuerySimulationListData } from "@/api/icm/run.api";
import { default as DialogContentMixins } from "@/mixins/dialog-content.mixins";
import DialogTabsData from "@/components/dialog-tabs-data";

const setupListData = (data) => {
    const {
        id,
        name,
        success_substatus,
        ["Rainfall Event"]: rainfallevent,
        Inflow,
        ResultsMultiplier,
        ["Model Network"]: modelnetwork,
        Duration,
        ["Start Time"]: starttime,
        ["End Time"]: endtime,
        TimeStep,
        Level,
        comment,
    } = data;

    return [
        {
            field: "id",
            label: "模型id",
            value: id,
            handler: (val) => `${val}`,
        },

        {
            field: "name",
            label: "模拟名称",
            value: name,
            handler: (val) => `${val}`,
        },
        {
            field: "success_substatus",
            label: "模拟状态",
            value: success_substatus,
            handler: (val) => `${val}`,
        },
        {
            field: "rainfallevent",
            label: "模拟对应的降雨事件名称",
            value: rainfallevent,
            handler: (val) => `${val}`,
        },
        {
            field: "Inflow",
            label: "入流名称",
            value: Inflow,
            handler: (val) => `${val}`,
        },
        {
            field: "ResultsMultiplier",
            label: "结果显示步长",
            value: ResultsMultiplier,
            handler: (val) => `${val}`,
        },
        {
            field: "modelnetwork",
            label: "模型网络名称",
            value: modelnetwork,
            handler: (val) => `${val}`,
        },
        {
            field: "Duration",
            label: "模拟时长",
            value: Duration,
            handler: (val) => `${val}`,
        },
        {
            field: "starttime",
            label: "开始时间",
            value: starttime,
            handler: (val) => `${val}`,
        },
        {
            field: "endtime",
            label: "结束时间",
            value: endtime,
            handler: (val) => `${val}`,
        },
        {
            field: "TimeStep",
            label: "计算时间步长（单位 s）",
            value: TimeStep,
            handler: (val) => `${val}`,
        },
        {
            field: "Level",
            label: "水位名称",
            value: Level,
            handler: (val) => `${val}`,
        },
        {
            field: "comment",
            label: "备注",
            value: comment,
            handler: (val) => `${val}`,
        },
    ];
};

export default {
    name: "icm-run-list",
    mixins: [DialogContentMixins],
    components: { DialogTabsData },
    props: {},
    setup(props, context) {
        const requeestData = ref({});

        const params = computed(() => {
            return {
                simId: props.info.id,
            };
        });

        const listData = computed(() => {
            return setupListData(requeestData.value);
        });

        const executeQuery = async (params) => {
            context.emit("loadStart");
            requeestData.value = await icmQuerySimulationListData(
                unref(params)
            );
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
@import "~@/assets/style/modules-body.scss";
@import "./icm-run-list.scss";
</style>
