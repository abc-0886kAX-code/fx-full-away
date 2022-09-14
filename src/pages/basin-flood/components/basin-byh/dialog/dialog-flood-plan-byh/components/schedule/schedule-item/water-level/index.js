/*
 * @Author: zhangxin
 * @Date: 2022-04-14 11:19:13
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-04-14 11:19:58
 * @Description: 
 */

import WaterLevel from './water-level.vue';

/* istanbul ignore next */
WaterLevel.install = function (Vue) {
    Vue.component(WaterLevel.name, WaterLevel);
};

export default WaterLevel;


