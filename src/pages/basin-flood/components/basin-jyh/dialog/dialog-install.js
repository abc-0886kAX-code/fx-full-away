/*
 * @Author: zhangxin
 * @Date: 2022-06-20 11:30:40
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-05 17:44:11
 * @Description: 
 */
import DialogFloodPlanJyh from './dialog-flood-plan-jyh';
import DialogPreventionMaterialJyh from './dialog-prevention-material-jyh';
import DialogPreventionTransferJYH from './dialog-prevention-transfer-jyh';
import DialogRainfallSiteJyh from './dialog-rainfall-site-jyh';
import DialogRescueRanksJyh from './dialog-rescue-ranks-jyh';
import DialogWaterConservancyRanksJyh from './dialog-water-conservancy-ranks-jyh';


const components = [
    DialogPreventionMaterialJyh,
    DialogFloodPlanJyh,
    DialogRescueRanksJyh,
    DialogWaterConservancyRanksJyh,
    DialogRainfallSiteJyh,
    DialogPreventionTransferJYH
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