/*
 * @Author: zhangyang
 * @Date: 2020-11-09 10:47:40
 * @LastEditors: zhangyang
 * @LastEditTime: 2020-11-09 10:52:47
 * @Description: 动态表单 - 单项选择组件导出文件
 */
import Component from './index.vue'
Component.installs = Vue => {
    Vue.component(Component.name, Component)
}
export default Component