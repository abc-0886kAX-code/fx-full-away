/*
 * @Author: zhangyang
 * @Date: 2021-05-11 16:27:29
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-05-11 16:28:27
 * @Description: file content
 */
import NavLayout from './nav-layout.vue';

/* istanbul ignore next */
NavLayout.install = function (Vue) {
    Vue.component(NavLayout.name, NavLayout);
};

export default NavLayout;