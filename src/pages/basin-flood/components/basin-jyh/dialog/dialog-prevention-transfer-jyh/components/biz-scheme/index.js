/*
 * @Author: zhangyang
 * @Date: 2021-05-26 15:05:47
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-05-26 15:06:03
 * @Description: file content
 */
import BizScheme from './biz-scheme.vue';

/* istanbul ignore next */
BizScheme.install = function (Vue) {
    Vue.component(BizScheme.name, BizScheme);
};

export default BizScheme;