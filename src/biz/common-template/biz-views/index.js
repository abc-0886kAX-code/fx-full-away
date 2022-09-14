/*
 * @Author: zhangyang
 * @Date: 2021-06-10 11:09:08
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-06-10 11:09:29
 * @Description: file content
 */
import BizViews from './src/views.vue';

/* istanbul ignore next */
BizViews.install = function (Vue) {
    Vue.component(BizViews.name, BizViews);
};

export default BizViews;