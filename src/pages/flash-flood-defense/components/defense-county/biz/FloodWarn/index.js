/*
 * @FilePath: \3D防汛作战\src\pages\flash-flood-defense\components\defense-county\biz\FloodWarn\index.js
 * @Author: zhangyang
 * @Date: 2022-08-03 11:27:08
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-08-03 11:29:12
 * @Description: 
 */
import FloodWarn from "./view/index.vue";

FloodWarn.install = function (Vue) {
    Vue.component(FloodWarn.name, FloodWarn);
};
export default FloodWarn;
