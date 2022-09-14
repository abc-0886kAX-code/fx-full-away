/*
 * @Author: zhangxin
 * @Date: 2022-06-15 13:19:25
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-17 14:03:05
 * @Description: 
 */
import { default as BasicDataDqh } from './components/basic-data-dqh';
import { default as FloodPlanDqh } from './components/flood-plan-dqh';
import { default as HedgingTransferDqh } from './components/hedging-transfer-dqh';
import { default as WatershedForecastDqh } from './components/watershed-forecast-dqh';

const components = [
    BasicDataDqh,
    FloodPlanDqh,
    HedgingTransferDqh,
    WatershedForecastDqh
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

export const BasinDqhInstalls = {}
components.forEach(item => {
    BasinDqhInstalls[item.name] = item;
});

export default {
    installs
}