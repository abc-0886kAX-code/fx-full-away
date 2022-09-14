/*
 * @Author: zhangyang
 * @Date: 2020-11-09 10:46:31
 * @LastEditors: zhangyang
 * @LastEditTime: 2020-11-09 10:55:59
 * @Description: 动态表单 - 子组件整合导出文件
 */
import YtxdChoice from './YtxdChoice'
import YtxdDate from './YtxdDate'
import YtxdInput from './YtxdInput'
import YtxdSelect from './YtxdSelect'

const components = [
    YtxdChoice,
    YtxdDate,
    YtxdInput,
    YtxdSelect,
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

const YtxdFormComponents = {}
components.forEach(item => {
    YtxdFormComponents[item.name] = item;
});

export {
    YtxdChoice,
    YtxdDate,
    YtxdInput,
    YtxdSelect,
    YtxdFormComponents
}

export default {
    installs
}
