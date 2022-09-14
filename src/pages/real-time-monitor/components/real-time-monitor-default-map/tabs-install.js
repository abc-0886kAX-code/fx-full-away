/*
 * @Author: zhangxin
 * @Date: 2022-05-19 15:12:02
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-21 15:38:15
 * @Description: 
 */
import { default as BasicsReservoirTab } from './tabs/basics-reservoir-tab';

const components = [
    BasicsReservoirTab
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

export const tabsInstall = {}
components.forEach(item => {
    tabsInstall[item.name] = item;
});

export default {
    installs
}
