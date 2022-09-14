/*
 * @Author: zhangxin
 * @Date: 2022-05-19 14:45:44
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-05-23 13:53:08
 * @Description: 
 */
import RealTimeVideoSurveillance from './real-time-video-surveillance.vue';

RealTimeVideoSurveillance.install = function (Vue) {
    Vue.component(RealTimeVideoSurveillance.name, RealTimeVideoSurveillance);
};

export default RealTimeVideoSurveillance;