<!--
 * @Author: zhangyang
 * @Date: 2022-02-14 09:18:54
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-06 16:45:31
 * @Description: file content
-->
<template>
    <div class="biz-controller-charts" v-loading="loading">
        <ytxd-empty v-if="chartVisable" class="biz-controller-charts-empty"></ytxd-empty>

        <div class="biz-controller-charts-body" ref="bizChart"></div>
    </div>
</template>

<script>
// 引入组件
import { default as YtxdEmpty } from "@/components/empty";
// 引入混合文件
import { default as EChartsMixins } from "@/mixins/echarts.mixins";
// 引入工具
import { RenderBarChart } from "@/plugins/charts";
// 引入数据源
// import TestChartData from "@/assets/json/test-chart.json";
// import TestChartData from "@/assets/json/test-chart2.json";
// import TestChartData from "@/assets/json/test-chart3.json";

const ChartSchema = {
    xAxis: [
        {
            field: "tm",
            name: "日期",
        },
    ],
    yAxis: [
        {
            type: "line",
            field: "w",
            name: "库容",
            unit: "万m³",
            position: "left",
            offset: 0,
        },
        {
            type: "line",
            field: "rz",
            name: "水位",
            unit: "m",
            position: "right",
            offset: 0,
        },
    ],
};

const setChartLabel = (item) => {
    const { name, unit } = item;

    return `${name}(${unit})`;
};
const setXAxis = (item) => {
    return {
        type: "category",
    };
};

const setYAxis = (item) => {
    const { position, offset, unit } = item;

    return {
        type: "value",
        name: setChartLabel(item),
        position,
        offset,
        min: ({ min }) => (min <= 0 ? 0 : min),
        max: ({ max }) => max,
        splitLine: false,
        axisLabel: {
            formatter: `{value} ${unit}`,
        },
    };
};

const setSeries = (item) => {
    const { type } = item;

    return {
        name: setChartLabel(item),
        type,
        showSymbol: false,
    };
};

const setField = (item) => {
    const { field } = item;

    return field;
};

export default {
    name: "biz-controller-charts",
    mixins: [EChartsMixins],
    components: {
        YtxdEmpty,
    },
    props: {},
    data() {
        //这里存放数据
        return {};
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        install() {
            this.chartStruct(ChartSchema);

            this.handlerFinally();
        },
        chartStruct(schema) {
            const { xAxis, yAxis } = schema;
            const options = {
                legend: {
                    data: yAxis.map(setChartLabel),
                },
                dataZoom: {
                    show: true,
                    start: 0,
                    end: 100,
                },
                dataset: {
                    dimensions: [
                        ...xAxis.map(setField),
                        ...yAxis.map(setField),
                    ],
                },
                xAxis: xAxis.map(setXAxis),
                yAxis: yAxis.map(setYAxis),
                series: yAxis.map(setSeries),
            };

            return options;
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() { },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.$nextTick(this.install);
    },
    beforeCreate() { }, //生命周期 - 创建之前
    beforeMount() { }, //生命周期 - 挂载之前
    beforeUpdate() { }, //生命周期 - 更新之前
    updated() { }, //生命周期 - 更新之后
    beforeDestroy() { }, //生命周期 - 销毁之前
    destroyed() { }, //生命周期 - 销毁完成
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
.biz-controller-charts {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;

    &-body {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    &-empty {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%);
        z-index: 102;
    }
}
</style>
