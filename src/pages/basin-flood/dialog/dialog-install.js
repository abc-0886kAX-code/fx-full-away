/*
 * @Author: zhangyang
 * @Date: 2021-07-01 15:19:38
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-05 17:39:24
 * @Description: file content
 */
import WaterCustomRouting from './water-custom-routing';
import WaterRouting from './water-routing';


const components = [
    WaterRouting,
    WaterCustomRouting
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

const dialogInstall = {}
components.forEach(item => {
    dialogInstall[item.name] = item;
});

export {
    WaterRouting,
    WaterCustomRouting,
    dialogInstall
};

export default {
    installs
}