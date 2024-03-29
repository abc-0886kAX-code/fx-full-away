/*
 * @Author: zhangxin
 * @Date: 2022-06-15 13:19:25
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-30 17:05:37
 * @Description: 
 */
import { default as BasicDataBYH } from './components/basic-data-byh';
import { default as FloodPlanBYH } from './components/flood-plan-byh';
import { default as HedgingTransferBYH } from './components/hedging-transfer-byh';
import { default as WatershedForecastBYH } from './components/watershed-forecast-byh';

const components = [
    BasicDataBYH,
    FloodPlanBYH,
    HedgingTransferBYH,
    WatershedForecastBYH
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

export const BasinjyhInstalls = {}
components.forEach(item => {
    BasinjyhInstalls[item.name] = item;
});

export default {
    installs
}