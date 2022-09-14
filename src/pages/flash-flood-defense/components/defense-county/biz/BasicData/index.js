/*
 * @FilePath: \3D防汛作战\src\pages\flash-flood-defense\components\defense-county\biz\BasicData\index.js
 * @Author: zhangyang
 * @Date: 2022-08-03 11:24:19
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-08-03 11:29:22
 * @Description: 
 */
import BasicData from "./view/index.vue";

BasicData.install = function (Vue) {
    Vue.component(BasicData.name, BasicData);
};
export default BasicData;
