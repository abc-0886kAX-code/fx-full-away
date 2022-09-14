<!--
 * @Author: zhangxin
 * @Date: 2022-05-19 14:45:32
 * @LastEditTime: 2022-07-20 10:48:32
-->
<template>
    <div
        class="rainfall-forecast-default-map"
        v-loading="loading"
        v-bind="loadStyle"
    >
        <charts-pages-layout
            class="dialog-body"
            :chartsRnder="RenderBarChart"
            :chartsOptions="chartsOptions"
            :isSelect="false"
        ></charts-pages-layout>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { useSocketMessage, SOCKET_MESSAGE_PREDICTION } from "@/biz/Socket";
import { useMars3d } from "@/biz/Mars3D/usecase/useMars3D";
import { usePolygonGrid } from "@/biz/Mars3D/usecase/usePolygonGrid";
import { useRainForecastMap } from "@/biz/Mars3D/usecase/useRainForecastMap";
import { usePlaySliceControl } from "@/biz/PlaySlice/usecase/usePlaySliceControl";
import { usePlaySliceData } from "@/biz/PlaySlice/usecase/usePlaySliceData";
import { usePlaySliceTime } from "@/biz/PlaySlice/usecase/usePlaySliceTime";
import useUserLocation from "@/biz/User/usecase/useUserLocation";
import { getRainfallForecastMapData } from "@/pages/rainfall-forecast/api/prediction.api";
import store from "@/stroe";
import {
    computed,
    onBeforeUnmount,
    onMounted,
    ref,
    unref,
    watch,
} from "@vue/composition-api";

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
                // formatter: "{value} mm",
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

const setupLegendData = (data) => {
    const { color, colorLabel, date, title } = data;

    return {
        color,
        colorLabel,
        date,
        title,
    };
};

export default {
    name: "rainfall-forecast-default-map",
    //混入
    mixins: [],
    //import引入的组件需要注入到对象中才能使用
    components: {},
    props: {},
    setup() {
        const { setupSocketMessage } = useSocketMessage();
        const { mapview } = useMars3d();
        const { resetMapviewLocation } = useUserLocation(mapview);
        const { clearForecastLayer, setupForecastLayer, findForecastLayer } =
            useRainForecastMap(unref(mapview));

        const { setupShape } = usePolygonGrid(mapview);
        const { setupData, clearData } = usePlaySliceData(true);
        const { clearPlayMonitor, usePlayMonitor } = usePlaySliceControl({
            type: "geojson",
            findLayer: findForecastLayer,
        });

        const { loading, loadStyle, setupLoading } = Load();
        const chartsOptions = ref({});

        usePlaySliceTime();
        const params = computed(() => store.getters.queryParams);

        const setupLayerOptions = (data) => {
            const { id } = data;
            const shape = setupShape(data);
            return {
                ...shape,
                id,
                // show: false,
            };
        };

        const executeQuery = async () => {
            store.dispatch("_cancelTagRequest", "prediction");
            clearForecastLayer();
            clearData();
            clearPlayMonitor();

            setupLoading(true);
            const chartdata = await getRainfallForecastChartData(
                unref(params).starttime
            );
            chartsOptions.value = {
                ...handlerDatasetOptions(beasOptions, chartdata),
            };
            store.dispatch("_setupPlayLoad", true);
            const data = await setupData(() =>
                getRainfallForecastMapData(unref(params))
            );

            store.dispatch(
                "_setupLegendPredictionData",
                setupLegendData(data[0])
            );
            const shapes = data.map(setupLayerOptions);
            const layers = setupForecastLayer(shapes);
            resetMapviewLocation();
            usePlayMonitor();
            setupLoading(false);
            return [layers, data];
        };

        watch(() => unref(params), executeQuery);
        setupSocketMessage(SOCKET_MESSAGE_PREDICTION, executeQuery);
        onMounted(() => {
            store.dispatch("_setupComponentName", "rainfall-forecast-query");
            store.dispatch("_setupAcitve", true);
        });

        onBeforeUnmount(() => {
            store.dispatch("_setupComponentName", "");
            store.dispatch("_setupAcitve", false);
            clearForecastLayer();
            clearData();
            clearPlayMonitor();
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
@import "./rainfall-forecast-default-map.scss";
</style>
