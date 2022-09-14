/*
 * @Author: zhangxin
 * @Date: 2022-06-20 11:30:40
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-30 17:14:36
 * @Description: 
 */
import DialogFloodPlanBYH from './dialog-flood-plan-byh';
import DialogPreventionMaterialBYH from './dialog-prevention-material-byh';
import DialogPreventionTransferBYH from './dialog-prevention-transfer-byh';
import DialogRainfallSiteBYH from './dialog-rainfall-site-byh';
import DialogRescueRanksBYH from './dialog-rescue-ranks-byh';
import DialogWaterConservancyRanksBYH from './dialog-water-conservancy-ranks-byh';


const components = [
    DialogFloodPlanBYH,
    DialogPreventionMaterialBYH,
    DialogPreventionTransferBYH,
    DialogRainfallSiteBYH,
    DialogRescueRanksBYH,
    DialogWaterConservancyRanksBYH
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

export const dialogsInstall = {}
components.forEach(item => {
    dialogsInstall[item.name] = item;
});

export default {
    installs
}