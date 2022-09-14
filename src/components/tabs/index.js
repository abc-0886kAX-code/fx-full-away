/*
 * @Author: zhangyang
 * @Date: 2021-05-26 13:08:35
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-05-26 13:09:00
 * @Description: file content
 */
import Tabs from './tabs.vue';

/* istanbul ignore next */
Tabs.install = function (Vue) {
    Vue.component(Tabs.name, Tabs);
};

export default Tabs;