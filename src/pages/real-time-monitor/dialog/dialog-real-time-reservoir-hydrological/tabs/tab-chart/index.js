/*
 * @Author: zhangxin
 * @Date: 2022-05-26 14:22:18
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-05-26 14:23:22
 * @Description: 
 */
import TabChart from './tab-chart.vue';

/* istanbul ignore next */
TabChart.install = function (Vue) {
    Vue.component(TabChart.name, TabChart);
};

export default TabChart;