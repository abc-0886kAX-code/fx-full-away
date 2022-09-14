/*
 * @Author: zhangyang
 * @Date: 2021-07-01 15:19:38
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-05 17:38:20
 * @Description: file content
 */
import AllProgramme from './all-programme';
import AttachedDrawings from './attached-drawings';
import HistoryWarn from './history-warn';
import MainIndicators from './main-indicators';
import OrganizationStructure from './organization-structure';
import RiskDecision from './risk-decision';
import Schedule from './schedule';


const components = [
    HistoryWarn,
    AllProgramme,
    AttachedDrawings,
    MainIndicators,
    OrganizationStructure,
    Schedule,
    RiskDecision,
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

const bizComponents = {}
components.forEach(item => {
    bizComponents[item.name] = item;
});

export {
    HistoryWarn,
    AllProgramme,
    AttachedDrawings,
    MainIndicators,
    OrganizationStructure,
    Schedule,
    RiskDecision,
    bizComponents
};

export default {
    installs
}