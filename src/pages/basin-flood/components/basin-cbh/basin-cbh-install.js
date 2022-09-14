/*
 * @Author: zhangxin
 * @Date: 2022-06-15 13:19:25
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-17 14:03:05
 * @Description: 
 */
import { default as BasicDataCBH } from './components/basic-data-cbh';
import { default as FloodPlanCBH } from './components/flood-plan-cbh';
import { default as HedgingTransferCBH } from './components/hedging-transfer-cbh';
import { default as WatershedForecastCBH } from './components/watershed-forecast-cbh';

const components = [
    BasicDataCBH,
    FloodPlanCBH,
    WatershedForecastCBH,
    HedgingTransferCBH
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

export const BasinCBHInstalls = {}
components.forEach(item => {
    BasinCBHInstalls[item.name] = item;
});

export default {
    installs
}