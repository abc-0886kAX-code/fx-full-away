/*
 * @Author: zhangxin
 * @Date: 2022-05-26 14:19:53
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-06 15:35:46
 * @Description: 
 */
import { default as TabChart } from './tab-chart';
import { default as TabDetails } from './tab-details';
import { default as TabTable } from './tab-table';


const components = [
    TabTable,
    TabChart,
    TabDetails
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