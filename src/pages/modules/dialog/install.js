/*
 * @FilePath: \3D防汛作战\src\pages\modules\dialog\install.js
 * @Author: zhangyang
 * @Date: 2022-06-30 15:59:44
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-12 14:46:03
 * @Description: 
 */
import { default as IcmLevelDataQuery } from "./icm-level-data-query";
import { default as IcmPlanQuery } from "./icm-plan-query";
import { default as IcmProgressQuery } from "./icm-progress-query";
import { default as IcmRainDataQuery } from "./icm-rain-data-query";
import { default as IcmRunList } from "./icm-run-list";
import { default as IcmRunListProgress } from "./icm-run-list-progress";
import { default as IcmTranstionDataQuery } from "./icm-transtion-data-query";
import { default as IcmRunListRegion } from "./icm-run-list-region";

import { default as IcmTmpSite } from "./icm-tmp-site";
import { default as IcmTmpSiteAdd } from "./icm-tmp-site-add";
import { default as IcmTmpSiteEdit } from "./icm-tmp-site-edit";
import { default as IcmTmpSiteDelete } from "./icm-tmp-site-delete";
import { default as IcmTmpEdit } from "./icm-tmp-edit";
import { default as IcmTmpAdd } from "./icm-tmp-add";
import { default as IcmTmpDelete } from "./icm-tmp-delete";

const components = [
    IcmPlanQuery,
    IcmRainDataQuery,
    IcmLevelDataQuery,
    IcmTranstionDataQuery,
    IcmProgressQuery,
    IcmRunList,
    IcmRunListProgress,
    IcmRunListRegion,

    IcmTmpSite,
    IcmTmpSiteAdd,
    IcmTmpSiteEdit,
    IcmTmpSiteDelete,
    IcmTmpEdit,
    IcmTmpAdd,
    IcmTmpDelete
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
    dialogInstall[item.name] = item;
});

export default {
    installs
}
