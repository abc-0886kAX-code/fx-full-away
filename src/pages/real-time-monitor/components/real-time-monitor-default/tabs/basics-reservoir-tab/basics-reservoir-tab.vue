<!--
 * @Author: zhangxin
 * @Date: 2022-05-19 15:13:50
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-28 17:21:35
 * @Description: 
-->
<template>
    <div class="basics-reservoir-tab dialog-main">
        <charts-pages-layout
            class="dialog-body"
            :chartsRnder="RenderBarChart"
            :chartsOptions="chartsOptions"
            :isSelect="false"
        ></charts-pages-layout>
    </div>
</template>

<script>
import { ref, unref, watchEffect, computed } from "@vue/composition-api";
import { getSSJCList } from "@/pages/real-time-monitor/api/real-time-monitor.api";
import { handlerDatasetOptions } from "@/utils/handler-charts-options";
import ChartsPagesLayout from "@/components/charts-pages-layout";
import { RenderBarChart } from "@/plugins/charts";
import { default as DialogContent } from "@/mixins/dialog-content.mixins";
import format from "date-fns/format";

const beasOptions = (data) => {
    // 河底高程 , 河堤高程
    const [
        { xxsw, deadvalue, checkvalue, designvalue, maxvalue, minvalue } = {
            xxsw: 0,
            deadvalue: 0,
            checkvalue: 0,
            designvalue: 0,
            maxvalue: 0,
            minvalue: 0,
        },
    ] = data;
    return {
        grid: {
            top: "20%",
            left: "4%",
            right: "2%",
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
            top: "0px",
            data: ["水位(m)", "库容(万m³)"],
            textStyle: {
                color: "#fff",
            },
        },
        dataset: {
            dimensions: ["tm", "rz", "zkr"],
            source: [],
        },
        xAxis: [
            {
                type: "category",
                axisLabel: {
                    color: "#fff",
                    formatter: (value) => format(new Date(value), "HH"),
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
                name: "水位(m)",
                splitLine: false,
                axisLabel: {
                    color: "#fff",
                },
                max: maxvalue,
                min: minvalue,
                nameTextStyle: {
                    color: "#fff",
                },
            },
            {
                type: "value",
                name: "库容(万m³)",
                splitLine: false,
                nameTextStyle: {
                    padding: [0, -20, 0, 0], // 四个数字分别为上右下左与原位置距离
                    color: "#fff",
                },
                axisLabel: {
                    color: "#fff",
                },
            },
        ],
        series: [
            {
                name: "水位(m)",
                type: "line",
                yAxisIndex: 0,
                markLine: {
                    data: [
                        {
                            name: "汛限水位",
                            label: {
                                formatter: `{b}：${xxsw}`,
                                position: "insideMiddleTop",
                            },
                            yAxis: xxsw,
                        },
                        {
                            name: "设计水位",
                            label: {
                                formatter: `{b}：${designvalue}`,
                                position: "insideMiddleTop",
                            },
                            yAxis: designvalue,
                        },
                        {
                            name: "死水位",
                            label: {
                                formatter: `{b}：${deadvalue}`,
                                position: "insideMiddleTop",
                            },
                            yAxis: deadvalue,
                        },
                        {
                            name: "校核水位",
                            label: {
                                formatter: `{b}：${checkvalue}`,
                                position: "insideMiddleTop",
                            },
                            yAxis: checkvalue,
                        },
                    ],
                },
            },
            {
                name: "库容(万m³)",
                type: "line",
                yAxisIndex: 1,
            },
        ],
    };
};

export default {
    name: "basics-reservoir-tab",
    //混入
    mixins: [DialogContent],
    //import引入的组件需要注入到对象中才能使用
    components: { ChartsPagesLayout },
    props: {},
    setup(props, context) {
        const params = computed(() => props.info.stcd);
        const chartsOptions = ref({});
        const executeQuery = async (params) => {
            context.emit("loadStart");
            const data = await getSSJCList({ stcd: params });
            chartsOptions.value = {
                ...handlerDatasetOptions(beasOptions(data), data),
            };
            context.emit("loadEnd");
            return { data };
        };

        watchEffect(async () => {
            if (unref(params)) {
                await executeQuery(unref(params));
            }
        });

        return {
            executeQuery,
            RenderBarChart,
            chartsOptions,
        };
    },
};
</script>
<style lang='scss' scoped>
@import "./basics-reservoir-tab.scss";
@import "~@/assets/style/dialog-tab.scss";
</style>
