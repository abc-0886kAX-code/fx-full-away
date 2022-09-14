/*
 * @Author: zhangyang
 * @Date: 2021-05-12 09:20:52
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-05-12 09:22:02
 * @Description: file content
 */
import Menu from './menu.vue';

/* istanbul ignore next */
Menu.install = function (Vue) {
    Vue.component(Menu.name, Menu);
};

export default Menu;