<!--
 * @Author: zhangyang
 * @Date: 2021-07-01 14:54:16
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-20 19:06:35
 * @Description: file content
-->
<template>
    <div class="dialog-rainfall-site-cbh">
        <section class="echarts">
            <charts-pages-layout
                class="dialog-body"
                :chartsRnder="RenderBarChart"
                :chartsOptions="chartsOptions"
                :isSelect="false"
            ></charts-pages-layout>
        </section>

        <el-button
            class="search-bar-btn"
            type="primary"
            plain
            @click="openDialog"
            >设置</el-button
        >

        <ytxd-dialog
            :visable.sync="dialogVisable"
            :loading="dialogLoading"
            :title="dialogTitle"
            :width="dialogWidth"
            :height="dialogHeight"
        >
            <component
                :key="dialogKey"
                :is="dialogName"
                :info="dialogProps"
                @loadStart="dialogLoadStart"
                @loadEnd="dialogLoadEnd"
                @closeDialog="dialogClose"
                @collectData="executeQuery"
            ></component>
        </ytxd-dialog>
    </div>
</template>

<script>
import { computed, ref, unref, onMounted } from "@vue/composition-api";
import { useDialog } from "@/composables/useDialog";
import ChartsPagesLayout from "@/components/charts-pages-layout";
import { RenderBarChart } from "@/plugins/charts";
import { handlerDatasetOptions } from "@/utils/handler-charts-options";
import { default as DialogContent } from "@/mixins/dialog-content.mixins";
import { getChartsData } from "@/pages/basin-flood/components/basin-cbh/api";
import DialogSiteList from "./dialog-site-list";

const beasOptions = (data) => {
    return {
        legend: {
            data: ["小时洪量", "累计洪量"],
            textStyle: {
                color: "#fff",
            },
        },
        toolbox: {
            iconStyle: {
                color: "white",
            },
            show: true,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: {
                    show: true,
                    type: ["stack", "line", "bar", "pictorialBar"],
                },
                restore: { show: true },
                saveAsImage: { show: true },
            },
        },
        dataset: {
            dimensions: ["tm", "val", "sumval"],
            source: timeFilter(data),
        },
        xAxis: [
            {
                type: "category",
                axisLabel: { interval: 0, color: "#fff" },
            },
        ],
        yAxis: [
            {
                type: "value",
                name: "洪量",
                axisLabel: {
                    formatter: "{value} 万m³",
                    color: "#fff",
                },
                nameTextStyle: {
                    color: "#fff",
                },
            },
        ],
        series: [
            {
                name: "小时洪量",
                type: "line",
                yAxisIndex: 0,
            },
            {
                name: "累计洪量",
                type: "line",
                yAxisIndex: 0,
            },
        ],
        dataZoom: [
            {
                start: 0,
                end: 100,
                zoomOnMouseWheel: true,
                type: "inside",
            },
            {
                type: "slider",
                start: 0,
                end: 100,
            },
        ],
    };
};

const timeFilter = (data) => {
    const fistData = data.shift();

    const afterFilterData = data.map((item) => {
        item.tm = new Date(item.tm).getHours();

        return item;
    });

    // afterFilterData.unshift(fistData);

    return [fistData, ...afterFilterData];
};

export default {
    name: "dialog-rainfall-site-cbh",
    mixins: [DialogContent],
    components: {
        ChartsPagesLayout,
        DialogSiteList,
    },
    props: {},
    setup(props, context) {
        const dialog = useDialog();
        const params = computed(() => props.info.stcd);
        const chartsOptions = ref({});
        const executeQuery = async (json) => {
            context.emit("loadStart");
            const data = await getChartsData({
                stcd: unref(params),
                json: json,
            });
            chartsOptions.value = beasOptions(data);
            context.emit("loadEnd");
            return { data };
        };

        const openDialog = () => {
            dialog.dialogHandler({
                title: "权重设置",
                props: { type: props.info.tp },
                name: "dialog-site-list",
            });
        };

        onMounted(async () => {
            await executeQuery("");
        });

        return {
            ...dialog,
            openDialog,
            executeQuery,
            RenderBarChart,
            chartsOptions,
        };
    },
};
</script>
<style lang='scss' scoped>
@import "./dialog-rainfall-site-cbh.scss";
</style>
