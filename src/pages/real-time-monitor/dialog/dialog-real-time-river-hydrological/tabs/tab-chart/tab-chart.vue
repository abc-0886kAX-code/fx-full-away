<template>
    <div class="tab-body tab-chart">
        <div class="tab-chart-select">
            <el-date-picker v-model="dateVal" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期"
                format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>

            <div>
                <el-button @click="executeQuery(params)" type="primary">查询</el-button>
                <el-button @click="reset" type="danger">重置</el-button>
            </div>
        </div>

        <div class="tab-chart-box">
            <charts-pages-layout :chartsRnder="RenderBarChart" :chartsOptions="chartsOptions" :isSelect="false">
            </charts-pages-layout>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { default as DialogContentMixins } from "@/mixins/dialog-content.mixins";
import {
    onMounted,
    ref,
    unref,
    computed,
    onBeforeUnmount,
} from "@vue/composition-api";
import stroe from "@/stroe";
import { getRiverDataList } from "../../../../api/real-time-monitor.api";
import { handlerDatasetOptions } from "@/utils/handler-charts-options";
import ChartsPagesLayout from "@/components/charts-pages-layout";
import { RenderBarChart } from "@/plugins/charts";
import format from "date-fns/format";
import subDays from "date-fns/subDays";
const nowDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");
const yesterDay = format(subDays(new Date(), 1), "yyyy-MM-dd HH:mm:ss");

const testOptions = {
    color: [
        "#F93EED",
        "#3ACAF4",
        "#F25A0E",
        "#28D97E",
        "#0666BA",
        "#FCF300",
        "#9B2CF8",
    ],
    grid: {
        top: "10%",
        bottom: "15%",
        left: "6%",
        right: "6%",
        containLabel: false,
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
                type: ["line", "bar"],
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
        top: "20",
        data: ["水位(m)", "流量(m³/s)"],
        textStyle: {
            color: "#fff",
        },
    },
    dataset: {
        dimensions: ["tm", "z", "q"],
        source: [],
    },
    xAxis: [
        {
            type: "category",
            axisLabel: {
                color: "#fff",
            },
        },
    ],
    yAxis: [
        {
            type: "value",
            name: "水位(m)",
            axisLabel: {
                color: "#fff",
            },
            splitLine: {
                show: false,
            },
            nameTextStyle: {
                color: "#fff",
            },
        },
        {
            type: "value",
            name: "流量(m³/s)",
            axisLabel: {
                color: "#fff",
            },
            splitLine: {
                show: false,
            },
            nameTextStyle: {
                color: "#fff",
            },
        },
    ],
    series: [
        {
            name: "水位(m)",
            type: "line",
            yAxisIndex: 0,
            areaStyle: {
                normal: {
                    color: "rgba(249,62,237,0.3)",
                },
            },
        },
        {
            name: "流量(m³/s)",
            type: "line",
            yAxisIndex: 1,
            areaStyle: {
                normal: {
                    color: "rgba(58,202,244,0.6)",
                },
            },
        },
    ],
};

export default {
    name: "tab-chart",
    //混入
    mixins: [DialogContentMixins],
    //import引入的组件需要注入到对象中才能使用
    components: { ChartsPagesLayout },
    props: {},
    setup(props, context) {
        const dateVal = ref([yesterDay, nowDate]);
        const chartsOptions = ref({});
        const params = computed(() => ({
            starttime: unref(dateVal)[0],
            endtime: unref(dateVal)[1],
            stcd: props.info.stcd,
            sort: "tm",
            order: "asc"
        }));

        const executeQuery = async (params) => {
            context.emit("loadStart");
            const data = await getRiverDataList(params);
            chartsOptions.value = {
                ...handlerDatasetOptions(testOptions, data),
            };
            context.emit("loadEnd");
        };

        const reset = async () => {
            dateVal.value = [yesterDay, nowDate];

            await executeQuery(unref(params));
        };

        onMounted(async () => {
            await executeQuery(unref(params));
        });

        return {
            dateVal,
            executeQuery,
            params,
            RenderBarChart,
            reset,
            chartsOptions,
        };
    },
};
</script>
<style lang='scss' scoped>
@import "~@/assets/style/tab-select-body.scss";
</style>
