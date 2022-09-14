/*
 * @Author: zhangyang
 * @Date: 2021-05-11 17:10:50
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-05-11 17:26:12
 * @Description: file content
 */
import Nav from './nav.vue';

/* istanbul ignore next */
Nav.install = function (Vue) {
    Vue.component(Nav.name, Nav);
};

export default Nav;