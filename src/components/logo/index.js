/*
 * @Author: zhangyang
 * @Date: 2021-05-20 16:50:20
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-05-20 16:51:20
 * @Description: file content
 */
import Logo from './logo.vue';

/* istanbul ignore next */
Logo.install = function (Vue) {
    Vue.component(Logo.name, Logo);
};

export default Logo;