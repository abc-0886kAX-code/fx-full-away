<!--
 * @Author: zhangxin
 * @Date: 2022-07-08 13:25:35
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-19 10:24:56
 * @Description: 降雨量对比图(保留)-左右两侧柱状图
-->
<template>
    <div class="rainfall-comparison-chart-retain">
        <div class="rainfall-comparison-chart-retain-select">
            <mg-form
                ref="searchRefs"
                proName="/radar-echo-map-query"
                :schema="searchFormSchema"
                :job="searchFormJob"
            >
                <template #form-button>
                    <el-button
                        plain
                        type="primary"
                        size="mini"
                        @click="handlerQuery"
                        >查询</el-button
                    >
                </template>
            </mg-form>
        </div>
        <div class="rainfall-comparison-chart-retain-body">
            <div style="width: 100%">
                <charts-pages-layout
                    :chartsRnder="RenderBarChart"
                    :chartsOptions="realTimeChartsOptions"
                    :isSelect="false"
                >
                </charts-pages-layout>
            </div>
            <div style="width: 100%">
                <charts-pages-layout
                    :chartsRnder="RenderBarChart"
                    :chartsOptions="forecastChartsOptions"
                    :isSelect="false"
                >
                </charts-pages-layout>
            </div>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { unref, onMounted, onBeforeUnmount, ref } from "@vue/composition-api";
import { useDatePickForm } from "@/pages/rainfall-forecast/components/radar-echo-map-query/useRadarEchoForm.js";
import { default as DialogContentMixins } from "@/mixins/dialog-content.mixins";
import { getForecastData, getRealTimeData } from "../../api/test.js";
import {
    RealTimeChartsOptions,
    ForecastChartsOptions,
} from "./echarts-options";
import { handlerDatasetOptions } from "@/utils/handler-charts-options";
import { RenderBarChart } from "@/plugins/charts";

const setupRealTimeCharts = (data) => {
    return handlerDatasetOptions(RealTimeChartsOptions, data);
};

const setupForecastCharts = (data) => {
    return handlerDatasetOptions(ForecastChartsOptions, data);
};

export default {
    name: "rainfall-comparison-chart-retain",
    //混入
    mixins: [DialogContentMixins],
    //import引入的组件需要注入到对象中才能使用
    components: {},
    props: {},
    setup(props, context) {
        const forecastChartsOptions = ref({});
        const realTimeChartsOptions = ref({});
        const form = useDatePickForm();

        const handlerQuery = async () => {
            context.emit("loadStart");
            const { data } = unref(form.searchRefs).formOutput();
            const params = {
                starttime: form.setupAnalysisValue(data).starttime,
                endtime: form.setupAnalysisValue(data).endtime,
            };

            const forecastData = await getForecastData(params);
            const realTimeData = await getRealTimeData(params);

            forecastChartsOptions.value = setupRealTimeCharts(realTimeData);

            realTimeChartsOptions.value = setupForecastCharts(forecastData);

            context.emit("loadEnd");
        };

        onMounted(() => {
            handlerQuery();
        });

        onBeforeUnmount(() => {});

        return {
            forecastChartsOptions,
            realTimeChartsOptions,
            RenderBarChart,
            handlerQuery,
            ...form,
        };
    },
};
</script>
<style lang='scss' scoped>
.rainfall-comparison-chart-retain {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    &-select {
        height: 15%;
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: space-evenly;
    }
    &-body {
        height: 85%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
    }
}
</style>