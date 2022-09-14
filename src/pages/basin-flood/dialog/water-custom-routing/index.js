/*
 * @Author: zhangxin
 * @Date: 2022-07-05 17:29:45
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-05 17:33:21
 * @Description: 
 */
/* istanbul ignore next */
import WaterCustomRouting from './water-custom-routing.vue';

WaterCustomRouting.install = function (Vue) {
    Vue.component(WaterCustomRouting.name, WaterCustomRouting);
};

export default WaterCustomRouting;


