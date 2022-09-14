<!--
 * @Author: zhangxin
 * @Date: 2022-04-22 13:17:21
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-11 13:44:50
 * @Description: 
-->
<template>
    <div class="charts-pages-layout" v-loading="chartsLoading">
        <section class="echarts" :class="isSelect ? '' : 'echarts-all'">
            <div class="echarts-body" ref="chartsRefs" v-if="isData"></div>

            <ytxd-empty v-else :text="text"></ytxd-empty>
        </section>

        <section class="search-bar" v-if="isSelect">
            <slot name="select"> </slot>
        </section>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { useCharts } from "@/composables/useCharts";
import { RenderBarChart } from "@/plugins/charts";
export default {
    name: "charts-pages-layout",
    //混入
    mixins: [],
    //import引入的组件需要注入到对象中才能使用
    components: {},
    props: {
        isSelect: {
            type: Boolean,
            default: false,
        },
        text: {
            type: String,
            default: "暂无数据",
        },
        chartsRnder: {
            type: Function,
            default: RenderBarChart,
        },
        chartsOptions: {
            type: Object,
            default: () => {},
        },
    },
    setup(props, { emit }) {
        const { isData, chartsLoading, chartsRefs, chartsLoadEnd } =
            useCharts(props);

        emit("chartsLoadEnd", chartsLoadEnd());

        return {
            chartsRefs,
            chartsLoading,
            isData,
        };
    },
};
</script>
<style lang='scss' scoped>
@import "./index.scss";
</style>