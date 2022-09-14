/*
 * @Author: zhangxin
 * @Date: 2022-05-19 14:47:32
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-08-08 13:49:23
 * @Description: 
 */
import { default as DialogAlertGeneration } from './dialog-alert-generation';
import { default as DialogAlertGenerationTable } from './dialog-alert-generation-table';
import { default as ManualPointSave } from "./manual-point-save";
const components = [
    DialogAlertGeneration,
    DialogAlertGenerationTable,
    ManualPointSave
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

export const dialogInstall = {}
components.forEach(item => {
    dialogInstall[item.name] = item;
});

export default {
    installs
}
