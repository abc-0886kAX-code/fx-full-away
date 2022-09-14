/*
 * @FilePath: \3D防汛作战\src\components\tree-legend\index.js
 * @Author: zhangyang
 * @Date: 2022-06-22 13:43:09
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-22 13:43:38
 * @Description: 
 */
import TreeLegend from './tree-legend.vue';

/* istanbul ignore next */
TreeLegend.install = function (Vue) {
    Vue.component(TreeLegend.name, TreeLegend);
};

export default TreeLegend;
