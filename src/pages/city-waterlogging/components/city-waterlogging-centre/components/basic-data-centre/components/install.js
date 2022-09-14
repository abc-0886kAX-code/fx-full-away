/*
 * @Author: zhangxin
 * @Date: 2022-06-30 10:39:55
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-30 10:43:28
 * @Description: 
 */
import { default as HistoryPondingPoint } from './history-ponding-point.vue';
import { default as PondingPoint } from './ponding-point.vue';
import { default as SpongePondingPoint } from './sponge-ponding-point.vue';

const components = [
    PondingPoint,
    SpongePondingPoint,
    HistoryPondingPoint
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

export const selectListInstall = {}
components.forEach(item => {
    selectListInstall[item.name] = item;
});

export default {
    installs
}