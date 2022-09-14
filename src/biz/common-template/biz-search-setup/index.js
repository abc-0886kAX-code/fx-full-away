/*
 * @Author: zhangyang
 * @Date: 2022-02-11 14:06:21
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-02-11 14:06:21
 * @Description: file content
 */
import BizSearchSetup from './src/search-setup.vue';

/* istanbul ignore next */
BizSearchSetup.install = function (Vue) {
    Vue.component(BizSearchSetup.name, BizSearchSetup);
};

export { }

export default BizSearchSetup;