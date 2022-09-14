/*
 * @Author: zhangyang
 * @Date: 2021-05-26 15:05:47
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-05-26 15:06:03
 * @Description: file content
 */
import BizAllScheme from './biz-all-scheme.vue';

/* istanbul ignore next */
BizAllScheme.install = function (Vue) {
    Vue.component(BizAllScheme.name, BizAllScheme);
};

export default BizAllScheme;