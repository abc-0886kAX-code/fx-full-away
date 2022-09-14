/*
 * @Author: zhangyang
 * @Date: 2021-05-11 17:10:50
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-05-11 17:26:12
 * @Description: file content
 */
import LegendPrediction from './legend-prediction.vue';

/* istanbul ignore next */
LegendPrediction.install = function (Vue) {
    Vue.component(LegendPrediction.name, LegendPrediction);
};

export default LegendPrediction;