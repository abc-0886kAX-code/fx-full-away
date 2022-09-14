/*
 * @Author: zhangxin
 * @Date: 2022-05-19 14:45:44
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-21 16:26:20
 * @Description: 
 */
import RealTimeMonitorDefault from './real-time-monitor-default.vue';

RealTimeMonitorDefault.install = function (Vue) {
    Vue.component(RealTimeMonitorDefault.name, RealTimeMonitorDefault);
};

export default RealTimeMonitorDefault;
