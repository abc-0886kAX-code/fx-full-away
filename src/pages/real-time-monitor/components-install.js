/*
 * @Author: zhangxin
 * @Date: 2022-05-19 14:47:32
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-08 13:36:34
 * @Description: 
 */
import { default as RealTimeMonitorDefault } from './components/real-time-monitor-default';
import { default as RealTimeMonitorDefaultMap } from './components/real-time-monitor-default-map';
import { default as RealTimeRainfall } from './components/real-time-rainfall';
import { default as RealTimeRainfallIsosurface } from "./components/real-time-rainfall-isosurface";
import { default as RealTimeReservoirHydrological } from './components/real-time-reservoir-hydrological';
import { default as RealTimeRiverHydrological } from './components/real-time-river-hydrological';
import { default as RealTimeVideoSurveillance } from './components/real-time-video-surveillance';

const components = [
    RealTimeMonitorDefault,
    RealTimeMonitorDefaultMap,
    RealTimeRainfallIsosurface,
    RealTimeRainfall,
    RealTimeReservoirHydrological,
    RealTimeRiverHydrological,
    RealTimeVideoSurveillance,
];

// 定义 install 方法
const installs = function (Vue) {
    if (installs.installed) return
    installs.installed = true
    // 遍历注册所有控件
    components.map(component => Vue.component(component.name, component))
}

// 检测到 Vue 才执行，毕竟我们是基于 Vue 的
if (typeof window !== 'undefined' && window.Vue) {
    installs(window.Vue)
}

export const componentsInstall = {}
components.forEach(item => {
    componentsInstall[item.name] = item;
});

export default {
    installs
}
