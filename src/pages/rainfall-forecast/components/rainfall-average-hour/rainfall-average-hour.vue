<!--
 * @Author: maggot-code
 * @Date: 2022-05-23 14:12:51
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-14 17:06:05
 * @Description: file content
-->
<template>
    <div class="rainfall-average-hour">
        <charts-pages-layout :chartsRnder="RenderBarChart" :chartsOptions="chartsOptions" :isSelect="false">
        </charts-pages-layout>
    </div>
</template>

<script>
import { useSocketMessage, SOCKET_MESSAGE_PREDICTION } from "@/biz/Socket";
import { onMounted, ref } from "@vue/composition-api";
import { RenderBarChart } from "@/plugins/charts";
import { handlerDatasetOptions } from "@/utils/handler-charts-options";

import { getRainfallAvgHourData } from "@/pages/rainfall-forecast/api/prediction.api";
import format from "date-fns/format";

const setMaxValue = (maxValue) => (value) => {
    if (maxValue) return maxValue;

    const baseValue = value.max <= 1 ? value.max + 0.1 : value.max + 0.5;

    return baseValue.toFixed(2);
};

const beasOptions = {
    color: [
        "#1EE2F2",
        "#00BAF2",
        "#F25A0E",
        "#28D97E",
        "#0666BA",
        "#FCF300",
        "#9B2CF8",
    ],
    legend: {
        data: ["平均雨量(mm)"],
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
            type: "slider",
            start: 0,
            end: 100,
            show: true,
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
                formatter: (value) => format(new Date(value), "HH") + "时",
            },
        },
    ],
    yAxis: [
        {
            type: "value",

            name: "平均雨量(mm)",
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
            name: "平均雨量(mm)",
            type: "bar",
            yAxisIndex: 0,
            tooltip: {
                valueFormatter: (value) => value.toFixed(2),
            },
        },
    ],
};

export default {
    name: "rainfall-average-hour",
    mixins: [],
    components: {},
    props: {},
    emit: ["loadStart", "loadEnd"],
    setup(props, context) {
        const { setupSocketMessage } = useSocketMessage();
        const chartsOptions = ref({});

        const executeQuery = async () => {
            context.emit("loadStart");
            const data = await getRainfallAvgHourData();
            chartsOptions.value = {
                ...handlerDatasetOptions(beasOptions, data),
            };
        };
        setupSocketMessage(SOCKET_MESSAGE_PREDICTION, () => {
            executeQuery().finally(() => {
                context.emit("loadEnd");
            });
        });
        onMounted(async () => {
            executeQuery().finally(() => {
                context.emit("loadEnd");
            });
        });

        return {
            RenderBarChart,
            chartsOptions,
        };
    },
};
</script>
<style lang='scss' scoped>
@import "./rainfall-average-hour.scss";
</style>
