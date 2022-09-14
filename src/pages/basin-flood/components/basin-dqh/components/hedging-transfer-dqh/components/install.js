import { default as PreventionMaterial } from './prevention-material';
import { default as PreventionRanks } from './prevention-ranks';
import { default as PreventionTransfer } from './prevention-transfer';
import { default as RescueRanks } from './rescue-ranks';
import { default as WaterConservancyRanks } from './water-conservancy-ranks';


const components = [
    PreventionTransfer,
    PreventionMaterial,
    RescueRanks,
    WaterConservancyRanks,
    PreventionRanks
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

export const CheckTreeInstall = {};
components.forEach(item => {
    CheckTreeInstall[item.name] = item;
});

export default {
    installs
}