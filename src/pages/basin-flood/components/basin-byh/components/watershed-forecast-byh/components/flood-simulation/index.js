/*
 * @Author: zhangxin
 * @Date: 2022-06-17 14:57:56
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-20 16:51:45
 * @Description: 
 */
import FloodSimulation from './flood-simulation.vue';

/* istanbul ignore next */
FloodSimulation.install = function (Vue) {
    Vue.component(FloodSimulation.name, FloodSimulation);
};

export default FloodSimulation;