/*
 * @Author: zhangxin
 * @Date: 2022-06-17 14:57:56
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-04 16:25:40
 * @Description: 
 */
import IcmModelPrediction from './icm-model-prediction.vue';

/* istanbul ignore next */
IcmModelPrediction.install = function (Vue) {
    Vue.component(IcmModelPrediction.name, IcmModelPrediction);
};

export default IcmModelPrediction;