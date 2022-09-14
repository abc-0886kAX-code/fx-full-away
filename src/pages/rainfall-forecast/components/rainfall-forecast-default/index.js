/*
 * @Author: zhangxin
 * @Date: 2022-05-19 14:45:44
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-15 17:37:58
 * @Description: 
 */
import RainfallForecastDefault from './rainfall-forecast-default.vue';

RainfallForecastDefault.install = function (Vue) {
    Vue.component(RainfallForecastDefault.name, RainfallForecastDefault);
};

export default RainfallForecastDefault;
