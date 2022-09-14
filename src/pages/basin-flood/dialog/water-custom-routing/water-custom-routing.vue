<!--
 * @Author: zhangxin
 * @Date: 2022-07-05 17:28:17
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-05 21:33:44
 * @Description: 
-->
<template>
    <div class="water-custom-routing">
        <div class="water-custom-routing-info">
            <div class="water-custom-routing-info-brief">
                <briefing :dataStructure="dataStructure"></briefing>
            </div>
            <div class="water-custom-routing-info-chart">
                <charts-pages-layout-new class="dialog-body" :chartsRnder="RenderBarChart"
                    :chartsOptions="chartsOptions" :isSelect="false">
                </charts-pages-layout-new>
            </div>
        </div>

        <div class="water-custom-routing-form">
            <mg-form ref="formRefs" :schema="formSchema" v-loading="formLoad" v-bind="loadStyle">
                <template #form-button>
                    <el-button plain type="primary" @click="handlerStartup">计算</el-button>
                    <el-button plain type="primary" @click="resetForm">重置</el-button>
                </template>
            </mg-form>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import DialogContentMixins from "@/mixins/dialog-content.mixins";
import { default as Briefing } from "@/components/briefing";
import { RenderBarChart } from "@/plugins/charts";
import { unref, computed, ref } from "@vue/composition-api";
import ChartsPagesLayoutNew from "@/components/charts-pages-layout-new";
import {
    calculuSchemaJson,
    setup24HourRainfall,
    usecalculus,
} from "./useCalculus";

const setupChartsOptions = (data) => {
    const { flows, rains } = data;

    const flowsData = flows.map((item) => {
        return item.q;
    });

    const rainsX = flows.map((item) => {
        return item.flowid;
    });

    const rainsData = rains.map((item) => {
        return item.r;
    });

    return {
        color: [
            "#c20606",
            "#4472c4",
            "#F25A0E",
            "#28D97E",
            "#0666BA",
            "#FCF300",
            "#9B2CF8",
        ],
        grid: {
            top: "10%",
            bottom: "25%",
            left: "16%",
            right: "12%",
            // containLabel: false,
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
            top: "40",
            right: "80",
            itemWidth: 30,
            itemHeight: 20,
            fontSize: 24,
            data: ["流量", "降雨量"],
            textStyle: {
                color: "#fff",
            },
        },
        xAxis: [
            {
                type: "category",
                name: "时段",
                nameRotate: 0, //字体旋转角度
                nameGap: 30, //与坐标轴的距离
                nameLocation: "middle", //在坐标轴的什么位置
                nameTextStyle: {
                    color: "#fff",
                },
                position: "bottom",
                axisLabel: {
                    color: "#fff",
                },
                data: rainsX,
            },
            {
                type: "category",
                position: "top",
                axisLabel: {
                    color: "#fff",
                    formatter: "",
                },
                data: rainsX,
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
        yAxis: [
            {
                type: "value",
                name: "流量(m³/s)",
                nameRotate: 90,
                nameGap: 50,
                nameLocation: "middle",
                nameTextStyle: {
                    color: "#fff",
                },
                offset: 20,
                axisLabel: {
                    color: "#fff",
                },
                splitLine: {
                    show: false,
                },
                max: ({ max }) => {
                    return Math.floor(max * 1.8);
                },
                min: () => {
                    return 0;
                }
            },
            {
                type: "value",
                name: "降雨量(mm)",
                nameRotate: 90,
                nameGap: 50,
                nameLocation: "middle",
                nameTextStyle: {
                    color: "#fff",
                },
                offset: 10,
                inverse: true,
                axisLabel: {
                    color: "#fff",
                },
                splitLine: {
                    show: false,
                },
                max: ({ max }) => {
                    return Math.floor(max * 1.8);
                },
                min: () => {
                    return 0;
                }
            },
        ],
        series: [
            {
                name: "流量",
                type: "line",
                yAxisIndex: 0,
                data: flowsData,
            },
            {
                name: "降雨量",
                type: "bar",
                barWidth: 3, //柱子宽度
                yAxisIndex: 1,
                data: rainsData,
            },
        ],
    };
};

export default {
    name: "water-custom-routing",
    //混入
    mixins: [DialogContentMixins],
    //import引入的组件需要注入到对象中才能使用
    components: { Briefing, ChartsPagesLayoutNew },
    props: {},
    setup(props) {
        const {
            loadStyle,
            formLoad,
            formRefs,
            formSchema,
            resetForm,
            startupCalculus,
        } = usecalculus(setup24HourRainfall(calculuSchemaJson), props);

        const chartsOptions = ref(
            setupChartsOptions({
                flows: [],
                rains: [],
            })
        );
        const flood_peakRef = ref("0");
        const floodRef = ref("0");
        const maxtmRef = ref("0");
        const dataStructure = computed(() => {
            return {
                label: "模拟结果",
                listData: [
                    {
                        field: "flood_peak",
                        label: "洪峰流量",
                        value: unref(flood_peakRef),
                        handler: (value) => `${value} (m³/s)`,
                    },
                    {
                        field: "flood",
                        label: "洪水总量",
                        value: unref(floodRef),
                        handler: (value) => `${value} (万m³)`,
                    },
                    {
                        field: "maxtm",
                        label: "峰现时间",
                        value: unref(maxtmRef),
                        handler: (value) => `${value} (时)`,
                    },
                ],
            };
        });
        const setupDataStructure = (response) => {
            const { flood_peak, flood, maxtm } = response;
            flood_peakRef.value = `${flood_peak}`;
            floodRef.value = `${flood}`;
            maxtmRef.value = `${maxtm}`;
        };

        async function handlerStartup() {
            const [response] = await startupCalculus();
            chartsOptions.value = setupChartsOptions(response);
            setupDataStructure(response);
        }

        return {
            loadStyle,
            formLoad,
            formRefs,
            formSchema,
            resetForm,
            handlerStartup,

            dataStructure,
            RenderBarChart,
            chartsOptions,
        };
    },
};
</script>
<style lang='scss' scoped>
.water-custom-routing {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    overflow: hidden;

    &-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        overflow: hidden;

        &-brief {
            width: 100%;
            height: auto;
            min-height: 40%;
            overflow-x: hidden;
            overflow-y: auto;
        }

        &-chart {
            width: 100%;
            height: 60%;
            overflow: hidden;
        }
    }

    &-form {
        flex: 1;
        height: auto;
        min-height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }
}

/deep/.el-form-item__label {
    color: #fff;
}
</style>
