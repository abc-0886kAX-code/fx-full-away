/*
 * @Author: zhangxin
 * @Date: 2022-05-19 14:45:44
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-05-23 13:52:05
 * @Description: 
 */
import RealTimeReservoirHydrological from './real-time-reservoir-hydrological.vue';

RealTimeReservoirHydrological.install = function (Vue) {
    Vue.component(RealTimeReservoirHydrological.name, RealTimeReservoirHydrological);
};

export default RealTimeReservoirHydrological;