/*
 * @Author: maggot-code
 * @Date: 2022-05-26 17:42:55
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-05-26 17:47:56
 * @Description: file content
 */
import RainfallLegend from './rainfall-legend.vue';

RainfallLegend.install = function (Vue) {
    Vue.component(RainfallLegend.name, RainfallLegend);
};

export * from "./useLegend";
export default RainfallLegend;