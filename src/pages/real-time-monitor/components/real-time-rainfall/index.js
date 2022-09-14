/*
 * @Author: zhangxin
 * @Date: 2022-05-19 14:45:44
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-05-23 13:50:52
 * @Description: 
 */
import RealTimeRainfall from './real-time-rainfall.vue';

RealTimeRainfall.install = function (Vue) {
    Vue.component(RealTimeRainfall.name, RealTimeRainfall);
};

export default RealTimeRainfall;