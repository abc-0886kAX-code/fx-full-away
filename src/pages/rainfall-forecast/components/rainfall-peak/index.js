/*
 * @Author: maggot-code
 * @Date: 2022-05-23 14:08:52
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-05-23 14:10:23
 * @Description: file content
 */
import RainfallPeak from './rainfall-peak.vue';

RainfallPeak.install = function (Vue) {
    Vue.component(RainfallPeak.name, RainfallPeak);
};

export default RainfallPeak;