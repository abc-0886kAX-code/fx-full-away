/*
 * @Author: zhangxin
 * @Date: 2022-05-19 14:45:44
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-06 17:21:45
 * @Description: 
 */
import RainfallEvents from './rainfall-events.vue';

RainfallEvents.install = function (Vue) {
    Vue.component(RainfallEvents.name, RainfallEvents);
};

export default RainfallEvents;