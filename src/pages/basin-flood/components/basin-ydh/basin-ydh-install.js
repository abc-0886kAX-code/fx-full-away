/*
 * @Author: zhangxin
 * @Date: 2022-06-15 13:19:25
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-17 14:03:05
 * @Description: 
 */
import { default as BasicDataYdh } from './components/basic-data-ydh';
import { default as FloodPlanYdh } from './components/flood-plan-ydh';
import { default as HedgingTransferYdh } from './components/hedging-transfer-ydh';
import { default as WatershedForecastYdh } from './components/watershed-forecast-ydh';

const components = [
    BasicDataYdh,
    FloodPlanYdh,
    HedgingTransferYdh,
    WatershedForecastYdh
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

export const BasinYdhInstalls = {}
components.forEach(item => {
    BasinYdhInstalls[item.name] = item;
});

export default {
    installs
}