/*
 * @Author: zhangxin
 * @Date: 2022-05-19 14:47:32
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-28 13:48:08
 * @Description: 
 */
import { default as CityWaterloggingCentre } from './components/city-waterlogging-centre';
import { default as CityWaterloggingDefault } from './components/city-waterlogging-default';
import { default as CityWaterloggingSubCentre } from './components/city-waterlogging-sub-centre';


const components = [
    CityWaterloggingDefault,
    CityWaterloggingCentre,
    CityWaterloggingSubCentre
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

export const componentsInstall = {}
components.forEach(item => {
    componentsInstall[item.name] = item;
});

export default {
    installs
}