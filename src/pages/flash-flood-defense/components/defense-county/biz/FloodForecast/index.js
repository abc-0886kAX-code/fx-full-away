/*
 * @FilePath: \3D防汛作战\src\pages\flash-flood-defense\components\defense-county\biz\FloodForecast\index.js
 * @Author: zhangyang
 * @Date: 2022-08-03 11:26:06
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-08-03 11:29:17
 * @Description: 
 */
import FloodForecast from "./view/index.vue";

FloodForecast.install = function (Vue) {
    Vue.component(FloodForecast.name, FloodForecast);
};
export default FloodForecast;
