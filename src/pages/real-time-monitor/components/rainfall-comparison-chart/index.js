/*
 * @Author: zhangxin
 * @Date: 2022-07-08 13:25:41
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-08 13:31:42
 * @Description: 
 */
import RainfallComparisonChart from "./rainfall-comparison-chart.vue";

/* istanbul ignore next */
RainfallComparisonChart.install = function (Vue) {
    Vue.component(RainfallComparisonChart.name, RainfallComparisonChart);
};

export default RainfallComparisonChart;