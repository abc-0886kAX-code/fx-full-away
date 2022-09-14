/*
 * @Author: zhangxin
 * @Date: 2022-05-19 14:47:32
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-08-08 13:37:10
 * @Description: 
 */
import { default as FlashFloodDefenseDefault } from './components/flash-flood-defense-default';
import { default as FlashFloodDefenseTable } from "./components/flash-flood-defense-table";
import { default as DefenseCounty } from "./components/defense-county";

const components = [
    FlashFloodDefenseDefault,
    FlashFloodDefenseTable,
    DefenseCounty,
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
    installs
}
