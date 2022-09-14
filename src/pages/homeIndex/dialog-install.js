/*
 * @Author: zhangxin
 * @Date: 2022-06-20 10:37:46
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-08-08 13:48:57
 * @Description: 
 */
// 潮白河基础数据弹框
import { dialogInstall as CBHBaseDataDialogInstall } from "@/pages/basin-flood/components/basin-cbh/components/basic-data-cbh/dialog/install";
// 蓟运河弹框
import { dialogsInstall as JYHBaseDataDialogInstall } from "@/pages/basin-flood/components/basin-jyh/dialog/dialog-install";
// 潮白河流域点位弹框
import { dialogsInstall as CBHDialogInstall } from '@/pages/basin-flood/components/basin-cbh/dialog/dialog-install';
// 北运河弹框
import { dialogsInstall as BYHDialogInstall } from '@/pages/basin-flood/components/basin-byh/dialog/dialog-install';
// 永定河弹框
import { dialogsInstall as YDHDialogInstall } from '@/pages/basin-flood/components/basin-ydh/dialog/dialog-install';
// 大清河弹框
import { dialogsInstall as DQHDialogInstall } from '@/pages/basin-flood/components/basin-dqh/dialog/dialog-install';
// 实时监测-场次降雨弹框
import { default as RainfallEvents } from "@/pages/real-time-monitor/components/rainfall-events";
// 实时监测-降雨量对比图
import { default as RainfallComparisonChart } from "@/pages/real-time-monitor/components/rainfall-comparison-chart";
// 降雨预报 时段降雨量弹框
import { default as RainfallAverageHour } from "@/pages/rainfall-forecast/components/rainfall-average-hour";
// 实时监测模块点位弹框组件
import { dialogsInstall as RTMDialogInstall } from "../real-time-monitor/dialog-install";

import { dialogInstall as CWDialogInstall } from '@/pages/city-waterlogging/dialog-install';

import { dialogInstall as DefenseCountyDialogInstall } from "@/pages/flash-flood-defense/components/defense-county/dialog/dialog-install";

const components = [
    RainfallAverageHour,
    RainfallEvents,
    RainfallComparisonChart,
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

export const dialogsInstall = {
    ...CBHBaseDataDialogInstall,
    ...RTMDialogInstall,
    ...CBHDialogInstall,
    ...JYHBaseDataDialogInstall,
    ...CWDialogInstall,
    ...BYHDialogInstall,
    ...YDHDialogInstall,
    ...DQHDialogInstall,
    ...DefenseCountyDialogInstall
}
components.forEach(item => {
    dialogsInstall[item.name] = item;
});

export default {
    installs
}
