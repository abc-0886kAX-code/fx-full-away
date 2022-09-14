<!--
 * @Author: zhangxin
 * @Date: 2022-05-19 14:45:32
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-08-04 11:32:33
 * @Description: 
-->
<template>
    <div class="basin-flood-default" @mouseover="mouseover" @mouseleave="mouseleave" v-loading="loading" v-bind="loadStyle">
        <charts-pages-layout :key="key" :chartsRnder="RenderBarChart" :chartsOptions="chartsOptions" :isSelect="false">
        </charts-pages-layout>
    </div>
</template>

<script>
import { useSocketMessage, SOCKET_MESSAGE_FLOODWATER } from "@/biz/Socket";
import { onMounted, unref, computed } from "@vue/composition-api";
import { getBasinFloodChartsList } from "../../api/basin-flood.api";
import { useEchartsRotation } from "./useEchartsRotation";
import ChartsPagesLayout from "@/components/charts-pages-layout";
import { RenderBarChart } from "@/plugins/charts";
import { Load } from "@/biz/share/entify/Load";
import format from "date-fns/format";

const setupOptions = (data) => {
    const [first] = data ?? [{ stnm: "未知站点" }];
    const firstName = `${first.stnm}(流量)`;
    const secondName = `${first.stnm}(水位)`;
    return {
        grid: {
            top: "20%",
            left: "4%",
            right: "4%",
            bottom: "5%",
            containLabel: true
        },
        toolbox: {
            top: "20",
            feature: {
                mark: {
                    show: false
                },
                dataView: {
                    show: false,
                    readOnly: false
                },
                magicType: {
                    show: false
                },
                restore: {
                    show: false
                },
                saveAsImage: {
                    show: false
                }
            }
        },

        legend: {
            type: "scroll",
            width: 280,
            top: "0",
            data: [firstName, secondName],
            textStyle: {
                color: "#fff"
            }
        },
        dataset: {
            dimensions: ["riverdate", "q", "z"],
            source: data
        },
        xAxis: [
            {
                type: "category",
                axisLabel: {
                    color: "#fff",
                    formatter: (value) => format(new Date(value), "HH")
                }
            }
        ],
        dataZoom: [
            {
                start: 0,
                end: 100,
                zoomOnMouseWheel: true,
                type: "inside"
            },
            {
                type: "slider",
                start: 0,
                end: 100,
                show: false
            }
        ],
        yAxis: [
            {
                type: "value",
                name: "流量(m³/s)",
                nameTextStyle: {
                    padding: [0, 0, 0, 20], // 四个数字分别为上右下左与原位置距离
                    color: "#fff"
                },
                position: "left",
                axisLabel: {
                    color: "#fff",
                    formatter: "{value}"
                },
                splitLine: {
                    show: false
                }
            },
            {
                type: "value",
                name: "水位(m)",
                position: "right",
                nameTextStyle: {
                    padding: [0, 0, 0, 10], // 四个数字分别为上右下左与原位置距离
                    color: "#fff"
                },
                axisLabel: {
                    color: "#fff",
                    formatter: "{value}"
                },
                splitLine: {
                    show: false
                }
            }
        ],
        series: [
            {
                name: firstName,
                type: "line",
                yAxisIndex: 0
            },
            {
                name: secondName,
                type: "line",
                yAxisIndex: 1
            }
        ]
    };
};

export default {
    name: "basin-flood-default",
    //混入
    mixins: [],
    //import引入的组件需要注入到对象中才能使用
    components: { ChartsPagesLayout },
    props: {},
    setup() {
        const { setupSocketMessage } = useSocketMessage();

        const { loading, loadStyle, setupLoading } = Load();

        const { key, setupBaseList, currentDatasouce, datasouceLength, initIndexcache, setupStartTime, setupClearTime } =
            useEchartsRotation();

        const executeQuery = async () => {
            setupLoading(true);
            const data = await getBasinFloodChartsList({ TM: "" });
            setupBaseList(data);
            initIndexcache();
            setupStartTime();
        };

        const chartsOptions = computed(() => {
            return setupOptions(unref(currentDatasouce));
        });

        const mouseover = () => {
            // 计时器关闭
            setupClearTime();
        };

        const mouseleave = () => {
            // 计时器开启
            if (process.env.NODE_ENV === "production" && unref(datasouceLength) > 1) {
                setupStartTime();
            }
        };

        setupSocketMessage(SOCKET_MESSAGE_FLOODWATER, () => {
            executeQuery().finally(setupLoading);
        });
        onMounted(async () => {
            executeQuery().finally(setupLoading);
        });

        return {
            loading,
            loadStyle,
            executeQuery,
            RenderBarChart,
            chartsOptions,
            mouseover,
            mouseleave,
            key
        };
    }
};
</script>
<style lang='scss' scoped>
@import "./basin-flood-default.scss";
</style>
