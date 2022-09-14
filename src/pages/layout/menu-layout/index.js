/*
 * @Author: zhangyang
 * @Date: 2021-05-11 16:26:31
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-05-11 16:28:47
 * @Description: file content
 */
import MenuLayout from './menu-layout.vue';

/* istanbul ignore next */
MenuLayout.install = function (Vue) {
    Vue.component(MenuLayout.name, MenuLayout);
};

export default MenuLayout;