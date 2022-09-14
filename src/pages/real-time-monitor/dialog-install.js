/*
 * @Author: zhangxin
 * @Date: 2022-05-23 15:21:34
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-05-23 15:34:50
 * @Description: 
 */
import { default as DialogRealTimeRainfall } from './dialog/dialog-real-time-rainfall';
import { default as DialogRealTimeReservoirHydrological } from './dialog/dialog-real-time-reservoir-hydrological';
import { default as DialogRealTimeRiverHydrological } from './dialog/dialog-real-time-river-hydrological';
import { default as DialogRealTimeVideoSurveillance } from './dialog/dialog-real-time-video-surveillance';

const components = [
    DialogRealTimeRainfall,
    DialogRealTimeReservoirHydrological,
    DialogRealTimeRiverHydrological,
    DialogRealTimeVideoSurveillance
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

export const dialogsInstall = {}
components.forEach(item => {
    dialogsInstall[item.name] = item;
});

export default {
    installs
}