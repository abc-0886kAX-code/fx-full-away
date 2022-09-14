/*
 * @Author: zhangxin
 * @Date: 2022-04-14 11:20:17
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-04-14 16:33:26
 * @Description: 
 */
import { default as BgsMember } from './bgs-member';
import { default as LdMember } from './ld-member';
import { default as ZzMember } from './zz-member';

const components = [
    LdMember,
    ZzMember,
    BgsMember
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

    LdMember,
    ZzMember,
    BgsMember,


    TableComponents,
};

export default {
    installs
}