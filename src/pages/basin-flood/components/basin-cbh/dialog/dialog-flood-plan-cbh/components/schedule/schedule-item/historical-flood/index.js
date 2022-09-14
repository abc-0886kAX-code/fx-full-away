/*
 * @Author: zhangxin
 * @Date: 2022-04-14 11:19:13
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-04-14 13:30:59
 * @Description: 
 */

import HistoricalFlood from './historical-flood.vue';

/* istanbul ignore next */
HistoricalFlood.install = function (Vue) {
    Vue.component(HistoricalFlood.name, HistoricalFlood);
};

export default HistoricalFlood;


