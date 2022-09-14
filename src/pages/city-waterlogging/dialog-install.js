/*
 * @Author: zhangxin
 * @Date: 2022-06-30 13:24:18
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-01 10:10:51
 * @Description: 
 */
import { default as DialogHistoryPondingPoint } from "./dialog/dialog-history-ponding-point";
import { default as DialogSpongePondingPoint } from "./dialog/dialog-sponge-ponding-point";
import { default as DialogSpongePondingPointTWO } from "./dialog/dialog-sponge-ponding-point/dialog-sponge-ponding-point-two.vue";
const components = [DialogSpongePondingPoint, DialogHistoryPondingPoint, DialogSpongePondingPointTWO];

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