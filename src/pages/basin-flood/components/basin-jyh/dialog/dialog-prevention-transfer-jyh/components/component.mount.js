/*
 * @Author: zhangyang
 * @Date: 2021-07-01 15:19:38
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-07-01 15:19:38
 * @Description: file content
 */
import BizAllScheme from './biz-all-scheme';
import BizScheme from './biz-scheme';

const components = [
    BizScheme,
    BizAllScheme,
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
    BizScheme,
    BizAllScheme,
    bizComponents
};

export default {
    installs
}