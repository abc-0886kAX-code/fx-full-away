/*
 * @Author: zhangxin
 * @Date: 2022-05-19 14:47:32
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-16 15:35:51
 * @Description: 
 */
import { default as BasinCBH } from './components/basin-cbh';
import { default as BasinFloodDefault } from './components/basin-flood-default';
import { default as BasinJYH } from './components/basin-jyh';
import { default as BasinDQH } from './components/basin-dqh';
import { default as BasinYDH } from './components/basin-ydh';
import { default as BasinBYH } from './components/basin-byh';


const components = [
    BasinFloodDefault,
    BasinJYH,
    BasinCBH,
    BasinDQH,
    BasinYDH,
    BasinBYH
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
