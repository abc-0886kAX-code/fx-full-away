/*
 * @Author: zhangxin
 * @Date: 2022-05-19 14:47:32
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-15 17:45:35
 * @Description: 
 */
import { default as RainfallForecastDefault } from './components/rainfall-forecast-default';
import { default as RainfallForecastDefaultMap } from './components/rainfall-forecast-default-map';
import { default as RainfallStart } from "./components/rainfall-start";
import { default as RainfallPeak } from "./components/rainfall-peak";
import { default as RainfallPileup } from "./components/rainfall-pileup";
import { default as RainfallMaxHour } from "./components/rainfall-max-hour";
import { default as RainfallAverageHour } from "./components/rainfall-average-hour";
import { default as RadarEchoMap } from "./components/radar-echo-map";


const components = [
    RainfallForecastDefault,
    RainfallForecastDefaultMap,
    RainfallStart,
    RainfallPeak,
    RainfallPileup,
    RainfallMaxHour,
    RainfallAverageHour,
    RadarEchoMap
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
    installs,
    RainfallAverageHour
}
