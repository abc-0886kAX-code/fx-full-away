/*
 * @Author: zhangxin
 * @Date: 2022-07-05 17:29:45
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-05 17:30:30
 * @Description: 
 */
/* istanbul ignore next */
import WaterRouting from './water-routing.vue';

WaterRouting.install = function (Vue) {
    Vue.component(WaterRouting.name, WaterRouting);
};

export default WaterRouting;


