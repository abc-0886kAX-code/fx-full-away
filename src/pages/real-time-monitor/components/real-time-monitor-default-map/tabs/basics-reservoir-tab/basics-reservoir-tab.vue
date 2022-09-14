<!--
 * @Author: zhangxin
 * @Date: 2022-05-19 15:13:50
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-28 17:21:50
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
import { useMars3d } from "@/biz/Mars3D/usecase/useMars3D";
import { useLayer } from "@/biz/Mars3D/usecase/useLayer";
import { useLocation } from "@/biz/Mars3D/usecase/useLocation";
import { setupBillboardShape } from "@/biz/Mars3D/usecase/useBillboard";
import { graphic } from "mars3d";
import format from "date-fns/format";
import shuiku from "@/assets/icon/ssjc-shuiku.png";

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

const tableColumn = [
    {
        field: "stnm",
        label: "水库名称",
    },
];

const { BillboardEntity } = graphic;

const setupFloat = (target) => {
    const { attr } = target.graphic;
    return tableColumn.map((item) => {
        const { label, field } = item;
        return {
            label,
            field,
            text: attr[field] ?? "--",
        };
    });
};

const setupRoundPoint = (source) => {
    const { lgtd: longitude, lttd: latitude, stnm: name, stcd: id } = source;

    const shape = setupBillboardShape({
        longitude,
        latitude,
        image: shuiku,
    });

    return new BillboardEntity({
        name,
        id,
        attr: {
            ...source,
            dialogName: "dialog-real-time-reservoir-hydrological",
            setupFloat,
        },
        ...shape,
    });
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
        const { mapview } = useMars3d();
        const { gather } = useLayer(mapview);
        const { find, clear, lockPosition } = useLocation(
            unref(gather).HomePointLayer
        );
        const layer = find();
        const chartsOptions = ref({});
        const executeQuery = async (params) => {
            context.emit("loadStart");
            const data = await getSSJCList({ stcd: params });
            chartsOptions.value = {
                ...handlerDatasetOptions(beasOptions(data), data),
            };
            context.emit("loadEnd");
            const points = [data[0]].map(setupRoundPoint);
            clear();
            layer.addGraphic(points);
            // layer.flyTo();
            return { data, points };
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
