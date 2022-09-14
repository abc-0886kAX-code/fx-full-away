/*
 * @Author: zhangxin
 * @Date: 2022-05-19 14:45:44
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-05-23 13:52:39
 * @Description: 
 */
import RealTimeRiverHydrological from './real-time-river-hydrological.vue';

RealTimeRiverHydrological.install = function (Vue) {
    Vue.component(RealTimeRiverHydrological.name, RealTimeRiverHydrological);
};

export default RealTimeRiverHydrological;