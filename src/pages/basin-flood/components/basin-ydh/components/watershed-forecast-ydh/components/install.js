/*
 * @Author: zhangxin
 * @Date: 2022-06-20 16:50:50
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-20 16:53:14
 * @Description: 
 */
import { default as FloodSimulation } from './flood-simulation';
import { default as RainfallSite } from './rainfall-site';
const components = [
    RainfallSite,
    FloodSimulation
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