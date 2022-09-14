/*
 * @Author: zhangxin
 * @Date: 2022-06-20 11:30:40
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-21 13:21:50
 * @Description: 
 */
import DialogFloodPlanYdh from './dialog-flood-plan-ydh';
import DialogPreventionMaterialYdh from './dialog-prevention-material-ydh';
import DialogPreventionTransferYdh from './dialog-prevention-transfer-ydh';
import DialogRainfallSiteYdh from './dialog-rainfall-site-ydh';
import DialogRescueRanksYdh from './dialog-rescue-ranks-ydh';
import DialogWaterConservancyRanksYdh from './dialog-water-conservancy-ranks-ydh';

const components = [
    DialogFloodPlanYdh,
    DialogPreventionMaterialYdh,
    DialogPreventionTransferYdh,
    DialogRainfallSiteYdh,
    DialogRescueRanksYdh,
    DialogWaterConservancyRanksYdh
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