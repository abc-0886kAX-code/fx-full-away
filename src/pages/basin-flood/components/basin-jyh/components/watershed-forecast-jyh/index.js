/*
 * @Author: zhangxin
 * @Date: 2022-06-15 13:16:20
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-17 13:59:46
 * @Description: 
 */
import WatershedForecastJYH from './watershed-forecast-jyh.vue';

WatershedForecastJYH.install = function (Vue) {
    Vue.component(WatershedForecastJYH.name, WatershedForecastJYH);
};

export default WatershedForecastJYH;