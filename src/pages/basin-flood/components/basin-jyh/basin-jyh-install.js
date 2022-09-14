/*
 * @Author: zhangxin
 * @Date: 2022-06-15 13:19:25
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-17 14:03:05
 * @Description: 
 */
import { default as BasicDataJYH } from './components/basic-data-jyh';
import { default as FloodPlanJYH } from './components/flood-plan-jyh';
import { default as HedgingTransferJYH } from './components/hedging-transfer-jyh';
import { default as WatershedForecastJYH } from './components/watershed-forecast-jyh';

const components = [
    BasicDataJYH,
    FloodPlanJYH,
    HedgingTransferJYH,
    WatershedForecastJYH
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