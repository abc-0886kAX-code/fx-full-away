/*
 * @Author: zhangxin
 * @Date: 2022-04-28 16:35:45
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-05-24 20:02:01
 * @Description: 
 */
import { default as ChartsPagesLayout } from './charts-pages-layout.vue';

/* istanbul ignore next */
ChartsPagesLayout.install = function (Vue) {
    Vue.component(ChartsPagesLayout.name, ChartsPagesLayout);
};

export default ChartsPagesLayout;