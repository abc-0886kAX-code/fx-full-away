/*
 * @Author: maggot-code
 * @Date: 2022-05-27 17:00:02
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-05-27 17:00:37
 * @Description: file content
 */
import RainfallForecastQuery from './rainfall-forecast-query.vue';

RainfallForecastQuery.install = function (Vue) {
    Vue.component(RainfallForecastQuery.name, RainfallForecastQuery);
};

export default RainfallForecastQuery;