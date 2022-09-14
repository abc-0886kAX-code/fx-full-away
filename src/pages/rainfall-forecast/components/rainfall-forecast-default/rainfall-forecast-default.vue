<!--
 * @Author: zhangxin
 * @Date: 2022-05-19 14:45:32
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-14 16:44:02
 * @Description: 
-->
<template>
    <div class="rainfall-forecast-default" v-loading="loading" v-bind="loadStyle">
        <charts-pages-layout class="dialog-body" :chartsRnder="RenderBarChart" :chartsOptions="chartsOptions"
            :isSelect="false"></charts-pages-layout>
    </div>
</template>

<script>
import { useSocketMessage, SOCKET_MESSAGE_PREDICTION } from "@/biz/Socket";
import { onMounted, ref } from "@vue/composition-api";
import { RenderBarChart } from "@/plugins/charts";
import { handlerDatasetOptions } from "@/utils/handler-charts-options";

import { Load } from "@/biz/share/entify/Load";

import { getRainfallForecastChartData } from "@/pages/rainfall-forecast/api/prediction.api";
import format from "date-fns/format";

const beasOptions = {
    color: [
        "#25F0A3",
        "#F3B421",
        "#F25A0E",
        "#28D97E",
        "#0666BA",
        "#FCF300",
        "#9B2CF8",
    ],
    toolbox: {
        top: "20",
        feature: {
            mark: {
                show: false,
            },
            dataView: {
                show: false,
                readOnly: false,
            },
            magicType: {
                show: false,
            },
            restore: {
                show: false,
            },
            saveAsImage: {
                show: false,
            },
        },
    },
    grid: {
        top: "20%",
        left: "4%",
        right: "4%",
        bottom: "5%",
        containLabel: true,
    },
    legend: {
        top: "10px",
        data: ["预报雨量(mm)"],
        textStyle: {
            color: "#fff",
        },
    },
    dataset: {
        dimensions: ["tm", "r"],
        source: [],
    },
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
            show: false,
        },
    ],
    xAxis: [
        {
            type: "category",
            splitLine: {
                show: false,
            },
            axisLabel: {
                color: "#fff",
                formatter: (value) => format(new Date(value), "HH"),
            },
        },
    ],
    yAxis: [
        {
            type: "value",
            name: "预报雨量(mm)",
            position: "left",
            axisLabel: {
                color: "#fff",
            },
            splitLine: {
                show: false,
            },
            nameTextStyle: {
                color: "#fff",
            },
            min: (value) => {
                const min = Math.round(value.min - 10);
                return min <= 0 ? 0 : min;
            },
        },
    ],
    series: [
        {
            name: "预报雨量(mm)",
            type: "bar",
            yAxisIndex: 0,
        },
    ],
};

export default {
    name: "rainfall-forecast-default",
    //混入
    mixins: [],
    //import引入的组件需要注入到对象中才能使用
    components: {},
    props: {},
    setup() {
        const { setupSocketMessage } = useSocketMessage();
        const { loading, loadStyle, setupLoading } = Load();
        const chartsOptions = ref({});

        const executeQuery = async () => {
            setupLoading(true);
            const data = await getRainfallForecastChartData();
            chartsOptions.value = {
                ...handlerDatasetOptions(beasOptions, data),
            };
        };

        setupSocketMessage(SOCKET_MESSAGE_PREDICTION, () => {
            executeQuery().finally(setupLoading);
        });
        onMounted(async () => {
            executeQuery().finally(setupLoading);
        });

        return {
            loading,
            loadStyle,
            RenderBarChart,
            chartsOptions,
        };
    },
};
</script>
<style lang='scss' scoped>
@import "./rainfall-forecast-default.scss";
</style>
