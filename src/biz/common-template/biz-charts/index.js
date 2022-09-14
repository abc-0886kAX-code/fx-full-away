/*
 * @Author: zhangyang
 * @Date: 2022-02-14 09:18:44
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-02-14 09:19:51
 * @Description: file content
 */
import BizCharts from './src/charts.vue';

/* istanbul ignore next */
BizCharts.install = function (Vue) {
    Vue.component(BizCharts.name, BizCharts);
};

export default BizCharts;