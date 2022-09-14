/*
 * @Author: zhangxin
 * @Date: 2022-06-15 13:16:20
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-17 13:59:46
 * @Description: 
 */
import WatershedForecastCBH from './watershed-forecast-cbh.vue';

WatershedForecastCBH.install = function (Vue) {
    Vue.component(WatershedForecastCBH.name, WatershedForecastCBH);
};

export default WatershedForecastCBH;