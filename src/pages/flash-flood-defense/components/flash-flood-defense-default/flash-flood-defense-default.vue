<!--
 * @Author: zhangxin
 * @Date: 2022-05-19 14:45:32
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-28 17:18:19
 * @Description: 
-->
<template>
    <div
        class="flash-flood-defense-default"
        v-loading="loading"
        v-bind="loadStyle"
    >
        <charts-pages-layout
            :chartsRnder="RenderBarChart"
            :chartsOptions="chartsOptions"
            :isSelect="false"
        >
        </charts-pages-layout>
    </div>
</template>

<script>
import { ref, onMounted } from "@vue/composition-api";
import { getSHFYList } from "../../api/flash-flood-defense.api";
import { handlerDatasetOptions } from "@/utils/handler-charts-options";
import ChartsPagesLayout from "@/components/charts-pages-layout";
import { RenderBarChart } from "@/plugins/charts";
import { Load } from "@/biz/share/entify/Load";

const beasOptions = {
    color: [
        "#1EE2F2",
        "#F3B421",
        "#F25A0E",
        "#28D97E",
        "#0666BA",
        "#FCF300",
        "#9B2CF8",
    ],
    grid: {
        top: "20%",
        left: "4%",
        right: "4%",
        bottom: "5%",
        containLabel: true,
    },
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

    legend: {
        top: "10px",
        data: ["山洪沟数量(个)"],
        textStyle: {
            color: "#fff",
        },
    },
    dataset: {
        dimensions: ["area", "num"],
        source: [],
    },
    xAxis: [
        {
            type: "category",
            axisLabel: {
                color: "#fff",
                interval: 0,
            },
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
            show: false,
        },
    ],
    yAxis: [
        {
            type: "value",
            name: "山洪沟数量(个)",
            axisLabel: {
                color: "#fff",
                formatter: "{value} 个",
            },
            nameTextStyle: {
                color: "#fff",
            },
            splitLine: {
                show: false,
            },
        },
    ],
    series: [
        {
            name: "山洪沟数量(个)",
            type: "pictorialBar",
            barMinHeight: 10,
            barCategoryGap: "20%",
            symbol: "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
            yAxisIndex: 0,
            label: {
                // 数据上方显示数值
                show: true,
                position: "top",
                color: "#08FBC9",
                fontSize: 13,
            },
        },
    ],
};

export default {
    name: "flash-flood-defense-default",
    //混入
    mixins: [],
    //import引入的组件需要注入到对象中才能使用
    components: { ChartsPagesLayout },
    props: {},
    setup() {
        const { loading, loadStyle, setupLoading } = Load();
        const chartsOptions = ref({});
        const executeQuery = async () => {
            setupLoading(true);
            const data = await getSHFYList();
            chartsOptions.value = {
                ...handlerDatasetOptions(beasOptions, data.value),
            };
            setupLoading(false);
        };

        onMounted(() => {
            executeQuery();
        });

        return {
            loading,
            loadStyle,
            executeQuery,
            RenderBarChart,
            chartsOptions,
        };
    },
};
</script>
<style lang='scss' scoped>
@import "./flash-flood-defense-default.scss";
</style>
