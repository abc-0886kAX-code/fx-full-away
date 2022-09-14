/*
 * @Author: zhangxin
 * @Date: 2022-04-28 16:35:45
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-05 18:45:47
 * @Description: 
 */
import { default as ChartsPagesLayoutNew } from './charts-pages-layout-new.vue';

/* istanbul ignore next */
ChartsPagesLayoutNew.install = function (Vue) {
    Vue.component(ChartsPagesLayoutNew.name, ChartsPagesLayoutNew);
};

export default ChartsPagesLayoutNew;