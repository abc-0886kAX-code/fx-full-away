/*
 * @Author: zhangxin
 * @Date: 2022-06-20 11:30:40
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-21 13:21:50
 * @Description: 
 */
import DialogFloodPlanDqh from './dialog-flood-plan-dqh';
import DialogPreventionMaterialDqh from './dialog-prevention-material-dqh';
import DialogPreventionTransferDqh from './dialog-prevention-transfer-dqh';
import DialogRainfallSiteDqh from './dialog-rainfall-site-dqh';
import DialogRescueRanksDqh from './dialog-rescue-ranks-dqh';
import DialogWaterConservancyRanksDqh from './dialog-water-conservancy-ranks-dqh';

const components = [
    DialogFloodPlanDqh,
    DialogPreventionMaterialDqh,
    DialogPreventionTransferDqh,
    DialogRainfallSiteDqh,
    DialogRescueRanksDqh,
    DialogWaterConservancyRanksDqh
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