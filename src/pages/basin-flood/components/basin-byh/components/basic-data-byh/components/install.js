/*
 * @FilePath: \3D防汛作战\src\pages\basin-flood\components\basin-cbh\components\basic-data-cbh\components\install.js
 * @Author: zhangyang
 * @Date: 2022-06-17 10:14:31
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-17 10:21:08
 * @Description: 
 */
import FloodControlPlug from "./flood-control-plug.vue";
import DikeDangerWorker from "./dike-danger-worker.vue";
import River from "./river.vue";
import Reservoir from "./reservoir.vue";
import GateDam from "./gate-dam.vue";

const components = [
    FloodControlPlug,
    DikeDangerWorker,
    River,
    Reservoir,
    GateDam
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
