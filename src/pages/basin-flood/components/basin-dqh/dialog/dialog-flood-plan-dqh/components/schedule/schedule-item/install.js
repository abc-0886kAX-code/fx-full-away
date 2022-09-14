/*
 * @Author: zhangxin
 * @Date: 2022-04-14 11:20:17
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-04-14 14:28:21
 * @Description: 
 */
import { default as DesignFlood } from './design-flood';
import { default as Flood } from './flood';
import { default as HistoricalFlood } from './historical-flood';
import { default as StorageRouting } from './storage-routing';
import { default as WaterLevel } from './water-level';

const components = [
    WaterLevel,
    HistoricalFlood,
    DesignFlood,
    Flood,
    StorageRouting
]

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

const TableComponents = {}
components.forEach(item => {
    TableComponents[item.name] = item;
});

export {

    WaterLevel,
    HistoricalFlood,
    Flood,
    DesignFlood,
    StorageRouting,


    TableComponents,
};

export default {
    installs
}