/*
 * @FilePath: \3D防汛作战\src\pages\basin-flood\components\basin-cbh\components\basic-data-cbh\dialog\install.js
 * @Author: zhangyang
 * @Date: 2022-06-20 13:26:32
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-20 14:07:06
 * @Description: 
 */
import FloodControlPlug from "./flood-control-plug.vue";
import DikeDangerWorker from "./dike-danger-worker.vue";
import River from "./river.vue";
import Reservoir from "./reservoir.vue";
import RiverSection from "./river-section";

const components = [
    FloodControlPlug,
    DikeDangerWorker,
    River,
    Reservoir,
    RiverSection
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

export const dialogInstall = {};
components.forEach(item => {
    dialogInstall[`dialog-cbh-${item.name}`] = item;
});

export default {
    installs
}
