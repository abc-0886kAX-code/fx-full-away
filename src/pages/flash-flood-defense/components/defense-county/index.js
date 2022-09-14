/*
 * @FilePath: \3D防汛作战\src\pages\flash-flood-defense\components\defense-county\index.js
 * @Author: zhangyang
 * @Date: 2022-08-03 10:44:05
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-08-03 10:45:24
 * @Description: 
 */
import DefenseCounty from './defense-county.vue';

DefenseCounty.install = function (Vue) {
    Vue.component(DefenseCounty.name, DefenseCounty);
};

export default DefenseCounty;
